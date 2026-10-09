import { User, Room, ChatMessage, PrayerProof, DayPrayerRecord, DailyChallenge, DhikrItem, PrayerName, LocationType } from '../types';
import { getTitleForLevel, getTierForLevel } from './levels';

const STORAGE_KEYS = {
  CURRENT_USER: 'salah_active_user_v3',
  REGISTERED_ACCOUNTS: 'salah_registered_accounts_v3',
  ROOMS: 'salah_rooms_v3',
  MESSAGES: 'salah_messages_v3',
  PROOFS: 'salah_proofs_v3',
  CALENDAR: 'salah_calendar_v3',
  CHALLENGES: 'salah_challenges_v3',
};

export const SAMPLE_PROOF_IMAGES = [
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
];

// Seed rooms available to discover or join via code - with pure dignified Islamic names and righteous companions
export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-fajr-squad',
    name: 'شلة الفجر في المسجد 🌅',
    description: 'روم الصحبة للتأكيد على صلاة الفجر في المسجد والجماعة ونيل الـ 10 أضعاف.',
    emoji: '🌅',
    creatorId: 'user-abdullah',
    inviteCode: 'FAJR2026',
    members: [
      { userId: 'u-1', name: 'عبد الله المحافظ', avatar: '🕌', level: 45, title: 'خاشع المحراب', streak: 45, role: 'admin', equippedFrame: 'frame-mihrab-arch' },
      { userId: 'u-2', name: 'أنس بن مالك', avatar: '🌅', level: 32, title: 'بطل الفجر في المسجد', streak: 32, role: 'member', equippedFrame: 'frame-golden-fire' },
      { userId: 'u-3', name: 'بلال بن رباح', avatar: '👑', level: 50, title: 'حافظ العهد والفرائض', streak: 50, role: 'member', equippedFrame: 'frame-royal-violet' },
      { userId: 'u-4', name: 'عبد الرحمن الصالح', avatar: '📿', level: 24, title: 'عمار المساجد', streak: 24, role: 'member', equippedFrame: 'frame-emerald-classic' },
    ],
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 'room-fursan',
    name: 'فرسان المحراب والسنن ⚔️',
    description: 'تحدي الصلوات الخمس في بيوت الله ومنافسة الـ 250 مستوى بإثباتات حية.',
    emoji: '⚔️',
    creatorId: 'user-omar',
    inviteCode: 'FURSAN250',
    members: [
      { userId: 'u-5', name: 'عمر الفاروق', avatar: '⚔️', level: 65, title: 'منار السنن والرواتب', streak: 65, role: 'admin', equippedFrame: 'frame-celestial-stars' },
      { userId: 'u-6', name: 'يوسف الصديق', avatar: '🌟', level: 48, title: 'خاشع المحراب', streak: 48, role: 'member', equippedFrame: 'frame-royal-violet' },
      { userId: 'u-7', name: 'معاذ بن جبل', avatar: '📖', level: 55, title: 'حافظ العهد والفرائض', streak: 55, role: 'member', equippedFrame: 'frame-royal-violet' },
      { userId: 'u-8', name: 'حمزة بن عبد المطلب', avatar: '🕊️', level: 75, title: 'صائم وقائم بالأسحار', streak: 75, role: 'member', equippedFrame: 'frame-celestial-stars' },
    ],
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'room-saff-awwal',
    name: 'صحبة رواد الصف الأول 🕌',
    description: 'التنافس الشريف على تكبيرة الإحرام والصف الأول في صلوات الجماعة الخمس.',
    emoji: '🕌',
    creatorId: 'user-musab',
    inviteCode: 'SAFF1',
    members: [
      { userId: 'u-9', name: 'مصعب بن عمير', avatar: '🕌', level: 38, title: 'بطل الفجر في المسجد', streak: 38, role: 'admin', equippedFrame: 'frame-golden-fire' },
      { userId: 'u-10', name: 'سعد بن معاذ', avatar: '🌙', level: 42, title: 'خاشع المحراب', streak: 42, role: 'member', equippedFrame: 'frame-royal-violet' },
      { userId: 'u-11', name: 'خديجة أم المؤمنين', avatar: '✨', level: 85, title: 'نور على نور', streak: 85, role: 'member', equippedFrame: 'frame-amber-sun' },
      { userId: 'u-12', name: 'فاطمة الزهراء', avatar: '🌸', level: 60, title: 'منار السنن والرواتب', streak: 60, role: 'member', equippedFrame: 'frame-celestial-stars' },
    ],
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-msg-1',
    roomId: 'room-fajr-squad',
    senderId: 'u-1',
    senderName: 'عبد الله المحافظ',
    senderAvatar: '🕌',
    senderLevel: 45,
    senderTitle: 'خاشع المحراب',
    senderColor: '#a855f7',
    senderFrame: 'frame-mihrab-arch',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: 'text',
    content: 'تقبل الله صلاتكم جميعاً يا إخواني، ما شاء الله على الثبات في المسجد لنيل مضاعفة الـ 10 أضعاف! 🕌',
  },
  {
    id: 'seed-msg-2',
    roomId: 'room-fajr-squad',
    senderId: 'u-2',
    senderName: 'أنس بن مالك',
    senderAvatar: '🌅',
    senderLevel: 32,
    senderTitle: 'بطل الفجر في المسجد',
    senderColor: '#3b82f6',
    senderFrame: 'frame-golden-fire',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: 'text',
    content: 'الحمد لله الذي بنعمته تتم الصالحات، ركعتا الفجر خير من الدنيا وما فيها 🤲',
  },
  {
    id: 'seed-msg-3',
    roomId: 'room-fursan',
    senderId: 'u-5',
    senderName: 'عمر الفاروق',
    senderAvatar: '⚔️',
    senderLevel: 65,
    senderTitle: 'منار السنن والرواتب',
    senderColor: '#f59e0b',
    senderFrame: 'frame-celestial-stars',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: 'text',
    content: 'يا فرسان المحراب، من توضأ في بيته ثم خرج إلى المسجد لأداء الفريضة، فأجره كأجر الحاج المحرم! استعدوا للصلوات الخمس. ⚔️',
  },
];

// Seed Daily Challenges with enhanced XP for mosque focus
export const SEED_CHALLENGES: DailyChallenge[] = [
  {
    id: 'ch-prayer-proof',
    title: 'توثيق صلاة في المسجد (10X)',
    description: 'التقط دليلك لصلاة الجماعة في المسجد ونيل مضاعفة الـ 1,000 XP إلى 1,500 XP',
    xpReward: 60,
    icon: '🕌',
    progress: 0,
    target: 1,
    completed: false,
    requiresProof: true,
  },
  {
    id: 'ch-sunnah-proof',
    title: 'توثيق ركعتي سنة الرواتب أو الضحى',
    description: 'صوِّر سجادتك أو في المسجد لأداء ركعتين نافلة بالدليل الحي',
    xpReward: 40,
    icon: '📸',
    progress: 0,
    target: 1,
    completed: false,
    requiresProof: true,
  },
  {
    id: 'ch-qiyam-proof',
    title: 'إثبات قيام الليل بالصورة',
    description: 'صوّر سجادتك لركعتين في جوف الليل بالسحر',
    xpReward: 50,
    icon: '🌙',
    progress: 0,
    target: 1,
    completed: false,
    requiresProof: true,
  },
  {
    id: 'ch-tasbih-easy',
    title: 'تسبيح وذكر الله 33 مرة',
    description: 'ردد (سبحان الله وبحمده) في المسبحة الذكية',
    xpReward: 20,
    icon: '📿',
    progress: 0,
    target: 33,
    completed: false,
  },
  {
    id: 'ch-room-cheer',
    title: 'تشجيع صديق في الروم',
    description: 'تفاعل بـ (ما شاء الله أو دعاء) على إثبات أحد أصدقائك في الروم',
    xpReward: 20,
    icon: '💬',
    progress: 0,
    target: 1,
    completed: false,
  },
];

// Seed Dhikr Library
export const SEED_DHIKR: DhikrItem[] = [
  {
    id: 'dhikr-subhanallah',
    text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    reward: 'من قالها مائة مرة حُطَّت خطاياه وإن كانت مثل زبد البحر',
    countTarget: 100,
    category: 'morning',
  },
  {
    id: 'dhikr-astaghfirullah',
    text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    reward: 'ممحاة للذنوب ومجلبة للرزق والبركة وانشراح الصدر',
    countTarget: 100,
    category: 'morning',
  },
  {
    id: 'dhikr-salawat',
    text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    reward: 'من صلى عليّ صلاة صلى الله عليه بها عشراً',
    countTarget: 10,
    category: 'post_prayer',
  },
  {
    id: 'dhikr-ayat-kursi',
    text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ... (آية الكرسي)',
    reward: 'من قرأها دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا الموت',
    countTarget: 1,
    category: 'post_prayer',
  },
  {
    id: 'dhikr-tasbih-fatima',
    text: 'سُبْحَانَ اللَّهِ (33) ، الحَمْدُ لِلَّهِ (33) ، اللَّهُ أَكْبَرُ (33)',
    reward: 'تمام المائة: لا إله إلا الله وحده لا شريك له',
    countTarget: 33,
    category: 'tasbih',
  },
  {
    id: 'dhikr-la-hawla',
    text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    reward: 'كنز من كنوز الجنة ودواء لتسعة وتسعين داء أيسرها الهم',
    countTarget: 50,
    category: 'evening',
  },
];

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// STORAGE API
export const StorageAPI = {
  // Returns currently logged in user, or NULL if no session (never auto-logins to someone else)
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    try {
      const parsed: User = JSON.parse(raw);
      parsed.title = getTitleForLevel(parsed.level);
      parsed.badgeColor = getTierForLevel(parsed.level).colorHex;
      return parsed;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return;
    }
    user.title = getTitleForLevel(user.level);
    user.badgeColor = getTierForLevel(user.level).colorHex;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    // Also update in registered accounts
    const all = this.getRegisteredAccounts();
    const idx = all.findIndex(u => u.username.toLowerCase() === user.username.toLowerCase());
    if (idx >= 0) {
      all[idx] = user;
    } else {
      all.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.REGISTERED_ACCOUNTS, JSON.stringify(all));
  },

  getRegisteredAccounts(): User[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_ACCOUNTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  // Register brand new user strictly starting from ZERO FOR EVERYTHING
  registerNewUser(params: {
    username: string;
    password?: string;
    name: string;
    avatar: string;
    city: string;
  }): User {
    const cleanUsername = params.username.trim().toLowerCase();
    const accounts = this.getRegisteredAccounts();
    const exists = accounts.find(a => a.username.toLowerCase() === cleanUsername);
    if (exists) {
      throw new Error('اسم المستخدم مسجل بالفعل، يرجى اختيار اسم آخر أو تسجيل الدخول.');
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      username: cleanUsername,
      password: params.password?.trim() || '',
      name: params.name.trim(),
      avatar: params.avatar,
      level: 1, // STARTS FROM 1
      xp: 0,    // STRICTLY 0 XP
      streak: 0, // STRICTLY 0 STREAK
      longestStreak: 0,
      title: 'المحافظ المبتدئ',
      badgeColor: '#10b981',
      city: params.city,
      joinedRooms: [], // STRICTLY 0 ROOMS
      prayersCompletedTotal: 0, // STRICTLY 0 PRAYERS
      nightPrayersTotal: 0,     // STRICTLY 0 NIGHT PRAYERS
      azkarCompletedTotal: 0,   // STRICTLY 0 AZKAR
      deviceId: 'DEV-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      equippedFrame: 'frame-none',
      unlockedFrames: ['frame-none'],
      unlockedAvatars: [params.avatar],
      notificationStyle: 'emerald',
      notificationTone: 'adhan',
    };

    // Save as current user
    this.setCurrentUser(newUser);

    // Initialize fresh empty today record for this specific user
    const today = getTodayKey();
    const emptyCal: Record<string, DayPrayerRecord> = {
      [today]: {
        date: today,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        sunnahsDone: [],
        proofIds: {},
        qiyamRakaat: 0,
      },
    };
    this.saveCalendar(emptyCal, newUser.id);

    return newUser;
  },

  // Login existing user with username and password
  loginUser(username: string, password?: string): User {
    const cleanUsername = username.trim().toLowerCase();
    const accounts = this.getRegisteredAccounts();
    const found = accounts.find(a => a.username.toLowerCase() === cleanUsername);
    if (!found) {
      throw new Error('اسم المستخدم غير مسجل، يرجى إنشاء حساب جديد أولاً.');
    }
    if (found.password && found.password !== password?.trim()) {
      throw new Error('كلمة المرور غير صحيحة، يرجى التأكد وإعادة المحاولة.');
    }
    this.setCurrentUser(found);
    return found;
  },

  logoutUser(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getRooms(): Room[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(INITIAL_ROOMS));
      return INITIAL_ROOMS;
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.length > 0 ? parsed : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  },

  saveRooms(rooms: Room[]): void {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  },

  getMessages(roomId?: string): ChatMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    let msgs: ChatMessage[] = [];
    if (raw) {
      try {
        msgs = JSON.parse(raw);
      } catch {
        msgs = INITIAL_MESSAGES;
      }
    } else {
      msgs = INITIAL_MESSAGES;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
    }
    return roomId ? msgs.filter(m => m.roomId === roomId) : msgs;
  },

  saveMessages(msgs: ChatMessage[]): void {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(msgs));
  },

  addMessage(msg: ChatMessage): void {
    const all = this.getMessages();
    all.push(msg);
    this.saveMessages(all);
  },

  getCalendar(userId?: string): Record<string, DayPrayerRecord> {
    const activeUserId = userId || this.getCurrentUser()?.id || 'guest';
    const key = `${STORAGE_KEYS.CALENDAR}_${activeUserId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  saveCalendar(calendar: Record<string, DayPrayerRecord>, userId?: string): void {
    const activeUserId = userId || this.getCurrentUser()?.id || 'guest';
    const key = `${STORAGE_KEYS.CALENDAR}_${activeUserId}`;
    localStorage.setItem(key, JSON.stringify(calendar));
  },

  getTodayRecord(userId?: string): DayPrayerRecord {
    const cal = this.getCalendar(userId);
    const todayKey = getTodayKey();
    if (!cal[todayKey]) {
      cal[todayKey] = {
        date: todayKey,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        sunnahsDone: [],
        proofIds: {},
        qiyamRakaat: 0,
      };
      this.saveCalendar(cal, userId);
    }
    return cal[todayKey];
  },

  markPrayerCompleted(prayerName: PrayerName, proofId: string, userId?: string): DayPrayerRecord {
    const cal = this.getCalendar(userId);
    const todayKey = getTodayKey();
    if (!cal[todayKey]) {
      cal[todayKey] = {
        date: todayKey,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        sunnahsDone: [],
        proofIds: {},
        qiyamRakaat: 0,
      };
    }
    cal[todayKey].prayers[prayerName] = true;
    cal[todayKey].proofIds[prayerName] = proofId;
    this.saveCalendar(cal, userId);
    return cal[todayKey];
  },

  markSunnahCompleted(sunnahId: string, proofId: string, userId?: string): DayPrayerRecord {
    const cal = this.getCalendar(userId);
    const todayKey = getTodayKey();
    if (!cal[todayKey]) {
      cal[todayKey] = {
        date: todayKey,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        sunnahsDone: [],
        proofIds: {},
        qiyamRakaat: 0,
      };
    }
    if (!cal[todayKey].sunnahsDone) cal[todayKey].sunnahsDone = [];
    if (!cal[todayKey].sunnahsDone.includes(sunnahId)) {
      cal[todayKey].sunnahsDone.push(sunnahId);
    }
    cal[todayKey].proofIds[sunnahId] = proofId;
    this.saveCalendar(cal, userId);
    return cal[todayKey];
  },

  addQiyamRakaat(count: number, userId?: string): number {
    const cal = this.getCalendar(userId);
    const todayKey = getTodayKey();
    if (!cal[todayKey]) {
      cal[todayKey] = {
        date: todayKey,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
        sunnahsDone: [],
        proofIds: {},
        qiyamRakaat: 0,
      };
    }
    cal[todayKey].qiyamRakaat = (cal[todayKey].qiyamRakaat || 0) + count;
    this.saveCalendar(cal, userId);
    return cal[todayKey].qiyamRakaat;
  },

  getChallenges(): DailyChallenge[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(SEED_CHALLENGES));
      return SEED_CHALLENGES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_CHALLENGES;
    }
  },

  saveChallenges(challenges: DailyChallenge[]): void {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },

  // Proofs Gallery Storage - user isolated
  getSavedProofs(userId?: string): PrayerProof[] {
    const activeUserId = userId || this.getCurrentUser()?.id || 'guest';
    const key = `${STORAGE_KEYS.PROOFS}_${activeUserId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveProof(proof: PrayerProof, userId?: string): void {
    const all = this.getSavedProofs(userId);
    all.unshift(proof);
    const activeUserId = userId || this.getCurrentUser()?.id || 'guest';
    const key = `${STORAGE_KEYS.PROOFS}_${activeUserId}`;
    localStorage.setItem(key, JSON.stringify(all));
  },
};
