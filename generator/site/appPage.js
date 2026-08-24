function generateAppPage(app) {
    const techTags = (app.technologies || []).map(t => `<span class="tech-tag">${t}</span>`).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${app.displayName || app.name} | XC</title>
    <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
    <header>
        <div class="brand"><a href="../../index.html" style="color:inherit">XC</a></div>
        <nav>
            <ul>
                <li><a href="../../index.html">Home</a></li>
                <li><a href="../../support/">Support</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="app-detail-hero">
            <div class="app-icon" style="width:160px; height:160px; font-size:4rem;">${app.name.charAt(0)}</div>
            <h1>${app.displayName || app.name}</h1>
            <p>${app.description || app.shortDescription || `A beautifully crafted ${app.platformCategory || 'iOS'} application.`}</p>
            
            <div class="tech-tags">
                ${techTags}
            </div>

            <p style="margin-top: 2rem; color: var(--text-secondary)">
                Platform: ${app.platformCategory || 'iOS'}<br>
                Version: ${app.version || '1.0'}<br>
                Requires: ${app.minimumOS || 'iOS 15.0+'}
            </p>
            
            ${app.hasSubscriptions ? '<p style="margin-top:1rem; font-size:0.9rem;"><em>Optional subscription available.</em></p>' : ''}
            
            <div style="margin-top: 2rem;">
                <a href="privacy/" class="btn" style="background:var(--border-color); color:var(--text-color);">Privacy Policy</a>
                <a href="terms/" class="btn" style="background:var(--border-color); color:var(--text-color);">Terms of Use</a>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-links">
            <a href="../../support/">Support</a>
            <a href="privacy/">Privacy</a>
            <a href="terms/">Terms</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} XC. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

module.exports = { generateAppPage };
