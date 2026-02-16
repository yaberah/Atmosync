import type { TimePeriod, TimePeriodInfo, Mood } from './types';

const TIME_PERIOD_CONFIG: Record<TimePeriod, Omit<TimePeriodInfo, 'period'>> = {
  morning: {
    label: '朝（出勤時）',
    emoji: '🌅',
    mood: 'energetic',
    timeRange: '6:00 - 8:59',
  },
  forenoon: {
    label: '午前',
    emoji: '☀️',
    mood: 'focused',
    timeRange: '9:00 - 11:59',
  },
  lunch: {
    label: '昼休み',
    emoji: '🍱',
    mood: 'relaxed',
    timeRange: '12:00 - 12:59',
  },
  afternoon: {
    label: '午後',
    emoji: '💼',
    mood: 'calm',
    timeRange: '13:00 - 16:59',
  },
  evening: {
    label: '夕方',
    emoji: '🌆',
    mood: 'mellow',
    timeRange: '17:00 - 19:59',
  },
  night: {
    label: '夜',
    emoji: '🌙',
    mood: 'peaceful',
    timeRange: '20:00 - 5:59',
  },
};

export function detectTimePeriod(hour: number): TimePeriod {
  if (hour >= 6 && hour <= 8) return 'morning';
  if (hour >= 9 && hour <= 11) return 'forenoon';
  if (hour === 12) return 'lunch';
  if (hour >= 13 && hour <= 16) return 'afternoon';
  if (hour >= 17 && hour <= 19) return 'evening';
  return 'night';
}

export function getTimePeriodInfo(hour: number): TimePeriodInfo {
  const period = detectTimePeriod(hour);
  return { period, ...TIME_PERIOD_CONFIG[period] };
}

export function getMoodLabel(mood: Mood): string {
  const labels: Record<Mood, string> = {
    energetic: '活気のある',
    focused: '集中的',
    relaxed: 'リラックス',
    calm: '落ち着いた',
    mellow: '穏やかな',
    peaceful: '平和な',
  };
  return labels[mood];
}
