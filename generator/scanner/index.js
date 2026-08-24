const fs = require('fs');
const path = require('path');
const { parsePbxproj } = require('./pbxprojParser');
const { parseInfoPlist } = require('./infoPlistParser');
const { extractTechnologies, extractPermissions, detectStoreKit } = require('./sourceAnalyzer');
const { getMetadataOverrides } = require('../metadata');

function scanApplications(baseDir, platformCategory) {
    if (!fs.existsSync(baseDir)) return [];

    const apps = [];
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const appDir = path.join(baseDir, entry.name);
        
        // Basic heuristic: check if it contains an Xcode project somewhere inside (1 level deep usually)
        const isXcodeProject = checkIsXcodeProject(appDir);
        if (!isXcodeProject) continue;

        console.log(`Scanning ${entry.name}...`);

        let appData = {
            id: entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: entry.name,
            platformCategory: platformCategory,
            dir: appDir
        };

        // Static extraction
        const pbxprojData = parsePbxproj(appDir);
        const infoPlistData = parseInfoPlist(appDir);
        const sourceData = extractTechnologies(appDir);
        const permissions = extractPermissions(appDir);
        const storeKit = detectStoreKit(appDir);

        // Merge discovered metadata
        appData = {
            ...appData,
            ...pbxprojData,
            ...infoPlistData,
            technologies: sourceData.technologies,
            permissions: permissions,
            hasSubscriptions: storeKit.hasSubscriptions,
        };

        // Check for manual overrides xc-app.json
        const overrides = getMetadataOverrides(appDir);
        appData = { ...appData, ...overrides };

        apps.push(appData);
    }

    return apps;
}

function checkIsXcodeProject(appDir) {
    // Check if appDir or its immediate subdirectories have .xcodeproj
    try {
        const files = fs.readdirSync(appDir);
        for (const file of files) {
            if (file.endsWith('.xcodeproj') || file.endsWith('.xcworkspace')) return true;
            
            const subPath = path.join(appDir, file);
            if (fs.statSync(subPath).isDirectory()) {
                const subFiles = fs.readdirSync(subPath);
                if (subFiles.some(f => f.endsWith('.xcodeproj') || f.endsWith('.xcworkspace'))) return true;
            }
        }
    } catch (e) {
        // Ignore
    }
    return false;
}

module.exports = {
    scanApplications
};
