import {
  ChildProfile,
  ActivityItem,
  VideoItem,
  Badge,
  Accessory,
  ActivityAttempt,
  TeacherClass,
  ClassAssignment,
  WeeklyStat
} from '../types';

export const INITIAL_CHILDREN: ChildProfile[] = [
  {
    id: 'child-1',
    name: 'Noura Al-Harbi',
    nameAr: 'نورة الحربي',
    age: 5,
    gender: 'girl',
    school: 'روضة النخيل الأهلية - بريدة',
    className: 'فصل الأبطال (KG2)',
    avatarUrl: '/src/assets/images/avatar_saudi_kindergarten_girl_1791354675368.jpg',
    stars: 230,
    currentStreak: 7,
    lessonsCompleted: 24,
    accuracy: 92,
    studyTimeMinutes: 330, // 5h 30m
    equippedBadgeId: 'badge-top-achiever',
    unlockedBadgeIds: ['badge-starter', 'badge-reader', 'badge-explorer', 'badge-helper', 'badge-top-achiever'],
    unlockedAccessoryIds: ['acc-bag', 'acc-headphones', 'acc-pencil', 'acc-bottle'],
    equippedAccessoryId: 'acc-bag',
    screenTimeLimitMinutes: 45,
    screenTimeUsedMinutes: 20,
    needsPracticeSkills: ['مقارنة الأعداد (أكبر من وأصغر من)', 'كتابة حرف الثاء'],
    masteredSkills: ['العد من 1 إلى 10', 'التعرف على الحروف (أ، ب، ت)', 'تمييز الأشكال الأساسية']
  },
  {
    id: 'child-2',
    name: 'Fahad Al-Mutairi',
    nameAr: 'فهد المطيري',
    age: 5,
    gender: 'boy',
    school: 'روضة النخيل الأهلية - بريدة',
    className: 'فصل الأبطال (KG2)',
    avatarUrl: '/src/assets/images/mascot_qassim_dragon_1791354663172.jpg',
    stars: 185,
    currentStreak: 5,
    lessonsCompleted: 18,
    accuracy: 86,
    studyTimeMinutes: 240,
    equippedBadgeId: 'badge-explorer',
    unlockedBadgeIds: ['badge-starter', 'badge-explorer', 'badge-helper'],
    unlockedAccessoryIds: ['acc-bag', 'acc-pencil'],
    equippedAccessoryId: 'acc-pencil',
    screenTimeLimitMinutes: 40,
    screenTimeUsedMinutes: 15,
    needsPracticeSkills: ['تمييز حرف الجيم والحاء'],
    masteredSkills: ['العد حتى 5', 'الألوان']
  },
  {
    id: 'child-3',
    name: 'Sara Al-Tuwaijri',
    nameAr: 'سارة التويجري',
    age: 6,
    gender: 'girl',
    school: 'روضة النخيل الأهلية - بريدة',
    className: 'فصل العباقرة (KG2)',
    avatarUrl: '/src/assets/images/avatar_saudi_kindergarten_girl_1791354675368.jpg',
    stars: 310,
    currentStreak: 9,
    lessonsCompleted: 31,
    accuracy: 96,
    studyTimeMinutes: 420,
    equippedBadgeId: 'badge-math-whiz',
    unlockedBadgeIds: ['badge-starter', 'badge-reader', 'badge-explorer', 'badge-helper', 'badge-top-achiever', 'badge-math-whiz'],
    unlockedAccessoryIds: ['acc-bag', 'acc-headphones', 'acc-pencil', 'acc-bottle'],
    equippedAccessoryId: 'acc-headphones',
    screenTimeLimitMinutes: 50,
    screenTimeUsedMinutes: 25,
    needsPracticeSkills: ['إكمال الأنماط الهندسية المعقدة'],
    masteredSkills: ['جمع الأعداد حتى 10', 'القراءة المبكرة']
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-starter',
    title: 'Starter Learner',
    titleAr: 'براعم البداية',
    description: 'Completed your very first kindergarten activity',
    descriptionAr: 'إكمال أول نشاط تعليمي في الروضة',
    icon: '🌱',
    color: 'from-amber-400 to-amber-500'
  },
  {
    id: 'badge-reader',
    title: 'Reading Star',
    titleAr: 'نجم القراءة',
    description: 'Mastered 10 Arabic alphabet and phonics exercises',
    descriptionAr: 'إتقان 10 أنشطة للحروف والكلمات العربية',
    icon: '📖',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'badge-explorer',
    title: 'Curious Explorer',
    titleAr: 'مستكشف المعرفة',
    description: 'Explored science and brain challenges',
    descriptionAr: 'استكشاف تمارين التفكير والعلوم والبيئة',
    icon: '🧭',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'badge-helper',
    title: 'Polite Friend',
    titleAr: 'الطفل الخلوق',
    description: 'Watched Islamic manners and etiquette lessons',
    descriptionAr: 'مشاهدة وتطبيق آداب السلوك الإسلامية الراقية',
    icon: '🤝',
    color: 'from-purple-400 to-fuchsia-500'
  },
  {
    id: 'badge-top-achiever',
    title: 'Top Achiever',
    titleAr: 'بطل الإنجاز',
    description: 'Collected over 100 shining stars',
    descriptionAr: 'جمع أكثر من 100 نجمة ذهبية براقة',
    icon: '🏆',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'badge-math-whiz',
    title: 'Math Whiz',
    titleAr: 'عبقري الرياضيات',
    description: 'Achieved 90%+ in counting and addition',
    descriptionAr: 'تحقيق دقة أكثر من 90% في أنشطة الحساب',
    icon: '🔢',
    color: 'from-indigo-500 to-purple-600'
  }
];

export const INITIAL_ACCESSORIES: Accessory[] = [
  { id: 'acc-bag', title: 'Adventure Backpack', titleAr: 'حقيبة المغامرات الملونة', icon: '🎒', type: 'bag', costStars: 30 },
  { id: 'acc-headphones', title: 'Smart Audio Headset', titleAr: 'سماعات البطل الذكية', icon: '🎧', type: 'headphones', costStars: 50 },
  { id: 'acc-pencil', title: 'Golden Star Pencil', titleAr: 'قلم الإبداع الذهبي', icon: '✏️', type: 'badge', costStars: 40 },
  { id: 'acc-bottle', title: 'Fresh Water Bottle', titleAr: 'قارورة الطاقة والانتعاش', icon: '🍼', type: 'badge', costStars: 25 }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  // Math Activities
  {
    id: 'math-1',
    title: 'Fruit Counting Adventure',
    titleAr: 'مغامرة عد الفواكه ورطب القصيم',
    category: 'math',
    level: 1,
    description: 'Count delicious apples and Qassim sweet dates from 1 to 5.',
    descriptionAr: 'تعلّم عد التفاح ورطب القصيم اللذيذ من 1 إلى 5 بأسلوب تفاعلي.',
    durationMinutes: 3,
    starsReward: 10,
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    iconName: 'Apple',
    skillName: 'Counting 1-5',
    skillNameAr: 'العد من 1 إلى 5',
    recommendedAge: '4-5 سنوات'
  },
  {
    id: 'math-2',
    title: 'Number Recognition 1-10',
    titleAr: 'التعرف على الأرقام حتى 10',
    category: 'math',
    level: 2,
    description: 'Recognize Arabic numerals from 1 to 10 and match with cute animals.',
    descriptionAr: 'التعرف على الأرقام من 1 إلى 10 ومطابقتها مع الحيوانات الجميلة.',
    durationMinutes: 4,
    starsReward: 12,
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    iconName: 'Calculator',
    skillName: 'Numbers 1-10',
    skillNameAr: 'الأرقام 1-10',
    recommendedAge: '4-6 سنوات'
  },
  {
    id: 'math-3',
    title: 'Simple Fruit Addition',
    titleAr: 'جمع الفواكه اللذيذة (1-10)',
    category: 'math',
    level: 3,
    description: 'Combine items together to learn simple additions visually.',
    descriptionAr: 'اجمع حبات الفاكهة معاً لتكتشف المجموع بطريقة بصرية ممتعة.',
    durationMinutes: 5,
    starsReward: 15,
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    iconName: 'PlusCircle',
    skillName: 'Basic Addition',
    skillNameAr: 'الجمع البسيط',
    recommendedAge: '5-6 سنوات'
  },
  {
    id: 'math-4',
    title: 'Shapes & Patterns in Qassim',
    titleAr: 'الأشكال الهندسية ونخيل القصيم',
    category: 'math',
    level: 3,
    description: 'Identify circles, triangles, squares, and patterns in nature.',
    descriptionAr: 'تمييز الدائرة والمثلث والمربع والأنماط في البيئة والروضة.',
    durationMinutes: 4,
    starsReward: 12,
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    iconName: 'Shapes',
    skillName: 'Geometry & Shapes',
    skillNameAr: 'الأشكال والأنماط',
    recommendedAge: '4-6 سنوات'
  },

  // Arabic Language Activities
  {
    id: 'lang-1',
    title: 'Arabic Letters: Alif to Khaa',
    titleAr: 'رحلة الحروف: من الألف إلى الخاء',
    category: 'language',
    level: 1,
    description: 'Listen to the letter sounds and match with Arabic words.',
    descriptionAr: 'استمع لأصوات الحروف العربية وطابق الحرف مع صورته وصوته.',
    durationMinutes: 4,
    starsReward: 10,
    thumbnailUrl: '/src/assets/images/card_arabic_alphabet_reading_1791354700682.jpg',
    iconName: 'BookOpen',
    skillName: 'Arabic Alphabet',
    skillNameAr: 'الحروف الهجائية',
    recommendedAge: '4-5 سنوات'
  },
  {
    id: 'lang-2',
    title: 'Word & Picture Matching',
    titleAr: 'مطابقة الكلمات والصور',
    category: 'language',
    level: 2,
    description: 'Match words like lion, palm tree, and apple with their pictures.',
    descriptionAr: 'طابق الكلمات اللطيفة مثل أسد، نخلة، تفاحة مع الصور المناسبة.',
    durationMinutes: 4,
    starsReward: 12,
    thumbnailUrl: '/src/assets/images/card_arabic_alphabet_reading_1791354700682.jpg',
    iconName: 'Sparkles',
    skillName: 'Vocabulary',
    skillNameAr: 'المفردات اللغوية',
    recommendedAge: '5-6 سنوات'
  },

  // Brain Gym Activities
  {
    id: 'brain-1',
    title: 'Memory Cards Challenge',
    titleAr: 'تحدي بطاقات الذاكرة السريعة',
    category: 'brain',
    level: 1,
    description: 'Flip and match pairs of colorful friendly kindergarten cards.',
    descriptionAr: 'اقلب البطاقات واعثر على الصور المتطابقة لتنشيط الذاكرة والتركيز.',
    durationMinutes: 3,
    starsReward: 10,
    thumbnailUrl: '/src/assets/images/mascot_qassim_dragon_1791354663172.jpg',
    iconName: 'Brain',
    skillName: 'Visual Memory',
    skillNameAr: 'الذاكرة البصرية',
    recommendedAge: '4-6 سنوات'
  },
  {
    id: 'brain-2',
    title: 'Color & Shape Sequence',
    titleAr: 'إكمال تسلسل الأنماط الذكية',
    category: 'brain',
    level: 2,
    description: 'Look at the pattern and pick what comes next.',
    descriptionAr: 'شاهد الترتيب واكتشف الشكل التالي لإكمال النمط المنطقي.',
    durationMinutes: 4,
    starsReward: 12,
    thumbnailUrl: '/src/assets/images/mascot_qassim_dragon_1791354663172.jpg',
    iconName: 'Puzzle',
    skillName: 'Pattern Recognition',
    skillNameAr: 'إدراك الأنماط',
    recommendedAge: '5-6 سنوات'
  },

  // Attention & Observation
  {
    id: 'attention-1',
    title: 'Find the Different Object',
    titleAr: 'اكتشف العنصر المختلف',
    category: 'attention',
    level: 1,
    description: 'Spot the object that does not belong to the group.',
    descriptionAr: 'دقق جيداً واعثر على الصورة المختلفة بين المجموعة بذكاء.',
    durationMinutes: 3,
    starsReward: 10,
    thumbnailUrl: '/src/assets/images/mascot_qassim_dragon_1791354663172.jpg',
    iconName: 'Eye',
    skillName: 'Observation',
    skillNameAr: 'قوة الملاحظة',
    recommendedAge: '4-6 سنوات'
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'The Arabic Letters Song with Mishal',
    titleAr: 'أنشودة الحروف الهجائية مع مشعل',
    duration: '2:45',
    category: 'letters',
    categoryAr: 'الحروف العربية',
    ageRecommendation: '4-6 سنوات',
    thumbnailUrl: '/src/assets/images/card_arabic_alphabet_reading_1791354700682.jpg',
    description: 'Sing along and learn the sounds of Arabic letters from Alif to Yaa.',
    descriptionAr: 'أنشودة إيقاعية هادئة تعلّم نطق الحروف العربية الهجائية بطريقة محببة.',
    videoPlaceholderTheme: 'letters',
    subtitles: [
      { time: 0, textAr: 'ألف.. باء.. تاء.. ثاء! هيا نتعلم معاً يا أصدقاء', textEn: 'Alif, Baa, Taa, Thaa! Let us learn together friends' },
      { time: 5, textAr: 'جيم.. حاء.. خاء.. ما أجمل لغتنا العربية!', textEn: 'Jeem, Haa, Khaa.. How beautiful is our Arabic language!' }
    ],
    checkpointQuiz: {
      questionAr: 'ما هو الحرف الذي تبدأ به كلمة "أسد"؟',
      questionEn: 'Which letter starts the word "Asad" (Lion)?',
      optionsAr: ['أ (ألف)', 'ب (باء)', 'ت (تاء)'],
      optionsEn: ['A (Alif)', 'B (Baa)', 'T (Taa)'],
      correctIndex: 0
    }
  },
  {
    id: 'vid-2',
    title: 'Counting Camels & Palm Trees in Qassim',
    titleAr: 'عد النخيل والجمال في واحة القصيم',
    duration: '3:10',
    category: 'numbers',
    categoryAr: 'الأرقام والحساب',
    ageRecommendation: '4-6 سنوات',
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    description: 'Count together from 1 to 10 in a sunny Saudi palm oasis.',
    descriptionAr: 'رحلة كرتونية ممتعة بين نخيل القصيم لعد النخلات والتمر والجمال.',
    videoPlaceholderTheme: 'oasis',
    subtitles: [
      { time: 0, textAr: 'واحد.. اثنان.. ثلاثة.. نخيل خضراء تتمايل في الهواء', textEn: 'One, two, three.. Green palms swaying in the breeze' },
      { time: 6, textAr: 'أربعة.. خمسة.. ما أروع واحتنا الجميلة في القصيم!', textEn: 'Four, five.. What a wonderful oasis in Qassim!' }
    ],
    checkpointQuiz: {
      questionAr: 'كم عدد النخيل التي عددناها أولاً؟',
      questionEn: 'How many palms did we count first?',
      optionsAr: ['3 نخيل', '5 نخيل', '1 نخلة'],
      optionsEn: ['3 palms', '5 palms', '1 palm'],
      correctIndex: 0
    }
  },
  {
    id: 'vid-3',
    title: 'Good Manners: Eating & Greeting Friends',
    titleAr: 'آداب الطعام وإلقاء السلام في الروضة',
    duration: '2:20',
    category: 'manners',
    categoryAr: 'الآداب والقيم',
    ageRecommendation: '4-6 سنوات',
    thumbnailUrl: '/src/assets/images/mascot_qassim_dragon_1791354663172.jpg',
    description: 'Learn to say Bismillah before eating and Salam Alaykum to classmates.',
    descriptionAr: 'سلوكيات راقية: التسمية قبل الأكل واستخدام اليد اليمنى وإفشاء السلام.',
    videoPlaceholderTheme: 'manners',
    subtitles: [
      { time: 0, textAr: 'قبل أن نأكل طعامنا الشهي.. نقول: بسم الله', textEn: 'Before eating our delicious food, we say: Bismillah' },
      { time: 5, textAr: 'وعندما نلتقي بأصدقائنا في الروضة.. نقول: السلام عليكم', textEn: 'And when meeting friends at kindergarten, we say: Salam Alaykum' }
    ],
    checkpointQuiz: {
      questionAr: 'ماذا نقول قبل أن نبدأ بتناول وجبة الطعام؟',
      questionEn: 'What do we say before starting our meal?',
      optionsAr: ['بسم الله', 'الحمد لله', 'شكراً لك'],
      optionsEn: ['Bismillah', 'Alhamdulillah', 'Thank you'],
      correctIndex: 0
    }
  },
  {
    id: 'vid-4',
    title: 'Colors of Nature: Golden Desert & Green Palms',
    titleAr: 'ألوان الطبيعة: رمال ذهبية ونخيل خضراء',
    duration: '2:50',
    category: 'colors',
    categoryAr: 'الألوان والعلوم',
    ageRecommendation: '4-5 سنوات',
    thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
    description: 'Explore green, yellow, red, and blue in our local environment.',
    descriptionAr: 'اكتشف الألوان من حولنا في الطبيعة: الأخضر، الأصفر، الأحمر، والأزرق.',
    videoPlaceholderTheme: 'colors',
    subtitles: [
      { time: 0, textAr: 'اللون الأخضر هو لون سعف النخيل وأوراق الشجر', textEn: 'Green is the color of palm fronds and tree leaves' },
      { time: 5, textAr: 'والأصفر هو لون رمال الصحراء وأشعة الشمس الدافئة', textEn: 'Yellow is the warm sunlight and golden sands' }
    ],
    checkpointQuiz: {
      questionAr: 'ما هو لون سعف النخيل في الواحة؟',
      questionEn: 'What color are palm fronds in the oasis?',
      optionsAr: ['أخضر', 'أزرق', 'أحمر'],
      optionsEn: ['Green', 'Blue', 'Red'],
      correctIndex: 0
    }
  }
];

export const INITIAL_CLASSES: TeacherClass[] = [
  {
    id: 'class-1',
    name: 'Champions Class (KG2)',
    nameAr: 'فصل الأبطال (روضة 2)',
    schoolName: 'Al-Nakheel Kindergarten - Buraidah',
    schoolNameAr: 'روضة النخيل النموذجية - بريدة',
    gradeLevel: 'KG2 (5-6 سنوات)',
    studentIds: ['child-1', 'child-2']
  },
  {
    id: 'class-2',
    name: 'Geniuses Class (KG2)',
    nameAr: 'فصل العباقرة (روضة 2)',
    schoolName: 'Al-Nakheel Kindergarten - Buraidah',
    schoolNameAr: 'روضة النخيل النموذجية - بريدة',
    gradeLevel: 'KG2 (5-6 سنوات)',
    studentIds: ['child-3']
  }
];

export const INITIAL_ASSIGNMENTS: ClassAssignment[] = [
  {
    id: 'asg-1',
    title: 'Weekly Math Challenge: Fruit Counting',
    titleAr: 'تحدي الأسبوع: عد الفواكه ورطب القصيم',
    activityId: 'math-1',
    classId: 'class-1',
    category: 'math',
    dueDate: '2026-10-15',
    assignedDate: '2026-10-06',
    completedStudentIds: ['child-1']
  },
  {
    id: 'asg-2',
    title: 'Phonics Lesson: Arabic Alphabet 1',
    titleAr: 'واجب الحروف: أصوات الحروف الهجائية',
    activityId: 'lang-1',
    classId: 'class-1',
    category: 'language',
    dueDate: '2026-10-14',
    assignedDate: '2026-10-06',
    completedStudentIds: ['child-1', 'child-2']
  }
];

export const WEEKLY_STATS: WeeklyStat[] = [
  { dayName: 'Sun', dayNameAr: 'الأحد', minutes: 45, activitiesCount: 4 },
  { dayName: 'Mon', dayNameAr: 'الإثنين', minutes: 50, activitiesCount: 5 },
  { dayName: 'Tue', dayNameAr: 'الثلاثاء', minutes: 35, activitiesCount: 3 },
  { dayName: 'Wed', dayNameAr: 'الأربعاء', minutes: 60, activitiesCount: 6 },
  { dayName: 'Thu', dayNameAr: 'الخميس', minutes: 55, activitiesCount: 5 },
  { dayName: 'Fri', dayNameAr: 'الجمعة', minutes: 20, activitiesCount: 2 },
  { dayName: 'Sat', dayNameAr: 'السبت', minutes: 65, activitiesCount: 6 }
];

export const RECENT_ATTEMPTS: ActivityAttempt[] = [
  {
    id: 'att-1',
    childId: 'child-1',
    activityId: 'math-3',
    activityTitle: 'Simple Fruit Addition',
    activityTitleAr: 'جمع الفواكه اللذيذة',
    category: 'math',
    score: 100,
    totalQuestions: 5,
    accuracy: 100,
    durationSeconds: 160,
    timestamp: '2026-10-06 17:30',
    starsEarned: 15
  },
  {
    id: 'att-2',
    childId: 'child-1',
    activityId: 'lang-1',
    activityTitle: 'Arabic Letters: Alif to Khaa',
    activityTitleAr: 'رحلة الحروف: من الألف إلى الخاء',
    category: 'language',
    score: 90,
    totalQuestions: 5,
    accuracy: 90,
    durationSeconds: 180,
    timestamp: '2026-10-06 16:15',
    starsEarned: 10
  },
  {
    id: 'att-3',
    childId: 'child-1',
    activityId: 'brain-1',
    activityTitle: 'Memory Cards Challenge',
    activityTitleAr: 'تحدي بطاقات الذاكرة السريعة',
    category: 'brain',
    score: 100,
    totalQuestions: 4,
    accuracy: 100,
    durationSeconds: 95,
    timestamp: '2026-10-05 18:40',
    starsEarned: 10
  }
];

const STORAGE_KEY = 'baraem_qassim_state_v1';

export interface AppStateData {
  children: ChildProfile[];
  activeChildId: string;
  activities: ActivityItem[];
  videos: VideoItem[];
  badges: Badge[];
  accessories: Accessory[];
  classes: TeacherClass[];
  assignments: ClassAssignment[];
  attempts: ActivityAttempt[];
  parentPin: string;
}

export function loadStoredState(): AppStateData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {
    children: INITIAL_CHILDREN,
    activeChildId: INITIAL_CHILDREN[0].id,
    activities: INITIAL_ACTIVITIES,
    videos: INITIAL_VIDEOS,
    badges: INITIAL_BADGES,
    accessories: INITIAL_ACCESSORIES,
    classes: INITIAL_CLASSES,
    assignments: INITIAL_ASSIGNMENTS,
    attempts: RECENT_ATTEMPTS,
    parentPin: '1234'
  };
}

export function saveStoredState(state: AppStateData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
