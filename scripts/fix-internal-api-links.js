const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../doc-md-pure');
const targetFile = path.join(rootDir, 'InternalOpenGateAPI.md');

if (!fs.existsSync(targetFile)) {
    console.error('Target file not found:', targetFile);
    process.exit(1);
}

// 1. Build Map of Component Name -> File Path
const fileMap = {}; // e.g. "UserFinder": "users/UserFinder"

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.md') && file !== '_index.md' && file !== 'InternalOpenGateAPI.md') {
            const name = path.basename(file, '.md');
            // Store path relative to doc-md-pure root
            const relPath = path.relative(rootDir, fullPath);
            // Store without extension to match previous style
            fileMap[name] = relPath.replace('.md', '');
        }
    }
}

console.log('Scanning for documentation files...');
scanDir(rootDir);
console.log(`Found ${Object.keys(fileMap).length} documentation files.`);


// 2. Process Target File
let content = fs.readFileSync(targetFile, 'utf8');

// Pattern: * [functionName()](link) [⇒ Type]
// Matches link content, optional return type
const regex = /(\* \[.+?\])\((.+?)\)((?: ⇒ .+)?)$/gm;

let replacements = 0;

content = content.replace(regex, (match, prefix, oldLink, returnTypeGroup) => {
    // returnTypeGroup might be " ⇒ `Type`" or empty
    let returnTypeRaw = returnTypeGroup.replace(' ⇒ ', '').trim();

    // If no return type, try to guess from function name?
    // e.g. ticketsSearchBuilder() -> ticketsSearchBuilder
    if (!returnTypeRaw) {
        const m = prefix.match(/\[(.+?)\(\)\]/); // match [name()]
        if (m) returnTypeRaw = m[1];
        // If still empty, use old link anchor name
        else returnTypeRaw = oldLink.replace('#', '');
    }

    // Strip backticks
    let typeName = returnTypeRaw.replace(/`/g, '').trim();

    // If it looks like a link [Type](#...), extract Type
    const linkMatch = typeName.match(/\[(.+?)\]\(#.+?\)/);
    if (linkMatch) {
        typeName = linkMatch[1];
    }

    if (typeName.includes(']')) {
        // handle cases like [provisionProcessorsBuilder](#provisionProcessorsBuilder)
        const m = typeName.match(/\[(.+?)\]/);
        if (m) typeName = m[1];
    }

    // Manual Overrides
    const manualOverrides = {
        'DeviceFinder': 'entities/EntityFinder',
        'TicketFinder': 'entities/EntityFinder',
        'SubscriptionsFinder': 'entities/EntityFinder',
        'SubscribersFinder': 'entities/EntityFinder'
    };

    // Map lookup
    let targetPath = manualOverrides[typeName] || fileMap[typeName];

    // Fuzzy match: try adding/removing 's'
    if (!targetPath) {
        if (fileMap[typeName + 's']) targetPath = fileMap[typeName + 's'];
        else if (typeName.endsWith('s') && fileMap[typeName.slice(0, -1)]) targetPath = fileMap[typeName.slice(0, -1)];
    }

    // Fallback for SearchBuilder classes
    if (!targetPath && typeName.endsWith('SearchBuilder')) {
        targetPath = 'searching/builder/SearchBuilder';
    }

    if (targetPath) {
        // Only replace if different
        if (oldLink !== targetPath) {
            replacements++;
            return `${prefix}(${targetPath})${returnTypeGroup}`;
        }
    } else {
        console.log(`Warning: Could not resolve link for type "${typeName}" -> Setting to N/A`);
        replacements++;
        return `${prefix}(N/A)${returnTypeGroup}`;
    }
    return match;
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log(`Updated ${replacements} links in InternalOpenGateAPI.md`);
