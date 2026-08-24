const fs = require('fs');
const path = require('path');
const { scanApplications } = require('./scanner');
const { generateSite } = require('./site');

const IOS_APPS_DIR = path.join(__dirname, '..', 'iOS Applications');
const MACOS_APPS_DIR = path.join(__dirname, '..', 'macOS Applications');
const OUTPUT_DIR = path.join(__dirname, '..');

async function main() {
    console.log('XC Website Refresh Started...');
    
    // 1. Scan iOS Applications
    const iosApps = scanApplications(IOS_APPS_DIR, 'iOS');
    
    // 2. Scan macOS Applications
    const macosApps = scanApplications(MACOS_APPS_DIR, 'macOS');
    
    const allApps = [...iosApps, ...macosApps];
    
    console.log(`Discovered ${allApps.length} applications.`);
    
    // 3. Generate Site
    generateSite(allApps, OUTPUT_DIR);
    
    console.log('XC Website Refresh Complete.');
}

main().catch(err => {
    console.error('Error during refresh:', err);
    process.exit(1);
});
