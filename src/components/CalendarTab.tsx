import React, { useState } from 'react';
import { User, DayPrayerRecord, PrayerName } from '../types';
import { PRAYERS_DATA } from '../utils/prayerTimes';
import { Calendar as CalendarIcon, Check, X, Flame, ShieldAlert, Award, ChevronRight, ChevronLeft, Sparkles, Moon } from 'lucide-react';

interface CalendarTabProps {
  user: User;
  calendarData: Record<string, DayPrayerRecord>;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  user,
  calendarData,
}) => {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentDay = now.getDate();

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sun

  // Calculate stats for current month
  let totalPrayersDone = 0;
  let totalPrayersMissed = 0;
  let totalQiyamRakaat = 0;

  const userCreatedDate = user.createdAt ? new Date(user.createdAt) : now;
  const startDay = (userCreatedDate.getFullYear() === currentYear && userCreatedDate.getMonth() === currentMonth)
    ? userCreatedDate.getDate()
    : 1;

  for (let d = startDay; d <= currentDay; d++) {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const record = calendarData[key];
    if (record) {
      Object.entries(record.prayers).forEach(([_, done]) => {
        if (done) totalPrayersDone++;
        else if (d < currentDay) totalPrayersMissed++;
      });
      if (record.qiyamRakaat) totalQiyamRakaat += record.qiyamRakaat;
    } else if (d < currentDay) {
      totalPrayersMissed += 5;
    }
  }

  const totalPossibleSoFar = Math.max(1, totalPrayersDone + totalPrayersMissed);
  const commitmentRate = Math.min(100, Math.round((totalPrayersDone / totalPossibleSoFar) * 100));

  const monthNamesAr = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const weekdaysAr = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const selectedRecord = selectedDateKey ? calendarData[selectedDateKey] : null;

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>التقويم الشهري وسجل الصلاة 📅</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          متابعة دقيقة لكل فريضة أديتها أو فاتتك خلال الشهر مع حساب نسبة التزامك.
        </p>
      </div>

      {/* Monthly Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] text-slate-400 block mb-1">نسبة الالتزام</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              %{commitmentRate}
            </span>
            <span className="text-xs text-slate-500">شهرياً</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${commitmentRate}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] text-slate-400 block mb-1">الصلوات المنجزة</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {totalPrayersDone}
            </span>
            <span className="text-xs text-slate-400">فريضة</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 block mt-2">
            ✓ موثقة بالدليل
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] text-slate-400 block mb-1">صلوات فائتة</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-rose-400 font-mono">
              {totalPrayersMissed}
            </span>
            <span className="text-xs text-slate-400">صلاة</span>
          </div>
          <span className="text-[10px] text-rose-400/80 block mt-2">
            استدرك بالتوبة والسنن
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] text-slate-400 block mb-1">ركعات قيام الليل</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-amber-300 font-mono">
              {totalQiyamRakaat}
            </span>
            <span className="text-xs text-slate-400">ركعة</span>
          </div>
          <span className="text-[10px] text-amber-300/80 block mt-2">
            ✨ نور في صحيفتك
          </span>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base sm:text-lg text-white">
              {monthNamesAr[currentMonth]} {currentYear}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              أُثبتت
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              فائتة
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              قادمة
            </span>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 mb-2">
          {weekdaysAr.map((w, idx) => (
            <div key={idx} className="py-1">
              {w}
            </div>
          ))}
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayWeekIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square opacity-0 pointer-events-none" />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const record = calendarData[dateKey];
            const isToday = dayNum === currentDay;
            const isFuture = dayNum > currentDay;
            const isSelected = selectedDateKey === dateKey;

            // Count prayers done for that day
            const doneForDay = record
              ? Object.values(record.prayers).filter(Boolean).length
              : 0;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDateKey(dateKey)}
                className={`aspect-square rounded-2xl p-1 sm:p-2 border transition-all flex flex-col justify-between items-center text-center relative ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/40 shadow-lg'
                    : isToday
                    ? 'border-emerald-500/80 bg-slate-800'
                    : isFuture
                    ? 'border-slate-800/40 bg-slate-950/30 opacity-40 hover:opacity-70'
                    : 'border-slate-800 bg-slate-900/80 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isToday ? 'text-emerald-400 underline decoration-2' : 'text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {record?.qiyamRakaat && record.qiyamRakaat > 0 ? (
                    <span className="text-[10px]" title={`قيام الليل: ${record.qiyamRakaat} ركعة`}>
                      🌙
                    </span>
                  ) : null}
                </div>

                {/* 5 mini dots representing 5 prayers */}
                {!isFuture && (
                  <div className="flex gap-0.5 sm:gap-1 justify-center my-auto">
                    {PRAYERS_DATA.map(p => {
                      const isDone = record?.prayers[p.id];
                      return (
                        <span
                          key={p.id}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                            isDone ? 'bg-emerald-400 shadow-xs shadow-emerald-400/50' : 'bg-rose-500/70'
                          }`}
                          title={`${p.nameAr}: ${isDone ? 'تمت' : 'فائتة'}`}
                        />
                      );
                    })}
                  </div>
                )}

                <span className="text-[9px] font-mono text-slate-500 block leading-none">
                  {isFuture ? '' : `${doneForDay}/5`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Inspector */}
      {selectedDateKey && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-base text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-400" />
              تفاصيل صلوات يوم ({selectedDateKey})
            </h4>
            <button
              onClick={() => setSelectedDateKey(null)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              إغلاق
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {PRAYERS_DATA.map(p => {
              const isDone = selectedRecord?.prayers[p.id];
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl border text-center ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <span className="text-xl block mb-1">{p.icon}</span>
                  <span className="font-black text-xs block text-white">
                    {p.nameAr}
                  </span>
                  <span className="text-[11px] font-bold block mt-1">
                    {isDone ? '✓ تم التوثيق' : '✗ لم تُسجَّل'}
                  </span>
                </div>
              );
            })}
          </div>

          {selectedRecord?.qiyamRakaat && selectedRecord.qiyamRakaat > 0 ? (
            <div className="mt-3 bg-indigo-950/40 border border-indigo-500/30 p-2.5 rounded-xl text-xs text-indigo-200 flex items-center gap-2">
              <Moon className="w-4 h-4 text-amber-300" />
              <span>
                قيام الليل الموثق في هذه الليلة: <strong>{selectedRecord.qiyamRakaat} ركعة</strong> (+{selectedRecord.qiyamRakaat * 15} XP)
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
