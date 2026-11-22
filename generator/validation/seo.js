const fs = require('fs');
const path = require('path');

function generateSitemap(apps, outputDir) {
    const baseUrl = 'https://theca1n.github.io';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let urls = [
        `${baseUrl}/`,
        `${baseUrl}/support/`
    ];

    for (const app of apps) {
        urls.push(`${baseUrl}/apps/${app.id}/`);
        urls.push(`${baseUrl}/apps/${app.id}/privacy/`);
        urls.push(`${baseUrl}/apps/${app.id}/terms/`);
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapContent);
}

function generateRobotsTxt(outputDir) {
    const baseUrl = 'https://theca1n.github.io';
    const robotsTxtContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

    fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxtContent);
}

module.exports = { generateSitemap, generateRobotsTxt };
