import { TWO_PI } from "../utils.js";
import { canvas } from "../core.js";

/* Bullet class */
export class Bullet {
    constructor(x, y, angle, color) {
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.radius = 2;
        this.life = 1000; // ms
        this.born = Date.now();
        this.color = color || "#fff"; // Inherit ship color
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Screen wrap for bullets
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
    }
}
