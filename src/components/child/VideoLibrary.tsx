import React, { useState } from 'react';
import { VideoItem, Language } from '../../types';
import { sound } from '../../services/sound';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, CheckCircle2, Subtitles, HelpCircle } from 'lucide-react';

interface VideoLibraryProps {
  videos: VideoItem[];
  lang: Language;
  onBack: () => void;
  onEarnStars: (amount: number, activityTitle: string, category: 'video') => void;
}

export const VideoLibrary: React.FC<VideoLibraryProps> = ({
  videos,
  lang,
  onBack,
  onEarnStars
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'try_again'>('idle');

  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'letters', labelAr: 'الحروف', labelEn: 'Letters' },
    { id: 'numbers', labelAr: 'الأرقام والعد', labelEn: 'Numbers' },
    { id: 'manners', labelAr: 'الآداب والسلوك', labelEn: 'Manners' },
    { id: 'colors', labelAr: 'الألوان والعلوم', labelEn: 'Colors & Science' }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  const handleOpenVideo = (vid: VideoItem) => {
    sound.playClick();
    setSelectedVideo(vid);
    setIsPlaying(true);
    setShowQuiz(false);
    setSelectedQuizAnswer(null);
    setQuizFeedback('idle');
  };

  const handleTogglePlay = () => {
    sound.playClick();
    setIsPlaying(prev => !prev);
  };

  const handleQuizAnswer = (idx: number) => {
    if (!selectedVideo) return;
    sound.playClick();
    setSelectedQuizAnswer(idx);

    if (idx === selectedVideo.checkpointQuiz.correctIndex) {
      sound.playSuccess();
      setQuizFeedback('correct');
      onEarnStars(8, selectedVideo.titleAr, 'video');
    } else {
      sound.playTryAgain();
      setQuizFeedback('try_again');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            if (selectedVideo) {
              setSelectedVideo(null);
            } else {
              onBack();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold cursor-pointer"
        >
          {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{selectedVideo ? (lang === 'ar' ? 'قائمة الفيديوهات' : 'All Videos') : (lang === 'ar' ? 'الرئيسية' : 'Home')}</span>
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          {lang === 'ar' ? 'سينما الروضة التعليمية 🎬' : 'Kindergarten Mini Theater 🎬'}
        </h1>

        <div className="w-16" />
      </div>

      {selectedVideo ? (
        /* Video Player Stage */
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-xl">
          {/* Animated Thematic Player Screen */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 flex flex-col justify-between p-6 shadow-inner">
            {/* Visual Screen Backdrop based on theme */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 opacity-90" />

            {/* Thematic Content Illustration */}
            <div className="relative z-10 my-auto text-center">
              <div className="text-6xl sm:text-7xl mb-3 animate-pulse">
                {selectedVideo.category === 'letters' && '🔤'}
                {selectedVideo.category === 'numbers' && '🌴'}
                {selectedVideo.category === 'manners' && '🤝'}
                {selectedVideo.category === 'colors' && '🎨'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white px-4">
                {lang === 'ar' ? selectedVideo.titleAr : selectedVideo.title}
              </h3>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1">
                {isPlaying ? (lang === 'ar' ? '▶️ جارٍ العرض التفاعلي...' : '▶️ Playing interactive lesson...') : (lang === 'ar' ? '⏸️ متوقف مؤقتاً' : '⏸️ Paused')}
              </p>
            </div>

            {/* Subtitles Bar (Child-friendly captions) */}
            {showSubtitles && (
              <div className="relative z-10 bg-black/75 backdrop-blur-xs text-white text-center py-2 px-4 rounded-xl max-w-lg mx-auto text-xs sm:text-sm font-semibold border border-white/10">
                <span>{lang === 'ar' ? selectedVideo.subtitles[0].textAr : selectedVideo.subtitles[0].textEn}</span>
              </div>
            )}

            {/* Player Controls Bar */}
            <div className="relative z-10 flex items-center justify-between text-white pt-3 border-t border-white/10 mt-2 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsPlaying(true);
                  }}
                  className="p-1 text-slate-300 hover:text-white cursor-pointer"
                  title="Replay"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="font-mono">{selectedVideo.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowSubtitles(prev => !prev);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                    showSubtitles ? 'bg-white/20 border-white/40 text-white' : 'border-white/10 text-slate-400'
                  }`}
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الترجمة' : 'CC'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setShowQuiz(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تحدي الفهم ⭐' : 'Quiz ⭐'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video Description & Checkpoint Quiz Section */}
          <div className="mt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'ar' ? selectedVideo.titleAr : selectedVideo.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'ar' ? selectedVideo.descriptionAr : selectedVideo.description}
                </p>
              </div>
              <AudioSpeakerButton
                text={lang === 'ar' ? selectedVideo.descriptionAr : selectedVideo.description}
                lang={lang}
              />
            </div>

            {/* Checkpoint Question Container */}
            {showQuiz && (
              <div className="mt-6 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⭐</span>
                  <h4 className="text-sm font-bold text-amber-950">
                    {lang === 'ar' ? 'سؤال بعد المشاهدة:' : 'Comprehension Checkpoint:'}
                  </h4>
                </div>

                <p className="text-sm font-semibold text-slate-800 mb-4">
                  {lang === 'ar' ? selectedVideo.checkpointQuiz.questionAr : selectedVideo.checkpointQuiz.questionEn}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(lang === 'ar' ? selectedVideo.checkpointQuiz.optionsAr : selectedVideo.checkpointQuiz.optionsEn).map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        selectedQuizAnswer === idx
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white hover:bg-amber-100/60 border-amber-200 text-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizFeedback === 'correct' && (
                  <div className="mt-4 p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'ar' ? 'إجابة رائعة! حصلت على 8 نجوم إضافية ⭐' : 'Awesome! You earned 8 bonus stars ⭐'}</span>
                  </div>
                )}
                {quizFeedback === 'try_again' && (
                  <div className="mt-4 p-2.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold text-center">
                    <span>{lang === 'ar' ? 'حاول مجدداً، استمع جيداً للأنشودة 😊' : 'Try again, listen closely to the lesson 😊'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Video Catalogue Grid */
        <div>
          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => handleOpenVideo(vid)}
                className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/95 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-indigo-600 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white font-mono text-[11px] px-2 py-0.5 rounded-md">
                    {vid.duration}
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {lang === 'ar' ? vid.titleAr : vid.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                  {lang === 'ar' ? vid.descriptionAr : vid.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2">
                  <span>{lang === 'ar' ? vid.categoryAr : vid.category}</span>
                  <span>{vid.ageRecommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
