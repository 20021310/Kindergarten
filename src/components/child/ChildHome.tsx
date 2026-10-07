import React from 'react';
import { ChildProfile, ActivityItem, Language } from '../../types';
import { sound } from '../../services/sound';
import { Play, Sparkles, BookOpen, Brain, Film, Trophy, Flame } from 'lucide-react';

interface ChildHomeProps {
  child: ChildProfile;
  activities: ActivityItem[];
  lang: Language;
  onSelectCategory: (category: string) => void;
  onLaunchActivity: (activity: ActivityItem) => void;
  onOpenVideos: () => void;
  onOpenRewards: () => void;
}

export const ChildHome: React.FC<ChildHomeProps> = ({
  child,
  activities,
  lang,
  onSelectCategory,
  onLaunchActivity,
  onOpenVideos,
  onOpenRewards
}) => {
  const mathActivity = activities.find(a => a.category === 'math') || activities[0];
  const langActivity = activities.find(a => a.category === 'language') || activities[1];
  const brainActivity = activities.find(a => a.category === 'brain') || activities[2];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* 1. Friendly Top Hero Banner (matching UI kit: "Hi, Emma! 👋 - Current Streak 7 Days 🔥" + Dragon mascot) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-44 h-44 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-start">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>
                {lang === 'ar' ? `نشاط مستمر: ${child.currentStreak} أيام 🔥` : `Current Streak: ${child.currentStreak} Days 🔥`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black mb-1 tracking-tight">
              {lang === 'ar' ? `أهلاً بك يا ${child.nameAr}! 👋` : `Hi, ${child.name}! 👋`}
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm max-w-md font-medium">
              {lang === 'ar'
                ? 'جاهزون لمغامرة تعليمية شيقة اليوم؟ هيا نلعب ونتعلم معاً!'
                : 'Ready for today’s exciting kindergarten adventure? Let’s learn and play!'}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onLaunchActivity(mathActivity);
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{lang === 'ar' ? 'هيّا نتعلّم! 🚀' : "Let's Learn! 🚀"}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenRewards();
                }}
                className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer text-sm"
              >
                <span>⭐ {child.stars}</span>
                <span className="text-xs opacity-90">{lang === 'ar' ? 'نجمة' : 'Stars'}</span>
              </button>
            </div>
          </div>

          {/* Friendly Qassim Dragon Mascot Avatar */}
          <div className="shrink-0 relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-white/20 p-1.5 shadow-2xl backdrop-blur-xs ring-4 ring-white/30 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/src/assets/images/mascot_qassim_dragon_1791354663172.jpg"
                alt="Baraem Mascot"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Continue Learning Featured Card (matching UI kit: "Continue Learning - Math Adventure") */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'تابع التعلم 🌟' : 'Continue Learning 🌟'}
          </h2>
          <span className="text-xs font-semibold text-indigo-600">
            {lang === 'ar' ? 'مستوى روضة 2' : 'KG Level 2'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-indigo-50 border border-indigo-100">
              <img
                src="/src/assets/images/card_math_fruit_adventure_1791354689778.jpg"
                alt="Math adventure"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                {lang === 'ar' ? 'الرياضيات الممتعة' : 'Math Adventure'}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'ar' ? mathActivity.titleAr : mathActivity.title}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'العد وجمع الفواكه اللذيذة' : 'Counting & simple addition'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-center sm:text-end">
              <span className="text-xs font-mono font-bold text-slate-700">75%</span>
              <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                <div className="bg-indigo-600 h-full w-3/4 rounded-full" />
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onLaunchActivity(mathActivity);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              {lang === 'ar' ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Explorers (Large colorful touch buttons designed for 4-6 year olds) */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">
          {lang === 'ar' ? 'عالم الأنشطة والألعاب 🎨' : 'Activity Worlds 🎨'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Math */}
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('math');
            }}
            className="group p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:from-indigo-100 hover:to-indigo-200/50 rounded-3xl border border-indigo-200 text-center transition-all cursor-pointer hover:shadow-md"
          >
            <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs mb-2 group-hover:scale-110 transition-transform">
              🔢
            </div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              {lang === 'ar' ? 'الرياضيات' : 'Mathematics'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar' ? 'عد وأشكال' : 'Numbers & Shapes'}
            </div>
          </button>

          {/* Arabic Letters */}
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('letters');
            }}
            className="group p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50 rounded-3xl border border-emerald-200 text-center transition-all cursor-pointer hover:shadow-md"
          >
            <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs mb-2 group-hover:scale-110 transition-transform">
              🔤
            </div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              {lang === 'ar' ? 'لغتي والحروف' : 'Arabic Phonics'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar' ? 'نطق وقراءة' : 'Reading & Sounds'}
            </div>
          </button>

          {/* Brain Games */}
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('brain');
            }}
            className="group p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50 rounded-3xl border border-amber-200 text-center transition-all cursor-pointer hover:shadow-md"
          >
            <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs mb-2 group-hover:scale-110 transition-transform">
              🧩
            </div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              {lang === 'ar' ? 'نادي الذكاء' : 'Brain Gym'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar' ? 'ذاكرة وأنماط' : 'Memory & Logic'}
            </div>
          </button>

          {/* Short Videos */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenVideos();
            }}
            className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 rounded-3xl border border-purple-200 text-center transition-all cursor-pointer hover:shadow-md"
          >
            <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs mb-2 group-hover:scale-110 transition-transform">
              🎬
            </div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              {lang === 'ar' ? 'سينما براعم' : 'Educational Videos'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar' ? 'أناشيد وقيم' : 'Stories & Manners'}
            </div>
          </button>
        </div>
      </div>

      {/* 4. Upcoming Activities & Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'أنشطة مقترحة لليوم 📋' : 'Recommended Today 📋'}
          </h2>
          <span className="text-xs text-slate-400">
            {lang === 'ar' ? 'تم اختيارها لمستواك' : 'Tailored to your level'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Phonics Card */}
          <div
            onClick={() => {
              sound.playClick();
              onLaunchActivity(langActivity);
            }}
            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-emerald-50 border border-emerald-100">
              <img
                src="/src/assets/images/card_arabic_alphabet_reading_1791354700682.jpg"
                alt="Alphabet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-emerald-600 block">
                {lang === 'ar' ? 'الحروف الهجائية' : 'Phonics Fun'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {lang === 'ar' ? langActivity.titleAr : langActivity.title}
              </h4>
              <span className="text-[11px] text-slate-400">
                {langActivity.durationMinutes} {lang === 'ar' ? 'دقائق' : 'mins'} · +{langActivity.starsReward} ⭐
              </span>
            </div>
          </div>

          {/* Brain Gym Card */}
          <div
            onClick={() => {
              sound.playClick();
              onLaunchActivity(brainActivity);
            }}
            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-amber-50 border border-amber-100">
              <img
                src="/src/assets/images/mascot_qassim_dragon_1791354663172.jpg"
                alt="Brain gym"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-amber-600 block">
                {lang === 'ar' ? 'تنشيط العقل' : 'Brain Gym'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {lang === 'ar' ? brainActivity.titleAr : brainActivity.title}
              </h4>
              <span className="text-[11px] text-slate-400">
                {brainActivity.durationMinutes} {lang === 'ar' ? 'دقائق' : 'mins'} · +{brainActivity.starsReward} ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
