# Neon Asteroids Survival

A neon-coloured take on classic *Asteroids*, built with plain JavaScript, HTML5 Canvas, and the Web Audio API. No frameworks, no build tools, no external assets — just open it up and play.

## Features

- Classic asteroid-shooter gameplay but with a glowy cyberpunk look
- Endless survival mode — asteroids keep trickling in the longer you last
- Asteroids fracture into smaller chunks when you shoot them, color-coded by size
- 5 neon ship colors to pick from on the main menu
- Ship, bullets, and asteroids all wrap around the screen edges
- Particle effects for thruster exhaust and explosions
- All sound effects are generated on the fly with the Web Audio API, no audio files anywhere
- A retro CRT scanline overlay because why not
- Score, lives, and level tracking, with things ramping up as you go

## Controls

- Thrust forward — `W` or `↑`
- Rotate left — `A` or `←`
- Rotate right — `D` or `→`
- Fire — `Space`
- Launch from the main menu — `Space` or click **LAUNCH**
- Back to menu after Game Over — `Space`

## Gameplay

You start with 3 lives and a score of 0. Asteroids are color-coded by size — magenta for large, green for medium, yellow for small.

Shoot a large or medium one and it splits into two smaller pieces, worth 20 points. Finish off a small one and it's gone for good, worth 50.

New asteroids keep spawning while you play so the field rarely stays empty for long. If you do manage to clear it out, you level up, and the next batch comes in bigger and faster. Hitting an asteroid costs you a life — you respawn center screen with a couple seconds of flashing invulnerability so you're not immediately re-hit. Run's over once you're out of lives.

## Ship Customization

Pick your neon color from the main menu before you launch:

- Cyan (default)
- Magenta
- Green
- Orange
- Red

Whatever you pick also colors your bullets and the glow on the score display.

## Project Structure

```
.
├── index.html          markup — HUD, main menu, game-over screen, canvas
├── style.css            neon styling, menu layout, scanline overlay
└── js/
    ├── main.js          entry point, kicks off the game loop
    ├── core.js          canvas/context setup, tracks selected ship color
    ├── game.js          game state, main loop, spawning, collisions
    ├── input.js         keyboard handling
    ├── ui.js             menu, HUD, color-swatch clicks
    ├── utils.js          math helpers (random, distance, TWO_PI)
    ├── Audio.js          Web Audio sound engine
    └── entities/
        ├── player.js        the ship
        ├── asteroids.js     asteroid entity
        ├── bullet.js        bullet entity
        ├── particles.js     explosion + thruster particles
        └── stars.js         background starfield
```

Heads up — `index.html` loads `js/main.js` as a module and everything under it uses relative imports built around this exact folder structure. Don't move `entities/` out of `js/` or things will break.

## Tech Stack

Vanilla JS (ES6 modules), no frameworks or deps. HTML5 Canvas 2D for rendering, Web Audio API for every sound effect, plain CSS3 for the UI and scanline effect.

## Future Ideas

- Save high scores somewhere (localStorage probably)
- Touch controls so it works on mobile
- Power-ups — shield, rapid fire, spread shot maybe
- Pause button, some kind of difficulty setting

## License

Haven't picked one yet.
