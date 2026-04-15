/* ============================================
   SUBSTRATE FIELD - Red Particle Animation
   Oroborian Medical Technology — Cancer Eradication
   ============================================ */

(function () {
    const canvas = document.getElementById('substrate-field');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 180;
    const RED = { r: 196, g: 48, b: 48 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    function update() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${RED.r}, ${RED.g}, ${RED.b}, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
            const pulseRadius = p.radius + Math.sin(p.pulse) * 0.3;

            ctx.beginPath();
            ctx.arc(p.x, p.y, pulseRadius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${RED.r}, ${RED.g}, ${RED.b}, ${pulseAlpha * 0.1})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${RED.r}, ${RED.g}, ${RED.b}, ${pulseAlpha})`;
            ctx.fill();
        }
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    function handleScroll() {
        const elements = document.querySelectorAll('.arch-card, .step-card, .advantage-card, .security-block');
        const windowHeight = window.innerHeight;

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);
})();
