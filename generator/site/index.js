const fs = require('fs');
const path = require('path');
const { generateHomepage } = require('./homepage');
const { generateAppPage } = require('./appPage');
const { generateCss } = require('./cssGenerator');
const { generateLegalPages } = require('../legal/index');
const { generateSupportPage } = require('../site/supportPage');
const { generateSitemap, generateRobotsTxt } = require('../validation/seo');

function generateSite(apps, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const cssDir = path.join(outputDir, 'css');
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);

    const appsDir = path.join(outputDir, 'apps');
    if (!fs.existsSync(appsDir)) fs.mkdirSync(appsDir);

    // 1. Generate Global CSS
    const cssContent = generateCss();
    fs.writeFileSync(path.join(cssDir, 'style.css'), cssContent);

    // 2. Generate Homepage
    const homepageHtml = generateHomepage(apps);
    fs.writeFileSync(path.join(outputDir, 'index.html'), homepageHtml);

    // 3. Generate App Pages and Legal Pages
    for (const app of apps) {
        const appOutputDir = path.join(appsDir, app.id);
        if (!fs.existsSync(appOutputDir)) fs.mkdirSync(appOutputDir, { recursive: true });
        
        const appHtml = generateAppPage(app);
        fs.writeFileSync(path.join(appOutputDir, 'index.html'), appHtml);

        generateLegalPages(app, outputDir);
    }

    // 4. Generate Support
    const supportHtml = generateSupportPage(apps);
    const supportDir = path.join(outputDir, 'support');
    if (!fs.existsSync(supportDir)) fs.mkdirSync(supportDir);
    fs.writeFileSync(path.join(supportDir, 'index.html'), supportHtml);

    // 5. SEO / Sitemap
    generateSitemap(apps, outputDir);
    generateRobotsTxt(outputDir);
}

module.exports = { generateSite };
