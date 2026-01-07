const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 20000; // Density

    // Check for theme
    const isDark = document.body.classList.contains('dark-mode');
    // Minimal opacity for professional look
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5; // Very small particles
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.2) - 0.1; // Extremely slow speed
        let directionY = (Math.random() * 0.2) - 0.1;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            // Connection distance
            if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                opacityValue = 1 - (distance / 25000);
                const isDark = document.body.classList.contains('dark-mode');
                const strokeColor = isDark ? `rgba(255, 255, 255, ${opacityValue * 0.03})` : `rgba(0, 0, 0, ${opacityValue * 0.03})`;

                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Watch for theme changes to update color live
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
            init(); // Re-init with new colors
        }
    });
});
observer.observe(document.body, {
    attributes: true
});

init();
animate();
