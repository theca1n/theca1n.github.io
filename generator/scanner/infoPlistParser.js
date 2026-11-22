const fs = require('fs');
const path = require('path');

function parseInfoPlist(appDir) {
    let infoPlistPath = null;
    
    // Find Info.plist recursively
    const findInfoPlist = (dir, depth = 0) => {
        if (depth > 2 || infoPlistPath) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (!file.endsWith('.xcodeproj') && !file.endsWith('.xcworkspace')) {
                    findInfoPlist(fullPath, depth + 1);
                }
            } else if (file === 'Info.plist') {
                infoPlistPath = fullPath;
            }
        }
    };

    findInfoPlist(appDir);

    let displayName = null;

    if (infoPlistPath) {
        const content = fs.readFileSync(infoPlistPath, 'utf8');
        
        // Very basic XML string matching to avoid heavy dependencies, we look for CFBundleDisplayName
        const displayNameRegex = /<key>CFBundleDisplayName<\/key>\s*<string>(.*?)<\/string>/is;
        const match = content.match(displayNameRegex);
        if (match) {
            displayName = match[1];
        } else {
            const nameRegex = /<key>CFBundleName<\/key>\s*<string>(.*?)<\/string>/is;
            const nameMatch = content.match(nameRegex);
            if (nameMatch) {
                displayName = nameMatch[1];
            }
        }
    }

    return {
        displayName: displayName
    };
}

module.exports = { parseInfoPlist };
