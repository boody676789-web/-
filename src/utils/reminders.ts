import { sound } from './sound';

export interface ReminderConfig {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  qiyam: boolean;
  sunan: boolean;
  azkar: boolean;
  timing: 'exact' | 'early_15' | 'late_proof_10';
  soundEnabled: boolean;
  vibrateEnabled: boolean;
}

const REMINDER_STORAGE_KEY = 'salah_reminders_settings_v1';

export const DEFAULT_REMINDERS: ReminderConfig = {
  fajr: true,
  dhuhr: true,
  asr: true,
  maghrib: true,
  isha: true,
  qiyam: true,
  sunan: true,
  azkar: true,
  timing: 'exact',
  soundEnabled: true,
  vibrateEnabled: true,
};

export const RemindersAPI = {
  getConfig(): ReminderConfig {
    const raw = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (!raw) return DEFAULT_REMINDERS;
    try {
      return { ...DEFAULT_REMINDERS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_REMINDERS;
    }
  },

  saveConfig(config: ReminderConfig): void {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(config));
  },

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    try {
      const res = await Notification.requestPermission();
      return res === 'granted';
    } catch {
      return false;
    }
  },

  sendNotification(title: string, body: string, icon = '/icon.svg'): void {
    const config = this.getConfig();

    // Play synthesized notification ping
    if (config.soundEnabled) {
      sound.playRoomPing();
    }

    // Trigger vibration if supported
    if (config.vibrateEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200]);
      } catch {
        // ignore
      }
    }

    // Browser Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon,
          badge: icon,
          dir: 'rtl',
          lang: 'ar',
        });
      } catch {
        // ignore
      }
    }
  },
};
