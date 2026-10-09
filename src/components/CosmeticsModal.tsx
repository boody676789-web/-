import React, { useState } from 'react';
import { User, CosmeticFrame } from '../types';
import { COSMETIC_FRAMES, getTierForLevel, TIERS, getTitleForLevel } from '../utils/levels';
import { sound } from '../utils/sound';
import {
  Sparkles,
  Check,
  Lock,
  X,
  Crown,
  Palette,
  User as UserIcon,
  ShieldCheck,
  Eye,
  Filter,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

interface CosmeticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onEquipFrame: (frameId: string) => void;
  onEquipAvatar: (avatar: string) => void;
}

export const CosmeticsModal: React.FC<CosmeticsModalProps> = ({
  isOpen,
  onClose,
  user,
  onEquipFrame,
  onEquipAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'frames' | 'avatars' | 'tiers'>('frames');
  const [filterMode, setFilterMode] = useState<'all' | 'unlocked'>('all');
  const [inspectedFrameId, setInspectedFrameId] = useState<string>(
    user.equippedFrame || 'frame-none'
  );
  const [inspectedAvatar, setInspectedAvatar] = useState<string>(user.avatar);

  if (!isOpen) return null;

  const currentTier = getTierForLevel(user.level);
  const currentTitle = getTitleForLevel(user.level);
  const inspectedFrame =
    COSMETIC_FRAMES.find(f => f.id === inspectedFrameId) || COSMETIC_FRAMES[0];

  const ALL_AVATARS: { icon: string; name: string; minLvl: number }[] = [
    { icon: '🕌', name: 'المسجد المبارك', minLvl: 1 },
    { icon: '🌙', name: 'هلال النور', minLvl: 10 },
    { icon: '⚔️', name: 'سيف الحق', minLvl: 20 },
    { icon: '📖', name: 'المصحف الشريف', minLvl: 40 },
    { icon: '🌟', name: 'نجم الهدى', minLvl: 60 },
    { icon: '👑', name: 'تاج المتقين', minLvl: 100 },
    { icon: '🕊️', name: 'حمامة السلام', minLvl: 150 },
    { icon: '🌸', name: 'ريحانة الجنة', minLvl: 200 },
    { icon: '📿', name: 'المسبحة الملكية', minLvl: 250 },
  ];

  const displayedFrames = COSMETIC_FRAMES.filter(f =>
    filterMode === 'all' ? true : user.level >= f.minLevel
  );

  const displayedAvatars = ALL_AVATARS.filter(a =>
    filterMode === 'all' ? true : user.level >= a.minLvl
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative text-right text-white my-auto overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20 shrink-0">
            🎨
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>خزانة الزينات والجوائز المفتوحة</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                250 مستوى
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              خصص مظهرك في رومات الصحبة، جهّز إطاراتك المكتسبة من ثباتك على الصلاة.
            </p>
          </div>
        </div>

        {/* LIVE CHAT & ROOM SHOWROOM PREVIEW (THE STAGE) */}
        <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-4 sm:p-5 border border-slate-800 mb-5 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: inspectedFrame.glowColor || '#10b981' }}
          />

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5 font-mono">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              معاينة حية لمظهرك في شات الرومات:
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-bold border"
              style={{
                borderColor: currentTier.colorHex,
                color: currentTier.colorHex,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            >
              {currentTier.nameAr}
            </span>
          </div>

          {/* Interactive Chat Message Simulation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3 shadow-xl backdrop-blur-xs max-w-lg mx-auto">
            {/* Framed Avatar */}
            <div className="relative shrink-0">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-800 transition-all ${inspectedFrame.cssStyle}`}
              >
                <span>{inspectedAvatar}</span>
              </div>
              <span
                className="absolute -bottom-1 -left-1 px-1.5 py-0.2 rounded-full text-[9px] font-black text-white border border-slate-900 shadow-xs"
                style={{ backgroundColor: currentTier.colorHex }}
              >
                {user.level}
              </span>
            </div>

            {/* Bubble Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="font-extrabold text-xs sm:text-sm drop-shadow-xs"
                  style={{ color: currentTier.colorHex }}
                >
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded-md">
                  {currentTitle}
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                «الحمد لله وثقت صلاة العصر في المسجد وجماعة! +1,000 XP 🕌🔥»
              </p>
            </div>
          </div>

          {/* Action button inside Showcase */}
          <div className="mt-3 text-center">
            {activeTab === 'frames' && (
              user.level >= inspectedFrame.minLevel ? (
                (user.equippedFrame || 'frame-none') === inspectedFrame.id ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/30">
                    <Check className="w-4 h-4" />
                    هذا الإطار مجهز حالياً لحسابك
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      sound.playLevelUp();
                      onEquipFrame(inspectedFrame.id);
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
                  >
                    تجهيز هذا الإطار الآن ✨
                  </button>
                )
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300/90 bg-amber-950/40 border border-amber-500/30 px-3.5 py-1.5 rounded-xl">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  يُفتح عند وصولك إلى ليفل {inspectedFrame.minLevel}
                </span>
              )
            )}

            {activeTab === 'avatars' && (
              user.avatar === inspectedAvatar ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/30">
                  <Check className="w-4 h-4" />
                  أيقونة الأفاتار النشطة
                </span>
              ) : (
                <button
                  onClick={() => {
                    sound.playPrayerAccepted();
                    onEquipAvatar(inspectedAvatar);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  تعيين هذه الأيقونة الآن ✨
                </button>
              )
            )}
          </div>
        </div>

        {/* Category Tabs & Quick Filter */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('frames');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'frames'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>الإطارات</span>
            </button>
            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('avatars');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'avatars'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5 text-teal-300" />
              <span>الأيقونات</span>
            </button>
            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('tiers');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'tiers'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-purple-300" />
              <span>ألوان الاسم (25 رتبة)</span>
            </button>
          </div>

          {activeTab !== 'tiers' && (
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  filterMode === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilterMode('unlocked')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  filterMode === 'unlocked' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                المفتوحة لي
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Frames Grid */}
        {activeTab === 'frames' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 sm:max-h-64 overflow-y-auto pr-1">
            {displayedFrames.map(frame => {
              const isUnlocked = user.level >= frame.minLevel;
              const isEquipped = (user.equippedFrame || 'frame-none') === frame.id;
              const isInspected = inspectedFrameId === frame.id;

              return (
                <button
                  key={frame.id}
                  onClick={() => {
                    sound.playTick();
                    setInspectedFrameId(frame.id);
                  }}
                  className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between relative ${
                    isInspected
                      ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/40 shadow-md'
                      : isUnlocked
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      LVL {frame.minLevel}
                    </span>
                    {isEquipped ? (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md font-bold">
                        مجهز ✓
                      </span>
                    ) : !isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400/80" />
                    ) : null}
                  </div>

                  <div className="my-1 text-center">
                    <div
                      className={`w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-xl bg-slate-900 ${frame.cssStyle}`}
                    >
                      <span>{inspectedAvatar}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h5 className="font-extrabold text-xs text-white truncate">
                      {frame.nameAr}
                    </h5>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {frame.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Avatars Grid */}
        {activeTab === 'avatars' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-56 sm:max-h-64 overflow-y-auto pr-1">
            {displayedAvatars.map(av => {
              const isUnlocked = user.level >= av.minLvl;
              const isEquipped = user.avatar === av.icon;
              const isInspected = inspectedAvatar === av.icon;

              return (
                <button
                  key={av.name}
                  onClick={() => {
                    sound.playTick();
                    setInspectedAvatar(av.icon);
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isInspected
                      ? 'bg-slate-800/90 border-teal-400 ring-2 ring-teal-500/40 shadow-md'
                      : isUnlocked
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-1">{av.icon}</div>
                  <span className="font-extrabold text-xs text-white block truncate">
                    {av.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    {isEquipped ? '✓ نشط' : isUnlocked ? 'متاح' : `ليفل ${av.minLvl}`}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 3: Name Colors & Tiers */}
        {activeTab === 'tiers' && (
          <div className="space-y-1.5 max-h-56 sm:max-h-64 overflow-y-auto pr-1">
            {TIERS.map(t => {
              const isUserTier = currentTier.tierNumber === t.tierNumber;
              const isAchieved = user.level >= (t.tierNumber - 1) * 10 + 1;

              return (
                <div
                  key={t.tierNumber}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isUserTier
                      ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-500/30'
                      : isAchieved
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-950/30 border-slate-900 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                      style={{ backgroundColor: t.colorHex }}
                    />
                    <div>
                      <span className="font-black" style={{ color: t.colorHex }}>
                        {t.nameAr}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        المستويات: {t.rangeStr} • لون {t.colorName}
                      </span>
                    </div>
                  </div>

                  {isUserTier ? (
                    <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      رتبتك الحالية ✨
                    </span>
                  ) : isAchieved ? (
                    <span className="text-[10px] text-emerald-400 font-bold">
                      تم العبور ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">
                      مغلق
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
