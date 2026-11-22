const fs = require('fs');
const path = require('path');

function getMetadataOverrides(appDir) {
    const configPath = path.join(appDir, 'xc-app.json');
    if (fs.existsSync(configPath)) {
        try {
            const content = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(content);
        } catch (e) {
            console.error(`Error parsing xc-app.json in ${appDir}:`, e);
        }
    }
    return {};
}

module.exports = { getMetadataOverrides };
