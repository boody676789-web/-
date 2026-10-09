import React, { useState, useRef } from 'react';
import { User } from '../types';
import { getTierForLevel, COSMETIC_FRAMES } from '../utils/levels';
import { sound } from '../utils/sound';
import {
  Share2,
  Copy,
  Download,
  Check,
  X,
  Flame,
  Sparkles,
  ShieldCheck,
  Crown,
  Heart,
} from 'lucide-react';

interface AchievementShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const AchievementShareModal: React.FC<AchievementShareModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const tier = getTierForLevel(user.level);
  const equippedFrame = COSMETIC_FRAMES.find(f => f.id === user.equippedFrame) || COSMETIC_FRAMES[0];

  const shareText = `🕌 الحمد لله! وصلت للمستوى ${user.level} في تطبيق (صلاتي مع صحابي) وحققت ستريك ${user.streak} أيام متواصلة بلقب "${user.title}". شاركني التحدي وثبّت صلاتك بدليل الكاميرا الحية!`;

  const handleShare = async () => {
    sound.playTick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'إنجاز صلاتي مع صحابي 🕌',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback to copy
      }
    }
    // WhatsApp direct share fallback
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + window.location.href)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopy = () => {
    sound.playTick();
    navigator.clipboard.writeText(shareText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Canvas Image Download
  const handleDownloadCard = () => {
    sound.playPrayerAccepted();
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 1000);
    bgGrad.addColorStop(0, '#022c22');
    bgGrad.addColorStop(0.5, '#064e3b');
    bgGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 1000);

    // Outer Border
    ctx.strokeStyle = tier.colorHex;
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, 740, 940);

    // Inner subtle arch
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 700, 900);

    // Header Badge
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px Tajawal, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🕌 صلاتي مع صحابي', 400, 130);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = '22px Tajawal, sans-serif';
    ctx.fillText('بطاقة إنجاز وتوثيق الصلاة المعتمدة', 400, 175);

    // Avatar Box
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(400, 310, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = tier.colorHex;
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.font = '80px sans-serif';
    ctx.fillText(user.avatar, 400, 340);

    // User Name & Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Tajawal, sans-serif';
    ctx.fillText(user.name, 400, 450);

    ctx.fillStyle = tier.colorHex;
    ctx.font = 'bold 30px Tajawal, sans-serif';
    ctx.fillText(`اللقب: ${user.title}`, 400, 500);

    // Stats Grid Ribbon
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(80, 560, 640, 160);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(80, 560, 640, 160);

    // Stat 1: Level
    ctx.fillStyle = tier.colorHex;
    ctx.font = 'bold 42px monospace';
    ctx.fillText(`LVL ${user.level}`, 240, 625);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px Tajawal, sans-serif';
    ctx.fillText('من أصل 250 مستوى', 240, 670);

    // Stat 2: Streak
    ctx.fillStyle = '#fb923c';
    ctx.font = 'bold 42px monospace';
    ctx.fillText(`🔥 ${user.streak}`, 560, 625);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px Tajawal, sans-serif';
    ctx.fillText('أيام ستريك متواصلة', 560, 670);

    // Ayah quote
    ctx.fillStyle = '#fef08a';
    ctx.font = 'italic 24px Tajawal, sans-serif';
    ctx.fillText('﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾', 400, 790);

    // Footer Watermark
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 18px Tajawal, sans-serif';
    ctx.fillText('✓ موثق بكاميرا حية - غير قابل للرفع من المعرض', 400, 870);

    const nowStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Tajawal, sans-serif';
    ctx.fillText(`التاريخ: ${nowStr} • معرّف الجهاز: ${user.deviceId || 'DEV-8924'}`, 400, 910);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `salah-achievement-${user.name}-lvl${user.level}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-right text-white">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 mb-2">
            🌟
          </div>
          <h3 className="text-xl font-black text-white">
            مشاركة إنجازك في الصلاة
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            شارك بطاقة إنجازك الفخمة مع أصحابك في واتساب لرفع همتهم وتشجيعهم!
          </p>
        </div>

        {/* The Visual Share Card Preview */}
        <div
          ref={cardRef}
          className="rounded-3xl p-5 border-2 relative overflow-hidden shadow-2xl text-center mb-5"
          style={{
            borderColor: tier.colorHex,
            backgroundColor: '#06281e',
            backgroundImage: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.2), transparent 70%)',
          }}
        >
          <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold mb-3 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              توثيق حي معتمد
            </span>
            <span>صلاتي مع صحابي 🕌</span>
          </div>

          {/* Framed Avatar */}
          <div className="relative inline-block my-2">
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl bg-slate-900 mx-auto transition-transform ${equippedFrame.cssStyle}`}
            >
              <span>{user.avatar}</span>
            </div>
            <span
              className="absolute -bottom-2 -left-2 px-2.5 py-0.5 rounded-full text-xs font-black text-white border-2 border-slate-900 shadow-md"
              style={{ backgroundColor: tier.colorHex }}
            >
              LVL {user.level}
            </span>
          </div>

          <h4 className="text-2xl font-black text-white mt-2">
            {user.name}
          </h4>
          <span
            className="text-sm font-black block mt-0.5"
            style={{ color: tier.colorHex }}
          >
            اللقب: {user.title} 👑
          </span>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2 my-4 bg-slate-950/60 p-3 rounded-2xl border border-white/10">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">المستوى الحالي</span>
              <span className="text-lg font-black font-mono" style={{ color: tier.colorHex }}>
                {user.level} <span className="text-[10px] text-slate-400 font-sans">/ 250</span>
              </span>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">الستريك المتواصل</span>
              <span className="text-lg font-black text-orange-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                {user.streak} أيام
              </span>
            </div>
          </div>

          <p className="text-xs text-amber-200/90 italic leading-relaxed">
            «أحب الأعمال إلى الله الصلاة على وقتها»
          </p>

          <span className="text-[10px] text-emerald-300/80 block mt-3 font-mono">
            {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleShare}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة الإنجاز عبر واتساب / وسائل التواصل</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDownloadCard}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>تحميل كـ صورة (PNG)</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>تم نسخ النص!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ النص</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
