function generateSupportPage(apps) {
    const appLinks = apps.map(app => `
        <div style="margin-bottom: 2rem;">
            <h3>${app.displayName || app.name}</h3>
            <p>
                <a href="../apps/${app.id}/">View App</a> | 
                <a href="../apps/${app.id}/privacy/">Privacy</a> | 
                <a href="../apps/${app.id}/terms/">Terms</a>
            </p>
        </div>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support | XC</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <div class="brand"><a href="../index.html" style="color:inherit">XC</a></div>
        <nav>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="index.html">Support</a></li>
            </ul>
        </nav>
    </header>

    <main class="legal-content">
        <h1>XC Support</h1>
        <p>Need help with an XC application? We're here to assist you.</p>
        
        <h2>Contact</h2>
        <p>
            <a href="mailto:zaptciogluc@gmail.com" class="btn">Email XC Support</a>
            <a href="https://wa.me/905076768835" class="btn" style="margin-left:1rem;">WhatsApp XC Support</a>
        </p>

        <h2 style="margin-top: 4rem;">Applications</h2>
        ${appLinks}
    </main>

    <footer>
        <div class="footer-links">
            <a href="index.html">Support</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} XC. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

module.exports = { generateSupportPage };
