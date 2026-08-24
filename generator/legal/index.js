const fs = require('fs');
const path = require('path');

function generateLegalPages(app, outputDir) {
    const appDir = path.join(outputDir, 'apps', app.id);
    const privacyDir = path.join(appDir, 'privacy');
    const termsDir = path.join(appDir, 'terms');

    if (!fs.existsSync(privacyDir)) fs.mkdirSync(privacyDir, { recursive: true });
    if (!fs.existsSync(termsDir)) fs.mkdirSync(termsDir, { recursive: true });

    // Generate Privacy Policy
    const privacyHtml = generatePrivacyPolicy(app);
    fs.writeFileSync(path.join(privacyDir, 'index.html'), privacyHtml);

    // Generate Terms of Use
    const termsHtml = generateTermsOfUse(app);
    fs.writeFileSync(path.join(termsDir, 'index.html'), termsHtml);
}

function generatePrivacyPolicy(app) {
    const appName = app.displayName || app.name;
    const permissions = app.permissions || [];
    
    let permissionText = '';
    if (permissions.length > 0) {
        permissionText = `<h2>Data Collection & Permissions</h2>
        <p>To provide core functionality, ${appName} requests access to the following device features:</p>
        <ul>
            ${permissions.map(p => `<li><strong>${p}</strong></li>`).join('\n')}
        </ul>
        <p>This data is processed locally on your device unless otherwise specified.</p>`;
    } else {
        permissionText = `<h2>Data Collection</h2>
        <p>${appName} is designed with privacy in mind. We do not collect, store, or transmit your personal data to external servers.</p>`;
    }

    let subscriptionText = '';
    if (app.hasSubscriptions) {
        subscriptionText = `<h2>Subscriptions & Purchases</h2>
        <p>${appName} offers optional subscriptions or in-app purchases. Payments are processed securely by Apple via your Apple ID. We do not have access to your payment information.</p>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - ${appName} | XC</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <div class="brand"><a href="/" style="color:inherit">XC</a></div>
    </header>
    <main class="legal-content">
        <h1>Privacy Policy</h1>
        <p><strong>Application:</strong> ${appName}</p>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
        
        ${permissionText}
        
        ${subscriptionText}

        <h2>Contact</h2>
        <p>If you have any questions regarding this privacy policy, please contact us:</p>
        <p><a href="mailto:zaptciogluc@gmail.com">zaptciogluc@gmail.com</a></p>
    </main>
</body>
</html>`;
}

function generateTermsOfUse(app) {
    const appName = app.displayName || app.name;
    
    let subscriptionText = '';
    if (app.hasSubscriptions) {
        subscriptionText = `<h2>Subscriptions and Billing</h2>
        <p>Some features of ${appName} may require a paid subscription. Payment will be charged to your Apple ID account at confirmation of purchase. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. You can manage and cancel your subscriptions by going to your account settings on the App Store.</p>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Use - ${appName} | XC</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <div class="brand"><a href="/" style="color:inherit">XC</a></div>
    </header>
    <main class="legal-content">
        <h1>Terms of Use</h1>
        <p><strong>Application:</strong> ${appName}</p>
        <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h2>Acceptance of Terms</h2>
        <p>By downloading or using ${appName}, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you may not use the application.</p>
        
        ${subscriptionText}

        <h2>Contact</h2>
        <p>If you have any questions regarding these terms, please contact us:</p>
        <p><a href="mailto:zaptciogluc@gmail.com">zaptciogluc@gmail.com</a></p>
    </main>
</body>
</html>`;
}

module.exports = { generateLegalPages };
