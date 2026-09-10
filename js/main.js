import "./input.js"
import "./ui.js"
import { getSelectedShipColor } from "./core.js";
import { gameLoop, initStars } from "./game.js";

// Initialize and start loop
initStars();

// Initial setup for default color button highlighting dynamically
const defaultColor = getSelectedShipColor();
document.getElementById('scoreDisplay').style.color = defaultColor;
document.getElementById('scoreDisplay').style.textShadow = `0 0 10px ${defaultColor}`;

requestAnimationFrame(gameLoop);
