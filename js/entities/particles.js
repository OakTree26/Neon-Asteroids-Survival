import { random, TWO_PI } from "../utils.js";

/* Particle class for explosion */
export class Particles {
    constructor(x, y, color, speedScale, baseAngle = null, spread = Math.pi * 2) {
        this.x = x;
        this.y = y;
        this.color = color;

        const angle = baseAngle !== null ? random(baseAngle - spread/2, baseAngle + spread/2): random(0, TWO_PI);
        const speed = random(1, 5) * speedScale;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.radius = random(1, 3);
        this.life = 1;
        this.decay = random(0.01, 0.05);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fill();

        ctx.globalAlpha = 1; // Reset
        ctx.shadowBlur = 0;
    }
}

/* Helper to spawn particles */
export function createParticles(array, x, y, count, color, speedScale = 1, baseAngle = null, spread = Math.PI * 2) {
    for (let i = 0; i < count; i++) {
        array.push(new Particles(x, y, color, speedScale, baseAngle, spread));
    }
}