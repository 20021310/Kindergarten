export type UserRole = 'child' | 'parent' | 'teacher' | 'landing';

export type Language = 'ar' | 'en';

export type ActivityCategory = 'math' | 'language' | 'brain' | 'attention' | 'video';

export interface ChildProfile {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  gender: 'boy' | 'girl';
  school: string;
  className: string;
  avatarUrl: string;
  stars: number;
  currentStreak: number;
  lessonsCompleted: number;
  accuracy: number;
  studyTimeMinutes: number;
  equippedBadgeId: string;
  unlockedBadgeIds: string[];
  unlockedAccessoryIds: string[];
  equippedAccessoryId?: string;
  screenTimeLimitMinutes: number;
  screenTimeUsedMinutes: number;
  needsPracticeSkills: string[];
  masteredSkills: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  titleAr: string;
  category: ActivityCategory;
  level: 1 | 2 | 3 | 4;
  description: string;
  descriptionAr: string;
  durationMinutes: number;
  starsReward: number;
  thumbnailUrl?: string;
  iconName: string;
  skillName: string;
  skillNameAr: string;
  recommendedAge: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleAr: string;
  duration: string;
  category: 'letters' | 'numbers' | 'science' | 'manners' | 'colors';
  categoryAr: string;
  ageRecommendation: string;
  thumbnailUrl?: string;
  description: string;
  descriptionAr: string;
  videoPlaceholderTheme: string;
  subtitles: {
    time: number;
    textAr: string;
    textEn: string;
  }[];
  checkpointQuiz: {
    questionAr: string;
    questionEn: string;
    optionsAr: string[];
    optionsEn: string[];
    correctIndex: number;
  };
}

export interface Badge {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface Accessory {
  id: string;
  title: string;
  titleAr: string;
  icon: string;
  type: 'hat' | 'bag' | 'headphones' | 'badge';
  costStars: number;
}

export interface ActivityAttempt {
  id: string;
  childId: string;
  activityId: string;
  activityTitle: string;
  activityTitleAr: string;
  category: ActivityCategory;
  score: number;
  totalQuestions: number;
  accuracy: number;
  durationSeconds: number;
  timestamp: string;
  starsEarned: number;
}

export interface TeacherClass {
  id: string;
  name: string;
  nameAr: string;
  schoolName: string;
  schoolNameAr: string;
  gradeLevel: string;
  studentIds: string[];
}

export interface ClassAssignment {
  id: string;
  title: string;
  titleAr: string;
  activityId: string;
  classId: string;
  category: ActivityCategory;
  dueDate: string;
  assignedDate: string;
  completedStudentIds: string[];
}

export interface WeeklyStat {
  dayName: string;
  dayNameAr: string;
  minutes: number;
  activitiesCount: number;
}
