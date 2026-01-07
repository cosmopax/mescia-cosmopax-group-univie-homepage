document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('swarm-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const config = {
        count: reducedMotion ? 50 : 100,
        maxDist: 180,
        speed: reducedMotion ? 0.2 : 0.5,
        color: '13, 92, 99' // Teal #0d5c63
    };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${config.color}, 0.5)`;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: config.count }, () => new Particle());

    function drawConnections() {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.maxDist) {
                    const alpha = (1 - dist / config.maxDist) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${config.color}, ${alpha})`;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
});
