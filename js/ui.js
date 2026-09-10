import { getSelectedShipColor, setSelectedShipColor } from "./core.js";
import { getGameState, startGame, setGameState, getScore, getLives } from "./game.js";
import { ensureAudio, SFX } from "./Audio.js";

/* UI Elements */
const scoreValue = document.getElementById('scoreValue');
const livesValue = document.getElementById('livesValue');
const centerMessage = document.getElementById('centerMessage');
const mainMenu = document.getElementById('mainMenu');
const subTitle = document.getElementById('subTitle');
const startBtn = document.getElementById('startBtn');
const swatch = document.querySelectorAll('.swatch');

// Handle customization selection
swatch.forEach(swatchButton => {
    swatchButton.addEventListener("click", (e) => {
        swatch.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        setSelectedShipColor(e.target.getAttribute('data-color'));
        SFX.ui();

        const selectedColor = getSelectedShipColor();
        document.getElementById('scoreDisplay').style.color = selectedColor;
        document.getElementById('scoreDisplay').style.textShadow = `0 0 10px ${selectedColor}`;
        startBtn.style.borderColor = selectedColor;
        startBtn.style.color = selectedColor;
        startBtn.style.boxShadow = `0 0 10px ${selectedColor}`;
    });
});

const selectedColor = getSelectedShipColor();
startBtn.style.borderColor = selectedColor;
startBtn.style.color = selectedColor;
startBtn.style.boxShadow = `0 0 10px ${selectedColor}`;

startBtn.addEventListener('mouseenter', () => {
    startBtn.style.background = getSelectedShipColor();
    startBtn.style.color = "#000";
});
startBtn.addEventListener('mouseleave', () => {
    startBtn.style.background = 'transparent';
    startBtn.style.color = getSelectedShipColor();
});

startBtn.addEventListener('click', () => {
    if (getGameState() === 'MENU') {
        ensureAudio();
        SFX.ui();
        startGame();
    }
});

function showMenu() {
    setGameState('MENU');
    mainMenu.classList.remove('hidden');
    centerMessage.classList.add('hidden');
}

function showGameOver(score) {
    subTitle.innerText = `Final Score: ${score}`;
    centerMessage.classList.remove("hidden");
}

function updateUI() {
    scoreValue.innerText = getScore();
    livesValue.innerText = getLives();
}

export { showMenu, showGameOver, updateUI };