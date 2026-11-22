const fs = require('fs');
const path = require('path');

function parsePbxproj(appDir) {
    let pbxprojPath = null;
    
    // Find project.pbxproj recursively (shallow search)
    const findPbxproj = (dir, depth = 0) => {
        if (depth > 2) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file.endsWith('.xcodeproj')) {
                    const candidate = path.join(fullPath, 'project.pbxproj');
                    if (fs.existsSync(candidate)) pbxprojPath = candidate;
                } else {
                    findPbxproj(fullPath, depth + 1);
                }
            }
        }
    };

    findPbxproj(appDir);

    let bundleIdentifier = null;
    let version = null;
    let build = null;
    let deploymentTarget = null;

    if (pbxprojPath) {
        const content = fs.readFileSync(pbxprojPath, 'utf8');
        
        // Simple regex heuristics for extracting common fields
        const bundleIdMatch = content.match(/PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/);
        if (bundleIdMatch) bundleIdentifier = bundleIdMatch[1].replace(/"/g, '').trim();

        const versionMatch = content.match(/MARKETING_VERSION = ([^;]+);/);
        if (versionMatch) version = versionMatch[1].replace(/"/g, '').trim();

        const buildMatch = content.match(/CURRENT_PROJECT_VERSION = ([^;]+);/);
        if (buildMatch) build = buildMatch[1].replace(/"/g, '').trim();

        const deploymentMatch = content.match(/IPHONEOS_DEPLOYMENT_TARGET = ([^;]+);/);
        if (deploymentMatch) deploymentTarget = deploymentMatch[1].replace(/"/g, '').trim();
    }

    return {
        bundleIdentifier,
        version: version || '1.0',
        build: build || '1',
        minimumOS: deploymentTarget ? `iOS ${deploymentTarget}+` : null
    };
}

module.exports = { parsePbxproj };
