import { PrayerDefinition, PrayerName } from '../types';

export const PRAYERS_DATA: PrayerDefinition[] = [
  {
    id: 'fajr',
    nameAr: 'الفجر',
    icon: '🌅',
    defaultTime: '04:48',
    rakaat: 2,
    sunnahBefore: 2,
    sunnahName: 'سنة الفجر القبلية (ركعتان)',
    rewardHadith: 'قال رسول الله ﷺ: «مَن صَلَّى الصُّبْحَ فَهو في ذِمَّةِ اللهِ» وقال ﷺ: «ركعتا الفجر خير من الدنيا وما فيها»',
    hadithSource: 'صحيح مسلم',
    homeXpReward: 150,
    mosqueXpReward: 1500, // 10X multiplier for mosque!
  },
  {
    id: 'dhuhr',
    nameAr: 'الظهر',
    icon: '☀️',
    defaultTime: '12:02',
    rakaat: 4,
    sunnahBefore: 4,
    sunnahAfter: 2,
    sunnahName: 'سنة الظهر (4 قبل و 2 بعد)',
    rewardHadith: 'قال رسول الله ﷺ: «مَن حافَظَ علَى أربَعِ رَكَعاتٍ قَبلَ الظُّهرِ، وأربَعٍ بعدَها، حرَّمَهُ اللَّهُ علَى النَّارِ»',
    hadithSource: 'سنن أبي داود والترمذي',
    homeXpReward: 100,
    mosqueXpReward: 1000, // 10X multiplier for mosque!
  },
  {
    id: 'asr',
    nameAr: 'العصر',
    icon: '🌤️',
    defaultTime: '15:24',
    rakaat: 4,
    sunnahBefore: 4,
    sunnahName: 'سنة العصر القبلية (4 ركعات)',
    rewardHadith: 'قال رسول الله ﷺ: «رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا»',
    hadithSource: 'سنن الترمذي',
    homeXpReward: 100,
    mosqueXpReward: 1000, // 10X multiplier for mosque!
  },
  {
    id: 'maghrib',
    nameAr: 'المغرب',
    icon: '🌇',
    defaultTime: '17:49',
    rakaat: 3,
    sunnahAfter: 2,
    sunnahName: 'سنة المغرب البعدية (ركعتان)',
    rewardHadith: 'عن أنس رضي الله عنه قال: كنا نصلي ركعتين بعد غروب الشمس قبل صلاة المغرب',
    hadithSource: 'صحيح البخاري ومسلم',
    homeXpReward: 100,
    mosqueXpReward: 1000, // 10X multiplier for mosque!
  },
  {
    id: 'isha',
    nameAr: 'العشاء',
    icon: '🌙',
    defaultTime: '19:15',
    rakaat: 4,
    sunnahAfter: 2,
    sunnahName: 'سنة العشاء البعدية (ركعتان) + الشفع والوتر',
    rewardHadith: 'قال رسول الله ﷺ: «مَن صَلَّى العِشَاءَ في جَمَاعَةٍ فَكَأنَّما قَامَ نِصْفَ اللَّيْلِ»',
    hadithSource: 'صحيح مسلم',
    homeXpReward: 100,
    mosqueXpReward: 1000, // 10X multiplier for mosque!
  },
];

export interface SunnahTiming {
  id: string;
  prayerNameAr: string;
  name: string;
  rakaat: number;
  period: string;
  hadith: string;
  homeXpReward: number;
  mosqueXpReward: number;
}

export const SUNNAH_TIMINGS: SunnahTiming[] = [
  {
    id: 'sunnah-fajr',
    prayerNameAr: 'الفجر',
    name: 'سنة الفجر المؤكدة',
    rakaat: 2,
    period: 'قبل أداء فريضة الفجر',
    hadith: '«ركعتا الفجر خير من الدنيا وما فيها»',
    homeXpReward: 50,
    mosqueXpReward: 500, // 10X
  },
  {
    id: 'sunnah-duha',
    prayerNameAr: 'الضحى',
    name: 'صلاة الضحى (صلاة الأوابين)',
    rakaat: 2,
    period: 'من بعد شروق الشمس بربع ساعة حتى قبل الظهر',
    hadith: '«يصبح على كل سلامى من أحدكم صدقة... ويجزئ من ذلك ركعتان يركعهما من الضحى»',
    homeXpReward: 50,
    mosqueXpReward: 500, // 10X
  },
  {
    id: 'sunnah-dhuhr-pre',
    prayerNameAr: 'الظهر',
    name: 'سنة الظهر القبلية',
    rakaat: 4,
    period: 'بعد أذان الظهر وقبل الفريضة',
    hadith: '«أربع ركعات قبل الظهر ليس فيهن تسليم تفتح لهن أبواب السماء»',
    homeXpReward: 60,
    mosqueXpReward: 600, // 10X
  },
  {
    id: 'sunnah-dhuhr-post',
    prayerNameAr: 'الظهر',
    name: 'سنة الظهر البعدية',
    rakaat: 2,
    period: 'عقب أداء فريضة الظهر',
    hadith: '«من صلى قبل الظهر أربعاً وبعدها ركعتين بنى الله له بيتاً في الجنة»',
    homeXpReward: 50,
    mosqueXpReward: 500, // 10X
  },
  {
    id: 'sunnah-maghrib-post',
    prayerNameAr: 'المغرب',
    name: 'سنة المغرب البعدية',
    rakaat: 2,
    period: 'عقب أداء فريضة المغرب',
    hadith: 'من السنن الرواتب المؤكدة التي واظب عليها النبي ﷺ',
    homeXpReward: 50,
    mosqueXpReward: 500, // 10X
  },
  {
    id: 'sunnah-isha-post',
    prayerNameAr: 'العشاء',
    name: 'سنة العشاء البعدية والوتر',
    rakaat: 2,
    period: 'عقب أداء فريضة العشاء',
    hadith: 'تكملة للسنن الرواتب الاثنتي عشرة ركعة في اليوم والليلة',
    homeXpReward: 60,
    mosqueXpReward: 600, // 10X
  },
];

export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function formatPrayerTimeAr(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? 'م' : 'ص';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${period}`;
}

export function getCurrentAndNextPrayer(customNowDate?: Date): {
  currentPrayer: PrayerDefinition;
  nextPrayer: PrayerDefinition;
  isQiyamTime: boolean;
  minutesToNext: number;
} {
  const now = customNowDate || new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const fajrMin = timeToMinutes(PRAYERS_DATA[0].defaultTime);
  const dhuhrMin = timeToMinutes(PRAYERS_DATA[1].defaultTime);
  const asrMin = timeToMinutes(PRAYERS_DATA[2].defaultTime);
  const maghribMin = timeToMinutes(PRAYERS_DATA[3].defaultTime);
  const ishaMin = timeToMinutes(PRAYERS_DATA[4].defaultTime);

  let currentPrayer = PRAYERS_DATA[4];
  let nextPrayer = PRAYERS_DATA[0];
  let minutesToNext = 0;

  if (currentMinutes < fajrMin) {
    currentPrayer = PRAYERS_DATA[4];
    nextPrayer = PRAYERS_DATA[0];
    minutesToNext = fajrMin - currentMinutes;
  } else if (currentMinutes < dhuhrMin) {
    currentPrayer = PRAYERS_DATA[0];
    nextPrayer = PRAYERS_DATA[1];
    minutesToNext = dhuhrMin - currentMinutes;
  } else if (currentMinutes < asrMin) {
    currentPrayer = PRAYERS_DATA[1];
    nextPrayer = PRAYERS_DATA[2];
    minutesToNext = asrMin - currentMinutes;
  } else if (currentMinutes < maghribMin) {
    currentPrayer = PRAYERS_DATA[2];
    nextPrayer = PRAYERS_DATA[3];
    minutesToNext = maghribMin - currentMinutes;
  } else if (currentMinutes < ishaMin) {
    currentPrayer = PRAYERS_DATA[3];
    nextPrayer = PRAYERS_DATA[4];
    minutesToNext = ishaMin - currentMinutes;
  } else {
    currentPrayer = PRAYERS_DATA[4];
    nextPrayer = PRAYERS_DATA[0];
    minutesToNext = (24 * 60 - currentMinutes) + fajrMin;
  }

  const isQiyamTime = currentMinutes >= ishaMin || currentMinutes < fajrMin;

  return {
    currentPrayer,
    nextPrayer,
    isQiyamTime,
    minutesToNext,
  };
}
