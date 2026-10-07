import React, { useState } from 'react';
import { ChildProfile, WeeklyStat, ActivityAttempt, Language } from '../../types';
import { sound } from '../../services/sound';
import {
  Clock,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  BarChart3,
  Calendar,
  Settings,
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';

interface ParentDashboardProps {
  childrenList: ChildProfile[];
  activeChild: ChildProfile;
  weeklyStats: WeeklyStat[];
  attempts: ActivityAttempt[];
  lang: Language;
  onSelectChild: (id: string) => void;
  onUpdateScreenTime: (childId: string, limitMinutes: number) => void;
  onUpdateParentPin: (newPin: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  childrenList,
  activeChild,
  weeklyStats,
  attempts,
  lang,
  onSelectChild,
  onUpdateScreenTime,
  onUpdateParentPin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'screentime' | 'reports'>('overview');
  const [screenLimit, setScreenLimit] = useState(activeChild.screenTimeLimitMinutes);
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const maxMinutesInWeek = Math.max(...weeklyStats.map(s => s.minutes), 60);

  const handleSaveScreenTime = () => {
    sound.playClick();
    onUpdateScreenTime(activeChild.id, screenLimit);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      sound.playSuccess();
      onUpdateParentPin(newPin);
      setPinSuccess(true);
      setTimeout(() => setPinSuccess(false), 2500);
      setNewPin('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Grid Layout (Tablet/Desktop Two-Zone) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar (Child Profile & Nav) */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Child Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-3">
              <img
                src={activeChild.avatarUrl}
                alt={activeChild.nameAr}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50 mx-auto shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                ✓
              </span>
            </div>

            <h2 className="text-base font-extrabold text-slate-900">
              {lang === 'ar' ? activeChild.nameAr : activeChild.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ar' ? `${activeChild.age} سنوات · ${activeChild.className}` : `Age ${activeChild.age} · ${activeChild.className}`}
            </p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">
              {lang === 'ar' ? activeChild.school : 'Rawdat Al-Nakheel - Qassim'}
            </p>

            {/* Switch child profile dropdown if multiple children */}
            {childrenList.length > 1 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="text-[11px] text-slate-400 block mb-1">
                  {lang === 'ar' ? 'تبديل الطفل:' : 'Switch child:'}
                </label>
                <div className="flex justify-center gap-2">
                  {childrenList.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectChild(ch.id);
                        setScreenLimit(ch.screenTimeLimitMinutes);
                      }}
                      className={`text-xs px-2.5 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                        ch.id === activeChild.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lang === 'ar' ? ch.nameAr.split(' ')[0] : ch.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm space-y-1">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('overview');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>{lang === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('progress');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'progress' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>{lang === 'ar' ? 'التقدم والمهارات' : 'Learning Progress'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('screentime');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'screentime' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{lang === 'ar' ? 'التحكم بوقت الشاشة' : 'Screen Time Control'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('reports');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reports' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>{lang === 'ar' ? 'سجل الأنشطة' : 'Activity Log'}</span>
            </button>
          </div>

          {/* Motivational Mascot Banner */}
          <div className="bg-gradient-to-tr from-indigo-50 via-purple-50 to-amber-50 rounded-3xl p-5 border border-indigo-100 text-center">
            <div className="w-14 h-14 mx-auto mb-2 rounded-2xl overflow-hidden bg-white shadow-xs p-1">
              <img
                src="/src/assets/images/mascot_qassim_dragon_1791354663172.jpg"
                alt="Mascot"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h4 className="text-xs font-extrabold text-slate-800">
              {lang === 'ar' ? 'إنجازات مشرفة!' : 'Great Momentum!'}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              {lang === 'ar'
                ? `طفلك يتطور بسرعة ملحوظة في روضة النخيل، معدل الدقة ممتاز (${activeChild.accuracy}%).`
                : `Your child is progressing well with an average accuracy of ${activeChild.accuracy}%.`}
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* 1. Key 4 Metric Cards (matching UI kit: Lessons Completed 24, Study Time 5h 30m, Accuracy 92%, Current Streak 7 Days 🔥) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Metric 1: Lessons Completed */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium block mb-1">
                    {lang === 'ar' ? 'الأنشطة المكتملة' : 'Lessons Completed'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
                    {activeChild.lessonsCompleted}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    +12% {lang === 'ar' ? 'عن الأسبوع الماضي' : 'from last week'}
                  </span>
                </div>

                {/* Metric 2: Study Time */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium block mb-1">
                    {lang === 'ar' ? 'وقت التعلم' : 'Study Time'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
                    5h 30m
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    +18% {lang === 'ar' ? 'عن الأسبوع الماضي' : 'from last week'}
                  </span>
                </div>

                {/* Metric 3: Accuracy */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium block mb-1">
                    {lang === 'ar' ? 'معدل الدقة' : 'Accuracy'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tabular-nums">
                    {activeChild.accuracy}%
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    +8% {lang === 'ar' ? 'عن الأسبوع الماضي' : 'from last week'}
                  </span>
                </div>

                {/* Metric 4: Streak */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium block mb-1">
                    {lang === 'ar' ? 'أيام الاستمرار' : 'Current Streak'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-1.5 font-mono tabular-nums">
                    <span>{activeChild.currentStreak}</span>
                    <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="text-[11px] text-amber-600 font-semibold block mt-1">
                    {lang === 'ar' ? 'نشاط يومي رائع!' : 'Keep it going!'}
                  </span>
                </div>
              </div>

              {/* 2. Middle Row: Learning Progress Breakdown & Weekly Activity Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Progress Bars (Math 75%, Reading 60%, Science 80%, Phonics 90%) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900 mb-4">
                    {lang === 'ar' ? 'تقدم المواد والمهارات' : 'Learning Progress'}
                  </h3>

                  <div className="space-y-4">
                    {/* Math */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-indigo-600">🔢</span>
                          <span>{lang === 'ar' ? 'الرياضيات والعد' : 'Math'}</span>
                        </span>
                        <span className="font-mono">75%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full w-[75%] rounded-full" />
                      </div>
                    </div>

                    {/* Reading */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-fuchsia-600">📖</span>
                          <span>{lang === 'ar' ? 'القراءة والاستماع' : 'Reading'}</span>
                        </span>
                        <span className="font-mono">60%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-fuchsia-500 h-full w-[60%] rounded-full" />
                      </div>
                    </div>

                    {/* Science & Environment */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-emerald-600">🌱</span>
                          <span>{lang === 'ar' ? 'العلوم والطبيعة' : 'Science'}</span>
                        </span>
                        <span className="font-mono">80%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[80%] rounded-full" />
                      </div>
                    </div>

                    {/* Phonics */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-amber-600">🔤</span>
                          <span>{lang === 'ar' ? 'أصوات الحروف' : 'Phonics'}</span>
                        </span>
                        <span className="font-mono">90%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[90%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Activity Bar Chart (matching UI kit: Mon-Sun or Sun-Sat bars) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {lang === 'ar' ? 'نشاط الأسبوع (بالدقائق)' : 'Weekly Activity (Minutes)'}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {lang === 'ar' ? 'هذا الأسبوع' : 'This Week'}
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="h-44 flex items-end justify-between gap-2 pt-6">
                    {weeklyStats.map((item, idx) => {
                      const heightPercent = (item.minutes / maxMinutesInWeek) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.minutes}m
                          </span>
                          <div
                            className="w-full max-w-[28px] bg-indigo-600/80 hover:bg-indigo-600 rounded-t-xl transition-all duration-300 group-hover:scale-105"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-[11px] font-semibold text-slate-500">
                            {lang === 'ar' ? item.dayNameAr : item.dayName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Recent Achievements & Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Achievements */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900 mb-4">
                    {lang === 'ar' ? 'أحدث الإنجازات والأوسمة 🏆' : 'Recent Achievements 🏆'}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg">
                          🔢
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {lang === 'ar' ? 'عبقري الرياضيات' : 'Math Whiz'}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {lang === 'ar' ? 'حقق 90%+ في اختبار الحساب' : 'Score 90% in Math Quiz'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">May 20</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-lg">
                          📖
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {lang === 'ar' ? 'نجم القراءة والحروف' : 'Reading Star'}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {lang === 'ar' ? 'أكمل 10 دروس في أصوات الحروف' : 'Complete 10 Reading Lessons'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">May 18</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
                          🌱
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {lang === 'ar' ? 'مستكشف الطبيعة' : 'Science Explorer'}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {lang === 'ar' ? 'أنهى 5 أنشطة علمية وبيئية' : 'Finish 5 Science Lessons'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">May 15</span>
                    </div>
                  </div>
                </div>

                {/* Adaptive Recommendations & Needs Practice */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <span>{lang === 'ar' ? 'التوجيه التربوي والمهارات' : 'Pedagogical Insights'}</span>
                  </h3>

                  <div className="space-y-4">
                    {/* Strengths */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-xs font-extrabold text-emerald-800 block mb-1.5">
                        {lang === 'ar' ? 'نقاط القوة المتميزة:' : 'Strengths & Mastered Skills:'}
                      </span>
                      <ul className="text-xs text-emerald-950 space-y-1">
                        {activeChild.masteredSkills.map((sk, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-emerald-600">✓</span>
                            <span>{sk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Needs Practice */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                      <span className="text-xs font-extrabold text-amber-800 block mb-1.5">
                        {lang === 'ar' ? 'مهارات ينصح بالتركيز عليها:' : 'Skills Requiring Practice:'}
                      </span>
                      <ul className="text-xs text-amber-950 space-y-1">
                        {activeChild.needsPracticeSkills.map((sk, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-amber-600">✦</span>
                            <span>{sk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'screentime' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {lang === 'ar' ? 'إدارة وضبط وقت الشاشة للأطفال' : 'Screen Time & Safety Controls'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ar'
                    ? 'صممت المنصة لتشجيع التعلم الفعّال وليس زيادة وقت الشاشة المفرط. يمكنك ضبط الحد اليومي هنا.'
                    : 'The platform promotes effective learning without screen fatigue. You can set daily healthy limits.'}
                </p>
              </div>

              {/* Slider for Screen Time */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 max-w-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">
                    {lang === 'ar' ? 'الحد اليومي المسموح به:' : 'Daily Limit:'}
                  </span>
                  <span className="text-sm font-extrabold text-indigo-600 font-mono">
                    {screenLimit} {lang === 'ar' ? 'دقيقة' : 'minutes'}
                  </span>
                </div>

                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={screenLimit}
                  onChange={(e) => setScreenLimit(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span>15 min</span>
                  <span>45 min (موصى به)</span>
                  <span>120 min</span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {lang === 'ar'
                      ? `تم استخدام اليوم: ${activeChild.screenTimeUsedMinutes} دقيقة`
                      : `Used today: ${activeChild.screenTimeUsedMinutes} mins`}
                  </span>
                  <button
                    onClick={handleSaveScreenTime}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    {lang === 'ar' ? 'حفظ التعديل' : 'Save Limit'}
                  </button>
                </div>
              </div>

              {/* Parent PIN Security Setting */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    {lang === 'ar' ? 'تغيير الرمز السري للوالدين (PIN)' : 'Change Parental PIN'}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-4">
                  {lang === 'ar'
                    ? 'يمنع الأطفال من الخروج من وضع التعلم إلى لوحات التحكم أو الإعدادات.'
                    : 'Prevents children from exiting learning mode into administrative areas.'}
                </p>

                <form onSubmit={handleSavePin} className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="4 أرقام جديدة"
                    className="w-36 px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono tracking-widest text-center"
                  />
                  <button
                    type="submit"
                    disabled={newPin.length !== 4}
                    className="px-4 py-2 bg-indigo-600 disabled:bg-slate-300 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'تحديث الرمز' : 'Update PIN'}
                  </button>
                </form>

                {pinSuccess && (
                  <p className="text-xs text-emerald-600 font-bold mt-2">
                    {lang === 'ar' ? 'تم تحديث الرمز السري بنجاح ✓' : 'PIN updated successfully ✓'}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 mb-4">
                {lang === 'ar' ? 'سجل المحاولات والأنشطة المكتملة' : 'Detailed Activity Log'}
              </h3>

              <div className="divide-y divide-slate-100">
                {attempts.map((att) => (
                  <div key={att.id} className="py-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {lang === 'ar' ? att.activityTitleAr : att.activityTitle}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {att.timestamp} · {Math.round(att.durationSeconds / 60)} {lang === 'ar' ? 'دقيقة' : 'min'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-600 font-mono">
                        {att.accuracy}% {lang === 'ar' ? 'دقة' : 'accuracy'}
                      </span>
                      <span className="text-xs font-bold text-amber-600">
                        +{att.starsEarned} ⭐
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-sm font-extrabold text-slate-900">
                {lang === 'ar' ? 'مخطط التطور المهاري الشامل' : 'Comprehensive Skill Breakdown'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-900 mb-2">
                    {lang === 'ar' ? 'المجال الرياضي والمنطقي' : 'Mathematical Domain'}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    {lang === 'ar' ? 'إتقان العد التصاعدي والتنازلي، وتمييز الأشكال الهندسية.' : 'Counting and basic geometrical shape identification.'}
                  </p>
                  <div className="flex justify-between text-xs font-bold text-indigo-700">
                    <span>{lang === 'ar' ? 'مستوى الإتقان:' : 'Mastery:'}</span>
                    <span className="font-mono">88%</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-900 mb-2">
                    {lang === 'ar' ? 'المجال اللغوي والتواصلي' : 'Language Domain'}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    {lang === 'ar' ? 'التعرف على أصوات الحروف العربية والربط بين الكلمة والصورة.' : 'Letter sounds, phonics, and word-picture association.'}
                  </p>
                  <div className="flex justify-between text-xs font-bold text-emerald-700">
                    <span>{lang === 'ar' ? 'مستوى الإتقان:' : 'Mastery:'}</span>
                    <span className="font-mono">92%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
