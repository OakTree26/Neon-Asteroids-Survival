const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

export let selectedShipColor = "#0ff";

export function setSelectedShipColor(color) {
    selectedShipColor = color;
}

export function getSelectedShipColor() {
    return selectedShipColor;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

export { canvas, ctx };