export type LocationType = 'mosque' | 'home';

export interface User {
  id: string;
  username: string; // login identifier
  password?: string; // secure device password
  name: string;
  avatar: string;
  level: number; // 1 to 250
  xp: number;
  streak: number; // consecutive days
  longestStreak: number;
  title: string;
  badgeColor: string; // color hex or tailwind class based on level
  city: string;
  joinedRooms: string[]; // room IDs
  prayersCompletedTotal: number;
  nightPrayersTotal: number;
  azkarCompletedTotal: number;
  pinCode?: string; // 4-digit PIN for device security lock
  deviceId?: string; // unique device identifier
  createdAt?: string;
  // Cosmetic unlocks
  equippedFrame?: string; // ID of active avatar frame
  unlockedFrames?: string[];
  unlockedAvatars?: string[];
  // Notification style preference
  notificationStyle?: 'emerald' | 'gold' | 'oled' | 'compact';
  notificationTone?: 'adhan' | 'takbeer' | 'chime';
}

export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type ProofType = 'fard' | 'sunnah' | 'qiyam' | 'task';

export interface PrayerDefinition {
  id: PrayerName;
  nameAr: string;
  icon: string;
  defaultTime: string; // "04:45"
  rakaat: number;
  sunnahBefore?: number;
  sunnahAfter?: number;
  sunnahName?: string;
  rewardHadith: string;
  hadithSource: string;
  homeXpReward: number; // base XP at home (e.g. 50 XP)
  mosqueXpReward: number; // 10X XP at mosque (e.g. 500 XP)
}

export interface PrayerProof {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  userTitle: string;
  proofType: ProofType;
  prayerName?: PrayerName;
  prayerNameAr: string;
  locationType: LocationType;
  photoUrl: string; // base64 or generated snapshot
  timestamp: string; // ISO string
  dateString: string; // YYYY-MM-DD
  verified: boolean;
  xpEarned: number;
  notes?: string;
  location?: string;
  reactions: Record<string, number>; // emoji -> count
}

export interface Room {
  id: string;
  name: string;
  description: string;
  emoji: string;
  creatorId: string;
  inviteCode: string;
  members: RoomMember[];
  createdAt: string;
}

export interface RoomMember {
  userId: string;
  name: string;
  avatar: string;
  level: number;
  title: string;
  streak: number;
  role: 'admin' | 'member';
  equippedFrame?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderLevel: number;
  senderTitle: string;
  senderColor: string;
  senderFrame?: string;
  timestamp: string;
  type: 'text' | 'proof' | 'system';
  content?: string;
  proofData?: {
    prayerNameAr: string;
    photoUrl: string;
    xpEarned: number;
    streak: number;
    proofType?: ProofType;
    locationType?: LocationType;
  };
  reactions?: Record<string, string[]>;
}

export interface DayPrayerRecord {
  date: string; // YYYY-MM-DD
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  sunnahsDone?: string[];
  proofIds: Partial<Record<string, string>>;
  qiyamRakaat?: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
  requiresProof?: boolean;
}

export interface DhikrItem {
  id: string;
  text: string;
  reward: string;
  countTarget: number;
  category: 'morning' | 'evening' | 'post_prayer' | 'tasbih';
}

export interface CosmeticFrame {
  id: string;
  nameAr: string;
  minLevel: number;
  cssStyle: string;
  borderStyle: string;
  glowColor: string;
  description: string;
  previewGradient: string;
}

export interface LevelMilestone {
  level: number;
  requiredXp: number;
  title: string;
  tierName: string;
  colorName: string;
  colorHex: string;
  colorClass: string;
  rewardDescription: string;
  badgeIcon: string;
  unlockedFrameId?: string;
  unlockedAvatar?: string;
}
