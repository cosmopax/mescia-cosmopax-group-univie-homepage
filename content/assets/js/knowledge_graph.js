
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let connections = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    document.body.prepend(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15';
    canvas.style.pointerEvents = 'none';

    window.addEventListener('resize', resize);
    resize();

    // Create Nodes
    for (let i = 0; i < 40; i++) {
        nodes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }

    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & Draw Nodes
    ctx.fillStyle = '#10b981';
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Connections
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#10b981';
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.globalAlpha = 1 - (dist / 150);
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(loop);
}

window.addEventListener('DOMContentLoaded', init);
