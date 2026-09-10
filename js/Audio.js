/* Audio Engine */
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtor) return null;

        try {
            audioCtx = new AudioCtor();
        } catch {
            return null;
        }
    }

    return audioCtx;
}

function ensureAudio() {
    const ctx = getAudioContext();
    if (!ctx) return null;

    if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
    }

    return ctx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    const ctx = ensureAudio();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.stop(ctx.currentTime + duration);
}

let lastExplosion = 0; const SFX = {
    soot() {
        playTone(900, 0.05, "square", 0.12);
        playTone(600, 0.05, "triangle", 0.05);
    },
    explosion() {
        if (Date.now() - lastExplosion < 40) return;
            lastExplosion = Date.now();
            playTone(120, 0.30, "sawtooth", 0.35);
            playTone(70, 0.25, "square", 0.20); 
    },
    playerDeath() {
        playTone(300, 0.12, "square", 0.25);
        setTimeout(() => playTone(180, 0.15, "square", 0.22), 80);
        setTimeout(() => playTone(90, 0.25, "sawtooth", 0.20), 170);
    },
    thrust() {
        playTone(110, 0.08, "triangle", 0.35);
        playTone(220, 0.05, "sawtooth", 0.12);
    },
    ui() {
        playTone(750, 0.06, "square", 0.10);
    },
    levelUp() {
        playTone(500, 0.08);
        setTimeout(() => playTone(700, 0.08), 80);
        setTimeout(() => playTone(1000, 0.10), 160);
    },
    hit() {
        playTone(220, 0.12, "sawtooth", 0.18);
    },
};

export { audioCtx, ensureAudio, SFX };