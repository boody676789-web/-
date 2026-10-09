import { LevelMilestone, CosmeticFrame } from '../types';

export interface TierInfo {
  tierNumber: number; // 1 to 25
  nameAr: string;
  rangeStr: string;
  colorName: string;
  colorHex: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeStyle: string;
}

export const TIERS: TierInfo[] = [
  { tierNumber: 1, nameAr: 'المحافظ المبتدئ', rangeStr: '1 - 9', colorName: 'الزمردي البرونزي', colorHex: '#10b981', colorClass: 'text-emerald-400', bgClass: 'bg-emerald-950/40', borderClass: 'border-emerald-500/30', badgeStyle: 'from-emerald-600 to-teal-700' },
  { tierNumber: 2, nameAr: 'حريص الجماعة', rangeStr: '10 - 19', colorName: 'الأخضر المتوهج', colorHex: '#22c55e', colorClass: 'text-green-400', bgClass: 'bg-green-950/40', borderClass: 'border-green-500/40', badgeStyle: 'from-green-600 to-emerald-600' },
  { tierNumber: 3, nameAr: 'عمار المساجد', rangeStr: '20 - 29', colorName: 'الفيروزي المشع', colorHex: '#06b6d4', colorClass: 'text-cyan-400', bgClass: 'bg-cyan-950/40', borderClass: 'border-cyan-500/40', badgeStyle: 'from-cyan-600 to-teal-600' },
  { tierNumber: 4, nameAr: 'بطل الفجر في المسجد', rangeStr: '30 - 39', colorName: 'الأزرق الملكي', colorHex: '#3b82f6', colorClass: 'text-blue-400', bgClass: 'bg-blue-950/40', borderClass: 'border-blue-500/40', badgeStyle: 'from-blue-600 to-indigo-700' },
  { tierNumber: 5, nameAr: 'خاشع المحراب', rangeStr: '40 - 49', colorName: 'البنفسجي الروحاني', colorHex: '#a855f7', colorClass: 'text-purple-400', bgClass: 'bg-purple-950/40', borderClass: 'border-purple-500/40', badgeStyle: 'from-purple-600 to-fuchsia-700' },
  { tierNumber: 6, nameAr: 'حافظ العهد والفرائض', rangeStr: '50 - 59', colorName: 'الوردي الياقوتي', colorHex: '#f43f5e', colorClass: 'text-rose-400', bgClass: 'bg-rose-950/40', borderClass: 'border-rose-500/40', badgeStyle: 'from-rose-600 to-pink-700' },
  { tierNumber: 7, nameAr: 'منار السنن والرواتب', rangeStr: '60 - 69', colorName: 'الكهرماني الذهبي', colorHex: '#f59e0b', colorClass: 'text-amber-400', bgClass: 'bg-amber-950/40', borderClass: 'border-amber-500/40', badgeStyle: 'from-amber-500 to-yellow-600' },
  { tierNumber: 8, nameAr: 'صائم وقائم بالأسحار', rangeStr: '70 - 79', colorName: 'البرتقالي الوهاج', colorHex: '#f97316', colorClass: 'text-orange-400', bgClass: 'bg-orange-950/40', borderClass: 'border-orange-500/40', badgeStyle: 'from-orange-600 to-amber-600' },
  { tierNumber: 9, nameAr: 'نور على نور', rangeStr: '80 - 89', colorName: 'السماوي البلاتيني', colorHex: '#38bdf8', colorClass: 'text-sky-300', bgClass: 'bg-sky-950/40', borderClass: 'border-sky-400/50', badgeStyle: 'from-sky-500 to-indigo-600' },
  { tierNumber: 10, nameAr: 'السابق بالخيرات', rangeStr: '90 - 99', colorName: 'الياقوت الإمبراطوري', colorHex: '#e11d48', colorClass: 'text-rose-500', bgClass: 'bg-rose-950/50', borderClass: 'border-rose-500/50', badgeStyle: 'from-rose-500 to-amber-600' },
  { tierNumber: 11, nameAr: 'إمام المتقين (ليفل 100)', rangeStr: '100 - 109', colorName: 'التاج المذهب الملكي', colorHex: '#eab308', colorClass: 'text-yellow-400 font-black', bgClass: 'bg-yellow-950/50', borderClass: 'border-yellow-400/60', badgeStyle: 'from-yellow-400 to-amber-600 shadow-md shadow-amber-500/30' },
  { tierNumber: 12, nameAr: 'نور المساجد الساطع', rangeStr: '110 - 119', colorName: 'الزمرد الملكي الساطع', colorHex: '#059669', colorClass: 'text-emerald-300', bgClass: 'bg-emerald-950/50', borderClass: 'border-emerald-400/50', badgeStyle: 'from-emerald-500 to-teal-500' },
  { tierNumber: 13, nameAr: 'أهل الذكر والدعاء', rangeStr: '120 - 129', colorName: 'الفيروز السيليستي', colorHex: '#0891b2', colorClass: 'text-cyan-300', bgClass: 'bg-cyan-950/50', borderClass: 'border-cyan-400/50', badgeStyle: 'from-cyan-500 to-blue-600' },
  { tierNumber: 14, nameAr: 'قائم الليل المتبتل', rangeStr: '130 - 139', colorName: 'حجر اللازورد', colorHex: '#2563eb', colorClass: 'text-blue-300', bgClass: 'bg-blue-950/50', borderClass: 'border-blue-400/50', badgeStyle: 'from-blue-600 to-violet-600' },
  { tierNumber: 15, nameAr: 'المستغفر بالأسحار', rangeStr: '140 - 149', colorName: 'النور القرمزي', colorHex: '#9333ea', colorClass: 'text-purple-300', bgClass: 'bg-purple-950/50', borderClass: 'border-purple-400/50', badgeStyle: 'from-purple-600 to-pink-600' },
  { tierNumber: 16, nameAr: 'رفيق الصف الأول', rangeStr: '150 - 159', colorName: 'الزعفران الذهبي', colorHex: '#d97706', colorClass: 'text-amber-300', bgClass: 'bg-amber-950/50', borderClass: 'border-amber-400/50', badgeStyle: 'from-amber-500 to-orange-600' },
  { tierNumber: 17, nameAr: 'الصادق في الوعد', rangeStr: '160 - 169', colorName: 'العقيق الفاخر', colorHex: '#dc2626', colorClass: 'text-red-400', bgClass: 'bg-red-950/50', borderClass: 'border-red-400/50', badgeStyle: 'from-red-600 to-rose-600' },
  { tierNumber: 18, nameAr: 'لؤلؤة المحراب الطاهرة', rangeStr: '170 - 179', colorName: 'اللؤلؤي المشع', colorHex: '#f1f5f9', colorClass: 'text-slate-100 font-bold', bgClass: 'bg-slate-800/60', borderClass: 'border-slate-300/50', badgeStyle: 'from-slate-200 to-slate-400 text-slate-900' },
  { tierNumber: 19, nameAr: 'المقربون الصالحون', rangeStr: '180 - 189', colorName: 'الألماسي الأزرق', colorHex: '#67e8f9', colorClass: 'text-cyan-200 font-black', bgClass: 'bg-cyan-950/60', borderClass: 'border-cyan-300/60', badgeStyle: 'from-cyan-300 to-blue-500' },
  { tierNumber: 20, nameAr: 'شمس الهدى والتقى', rangeStr: '190 - 199', colorName: 'الشمس المشرقة', colorHex: '#facc15', colorClass: 'text-yellow-300 font-black', bgClass: 'bg-yellow-950/60', borderClass: 'border-yellow-300/60', badgeStyle: 'from-yellow-400 to-orange-500' },
  { tierNumber: 21, nameAr: 'قدوة الصالحين (200)', rangeStr: '200 - 209', colorName: 'الذهب الياقوتي المزدوج', colorHex: '#fb7185', colorClass: 'text-rose-300 font-black', bgClass: 'bg-rose-950/60', borderClass: 'border-rose-400/70', badgeStyle: 'from-rose-400 to-amber-500' },
  { tierNumber: 22, nameAr: 'طالب الفردوس الأعلى', rangeStr: '210 - 219', colorName: 'النيلي المجري', colorHex: '#818cf8', colorClass: 'text-indigo-300 font-black', bgClass: 'bg-indigo-950/60', borderClass: 'border-indigo-400/70', badgeStyle: 'from-indigo-400 to-purple-500' },
  { tierNumber: 23, nameAr: 'المخلصون الأبرار', rangeStr: '220 - 229', colorName: 'الفيروز النيون', colorHex: '#2dd4bf', colorClass: 'text-teal-300 font-black', bgClass: 'bg-teal-950/60', borderClass: 'border-teal-400/70', badgeStyle: 'from-teal-400 to-cyan-500' },
  { tierNumber: 24, nameAr: 'سراج أهل الإيمان', rangeStr: '230 - 239', colorName: 'الشعاع البلاتيني الأسمى', colorHex: '#e2e8f0', colorClass: 'text-white font-black', bgClass: 'bg-slate-900/80', borderClass: 'border-white/70', badgeStyle: 'from-white to-amber-300' },
  { tierNumber: 25, nameAr: 'سيد العارفين (التاج الأبدي 250)', rangeStr: '240 - 250', colorName: 'هالة الفردوس الأسطورية', colorHex: '#f59e0b', colorClass: 'text-amber-300 font-black animate-pulse', bgClass: 'bg-gradient-to-r from-amber-950/70 via-purple-950/60 to-emerald-950/70', borderClass: 'border-amber-400 shadow-xl shadow-amber-500/40', badgeStyle: 'from-amber-300 via-rose-500 to-emerald-400 animate-pulse' },
];

export function getTierForLevel(level: number): TierInfo {
  const boundedLevel = Math.max(1, Math.min(250, level));
  if (boundedLevel >= 240) return TIERS[24];
  const index = Math.floor((boundedLevel - 1) / 10);
  return TIERS[index] || TIERS[0];
}

// XP required per level - smooth curve up to level 250
export function getRequiredXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let l = 2; l <= level; l++) {
    // Level 2 needs 100 XP, Level 10 needs ~1200 XP, Level 100 needs ~28000 XP, Level 250 needs ~95000 XP
    total += Math.round(80 + (l * 12) + (Math.pow(l, 1.25) * 1.8));
  }
  return total;
}

export function getXpForNextLevel(currentLevel: number): number {
  if (currentLevel >= 250) return 0;
  return getRequiredXpForLevel(currentLevel + 1) - getRequiredXpForLevel(currentLevel);
}

export function getLevelProgress(level: number, xp: number): {
  currentInLevel: number;
  neededForNext: number;
  percentage: number;
} {
  if (level >= 250) {
    return { currentInLevel: 100, neededForNext: 100, percentage: 100 };
  }
  const currentLevelXp = getRequiredXpForLevel(level);
  const nextLevelXp = getRequiredXpForLevel(level + 1);
  const diff = Math.max(1, nextLevelXp - currentLevelXp);
  const currentInLevel = Math.max(0, Math.min(diff, xp - currentLevelXp));
  const percentage = Math.min(100, Math.max(0, Math.round((currentInLevel / diff) * 100)));
  return { currentInLevel, neededForNext: diff, percentage };
}

// Luxury cosmetic frames catalogue
export const COSMETIC_FRAMES: CosmeticFrame[] = [
  {
    id: 'frame-none',
    nameAr: 'بدون إطار',
    minLevel: 1,
    cssStyle: 'border-2 border-slate-700',
    borderStyle: 'border-slate-700',
    glowColor: 'transparent',
    description: 'المظهر البسيط الهادئ',
    previewGradient: 'from-slate-800 to-slate-900',
  },
  {
    id: 'frame-emerald-classic',
    nameAr: 'إطار الزمرد الكلاسيكي',
    minLevel: 5,
    cssStyle: 'border-2 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/30',
    borderStyle: 'border-emerald-400',
    glowColor: '#10b981',
    description: 'يُفتح عند ليفل 5 • زمرد مبارك يحاكي رياض الجنة',
    previewGradient: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'frame-golden-fire',
    nameAr: 'إطار شعلة الستريك الذهبية',
    minLevel: 15,
    cssStyle: 'border-2 border-amber-400 ring-4 ring-orange-500/50 shadow-xl shadow-amber-500/40 animate-pulse',
    borderStyle: 'border-amber-400',
    glowColor: '#f59e0b',
    description: 'يُفتح عند ليفل 15 • لهب ناري مذهب للمواظبين على صلاة الجماعة',
    previewGradient: 'from-amber-500 to-orange-700',
  },
  {
    id: 'frame-mihrab-arch',
    nameAr: 'إطار محراب المسجد الجامع',
    minLevel: 30,
    cssStyle: 'border-4 border-cyan-400 ring-2 ring-teal-500 shadow-2xl shadow-cyan-500/40 rounded-3xl',
    borderStyle: 'border-cyan-400',
    glowColor: '#06b6d4',
    description: 'يُفتح عند ليفل 30 • مقتبس من هندسة المحاريب الإسلامية العريقة',
    previewGradient: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'frame-royal-violet',
    nameAr: 'إطار الهالة البنفسجية الملكية',
    minLevel: 50,
    cssStyle: 'border-3 border-purple-400 ring-4 ring-fuchsia-500/50 shadow-2xl shadow-purple-500/50',
    borderStyle: 'border-purple-400',
    glowColor: '#a855f7',
    description: 'يُفتح عند ليفل 50 • هيبة روحانية وسكينة في رومات الأصدقاء',
    previewGradient: 'from-purple-600 to-indigo-800',
  },
  {
    id: 'frame-celestial-stars',
    nameAr: 'إطار نجوم الأسحار المشعة',
    minLevel: 75,
    cssStyle: 'border-4 border-sky-300 ring-4 ring-blue-500 shadow-2xl shadow-sky-400/50',
    borderStyle: 'border-sky-300',
    glowColor: '#38bdf8',
    description: 'يُفتح عند ليفل 75 • ضياء سماوي يحاكي نجوم الليل في السحر',
    previewGradient: 'from-sky-400 to-indigo-700',
  },
  {
    id: 'frame-amber-sun',
    nameAr: 'إطار شمس الكهرمان العظمى',
    minLevel: 100,
    cssStyle: 'border-4 border-yellow-400 ring-4 ring-amber-500 shadow-2xl shadow-amber-400/60 animate-pulse',
    borderStyle: 'border-yellow-400',
    glowColor: '#fbbf24',
    description: 'يُفتح عند ليفل 100 • وسام العبور العظيم للمستوى مائة',
    previewGradient: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'frame-platinum-light',
    nameAr: 'إطار النور البلاتيني السيليستي',
    minLevel: 150,
    cssStyle: 'border-4 border-slate-100 ring-4 ring-cyan-400 shadow-2xl shadow-white/50',
    borderStyle: 'border-white',
    glowColor: '#ffffff',
    description: 'يُفتح عند ليفل 150 • بريق ناصع لا يبلغه إلا الأبطال الثابتون',
    previewGradient: 'from-white to-slate-400',
  },
  {
    id: 'frame-ruby-emperor',
    nameAr: 'إطار الياقوت الإمبراطوري',
    minLevel: 200,
    cssStyle: 'border-4 border-rose-500 ring-4 ring-amber-400 shadow-2xl shadow-rose-500/60 animate-bounce',
    borderStyle: 'border-rose-500',
    glowColor: '#f43f5e',
    description: 'يُفتح عند ليفل 200 • وسام الشرف الرفيع في جماعات الصحبة',
    previewGradient: 'from-rose-500 to-red-700',
  },
  {
    id: 'frame-firdaws-crown',
    nameAr: 'تاج الفردوس الأسطوري (القمة 250)',
    minLevel: 250,
    cssStyle: 'border-4 border-amber-300 ring-4 ring-gradient-to-r ring-rose-500 shadow-2xl shadow-amber-300/80 animate-pulse',
    borderStyle: 'border-amber-300',
    glowColor: '#fbbf24',
    description: 'التاج الأسمى ليفل 250 • أعلى مكافأة في التطبيق بهالة ملكية',
    previewGradient: 'from-amber-300 via-rose-500 to-emerald-400',
  },
];

// Pure Islamic orthodox milestone titles
const MILESTONE_TITLES: { minLvl: number; title: string; reward: string; frameId?: string; avatarUnlock?: string }[] = [
  { minLvl: 1, title: 'المحافظ المبتدئ', reward: 'شارة التأسيس والستريك' },
  { minLvl: 5, title: 'الخطوة المباركة', reward: 'فتح إطار الزمرد الكلاسيكي 🖼️', frameId: 'frame-emerald-classic' },
  { minLvl: 10, title: 'حريص الجماعة', reward: 'توهج أخضر للاسم + فتح أفاتار الهلال 🌙', avatarUnlock: '🌙' },
  { minLvl: 15, title: 'حارس الوقت', reward: 'فتح إطار شعلة الستريك الذهبية 🔥', frameId: 'frame-golden-fire' },
  { minLvl: 20, title: 'عمار المساجد', reward: 'لون فيروزي للاسم + فتح أفاتار المحراب 🕌', avatarUnlock: '🕌' },
  { minLvl: 30, title: 'بطل الفجر في المسجد', reward: 'فتح إطار محراب المسجد الجامع 🏛️', frameId: 'frame-mihrab-arch' },
  { minLvl: 40, title: 'خاشع المحراب', reward: 'لون بنفسجي روحاني للاسم + فتح أفاتار السيف ⚔️', avatarUnlock: '⚔️' },
  { minLvl: 50, title: 'حافظ العهد والفرائض', reward: 'فتح إطار الهالة البنفسجية الملكية 👑', frameId: 'frame-royal-violet' },
  { minLvl: 60, title: 'منار السنن والرواتب', reward: 'لون كهرماني ذهبي + فتح أفاتار المصحف 📖', avatarUnlock: '📖' },
  { minLvl: 75, title: 'صائم وقائم بالأسحار', reward: 'فتح إطار نجوم الأسحار المشعة 🌟', frameId: 'frame-celestial-stars' },
  { minLvl: 90, title: 'السابق بالخيرات', reward: 'هالة الياقوت الإمبراطوري للاسم' },
  { minLvl: 100, title: 'إمام المتقين (ليفل 100)', reward: 'فتح إطار شمس الكهرمان العظمى ☀️ + تاج مذهب', frameId: 'frame-amber-sun', avatarUnlock: '👑' },
  { minLvl: 120, title: 'نور المساجد الساطع', reward: 'لون فيروز سيليستي للاسم + أفاتار النجمة 🌟', avatarUnlock: '🌟' },
  { minLvl: 150, title: 'رفيق الصف الأول', reward: 'فتح إطار النور البلاتيني السيليستي 💎', frameId: 'frame-platinum-light' },
  { minLvl: 180, title: 'لؤلؤة المحراب الطاهرة', reward: 'تأثير لمعان لؤلؤي على صور الأدلة + أفاتار السلام 🕊️', avatarUnlock: '🕊️' },
  { minLvl: 200, title: 'قدوة الصالحين (200)', reward: 'فتح إطار الياقوت الإمبراطوري 💎 + أفاتار الوردة 🌸', frameId: 'frame-ruby-emperor', avatarUnlock: '🌸' },
  { minLvl: 225, title: 'المخلصون الأبرار', reward: 'لون فيروز نيون مشع في كل الرومات' },
  { minLvl: 250, title: 'سيد العارفين (القمة 250)', reward: 'فتح تاج الفردوس الأسطوري 👑 + هالة العرش الأبدي', frameId: 'frame-firdaws-crown', avatarUnlock: '📿' },
];

export function getTitleForLevel(level: number): string {
  let matched = MILESTONE_TITLES[0].title;
  for (const item of MILESTONE_TITLES) {
    if (level >= item.minLvl) {
      matched = item.title;
    }
  }
  return matched;
}

export function getNextRewardDescription(level: number): string {
  if (level >= 250) return 'وصلت لأعلى رتبة ممكنة في التطبيق (ليفل 250) - تاج الفردوس الأبدي!';
  const nextLvl = level + 1;
  const nextItem = MILESTONE_TITLES.find(item => item.minLvl === nextLvl);
  if (nextItem) {
    return `لقب جديد: "${nextItem.title}" + ${nextItem.reward}`;
  }
  const tier = getTierForLevel(nextLvl);
  return `تقدم نحو رتبة (${tier.nameAr})، فتح ألوان وإطارات جديدة، وزيادة مضاعفة صلاة المسجد`;
}

export const ALL_250_LEVELS: LevelMilestone[] = Array.from({ length: 250 }, (_, i) => {
  const lvl = i + 1;
  const tier = getTierForLevel(lvl);
  const title = getTitleForLevel(lvl);
  const requiredXp = getRequiredXpForLevel(lvl);

  let rewardDescription = `ترقية في رتبة ${tier.nameAr}`;
  let unlockedFrameId: string | undefined;
  let unlockedAvatar: string | undefined;

  const exactMilestone = MILESTONE_TITLES.find(b => b.minLvl === lvl);
  if (exactMilestone) {
    rewardDescription = exactMilestone.reward;
    unlockedFrameId = exactMilestone.frameId;
    unlockedAvatar = exactMilestone.avatarUnlock;
  } else if (lvl % 10 === 0) {
    rewardDescription = `تغيير لون وشارة الاسم إلى (${tier.colorName})`;
  }

  return {
    level: lvl,
    requiredXp,
    title,
    tierName: tier.nameAr,
    colorName: tier.colorName,
    colorHex: tier.colorHex,
    colorClass: tier.colorClass,
    rewardDescription,
    badgeIcon: lvl === 250 ? '👑' : lvl >= 200 ? '💎' : lvl >= 100 ? '☀️' : lvl >= 50 ? '🌟' : '✨',
    unlockedFrameId,
    unlockedAvatar,
  };
});

export const LEVEL_UP_QUOTES = [
  '﴿وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ﴾ - خطوة عظيمة نحو رضوان الله ومضاعفة أجر الجماعة!',
  '﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا﴾ - ثباتك في بيوت الله نور في قلبك.',
  '﴿وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ﴾ - مبارك هذا المستوى الجديد! كل ركعة في المسجد تصنع فارقاً عظيماً.',
  'قال رسول الله ﷺ: «صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة». هنيئاً لك التوفيق!',
  '﴿قَدْ أَفْلَحَ الْمُؤْمِنُونَ * الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ﴾ - دامت صلاتك نوراً وبركة.',
  '﴿فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ﴾ - ارتقِ بمستواك ودرجاتك عند رب العالمين.',
  '«وجعلت قرة عيني في الصلاة» - كل خطوة إلى المسجد ترفعك درجة وتحط عنك خطيئة.',
  'استمر يا بطل! أثر سجودك ينير صحيفتك، وصحبتك في الروم فخورة بثباتك.',
];
