// Web Audio API Synthesizer for high-quality, completely offline feedback

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Camera shutter sound
  playShutter() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);

      // Secondary click
      setTimeout(() => {
        if (!this.ctx) return;
        const t2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(450, t2);
        gain2.gain.setValueAtTime(0.25, t2);
        gain2.gain.exponentialRampToValueAtTime(0.01, t2 + 0.05);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(t2);
        osc2.stop(t2 + 0.06);
      }, 70);
    } catch {
      // Audio not supported or blocked
    }
  }

  // Gentle Tasbih / Counter click
  playTick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.04);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // Audio not supported
    }
  }

  // Gentle dismiss / pop sound
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.08);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch {
      // Audio blocked or unsupported
    }
  }

  // Uplifting prayer acceptance chime
  playPrayerAccepted() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (harmonious major chord)

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const startTime = t + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {
      // ignore
    }
  }

  // Magnificent Level Up Fanfare
  playLevelUp() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Majestic ascending spiritual sequence
      const melody = [
        { f: 440.0, d: 0.15 },  // A4
        { f: 554.37, d: 0.15 }, // C#5
        { f: 659.25, d: 0.18 }, // E5
        { f: 880.0, d: 0.3 },   // A5
        { f: 783.99, d: 0.15 }, // G5
        { f: 880.0, d: 0.5 },   // A5
        { f: 1108.73, d: 0.8 }, // C#6
      ];

      let currentT = t;
      melody.forEach(item => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, currentT);

        gain.gain.setValueAtTime(0.28, currentT);
        gain.gain.exponentialRampToValueAtTime(0.001, currentT + item.d + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(currentT);
        osc.stop(currentT + item.d + 0.25);

        currentT += item.d;
      });
    } catch {
      // ignore
    }
  }

  // Incoming room message ping
  playRoomPing() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, t);
      osc.frequency.setValueAtTime(987.77, t + 0.08);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.32);
    } catch {
      // ignore
    }
  }

  // Spiritual Adhan synthesis melody (Reverent Maqam Bayati cadence)
  playAdhan() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [
        { f: 392.00, d: 0.35, v: 0.22 }, // G4
        { f: 440.00, d: 0.40, v: 0.25 }, // A4
        { f: 493.88, d: 0.50, v: 0.26 }, // B4
        { f: 523.25, d: 0.70, v: 0.28 }, // C5
        { f: 493.88, d: 0.45, v: 0.22 }, // B4
        { f: 440.00, d: 0.80, v: 0.20 }, // A4
      ];

      let cur = t;
      notes.forEach(n => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, cur);
        gain.gain.setValueAtTime(n.v, cur);
        gain.gain.exponentialRampToValueAtTime(0.001, cur + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(cur);
        osc.stop(cur + n.d + 0.05);
        cur += n.d * 0.85;
      });
    } catch {
      // ignore
    }
  }

  // Festive Takbeer cadence
  playTakbeer() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // "Allahu Akbar, Allahu Akbar"
      const notes = [
        { f: 523.25, d: 0.22 }, // C5
        { f: 659.25, d: 0.35 }, // E5
        { f: 783.99, d: 0.50 }, // G5
        { f: 523.25, d: 0.22 }, // C5
        { f: 659.25, d: 0.35 }, // E5
        { f: 783.99, d: 0.65 }, // G5
      ];
      let cur = t;
      notes.forEach(n => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, cur);
        gain.gain.setValueAtTime(0.24, cur);
        gain.gain.exponentialRampToValueAtTime(0.001, cur + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(cur);
        osc.stop(cur + n.d + 0.05);
        cur += n.d * 0.9;
      });
    } catch {
      // ignore
    }
  }

  // Serene peaceful chime
  playSereneChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [880, 1318.51, 1760].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.1);
        gain.gain.setValueAtTime(0.18, t + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.1 + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.1);
        osc.stop(t + idx * 0.1 + 1.3);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEffects();
