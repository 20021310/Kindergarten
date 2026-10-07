import React, { useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  ActivityItem,
  Accessory,
  ClassAssignment,
  ChildProfile
} from './types';
import { loadStoredState, saveStoredState, WEEKLY_STATS, AppStateData } from './services/store';
import { sound } from './services/sound';
import { Header } from './components/common/Header';
import { ConfettiCanvas } from './components/common/ConfettiCanvas';
import { ChildHome } from './components/child/ChildHome';
import { MathGame } from './components/child/MathGame';
import { ArabicAlphabetGame } from './components/child/ArabicAlphabetGame';
import { BrainGymGame } from './components/child/BrainGymGame';
import { VideoLibrary } from './components/child/VideoLibrary';
import { RewardsView } from './components/child/RewardsView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { LandingHome } from './components/landing/LandingHome';
import { YouTubeConceptStudio } from './components/ai/YouTubeConceptStudio';

export default function App() {
  const [appState, setAppState] = useState<AppStateData>(() => loadStoredState());
  const [currentRole, setCurrentRole] = useState<UserRole>('child');
  const [lang, setLang] = useState<Language>('ar');
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [activeGameType, setActiveGameType] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sync RTL / LTR on language change
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Persist state changes
  useEffect(() => {
    saveStoredState(appState);
  }, [appState]);

  const activeChild: ChildProfile = appState.children.find((c: ChildProfile) => c.id === appState.activeChildId) || appState.children[0];

  const handleToggleLang = () => {
    sound.playClick();
    setLang((prev: Language) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    setActiveGameType(null);
    if (role === 'child') {
      setActiveNavTab('home');
    } else if (role === 'parent') {
      setActiveNavTab('overview');
    } else if (role === 'teacher') {
      setActiveNavTab('classes');
    }
  };

  const handleSelectNavTab = (tab: string) => {
    setActiveNavTab(tab);
    if (currentRole === 'child') {
      if (tab === 'home') {
        setActiveGameType(null);
      } else if (tab === 'math') {
        setActiveGameType('math');
      } else if (tab === 'letters') {
        setActiveGameType('letters');
      } else if (tab === 'brain') {
        setActiveGameType('brain');
      } else if (tab === 'videos') {
        setActiveGameType('videos');
      } else if (tab === 'rewards') {
        setActiveGameType('rewards');
      }
    }
  };

  // Launch specific activity
  const handleLaunchActivity = (act: ActivityItem) => {
    sound.playClick();
    if (act.category === 'math') {
      setActiveGameType('math');
      setActiveNavTab('math');
    } else if (act.category === 'language') {
      setActiveGameType('letters');
      setActiveNavTab('letters');
    } else if (act.category === 'brain' || act.category === 'attention') {
      setActiveGameType('brain');
      setActiveNavTab('brain');
    }
  };

  // Earning stars handler
  const handleEarnStars = (amount: number, activityTitle: string, category: 'math' | 'language' | 'brain' | 'video') => {
    setShowConfetti(true);
    sound.playStarEarned();

    setAppState((prev: AppStateData) => {
      const updatedChildren = prev.children.map((child: ChildProfile) => {
        if (child.id === prev.activeChildId) {
          const newStars = child.stars + amount;
          const newCompleted = child.lessonsCompleted + 1;
          const newStreak = child.currentStreak;

          // Check if top achiever badge should unlock
          const updatedBadges = [...child.unlockedBadgeIds];
          if (newStars >= 100 && !updatedBadges.includes('badge-top-achiever')) {
            updatedBadges.push('badge-top-achiever');
          }
          if (category === 'math' && !updatedBadges.includes('badge-math-whiz')) {
            updatedBadges.push('badge-math-whiz');
          }

          return {
            ...child,
            stars: newStars,
            lessonsCompleted: newCompleted,
            currentStreak: newStreak,
            unlockedBadgeIds: updatedBadges
          };
        }
        return child;
      });

      const newAttempt = {
        id: `att-${Date.now()}`,
        childId: prev.activeChildId,
        activityId: `act-${category}`,
        activityTitle: activityTitle,
        activityTitleAr: activityTitle,
        category: category,
        score: 100,
        totalQuestions: 5,
        accuracy: 95,
        durationSeconds: 120,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        starsEarned: amount
      };

      return {
        ...prev,
        children: updatedChildren,
        attempts: [newAttempt, ...prev.attempts]
      };
    });
  };

  // Equip accessory
  const handleEquipAccessory = (accId: string) => {
    setAppState((prev: AppStateData) => ({
      ...prev,
      children: prev.children.map((c: ChildProfile) => c.id === prev.activeChildId ? { ...c, equippedAccessoryId: accId } : c)
    }));
  };

  // Buy accessory with stars
  const handleBuyAccessory = (acc: Accessory) => {
    if (activeChild.stars < acc.costStars) {
      sound.playTryAgain();
      return;
    }
    sound.playBadgeUnlock();
    setShowConfetti(true);

    setAppState((prev: AppStateData) => ({
      ...prev,
      children: prev.children.map((c: ChildProfile) => {
        if (c.id === prev.activeChildId) {
          return {
            ...c,
            stars: c.stars - acc.costStars,
            unlockedAccessoryIds: [...c.unlockedAccessoryIds, acc.id],
            equippedAccessoryId: acc.id
          };
        }
        return c;
      })
    }));
  };

  // Screen time update
  const handleUpdateScreenTime = (childId: string, limitMinutes: number) => {
    setAppState((prev: AppStateData) => ({
      ...prev,
      children: prev.children.map((c: ChildProfile) => c.id === childId ? { ...c, screenTimeLimitMinutes: limitMinutes } : c)
    }));
  };

  // Parent PIN update
  const handleUpdateParentPin = (newPin: string) => {
    setAppState((prev: AppStateData) => ({ ...prev, parentPin: newPin }));
  };

  // Teacher create assignment
  const handleCreateAssignment = (asg: Omit<ClassAssignment, 'id' | 'completedStudentIds'>) => {
    const newAsg: ClassAssignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      completedStudentIds: []
    };
    setAppState((prev: AppStateData) => ({
      ...prev,
      assignments: [newAsg, ...prev.assignments]
    }));
  };

  // Teacher add activity to CMS
  const handleAddActivity = (newAct: ActivityItem) => {
    setAppState((prev: AppStateData) => ({
      ...prev,
      activities: [newAct, ...prev.activities]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Celebration Confetti */}
      <ConfettiCanvas
        active={showConfetti}
        durationMs={2800}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        lang={lang}
        onToggleLang={handleToggleLang}
        activeChild={activeChild}
        parentPin={appState.parentPin}
        activeNavTab={activeNavTab}
        onSelectNavTab={handleSelectNavTab}
      />

      {/* Main Body */}
      <main className="flex-1">
        {currentRole === 'landing' ? (
          <LandingHome
            lang={lang}
            onEnterRole={handleSelectRole}
          />
        ) : currentRole === 'parent' ? (
          <ParentDashboard
            childrenList={appState.children}
            activeChild={activeChild}
            weeklyStats={WEEKLY_STATS}
            attempts={appState.attempts}
            lang={lang}
            onSelectChild={(id: string) => setAppState((prev: AppStateData) => ({ ...prev, activeChildId: id }))}
            onUpdateScreenTime={handleUpdateScreenTime}
            onUpdateParentPin={handleUpdateParentPin}
          />
        ) : currentRole === 'teacher' ? (
          activeNavTab === 'ai_studio' ? (
            <YouTubeConceptStudio
              lang={lang}
              onPublishToCurriculum={handleAddActivity}
              onClose={() => setActiveNavTab('classes')}
            />
          ) : (
            <TeacherDashboard
              classes={appState.classes}
              childrenList={appState.children}
              assignments={appState.assignments}
              activities={appState.activities}
              lang={lang}
              onCreateAssignment={handleCreateAssignment}
              onAddActivity={handleAddActivity}
              onOpenAiStudio={() => setActiveNavTab('ai_studio')}
            />
          )
        ) : (
          /* Child Mode */
          <div className="py-4">
            {activeGameType === 'math' ? (
              <MathGame
                lang={lang}
                onBack={() => {
                  setActiveGameType(null);
                  setActiveNavTab('home');
                }}
                onEarnStars={(stars, title) => handleEarnStars(stars, title, 'math')}
              />
            ) : activeGameType === 'letters' ? (
              <ArabicAlphabetGame
                lang={lang}
                onBack={() => {
                  setActiveGameType(null);
                  setActiveNavTab('home');
                }}
                onEarnStars={(stars, title) => handleEarnStars(stars, title, 'language')}
              />
            ) : activeGameType === 'brain' ? (
              <BrainGymGame
                lang={lang}
                onBack={() => {
                  setActiveGameType(null);
                  setActiveNavTab('home');
                }}
                onEarnStars={(stars, title) => handleEarnStars(stars, title, 'brain')}
              />
            ) : activeGameType === 'videos' ? (
              <VideoLibrary
                videos={appState.videos}
                lang={lang}
                onBack={() => {
                  setActiveGameType(null);
                  setActiveNavTab('home');
                }}
                onEarnStars={(stars, title) => handleEarnStars(stars, title, 'video')}
              />
            ) : activeGameType === 'rewards' ? (
              <RewardsView
                child={activeChild}
                badges={appState.badges}
                accessories={appState.accessories}
                lang={lang}
                onBack={() => {
                  setActiveGameType(null);
                  setActiveNavTab('home');
                }}
                onEquipAccessory={handleEquipAccessory}
                onBuyAccessory={handleBuyAccessory}
              />
            ) : (
              <ChildHome
                child={activeChild}
                activities={appState.activities}
                lang={lang}
                onSelectCategory={(cat) => {
                  setActiveGameType(cat);
                  setActiveNavTab(cat);
                }}
                onLaunchActivity={handleLaunchActivity}
                onOpenVideos={() => {
                  setActiveGameType('videos');
                  setActiveNavTab('videos');
                }}
                onOpenRewards={() => {
                  setActiveGameType('rewards');
                  setActiveNavTab('rewards');
                }}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

