import { getSelectedShipColor } from "../core.js";
import { keys } from "../input.js"
import { SFX } from "../Audio.js";
import { Bullet } from "./bullet.js";
import { createParticles } from "./particles.js";
import { canvas } from "../core.js";
import { addBullet, getParticles } from "../game.js";

/* Player ship class */
export class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = 15;
        this.angle = -Math.PI / 2; // pointing up
        this.rotationSpeed = 0.08;
        this.thrust = 0.15;
        this.friction = 0.98;
        this.vx = 0;
        this.vy = 0;

        this.lastShot = 0;
        this.fireRate = 200; // milliseconds between shots

        this.invulnerable = true;
        this.invulnerableTime = 3000;
        this.invulnerableTimer = this.invulnerableTime;
        this.flashTimer = 0;

        this.lastThrustSound = 0;

        // Assigned from customization menu
        this.color = getSelectedShipColor();
    }

    update(dt) {
        // Rotation
        if (keys.ArrowLeft || keys.a) this.angle -= this.rotationSpeed;
        if (keys.ArrowRight || keys.d) this.angle += this.rotationSpeed;

        // Thrust
        if (keys.ArrowUp || keys.w) {
            if (!this.lastThrustSound || Date.now() - this.lastThrustSound > 70) {
                SFX.thrust();
                this.lastThrustSound = Date.now();
            }
                this.vx += Math.cos(this.angle) * this.thrust;
                this.vy += Math.sin(this.angle) * this.thrust;

                // Engine exhaust particles
                if (Math.random() > 0.5) {
                    const exX = this.x - Math.cos(this.angle) * this.radius;
                    const exY = this.y - Math.sin(this.angle) * this.radius;
                    createParticles(getParticles(), exX, exY, 1, "#f80", 2, this.angle + Math.PI, 0.5);
                }
        }

        // Apply velocity and friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        // Screen wrapping
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        // Shooting
        if (keys[' '] && Date.now() - this.lastShot > this.fireRate) {
            this.shoot();
        }

        // Invulnerability logic
        if (this.invulnerable) {
            this.invulnerableTimer -= dt;
            this.flashTimer -= dt;

            if (this.invulnerableTimer <= 0) {
                this.invulnerable = false;
            }
        }
    }

    shoot() {
        const bX = this.x + Math.cos(this.angle) * this.radius;
        const bY = this.y + Math.sin(this.angle) * this.radius;
        addBullet(new Bullet(bX, bY, this.angle, this.color));
        this.lastShot = Date.now();
        SFX.hit();
        createParticles(bX, bY, 3, this.color, 1, this.angle, 0.2);
    }

    draw(ctx) {
        if (this.invulnerable) {
            if (this.flashTimer <= 0) {
                this.flashTimer = 150;
            } else if (this.flashTimer > 75) {
                return; // Skip drawing for blinking effect
            }
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // draw ship
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.moveTo(this.radius, 0); // Nose
        ctx.lineTo(-this.radius, this.radius * 0.7); // Back right
        ctx.lineTo(-this.radius * 0.5, 0); // Back center
        ctx.lineTo(-this.radius, -this.radius * 0.7); // Back left
        ctx.closePath();
        ctx.stroke();
        
        // draw thrust flame if moving
        if (keys.ArrowUp || keys.w) {
            ctx.strokeStyle = "#f80";
            ctx.shadowColor = "#f80";
            ctx.beginPath();
            ctx.moveTo(-this.radius * 0.5, 0);
            ctx.lineTo(-this.radius * 1.5, 0);
            ctx.stroke();
        }
        ctx.restore();
    }
}