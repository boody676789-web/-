import React, { useState } from 'react';
import { User } from '../types';
import { StorageAPI } from '../utils/storage';
import { sound } from '../utils/sound';
import {
  ShieldCheck,
  Sparkles,
  Lock,
  User as UserIcon,
  MapPin,
  LogIn,
  UserPlus,
  Flame,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';

interface AuthScreenProps {
  onSuccess: (user: User) => void;
}

const AVATARS = ['🕌', '🌙', '⚔️', '📖', '🌟', '🕊️', '🌿', '🤲'];
const CITIES = [
  'القاهرة',
  'الإسكندرية',
  'مكة المكرمة',
  'المدينة المنورة',
  'الرياض',
  'جدة',
  'عَمّان',
  'دبي',
  'الدوحة',
  'الكويت',
  'الرباط',
  'تونس',
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🕌');
  const [city, setCity] = useState('القاهرة');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      if (mode === 'register') {
        if (!username.trim() || !password.trim() || !name.trim()) {
          setErrorMsg('يرجى ملء كافة الحقول المطلوبة.');
          return;
        }
        if (password.length < 4) {
          setErrorMsg('كلمة المرور يجب ألا تقل عن 4 خانات.');
          return;
        }

        const newUser = StorageAPI.registerNewUser({
          username: username.trim(),
          password: password.trim(),
          name: name.trim(),
          avatar,
          city,
        });

        sound.playLevelUp();
        onSuccess(newUser);
      } else {
        if (!username.trim() || !password.trim()) {
          setErrorMsg('يرجى إدخال اسم المستخدم وكلمة المرور.');
          return;
        }
        const loggedUser = StorageAPI.loginUser(username.trim(), password.trim());
        sound.playPrayerAccepted();
        onSuccess(loggedUser);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('حدث خطأ أثناء المحاولة، يرجى إعادة المحاولة.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-white font-sans relative overflow-hidden">
      {/* Background Islamic Ambient Rings */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-right">
        {/* App Logo */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/25 mb-3 border border-emerald-400/40">
            🕌
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            صلاتي مع صحابي
          </h1>
          <p className="text-xs sm:text-sm text-emerald-400 font-bold mt-1">
            توثيق الصلاة الحية • مضاعفة المسجد 10 أضعاف • مسار 250 مستوى
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            إنشاء حساب (من الصفر)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            تسجيل الدخول
          </button>
        </div>

        {/* Start from Zero Notice */}
        {mode === 'register' && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-2xl mb-4 text-[11px] text-emerald-200 leading-relaxed flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              يبدأ حسابك نظيفاً تماماً من الصفر (0 XP • ليفل 1 • 0 أيام ستريك) لبناء مسيرتك خطوة بخطوة بأمانة كاملة.
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الاسم الشخصي (يظهر لأصحابك في الرومات)
              </label>
              <input
                type="text"
                required
                placeholder="مثال: عبد الله، عبد الرحمن، أنس، بلال، عمر، فاطمة، خديجة..."
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 text-right"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              اسم المستخدم (Username لتسجيل الدخول)
            </label>
            <input
              type="text"
              required
              placeholder="مثال: abdullah2026 أو ahmed_salah"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 text-left font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="أدخل كلمة مرور لحماية حسابك..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 text-left font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  اختر الرمز الشخصي المفضل:
                </label>
                <div className="flex flex-wrap gap-2 justify-center bg-slate-950 p-2 rounded-2xl border border-slate-800">
                  {AVATARS.map(av => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                        avatar === av
                          ? 'bg-emerald-600 scale-110 shadow-md shadow-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>المدينة (لتحديد مواعيد الأذان)</span>
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {CITIES.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {errorMsg && (
            <div className="bg-rose-950/60 border border-rose-500/50 p-2.5 rounded-xl text-xs text-rose-300 text-center font-bold">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{mode === 'register' ? 'إنشاء حسابي والبدء من الصفر' : 'تسجيل الدخول ومتابعة صلاتي'}</span>
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>كل حساب محمي ببياناته على هذا الجهاز لمنع التداخل والخلط</span>
        </div>
      </div>
    </div>
  );
};
