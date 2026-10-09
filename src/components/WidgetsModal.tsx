import React, { useState } from 'react';
import { User, DayPrayerRecord, PrayerDefinition } from '../types';
import { getCurrentAndNextPrayer, formatPrayerTimeAr, PRAYERS_DATA } from '../utils/prayerTimes';
import { getTierForLevel } from '../utils/levels';
import { sound } from '../utils/sound';
import {
  Smartphone,
  Flame,
  Camera,
  Moon,
  Sparkles,
  X,
  Plus,
  Clock,
  Check,
  Eye,
  Sliders,
} from 'lucide-react';

interface WidgetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  todayRecord: DayPrayerRecord;
  onQuickProvePrayer: (prayer: PrayerDefinition) => void;
  onQuickAddQiyam: () => void;
}

export const WidgetsModal: React.FC<WidgetsModalProps> = ({
  isOpen,
  onClose,
  user,
  todayRecord,
  onQuickProvePrayer,
  onQuickAddQiyam,
}) => {
  const [selectedWidget, setSelectedWidget] = useState<'prayer' | 'streak' | 'qiyam' | 'tasbih'>('prayer');
  const [widgetTheme, setWidgetTheme] = useState<'emerald' | 'oled' | 'gold'>('emerald');
  const [tasbihCount, setTasbihCount] = useState(12);

  if (!isOpen) return null;

  const { currentPrayer, nextPrayer, minutesToNext } = getCurrentAndNextPrayer();
  const hoursLeft = Math.floor(minutesToNext / 60);
  const minsLeft = minutesToNext % 60;
  const tier = getTierForLevel(user.level);

  const getThemeClasses = () => {
    if (widgetTheme === 'oled') {
      return 'bg-black border-slate-800 text-white shadow-2xl';
    }
    if (widgetTheme === 'gold') {
      return 'bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 border-amber-500/40 text-amber-100 shadow-amber-500/10 shadow-2xl';
    }
    return 'bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-500/40 text-emerald-100 shadow-emerald-500/15 shadow-2xl';
  };

  const handleTasbihTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTick();
    setTasbihCount(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative text-right text-white">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
            📱
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              الويدجيدتس الخاصة للشاشة الرئيسية (Widgets)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ويدجتس ذكية لشاشة هاتفك لمتابعة الصلاة والستريك والتسبيح بنقرة واحدة!
            </p>
          </div>
        </div>

        {/* Widget Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { id: 'prayer', label: 'الصلاة والعد التنازلي', icon: '⏰' },
            { id: 'streak', label: 'شعلة الستريك (2x2)', icon: '🔥' },
            { id: 'qiyam', label: 'قيام الليل السريع', icon: '🌙' },
            { id: 'tasbih', label: 'المسبحة الذكية', icon: '📿' },
          ].map(w => (
            <button
              key={w.id}
              onClick={() => {
                setSelectedWidget(w.id as 'prayer' | 'streak' | 'qiyam' | 'tasbih');
                sound.playTick();
              }}
              className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center text-center gap-1.5 ${
                selectedWidget === w.id
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-black shadow-md'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{w.icon}</span>
              <span className="leading-tight">{w.label}</span>
            </button>
          ))}
        </div>

        {/* Theme Picker */}
        <div className="flex items-center justify-between mb-5 bg-slate-950/60 p-2 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold px-2">مظهر الويدجت:</span>
          <div className="flex gap-1.5">
            {[
              { id: 'emerald', label: 'الزمردي الإسلامي' },
              { id: 'oled', label: 'أسود OLED' },
              { id: 'gold', label: 'الذهبي الملكي' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setWidgetTheme(t.id as 'emerald' | 'oled' | 'gold')}
                className={`text-[11px] px-2.5 py-1 rounded-xl font-bold transition-all ${
                  widgetTheme === t.id
                    ? 'bg-slate-800 text-white border border-slate-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Phone Screen Preview */}
        <div className="bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-800 mb-5 relative overflow-hidden">
          <div className="text-[11px] font-mono text-slate-500 mb-3 text-center flex items-center justify-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>معاينة حية على شاشة الهاتف</span>
          </div>

          {/* Simulated Widget Display */}
          <div className="max-w-sm mx-auto">
            {/* 1. Next Prayer Countdown Widget */}
            {selectedWidget === 'prayer' && (
              <div className={`p-4 rounded-3xl border ${getThemeClasses()} transition-all`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{nextPrayer.icon}</span>
                    <div>
                      <h4 className="font-black text-sm text-white">
                        الصلاة القادمة: {nextPrayer.nameAr}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formatPrayerTimeAr(nextPrayer.defaultTime)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    متبقي {hoursLeft > 0 ? `${hoursLeft}س ` : ''}{minsLeft}د
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300">
                    مستعد لإثباتها؟
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onQuickProvePrayer(nextPrayer);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 active:scale-95"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>التقاط الدليل 📸</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Streak Fire Widget */}
            {selectedWidget === 'streak' && (
              <div className={`p-4 rounded-3xl border ${getThemeClasses()} transition-all flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-orange-950/60 border border-orange-500/40 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20">
                    <Flame className="w-8 h-8 fill-orange-500 text-orange-500 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">ستريك الصلاة المتتالي</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-3xl font-black text-orange-400 font-mono">
                        {user.streak}
                      </span>
                      <span className="text-xs font-bold text-orange-300">يوم متواصل 🔥</span>
                    </div>
                  </div>
                </div>

                <div className="text-left font-mono">
                  <span className="text-[10px] text-slate-400 block">صلوات اليوم:</span>
                  <div className="flex gap-1 mt-1">
                    {PRAYERS_DATA.map(p => (
                      <span
                        key={p.id}
                        className={`w-2 h-2 rounded-full ${
                          todayRecord.prayers[p.id] ? 'bg-emerald-400' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Qiyam Al-Layl Widget */}
            {selectedWidget === 'qiyam' && (
              <div className={`p-4 rounded-3xl border ${getThemeClasses()} transition-all`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌙</span>
                    <div>
                      <h4 className="font-black text-sm text-white">
                        قيام الليل اللانهائي
                      </h4>
                      <span className="text-[10px] text-amber-300">نصف XP تشجيعي (+15 لكل ركعتين)</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {user.nightPrayersTotal} ركعة
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300">تسجيل ركعتين الليلة:</span>
                  <button
                    onClick={() => {
                      onClose();
                      onQuickAddQiyam();
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+2 ركعتان قيام</span>
                  </button>
                </div>
              </div>
            )}

            {/* 4. Mini Tasbih Widget */}
            {selectedWidget === 'tasbih' && (
              <div className={`p-4 rounded-3xl border ${getThemeClasses()} transition-all flex items-center justify-between`}>
                <div>
                  <span className="text-[11px] text-slate-400 block">تسبيح سريع:</span>
                  <h4 className="font-black text-base text-amber-300 font-serif">
                    سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 mt-1 block">
                    العدد: {tasbihCount} / 33
                  </span>
                </div>

                <button
                  onClick={handleTasbihTap}
                  className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-lg shadow-lg flex items-center justify-center active:scale-95 transition-transform"
                >
                  +1
                </button>
              </div>
            )}
          </div>
        </div>

        {/* How to add to phone home screen instructions */}
        <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl text-xs text-slate-300 leading-relaxed">
          <p className="font-bold text-emerald-400 mb-1">
            💡 كيف تضيف الويدجت لشاشة هاتفك الرئيسية؟
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-slate-400 text-[11px]">
            <li>قم بتثبيت التطبيق كـ APK / PWA أولاً عبر زر التثبيت.</li>
            <li>المس مطولاً أي مكان فارغ على شاشة هاتفك الرئيسية واختر <strong>الويدجتس (Widgets)</strong>.</li>
            <li>ابحث عن تطبيق <strong>صلاتي مع صحابي</strong> واسحب الويدجت للشاشة بالحجم المناسب لك.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
