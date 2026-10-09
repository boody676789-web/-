import React, { useState } from 'react';
import { User, Room, ChatMessage } from '../types';
import { StorageAPI } from '../utils/storage';
import { getTierForLevel } from '../utils/levels';
import { sound } from '../utils/sound';
import {
  Users,
  Plus,
  Share2,
  Copy,
  Check,
  Send,
  MessageSquare,
  Flame,
  ShieldCheck,
  Sparkles,
  Trophy,
  ArrowRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';

interface RoomsTabProps {
  currentUser: User;
  rooms: Room[];
  messages: ChatMessage[];
  onSendMessage: (roomId: string, content: string) => void;
  onCreateRoom: (name: string, description: string, emoji: string) => void;
  onJoinRoom: (inviteCode: string) => void;
  onLeaveRoom: (roomId: string) => void;
  onReactMessage: (messageId: string, emoji: string) => void;
}

export const RoomsTab: React.FC<RoomsTabProps> = ({
  currentUser,
  rooms,
  messages,
  onSendMessage,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onReactMessage,
}) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(() => rooms[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showLeaveConfirmModal, setShowLeaveConfirmModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Create room form state
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDesc, setNewRoomDesc] = useState('');
  const [newRoomEmoji, setNewRoomEmoji] = useState('🕌');

  // Join room form state
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];
  const roomMessages = messages.filter(m => m.roomId === activeRoom?.id);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeRoom) return;
    onSendMessage(activeRoom.id, inputText.trim());
    setInputText('');
    sound.playTick();
  };

  const handleCopyInviteLink = () => {
    if (!activeRoom) return;
    const inviteLink = `${window.location.origin}${window.location.pathname}#invite=${activeRoom.inviteCode}`;
    navigator.clipboard.writeText(inviteLink).catch(() => {});
    setCopiedLink(true);
    sound.playTick();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    onCreateRoom(newRoomName.trim(), newRoomDesc.trim(), newRoomEmoji);
    setNewRoomName('');
    setNewRoomDesc('');
    setShowCreateModal(false);
    sound.playLevelUp();
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    try {
      onJoinRoom(joinCode.trim().toUpperCase());
      setJoinCode('');
      setShowJoinModal(false);
      setJoinError(null);
      sound.playLevelUp();
    } catch (err: unknown) {
      setJoinError('كود الدعوة غير صالح أو أنك منضم بالفعل');
    }
  };

  const quickMessages = [
    'تقبل الله صلاتكم جميعاً 🤲',
    'يا شباب أذّنت الصلاة، استعدوا! 🕌',
    'ما شاء الله على همة الروم والستريك 🔥',
    'ما تنسوا سنة الرواتب وأذكار الصباح 🌿',
  ];

  return (
    <div className="pb-24 max-w-5xl mx-auto">
      {/* Top Header for Rooms */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>رومات الصحبة والجماعات 💬</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              شات مثل واتساب
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            شارك دليلك اللحظي مع أصدقائك، شجعو بعض، وشاهد ألقاب كل واحد وألوان مستواه!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJoinModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>انضمام برمز</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء روم جديد</span>
          </button>
        </div>
      </div>

      {/* Rooms Horizontal List / Carousel */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {rooms.map(room => {
          const isSelected = room.id === activeRoom?.id;
          const memberCount = room.members.length;

          return (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomId(room.id);
                sound.playTick();
              }}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-3 shrink-0 min-w-[200px] text-right ${
                isSelected
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-xl shrink-0 border border-slate-700">
                {room.emoji}
              </div>
              <div className="truncate">
                <span className="font-extrabold text-sm text-white block truncate">
                  {room.name}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3 h-3 text-emerald-400" />
                  {memberCount} أعضاء • كود: {room.inviteCode}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Room Container (WhatsApp Style Chat) */}
      {activeRoom ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[65vh] sm:h-[70vh]">
          {/* Room Header */}
          <div className="p-3.5 sm:p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-500/40 flex items-center justify-center text-xl shrink-0">
                {activeRoom.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base text-white">
                    {activeRoom.name}
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono border border-slate-700">
                    كود: {activeRoom.inviteCode}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {activeRoom.description}
                </p>
              </div>
            </div>

            {/* Actions: Join, Leave, Leaderboard & Invite Link */}
            <div className="flex items-center gap-2">
              {!currentUser.joinedRooms.includes(activeRoom.id) ? (
                <button
                  onClick={() => {
                    sound.playLevelUp();
                    onJoinRoom(activeRoom.inviteCode);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>انضمام للروم</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLeaveConfirmModal(true)}
                  title="الخروج من هذا الروم"
                  className="p-2 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">خروج من الروم</span>
                </button>
              )}

              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                title="لوحة الصدارة لأعضاء الروم"
                className="p-2 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">الصدارة</span>
              </button>

              <button
                onClick={handleCopyInviteLink}
                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>رابط الدعوة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Members / Leaderboard Drawer (Toggleable) */}
          {showLeaderboard && (
            <div className="bg-slate-950 p-4 border-b border-slate-800 animate-in slide-in-from-top duration-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  أعضاء الروم وترتيب المستويات:
                </h4>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  إغلاق
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {activeRoom.members.map(member => {
                  const tier = getTierForLevel(member.level);
                  return (
                    <div
                      key={member.userId}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{member.avatar}</span>
                        <div>
                          <span
                            className="font-extrabold block"
                            style={{ color: tier.colorHex }}
                          >
                            {member.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {member.title}
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        <span
                          className="font-black font-mono block"
                          style={{ color: tier.colorHex }}
                        >
                          LVL {member.level}
                        </span>
                        <span className="text-[10px] text-orange-400 font-bold">
                          🔥 {member.streak} يوم
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentUser.joinedRooms.includes(activeRoom.id) && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">أنت عضو في هذا الروم</span>
                  <button
                    onClick={() => {
                      setShowLeaderboard(false);
                      setShowLeaveConfirmModal(true);
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-rose-950/40 transition-colors border border-rose-500/20"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>خروج من الروم</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Messages Feed (Scrollable WhatsApp Style) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
            {roomMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <MessageSquare className="w-12 h-12 text-slate-700 mb-2" />
                <p className="text-sm font-bold text-slate-400">لا توجد رسائل بعد في هذا الروم</p>
                <p className="text-xs text-slate-500 mt-1">
                  كن أول من يثبت صلاته بكاميرا فورية أو يرسل رسالة تشجيعية!
                </p>
              </div>
            ) : (
              roomMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                const senderTier = getTierForLevel(msg.senderLevel);

                if (msg.type === 'proof' && msg.proofData) {
                  return (
                    /* Verified Prayer Proof Card */
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      {/* Sender Tag with Level Color & Title */}
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-sm">{msg.senderAvatar}</span>
                        <span
                          className="font-extrabold text-xs"
                          style={{ color: senderTier.colorHex }}
                        >
                          {msg.senderName}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                          {msg.senderTitle}
                        </span>
                        <span
                          className="text-[10px] font-mono font-bold"
                          style={{ color: senderTier.colorHex }}
                        >
                          (LVL {msg.senderLevel})
                        </span>
                      </div>

                      {/* Card Content with live photo */}
                      <div className="max-w-sm w-full bg-slate-900 border-2 border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl">
                        {/* Header badge */}
                        <div className="bg-emerald-950/80 px-3 py-2 border-b border-emerald-500/30 flex items-center justify-between">
                          <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            أثبت صلاة {msg.proofData.prayerNameAr} 🕌
                          </span>
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            +{msg.proofData.xpEarned} XP
                          </span>
                        </div>

                        {/* Photo */}
                        <div className="relative aspect-[4/3] bg-black">
                          <img
                            src={msg.proofData.photoUrl}
                            alt="دليل الصلاة"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-[10px] text-white px-2 py-0.5 rounded-md font-mono">
                            🔥 ستريك {msg.proofData.streak} يوم
                          </div>
                        </div>

                        {/* Reactions Bar */}
                        <div className="p-2.5 bg-slate-900 flex items-center justify-between border-t border-slate-800">
                          <div className="flex items-center gap-1.5">
                            {['🤲', '🤍', '⭐', '👏'].map(emoji => {
                              const reactionCount = msg.reactions?.[emoji]?.length || 0;
                              const hasReacted = msg.reactions?.[emoji]?.includes(currentUser.id);

                              return (
                                <button
                                  key={emoji}
                                  onClick={() => onReactMessage(msg.id, emoji)}
                                  className={`text-xs px-2 py-1 rounded-lg border flex items-center gap-1 transition-all ${
                                    hasReacted
                                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  <span>{emoji}</span>
                                  {reactionCount > 0 && (
                                    <span className="text-[10px] font-mono font-bold">
                                      {reactionCount}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(msg.timestamp).toLocaleTimeString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* Standard Text Message */
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    {!isMe && (
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-xs">{msg.senderAvatar}</span>
                        <span
                          className="font-extrabold text-xs"
                          style={{ color: senderTier.colorHex }}
                        >
                          {msg.senderName}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          ({msg.senderTitle})
                        </span>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tl-sm'
                          : 'bg-slate-800 text-slate-100 rounded-tr-sm border border-slate-700/80'
                      }`}
                    >
                      <p className="text-right">{msg.content}</p>
                      <span className="text-[9px] opacity-70 block text-left mt-1 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString('ar-EG', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Message Chips */}
          <div className="px-3 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickMessages.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSendMessage(activeRoom.id, q);
                  sound.playTick();
                }}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="اكتب رسالة تشجيعية لأصحابك في الروم..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors text-right"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white flex items-center justify-center transition-all shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      ) : null}

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-right">
            <h3 className="text-xl font-black text-white mb-2">
              إنشاء روم صلاة جماعي جديد 🕌
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              سيتم إنشاء كود دعوة ورابط خاص يمكنك مشاركته مع أصحابك في واتساب للتحفيز المتبادل.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  اسم الروم
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شلة الفجر، صحبة الجنة، فرسان المسجد..."
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  شعار الروم (رمز تعبيري)
                </label>
                <div className="flex gap-2 justify-center bg-slate-800/60 p-2 rounded-xl">
                  {['🌅', '⚔️', '🕌', '🌙', '🌟', '🕊️', '👑', '🌿'].map(em => (
                    <button
                      type="button"
                      key={em}
                      onClick={() => setNewRoomEmoji(em)}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center ${
                        newRoomEmoji === em ? 'bg-emerald-600' : 'bg-slate-800'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  وصف الهدف
                </label>
                <input
                  type="text"
                  placeholder="مثال: الالتزام بالفجر والصلوات في وقتها مع السنن"
                  value={newRoomDesc}
                  onChange={e => setNewRoomDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 text-right"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30"
                >
                  إنشاء الروم وتوليد الرابط 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-right">
            <h3 className="text-xl font-black text-white mb-2">
              الانضمام لروم عبر رمز الدعوة 🔗
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              أدخل كود الروم الذي شاركه معك صديقك (مثل: FAJR2026 أو FURSAN100):
            </p>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="أدخل كود الدعوة..."
                value={joinCode}
                onChange={e => setJoinCode(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono uppercase tracking-wider text-center focus:outline-none focus:border-emerald-500"
              />

              {joinError && (
                <p className="text-xs text-rose-400 font-semibold">{joinError}</p>
              )}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinModal(false);
                    setJoinError(null);
                  }}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30"
                >
                  انضمام الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Room Confirmation Modal */}
      {showLeaveConfirmModal && activeRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-5 shadow-2xl text-right animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3 shadow-lg shadow-rose-900/30">
              <LogOut className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">
              مغادرة روم {activeRoom.name}؟
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              هل أنت متأكد من الخروج من هذا الروم؟ لن تتلقى رسائل أو إثباتات الأعضاء بعد الآن، ويمكنك العودة في أي وقت باستخدام كود الدعوة (<span className="font-mono text-amber-300 font-bold">{activeRoom.inviteCode}</span>).
            </p>
            <div className="flex gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setShowLeaveConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLeaveConfirmModal(false);
                  onLeaveRoom(activeRoom.id);
                  sound.playTick();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs shadow-lg shadow-rose-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تأكيد الخروج</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
