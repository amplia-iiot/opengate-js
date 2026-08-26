#!/usr/bin/env node
/**
 * Extracts the public API of this library from the JSDoc in src/ and writes a
 * neutral model to stdout or to a file.
 *
 * The model is the contract other tools build on: the documentation site renders
 * it into pages, and og-cli turns it into editor completion. Nothing here knows
 * about Hugo, front matter or TypeScript declarations on purpose.
 *
 *   node tools/apidoc/extract.mjs --out api-model.json
 *
 * Options:
 *   --out <file>   write there instead of stdout
 *   --src <dir>    source root (default: src)
 *   --version <v>  stamp this version instead of the one in package.json
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

function parseArgs(argv) {
    const out = { out: null, src: 'src', version: null };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--out') out.out = argv[++i];
        else if (a === '--src') out.src = argv[++i];
        else if (a === '--version') out.version = argv[++i];
        else throw new Error(`unknown option: ${a}`);
    }
    return out;
}

function collectSources(dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) files.push(...collectSources(full));
        else if (entry.isFile() && entry.name.endsWith('.js')) files.push(full);
    }
    return files.sort();
}

/** The JSDoc description of a node, with the leading `*` and indentation gone. */
function describe(node) {
    const docs = node.jsDoc;
    if (!docs || docs.length === 0) return '';
    const text = docs
        .map((d) => (typeof d.comment === 'string' ? d.comment : ts.getTextOfJSDocComment(d.comment) || ''))
        .join('\n');
    return text.replace(/\s+/g, ' ').trim();
}

function typeOfTag(tag, sourceFile) {
    if (!tag || !tag.typeExpression) return null;
    // `{string}` -> string, `{Promise}` -> Promise, `{A|B}` -> A|B
    return tag.typeExpression.getText(sourceFile).replace(/^\{|\}$/g, '').trim() || null;
}

function paramsOf(node, sourceFile) {
    const all = (node.jsDoc || []).flatMap((d) => d.tags || []);
    const out = [];
    for (const tag of all) {
        if (!ts.isJSDocParameterTag(tag)) continue;
        const name = tag.name ? tag.name.getText(sourceFile) : null;
        if (!name) continue;
        out.push({
            name,
            type: typeOfTag(tag, sourceFile),
            // ESDoc/JSDoc mark an optional parameter as [name] or with a default
            optional: Boolean(tag.isBracketed),
            description: (ts.getTextOfJSDocComment(tag.comment) || '')
                .replace(/^\s*-\s*/, '')
                .replace(/\s+/g, ' ')
                .trim(),
        });
    }
    return out;
}

function returnOf(node, sourceFile) {
    const all = (node.jsDoc || []).flatMap((d) => d.tags || []);
    for (const tag of all) {
        if (!ts.isJSDocReturnTag(tag)) continue;
        return {
            type: typeOfTag(tag, sourceFile),
            description: (ts.getTextOfJSDocComment(tag.comment) || '').replace(/\s+/g, ' ').trim(),
        };
    }
    return null;
}

/** Other JSDoc tags worth keeping, e.g. ESDoc's @test example blocks. */
function extraTags(node, sourceFile) {
    const all = (node.jsDoc || []).flatMap((d) => d.tags || []);
    const out = [];
    for (const tag of all) {
        if (ts.isJSDocParameterTag(tag) || ts.isJSDocReturnTag(tag)) continue;
        const name = tag.tagName ? tag.tagName.getText(sourceFile) : null;
        if (!name) continue;
        out.push({ tag: name, text: (ts.getTextOfJSDocComment(tag.comment) || '').trim() });
    }
    return out;
}

function memberKind(node) {
    if (ts.isConstructorDeclaration(node)) return 'constructor';
    if (ts.isMethodDeclaration(node)) return 'method';
    if (ts.isGetAccessor(node)) return 'getter';
    if (ts.isSetAccessor(node)) return 'setter';
    if (ts.isPropertyDeclaration(node)) return 'property';
    return null;
}

function lineOf(sourceFile, node) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function extendsOf(classNode, sourceFile) {
    const heritage = classNode.heritageClauses || [];
    for (const clause of heritage) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length) {
            return clause.types[0].expression.getText(sourceFile);
        }
    }
    return null;
}

function main() {
    const opts = parseArgs(process.argv.slice(2));
    const srcDir = path.resolve(ROOT, opts.src);
    const files = collectSources(srcDir);

    const program = ts.createProgram(files, {
        allowJs: true,
        checkJs: false,
        noEmit: true,
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
    });

    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    const classes = [];

    for (const file of files) {
        const sourceFile = program.getSourceFile(file);
        if (!sourceFile) continue;
        const relative = path.relative(ROOT, file).split(path.sep).join('/');

        ts.forEachChild(sourceFile, (node) => {
            let classNode = null;
            if (ts.isClassDeclaration(node)) classNode = node;
            else if (ts.isExportAssignment(node) && ts.isClassExpression(node.expression)) classNode = node.expression;
            if (!classNode) return;

            const name = classNode.name ? classNode.name.getText(sourceFile) : path.basename(file, '.js');
            const members = [];
            for (const member of classNode.members || []) {
                const kind = memberKind(member);
                if (!kind) continue;
                const memberName = kind === 'constructor'
                    ? 'constructor'
                    : (member.name ? member.name.getText(sourceFile) : null);
                if (!memberName) continue;
                members.push({
                    kind,
                    name: memberName,
                    line: lineOf(sourceFile, member),
                    description: describe(member),
                    params: paramsOf(member, sourceFile),
                    returns: returnOf(member, sourceFile),
                    tags: extraTags(member, sourceFile),
                    static: Boolean(
                        member.modifiers &&
                        member.modifiers.some((m) => m.kind === ts.SyntaxKind.StaticKeyword)
                    ),
                });
            }

            classes.push({
                name,
                file: relative,
                line: lineOf(sourceFile, classNode),
                extends: extendsOf(classNode, sourceFile),
                description: describe(classNode),
                members,
            });
        });
    }

    classes.sort((a, b) => (a.file + a.name).localeCompare(b.file + b.name));

    const model = {
        generator: 'opengate-js/tools/apidoc',
        modelVersion: 1,
        library: pkg.name,
        version: opts.version || pkg.version,
        classCount: classes.length,
        memberCount: classes.reduce((n, c) => n + c.members.length, 0),
        classes,
    };

    const json = JSON.stringify(model, null, 2) + '\n';
    if (opts.out) {
        const target = path.resolve(ROOT, opts.out);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, json);
        process.stderr.write(`${model.classCount} classes, ${model.memberCount} members -> ${opts.out}\n`);
    } else {
        process.stdout.write(json);
    }
}

main();
