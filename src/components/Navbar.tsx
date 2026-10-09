import React from 'react';
import { User } from '../types';
import { getTierForLevel, getLevelProgress } from '../utils/levels';
import { Flame, Sparkles, MapPin, Download, Smartphone, Bell, Lock } from 'lucide-react';

interface NavbarProps {
  user: User;
  onOpenProfile: () => void;
  onOpenLevelPath: () => void;
  onOpenReminders: () => void;
  onOpenWidgets: () => void;
  onOpenApkInstall: () => void;
  onLockApp: () => void;
  isQiyamActive: boolean;
  onOpenQiyam: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenProfile,
  onOpenLevelPath,
  onOpenReminders,
  onOpenWidgets,
  onOpenApkInstall,
  onLockApp,
  isQiyamActive,
  onOpenQiyam,
}) => {
  const tier = getTierForLevel(user.level);
  const progress = getLevelProgress(user.level, user.xp);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* App Title & Logo */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 text-xl font-bold shrink-0">
            🕌
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm sm:text-lg text-white tracking-tight">
                صلاتي مع صحابي
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-1.5 py-0.5 rounded-md border border-emerald-500/30 hidden xs:inline">
                APK & ويدجيتس
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px]">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {user.city}
              </span>
              {isQiyamActive && (
                <button
                  onClick={onOpenQiyam}
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full transition-all animate-pulse"
                >
                  <span>✨ قيام الليل متاح</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action icons & stats */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Reminders Button */}
          <button
            onClick={onOpenReminders}
            title="تذكيرات الصلاة والأذان"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 border border-slate-700 flex items-center justify-center transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Quick Widgets Button */}
          <button
            onClick={onOpenWidgets}
            title="ويدجيدتس خاصة للشاشة الرئيسية"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-teal-300 border border-slate-700 flex items-center justify-center transition-colors"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Quick Publish & APK Install Button */}
          <button
            onClick={onOpenApkInstall}
            title="بابلش ونشر التطبيق أو تثبيته كـ APK على الهاتف"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-amber-500/20 hover:from-emerald-600/40 hover:to-amber-500/30 text-emerald-300 border border-emerald-500/50 text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-emerald-950/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>نشر و APK 🚀</span>
          </button>

          {/* Lock Button if PIN enabled */}
          {user.pinCode && (
            <button
              onClick={onLockApp}
              title="قفل التطبيق برمز المرور"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/40 flex items-center justify-center transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Streak Flame */}
          <div
            title={`ستريك الصلاة المتتالي: ${user.streak} يوم`}
            className="flex items-center gap-1 bg-orange-950/40 border border-orange-500/30 text-orange-400 px-2 sm:px-2.5 py-1.5 rounded-xl shadow-sm cursor-default"
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-500 text-orange-500" />
            <span className="font-extrabold text-xs sm:text-sm leading-none">
              {user.streak}
            </span>
          </div>

          {/* XP & Level Button */}
          <button
            onClick={onOpenLevelPath}
            title="مسار الـ 250 ليفل بالكامل"
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 px-2 py-1.5 rounded-xl transition-all group"
          >
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400">LVL</span>
                <span
                  className="font-black text-xs sm:text-sm"
                  style={{ color: tier.colorHex }}
                >
                  {user.level}
                </span>
              </div>
              <div className="w-10 sm:w-16 h-1 bg-slate-700 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.percentage}%`,
                    backgroundColor: tier.colorHex,
                  }}
                />
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 border-2 flex items-center justify-center text-base sm:text-lg transition-transform hover:scale-105 shrink-0"
            style={{ borderColor: tier.colorHex }}
            title={`حسابك الشخصي: ${user.name}`}
          >
            <span>{user.avatar}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
