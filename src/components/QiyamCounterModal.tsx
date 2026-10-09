import React, { useState } from 'react';
import { User } from '../types';
import { sound } from '../utils/sound';
import { Moon, Sparkles, X, Plus, RotateCcw, Check, Heart } from 'lucide-react';

interface QiyamCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onAddQiyam: (rakaat: number, xpEarned: number) => void;
}

export const QiyamCounterModal: React.FC<QiyamCounterModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddQiyam,
}) => {
  const [rakaatCount, setRakaatCount] = useState(2);
  const [sessionLogged, setSessionLogged] = useState(false);

  if (!isOpen) return null;

  // Qiyam yields half base XP per 2 Raka'at (e.g., 25 XP per 2 raka'at, 12.5 rounded per raka'ah)
  const xpEarned = Math.round(rakaatCount * 15);

  const increment = (step = 2) => {
    sound.playTick();
    setRakaatCount(prev => prev + step);
    setSessionLogged(false);
  };

  const reset = () => {
    sound.playTick();
    setRakaatCount(2);
    setSessionLogged(false);
  };

  const handleSave = () => {
    sound.playPrayerAccepted();
    onAddQiyam(rakaatCount, xpEarned);
    setSessionLogged(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-right text-white">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Moon & Stars */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-900/60 border border-indigo-400/40 flex items-center justify-center text-4xl shadow-2xl shadow-indigo-500/30 mb-3 animate-pulse">
            🌙
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black text-amber-300">
              عداد قيام الليل اللانهائي
            </h2>
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-xs text-indigo-200/80 mt-1.5 leading-relaxed">
            مفتوح من بعد صلاة العشاء حتى طلوع الفجر • نصف XP تشجيعي (+15 XP لكل ركعتين)
          </p>
        </div>

        {/* Hadith Banner */}
        <div className="bg-indigo-950/70 border border-indigo-500/30 p-3.5 rounded-2xl mb-6 text-xs text-indigo-200 leading-relaxed text-center">
          <p className="font-semibold text-amber-300">
            «أَفْضَلُ الصَّلَاةِ بَعْدَ الْفَرِيضَةِ صَلَاةُ اللَّيْلِ»
          </p>
          <p className="text-[11px] text-slate-400 mt-1">صحيح مسلم</p>
        </div>

        {/* Counter Display */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 text-center mb-6 relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            مفتوح بلا حد ∞
          </div>
          <span className="text-xs text-slate-400 block mb-1">
            عدد الركعات المصلَّاة الليلة
          </span>
          <div className="text-6xl font-black text-white tracking-wider my-2 font-mono">
            {rakaatCount}
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
            +{xpEarned} XP مكافأة قيام الليل
          </span>

          {/* Quick controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => increment(2)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-base shadow-lg shadow-indigo-600/30 flex items-center gap-2 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" />
              +2 ركعتان
            </button>
            <button
              onClick={() => increment(1)}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 active:scale-95 transition-all"
            >
              +1 ركعة وتر
            </button>
            <button
              onClick={reset}
              title="إعادة تعيين العداد"
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Session */}
        <button
          onClick={handleSave}
          disabled={sessionLogged}
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
            sessionLogged
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black'
          }`}
        >
          {sessionLogged ? (
            <>
              <Check className="w-5 h-5" />
              تم توثيق قيام الليل وإضافة الـ XP!
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              تسجيل {rakaatCount} ركعة في ميزانك الليلة
            </>
          )}
        </button>
      </div>
    </div>
  );
};
