import React, { useState } from 'react';
import { Badge, Accessory, Language, ChildProfile } from '../../types';
import { sound } from '../../services/sound';
import { ArrowLeft, ArrowRight, Check, Lock, Trophy } from 'lucide-react';

interface RewardsViewProps {
  child: ChildProfile;
  badges: Badge[];
  accessories: Accessory[];
  lang: Language;
  onBack: () => void;
  onEquipAccessory: (accId: string) => void;
  onBuyAccessory: (acc: Accessory) => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({
  child,
  badges,
  accessories,
  lang,
  onBack,
  onEquipAccessory,
  onBuyAccessory
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold cursor-pointer"
        >
          {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'العودة' : 'Back'}</span>
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          {lang === 'ar' ? 'صندوق المكافآت والأوسمة 🏆' : 'Rewards & Trophies 🏆'}
        </h1>

        {/* Stars Balance */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-extrabold text-amber-800">
          <span>⭐</span>
          <span className="font-mono tabular-nums">{child.stars}</span>
        </div>
      </div>

      {/* Main Big Trophy Hero (matching UI kit "You did it! Keep up the great work") */}
      <div className="bg-gradient-to-b from-indigo-50/80 via-white to-purple-50/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 text-center shadow-lg mb-6">
        <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl p-3 shadow-md flex items-center justify-center text-5xl animate-bounce">
          🏆
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">
          {lang === 'ar' ? 'أنت بطل متميز!' : 'You did it!'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          {lang === 'ar' ? 'استمر في التعلّم وحصد النجوم الذهبية الرائعة' : 'Keep up the great work and collect shiny stars!'}
        </p>

        {/* Top Achiever Progress Bar */}
        <div className="bg-white rounded-2xl p-4 border border-indigo-50 shadow-xs max-w-sm mx-auto text-left">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎖️</span>
              <span className="text-xs font-bold text-slate-800">
                {lang === 'ar' ? 'المستوى القادم: بطل المعرفة' : 'Next Level: Top Achiever'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600">
              {Math.min(child.stars, 300)}/300
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (child.stars / 300) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>{lang === 'ar' ? 'الأوسمة والإنجازات' : 'Earned Badges'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {child.unlockedBadgeIds.length} / {badges.length}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
          {badges.map((b) => {
            const isUnlocked = child.unlockedBadgeIds.includes(b.id);
            return (
              <button
                key={b.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedBadge(b);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-slate-50/70 hover:bg-indigo-50/50 border-slate-200'
                    : 'bg-slate-100/60 border-dashed border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mb-1.5">{b.icon}</div>
                <div className="text-xs font-bold text-slate-800 line-clamp-1">
                  {lang === 'ar' ? b.titleAr : b.title}
                </div>
                {isUnlocked ? (
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                    {lang === 'ar' ? 'مكتمل ✓' : 'Unlocked'}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                    {lang === 'ar' ? 'مغلق 🔒' : 'Locked'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Your Collection / Unlockable Items (matching UI kit: backpack, headphones, pencil, water bottle) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'مقتنياتي وأدواتي المدرسية 🎒' : 'Your Collection 🎒'}
          </h3>
          <span className="text-xs text-slate-400">
            {lang === 'ar' ? 'جهّز شخصيتك للمغامرة' : 'Customize your avatar'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {accessories.map((acc) => {
            const isUnlocked = child.unlockedAccessoryIds.includes(acc.id);
            const isEquipped = child.equippedAccessoryId === acc.id;

            return (
              <div
                key={acc.id}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isEquipped
                    ? 'bg-indigo-50 border-indigo-400 shadow-xs'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-3xl mb-1">{acc.icon}</div>
                <div className="text-xs font-bold text-slate-800 line-clamp-1 mb-2">
                  {lang === 'ar' ? acc.titleAr : acc.title}
                </div>

                {isEquipped ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                    <Check className="w-3 h-3 text-indigo-600" />
                    <span>{lang === 'ar' ? 'مفعّل' : 'Equipped'}</span>
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onEquipAccessory(acc.id);
                    }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                  >
                    {lang === 'ar' ? 'استخدم' : 'Equip'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onBuyAccessory(acc);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 cursor-pointer"
                  >
                    <Lock className="w-3 h-3" />
                    <span>{acc.costStars} ⭐</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="text-5xl mb-2">{selectedBadge.icon}</div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              {lang === 'ar' ? selectedBadge.titleAr : selectedBadge.title}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'ar' ? selectedBadge.descriptionAr : selectedBadge.description}
            </p>
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
