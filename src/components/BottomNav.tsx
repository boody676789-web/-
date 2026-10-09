import React from 'react';
import { Home, Users, Calendar, Sparkles, User as UserIcon } from 'lucide-react';

export type NavTab = 'prayers' | 'rooms' | 'calendar' | 'azkar' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  unreadRoomsCount?: number;
  unclaimedChallengesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  unreadRoomsCount = 0,
  unclaimedChallengesCount = 0,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'prayers',
      label: 'الصلوات',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'rooms',
      label: 'الجماعات',
      icon: <Users className="w-5 h-5" />,
      badge: unreadRoomsCount,
    },
    {
      id: 'calendar',
      label: 'التقويم',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 'azkar',
      label: 'الأذكار والتحديات',
      icon: <Sparkles className="w-5 h-5" />,
      badge: unclaimedChallengesCount,
    },
    {
      id: 'profile',
      label: 'أنا',
      icon: <UserIcon className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-4 h-1 bg-emerald-400 rounded-full mt-0.5 shadow-sm shadow-emerald-400/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
