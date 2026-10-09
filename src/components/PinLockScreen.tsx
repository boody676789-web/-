import React, { useState } from 'react';
import { User } from '../types';
import { getTierForLevel } from '../utils/levels';
import { sound } from '../utils/sound';
import { Lock, Delete, ShieldCheck, KeyRound } from 'lucide-react';

interface PinLockScreenProps {
  user: User;
  onUnlock: () => void;
}

export const PinLockScreen: React.FC<PinLockScreenProps> = ({ user, onUnlock }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState(false);

  const tier = getTierForLevel(user.level);

  const handleDigit = (digit: string) => {
    if (enteredPin.length >= 4) return;
    sound.playTick();
    const nextPin = enteredPin + digit;
    setEnteredPin(nextPin);
    setError(false);

    if (nextPin.length === 4) {
      if (nextPin === user.pinCode) {
        sound.playPrayerAccepted();
        onUnlock();
      } else {
        sound.playTick();
        setError(true);
        setTimeout(() => {
          setEnteredPin('');
          setError(false);
        }, 700);
      }
    }
  };

  const handleDelete = () => {
    sound.playTick();
    setEnteredPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 text-center select-none">
      {/* Background glow */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: tier.colorHex }}
      />

      <div className="relative z-10 max-w-sm w-full flex flex-col items-center">
        {/* User Badge */}
        <div
          className="w-20 h-20 rounded-3xl border-4 flex items-center justify-center text-4xl shadow-2xl mb-3 bg-slate-900"
          style={{ borderColor: tier.colorHex }}
        >
          {user.avatar}
        </div>

        <h2 className="text-xl font-black text-white" style={{ color: tier.colorHex }}>
          {user.name}
        </h2>
        <span className="text-xs text-slate-400 mt-0.5">
          {user.title} • ليفل {user.level}
        </span>

        <div className="my-6">
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>حساب شخصي مقفل على هذا الجهاز</span>
          </div>

          {/* PIN Indicators */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map(idx => {
              const isFilled = enteredPin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    error
                      ? 'border-rose-500 bg-rose-500 animate-pulse'
                      : isFilled
                      ? 'border-emerald-400 bg-emerald-400 scale-110 shadow-md shadow-emerald-400/50'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                />
              );
            })}
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-bold mt-2 animate-bounce">
              رمز المرور غير صحيح، حاول ثانية
            </p>
          )}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 w-64 max-w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xl font-black text-white shadow-md active:scale-95 transition-all flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xl font-black text-white shadow-md active:scale-95 transition-all flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white shadow-md active:scale-95 transition-all flex items-center justify-center"
            title="حذف"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 text-[11px] text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>كل شخص له حساب خاص به محمي على جهازه</span>
        </div>
      </div>
    </div>
  );
};
