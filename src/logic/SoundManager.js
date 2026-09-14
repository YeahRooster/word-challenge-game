class SoundManager {
    constructor() {
        this.audioCtx = null;
        this.bgmInterval = null;
        this.musicVolume = 0.015;
        this.isMusicMuted = false;
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    async playSuccess() {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.audioCtx.currentTime); // La
        osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.1); // La alto

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
    }

    async playError() {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.audioCtx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
    }

    async playTick() {
        this.init();
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, this.audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
    }

    async playGameOver() {
        this.init();
        if (!this.audioCtx) return;
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc1.frequency.setValueAtTime(220, this.audioCtx.currentTime);
        osc1.frequency.linearRampToValueAtTime(110, this.audioCtx.currentTime + 0.8);

        osc2.frequency.setValueAtTime(225, this.audioCtx.currentTime);
        osc2.frequency.linearRampToValueAtTime(115, this.audioCtx.currentTime + 0.8);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 1.0);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(this.audioCtx.currentTime + 1.0);
        osc2.stop(this.audioCtx.currentTime + 1.0);
    }

    startBGM() {
        this.init();
        if (this.bgmInterval) return;

        // Notas alegres en escala de Do Mayor (C5 a C6)
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        let step = 0;

        this.bgmInterval = setInterval(() => {
            if (this.isMusicMuted || this.musicVolume <= 0) return;

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            // Melodía más estructurada y alegre
            const melody = [0, 4, 7, 4, 2, 5, 9, 5]; // Patrón de arpegio alegre
            const freq = notes[melody[step % melody.length]];

            osc.type = 'triangle'; // Sonido más cálido y menos "zumbante" que sine
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            // Envolvente de sonido "Pluck" (punteado) muy suave
            gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(this.musicVolume, this.audioCtx.currentTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.4);

            step++;
        }, 400); // Ritmo alegre y constante
    }

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    }

    setMusicVolume(value) {
        this.musicVolume = parseFloat(value);
    }

    toggleMusicMute() {
        this.isMusicMuted = !this.isMusicMuted;
        return this.isMusicMuted;
    }
}

export const soundManager = new SoundManager();
