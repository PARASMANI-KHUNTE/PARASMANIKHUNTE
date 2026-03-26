// A premium synthetic UI sound utility using Web Audio API
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  // Create a glassy "tink" or soft click
  playClick(freq = 1200, type = "sine", duration = 0.05) {
    if (this.isMuted || !this.ctx) return;
    this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, this.ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Premium "awakening" swell + chime
  playInit() {
    if (this.isMuted || !this.ctx) return;
    this.ctx.resume();

    // 1. Low Swell
    const swell = this.ctx.createOscillator();
    const swellGain = this.ctx.createGain();
    swell.type = "sine";
    swell.frequency.setValueAtTime(60, this.ctx.currentTime);
    swell.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 1.2);
    swellGain.gain.setValueAtTime(0, this.ctx.currentTime);
    swellGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.6);
    swellGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);
    swell.connect(swellGain);
    swellGain.connect(this.ctx.destination);
    swell.start();
    swell.stop(this.ctx.currentTime + 1.2);

    // 2. High Chime (delayed slightly)
    setTimeout(() => {
      if (this.isMuted) return;
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chime.type = "triangle";
      chime.frequency.setValueAtTime(1600, this.ctx.currentTime);
      chimeGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chime.start();
      chime.stop(this.ctx.currentTime + 0.8);
    }, 400);
  }

  // Mood-specific premium textures
  playMood(mood) {
    switch(mood) {
      case 1: // Rotation Shift
        this.playClick(800, "sine", 0.15);
        break;
      case 2: // Pulse Expand
        this.playClick(300, "triangle", 0.2);
        break;
      case 3: // Glisten
        this.playClick(2000, "sine", 0.3);
        setTimeout(() => this.playClick(2400, "sine", 0.2), 100);
        break;
      default:
        this.playClick(1000, "sine", 0.05);
    }
  }

  // Legacy support for playBloop calls
  playBloop() {
    this.playClick(1000, "sine", 0.05);
  }
}

export const sounds = new SoundManager();

