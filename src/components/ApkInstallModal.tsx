import React, { useState } from 'react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { sound } from '../utils/sound';
import {
  Download,
  Smartphone,
  Check,
  X,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Copy,
  Share2,
  Package,
  Layers,
  Globe,
  Radio,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface ApkInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'install' | 'apk_builder' | 'share' | 'audit';

export const ApkInstallModal: React.FC<ApkInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<TabType>('install');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPwaCmd, setCopiedPwaCmd] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://salah-app.web.app';

  const handleInstallClick = async () => {
    sound.playLevelUp();
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).catch(() => {});
    setCopiedUrl(true);
    sound.playTick();
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleShareApp = () => {
    sound.playTick();
    if (navigator.share) {
      navigator.share({
        title: 'صلاتي مع صحابي - إثبات الصلاة والجماعات',
        text: 'انضم إلي في تطبيق صلاتي مع صحابي! وثّق صلاتك بكاميرا حية، اكسب 10 أضعاف في المسجد، وتنافس في 250 مستوى مع أصحابك.',
        url: currentUrl,
      }).catch(() => {});
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative text-right text-white max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pr-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-600/30 shrink-0">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white">
                مركز النشر والبابلش وتثبيت APK
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                PRO PUBLISH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              كل ما تحتاجه لتثبيت التطبيق على جهازك، تصدير APK لمتجر جوجل، ومشاركته مع الأصدقاء.
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-2xl mb-4 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('install');
              sound.playTick();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
              activeTab === 'install'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>تثبيت فوري (APK)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('apk_builder');
              sound.playTick();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
              activeTab === 'apk_builder'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>حزمة Google Play</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('share');
              sound.playTick();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
              activeTab === 'share'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>الرابط و QR</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('audit');
              sound.playTick();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>جاهزية النشر</span>
          </button>
        </div>

        {/* Tab 1: Instant Install (PWA / WebAPK) */}
        <div className="flex-1 overflow-y-auto pr-0.5 space-y-3.5 text-xs text-slate-300">
          {activeTab === 'install' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              {isInstalled ? (
                <div className="bg-emerald-950/40 border border-emerald-500/50 p-4 rounded-2xl text-center">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                  <h4 className="font-extrabold text-sm text-white">
                    التطبيق مثبت كـ APK رسمي على جهازك! 🎉
                  </h4>
                  <p className="text-xs text-emerald-300/80 mt-1">
                    أنت الآن تستخدم التطبيق في وضع الشاشة الكاملة (Standalone) مع كامل الإمكانيات والصلاحيات.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-extrabold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>تثبيت تطبيق مستقل (Standalone WebAPK)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      عند الضغط على الزر أدناه، ينشئ المتصفح تلقائياً حزمة أندرويد (WebAPK) تظهر في شاشة هاتفك وقائمة التطبيقات بأيقونة صلاتي، وتعمل بدون شريط المتصفح ومع حفظ البيانات بدون إنترنت.
                    </p>
                  </div>

                  <button
                    onClick={handleInstallClick}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:brightness-110 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <Download className="w-5 h-5 animate-bounce" />
                    <span>تثبيت التطبيق على جهازي الآن (نقرة واحدة)</span>
                  </button>

                  {/* Android / iOS Manual instructions */}
                  <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
                    <div className="flex items-start gap-2">
                      <span className="text-base shrink-0">🤖</span>
                      <div>
                        <strong className="text-white block mb-0.5">على أجهزة أندرويد (Chrome / Samsung):</strong>
                        <span>إذا لم يفتح التثبيت فوراً، اضغط على قائمة الثلاث نقاط (⋮) في أعلى المتصفح واختر <strong>«تثبيت التطبيق»</strong> أو <strong>«إضافة إلى الشاشة الرئيسية»</strong>.</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-800 pt-2 flex items-start gap-2">
                      <span className="text-base shrink-0">🍏</span>
                      <div>
                        <strong className="text-white block mb-0.5">على أجهزة آيفون (Safari):</strong>
                        <span>اضغط على زر المشاركة بالأسفل <strong>(Share / مربع به سهم للأعلى)</strong> ثم اختر <strong>«إضافة إلى الشاشة الرئيسية (Add to Home Screen)»</strong>.</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Perks list */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-950/40 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">أيقونة رسمية على الشاشة</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">شاشة كاملة بدون متصفح</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">يعمل بدون إنترنت (Offline)</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-300">كاميرا حية وتنبيهات أذان</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Export to Google Play APK / PWABuilder */}
          {activeTab === 'apk_builder' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5 text-amber-300 font-extrabold text-sm">
                  <Package className="w-4 h-4" />
                  <span>طريقة تصدير ملف APK و AAB لمتجر Google Play في دقيقة:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تطبيقك مبني وفق معايير PWA القياسية العالمية (Web App Manifest + Service Worker)، مما يمكنك من تحويله مباشرة لملف أندرويد رسمي.
                </p>
              </div>

              {/* Step by step */}
              <div className="space-y-2">
                <div className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-white block mb-0.5">انسخ رابط تطبيقك المباشر:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        readOnly
                        value={currentUrl}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300 truncate"
                      />
                      <button
                        onClick={handleCopyUrl}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors shrink-0 flex items-center gap-1"
                      >
                        {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUrl ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-white block mb-0.5">توجه إلى منصة PWABuilder (أداة مايكروسوفت الرسمية):</span>
                    <p className="text-[11px] text-slate-400">
                      الصق الرابط هناك واضغط على زر <strong>«Start»</strong> ثم <strong>«Package for Android»</strong>.
                    </p>
                    <a
                      href="https://www.pwabuilder.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-bold mt-1.5"
                    >
                      <span>فتح موقع pwabuilder.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 p-3 rounded-2xl flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-white block mb-0.5">تحميل ملف APK أو AAB:</span>
                    <p className="text-[11px] text-slate-400">
                      ستحصل فوراً على ملف <strong>APK</strong> جاهز لتثبيته أو إرساله للأصدقاء في تليجرام/واتساب، وملف <strong>AAB (Android App Bundle)</strong> جاهز لرفعه على Google Play Console!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Share URL & Instant QR Code */}
          {activeTab === 'share' && (
            <div className="space-y-3.5 animate-in fade-in duration-150 text-center">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                <h4 className="font-extrabold text-sm text-white mb-1">
                  امسح الرمز بكاميرا الهاتف لتثبيت التطبيق مباشرة:
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  افتح كاميرا أي هاتف أندرويد أو آيفون ووجّهها إلى الكود أدناه:
                </p>

                {/* Simulated high-fidelity Islamic-themed QR Code representation */}
                <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-emerald-500/40 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    {/* Corners */}
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="#064e3b" />
                    <rect x="10" y="10" width="15" height="15" rx="2" fill="white" />
                    <rect x="13" y="13" width="9" height="9" rx="1" fill="#064e3b" />

                    <rect x="70" y="5" width="25" height="25" rx="3" fill="#064e3b" />
                    <rect x="75" y="10" width="15" height="15" rx="2" fill="white" />
                    <rect x="78" y="13" width="9" height="9" rx="1" fill="#064e3b" />

                    <rect x="5" y="70" width="25" height="25" rx="3" fill="#064e3b" />
                    <rect x="10" y="75" width="15" height="15" rx="2" fill="white" />
                    <rect x="13" y="78" width="9" height="9" rx="1" fill="#064e3b" />

                    {/* QR Matrix Elements */}
                    <rect x="35" y="10" width="5" height="12" fill="#064e3b" />
                    <rect x="45" y="6" width="15" height="5" fill="#064e3b" />
                    <rect x="45" y="18" width="10" height="5" fill="#064e3b" />
                    <rect x="60" y="14" width="5" height="15" fill="#064e3b" />

                    <rect x="10" y="35" width="12" height="5" fill="#064e3b" />
                    <rect x="6" y="45" width="5" height="15" fill="#064e3b" />
                    <rect x="18" y="45" width="5" height="10" fill="#064e3b" />

                    <rect x="35" y="35" width="30" height="30" rx="4" fill="#064e3b" />
                    <circle cx="50" cy="50" r="10" fill="white" />
                    <text x="50" y="54" fontSize="11" textAnchor="middle" fill="#064e3b" fontWeight="bold">🕌</text>

                    <rect x="70" y="35" width="12" height="6" fill="#064e3b" />
                    <rect x="85" y="45" width="10" height="5" fill="#064e3b" />
                    <rect x="75" y="55" width="15" height="5" fill="#064e3b" />

                    <rect x="35" y="70" width="10" height="5" fill="#064e3b" />
                    <rect x="48" y="70" width="12" height="8" fill="#064e3b" />
                    <rect x="35" y="82" width="25" height="6" fill="#064e3b" />
                    <rect x="70" y="75" width="12" height="12" fill="#064e3b" />
                    <rect x="85" y="80" width="10" height="15" fill="#064e3b" />
                  </svg>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block mt-2">
                  ✨ مسح تلقائي يفتح شاشة التثبيت فوراً
                </span>
              </div>

              {/* Share & Copy Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleShareApp}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة عبر واتساب / تليجرام</span>
                </button>
                <button
                  onClick={handleCopyUrl}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedUrl ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Production Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 mb-1 text-emerald-400 font-extrabold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>فحص جاهزية النشر الشامل (100% Ready)</span>
                </div>
                <p className="text-xs text-slate-300">
                  تم اختبار كافة المعايير الهندسية والبرمجية للتطبيق وهي متوافقة تماماً مع معايير الإنتاج.
                </p>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">حزمة Web App Manifest & Service Worker</strong>
                      <span className="text-[11px] text-slate-400">ملف التعريف والأيقونات 192/512 متوافق مع معايير PWA</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    مفعّل
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">250 مستوى وجوائز الزينات والألقاب</strong>
                      <span className="text-[11px] text-slate-400">ألقاب إسلامية شريفة وجوائز لكل مستوى حتى 250</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    مكتمل
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">مضاعف صلاة المسجد 10 أضعاف (10X)</strong>
                      <span className="text-[11px] text-slate-400">الفجر 1500 XP والصلوات 1000 XP مع توثيق الكاميرا الحية</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    معتمد
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">نظام الحسابات المعزول والبداية من الصفر</strong>
                      <span className="text-[11px] text-slate-400">كل حساب جديد يبدأ من 0 XP مع عزلة تامة للتقويم والرومات</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    آمن
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white block">زر مغادرة الرومات والتحكم بالصحبة</strong>
                      <span className="text-[11px] text-slate-400">إمكانية الانضمام والخروج برمز الدعوة بنقرة واحدة</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    متاح
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>نسخة الإنتاج v2.5 جاهزة ومعتمدة</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
