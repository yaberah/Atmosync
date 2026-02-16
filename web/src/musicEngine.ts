import * as Tone from 'tone';
import type { MusicStyle, Mood, MusicParams } from './types';

// --- スケール定義 ---
const SCALES = {
  pentatonicMajor: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'],
  pentatonicMinor: ['C4', 'Eb4', 'F4', 'G4', 'Bb4', 'C5', 'Eb5', 'F5'],
  dorian: ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
  mixolydian: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
  lydian: ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C5'],
  aeolian: ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'],
};

// --- スタイル × ムードごとの音楽パラメータ ---
function getMusicParams(style: MusicStyle, mood: Mood): MusicParams {
  const baseParams: Record<MusicStyle, Record<Mood, MusicParams>> = {
    ambient: {
      energetic: { scale: SCALES.lydian, bpm: 90, synthType: 'triangle', attack: 0.8, release: 2.0, reverbWet: 0.7, delayTime: '8n', delayFeedback: 0.3 },
      focused:   { scale: SCALES.pentatonicMajor, bpm: 75, synthType: 'sine', attack: 1.0, release: 2.5, reverbWet: 0.8, delayTime: '4n', delayFeedback: 0.4 },
      relaxed:   { scale: SCALES.pentatonicMinor, bpm: 65, synthType: 'sine', attack: 1.2, release: 3.0, reverbWet: 0.85, delayTime: '4n', delayFeedback: 0.35 },
      calm:      { scale: SCALES.aeolian, bpm: 60, synthType: 'sine', attack: 1.5, release: 3.0, reverbWet: 0.9, delayTime: '2n', delayFeedback: 0.3 },
      mellow:    { scale: SCALES.dorian, bpm: 55, synthType: 'sine', attack: 1.5, release: 3.5, reverbWet: 0.9, delayTime: '2n', delayFeedback: 0.25 },
      peaceful:  { scale: SCALES.pentatonicMinor, bpm: 50, synthType: 'sine', attack: 2.0, release: 4.0, reverbWet: 0.95, delayTime: '1n', delayFeedback: 0.2 },
    },
    lofi: {
      energetic: { scale: SCALES.dorian, bpm: 95, synthType: 'triangle', attack: 0.05, release: 0.8, reverbWet: 0.4, delayTime: '8n', delayFeedback: 0.3 },
      focused:   { scale: SCALES.pentatonicMinor, bpm: 85, synthType: 'triangle', attack: 0.05, release: 1.0, reverbWet: 0.5, delayTime: '8n', delayFeedback: 0.35 },
      relaxed:   { scale: SCALES.pentatonicMinor, bpm: 75, synthType: 'triangle', attack: 0.08, release: 1.2, reverbWet: 0.55, delayTime: '4n', delayFeedback: 0.3 },
      calm:      { scale: SCALES.aeolian, bpm: 70, synthType: 'triangle', attack: 0.1, release: 1.5, reverbWet: 0.5, delayTime: '4n', delayFeedback: 0.25 },
      mellow:    { scale: SCALES.dorian, bpm: 65, synthType: 'triangle', attack: 0.1, release: 1.5, reverbWet: 0.6, delayTime: '4n', delayFeedback: 0.3 },
      peaceful:  { scale: SCALES.pentatonicMinor, bpm: 60, synthType: 'sine', attack: 0.15, release: 2.0, reverbWet: 0.65, delayTime: '2n', delayFeedback: 0.2 },
    },
    jazz: {
      energetic: { scale: SCALES.mixolydian, bpm: 130, synthType: 'triangle', attack: 0.02, release: 0.4, reverbWet: 0.35, delayTime: '16n', delayFeedback: 0.2 },
      focused:   { scale: SCALES.dorian, bpm: 115, synthType: 'triangle', attack: 0.03, release: 0.5, reverbWet: 0.4, delayTime: '8n', delayFeedback: 0.25 },
      relaxed:   { scale: SCALES.pentatonicMajor, bpm: 100, synthType: 'triangle', attack: 0.05, release: 0.6, reverbWet: 0.45, delayTime: '8n', delayFeedback: 0.3 },
      calm:      { scale: SCALES.dorian, bpm: 90, synthType: 'triangle', attack: 0.05, release: 0.7, reverbWet: 0.45, delayTime: '8n', delayFeedback: 0.25 },
      mellow:    { scale: SCALES.aeolian, bpm: 80, synthType: 'triangle', attack: 0.08, release: 0.8, reverbWet: 0.5, delayTime: '4n', delayFeedback: 0.3 },
      peaceful:  { scale: SCALES.pentatonicMinor, bpm: 70, synthType: 'sine', attack: 0.1, release: 1.0, reverbWet: 0.55, delayTime: '4n', delayFeedback: 0.25 },
    },
  };

  return baseParams[style][mood];
}

// --- メロディ生成 ---
function generateMelody(scale: string[], length: number): string[] {
  const melody: string[] = [];
  let prevIndex = Math.floor(Math.random() * scale.length);

  for (let i = 0; i < length; i++) {
    // 時々休符を入れる（20%の確率）
    if (Math.random() < 0.2) {
      melody.push('rest');
      continue;
    }
    // 前の音から近い音を選ぶ（ステップワイズモーション）
    const maxJump = 3;
    const minIndex = Math.max(0, prevIndex - maxJump);
    const maxIndex = Math.min(scale.length - 1, prevIndex + maxJump);
    const nextIndex = minIndex + Math.floor(Math.random() * (maxIndex - minIndex + 1));
    melody.push(scale[nextIndex]);
    prevIndex = nextIndex;
  }
  return melody;
}

// --- 音楽エンジンクラス ---
export class MusicEngine {
  private synth: Tone.PolySynth | null = null;
  private reverb: Tone.Reverb | null = null;
  private delay: Tone.FeedbackDelay | null = null;
  private sequence: Tone.Sequence | null = null;
  private isPlaying = false;
  private currentParams: MusicParams | null = null;

  async start(style: MusicStyle, mood: Mood): Promise<void> {
    await Tone.start();
    this.stop();

    const params = getMusicParams(style, mood);
    this.currentParams = params;

    Tone.getTransport().bpm.value = params.bpm;

    // エフェクトチェーン
    this.reverb = new Tone.Reverb({ decay: 4, wet: params.reverbWet });
    this.delay = new Tone.FeedbackDelay({
      delayTime: params.delayTime,
      feedback: params.delayFeedback,
      wet: 0.3,
    });

    // シンセ
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: params.synthType },
      envelope: {
        attack: params.attack,
        decay: 0.3,
        sustain: 0.4,
        release: params.release,
      },
      volume: -12,
    });

    this.synth.chain(this.delay, this.reverb, Tone.getDestination());

    // メロディ生成
    const melody = generateMelody(params.scale, 32);

    // ノートの長さのバリエーション
    const durations = ['8n', '4n', '4n', '2n'];

    this.sequence = new Tone.Sequence(
      (time, note) => {
        if (note !== 'rest' && this.synth) {
          const duration = durations[Math.floor(Math.random() * durations.length)];
          this.synth.triggerAttackRelease(note, duration, time);
        }
      },
      melody,
      '4n',
    );

    this.sequence.loop = true;
    this.sequence.start(0);
    Tone.getTransport().start();
    this.isPlaying = true;
  }

  stop(): void {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
    if (this.synth) {
      this.synth.dispose();
      this.synth = null;
    }
    if (this.delay) {
      this.delay.dispose();
      this.delay = null;
    }
    if (this.reverb) {
      this.reverb.dispose();
      this.reverb = null;
    }
    Tone.getTransport().stop();
    this.isPlaying = false;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getParams(): MusicParams | null {
    return this.currentParams;
  }
}
