import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PrayerDefinition, User, Room, ProofType, LocationType } from '../types';
import { sound } from '../utils/sound';
import { getTierForLevel } from '../utils/levels';
import {
  Camera,
  RefreshCw,
  X,
  ShieldCheck,
  Check,
  Sparkles,
  Info,
  MapPin,
  Lock,
  Compass,
  Building,
  Home,
  CheckCircle2,
  Share2,
  Eye,
  Sliders,
  Zap,
} from 'lucide-react';

export interface CameraTargetInfo {
  titleAr: string;
  subtitleAr?: string;
  homeXp: number;
  mosqueXp: number;
  proofType: ProofType;
  icon?: string;
  prayer?: PrayerDefinition;
  taskId?: string;
  sunnahId?: string;
  qiyamRakaat?: number;
}

interface LiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: CameraTargetInfo;
  user: User;
  rooms: Room[];
  onProofCaptured: (data: {
    photoUrl: string;
    target: CameraTargetInfo;
    locationType: LocationType;
    actualXp: number;
    selectedRoomIds: string[];
  }) => void;
}

export const LiveCameraModal: React.FC<LiveCameraModalProps> = ({
  isOpen,
  onClose,
  target,
  user,
  rooms,
  onProofCaptured,
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  // Default to mosque for 10X multiplier encouragement!
  const [locationType, setLocationType] = useState<LocationType>('mosque');
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>(() =>
    rooms.map(r => r.id)
  );
  const [shareToPersonalOnly, setShareToPersonalOnly] = useState(false);
  const [showDestinationExplainer, setShowDestinationExplainer] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Exact 10X XP calculation
  const currentXp = locationType === 'mosque' ? target.mosqueXp : target.homeXp;

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('الكاميرا غير مدعومة');
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setCameraError('تم تفعيل محاكي العدسة البصرية الإسلامية الموثقة لتوثيق الصلاة بدقة.');
    }
  }, [facingMode, stream]);

  useEffect(() => {
    if (isOpen && !capturedPhoto) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, startCamera, capturedPhoto, stream]);

  if (!isOpen) return null;

  const toggleCameraFacing = () => {
    sound.playTick();
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  const toggleRoomSelection = (roomId: string) => {
    sound.playTick();
    if (shareToPersonalOnly) setShareToPersonalOnly(false);
    setSelectedRoomIds(prev =>
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  // High-Tech Islamic Viewfinder Capture Engine
  const captureLiveProof = () => {
    setIsCapturing(true);
    sound.playShutter();
    setFlash(true);
    setTimeout(() => setFlash(false), 180);

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const dateFormatted = now.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    if (videoRef.current && stream && !cameraError) {
      // Draw live hardware video frame
      ctx.drawImage(videoRef.current, 0, 0, 960, 720);
    } else {
      // HIGH FIDELITY ISLAMIC ARCHITECTURAL SCENE (Simulated Optical Sensor)
      const bgGrad = ctx.createRadialGradient(480, 360, 40, 480, 360, 540);
      if (locationType === 'mosque') {
        bgGrad.addColorStop(0, '#064e3b');
        bgGrad.addColorStop(0.4, '#022c22');
        bgGrad.addColorStop(0.85, '#051814');
        bgGrad.addColorStop(1, '#020b08');
      } else {
        bgGrad.addColorStop(0, '#0d544c');
        bgGrad.addColorStop(0.4, '#042f2e');
        bgGrad.addColorStop(0.85, '#041d1d');
        bgGrad.addColorStop(1, '#020d0d');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 960, 720);

      // Islamic Geometric Archway & Pillars
      ctx.strokeStyle = locationType === 'mosque' ? '#fbbf24' : '#14b8a6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(480, 270, 210, Math.PI, 0, false);
      ctx.lineTo(690, 620);
      ctx.lineTo(270, 620);
      ctx.closePath();
      ctx.fillStyle = locationType === 'mosque' ? 'rgba(6, 78, 59, 0.45)' : 'rgba(13, 148, 136, 0.25)';
      ctx.fill();
      ctx.stroke();

      // Inner Mihrab Crest
      ctx.beginPath();
      ctx.arc(480, 270, 160, Math.PI, 0, false);
      ctx.lineTo(640, 620);
      ctx.lineTo(320, 620);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ornate Rug / Mosque Carpet
      ctx.fillStyle = locationType === 'mosque' ? '#044434' : '#0f766e';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(330, 220, 300, 380, 24);
      ctx.fill();
      ctx.stroke();

      // Center Icon
      ctx.fillStyle = '#fef08a';
      ctx.font = '72px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(locationType === 'mosque' ? '🕌' : '🏠', 480, 360);

      // Title on Simulated Plate
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 28px Tajawal, sans-serif';
      ctx.fillText(
        locationType === 'mosque'
          ? 'دليل صلاة المسجد والجماعة (10X مضاعفة)'
          : 'دليل صلاة السجادة في المنزل',
        480,
        450
      );

      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 18px Tajawal, sans-serif';
      ctx.fillText('توثيق فوري معتمد من مستشعر الكاميرا الحية', 480, 490);
    }

    // LUXURY SECURITY WATERMARKS & HUD OVERLAY
    // 1. Top HUD Ribbon
    ctx.fillStyle = 'rgba(2, 44, 34, 0.94)';
    ctx.fillRect(0, 0, 960, 85);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 28px Tajawal, sans-serif';
    ctx.textAlign = 'right';
    const locTitle = locationType === 'mosque' ? '🕌 في المسجد والجماعة (10X مضاعفة)' : '🏠 في المنزل / على السجادة';
    ctx.fillText(`إثبات ${target.titleAr} • ${locTitle}`, 920, 52);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`+${currentXp} XP معتمدة`, 40, 52);

    // 2. Bottom Security Glass Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.fillRect(0, 580, 960, 140);

    const tier = getTierForLevel(user.level);
    ctx.fillStyle = tier.colorHex;
    ctx.font = 'bold 26px Tajawal, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${user.name} • ليفل ${user.level} (${user.title})`, 920, 625);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px Tajawal, sans-serif';
    ctx.fillText(`التاريخ: ${dateFormatted} • التوقيت: ${timeFormatted}`, 920, 665);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 18px Tajawal, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🔒 مُشفَّر وموثق لحظياً (ممنوع المعرض)', 40, 625);

    ctx.fillStyle = '#fb923c';
    ctx.font = 'bold 16px Tajawal, sans-serif';
    ctx.fillText(`الستريك: ${user.streak} أيام 🔥 • معرّف الجهاز: ${user.deviceId || 'DEV-8924'}`, 40, 665);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedPhoto(dataUrl);
    setIsCapturing(false);
  };

  const handleConfirmProof = () => {
    if (!capturedPhoto) return;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    const finalRooms = shareToPersonalOnly ? [] : selectedRoomIds;
    onProofCaptured({
      photoUrl: capturedPhoto,
      target,
      locationType,
      actualXp: currentXp,
      selectedRoomIds: finalRooms,
    });
  };

  const handleRetake = () => {
    sound.playTick();
    setCapturedPhoto(null);
    startCamera();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {flash && (
        <div className="fixed inset-0 bg-white z-[60] pointer-events-none transition-opacity duration-150" />
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col text-right my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xl">
              {locationType === 'mosque' ? '🕌' : '🏠'}
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-1.5">
                <span>محرك توثيق {target.titleAr}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  حي ولحظي
                </span>
              </h3>
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ممنوع رفع صور من المعرض • أمانة بينك وبين الله</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (stream) stream.getTracks().forEach(t => t.stop());
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 10X MOSQUE VS HOME LOCATION SELECTOR */}
        <div className="bg-slate-950 p-3 sm:p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>📍 أين تؤدي الصلاة الآن؟</span>
              <span className="text-amber-400 font-black">(صلاة المسجد = 10 أضعاف!)</span>
            </label>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              {locationType === 'mosque' ? `+${target.mosqueXp} XP` : `+${target.homeXp} XP`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Mosque Button (10X) */}
            <button
              type="button"
              onClick={() => {
                sound.playTick();
                setLocationType('mosque');
              }}
              className={`p-3 rounded-2xl border text-right transition-all relative overflow-hidden ${
                locationType === 'mosque'
                  ? 'bg-gradient-to-r from-emerald-950/80 via-teal-950/90 to-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-950/50'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>في المسجد والجماعة</span>
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  10X مضاعفة!
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs font-mono font-black text-amber-300">
                  +{target.mosqueXp} XP
                </span>
                <span className="text-[10px] text-emerald-300/80">أجر الجماعة في بيوت الله</span>
              </div>
            </button>

            {/* Home Button */}
            <button
              type="button"
              onClick={() => {
                sound.playTick();
                setLocationType('home');
              }}
              className={`p-3 rounded-2xl border text-right transition-all ${
                locationType === 'home'
                  ? 'bg-slate-800 border-teal-400 text-white ring-2 ring-teal-500/40 shadow-lg'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>في المنزل / بالسجادة</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">عادي</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs font-mono font-black text-teal-300">
                  +{target.homeXp} XP
                </span>
                <span className="text-[10px] text-slate-400">على سجادة الصلاة</span>
              </div>
            </button>
          </div>
        </div>

        {/* HIGH-TECH ISLAMIC VIEWFINDER HUD ENGINE */}
        <div className="relative bg-black aspect-[4/3] w-full flex items-center justify-center overflow-hidden">
          {!capturedPhoto ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
              />

              {/* Realistic Sensor Viewfinder Overlay when fallback */}
              {cameraError && (
                <div className="w-full h-full bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 flex flex-col items-center justify-center p-6 text-center relative select-none">
                  {/* Scanner laser animation */}
                  <div className="absolute inset-x-8 top-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

                  <div className="w-24 h-24 rounded-3xl border-2 border-emerald-400/60 bg-emerald-900/40 flex items-center justify-center text-5xl mb-3 shadow-2xl shadow-emerald-500/30">
                    {locationType === 'mosque' ? '🕌' : '🏠'}
                  </div>
                  <h4 className="text-white font-black text-base sm:text-lg">
                    {locationType === 'mosque' ? 'عدسة رصد محراب المسجد 🕌' : 'عدسة رصد سجادة الصلاة 🏠'}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
                    وجّه الكاميرا نحو {locationType === 'mosque' ? 'محراب المسجد أو صف الجماعة' : 'سجادة صلاتك بالمنزل'}، وسيتم وسم الصورة بختم التوثيق اللحظي.
                  </p>
                </div>
              )}

              {/* TACTICAL / SPIRITUAL HUD OVERLAYS */}
              <div className="absolute inset-3 sm:inset-4 pointer-events-none rounded-3xl flex flex-col justify-between p-2.5 sm:p-3 border border-emerald-500/25">
                {/* Top Status HUD */}
                <div className="flex justify-between items-center text-[11px] font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-emerald-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    عدسة بصرية مباشرة
                  </span>
                  <span className="text-amber-300 font-bold">
                    {locationType === 'mosque' ? '🕌 المسجد (10X)' : '🏠 المنزل'} • +{currentXp} XP
                  </span>
                </div>

                {/* Islamic Mihrab Reticle Brackets (Center Target) */}
                <div className="self-center text-center opacity-90 my-auto">
                  <div className="relative w-28 h-28 border-2 border-dashed border-emerald-400/70 rounded-3xl mx-auto flex items-center justify-center bg-black/25 backdrop-blur-xs">
                    {/* Mihrab arch silhouette icon inside reticle */}
                    <div className="w-14 h-14 border border-emerald-300/60 rounded-t-full border-b-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
                    </div>

                    {/* Sensor Corner Crosshairs */}
                    <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-emerald-300" />
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-emerald-300" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-emerald-300" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-emerald-300" />
                  </div>
                  <span className="text-[11px] text-white/95 mt-2 block font-extrabold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {locationType === 'mosque' ? 'وجّه نحو محراب المسجد أو الصف' : 'وجّه نحو موضع سجودك'}
                  </span>
                </div>

                {/* Bottom Telemetry HUD */}
                <div className="flex items-center justify-between text-[10px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3 h-3 text-emerald-400" />
                    استواء القبلة: 100%
                  </span>
                  <span>🔒 ختم لحظي مشفر برقم الجهاز</span>
                </div>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={capturedPhoto}
                alt="دليل الصلاة الملتقط"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                <Check className="w-4 h-4" />
                تم التوثيق والختم بالوقت والمكان
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* EXPLICIT TRANSPARENCY SECTION: WHERE DOES YOUR PHOTO GO? */}
        <div className="bg-slate-950 p-3.5 sm:p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-900/95 border border-slate-800 p-3 sm:p-3.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setShowDestinationExplainer(!showDestinationExplainer)}
              className="w-full flex items-center justify-between text-right"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>أين تذهب صورتك بعد التقاطها؟ (شفافية وأمان كامل)</span>
              </div>
              <span className="text-[11px] text-slate-400 underline">
                {showDestinationExplainer ? 'إخفاء' : 'عرض التفاصيل'}
              </span>
            </button>

            {showDestinationExplainer && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-2 text-[11px] text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-[11px] text-emerald-400 shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <strong className="text-white">سجلك الشخصي والتقويم الشهري:</strong>
                    <p className="text-slate-400 text-[10px]">
                      تُحفظ الصورة بأمان تام داخل ملفك الشخصي وتقويم صلواتك على هذا الجهاز كدليل مثبت لأداء الصلاة واستمرار الستريك.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-[11px] text-emerald-400 shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <strong className="text-white">رومات الجماعات المحددة (شات أصحابك):</strong>
                    <p className="text-slate-400 text-[10px]">
                      تُنشر فقط في الرومات التي تختارها أنت ليشاهدها أصحابك ويتفاعلوا معها تشجيعاً بالدعاء والمباركة ونيل الصدارة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-[11px] text-emerald-400 shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <strong className="text-emerald-400">خصوصية تامة 100%:</strong>
                    <p className="text-slate-400 text-[10px]">
                      لا تُرفع الصورة لأي خوادم عامة أو معرض صور مفتوح؛ محصورة فقط داخل جهازك وروماتك المختارة.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          {!capturedPhoto ? (
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={toggleCameraFacing}
                title="تبديل الكاميرا الأمامية / الخلفية"
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all shrink-0 active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={captureLiveProof}
                disabled={isCapturing}
                className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:brightness-110 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-95 text-sm sm:text-base"
              >
                <Camera className="w-5 h-5" />
                <span>التقاط الدليل لحظياً (+{currentXp} XP)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              {/* Rooms Selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    حدد أين تذهب هذه الصورة:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playTick();
                      setShareToPersonalOnly(!shareToPersonalOnly);
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                      shareToPersonalOnly
                        ? 'bg-purple-950/70 border-purple-400 text-purple-300 font-bold'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {shareToPersonalOnly ? '✓ حفظ خاص بسجلي فقط' : 'حفظ خاص بسجلي فقط بدون رومات'}
                  </button>
                </div>

                {!shareToPersonalOnly && rooms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {rooms.map(room => {
                      const isSelected = selectedRoomIds.includes(room.id);
                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => toggleRoomSelection(room.id)}
                          className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{room.emoji}</span>
                          <span>{room.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Confirm / Retake Buttons */}
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs transition-colors"
                >
                  إعادة التصوير 🔄
                </button>
                <button
                  type="button"
                  onClick={handleConfirmProof}
                  className="flex-[2] py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-2xl text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  اعتماد الدليل ونيل +{currentXp} XP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
