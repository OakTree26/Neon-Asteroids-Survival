# Neon Asteroids Survival

Hey! This is a small browser game I made using just HTML, CSS and JavaScript. It's basically my own version of the classic Asteroids game but with a neon glow theme because I think glowy stuff looks cool lol.

This was a fun project for me to practice canvas and understand how game loops work.

## What it does/Features

- You control a spaceship and shoot asteroids
- Big asteroids break into smaller ones when you shoot them(this part took me a while to get right)
- You get points for destroying asteroids, smaller ones give more points.
- You have 3 lives, game ends when you run out.
- Difficulty increases as you clear levels(asteroids spawn faster/more of them)
- You can pick your ship color before starting from the main menu.
- Added some sound effects too using the Web Audio API(no audio files, everything is generated with oscillators)
- Some particle effects for explosions and engine thrust, and a little starfield in the background for that space vibe.
- Also added a scanline overlay just to make it look a bit retro/CRT style.

## How to run it

Just download the zip file and double click the `index.html` in your browser or just go to `https://oaktree26.itch.io/neon-asteroids-survival`. That's it, no build step or npm install needed since its plain JS.

(**Note:** it uses ES modules so if you're opening the file directly some browsers might block it because of CORS stuff with local files. If that happens just run a simple local server)

## Controls

- W or "UP Arrow" -> Thrust Forward
- A/D or "LEFT/RIGHT Arrow -> Rotate Ship
"SPACE" -> Shoot Bullets (also used to startgame / go back to menu after game over)

## Project structure

I tried to split things into different files instead of putting everything in one giant script, so its easier to read:

```
index.html
style.css
JS/
    main.js
    core.js
    game.js
    input.js
    ui.js
    audio.js
    utils.js
    entities/
        player.js
        asteroids.js
        bullet.js
        particles.js
        stars.js
```

## Things I want to add later (maybe)
- [ ] Power ups (like shield or rapid fire)
- [ ] High score saved in local storage
- [ ] Mobile/touch controls
- [ ] Maybe a boss asteroid or something at higher levels
- [ ] Pause button lol I forgot to add one

## Notes

This is one of my first proper JS projects so the code probably isn't perfect, there's definitely stuff I'd do differently now (like the collision detection is just basic circle distance checks, not super accurate). If you find bugs feel free to point them out, still learning!

Thanks for checking it out.