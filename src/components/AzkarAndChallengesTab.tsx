import React, { useState } from 'react';
import { User, DailyChallenge, DhikrItem } from '../types';
import { SEED_DHIKR } from '../utils/storage';
import { sound } from '../utils/sound';
import { Sparkles, Check, RotateCcw, Award, Flame, Sun, Moon, ShieldCheck, Heart, Camera } from 'lucide-react';

interface AzkarAndChallengesTabProps {
  user: User;
  challenges: DailyChallenge[];
  onClaimChallenge: (challengeId: string) => void;
  onOpenProofForChallenge: (challenge: DailyChallenge) => void;
  onAddXp: (amount: number, reason: string) => void;
}

export const AzkarAndChallengesTab: React.FC<AzkarAndChallengesTabProps> = ({
  user,
  challenges,
  onClaimChallenge,
  onOpenProofForChallenge,
  onAddXp,
}) => {
  const [subTab, setSubTab] = useState<'challenges' | 'azkar' | 'tasbih'>('challenges');
  const [azkarCategory, setAzkarCategory] = useState<'morning' | 'evening' | 'post_prayer'>('morning');

  const [azkarProgress, setAzkarProgress] = useState<Record<string, number>>({});
  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTarget] = useState(33);
  const [tasbihDhikrIndex, setTasbihDhikrIndex] = useState(0);

  const tasbihPhrases = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'اللَّهُ أَكْبَرُ',
    'لَا إِلَٰهَ إِلَّا اللَّهُ',
    'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
  ];

  const handleDhikrTap = (item: DhikrItem) => {
    sound.playTick();
    const current = azkarProgress[item.id] || 0;
    const next = current + 1;
    setAzkarProgress(prev => ({ ...prev, [item.id]: next }));

    if (next === item.countTarget) {
      sound.playPrayerAccepted();
      onAddXp(8, `إتمام ذكر: ${item.text.slice(0, 20)}...`);
    }
  };

  const handleTasbihTap = () => {
    sound.playTick();
    const next = tasbihCount + 1;
    setTasbihCount(next);

    if (next % tasbihTarget === 0) {
      sound.playPrayerAccepted();
      onAddXp(5, `إتمام دورة تسبيح (${tasbihTarget})`);
      if (tasbihTarget === 33) {
        setTasbihDhikrIndex(prev => (prev + 1) % 3);
      }
    }
  };

  const resetTasbih = () => {
    sound.playTick();
    setTasbihCount(0);
  };

  const filteredAzkar = SEED_DHIKR.filter(item => {
    if (azkarCategory === 'morning') return item.category === 'morning';
    if (azkarCategory === 'evening') return item.category === 'evening' || item.category === 'morning';
    return item.category === 'post_prayer';
  });

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>التحديات اليومية والأذكار الدورية ✨</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          مهام ميسرة وموثقة بالدليل لمنع السبام، وأذكار لتثبيت الستريك والارتقاء في الـ 250 مستوى.
        </p>
      </div>

      {/* Sub Tabs Switcher */}
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => setSubTab('challenges')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            subTab === 'challenges'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          التحديات اليومية (بالدليل)
        </button>

        <button
          onClick={() => setSubTab('azkar')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            subTab === 'azkar'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          الأذكار الدورية
        </button>

        <button
          onClick={() => setSubTab('tasbih')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            subTab === 'tasbih'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          المسبحة الذكية
        </button>
      </div>

      {/* 1. Daily Challenges View */}
      {subTab === 'challenges' && (
        <div className="space-y-3">
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              مهام مبسطة موثقة بالدليل الحي لمنع الغش
            </span>
            <span className="font-bold text-amber-300">
              نقاط موزونة حتى ليفل 250
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {challenges.map(ch => {
              const isReadyToClaim = ch.progress >= ch.target;

              return (
                <div
                  key={ch.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                    ch.completed
                      ? 'bg-slate-900/60 border-slate-800 opacity-80'
                      : isReadyToClaim
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/30'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                      {ch.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm sm:text-base text-white">
                          {ch.title}
                        </h4>
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          +{ch.xpReward} XP
                        </span>
                        {ch.requiresProof && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-500/30">
                            <Camera className="w-3 h-3" />
                            يلزم دليل
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {ch.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${Math.min(100, (ch.progress / ch.target) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {ch.progress} / {ch.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-center flex items-center gap-2">
                    {ch.completed ? (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        تم الإنجاز
                      </span>
                    ) : ch.requiresProof ? (
                      <button
                        onClick={() => onOpenProofForChallenge(ch)}
                        className="px-3.5 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white active:scale-95"
                      >
                        <Camera className="w-4 h-4" />
                        <span>تصوير الدليل</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onClaimChallenge(ch.id)}
                        disabled={!isReadyToClaim}
                        className={`px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 ${
                          isReadyToClaim
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black animate-pulse'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        {isReadyToClaim ? 'استلام الجائزة' : 'قيد التقدم'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Periodic Azkar View */}
      {subTab === 'azkar' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setAzkarCategory('morning')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                azkarCategory === 'morning'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-400" />
              أذكار الصباح
            </button>
            <button
              onClick={() => setAzkarCategory('evening')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                azkarCategory === 'evening'
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              أذكار المساء
            </button>
            <button
              onClick={() => setAzkarCategory('post_prayer')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                azkarCategory === 'post_prayer'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ما بعد الصلاة
            </button>
          </div>

          <div className="space-y-3">
            {filteredAzkar.map(item => {
              const currentCount = azkarProgress[item.id] || 0;
              const isCompleted = currentCount >= item.countTarget;
              const remaining = Math.max(0, item.countTarget - currentCount);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-2">
                    {item.text}
                  </p>
                  <p className="text-xs text-emerald-400/90 font-medium mb-3">
                    {item.reward}
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <span className="text-xs text-slate-400">
                      الهدف: {item.countTarget} مرة • متبقي: {remaining}
                    </span>

                    <button
                      onClick={() => handleDhikrTap(item)}
                      disabled={isCompleted}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95 ${
                        isCompleted
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-4 h-4" />
                          تم الإتمام (+8 XP)
                        </>
                      ) : (
                        <>
                          <span className="font-mono text-sm">{currentCount}</span>
                          <span>/ {item.countTarget} (اضغط)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Smart Digital Tasbih View */}
      {subTab === 'tasbih' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center max-w-md mx-auto shadow-2xl relative">
          <div className="flex justify-center gap-2 mb-6">
            {[33, 100, 1000].map(tg => (
              <button
                key={tg}
                onClick={() => {
                  setTasbihTarget(tg);
                  sound.playTick();
                }}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all border ${
                  tasbihTarget === tg
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                دورة {tg}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <span className="text-xs text-slate-400 block mb-1">الذكر المختار:</span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-serif min-h-[36px]">
              {tasbihPhrases[tasbihDhikrIndex]}
            </h3>
            <div className="flex justify-center gap-1.5 mt-2">
              {tasbihPhrases.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTasbihDhikrIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    tasbihDhikrIndex === idx ? 'bg-amber-400 w-5' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleTasbihTap}
            className="w-48 h-48 mx-auto my-6 rounded-full bg-gradient-to-tr from-emerald-950 via-slate-800 to-teal-950 border-4 border-emerald-500/50 flex flex-col items-center justify-center text-white shadow-2xl shadow-emerald-500/20 active:scale-95 transition-transform cursor-pointer select-none group"
          >
            <span className="text-5xl font-black font-mono tracking-wider group-hover:scale-105 transition-transform">
              {tasbihCount}
            </span>
            <span className="text-xs font-bold text-emerald-400 mt-2">
              اضغط للتسبيح (+5 XP)
            </span>
          </button>

          <div className="flex items-center justify-between px-4 mt-2">
            <span className="text-xs text-slate-400">
              مكتمل: {Math.floor(tasbihCount / tasbihTarget)} دورات
            </span>
            <button
              onClick={resetTasbih}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
              title="تصفير العداد"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
