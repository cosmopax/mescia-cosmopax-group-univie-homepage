
// HUD & Metric Stream
function initHUD() {
    // 1. Create Sidebar
    const sidebar = document.createElement('nav');
    sidebar.className = 'hud-sidebar';
    sidebar.innerHTML = `
    <div class="hud-logo">PS</div>
    <ul class="hud-links"></ul>
    <div class="hud-status">ONLINE</div>
  `;
    document.body.appendChild(sidebar);

    // Pop links from sections
    const sections = document.querySelectorAll('section [id]');
    const linkContainer = sidebar.querySelector('.hud-links');

    sections.forEach(sec => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + sec.id;
        a.textContent = sec.id.replace(/_/g, ' ').substring(0, 3).toUpperCase();
        a.title = sec.querySelector('h2')?.textContent || sec.id;
        li.appendChild(a);
        linkContainer.appendChild(li);

        // Scroll Spy
        window.addEventListener('scroll', () => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                sidebar.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                a.classList.add('active');
            }
        });
    });
}

function initMetrics() {
    const stats = [
        { label: 'CITATIONS', value: '42' },
        { label: 'H-INDEX', value: '5' },
        { label: 'PROJECTS', value: '12' },
        { label: 'SYSTEM', value: 'v2.4' }
    ];

    const ticker = document.createElement('div');
    ticker.className = 'metric-ticker';

    stats.forEach(s => {
        const item = document.createElement('div');
        item.className = 'metric-item';
        item.innerHTML = `<span class="label">${s.label}</span><span class="value">${s.value}</span>`;
        ticker.appendChild(item);
    });

    // Append to Hero if exists, or body
    const hero = document.querySelector('.portfolio-hero');
    if (hero) hero.appendChild(ticker);
}

window.addEventListener('DOMContentLoaded', () => {
    initHUD();
    initMetrics();
});
