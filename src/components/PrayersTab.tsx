import React from 'react';
import { User, PrayerDefinition, DayPrayerRecord, PrayerName } from '../types';
import { PRAYERS_DATA, SUNNAH_TIMINGS, formatPrayerTimeAr, getCurrentAndNextPrayer, SunnahTiming } from '../utils/prayerTimes';
import { Camera, Check, Clock, Sparkles, Moon, Flame, ShieldCheck } from 'lucide-react';

interface PrayersTabProps {
  user: User;
  todayRecord: DayPrayerRecord;
  onOpenLiveCameraForFard: (prayer: PrayerDefinition) => void;
  onOpenLiveCameraForSunnah: (sunnah: SunnahTiming) => void;
  onOpenLiveCameraForQiyam: (rakaat: number) => void;
  completedSunnahs: string[];
}

export const PrayersTab: React.FC<PrayersTabProps> = ({
  user,
  todayRecord,
  onOpenLiveCameraForFard,
  onOpenLiveCameraForSunnah,
  onOpenLiveCameraForQiyam,
  completedSunnahs,
}) => {
  const { currentPrayer, nextPrayer, minutesToNext } = getCurrentAndNextPrayer();
  const hoursLeft = Math.floor(minutesToNext / 60);
  const minsLeft = minutesToNext % 60;

  const completedCount = Object.values(todayRecord.prayers).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Countdown & Daily Summary Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-5 sm:p-6 shadow-2xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                الصلاة القادمة: {nextPrayer.nameAr} ({formatPrayerTimeAr(nextPrayer.defaultTime)})
              </span>
              <span className="text-xs text-slate-400">
                متبقي {hoursLeft > 0 ? `${hoursLeft} ساعة و ` : ''}{minsLeft} دقيقة
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              إثبات الصلوات والسنن وقيام الليل 🕌
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              جميع الصلوات والسنن وقيام الليل موثقة حصرياً بكاميرا التطبيق اللحظية لمنع الغش والسبام وحفظ الأمانة مع الله.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-2xl shrink-0 min-w-[200px] text-right">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-400">الفرائض المنجزة اليوم:</span>
              <span className="font-black text-emerald-400">{completedCount} من 5</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / 5) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1.5">
              {completedCount === 5 ? '🎉 أتممت جميع فرائض اليوم!' : 'حافظ على صلواتك في وقتها'}
            </span>
          </div>
        </div>
      </div>

      {/* Night Prayer Banner (قيام الليل - بالدليل اللحظي حصراً) */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-900/60 border border-indigo-400/30 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 shrink-0">
            🌙
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                قيام الليل (بالدليل المصوَّر)
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                +10 XP لكل ركعتين ✨
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              مفتوح بعد صلاة العشاء. صوّر مصلاك الليلة لتوثيق قيامك ومنع الإدخال الوهمي.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenLiveCameraForQiyam(2)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <Camera className="w-4 h-4 text-amber-300" />
          تصوير دليل قيام الليل 📸
        </button>
      </div>

      {/* 5 Obligatory Prayers List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
            <span>الصلوات الخمس المفروضة</span>
            <span className="text-xs text-emerald-400 font-normal">
              (دليل كاميرا حية)
            </span>
          </h3>
          <span className="text-xs text-slate-400">
            اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
          {PRAYERS_DATA.map(prayer => {
            const isDone = todayRecord.prayers[prayer.id];
            const isCurrent = currentPrayer.id === prayer.id;

            return (
              <div
                key={prayer.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 shadow-sm'
                    : isCurrent
                    ? 'bg-slate-900 border-2 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      isDone
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                        : isCurrent
                        ? 'bg-emerald-600/20 border border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border border-slate-700 text-slate-400'
                    }`}
                  >
                    {prayer.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base sm:text-lg text-white">
                        صلاة {prayer.nameAr}
                      </h4>
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700/60">
                        {formatPrayerTimeAr(prayer.defaultTime)}
                      </span>
                      {isCurrent && !isDone && (
                        <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full animate-pulse">
                          الوقت الحالي
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                      <span className="text-slate-400">{prayer.rakaat} ركعات</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-amber-300 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
                        <span>🕌 في المسجد:</span>
                        <span className="font-mono font-black">+{prayer.mosqueXpReward} XP</span>
                        <span className="text-[10px] bg-amber-400 text-slate-950 px-1 rounded-sm font-black">10X</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-teal-300 font-semibold bg-teal-500/10 px-1.5 py-0.5 rounded-md">
                        🏠 في المنزل: +{prayer.homeXpReward} XP
                      </span>
                      {prayer.sunnahName && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-300 font-medium text-[11px]">
                            {prayer.sunnahName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isDone ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs px-3.5 py-2 rounded-xl">
                      <Check className="w-4 h-4" />
                      <span>تم الإثبات والتوثيق 📸</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenLiveCameraForFard(prayer)}
                      className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                          : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      <span>تصوير دليل لحظي</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sunnah Timings Section (بالدليل اللحظي لمنع الغش) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                مواعيد وسنن الرواتب (موثقة بالدليل)
              </h3>
              <p className="text-xs text-slate-400">
                صوّر سجادة صلاتك لإثبات السنن ومنع السبام
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            إثبات مصوّر
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUNNAH_TIMINGS.map(s => {
            const isCompleted = completedSunnahs.includes(s.id);

            return (
              <div
                key={s.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">{s.name}</span>
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        🕌 +{s.mosqueXpReward} XP مسجداً (10X)
                      </span>
                      <span className="text-[10px] text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded">
                        🏠 +{s.homeXpReward} XP
                      </span>
                    </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {s.period} ({s.rakaat} ركعات)
                  </span>
                  <span className="text-[11px] text-slate-300/80 block mt-1 line-clamp-1 italic">
                    {s.hadith}
                  </span>
                </div>

                {isCompleted ? (
                  <div className="px-2.5 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                    <span>مثبتة 📸</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenLiveCameraForSunnah(s)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shrink-0 shadow-md active:scale-95"
                    title="التقاط دليل السنة"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>إثبات</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
