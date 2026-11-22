const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.endsWith('.xcodeproj') && !file.endsWith('.xcworkspace') && !file.endsWith('.git')) {
                walkDir(fullPath, callback);
            }
        } else {
            callback(fullPath);
        }
    }
}

function extractTechnologies(appDir) {
    const techSet = new Set();
    
    walkDir(appDir, (filePath) => {
        if (!filePath.endsWith('.swift')) return;
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('import SwiftUI')) techSet.add('SwiftUI');
        if (content.includes('import SwiftData')) techSet.add('SwiftData');
        if (content.includes('import StoreKit')) techSet.add('StoreKit');
        if (content.includes('import WidgetKit')) techSet.add('WidgetKit');
        if (content.includes('import ActivityKit')) techSet.add('ActivityKit');
        if (content.includes('import AppIntents')) techSet.add('App Intents');
        if (content.includes('import CloudKit')) techSet.add('CloudKit');
        if (content.includes('import CoreML')) techSet.add('Core ML');
        if (content.includes('import Vision')) techSet.add('Vision');
        if (content.includes('import MapKit')) techSet.add('MapKit');
    });

    return { technologies: Array.from(techSet) };
}

function extractPermissions(appDir) {
    const permissions = new Set();
    // Static heuristic approach: check Info.plist for usage descriptions
    let infoPlistPath = null;
    const findInfoPlist = (dir, depth = 0) => {
        if (depth > 2 || infoPlistPath) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (!file.endsWith('.xcodeproj') && !file.endsWith('.xcworkspace')) findInfoPlist(fullPath, depth + 1);
            } else if (file === 'Info.plist') {
                infoPlistPath = fullPath;
            }
        }
    };
    findInfoPlist(appDir);

    if (infoPlistPath) {
        const content = fs.readFileSync(infoPlistPath, 'utf8');
        if (content.includes('NSCameraUsageDescription')) permissions.add('camera');
        if (content.includes('NSPhotoLibraryUsageDescription')) permissions.add('photos');
        if (content.includes('NSMicrophoneUsageDescription')) permissions.add('microphone');
        if (content.includes('NSLocationWhenInUseUsageDescription') || content.includes('NSLocationAlwaysUsageDescription')) permissions.add('location');
        if (content.includes('NSContactsUsageDescription')) permissions.add('contacts');
        if (content.includes('NSHealthShareUsageDescription')) permissions.add('health');
        if (content.includes('NSUserTrackingUsageDescription')) permissions.add('tracking');
    }

    return Array.from(permissions);
}

function detectStoreKit(appDir) {
    let hasSubscriptions = false;
    walkDir(appDir, (filePath) => {
        if (filePath.endsWith('.storekit')) hasSubscriptions = true;
        if (filePath.endsWith('.swift')) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('Product.SubscriptionInfo') || content.includes('StoreKit.Product')) {
                hasSubscriptions = true;
            }
        }
    });
    return { hasSubscriptions };
}

module.exports = { extractTechnologies, extractPermissions, detectStoreKit };
