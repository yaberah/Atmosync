import { useState, useRef, useCallback } from 'react';
import { useClock } from './hooks/useClock';
import { useTimePeriodAutoUpdate } from './hooks/useTimePeriodAutoUpdate';
import { getTimePeriodInfo, getMoodLabel } from './timePeriod';
import { MusicEngine } from './musicEngine';
import type { MusicStyle } from './types';

const STYLES: { value: MusicStyle; label: string }[] = [
  { value: 'ambient', label: 'アンビエント' },
  { value: 'lofi', label: 'ローファイ' },
  { value: 'jazz', label: 'ジャズ' },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function App() {
  const now = useClock();
  const periodInfo = getTimePeriodInfo(now.getHours());
  const engineRef = useRef<MusicEngine | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [style, setStyle] = useState<MusicStyle>('lofi');

  const getEngine = () => {
    if (!engineRef.current) {
      engineRef.current = new MusicEngine();
    }
    return engineRef.current;
  };

  const handlePlay = async () => {
    const engine = getEngine();
    await engine.start(style, periodInfo.mood);
    setIsPlaying(true);
  };

  const handleStop = () => {
    getEngine().stop();
    setIsPlaying(false);
  };

  const handleRegenerate = async () => {
    const engine = getEngine();
    await engine.start(style, periodInfo.mood);
    setIsPlaying(true);
  };

  const handleStyleChange = async (newStyle: MusicStyle) => {
    setStyle(newStyle);
    if (isPlaying) {
      const engine = getEngine();
      await engine.start(newStyle, periodInfo.mood);
    }
  };

  // 時間帯が変わったら自動で音楽を更新
  const handlePeriodChange = useCallback(async () => {
    if (isPlaying) {
      const engine = getEngine();
      const hour = new Date().getHours();
      const info = getTimePeriodInfo(hour);
      await engine.start(style, info.mood);
    }
  }, [isPlaying, style]);

  useTimePeriodAutoUpdate(periodInfo.period, handlePeriodChange);

  const params = getEngine().getParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] space-y-5">
        {/* ヘッダー */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight">Atmosync</h1>
          <p className="text-white/70 mt-1">オフィスの雰囲気を音楽で変える</p>
        </div>

        {/* 時計・時間帯カード */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-6 backdrop-blur">
          <div className="text-center">
            <div className="text-5xl font-mono font-bold text-gray-800 tracking-wider">
              {formatTime(now)}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-2xl">{periodInfo.emoji}</span>
              <span className="text-lg text-gray-600 font-medium">{periodInfo.label}</span>
              <span className="text-sm text-gray-400">({periodInfo.timeRange})</span>
            </div>
          </div>
        </div>

        {/* スタイル選択カード */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-6 backdrop-blur">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            スタイル
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {STYLES.map((s) => (
              <button
                key={s.value}
                onClick={() => handleStyleChange(s.value)}
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  style === s.value
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 再生コントロールカード */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-6 backdrop-blur">
          <div className="flex gap-3">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                ▶ 再生
              </button>
            ) : (
              <>
                <button
                  onClick={handleStop}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  ■ 停止
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  ↻ 曲を変更
                </button>
              </>
            )}
          </div>

          {/* 再生状態 */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}
            />
            <span className="text-sm text-gray-500">
              {isPlaying ? '再生中' : '停止中'}
            </span>
          </div>
        </div>

        {/* 音楽情報カード */}
        {isPlaying && params && (
          <div className="bg-white/95 rounded-2xl shadow-xl p-6 backdrop-blur">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              現在の音楽設定
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">スタイル</div>
                <div className="font-semibold text-gray-700">
                  {STYLES.find((s) => s.value === style)?.label}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">雰囲気</div>
                <div className="font-semibold text-gray-700">{getMoodLabel(periodInfo.mood)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">テンポ</div>
                <div className="font-semibold text-gray-700">{params.bpm} BPM</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">音色</div>
                <div className="font-semibold text-gray-700">{params.synthType}</div>
              </div>
            </div>
          </div>
        )}

        {/* フッター */}
        <div className="text-center text-white/50 text-xs">
          Atmosync — 時間帯に合わせた音楽を自動生成
        </div>
      </div>
    </div>
  );
}
