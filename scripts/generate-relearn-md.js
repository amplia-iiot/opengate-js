const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const dumpPath = path.resolve(__dirname, '../docs/dump.json');
const outputDir = path.resolve(__dirname, '../ogapi-docs');
const templatePath = path.resolve(__dirname, 'relearn-template.hbs');

if (!fs.existsSync(dumpPath)) {
    console.error(`Error: ${dumpPath} not found. Run existing docs generation first.`);
    process.exit(1);
}

const dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = handlebars.compile(templateSource);

// Helper to ensure directory exists
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 1. Index items by memberof (children) and identify classes
const classes = [];
const memberMap = new Map(); // longname -> [children]

dump.forEach(item => {
    if (item.kind === 'class') {
        classes.push(item);
    } else if (item.memberof) {
        if (!memberMap.has(item.memberof)) {
            memberMap.set(item.memberof, []);
        }
        memberMap.get(item.memberof).push(item);
    }
});

// 2. Process classes
console.log(`Found ${classes.length} classes.`);

// Clean output directory
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
ensureDir(outputDir);

// Map ClassName -> Relative Path for linking
const classPathMap = new Map();
classes.forEach(cls => {
    if (cls.memberof) {
        let relativePath = cls.memberof.replace(/\.js$/, '.md');
        if (relativePath.startsWith('src/')) {
            relativePath = relativePath.replace(/^src\//, 'JS Reference/');
        }
        classPathMap.set(cls.name, relativePath);
    }
});
console.log(`Mapped ${classPathMap.size} classes for linking.`);

// Helpers for data normalization
function normalizeItem(item, currentFilePath) {
    // Normalize 'return' to 'returns' array for template
    if (item.return) {
        if (!item.returns) {
            item.returns = [item.return];
        }
    }

    // Helper to fix type structure
    const fixType = (obj) => {
        if (!obj) return;
        // If obj has 'types' (ESDoc style) but not 'type.names' (JSDoc template style)
        if (obj.types && !obj.type) {
            obj.type = { names: obj.types };
        } else if (obj.type && obj.type.types && !obj.type.names) {
            obj.type.names = obj.type.types;
        }

        // Link logic for InternalOpenGateAPI
        // Ensure we are linking return types
        // Check if we are in InternalOpenGateAPI context (passed down or checked via item memberof?)
        // item.memberof is like "src/InternalOpenGateAPI.js~InternalOpenGateAPI"
        if (item.memberof && item.memberof.includes("InternalOpenGateAPI")) {
            if (obj.type && obj.type.names && obj.type.names.length > 0) {
                const typeName = obj.type.names[0]; // Assume first type
                if (classPathMap.has(typeName)) {
                    const targetRelPath = classPathMap.get(typeName);
                    // Calculate relative path from current file to target file
                    // currentFilePath is relative to outputDir (e.g. src/InternalOpenGateAPI.md)
                    const fromDir = path.dirname(path.join(outputDir, currentFilePath));
                    const toFile = path.join(outputDir, targetRelPath);

                    let relLink = path.relative(fromDir, toFile);
                    // Fix relative link if it doesn't start with .
                    // e.g. "users/UserFinder.md" -> "./users/UserFinder.md" ? URL encoding?
                    // Verify path.relative behavior.
                    if (!relLink.startsWith('.') && !relLink.startsWith('/')) {
                        relLink = './' + relLink;
                    }
                    // Remove .md extension
                    relLink = relLink.replace(/\.md$/, '');

                    obj.link = relLink;
                }
            }
        }
    };

    if (item.params) {
        item.params.forEach(fixType);
    }
    if (item.returns) {
        item.returns.forEach(fixType);
    }
    if (item.type) {
        if (item.type.types && !item.type.names) {
            item.type.names = item.type.types;
        }
    }

    // Append parameters to name
    if (item.kind === 'function' || item.kind === 'method') {
        const paramNames = item.params ? item.params.map(p => p.name + ': ' + p.type.names) : '';
        item.nameWithParams = `${item.name}(${paramNames})`;
    }

    return item;
}

// Generate files
classes.forEach(classDoc => {
    const classLongName = classDoc.longname;
    const children = memberMap.get(classLongName) || [];

    // Filter out private members (starting with _)
    const publicChildren = children.filter(child => !child.name.startsWith('_'));

    // Determine output path from file path
    // classDoc.name (e.g. "src/AIModels/AIModels.js") or classDoc.longname ("src/AIModels/AIModels.js~AIModels")?
    // dump.json has "name": "AIModels" inside "kind": "class" entry usually... 
    // Wait, let's check dump.json again.
    // Entry 1: kind: file, name: src/AIModels/AIModels.js
    // Entry 2: kind: class, name: AIModels, memberof: src/AIModels/AIModels.js, longname: src/AIModels/AIModels.js~AIModels

    // So we should use the file path of the class to determine directory.
    // We can use the 'memberof' which points to the file? Or look up the file entry?
    // The class entry has "memberof": "src/AIModels/AIModels.js".
    // So output should be based on "src/AIModels/AIModels.js".

    let filePath = classDoc.memberof; // "src/AIModels/AIModels.js"
    if (!filePath) {
        console.warn(`Class ${classDoc.name} has no memberof. Skipping.`);
        return;
    }

    // Remove .js extension, add .md
    let relativePath = filePath.replace(/\.js$/, '.md');
    if (relativePath.startsWith('src/')) {
        relativePath = relativePath.replace(/^src\//, 'JS Reference/');
    }

    // Sort children: constructor first, then others alphabetically
    publicChildren.sort((a, b) => {
        if (a.kind === 'constructor') return -1;
        if (b.kind === 'constructor') return 1;
        return a.name.localeCompare(b.name);
    });

    const normalizedChildren = publicChildren.map(child => normalizeItem(child, relativePath));

    const fullPath = path.join(outputDir, relativePath);
    const dirPath = path.dirname(fullPath);

    ensureDir(dirPath);

    // Initialize directory _index.md files up to root
    let currentDir = dirPath;
    while (currentDir.startsWith(outputDir)) {
        const indexFile = path.join(currentDir, '_index.md');
        if (!fs.existsSync(indexFile)) {
            const dirName = path.basename(currentDir);
            const isRoot = currentDir === outputDir;
            const title = isRoot ? "OpenGate JS" : dirName;

            let indexContent = '';
            if (isRoot) {
                indexContent = `+++
title = "${title}"
weight = 10
+++

# Installation and Usage

## Node.js (NPM)

To use the API in a Node.js environment, install the package and instantiate it as follows:

\`\`\`javascript
var OpengateAPI = require('opengate-js');

var ogapi = new OpengateAPI({
    url: 'your-api-url',
    port: 'your-port',
    version: 'your-version',
    apiKey: 'your-api-key',
    jwt: 'your-jwt',
    south: {
        url: 'your-south-api-url'
    }
});
\`\`\`

## Web (Bower)

To use the API in a web environment, include the script and instantiate it as follows:

\`\`\`javascript
// Ensure opengate-api-bower.js is included in your HTML
var ogapi = new window.OpenGateAPI({
    url: 'your-api-url',
    port: 'your-port',
    version: 'your-version',
    apiKey: 'your-api-key',
    jwt: 'your-jwt',
    south: {
        url: 'your-south-api-url'
    }
});
\`\`\`

## API Reference

{{% children sort="weight" depth="10" %}}
`;
            } else {
                indexContent = `+++
title = "${title}"
weight = 10
+++

{{% children sort="weight" depth="10" %}}
`;
            }
            fs.writeFileSync(indexFile, indexContent);
        }
        if (currentDir === outputDir) break;
        currentDir = path.dirname(currentDir);
    }

    // Prepare template data
    // We pass the list of members as 'model'.
    const renderedContent = template({ model: normalizedChildren });

    // Humanize title helper
    const humanize = (str) => {
        return str
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            .replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    const humanTitle = humanize(classDoc.name);

    // Construct final file content
    const fileContent = `+++
title = "${humanTitle}"
weight = 10
+++

${classDoc.name}

### ${classDoc.name} Objects

\`\`\`javascript
class ${classDoc.name}()
\`\`\`

${classDoc.description || ''}

${renderedContent}
`;

    fs.writeFileSync(fullPath, fileContent);
    console.log(`Generated: ${relativePath}`);
});

console.log('Done.');
