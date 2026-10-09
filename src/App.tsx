import React, { useState, useEffect } from 'react';
import { User, Room, ChatMessage, PrayerDefinition, DayPrayerRecord, DailyChallenge, PrayerName, ProofType, LocationType, PrayerProof } from './types';
import { StorageAPI, SAMPLE_PROOF_IMAGES } from './utils/storage';
import { PRAYERS_DATA, getCurrentAndNextPrayer, SunnahTiming } from './utils/prayerTimes';
import { getRequiredXpForLevel, getTierForLevel, getTitleForLevel } from './utils/levels';
import { sound } from './utils/sound';

import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { PrayersTab } from './components/PrayersTab';
import { RoomsTab } from './components/RoomsTab';
import { CalendarTab } from './components/CalendarTab';
import { AzkarAndChallengesTab } from './components/AzkarAndChallengesTab';
import { ProfileTab } from './components/ProfileTab';
import { AuthScreen } from './components/AuthScreen';

import { LiveCameraModal, CameraTargetInfo } from './components/LiveCameraModal';
import { LevelPathModal } from './components/LevelPathModal';
import { LevelUpCelebrationModal } from './components/LevelUpCelebrationModal';
import { PostPrayerModal } from './components/PostPrayerModal';
import { RemindersModal } from './components/RemindersModal';
import { WidgetsModal } from './components/WidgetsModal';
import { ApkInstallModal } from './components/ApkInstallModal';
import { PinLockScreen } from './components/PinLockScreen';
import { AchievementShareModal } from './components/AchievementShareModal';
import { CosmeticsModal } from './components/CosmeticsModal';

export default function App() {
  // State: user is NULL on first launch so AuthScreen is shown directly (starts from zero)
  const [user, setUser] = useState<User | null>(() => StorageAPI.getCurrentUser());
  const [rooms, setRooms] = useState<Room[]>(() => StorageAPI.getRooms());
  const [messages, setMessages] = useState<ChatMessage[]>(() => StorageAPI.getMessages());
  const [todayRecord, setTodayRecord] = useState<DayPrayerRecord>(() =>
    StorageAPI.getTodayRecord(StorageAPI.getCurrentUser()?.id)
  );
  const [calendarData, setCalendarData] = useState(() =>
    StorageAPI.getCalendar(StorageAPI.getCurrentUser()?.id)
  );
  const [challenges, setChallenges] = useState<DailyChallenge[]>(() => StorageAPI.getChallenges());
  const [completedSunnahs, setCompletedSunnahs] = useState<string[]>([]);

  // Device Lock State
  const [isPinLocked, setIsPinLocked] = useState<boolean>(() => !!StorageAPI.getCurrentUser()?.pinCode);

  // Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('prayers');

  // Modals & Camera Target
  const [cameraTarget, setCameraTarget] = useState<CameraTargetInfo | null>(null);
  const [isLevelPathOpen, setIsLevelPathOpen] = useState(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isApkInstallOpen, setIsApkInstallOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCosmeticsOpen, setIsCosmeticsOpen] = useState(false);
  const [celebrationLevel, setCelebrationLevel] = useState<number | null>(null);
  const [postPrayerData, setPostPrayerData] = useState<{
    prayer: PrayerDefinition;
    actualXp: number;
    locationType: LocationType;
  } | null>(null);

  // Check Qiyam time status
  const { isQiyamTime } = getCurrentAndNextPrayer();

  // Listen for invite link in URL hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('invite=')) {
      const code = hash.split('invite=')[1];
      if (code && user) {
        handleJoinRoom(code.toUpperCase());
      }
    }
  }, [user]);

  // Update User Handler
  const handleUpdateUser = (updatedUser: User) => {
    StorageAPI.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  // Logout Handler - returns to AuthScreen
  const handleLogout = () => {
    sound.playTick();
    StorageAPI.logoutUser();
    setUser(null);
  };

  // Equip Frame & Avatar
  const handleEquipFrame = (frameId: string) => {
    if (!user) return;
    const updated = { ...user, equippedFrame: frameId };
    handleUpdateUser(updated);
  };

  const handleEquipAvatar = (avatar: string) => {
    if (!user) return;
    const updated = { ...user, avatar };
    handleUpdateUser(updated);
  };

  // Lock / Unlock Handlers
  const handleLockApp = () => {
    sound.playTick();
    setIsPinLocked(true);
  };

  const handleUnlockApp = () => {
    setIsPinLocked(false);
  };

  // XP & Level update helper for 250 levels
  const addXpAndCheckLevel = (currentU: User, xpToAdd: number): { updatedUser: User; leveledUp: boolean; newLvl: number } => {
    const newXp = currentU.xp + xpToAdd;
    let newLevel = currentU.level;

    for (let l = currentU.level + 1; l <= 250; l++) {
      if (newXp >= getRequiredXpForLevel(l)) {
        newLevel = l;
      } else {
        break;
      }
    }

    const leveledUp = newLevel > currentU.level;
    const tier = getTierForLevel(newLevel);
    const title = getTitleForLevel(newLevel);

    const updatedUser: User = {
      ...currentU,
      xp: newXp,
      level: newLevel,
      title: title,
      badgeColor: tier.colorHex,
    };

    return { updatedUser, leveledUp, newLvl: newLevel };
  };

  // Unified Proof Captured Handler (with 10X Mosque XP multiplier)
  const handleProofCaptured = ({
    photoUrl,
    target,
    locationType,
    actualXp,
    selectedRoomIds,
  }: {
    photoUrl: string;
    target: CameraTargetInfo;
    locationType: LocationType;
    actualXp: number;
    selectedRoomIds: string[];
  }) => {
    if (!user) return;
    const proofId = `proof-${Date.now()}`;

    // 1. Process specific proof type
    if (target.proofType === 'fard' && target.prayer) {
      const updatedToday = StorageAPI.markPrayerCompleted(target.prayer.id, proofId, user.id);
      setTodayRecord({ ...updatedToday });
      setCalendarData(StorageAPI.getCalendar(user.id));
    } else if (target.proofType === 'sunnah' && target.sunnahId) {
      setCompletedSunnahs(prev => [...prev, target.sunnahId!]);
    } else if (target.proofType === 'qiyam') {
      const rakaat = target.qiyamRakaat || 2;
      StorageAPI.addQiyamRakaat(rakaat, user.id);
      setCalendarData(StorageAPI.getCalendar(user.id));
    } else if (target.proofType === 'task' && target.taskId) {
      const updatedChallenges = challenges.map(c =>
        c.id === target.taskId ? { ...c, completed: true, progress: c.target } : c
      );
      StorageAPI.saveChallenges(updatedChallenges);
      setChallenges(updatedChallenges);
    }

    // 2. Add XP (with 10X if mosque) and check Level up
    const { updatedUser, leveledUp, newLvl } = addXpAndCheckLevel(user, actualXp);
    const finalUser: User = {
      ...updatedUser,
      streak: target.proofType === 'fard' ? user.streak + 1 : user.streak,
      longestStreak: target.proofType === 'fard' ? Math.max(user.longestStreak, user.streak + 1) : user.longestStreak,
      prayersCompletedTotal: target.proofType === 'fard' ? user.prayersCompletedTotal + 1 : user.prayersCompletedTotal,
      nightPrayersTotal: target.proofType === 'qiyam' ? user.nightPrayersTotal + (target.qiyamRakaat || 2) : user.nightPrayersTotal,
    };

    StorageAPI.setCurrentUser(finalUser);
    setUser(finalUser);

    // Save proof to user personal storage archive
    const newProof: PrayerProof = {
      id: proofId,
      userId: finalUser.id,
      userName: finalUser.name,
      userAvatar: finalUser.avatar,
      userLevel: finalUser.level,
      userTitle: finalUser.title,
      proofType: target.proofType,
      prayerName: target.prayer?.id,
      prayerNameAr: target.titleAr,
      locationType,
      photoUrl,
      timestamp: new Date().toISOString(),
      dateString: new Date().toISOString().split('T')[0],
      verified: true,
      xpEarned: actualXp,
      reactions: {},
    };
    StorageAPI.saveProof(newProof, finalUser.id);

    // 3. Broadcast verified proof to selected rooms
    selectedRoomIds.forEach(roomId => {
      const proofMsg: ChatMessage = {
        id: `msg-${Date.now()}-${roomId}`,
        roomId,
        senderId: finalUser.id,
        senderName: finalUser.name,
        senderAvatar: finalUser.avatar,
        senderLevel: finalUser.level,
        senderTitle: finalUser.title,
        senderColor: finalUser.badgeColor,
        senderFrame: finalUser.equippedFrame,
        timestamp: new Date().toISOString(),
        type: 'proof',
        proofData: {
          prayerNameAr: target.titleAr,
          photoUrl,
          xpEarned: actualXp,
          streak: finalUser.streak,
          proofType: target.proofType,
          locationType,
        },
        reactions: {},
      };
      StorageAPI.addMessage(proofMsg);
    });
    setMessages(StorageAPI.getMessages());

    // 4. Close camera
    setCameraTarget(null);

    // 5. Celebration
    if (leveledUp) {
      setCelebrationLevel(newLvl);
    } else if (target.proofType === 'fard' && target.prayer) {
      setPostPrayerData({
        prayer: target.prayer,
        actualXp,
        locationType,
      });
    } else {
      sound.playPrayerAccepted();
    }
  };

  // Chat message sender
  const handleSendMessage = (roomId: string, content: string) => {
    if (!user) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      senderLevel: user.level,
      senderTitle: user.title,
      senderColor: user.badgeColor,
      senderFrame: user.equippedFrame,
      timestamp: new Date().toISOString(),
      type: 'text',
      content,
    };
    StorageAPI.addMessage(newMsg);
    setMessages(StorageAPI.getMessages());

    setChallenges(prev => {
      const next = prev.map(ch => {
        if (ch.id === 'ch-room-cheer' && !ch.completed) {
          return { ...ch, progress: Math.min(ch.target, ch.progress + 1) };
        }
        return ch;
      });
      StorageAPI.saveChallenges(next);
      return next;
    });
  };

  // Reactions
  const handleReactMessage = (messageId: string, emoji: string) => {
    if (!user) return;
    sound.playTick();
    const all = StorageAPI.getMessages();
    const msg = all.find(m => m.id === messageId);
    if (!msg) return;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[emoji]) msg.reactions[emoji] = [];

    const existingIndex = msg.reactions[emoji].indexOf(user.id);
    if (existingIndex >= 0) {
      msg.reactions[emoji].splice(existingIndex, 1);
      if (msg.reactions[emoji].length === 0) {
        delete msg.reactions[emoji];
      }
    } else {
      msg.reactions[emoji].push(user.id);
    }

    StorageAPI.saveMessages(all);
    setMessages([...all]);
  };

  // Create room
  const handleCreateRoom = (name: string, description: string, emoji: string) => {
    if (!user) return;
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name,
      description,
      emoji: emoji || '🕌',
      creatorId: user.id,
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      members: [
        {
          userId: user.id,
          name: user.name,
          avatar: user.avatar,
          level: user.level,
          title: user.title,
          streak: user.streak,
          role: 'admin',
          equippedFrame: user.equippedFrame,
        },
      ],
      createdAt: new Date().toISOString(),
    };

    const updatedRooms = [...rooms, newRoom];
    StorageAPI.saveRooms(updatedRooms);
    setRooms(updatedRooms);

    const updatedUser: User = {
      ...user,
      joinedRooms: [...user.joinedRooms, newRoom.id],
    };
    StorageAPI.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  // Join room
  const handleJoinRoom = (inviteCode: string) => {
    if (!user) return;
    const targetRoom = rooms.find(r => r.inviteCode === inviteCode);
    if (!targetRoom) {
      throw new Error('كود الروم غير موجود');
    }
    const alreadyMember = targetRoom.members.some(m => m.userId === user.id);
    if (alreadyMember) return;

    targetRoom.members.push({
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      level: user.level,
      title: user.title,
      streak: user.streak,
      role: 'member',
      equippedFrame: user.equippedFrame,
    });

    StorageAPI.saveRooms(rooms);
    setRooms([...rooms]);

    if (!user.joinedRooms.includes(targetRoom.id)) {
      const updatedUser = {
        ...user,
        joinedRooms: [...user.joinedRooms, targetRoom.id],
      };
      StorageAPI.setCurrentUser(updatedUser);
      setUser(updatedUser);
    }
  };

  // Leave room
  const handleLeaveRoom = (roomId: string) => {
    if (!user) return;
    sound.playTick();

    // Remove user from room members
    const updatedRooms = rooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          members: r.members.filter(m => m.userId !== user.id),
        };
      }
      return r;
    });
    StorageAPI.saveRooms(updatedRooms);
    setRooms(updatedRooms);

    // Remove room ID from user's joinedRooms
    const updatedUser = {
      ...user,
      joinedRooms: user.joinedRooms.filter(id => id !== roomId),
    };
    StorageAPI.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  // Trigger Camera for Fard (with 10X mosque multiplier)
  const handleOpenLiveCameraForFard = (prayer: PrayerDefinition) => {
    setCameraTarget({
      titleAr: `صلاة ${prayer.nameAr}`,
      subtitleAr: prayer.sunnahName,
      homeXp: prayer.homeXpReward,
      mosqueXp: prayer.mosqueXpReward, // 10X!
      proofType: 'fard',
      icon: prayer.icon,
      prayer,
    });
  };

  // Trigger Camera for Sunnah (with 10X mosque multiplier)
  const handleOpenLiveCameraForSunnah = (sunnah: SunnahTiming) => {
    setCameraTarget({
      titleAr: sunnah.name,
      subtitleAr: sunnah.period,
      homeXp: sunnah.homeXpReward,
      mosqueXp: sunnah.mosqueXpReward, // 10X!
      proofType: 'sunnah',
      icon: '🕌',
      sunnahId: sunnah.id,
    });
  };

  // Trigger Camera for Qiyam Al-Layl
  const handleOpenLiveCameraForQiyam = (rakaat = 2) => {
    setCameraTarget({
      titleAr: `قيام الليل (${rakaat} ركعات)`,
      subtitleAr: 'صلاة الليل في السحر بالدليل اللحظي',
      homeXp: 50 * (rakaat / 2),
      mosqueXp: 500 * (rakaat / 2), // 10X!
      proofType: 'qiyam',
      icon: '🌙',
      qiyamRakaat: rakaat,
    });
  };

  // Trigger Camera for Daily Challenge
  const handleOpenProofForChallenge = (challenge: DailyChallenge) => {
    setCameraTarget({
      titleAr: challenge.title,
      subtitleAr: challenge.description,
      homeXp: challenge.xpReward,
      mosqueXp: challenge.xpReward * 2,
      proofType: 'task',
      icon: challenge.icon,
      taskId: challenge.id,
    });
  };

  // Claim non-proof challenge
  const handleClaimChallenge = (challengeId: string) => {
    if (!user) return;
    sound.playLevelUp();
    const ch = challenges.find(c => c.id === challengeId);
    if (!ch) return;

    const { updatedUser, leveledUp, newLvl } = addXpAndCheckLevel(user, ch.xpReward);
    StorageAPI.setCurrentUser(updatedUser);
    setUser(updatedUser);

    const updatedList = challenges.map(c =>
      c.id === challengeId ? { ...c, completed: true } : c
    );
    StorageAPI.saveChallenges(updatedList);
    setChallenges(updatedList);

    if (leveledUp) {
      setCelebrationLevel(newLvl);
    }
  };

  // Add XP from Azkar or Tasbih
  const handleAddCustomXp = (amount: number, reason: string) => {
    if (!user) return;
    const { updatedUser, leveledUp, newLvl } = addXpAndCheckLevel(user, amount);
    const finalU = {
      ...updatedUser,
      azkarCompletedTotal: user.azkarCompletedTotal + 1,
    };
    StorageAPI.setCurrentUser(finalU);
    setUser(finalU);

    if (leveledUp) {
      setCelebrationLevel(newLvl);
    }
  };

  // 1. RENDER AUTH SCREEN IF NO USER IS LOGGED IN (Starts from Zero)
  if (!user) {
    return (
      <AuthScreen
        onSuccess={newUser => {
          setUser(newUser);
          setTodayRecord(StorageAPI.getTodayRecord(newUser.id));
          setCalendarData(StorageAPI.getCalendar(newUser.id));
          setRooms(StorageAPI.getRooms());
          setMessages(StorageAPI.getMessages());
        }}
      />
    );
  }

  // 2. RENDER PIN LOCK SCREEN IF DEVICE IS LOCKED
  if (isPinLocked && user.pinCode) {
    return <PinLockScreen user={user} onUnlock={handleUnlockApp} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenLevelPath={() => setIsLevelPathOpen(true)}
        onOpenReminders={() => setIsRemindersOpen(true)}
        onOpenWidgets={() => setIsWidgetsOpen(true)}
        onOpenApkInstall={() => setIsApkInstallOpen(true)}
        onLockApp={handleLockApp}
        isQiyamActive={isQiyamTime}
        onOpenQiyam={() => handleOpenLiveCameraForQiyam(2)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-5 py-4">
        {activeTab === 'prayers' && (
          <PrayersTab
            user={user}
            todayRecord={todayRecord}
            onOpenLiveCameraForFard={handleOpenLiveCameraForFard}
            onOpenLiveCameraForSunnah={handleOpenLiveCameraForSunnah}
            onOpenLiveCameraForQiyam={handleOpenLiveCameraForQiyam}
            completedSunnahs={completedSunnahs}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomsTab
            currentUser={user}
            rooms={rooms}
            messages={messages}
            onSendMessage={handleSendMessage}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            onLeaveRoom={handleLeaveRoom}
            onReactMessage={handleReactMessage}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarTab
            user={user}
            calendarData={calendarData}
          />
        )}

        {activeTab === 'azkar' && (
          <AzkarAndChallengesTab
            user={user}
            challenges={challenges}
            onClaimChallenge={handleClaimChallenge}
            onOpenProofForChallenge={handleOpenProofForChallenge}
            onAddXp={handleAddCustomXp}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            user={user}
            onOpenLevelPath={() => setIsLevelPathOpen(true)}
            onOpenReminders={() => setIsRemindersOpen(true)}
            onOpenWidgets={() => setIsWidgetsOpen(true)}
            onOpenApkInstall={() => setIsApkInstallOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenCosmeticsModal={() => setIsCosmeticsOpen(true)}
            onLockApp={handleLockApp}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={tab => setActiveTab(tab)}
        unreadRoomsCount={0}
        unclaimedChallengesCount={
          challenges.filter(c => c.progress >= c.target && !c.completed).length
        }
      />

      {/* MODALS */}
      {/* 1. Universal Live Camera Modal (with Mosque 10X and Photo Destination Breakdown) */}
      {cameraTarget && (
        <LiveCameraModal
          isOpen={!!cameraTarget}
          onClose={() => setCameraTarget(null)}
          target={cameraTarget}
          user={user}
          rooms={rooms}
          onProofCaptured={handleProofCaptured}
        />
      )}

      {/* 2. 250-Level Full Path Road Modal */}
      <LevelPathModal
        isOpen={isLevelPathOpen}
        onClose={() => setIsLevelPathOpen(false)}
        user={user}
      />

      {/* 3. Level Up Celebration Modal */}
      {celebrationLevel && (
        <LevelUpCelebrationModal
          isOpen={!!celebrationLevel}
          onClose={() => setCelebrationLevel(null)}
          newLevel={celebrationLevel}
        />
      )}

      {/* 4. Post Prayer Incentive Modal with Mosque 10X Celebration */}
      {postPrayerData && (
        <PostPrayerModal
          isOpen={!!postPrayerData}
          onClose={() => setPostPrayerData(null)}
          prayer={postPrayerData.prayer}
          user={user}
          onGoToRooms={() => setActiveTab('rooms')}
          actualXp={postPrayerData.actualXp}
          locationType={postPrayerData.locationType}
        />
      )}

      {/* 5. Custom Reminders & Notification Style Modal */}
      <RemindersModal
        isOpen={isRemindersOpen}
        onClose={() => setIsRemindersOpen(false)}
        user={user}
        onUpdateNotificationStyle={(style, tone) => {
          handleUpdateUser({
            ...user,
            notificationStyle: style,
            notificationTone: tone,
          });
        }}
      />

      {/* 6. Interactive Phone Widgets Modal */}
      <WidgetsModal
        isOpen={isWidgetsOpen}
        onClose={() => setIsWidgetsOpen(false)}
        user={user}
        todayRecord={todayRecord}
        onQuickProvePrayer={handleOpenLiveCameraForFard}
        onQuickAddQiyam={() => handleOpenLiveCameraForQiyam(2)}
      />

      {/* 7. APK / PWA Install Modal */}
      <ApkInstallModal
        isOpen={isApkInstallOpen}
        onClose={() => setIsApkInstallOpen(false)}
      />

      {/* 8. Achievement Share Card Modal */}
      <AchievementShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        user={user}
      />

      {/* 9. Cosmetics & Frames Wardrobe Modal */}
      <CosmeticsModal
        isOpen={isCosmeticsOpen}
        onClose={() => setIsCosmeticsOpen(false)}
        user={user}
        onEquipFrame={handleEquipFrame}
        onEquipAvatar={handleEquipAvatar}
      />
    </div>
  );
}
