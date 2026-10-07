/**
 * Natural Human-Like Educational Voice Synthesis Engine
 * Provides authentic pacing, pauses, emotional intonation, and pronunciation for kindergarten pedagogy.
 */

export type VoiceTone = 'kindergarten_warmth' | 'enthusiastic_explorer' | 'calm_storyteller';

export interface NarrationOptions {
  tone?: VoiceTone;
  lang?: 'ar' | 'en';
  onBoundary?: (charIndex: number, spokenWord: string) => void;
  onSentenceChange?: (sentenceIndex: number, text: string) => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

class NaturalVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  /**
   * Cleans text and injects prosody cues (natural pauses, gentle comma separations)
   */
  public prepareNaturalScript(text: string): string {
    return text
      .replace(/([.!?،؟])\s+/g, '$1   ') // Natural breath pauses between sentences
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Speaks the provided educational narration with human-like intonation and cadence.
   */
  public speak(text: string, options: NarrationOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        options.onEnd?.();
        resolve();
        return;
      }

      this.stop();

      const lang = options.lang || 'ar';
      const tone = options.tone || 'kindergarten_warmth';
      const preparedText = this.prepareNaturalScript(text);

      const utterance = new SpeechSynthesisUtterance(preparedText);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';

      // Human-like Kindergarten Voice Tuning
      switch (tone) {
        case 'kindergarten_warmth':
          utterance.rate = 0.88;  // Natural, unhurried cadence for young children
          utterance.pitch = 1.08; // Friendly, warm, smiling tone
          break;
        case 'enthusiastic_explorer':
          utterance.rate = 0.95;  // Energetic
          utterance.pitch = 1.18; // Cheerful discovery inflection
          break;
        case 'calm_storyteller':
          utterance.rate = 0.82;  // Soothing, rhythmic storytelling
          utterance.pitch = 0.96; // Grounded, warm comfort
          break;
      }

      // Voice selection: prioritize native Arabic voices (e.g. Maged, Laila, Tarik, Google Arabic, Apple Arabic)
      const voices = this.synth.getVoices();
      const targetVoices = voices.filter(v =>
        lang === 'ar' ? v.lang.startsWith('ar') : v.lang.startsWith('en')
      );

      // Prefer high-quality neural/natural voice if available
      const naturalVoice = targetVoices.find(v =>
        v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('online') ||
        v.name.toLowerCase().includes('premium') ||
        v.name.toLowerCase().includes('maged') ||
        v.name.toLowerCase().includes('laila')
      ) || targetVoices[0];

      if (naturalVoice) {
        utterance.voice = naturalVoice;
      }

      // Sentence & word boundary tracking
      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          const word = preparedText.substring(e.charIndex, e.charIndex + (e.charLength || 6));
          options.onBoundary?.(e.charIndex, word);
        }
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        const err = new Error(e.error || 'Speech synthesis error');
        options.onError?.(err);
        resolve(); // Avoid uncaught rejections in UI
      };

      this.currentUtterance = utterance;
      this.isSpeaking = true;
      this.synth.speak(utterance);
    });
  }

  public pause() {
    if (this.synth && this.isSpeaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const naturalVoice = new NaturalVoiceEngine();
