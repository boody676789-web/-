import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PrayerDefinition, User, LocationType } from '../types';
import { sound } from '../utils/sound';
import { Sparkles, Flame, Check, ShieldCheck, Heart, MessageSquare, ArrowLeft, Building } from 'lucide-react';

interface PostPrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayer: PrayerDefinition;
  user: User;
  onGoToRooms: () => void;
  actualXp?: number;
  locationType?: LocationType;
}

export const PostPrayerModal: React.FC<PostPrayerModalProps> = ({
  isOpen,
  onClose,
  prayer,
  user,
  onGoToRooms,
  actualXp,
  locationType,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playPrayerAccepted();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#fbbf24'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center text-white animate-in zoom-in-95 duration-200">
        {/* Glow Prayer Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-950/70 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 mb-3">
          {prayer.icon}
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
          <ShieldCheck className="w-4 h-4" />
          تم اعتماد دليل صلاة {prayer.nameAr} اللحظي بنجاح
        </div>

        <h2 className="text-2xl font-black text-white">
          تقبل الله صلاتك وطاعتك! 🤲
        </h2>

        {/* Hadith Incentive Card */}
        <div className="my-4 bg-emerald-950/50 border border-emerald-500/30 p-4 rounded-2xl text-right">
          <span className="text-[11px] font-bold text-amber-300 block mb-1">
            حافز وفضل صلاة {prayer.nameAr}:
          </span>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
            {prayer.rewardHadith}
          </p>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1.5 text-left">
            — {prayer.hadithSource}
          </span>
        </div>

        {/* Stats Earned Badges */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">
                {locationType === 'mosque' ? 'نقاط المسجد (10X)' : 'نقاط مكتسبة'}
              </span>
              <span className="text-base font-black text-amber-300">
                +{actualXp || prayer.mosqueXpReward} XP
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5 fill-orange-500" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">ستريك الصلاة</span>
              <span className="text-base font-black text-orange-400">
                {user.streak} أيام 🔥
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          تمت مشاركة دليلك اللحظي في رومات الجماعة لتشجيع أصدقائك ورفع همتهم!
        </p>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            onClick={() => {
              onClose();
              onGoToRooms();
            }}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            مشاهدة الروم والشات
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs sm:text-sm"
          >
            تم، شكراً لك
          </button>
        </div>
      </div>
    </div>
  );
};
