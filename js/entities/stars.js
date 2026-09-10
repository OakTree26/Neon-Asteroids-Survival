import { random, TWO_PI } from "../utils.js";
import { canvas } from "../core.js";

/* Starfield background class */
export class Star {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.size = random(0.5, 2);
        this.alpha = random(0.3, 1);
        this.alphaChange = random(-0.02, 0.02);
    }

    update() {
        this.alpha += this.alphaChange;
        if (this.alpha <= 0.1 || this.alpha >= 1) {
            this.alphaChange *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
        ctx.fill();
    }
}