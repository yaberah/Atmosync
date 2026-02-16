import { useEffect, useRef } from 'react';
import type { TimePeriod } from '../types';

/**
 * 時間帯が変わった時にコールバックを実行するフック
 */
export function useTimePeriodAutoUpdate(
  currentPeriod: TimePeriod,
  onPeriodChange: (period: TimePeriod) => void,
) {
  const prevPeriod = useRef(currentPeriod);

  useEffect(() => {
    if (prevPeriod.current !== currentPeriod) {
      prevPeriod.current = currentPeriod;
      onPeriodChange(currentPeriod);
    }
  }, [currentPeriod, onPeriodChange]);
}
