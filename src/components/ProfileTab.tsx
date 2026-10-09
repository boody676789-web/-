import React, { useState } from 'react';
import { User } from '../types';
import { getTierForLevel, getLevelProgress, getNextRewardDescription, COSMETIC_FRAMES } from '../utils/levels';
import { sound } from '../utils/sound';
import {
  Sparkles,
  Flame,
  Crown,
  Trophy,
  ShieldCheck,
  MapPin,
  Moon,
  Heart,
  ChevronLeft,
  Lock,
  KeyRound,
  Bell,
  Smartphone,
  Download,
  Edit3,
  Check,
  X,
  Share2,
  Palette,
  LogOut,
} from 'lucide-react';

interface ProfileTabProps {
  user: User;
  onOpenLevelPath: () => void;
  onOpenReminders: () => void;
  onOpenWidgets: () => void;
  onOpenApkInstall: () => void;
  onOpenShareModal: () => void;
  onOpenCosmeticsModal: () => void;
  onLockApp: () => void;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  onOpenLevelPath,
  onOpenReminders,
  onOpenWidgets,
  onOpenApkInstall,
  onOpenShareModal,
  onOpenCosmeticsModal,
  onLockApp,
  onUpdateUser,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editCity, setEditCity] = useState(user.city);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const [isSettingPin, setIsSettingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState<string | null>(null);

  const tier = getTierForLevel(user.level);
  const progress = getLevelProgress(user.level, user.xp);
  const nextReward = getNextRewardDescription(user.level);
  const equippedFrame = COSMETIC_FRAMES.find(f => f.id === user.equippedFrame) || COSMETIC_FRAMES[0];

  const deviceId = user.deviceId || 'DEV-8924';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    const updated = {
      ...user,
      name: editName.trim(),
      city: editCity,
      avatar: editAvatar,
    };
    sound.playTick();
    onUpdateUser(updated);
    setIsEditing(false);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setPinMessage('رمز المرور يجب أن يتكون من 4 أرقام بالضبط');
      return;
    }
    const updated = {
      ...user,
      pinCode: newPin,
    };
    sound.playPrayerAccepted();
    onUpdateUser(updated);
    setIsSettingPin(false);
    setNewPin('');
    setPinMessage('تم حفظ وتفعيل رمز الحماية بنجاح!');
    setTimeout(() => setPinMessage(null), 3000);
  };

  const handleRemovePin = () => {
    sound.playTick();
    const updated = {
      ...user,
      pinCode: undefined,
    };
    onUpdateUser(updated);
    setPinMessage('تم إلغاء رمز المرور');
    setTimeout(() => setPinMessage(null), 3000);
  };

  const AVATARS = ['🕌', '🌙', '⚔️', '🌟', '📿', '📖', '🤲', '👑', '🕊️', '🌿'];
  const CITIES = ['القاهرة', 'الإسكندرية', 'مكة المكرمة', 'المدينة المنورة', 'الرياض', 'جدة', 'عَمّان', 'دبي', 'الدوحة', 'الكويت'];

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>ملفي الشخصي (أنا) 👤</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            حسابك الفردي المحمي على هذا الجهاز مع كامل الإحصائيات والأدلة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Achievement Button */}
          <button
            onClick={onOpenShareModal}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة الإنجاز</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEditing ? 'إلغاء' : 'تعديل'}</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Drawer */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 animate-in slide-in-from-top duration-200">
          <h4 className="font-bold text-sm text-white">تعديل بيانات حسابك الشخصي:</h4>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">الاسم</label>
            <input
              type="text"
              required
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white text-right focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">الرمز الشخصي (الأفاتار)</label>
            <div className="flex flex-wrap gap-2 justify-center bg-slate-800/50 p-2 rounded-xl">
              {AVATARS.map(av => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setEditAvatar(av)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center ${
                    editAvatar === av ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">المدينة</label>
            <select
              value={editCity}
              onChange={e => setEditCity(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-[2] py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black"
            >
              حفظ التعديلات ✓
            </button>
          </div>
        </form>
      )}

      {/* Main Profile Identity Card */}
      <div
        className="rounded-3xl p-6 border-2 relative overflow-hidden shadow-2xl transition-all text-right"
        style={{
          borderColor: tier.colorHex,
          backgroundColor: '#090d16',
        }}
      >
        <div
          className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: tier.colorHex }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Framed Avatar */}
            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-xl shrink-0 relative bg-slate-900 ${equippedFrame.cssStyle}`}
            >
              <span>{user.avatar}</span>
              <span
                className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-full text-[10px] font-black text-white border-2 border-slate-900"
                style={{ backgroundColor: tier.colorHex }}
              >
                LVL {user.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="text-2xl font-black tracking-tight"
                  style={{ color: tier.colorHex }}
                >
                  {user.name}
                </h3>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                  {tier.nameAr}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className="font-extrabold text-sm"
                  style={{ color: tier.colorHex }}
                >
                  اللقب في الرومات: {user.title} 👑
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {user.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  الستريك: {user.streak} أيام متتالية
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shrink-0 text-left">
            <span className="text-[10px] text-slate-400 block font-mono">
              معرّف الجهاز المعتمد:
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {deviceId}
            </span>
            <span className="text-[9px] text-slate-500 block mt-0.5">
              🔒 حساب فردي محمي
            </span>
          </div>
        </div>
      </div>

      {/* Quick Utilities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Wardrobe & Cosmetics */}
        <button
          onClick={onOpenCosmeticsModal}
          className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition-all text-right flex flex-col justify-between gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-lg text-amber-400 group-hover:scale-105 transition-transform">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">خزانة الزينات</h4>
            <span className="text-[10px] text-slate-400 block mt-0.5">إطارات وأفاتارات مفتوحة</span>
          </div>
        </button>

        {/* Reminders */}
        <button
          onClick={onOpenReminders}
          className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 transition-all text-right flex flex-col justify-between gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-lg text-emerald-400 group-hover:scale-105 transition-transform">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">تذكيرات الصلاة</h4>
            <span className="text-[10px] text-slate-400 block mt-0.5">أذان وتنبيهات مخصصة</span>
          </div>
        </button>

        {/* Widgets */}
        <button
          onClick={onOpenWidgets}
          className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/40 transition-all text-right flex flex-col justify-between gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-950/70 border border-teal-500/30 flex items-center justify-center text-lg text-teal-400 group-hover:scale-105 transition-transform">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">ويدجيدتس خاصة</h4>
            <span className="text-[10px] text-slate-400 block mt-0.5">للشاشة الرئيسية للهاتف</span>
          </div>
        </button>

        {/* APK / PIN Lock */}
        <button
          onClick={() => {
            if (user.pinCode) {
              onLockApp();
            } else {
              setIsSettingPin(true);
            }
          }}
          className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 transition-all text-right flex flex-col justify-between gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-500/30 flex items-center justify-center text-lg text-purple-400 group-hover:scale-105 transition-transform">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-white">
              {user.pinCode ? 'قفل التطبيق الآن' : 'تعيين قفل PIN'}
            </h4>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {user.pinCode ? 'حماية برمز مرور' : 'حماية خصوصية حسابك'}
            </span>
          </div>
        </button>
      </div>

      {/* Publish & APK Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-emerald-950/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                بابلش ونشر التطبيق (APK & PWA)
              </h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                جاهز للنشر 100%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تثبيت فوري كـ تطبيق أندرويد APK، نشر على Google Play عبر PWABuilder، أو مشاركة الرابط.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenApkInstall}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>فتح أدوات النشر وتثبيت APK</span>
        </button>
      </div>

      {/* PIN Security Setting Form */}
      {isSettingPin && (
        <form onSubmit={handleSavePin} className="bg-slate-900 border border-purple-500/40 p-4 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-purple-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" />
              <span>تعيين رمز مرور PIN (4 أرقام):</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsSettingPin(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400">
            لن يتمكن أي شخص يمسك بهاتفك من فتح حسابك أو رؤية محادثات الروم بدون إدخال هذا الرمز.
          </p>
          <input
            type="password"
            maxLength={4}
            required
            placeholder="أدخل 4 أرقام (مثال: 1234)"
            value={newPin}
            onChange={e => setNewPin(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-lg text-white tracking-widest focus:outline-none focus:border-purple-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsSettingPin(false)}
              className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-[2] py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-md"
            >
              حفظ وتفعيل رمز القفل
            </button>
          </div>
        </form>
      )}

      {user.pinCode && !isSettingPin && (
        <div className="bg-slate-900/80 border border-purple-500/30 p-3 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-purple-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>رمز قفل التطبيق مفعّل ومحمي على هذا الجهاز</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingPin(true)}
              className="text-slate-400 hover:text-white text-[11px] underline"
            >
              تغيير
            </button>
            <button
              onClick={handleRemovePin}
              className="text-rose-400 hover:text-rose-300 text-[11px]"
            >
              إلغاء القفل
            </button>
          </div>
        </div>
      )}

      {pinMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl text-xs text-emerald-300 text-center">
          {pinMessage}
        </div>
      )}

      {/* Level, XP & Next Reward Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-0.5">
              مستوى التقدم والخبرة (XP)
            </span>
            <div className="flex items-center gap-2">
              <span
                className="text-3xl font-black font-mono"
                style={{ color: tier.colorHex }}
              >
                المستوى {user.level}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 250</span>
            </div>
          </div>

          <div className="text-left font-mono">
            <span className="text-xs text-slate-400 block">إجمالي النقاط</span>
            <span className="text-lg font-black text-amber-300">
              {user.xp.toLocaleString('ar-EG')} XP
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span>التقدم نحو ليفل {user.level + 1}:</span>
            <span>
              {progress.currentInLevel} / {progress.neededForNext} XP ({progress.percentage}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress.percentage}%`,
                backgroundColor: tier.colorHex,
              }}
            />
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 mb-1.5 text-amber-300 font-extrabold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>هدية وجائزة المستوى القادم (ليفل {user.level + 1}):</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {nextReward}
          </p>
        </div>

        <button
          onClick={onOpenLevelPath}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:brightness-110 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Crown className="w-4 h-4" />
          <span>استعراض مسار الـ 250 ليفل بالكامل وجوائز كل مرحلة</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Lifetime Stats Matrix */}
      <div>
        <h4 className="font-extrabold text-sm sm:text-base text-white mb-3 px-1">
          إحصائيات مسيرتك المباركة:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right">
            <span className="text-[11px] text-slate-400 block mb-1">
              صلوات مثبتة بالدليل
            </span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {user.prayersCompletedTotal}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              صورة موثقة 📸
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right">
            <span className="text-[11px] text-slate-400 block mb-1">
              أطول ستريك مستمر
            </span>
            <span className="text-2xl font-black text-orange-400 font-mono">
              {user.longestStreak}
            </span>
            <span className="text-[10px] text-orange-400/80 block mt-1">
              أيام متتالية 🔥
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right">
            <span className="text-[11px] text-slate-400 block mb-1">
              ركعات قيام الليل
            </span>
            <span className="text-2xl font-black text-indigo-400 font-mono">
              {user.nightPrayersTotal}
            </span>
            <span className="text-[10px] text-indigo-300 block mt-1">
              ركعة في جوف الليل 🌙
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right">
            <span className="text-[11px] text-slate-400 block mb-1">
              أذكار وتسبيحات
            </span>
            <span className="text-2xl font-black text-teal-400 font-mono">
              {user.azkarCompletedTotal}
            </span>
            <span className="text-[10px] text-teal-300 block mt-1">
              ذكر معتمد 📿
            </span>
          </div>
        </div>
      </div>

      {/* Account Session / Logout */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            sound.playTick();
            onLogout();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-2 group"
        >
          <LogOut className="w-4 h-4 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>تسجيل الخروج من الحساب (للتبديل أو بدء حساب جديد)</span>
        </button>
      </div>
    </div>
  );
};
