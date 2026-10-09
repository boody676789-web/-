import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getTierForLevel, getTitleForLevel, getNextRewardDescription, LEVEL_UP_QUOTES } from '../utils/levels';
import { sound } from '../utils/sound';
import { Sparkles, Trophy, Award, ArrowLeft, Star } from 'lucide-react';

interface LevelUpCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

export const LevelUpCelebrationModal: React.FC<LevelUpCelebrationModalProps> = ({
  isOpen,
  onClose,
  newLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playLevelUp();

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#fbbf24', '#3b82f6', '#a855f7', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tier = getTierForLevel(newLevel);
  const title = getTitleForLevel(newLevel);
  const nextReward = getNextRewardDescription(newLevel);
  const randomQuote = LEVEL_UP_QUOTES[newLevel % LEVEL_UP_QUOTES.length];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center text-white animate-in zoom-in-95 duration-300"
        style={{ borderColor: tier.colorHex }}
      >
        {/* Glow icon */}
        <div className="relative mb-4">
          <div
            className="w-24 h-24 mx-auto rounded-3xl border-4 flex items-center justify-center text-5xl shadow-2xl animate-bounce"
            style={{
              borderColor: tier.colorHex,
              backgroundColor: `${tier.colorHex}22`,
              boxShadow: `0 0 35px ${tier.colorHex}55`,
            }}
          >
            👑
          </div>
          <span className="absolute -top-2 -right-2 text-2xl">✨</span>
          <span className="absolute -bottom-2 -left-2 text-2xl">🌟</span>
        </div>

        {/* Title & Level Number */}
        <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-2">
          مبارك ارتقاء المستوى!
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white">
          المستوى{' '}
          <span style={{ color: tier.colorHex }}>{newLevel}</span>
        </h2>

        {/* Unlocked Title */}
        <div className="my-4 bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-2xl">
          <span className="text-[11px] text-slate-400 block mb-0.5">
            اللقب المعتمد في الرومات:
          </span>
          <span
            className="text-lg font-black block"
            style={{ color: tier.colorHex }}
          >
            {title}
          </span>
          <span className="text-xs text-slate-400 block mt-1">
            {tier.nameAr} • لون الاسم: {tier.colorName}
          </span>
        </div>

        {/* Motivational Quote */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-2xl mb-4 text-xs text-emerald-200 leading-relaxed text-right">
          <p className="font-semibold text-center">{randomQuote}</p>
        </div>

        {/* Next Level Reward Preview */}
        {newLevel < 100 && (
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl mb-6 text-right">
            <span className="text-[11px] text-amber-400 font-bold block mb-1">
              هدية المستوى القادم (ليفل {newLevel + 1}):
            </span>
            <p className="text-xs text-slate-300">
              {nextReward}
            </p>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 text-slate-950 hover:brightness-110 active:scale-95"
          style={{ backgroundColor: tier.colorHex }}
        >
          <Sparkles className="w-5 h-5" />
          متابعة رحلة الصلاة
        </button>
      </div>
    </div>
  );
};
