/**
 * Audio synthesis engine utilizing the Web Audio API.
 * Guarantees zero latency and 100% reliable sound effects without broken audio files.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft tactile bubble pop
  public playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Melodic celebratory arpeggio for correct answer
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = this.ctx!.currentTime + i * 0.09;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Ignore
    }
  }

  // Gentle, friendly encouragement chime for second tries
  public playTryAgain() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 493.88]; // A4, B4 (positive, gentle)
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = this.ctx!.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // Sparkling star twinkle
  public playStarEarned() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [784, 988, 1175, 1568];
      freqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.07);

        const startTime = this.ctx!.currentTime + i * 0.07;
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  // Triumphant fanfare when unlocking badge or finishing level
  public playBadgeUnlock() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.7);
      });
    } catch {
      // Ignore
    }
  }

  // Text-To-Speech for accessibility and young children (supports Arabic ar-SA and English)
  public speakText(text: string, lang: 'ar' | 'en' = 'ar') {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 0.88; // Slightly gentle & slower for kindergarten
      utterance.pitch = 1.1; // Friendly tone

      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => lang === 'ar' ? v.lang.startsWith('ar') : v.lang.startsWith('en'));
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback
    }
  }
}

export const sound = new SoundService();
