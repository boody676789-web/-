import React, { useState } from 'react';
import { User } from '../types';
import { ALL_250_LEVELS, TIERS, getTierForLevel, COSMETIC_FRAMES } from '../utils/levels';
import { X, Sparkles, Check, Crown, Flame, Award, ChevronDown } from 'lucide-react';

interface LevelPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const LevelPathModal: React.FC<LevelPathModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [selectedTierFilter, setSelectedTierFilter] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentTier = getTierForLevel(user.level);

  const displayedLevels = selectedTierFilter
    ? ALL_250_LEVELS.filter(lvl => {
        const t = getTierForLevel(lvl.level);
        return t.tierNumber === selectedTierFilter;
      })
    : ALL_250_LEVELS;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl relative text-right overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  مسار الـ 250 مستوى وزينات الصالحين
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  القمة: ليفل 250
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                أنت حالياً في <span style={{ color: currentTier.colorHex }} className="font-black">ليفل {user.level}</span> ({user.title}) • إطارات، ألوان، وأفاتارات مفتوحة!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 25 Tiers Selector Bar */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setSelectedTierFilter(null)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedTierFilter === null
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              جميع الـ 250 ليفل
            </button>
            {TIERS.map(t => (
              <button
                key={t.tierNumber}
                onClick={() => setSelectedTierFilter(t.tierNumber)}
                className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border ${
                  selectedTierFilter === t.tierNumber
                    ? `${t.bgClass} ${t.borderClass} ${t.colorClass} shadow-md`
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: t.colorHex }}
                />
                <span>رتبة {t.rangeStr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Levels Path */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {displayedLevels.map(item => {
            const isCurrent = item.level === user.level;
            const isUnlocked = item.level <= user.level;
            const isMilestone = item.level % 10 === 0 || item.level === 1 || item.level === 5 || item.unlockedFrameId;
            const tier = getTierForLevel(item.level);

            return (
              <div
                key={item.level}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all relative ${
                  isCurrent
                    ? 'bg-slate-800/90 border-2 shadow-xl ring-2 ring-emerald-500/20'
                    : isUnlocked
                    ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40'
                    : 'bg-slate-950/40 border-slate-800/50 opacity-70'
                }`}
                style={isCurrent ? { borderColor: tier.colorHex } : {}}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl border-2 flex flex-col items-center justify-center font-black shrink-0 relative"
                      style={{
                        borderColor: tier.colorHex,
                        backgroundColor: isCurrent ? `${tier.colorHex}22` : '#0f172a',
                      }}
                    >
                      <span className="text-[10px] text-slate-400 leading-none">LVL</span>
                      <span
                        className="text-base font-black leading-tight"
                        style={{ color: tier.colorHex }}
                      >
                        {item.level}
                      </span>
                      {isCurrent && (
                        <span className="absolute -top-1.5 -right-1.5 text-xs">
                          🔥
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className="font-extrabold text-sm sm:text-base"
                          style={{ color: tier.colorHex }}
                        >
                          {item.title}
                        </h4>
                        {isMilestone && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                            style={{
                              borderColor: `${tier.colorHex}55`,
                              backgroundColor: `${tier.colorHex}15`,
                              color: tier.colorHex,
                            }}
                          >
                            {item.unlockedFrameId ? 'فتح إطار زينة 🖼️' : `رتبة (${tier.colorName})`}
                          </span>
                        )}
                        {isCurrent && (
                          <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                            مستواك الحالي
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.rewardDescription}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-400 block">
                      {item.requiredXp.toLocaleString('ar-EG')} XP
                    </span>
                    {isUnlocked ? (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1 justify-end">
                        <Check className="w-3.5 h-3.5" />
                        مكتمل
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        قيد القفل 🔒
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
