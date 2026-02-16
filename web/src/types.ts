export type TimePeriod = 'morning' | 'forenoon' | 'lunch' | 'afternoon' | 'evening' | 'night';

export type Mood = 'energetic' | 'focused' | 'relaxed' | 'calm' | 'mellow' | 'peaceful';

export type MusicStyle = 'ambient' | 'lofi' | 'jazz';

export interface TimePeriodInfo {
  period: TimePeriod;
  label: string;
  emoji: string;
  mood: Mood;
  timeRange: string;
}

export interface MusicParams {
  scale: string[];
  bpm: number;
  synthType: 'triangle' | 'sine' | 'square' | 'sawtooth';
  attack: number;
  release: number;
  reverbWet: number;
  delayTime: string;
  delayFeedback: number;
}
