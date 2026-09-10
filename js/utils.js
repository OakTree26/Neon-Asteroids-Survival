/* Math helper */
export const TWO_PI = Math.PI * 2;
export function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}