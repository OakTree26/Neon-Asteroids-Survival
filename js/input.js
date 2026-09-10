import { getGameState, startGame } from "./game.js";
import { showMenu } from "./ui.js";
import { ensureAudio, SFX } from "./Audio.js";

/* Input Handling */
const keys = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    d: false,
    ' ': false,
};

window.addEventListener('keydown', (e) => {
    if (Object.prototype.hasOwnProperty.call(keys, e.key)) {
        keys[e.key] = true;
    }
    // allow space to return to menu after game over
    if (e.key === ' ' && getGameState() === 'GAME_OVER') {
        showMenu();
    }
    // allow space to start game from menu
    else if (e.key === ' ' && getGameState() === 'MENU') {
        ensureAudio();
        SFX.ui();
        startGame();
    }
});

window.addEventListener('keyup', (e) => {
    if (Object.prototype.hasOwnProperty.call(keys, e.key)) {
        keys[e.key] = false;
    }
});

export { keys };