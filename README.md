# Neon Asteroids Survival

A browser-based, neon-coloured twist on the classic *Asteroids* arcade game, built with vanilla JavaScript, HTML5 Canvas, and the Web Audio API. No frameworks, no build tools, and no external assets.

## Features

- Classic asteroid-shooter gameplay with a glowing cyberpunk look
- Endless survival mode: asteroids keep trickling in the longer you last
- Asteroids fracture into smaller fragments when destroyed, color-coded by size
- 5 selectable neon ship colors, picked from the main menu
- Screen-wrapping movement for the ship, bullets, and asteroids
- Particle-based thruster exhaust and explosion effects
- Procedurally generated sound effects via the Web Audio API, with no audio files
- Retro CRT-style scanline overlay
- Score, lives, and level tracking with a rising difficulty curve

## Controls

| Action | Key(s) |
|---|---|
| Thrust forward | `W` or `↑` |
| Rotate left | `A` or `←` |
| Rotate right | `D` or `→` |
| Fire | `Space` |
| Launch from main menu | `Space` or click **LAUNCH** |
| Return to menu after Game Over | `Space` |

## Gameplay

- You start with **3 lives** and a score of **0**.
- Asteroids are color-coded by size: **magenta** (large), **green** (medium), **yellow** (small).
- Shooting a large or medium asteroid splits it into two smaller ones and scores 20 points. Finishing off a small asteroid destroys it outright for 50 points.
- New asteroids spawn continuously while you play, so the field rarely stays clear for long. If you do clear it, you advance to the next level, which spawns a bigger, faster batch of asteroids.
- Colliding with an asteroid costs a life. You respawn at center screen with a few seconds of flashing invulnerability.
- The run ends when your lives reach zero.

## Ship Customization

Pick your ship's neon color from the main menu before launching:

- Cyan (default)
- Magenta 
- Green
- Orange 
- Red 

Your chosen color carries over to your bullets and the score display's glow.

## Project Structure

```
.
├── index.html         # Markup: HUD, main menu, game-over screen, canvas
├── style.css           # Neon UI styling, menu layout, and scanline overlay
└── js/
    ├── main.js         # App entry point, starts the game loop
    ├── core.js         # Canvas/context setup and selected ship color
    ├── game.js         # Game state, main loop, spawning, and collisions
    ├── input.js        # Keyboard input handling
    ├── ui.js           # Menu, HUD, and color-swatch interactions
    ├── utils.js        # Math helpers (random, distance, TWO_PI)
    ├── Audio.js        # Web Audio API sound effects engine
    └── entities/
        ├── player.js      # Player ship
        ├── asteroids.js   # Asteroid entity
        ├── bullet.js      # Bullet entity
        ├── particles.js   # Explosion and thruster particle effects
        └── stars.js       # Background starfield
```

`index.html` loads `js/main.js` as a module, and every file beneath it uses relative imports that expect this exact nesting. Keep `entities/` inside `js/`.

## Tech Stack

- **Vanilla JavaScript** (ES6 modules), no frameworks or dependencies
- **HTML5 Canvas 2D** for rendering
- **Web Audio API** for all sound effects
- **CSS3** for the UI, menu, and scanline effect

## Ideas for Future Development

- Persist high scores (for example, with `localStorage`)
- Touch controls for mobile play
- Power-ups such as shields, rapid fire, or a spread shot
- Pause functionality and a settings or difficulty menu

## License

No license has been specified for this project yet.
