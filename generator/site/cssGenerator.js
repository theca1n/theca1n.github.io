function generateCss() {
    return `
:root {
    --bg-color: #fbfbfd;
    --text-color: #1d1d1f;
    --text-secondary: #86868b;
    --border-color: #d2d2d7;
    --accent-color: #0071e3;
    --card-bg: #ffffff;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #000000;
        --text-color: #f5f5f7;
        --text-secondary: #86868b;
        --border-color: #424245;
        --accent-color: #2997ff;
        --card-bg: #1c1c1e;
    }
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-family);
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

a {
    color: var(--accent-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Header */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(var(--bg-color), 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid var(--border-color);
}

.brand {
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: var(--text-color);
}

nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

nav a {
    color: var(--text-color);
    font-size: 0.85rem;
    opacity: 0.8;
}

nav a:hover {
    opacity: 1;
    text-decoration: none;
}

/* Hero */
.hero {
    text-align: center;
    padding: 6rem 1rem;
}

.hero h1 {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.5rem;
    color: var(--text-secondary);
    font-weight: 400;
    letter-spacing: -0.01em;
}

/* App Grid */
.app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.app-card {
    background-color: var(--card-bg);
    border-radius: 18px;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
}

.app-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.app-icon {
    width: 128px;
    height: 128px;
    border-radius: 28px;
    background: linear-gradient(135deg, #e0e0e0, #bdbdbd);
    margin: 0 auto 1.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.app-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.app-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

.btn {
    display: inline-block;
    background-color: var(--accent-color);
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 980px;
    font-size: 0.85rem;
    font-weight: 600;
}

.btn:hover {
    background-color: #0077ed;
    text-decoration: none;
}

/* Footer */
footer {
    border-top: 1px solid var(--border-color);
    padding: 2rem;
    margin-top: 4rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: center;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.footer-links a {
    color: var(--text-secondary);
}

.footer-links a:hover {
    color: var(--text-color);
}

/* App Detail Page */
.app-detail-hero {
    text-align: center;
    padding: 4rem 1rem;
}

.tech-tags {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem 0;
}

.tech-tag {
    background: var(--border-color);
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
}

.legal-content {
    max-width: 800px;
    margin: 4rem auto;
    padding: 0 2rem;
}

.legal-content h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.legal-content h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.legal-content p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
}
    `;
}

module.exports = { generateCss };
