import { random, TWO_PI } from "../utils.js";
import { canvas } from "../core.js";

/* Asteroid class */
export class Asteroid {
    constructor(x, y, radius, levelMultiplier) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = random(0, TWO_PI);

        const speed = random(1, 3) * levelMultiplier;
        this.vx = Math.cos(this.angle) * speed;
        this.vy = Math.sin(this.angle) * speed;

        this.vertices = Math.floor(random(7, 12));
        this.offsets = []
        for (let i = 0; i < this.vertices; i++) {
            this.offsets.push(random(0.7, 1.3));
        }

        this.rotationSpeed = random(-0.02, 0.02);
        this.currentRotation = 0;

        // Color based on size
        this.color = radius > 30 ? "#f0f" : (radius > 15 ? "#0f0" : "#ff0");
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.currentRotation += this.rotationSpeed;

        // Screen wrap
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius; 
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.currentRotation);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        for(let i = 0; i < this.vertices; i++) {
            const angle = (i / this.vertices) * TWO_PI;
            const r = this.radius * this.offsets[i];
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;

            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}