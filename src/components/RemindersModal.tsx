import React, { useState } from 'react';
import { RemindersAPI, ReminderConfig } from '../utils/reminders';
import { sound } from '../utils/sound';
import { User } from '../types';
import {
  Bell,
  BellRing,
  Check,
  X,
  Sparkles,
  Volume2,
  Moon,
  Clock,
  ShieldCheck,
  Palette,
  Eye,
  Sliders,
  Play,
  Send,
  Zap,
} from 'lucide-react';

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateNotificationStyle: (
    style: 'emerald' | 'gold' | 'oled' | 'compact',
    tone: 'adhan' | 'takbeer' | 'chime'
  ) => void;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateNotificationStyle,
}) => {
  const [config, setConfig] = useState<ReminderConfig>(() => RemindersAPI.getConfig());
  const [permissionState, setPermissionState] = useState<string>(() =>
    'Notification' in window ? Notification.permission : 'unsupported'
  );
  const [activeStyle, setActiveStyle] = useState<'emerald' | 'gold' | 'oled' | 'compact'>(
    user.notificationStyle || 'emerald'
  );
  const [activeTone, setActiveTone] = useState<'adhan' | 'takbeer' | 'chime'>(
    user.notificationTone || 'adhan'
  );
  const [reminderMood, setReminderMood] = useState<'spiritual' | 'enthusiastic' | 'quranic'>(
    'enthusiastic'
  );
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof ReminderConfig) => {
    sound.playTick();
    const updated = { ...config, [key]: !config[key] };
    setConfig(updated);
    RemindersAPI.saveConfig(updated);
  };

  const handleTimingChange = (timing: 'exact' | 'early_15' | 'late_proof_10') => {
    sound.playTick();
    const updated = { ...config, timing };
    setConfig(updated);
    RemindersAPI.saveConfig(updated);
  };

  const handleStyleChange = (st: 'emerald' | 'gold' | 'oled' | 'compact') => {
    sound.playTick();
    setActiveStyle(st);
    onUpdateNotificationStyle(st, activeTone);
  };

  const handleToneChange = (tn: 'adhan' | 'takbeer' | 'chime') => {
    setActiveTone(tn);
    if (tn === 'adhan') sound.playAdhan();
    else if (tn === 'takbeer') sound.playTakbeer();
    else sound.playSereneChime();
    onUpdateNotificationStyle(activeStyle, tn);
  };

  const handleRequestPermission = async () => {
    sound.playTick();
    const granted = await RemindersAPI.requestPermission();
    setPermissionState(granted ? 'granted' : 'denied');
    if (granted) {
      sound.playAdhan();
      RemindersAPI.sendNotification(
        '🕌 تم تفعيل تنبيهات الصلاة بنجاح!',
        'سيصلك إشعار عند حلول كل صلاة لالتقاط دليلك في المسجد ونيل مضاعفة الـ 10 أضعاف.'
      );
    }
  };

  const handleSendTest = () => {
    if (activeTone === 'adhan') sound.playAdhan();
    else if (activeTone === 'takbeer') sound.playTakbeer();
    else sound.playSereneChime();

    setTestSent(true);

    let title = '🕌 حان موعد صلاة العصر الآن!';
    let body = 'صلِّ في المسجد لتنال مضاعفة 10 أضعاف (+1,000 XP) أو التقط دليلك في المنزل (+100 XP).';

    if (reminderMood === 'enthusiastic') {
      title = '🔥 يا بطل الستريك: أذّن العصر!';
      body = 'أصحابك في الروم بانتظار دليلك من المسجد! حافظ على الستريك واكسب 10X XP.';
    } else if (reminderMood === 'quranic') {
      title = '﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ﴾';
      body = 'حي على الصلاة، حي على الفلاح.. صلاة الجماعة نور في القلب وبركة في الرزق.';
    }

    RemindersAPI.sendNotification(title, body);
    setTimeout(() => setTestSent(false), 3000);
  };

  // Card style visual metadata
  const STYLE_CARDS = [
    {
      id: 'emerald',
      name: 'الزمردي الحديث 🌿',
      desc: 'أخضر ملكي متوهج بهوية إسلامية عصرية',
      cardClass: 'bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border-emerald-400 text-emerald-100',
      badgeClass: 'bg-emerald-500 text-slate-950',
    },
    {
      id: 'gold',
      name: 'الذهبي الملكي 👑',
      desc: 'إطار مذهب فاخر محاكي لكسوة الكعبة',
      cardClass: 'bg-gradient-to-r from-amber-950 via-yellow-950 to-slate-900 border-amber-400 text-amber-100',
      badgeClass: 'bg-amber-400 text-slate-950',
    },
    {
      id: 'oled',
      name: 'الأسود الليلي OLED 🌑',
      desc: 'أسود حالك مريح للعين مع حدود نيون بنفسجية',
      cardClass: 'bg-black border-purple-500/80 text-purple-100 shadow-purple-950/50',
      badgeClass: 'bg-purple-500 text-white',
    },
    {
      id: 'compact',
      name: 'الزجاجي النقي 💎',
      desc: 'شفافية زجاجية أنيقة خفيفة متقدمة',
      cardClass: 'bg-slate-900/80 backdrop-blur-md border-cyan-400 text-cyan-100',
      badgeClass: 'bg-cyan-400 text-slate-950',
    },
  ];

  const currentStyleObj = STYLE_CARDS.find(s => s.id === activeStyle) || STYLE_CARDS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl relative text-right text-white my-auto overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
            🔔
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              إعدادات التنبيهات وتخصيص شكل النوتيفيكيشن
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              تحكم في مواعيد الإشعارات، شكل وتصميم بطاقة الإشعار، ونغمات الأذان.
            </p>
          </div>
        </div>

        {/* LIVE NOTIFICATION CARD PREVIEW (THE STAGE) */}
        <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 font-mono">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              معاينة حية لشكل النوتيفيكيشن المختار:
            </span>
            <button
              type="button"
              onClick={handleSendTest}
              className="text-[11px] bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>إرسال تجربة الآن</span>
            </button>
          </div>

          {/* Rendered Notification Card Mock */}
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all duration-300 shadow-xl ${currentStyleObj.cardClass}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-xl shrink-0 border border-white/10">
                  🕌
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-extrabold text-xs sm:text-sm text-white">
                      {reminderMood === 'enthusiastic'
                        ? '🔥 يا بطل الستريك: أذّن العصر!'
                        : reminderMood === 'quranic'
                        ? '﴿حَافِظُوا عَلَى الصَّلَوَاتِ﴾'
                        : '🕌 حان موعد صلاة العصر الآن!'}
                    </h5>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${currentStyleObj.badgeClass}`}>
                      الآن
                    </span>
                  </div>
                  <p className="text-[11px] opacity-90 mt-0.5 leading-snug">
                    {reminderMood === 'enthusiastic'
                      ? 'أصحابك في الروم بانتظار دليلك من المسجد! حافظ على الستريك واكسب 10X XP.'
                      : 'صلِّ في المسجد لتنال مضاعفة 10 أضعاف (+1,000 XP) أو صور سجادتك بالمنزل.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] opacity-80 font-mono">
              <span>نغمة: {activeTone === 'adhan' ? 'أذان الحرم المكي' : activeTone === 'takbeer' ? 'تكبيرات العيد' : 'سكينة هادئة'}</span>
              <span>صلاتي مع صحابي • إثبات الصلاة</span>
            </div>
          </div>

          {testSent && (
            <div className="mt-2 text-center text-xs text-emerald-400 font-bold animate-pulse">
              ✓ تم إرسال التنبيه التجريبي وتشغيل النغمة المختارة بنجاح!
            </div>
          )}
        </div>

        {/* 1. NOTIFICATION STYLE SELECTOR */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>اختر تصميم وشكل النوتيفيكيشن:</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {STYLE_CARDS.map(s => {
              const isSelected = activeStyle === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleStyleChange(s.id as any)}
                  className={`p-2.5 rounded-2xl border text-right transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-500/40 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="font-extrabold text-xs text-white block">
                    {s.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. NOTIFICATION TONE SELECTOR */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span>نغمة وصوت التنبيه (مع إمكانية التجربة):</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'adhan', title: 'أذان الحرم 🕌', desc: 'نغم بياتي خاشع' },
              { id: 'takbeer', title: 'تكبيرات العيد 📢', desc: 'إيقاع احتفالي وقور' },
              { id: 'chime', title: 'سكينة هادئة 🔔', desc: 'رنين نقي متناغم' },
            ].map(t => {
              const isSelected = activeTone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleToneChange(t.id as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-teal-400 ring-2 ring-teal-500/40 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-xs text-white block">
                    {t.title}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    {t.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. NOTIFICATION MOOD / CONTENT */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>أسلوب صياغة رسائل التذكير:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'enthusiastic', label: 'حماسي للصحبة 🔥' },
              { id: 'spiritual', label: 'هادئ ورقيق 🌿' },
              { id: 'quranic', label: 'آيات وأحاديث 📖' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setReminderMood(m.id as any);
                }}
                className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                  reminderMood === m.id
                    ? 'bg-slate-800 border-amber-400 text-amber-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. PERMISSION STATUS */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-white block">
                إذن نوتيفيكيشن المتصفح والنظام
              </span>
              <span className="text-[10px] text-slate-400">
                {permissionState === 'granted'
                  ? 'مفعّل ويعمل بشكل سليم ✓'
                  : 'يتطلب الموافقة لظهور الإشعارات خارج التطبيق'}
              </span>
            </div>
          </div>
          {permissionState !== 'granted' && (
            <button
              type="button"
              onClick={handleRequestPermission}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
            >
              تفعيل الإذن الآن
            </button>
          )}
        </div>

        {/* 5. TIMING OPTIONS */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>وقت إرسال التنبيه:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'exact', label: 'عند الأذان بالضبط' },
              { id: 'early_15', label: 'قبل الأذان بـ 15 د' },
              { id: 'late_proof_10', label: 'بعد الأذان بـ 10 د' },
            ].map(tm => (
              <button
                key={tm.id}
                type="button"
                onClick={() => handleTimingChange(tm.id as any)}
                className={`py-1.5 text-xs font-bold rounded-xl border text-center transition-all ${
                  config.timing === tm.id
                    ? 'bg-slate-800 border-indigo-400 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {tm.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
