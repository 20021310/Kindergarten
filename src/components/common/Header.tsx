import React, { useState } from 'react';
import { UserRole, Language, ChildProfile } from '../../types';
import { sound } from '../../services/sound';
import { Sparkles, Globe, Volume2, VolumeX, Shield, Lock, UserCheck, School } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  lang: Language;
  onToggleLang: () => void;
  activeChild: ChildProfile;
  parentPin: string;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  lang,
  onToggleLang,
  activeChild,
  parentPin,
  activeNavTab,
  onSelectNavTab
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingTargetRole, setPendingTargetRole] = useState<UserRole | null>(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const toggleSound = () => {
    sound.isMuted = !sound.isMuted;
    setIsMuted(sound.isMuted);
    if (!sound.isMuted) {
      sound.playSuccess();
    }
  };

  const handleRoleClick = (targetRole: UserRole) => {
    sound.playClick();
    if (currentRole === 'child' && (targetRole === 'parent' || targetRole === 'teacher')) {
      setPendingTargetRole(targetRole);
      setShowPinModal(true);
      setEnteredPin('');
      setPinError(false);
      return;
    }
    onSelectRole(targetRole);
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === parentPin || enteredPin === '1234') {
      sound.playSuccess();
      setShowPinModal(false);
      if (pendingTargetRole) {
        onSelectRole(pendingTargetRole);
      }
    } else {
      sound.playTryAgain();
      setPinError(true);
    }
  };

  const childNavItems = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'math', labelAr: 'الرياضيات', labelEn: 'Math' },
    { id: 'letters', labelAr: 'الحروف', labelEn: 'Letters' },
    { id: 'brain', labelAr: 'ألعاب الذكاء', labelEn: 'Brain Gym' },
    { id: 'videos', labelAr: 'فيديوهات', labelEn: 'Videos' },
    { id: 'rewards', labelAr: 'الجوائز', labelEn: 'Rewards' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRoleClick('landing')}
              className="text-xl sm:text-2xl font-black tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span>{lang === 'ar' ? 'براعم القصيم' : 'Baraem Qassim'}</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Contextual based on role) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {currentRole === 'child' ? (
              childNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNavTab(item.id);
                  }}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    activeNavTab === item.id
                      ? 'text-indigo-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))
            ) : currentRole === 'parent' ? (
              <>
                <button
                  onClick={() => onSelectNavTab('overview')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'overview' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'نظرة عامة' : 'Overview'}
                </button>
                <button
                  onClick={() => onSelectNavTab('progress')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'progress' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'التقدم والمقاييس' : 'Progress'}
                </button>
                <button
                  onClick={() => onSelectNavTab('screentime')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'screentime' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'أوقات الشاشة والتحكم' : 'Screen Time'}
                </button>
              </>
            ) : currentRole === 'teacher' ? (
              <>
                <button
                  onClick={() => onSelectNavTab('classes')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'classes' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'الفصول والطلاب' : 'Classes & Students'}
                </button>
                <button
                  onClick={() => onSelectNavTab('assignments')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'assignments' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'الواجبات والأنشطة' : 'Assignments'}
                </button>
                <button
                  onClick={() => onSelectNavTab('cms')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 ${activeNavTab === 'cms' ? 'text-indigo-600 font-bold' : ''}`}
                >
                  {lang === 'ar' ? 'إدارة المحتوى (CMS)' : 'Content CMS'}
                </button>
                <button
                  onClick={() => onSelectNavTab('ai_studio')}
                  className={`hover:text-slate-900 transition-colors cursor-pointer py-1 flex items-center gap-1 ${activeNavTab === 'ai_studio' ? 'text-indigo-600 font-bold' : 'text-purple-600 hover:text-purple-700'}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'استوديو يوتيوب الذكي' : 'YouTube AI Studio'}</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onSelectRole('child')} className="hover:text-slate-900 transition-colors cursor-pointer">
                  {lang === 'ar' ? 'منصة الأطفال' : 'Kids Hub'}
                </button>
                <button onClick={() => onSelectRole('parent')} className="hover:text-slate-900 transition-colors cursor-pointer">
                  {lang === 'ar' ? 'لوحة ولي الأمر' : 'Parents'}
                </button>
                <button onClick={() => onSelectRole('teacher')} className="hover:text-slate-900 transition-colors cursor-pointer">
                  {lang === 'ar' ? 'بوابة المعلمات' : 'Teachers'}
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Actions (Role Switcher Pill, Sound, Lang, Avatar) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick role switcher dropdown / segmented pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700">
              <button
                onClick={() => handleRoleClick('child')}
                className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  currentRole === 'child' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-indigo-600'
                }`}
                title={lang === 'ar' ? 'وضع الطفل' : 'Child Mode'}
              >
                <span>🧒</span>
                <span className="hidden sm:inline">{lang === 'ar' ? 'الطفل' : 'Child'}</span>
              </button>
              <button
                onClick={() => handleRoleClick('parent')}
                className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  currentRole === 'parent' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-indigo-600'
                }`}
                title={lang === 'ar' ? 'لوحة الوالدين' : 'Parent Dashboard'}
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'الوالدين' : 'Parent'}</span>
              </button>
              <button
                onClick={() => handleRoleClick('teacher')}
                className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  currentRole === 'teacher' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-indigo-600'
                }`}
                title={lang === 'ar' ? 'بوابة المعلم' : 'Teacher Portal'}
              >
                <School className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'المعلم' : 'Teacher'}</span>
              </button>
            </div>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isMuted ? (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute') : (lang === 'ar' ? 'كتم الصوت' : 'Mute')}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Child Avatar indicator with stars */}
            {currentRole === 'child' && (
              <div
                onClick={() => {
                  sound.playClick();
                  onSelectNavTab('rewards');
                }}
                className="flex items-center gap-2 bg-indigo-50/80 hover:bg-indigo-100/90 py-1 px-2 rounded-2xl cursor-pointer transition-all border border-indigo-100"
              >
                <img
                  src={activeChild.avatarUrl}
                  alt={activeChild.nameAr}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-400"
                />
                <span className="text-xs font-bold text-indigo-900 hidden sm:inline">
                  {lang === 'ar' ? activeChild.nameAr : activeChild.name}
                </span>
                <span className="text-xs font-extrabold text-amber-600 flex items-center gap-0.5">
                  ⭐ <span className="font-mono tabular-nums">{activeChild.stars}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Parental Gate PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-indigo-600" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {lang === 'ar' ? 'بوابة أولياء الأمور والمعلمين' : 'Parent & Teacher Gate'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'ar'
                ? 'لحماية الأطفال، يرجى إدخال الرمز السري للوصول (الرمز الافتراضي: 1234)'
                : 'For child safety, please enter your parental PIN to enter (Default: 1234)'}
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={4}
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                  placeholder="••••"
                  className={`w-36 text-center text-2xl font-mono tracking-widest py-2 px-3 border rounded-xl mx-auto block outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                    pinError ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {pinError && (
                  <p className="text-xs text-red-500 mt-1">
                    {lang === 'ar' ? 'رمز غير صحيح، حاول مرة أخرى' : 'Incorrect PIN, please try again'}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'دخول' : 'Unlock'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
