function generateHomepage(apps) {
    const featuredApps = apps.filter(app => app.featured);
    const regularApps = apps.filter(app => !app.featured);
    const displayApps = [...featuredApps, ...regularApps];

    const appCards = displayApps.map(app => `
        <div class="app-card">
            <div class="app-icon">${app.name.charAt(0)}</div>
            <h3>${app.displayName || app.name}</h3>
            <p>${app.shortDescription || `A beautifully crafted ${app.platformCategory || 'iOS'} application.`}</p>
            <a href="/apps/${app.id}/" class="btn">View App</a>
        </div>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XC — Thoughtfully built software.</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <div class="brand">XC</div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/support/">Support</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h1>Thoughtfully built software.</h1>
            <p>Simple, powerful apps designed for Apple platforms.</p>
        </section>

        <section class="app-grid">
            ${appCards}
        </section>
    </main>

    <footer>
        <div class="footer-links">
            <a href="/support/">Support</a>
            <a href="/privacy/">Privacy Policy</a>
            <a href="/terms/">Terms of Use</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} XC. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

module.exports = { generateHomepage };
