import { Player } from "./entities/player.js"
import { Asteroid } from "./entities/asteroids.js"
import { Bullet } from "./entities/bullet.js"
import { Particles, createParticles } from "./entities/particles.js"
import { Star } from "./entities/stars.js"

import { SFX } from "./Audio.js"
import { distance, random } from "./utils.js"
import { updateUI, showGameOver } from "./ui.js"
import { canvas, ctx } from "./core.js"

/* Game state */
let GAME_STATE = 'MENU'; // MENU, PLAYING, GAME_OVER
let score = 0;
let lives = 3;
let level = 1;
let spawnTimer = 0;

// Entity Arrays
let stars = [];
let player = null;
let bullets = [];
let asteroids = [];
let particles = [];

export function getGameState() {
    return GAME_STATE;
}

export function setGameState(state) {
    GAME_STATE = state;
}

export function getScore() {
    return score;
}

export function getLives() {
    return lives;
}

export function getBullets() {
    return bullets;
}

export function getParticles() {
    return particles;
}

export function addBullet(bullet) {
    bullets.push(bullet);
}

// Init Game World
export function initStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }
}

function spawnAsteroids(count) {
    const levelMultiplier = 1 + (level * 0.2);
    for (let i = 0; i < count; i++) {
        let x, y;
        do {
            x = random(0, canvas.width);
            y = random(0, canvas.height);
        } while (player && distance(x, y, player.x, player.y) < 200);

        asteroids.push(new Asteroid(x, y, 45, levelMultiplier));
    }
}

export function startGame() {
    setGameState('PLAYING');
    score = 0;
    lives = 3;
    level = 1;
    spawnTimer = 0;

    player = new Player();
    bullets = [];
    asteroids = [];
    particles = [];

    const menu = document.getElementById('mainMenu');
    if (menu) menu.classList.add('hidden');
    const message = document.getElementById('centerMessage');
    if (message) message.classList.add('hidden');

    updateUI();
    spawnAsteroids(8);
}

function nextLevel() {
    SFX.levelUp();
    level++;
    spawnAsteroids(4 + Math.floor(level / 2));
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.vx = 0;
    player.vy = 0;
    player.invulnerable = true;
    player.invulnerableTimer = player.invulnerableTime;
}

function killPlayer() {
    if (!player || player.invulnerable) return;

    SFX.playerDeath();
    createParticles(particles, player.x, player.y, 50, player.color, 2);
    lives--;
    updateUI();

    if (lives <= 0) {
        setGameState('GAME_OVER');
        showGameOver(score);
        player = null;
    } else {
        player = new Player();
        player.invulnerable = true;
        player.invulnerableTimer = player.invulnerableTime;
        player.flashTimer = 0;
    }
}

// Main Game Loop
let lastTime = 0;
function gameLoop(timestamp) {
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    ctx.fillStyle = "#000";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw(ctx);
    });

    if (GAME_STATE === 'PLAYING' || GAME_STATE === 'GAME_OVER') {
        if (GAME_STATE === 'PLAYING') {
            spawnTimer += dt;

            if (spawnTimer > 2000) {
                spawnAsteroids(1);
                spawnTimer = 0;
            }
        }

        if (player) {
            player.update(dt);
            player.draw(ctx);
        }

        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.update();
            b.draw(ctx);

            if (Date.now() - b.born > b.life) {
                bullets.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw(ctx);

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        for (let i = asteroids.length - 1; i >= 0; i--) {
            const a = asteroids[i];
            a.update();
            a.draw(ctx);

            for (let j = bullets.length - 1; j >= 0; j--) {
                const b = bullets[j];
                if (distance(a.x, a.y, b.x, b.y) < a.radius + b.radius) {
                    createParticles(particles, a.x, a.y, 15, a.color);
                    SFX.explosion();

                    if (a.radius > 20) {
                        score += 20;
                        const newRadius = a.radius / 1.8;
                        const lvlMult = 1 + (level * 0.2);
                        const a1 = new Asteroid(a.x, a.y, newRadius, lvlMult);
                        const a2 = new Asteroid(a.x, a.y, newRadius, lvlMult);
                        asteroids.push(a1, a2);
                    } else {
                        score += 50;
                    }

                    updateUI();
                    bullets.splice(j, 1);
                    asteroids.splice(i, 1);
                    break;
                }
            }

            if (player && !player.invulnerable && asteroids[i]) {
                if (distance(player.x, player.y, a.x, a.y) < player.radius + a.radius * 0.8) {
                    killPlayer();
                    break;
                }
            }
        }

        if (asteroids.length === 0 && GAME_STATE === 'PLAYING') {
            nextLevel();
        }
    }

    requestAnimationFrame(gameLoop);
}

export { GAME_STATE, gameLoop };