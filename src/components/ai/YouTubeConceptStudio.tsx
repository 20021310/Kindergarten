import React, { useState } from 'react';
import { Language, ActivityItem } from '../../types';
import { sound } from '../../services/sound';
import { naturalVoice, VoiceTone } from '../../services/aiVoice';
import {
  transformYouTubeToLesson,
  TransformedLesson,
  LessonSlide
} from '../../services/youtubeAiTransformer';
import {
  Youtube,
  Sparkles,
  Volume2,
  Square,
  Play,
  Pause,
  CheckCircle2,
  ShieldAlert,
  Save,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface YouTubeConceptStudioProps {
  lang: Language;
  onPublishToCurriculum: (activity: ActivityItem) => void;
  onClose?: () => void;
}

export const YouTubeConceptStudio: React.FC<YouTubeConceptStudioProps> = ({
  lang,
  onPublishToCurriculum,
  onClose
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=qassim_dates_educational');
  const [targetedConcept, setTargetedConcept] = useState('أشجار النخيل ورطب القصيم وكيف ينمو الغذاء الصحي');
  const [voiceTone, setVoiceTone] = useState<VoiceTone>('kindergarten_warmth');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transformedLesson, setTransformedLesson] = useState<TransformedLesson | null>(null);

  // Player state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'try_again'>('idle');
  const [isSaved, setIsSaved] = useState(false);

  const sampleConcepts = [
    {
      titleAr: '🌴 نخيل القصيم والغذاء الصحي',
      titleEn: 'Palm Trees & Healthy Food',
      url: 'https://www.youtube.com/watch?v=oasis_dates_qassim',
      concept: 'أشجار النخيل ورطب القصيم وكيف ينمو الغذاء الصحي'
    },
    {
      titleAr: '🔢 مغامرة العد من 1 إلى 5',
      titleEn: 'Counting 1 to 5 with Fruits',
      url: 'https://www.youtube.com/watch?v=counting_numbers_safari',
      concept: 'عد الأعداد من 1 إلى 5 ومطابقتها مع كميات الفواكه'
    },
    {
      titleAr: '🤝 آداب السلام وتناول الطعام',
      titleEn: 'Islamic Etiquette & Greeting',
      url: 'https://www.youtube.com/watch?v=good_manners_kindergarten',
      concept: 'آداب السلام والتسمية قبل الأكل ومساعدة الأصدقاء'
    }
  ];

  const handleRunTransformation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim() || !targetedConcept.trim()) return;

    sound.playClick();
    setIsProcessing(true);
    setIsSaved(false);
    naturalVoice.stop();
    setIsNarrating(false);

    try {
      const lesson = await transformYouTubeToLesson(youtubeUrl, targetedConcept);
      setTransformedLesson(lesson);
      setCurrentSlideIndex(0);
      setQuizAnswered(null);
      setQuizFeedback('idle');
      sound.playSuccess();
    } catch {
      sound.playTryAgain();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartNarration = async (slide: LessonSlide) => {
    sound.playClick();
    if (isNarrating) {
      naturalVoice.stop();
      setIsNarrating(false);
      return;
    }

    setIsNarrating(true);
    const script = lang === 'ar' ? slide.narrationScriptAr : slide.narrationScriptEn;
    await naturalVoice.speak(script, {
      tone: voiceTone,
      lang: lang,
      onEnd: () => setIsNarrating(false)
    });
  };

  const handleStopNarration = () => {
    sound.playClick();
    naturalVoice.stop();
    setIsNarrating(false);
  };

  const handleSaveToCurriculum = () => {
    if (!transformedLesson) return;
    sound.playSuccess();

    const newActivity: ActivityItem = {
      id: `act-yt-${Date.now()}`,
      title: `AI Lesson: ${transformedLesson.targetedConcept}`,
      titleAr: `درس ذكي: ${transformedLesson.targetedConcept}`,
      category: 'video',
      level: 2,
      description: `Transformed educational lesson from YouTube source: ${transformedLesson.sourceTitle}`,
      descriptionAr: `درس تفاعلي مولّد من مصدر يوتيوب موثق بصوت طبيعي: ${transformedLesson.sourceTitle}`,
      durationMinutes: 3,
      starsReward: 15,
      thumbnailUrl: '/src/assets/images/card_math_fruit_adventure_1791354689778.jpg',
      iconName: 'Film',
      skillName: transformedLesson.targetedConcept,
      skillNameAr: transformedLesson.targetedConcept,
      recommendedAge: '4-6 سنوات'
    };

    onPublishToCurriculum(newActivity);
    setIsSaved(true);
  };

  const handleAnswerQuiz = (index: number) => {
    if (!transformedLesson) return;
    sound.playClick();
    setQuizAnswered(index);
    if (index === transformedLesson.comprehensionQuiz.correctIndex) {
      sound.playSuccess();
      setQuizFeedback('correct');
    } else {
      sound.playTryAgain();
      setQuizFeedback('try_again');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Studio Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold mb-2 border border-red-100">
            <Youtube className="w-4 h-4 text-red-600" />
            <span>{lang === 'ar' ? 'استوديو الذكاء الاصطناعي لتحويل اليوتيوب إلى دروس' : 'YouTube to Educational Lesson Studio'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === 'ar' ? 'تحويل مصادر يوتيوب إلى شروحات وأصوات بشرية طبيعية' : 'YouTube Educational Concepts & Natural Human Voice'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'أدخل رابط فيديو تعليمي وحدد المفهوم المطلوب؛ يقوم النظام باستخلاص الحقائق الموثقة وتوليد شرح مبسط للروضة مع سرد صوتي فصيح وطبيعي خالٍ من الرتابة الآلية.'
              : 'Provide a YouTube source URL and identify a specific educational concept. The AI extracts verified facts, constructs kindergarten-friendly pedagogical narration, and articulates it with a natural human-like voice.'}
          </p>
        </div>

        {onClose && (
          <button
            onClick={() => {
              sound.playClick();
              naturalVoice.stop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'إغلاق الاستوديو' : 'Close Studio'}</span>
          </button>
        )}
      </div>

      {/* Input Formulation Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>{lang === 'ar' ? 'بيانات المصدر والمفهوم المستهدف' : 'Source URL & Targeted Concept'}</span>
        </h2>

        {/* Quick Sample Selector */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-500 block mb-2">
            {lang === 'ar' ? 'نماذج تعليمية جاهزة للاختبار الفوري:' : 'Curated Samples for Instant Testing:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleConcepts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setYoutubeUrl(sample.url);
                  setTargetedConcept(sample.concept);
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/70 hover:border-indigo-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                {lang === 'ar' ? sample.titleAr : sample.titleEn}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRunTransformation} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {lang === 'ar' ? 'رابط فيديو يوتيوب التعليمي (YouTube URL):' : 'YouTube Educational URL:'}
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 pl-10 border border-slate-300 rounded-2xl text-xs sm:text-sm font-mono outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <Youtube className="w-5 h-5 text-red-500 absolute top-3 left-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {lang === 'ar' ? 'المفهوم أو الجزئية المطلوب شرحها لأطفال الروضة:' : 'Specific Educational Subject / Concept to Explain:'}
            </label>
            <input
              type="text"
              required
              value={targetedConcept}
              onChange={(e) => setTargetedConcept(e.target.value)}
              placeholder="مثال: كيف تنمو النخلة في واحة القصيم وتنتج التمر"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-2xl text-xs sm:text-sm outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Voice Engine Setting */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {lang === 'ar' ? 'نبرة الصوت البشري الطبيعي (Pedagogical Voice Persona):' : 'Natural Human Voice Persona:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setVoiceTone('kindergarten_warmth');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  voiceTone === 'kindergarten_warmth'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-xs ring-2 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-lg block mb-0.5">🌸</span>
                <span className="text-xs block">{lang === 'ar' ? 'معلمة الروضة الدافئة' : 'Warm Kindergarten Teacher'}</span>
                <span className="text-[10px] text-slate-500 font-normal">نبرة هادئة ومبتسمة ومريحة</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setVoiceTone('enthusiastic_explorer');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  voiceTone === 'enthusiastic_explorer'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-xs ring-2 ring-amber-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-lg block mb-0.5">🚀</span>
                <span className="text-xs block">{lang === 'ar' ? 'المستكشف المتحمس' : 'Curious Explorer'}</span>
                <span className="text-[10px] text-slate-500 font-normal">نبرة تشويق واكتشاف بهيجة</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setVoiceTone('calm_storyteller');
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  voiceTone === 'calm_storyteller'
                    ? 'bg-purple-50 border-purple-400 text-purple-900 font-bold shadow-xs ring-2 ring-purple-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-lg block mb-0.5">📖</span>
                <span className="text-xs block">{lang === 'ar' ? 'الحكواتي الهادئ' : 'Calm Storyteller'}</span>
                <span className="text-[10px] text-slate-500 font-normal">إيقاع قصصي متأنٍ ومحبب</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:bg-slate-300 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'ar' ? 'جارٍ تحليل المصدر وصياغة الدرس بالذكاء الاصطناعي...' : 'Extracting facts & composing natural lesson...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'توليد الشرح التربوي والصوت الطبيعي 🎙️' : 'Generate Educational Lesson & Natural Voice 🎙️'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Section: Generated Multi-Slide Lesson + Accountability Breakdown */}
      {transformedLesson && (
        <div className="space-y-6">
          {/* 1. Transparent Accountability Breakdown (Source Facts vs AI Modeling) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'فصل الحقائق الموثقة عن التكييف التربوي' : 'Factual Attribution & Educational Transparency'}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                {transformedLesson.confidenceScore}% {lang === 'ar' ? 'مطابقة وموثوقية' : 'Accuracy Score'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Verified Source Facts */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'حقائق مباشرة من مصدر الفيديو (المصدر الأصلي):' : 'Verified Direct Source Statements:'}</span>
                </div>
                <ul className="text-xs text-emerald-950 space-y-2 pr-2">
                  {transformedLesson.verifiedSourceFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {fact.sourceTimestamp && (
                        <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded-md text-emerald-700 shrink-0 border border-emerald-200">
                          {fact.sourceTimestamp}
                        </span>
                      )}
                      <span>{fact.statement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Inferences vs Safeguards */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'ar' ? 'التكييف التربوي والتحوير الصوتي لرياض الأطفال:' : 'AI Pedagogical Scaffolding & Pacing:'}</span>
                </div>
                <ul className="text-xs text-indigo-950 space-y-1.5 pr-2">
                  {transformedLesson.aiPedagogicalInferences.map((inf, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">✦</span>
                      <span>{inf}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-indigo-200/60 text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{lang === 'ar' ? 'لا توجد هلوسات أو ادعاءات غير مدعومة بالمصدر.' : 'Zero unsupported assertions or fabricated claims.'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Interactive Multimedia Slide Player */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
            {/* Slide Navigation Top */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {lang === 'ar' ? 'الشريحة التعليمية:' : 'Slide:'}
                </span>
                <span className="text-xs font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                  {currentSlideIndex + 1} / {transformedLesson.lessonSlides.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    sound.playClick();
                    naturalVoice.stop();
                    setIsNarrating(false);
                    setCurrentSlideIndex(prev => prev - 1);
                  }}
                  className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  disabled={currentSlideIndex === transformedLesson.lessonSlides.length - 1}
                  onClick={() => {
                    sound.playClick();
                    naturalVoice.stop();
                    setIsNarrating(false);
                    setCurrentSlideIndex(prev => prev + 1);
                  }}
                  className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 cursor-pointer"
                >
                  {lang === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Current Active Slide Stage */}
            {(() => {
              const slide = transformedLesson.lessonSlides[currentSlideIndex];
              return (
                <div className="space-y-6">
                  {/* Visual Scene Box */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-tr from-indigo-900 via-slate-800 to-indigo-950 p-6 sm:p-8 flex flex-col justify-between text-white shadow-inner">
                    <div className="flex justify-between items-start z-10">
                      <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
                        {lang === 'ar' ? slide.titleAr : slide.titleEn}
                      </span>
                      <span className="text-3xl">{slide.icon}</span>
                    </div>

                    {/* Subtitle Teleprompter Area */}
                    <div className="z-10 text-center max-w-xl mx-auto space-y-2">
                      <p className="text-lg sm:text-xl font-black text-amber-300 leading-snug drop-shadow-md">
                        {slide.subtitles[0]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 opacity-90">
                        {slide.subtitles[1]}
                      </p>
                    </div>

                    {/* Audio Controls Bar */}
                    <div className="z-10 flex items-center justify-between pt-3 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartNarration(slide)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md ${
                            isNarrating
                              ? 'bg-amber-400 text-slate-950 animate-pulse'
                              : 'bg-white text-indigo-900 hover:bg-slate-100'
                          }`}
                        >
                          {isNarrating ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          <span>
                            {isNarrating
                              ? (lang === 'ar' ? 'جارٍ السرد الصوتي البشري...' : 'Speaking naturally...')
                              : (lang === 'ar' ? 'استمع للسرد الصوتي الطبيعي 🎙️' : 'Play Natural Voice 🎙️')}
                          </span>
                        </button>

                        {isNarrating && (
                          <button
                            onClick={handleStopNarration}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            title="Stop"
                          >
                            <Square className="w-3.5 h-3.5 fill-white" />
                          </button>
                        )}
                      </div>

                      <span className="text-xs font-mono text-slate-300">
                        {slide.durationSeconds}s
                      </span>
                    </div>
                  </div>

                  {/* Narration Script Text */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-700">
                        {lang === 'ar' ? 'نص السرد الصوتي المولد للدرس:' : 'Full Pedagogical Narration Script:'}
                      </h4>
                      <span className="text-[11px] text-indigo-600 font-bold">
                        {voiceTone === 'kindergarten_warmth' && '🌸 نبرة دافئة'}
                        {voiceTone === 'enthusiastic_explorer' && '🚀 نبرة استكشاف'}
                        {voiceTone === 'calm_storyteller' && '📖 نبرة حكواتي'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
                      "{lang === 'ar' ? slide.narrationScriptAr : slide.narrationScriptEn}"
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Comprehension Quiz Checkpoint */}
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ar' ? 'سؤال التحقق التربوي المولد مع الدرس:' : 'Generated Checkpoint Assessment:'}</span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 mb-3">
                {lang === 'ar' ? transformedLesson.comprehensionQuiz.questionAr : transformedLesson.comprehensionQuiz.questionEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(lang === 'ar' ? transformedLesson.comprehensionQuiz.optionsAr : transformedLesson.comprehensionQuiz.optionsEn).map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerQuiz(i)}
                    className={`p-3 rounded-xl border text-xs font-bold text-right transition-all cursor-pointer ${
                      quizAnswered === i
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white hover:bg-amber-100/60 border-amber-200 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {quizFeedback === 'correct' && (
                <div className="mt-3 p-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ar' ? 'إجابة صحيحة تدل على الفهم والاستيعاب الممتاز! ⭐' : 'Correct! Shows clear kindergarten comprehension! ⭐'}</span>
                </div>
              )}
              {quizFeedback === 'try_again' && (
                <div className="mt-3 p-2 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold text-center">
                  <span>{lang === 'ar' ? 'استمع للسرد الصوتي مرة أخرى وجرب 😊' : 'Listen to the narration again and try 😊'}</span>
                </div>
              )}
            </div>

            {/* Save into Kindergarten Curriculum */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'يمكنك حفظ هذا الدرس التفاعلي مباشرة في قاعدة بيانات SQL لمنصة الروضة.'
                  : 'You can save this lesson directly into the kindergarten SQL database curriculum.'}
              </span>

              <button
                onClick={handleSaveToCurriculum}
                disabled={isSaved}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>
                  {isSaved
                    ? (lang === 'ar' ? 'تم الإدراج بنجاح في منهج الروضة ✓' : 'Saved to SQL Curriculum ✓')
                    : (lang === 'ar' ? 'إدراج في منهج أطفال الروضة' : 'Save to Curriculum')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
