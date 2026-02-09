const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generating initial documentation...');
try {
    execSync('node scripts/generate-md-docs.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
    console.error('Failed to generate documentation:', error);
    process.exit(1);
}
console.log('Initial documentation generated. Starting conversion...');

const srcDir = path.join(__dirname, '../doc-md');
const destDir = path.join(__dirname, '../doc-md-pure');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function humanize(str) {
    let title = str.replace('.md', '');
    return title.replace(/([A-Z])/g, ' $1').trim();
}

function convertFile(filePath, destPath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove <dl> wrappers
    content = content.replace(/<dl>\s*/g, '').replace(/<\/dl>\s*/g, '');

    // Convert <dt><a href="...">name()</a> ...</dt> to bullet points
    // Pattern: <dt><a href="#newCloseBuilder">newCloseBuilder()</a> ⇒ <code>AlarmCloseBuilder</code></dt>
    // Goal: * [newCloseBuilder()](#newCloseBuilder) ⇒ `AlarmCloseBuilder`
    content = content.replace(/<dt><a href="([^"]+)">([^<]+)<\/a>(.*?)<\/dt>/g, (match, href, text, rest) => {
        // 'rest' might contain " ⇒ <code>Type</code>"
        // Cleanup 'rest' by replacing HTML code tags with backticks if needed, though they might be mixed.
        // The user example kept `<code>` as backticks ` `.
        let cleanedRest = rest.replace(/<code>(.*?)<\/code>/g, '`$1`');
        return `* [${text}](${href})${cleanedRest}`;
    });

    // Convert <dd><p>Description</p></dd> to indented description
    content = content.replace(/<dd>\s*<p>(.*?)<\/p>\s*<\/dd>/gs, (match, desc) => {
        // Clean up newlines in description
        const cleanDesc = desc.trim();
        return `: ${cleanDesc}\n`;
    });

    // Also handle case without <p> if any
    content = content.replace(/<dd>(.*?)<\/dd>/gs, (match, desc) => {
        if (desc.includes('<p>')) return match; // Already handled
        // If it's just text
        return `: ${desc.trim()}\n`;
    });

    // Remove separate anchor tags <a name="..."></a>
    content = content.replace(/<a name="[^"]+"><\/a>\s*/g, '');

    // Fix multiple empty newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    // Global replacement for <code> tags to backticks
    content = content.replace(/<code>(.*?)<\/code>/g, '`$1`');

    // Convert Tables
    content = replaceTables(content);

    // Header with Front Matter
    const filename = path.basename(filePath);
    const title = humanize(filename);
    const frontMatter = `+++
title = "${title}"
+++

`;
    content = frontMatter + content;

    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`Converted: ${destPath}`);
}

function replaceTables(content) {
    return content.replace(/<table>([\s\S]*?)<\/table>/g, (match, tableContent) => {
        // Extract headers
        const headerMatch = tableContent.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>[\s\S]*?<\/thead>/);
        if (!headerMatch) return match; // Failed to parse headers

        const headers = [];
        const thRegex = /<th>([\s\S]*?)<\/th>/g;
        let thMatch;
        while ((thMatch = thRegex.exec(headerMatch[1])) !== null) {
            headers.push(thMatch[1].trim());
        }

        if (headers.length === 0) return match;

        // Extract rows
        const rows = [];
        const bodyMatch = tableContent.match(/<tbody>([\s\S]*?)<\/tbody>/);
        if (bodyMatch) {
            const trRegex = /<tr>([\s\S]*?)<\/tr>/g;
            let trMatch;
            while ((trMatch = trRegex.exec(bodyMatch[1])) !== null) {
                const cells = [];
                const tdRegex = /<td>([\s\S]*?)<\/td>/g;
                let tdMatch;
                while ((tdMatch = tdRegex.exec(trMatch[1])) !== null) {
                    let cellContent = tdMatch[1];
                    // Clean <p> tags inside cells
                    cellContent = cellContent.replace(/<p>/g, '').replace(/<\/p>/g, '');
                    // Flatten newlines to spaces or <br> (pipe tables can't have raw newlines)
                    cellContent = cellContent.replace(/\n/g, ' ').trim();
                    cells.push(cellContent);
                }
                rows.push(cells);
            }
        }

        // Build Markdown Table
        let md = '\n';
        // Header row
        md += '| ' + headers.join(' | ') + ' |\n';
        // Separator row
        md += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
        // Data rows
        rows.forEach(row => {
            md += '| ' + row.join(' | ') + ' |\n';
        });
        md += '\n';

        return md;
    });
}

function processDir(currentDir, targetDir) {
    ensureDir(targetDir);
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    const files = [];
    const dirs = [];

    for (const entry of entries) {
        const srcPath = path.join(currentDir, entry.name);
        const destPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
            processDir(srcPath, destPath);
            dirs.push(entry.name);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            convertFile(srcPath, destPath);
            files.push(entry.name);
        }
    }

    // Generate _index.md
    const folderName = path.basename(targetDir);
    let indexTitle = folderName;

    // Check if it is the root directory
    if (path.resolve(targetDir) === path.resolve(destDir)) {
        indexTitle = "OGAPI.js Documentation";
    }

    let indexContent = `+++
title = "${indexTitle}"
+++

`;

    if (dirs.length > 0) {
        indexContent += `## Directories\n`;
        dirs.forEach(d => {
            indexContent += `* [${d}](${d}/)\n`;
        });
        indexContent += `\n`;
    }

    if (files.length > 0) {
        indexContent += `## Files\n`;
        files.forEach(f => {
            if (f !== '_index.md') {
                const title = humanize(f);
                indexContent += `* [${title}](${f.replace('.md', '')})\n`;
            }
        });
        indexContent += `\n`;
    }

    // indexContent += '{{% children sort="weight" depth="10" %}}\n';

    fs.writeFileSync(path.join(targetDir, '_index.md'), indexContent, 'utf8');
    console.log(`Created index: ${path.join(targetDir, '_index.md')}`);
}

console.log('Starting conversion...');
processDir(srcDir, destDir);
console.log('Conversion complete.');

console.log('Fixing internal API links...');
try {
    execSync('node scripts/fix-internal-api-links.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
} catch (error) {
    console.error('Failed to fix internal API links:', error);
    // Don't exit 1 if this fails, just log it, or maybe exit 1 depending on strictness.
    // Given it's post-processing, maybe strict is better.
    process.exit(1);
}
console.log('Internal links fixed.');
