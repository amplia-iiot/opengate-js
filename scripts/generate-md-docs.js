const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const srcDir = path.resolve(__dirname, '../src');
const outputDir = path.resolve(__dirname, '../doc-md');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Find all JS files
glob(srcDir + '/**/*.js', {}, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Found ${files.length} files. Generating documentation...`);

    files.forEach(file => {
        try {
            let content = fs.readFileSync(file, 'utf8');
            let relativePath = path.relative(srcDir, file);
            let outputFilePath = path.join(outputDir, relativePath.replace('.js', '.md'));
            let outputDirPath = path.dirname(outputFilePath);

            if (!fs.existsSync(outputDirPath)) {
                fs.mkdirSync(outputDirPath, { recursive: true });
            }

            // Preprocess content
            const processedContent = preprocess(content);

            // Render
            // We use a slightly different template or default. Default is usually fine.
            // configure: default.
            jsdoc2md.render({ source: processedContent })
                .then(output => {
                    if (output) {
                        fs.writeFileSync(outputFilePath, output);
                        console.log(`Generated: ${relativePath}`);
                    } else {
                        // Some files might be utility files with no JSDoc.
                        // We can create an empty md or just skip.
                        // User wanted structure, so maybe empty file?
                        // But an empty file is useless.
                        // Let's write it only if there is output.
                        console.log(`Skipped (no docs): ${relativePath}`);
                    }
                })
                .catch(err => {
                    console.error(`Error processing ${relativePath}:`, err);
                });
        } catch (e) {
            console.error(`Error reading/processing file ${file}:`, e);
        }
    });
});

/**
 * Preprocess source code to fix JSDoc extraction issues with ES6 classes.
 * 1. Convert "export default class X" to named class + export statement (Fixes scoping).
 * 2. Inject @alias if missing.
 * 3. Move constructor @params to Class JSDoc (Fixes missing constructor params in output).
 */
function preprocess(source) {
    let className = null;

    // 1. Transform 'export default class X' -> 'class X' ... 'export default X'
    source = source.replace(/export\s+default\s+class\s+(\w+)/, (match, name) => {
        className = name;
        console.log(`Preprocessing: Found export default class ${name}`);
        return `class ${name}`;
    });

    if (className) {
        // Append the export at the end
        source += `\nexport default ${className};`;

        // Regex to find the JSDoc block specifically associated with the class
        const classDocRegex = new RegExp(`(\\/\\*\\*[\\s\\S]*?\\*\\/)\\s*class\\s+${className}`);

        // Regex to find constructor and its JSDoc
        const ctorRegex = /(\/\*\*[\s\S]*?\*\/)\s*constructor\s*\(/;
        const ctorMatch = source.match(ctorRegex);

        let constructorParams = [];
        if (ctorMatch) {
            const ctorDoc = ctorMatch[1];
            // Extract @param lines. simple regex to capture full line.
            const params = ctorDoc.match(/@param\s+\{.*\}\s+\S+.*/g);
            if (params) {
                constructorParams = params;
            }
        }

        source = source.replace(classDocRegex, (match, jsdoc) => {
            let newJsdoc = jsdoc;

            // 2. Inject @alias if missing
            if (!newJsdoc.includes('@alias')) {
                // Insert before the closing */
                newJsdoc = newJsdoc.replace(/\*\/$/, ` * @alias ${className}\n */`);
            }

            // 3. Inject constructor params if any
            if (constructorParams.length > 0) {
                const paramsString = constructorParams.map(p => ` * ${p}`).join('\n');
                newJsdoc = newJsdoc.replace(/\*\/$/, `${paramsString}\n */`);
            }

            return newJsdoc + `\nclass ${className}`;
        });
    }

    return source;
}
