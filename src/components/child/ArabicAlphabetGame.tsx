import React, { useState } from 'react';
import { Language } from '../../types';
import { sound } from '../../services/sound';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';

interface ArabicAlphabetGameProps {
  lang: Language;
  onBack: () => void;
  onEarnStars: (amount: number, activityTitle: string, category: 'language') => void;
}

interface LetterQuestion {
  id: number;
  letter: string;
  letterNameAr: string;
  letterNameEn: string;
  wordAr: string;
  wordEn: string;
  emoji: string;
  soundPronounce: string;
  options: string[];
}

const LETTER_QUESTIONS: LetterQuestion[] = [
  {
    id: 1,
    letter: 'أ',
    letterNameAr: 'ألف',
    letterNameEn: 'Alif',
    wordAr: 'أسد',
    wordEn: 'Lion',
    emoji: '🦁',
    soundPronounce: 'ألف.. أَ.. أسد',
    options: ['أ', 'ب', 'ت']
  },
  {
    id: 2,
    letter: 'ب',
    letterNameAr: 'باء',
    letterNameEn: 'Baa',
    wordAr: 'بطة',
    wordEn: 'Duck',
    emoji: '🦆',
    soundPronounce: 'باء.. بَ.. بطة',
    options: ['ت', 'ب', 'ث']
  },
  {
    id: 3,
    letter: 'ت',
    letterNameAr: 'تاء',
    letterNameEn: 'Taa',
    wordAr: 'تفاحة',
    wordEn: 'Apple',
    emoji: '🍎',
    soundPronounce: 'تاء.. تَ.. تفاحة',
    options: ['ج', 'أ', 'ت']
  },
  {
    id: 4,
    letter: 'ن',
    letterNameAr: 'نون',
    letterNameEn: 'Noon',
    wordAr: 'نخلة',
    wordEn: 'Palm Tree',
    emoji: '🌴',
    soundPronounce: 'نون.. نَ.. نخلة القصيم',
    options: ['م', 'ن', 'ل']
  },
  {
    id: 5,
    letter: 'ج',
    letterNameAr: 'جيم',
    letterNameEn: 'Jeem',
    wordAr: 'جمل',
    wordEn: 'Camel',
    emoji: '🐪',
    soundPronounce: 'جيم.. جَ.. جمل',
    options: ['ج', 'ح', 'خ']
  }
];

export const ArabicAlphabetGame: React.FC<ArabicAlphabetGameProps> = ({
  lang,
  onBack,
  onEarnStars
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'try_again'>('idle');
  const [completedAll, setCompletedAll] = useState(false);

  const currentQ = LETTER_QUESTIONS[currentIndex];

  const playLetterSound = () => {
    sound.playClick();
    sound.speakText(currentQ.soundPronounce, 'ar');
  };

  const handleSelectOption = (opt: string) => {
    sound.playClick();
    setSelectedOption(opt);
    setFeedback('idle');
  };

  const handleCheck = () => {
    if (!selectedOption) return;

    if (selectedOption === currentQ.letter) {
      sound.playSuccess();
      setFeedback('correct');
      onEarnStars(5, `حرف الـ ${currentQ.letterNameAr}`, 'language');

      setTimeout(() => {
        if (currentIndex < LETTER_QUESTIONS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOption(null);
          setFeedback('idle');
        } else {
          setCompletedAll(true);
          sound.playBadgeUnlock();
        }
      }, 1500);
    } else {
      sound.playTryAgain();
      setFeedback('try_again');
    }
  };

  const promptText = lang === 'ar'
    ? `ما هو الحرف الذي تبدأ به كلمة (${currentQ.wordAr})؟`
    : `Which letter starts the word (${currentQ.wordEn})?`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
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

        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
          <span className="font-mono tabular-nums">{currentIndex + 1}</span> / <span className="font-mono tabular-nums">{LETTER_QUESTIONS.length}</span>
        </div>

        <button
          onClick={playLetterSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>{lang === 'ar' ? 'استمع للحرف' : 'Hear Sound'}</span>
        </button>
      </div>

      {completedAll ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4">
            🌟
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {lang === 'ar' ? 'نجم الحروف والقراءة! 📚' : 'Reading & Letters Star! 📚'}
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            {lang === 'ar'
              ? 'أحسنت يا بطل! تعرّفت على أصوات الحروف العربية ونلت وسام القراءة.'
              : 'Super work! You recognized Arabic letter phonics and earned your badge.'}
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(0);
                setSelectedOption(null);
                setFeedback('idle');
                setCompletedAll(false);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إعادة التحدي' : 'Play Again'}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
            >
              {lang === 'ar' ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
          {/* Question title */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {promptText}
            </h2>
            <AudioSpeakerButton text={promptText} lang={lang} />
          </div>

          {/* Big Interactive Phonics Card (matching UI kit lion / cat phonics card) */}
          <div className="bg-gradient-to-b from-indigo-50/60 to-purple-50/40 rounded-3xl p-6 border border-indigo-100 mb-6 text-center">
            {/* The giant letter */}
            <div className="text-7xl sm:text-8xl font-black text-indigo-700 mb-2 font-serif select-none drop-shadow-xs">
              {currentQ.letter}
            </div>

            {/* Word and Emoji Illustration */}
            <div className="w-28 h-28 mx-auto bg-white rounded-3xl shadow-sm border border-indigo-100 flex items-center justify-center text-6xl mb-3">
              {currentQ.emoji}
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-xs border border-indigo-100">
              <button
                onClick={playLetterSound}
                className="p-1 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                title={lang === 'ar' ? 'استمع لنطق الكلمة' : 'Listen to word'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-base font-black text-slate-800">
                {lang === 'ar' ? currentQ.wordAr : currentQ.wordEn}
              </span>
            </div>
          </div>

          {/* Letter Options */}
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-500 mb-3 text-center">
              {lang === 'ar' ? 'اختر الحرف المطابق:' : 'Select the matching letter:'}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`h-16 sm:h-20 rounded-2xl text-3xl font-black transition-all cursor-pointer flex items-center justify-center font-serif ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-lg scale-105 ring-4 ring-indigo-200'
                        : 'bg-slate-50 hover:bg-indigo-50/70 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'ar' ? 'أحسنت يا ذكي! نطق وحرف صحيح ⭐' : 'Awesome! Correct letter sound ⭐'}</span>
            </div>
          )}

          {feedback === 'try_again' && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-center font-bold text-sm">
              <span>{lang === 'ar' ? 'قريب! استمع لصوت الحرف وجرب مرة أخرى 😊' : 'Almost! Listen to the sound and try again 😊'}</span>
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className={`w-full py-4 rounded-2xl font-black text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                !selectedOption
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white'
              }`}
            >
              <span>{lang === 'ar' ? 'تحقق من الحرف' : 'Check'}</span>
              <span>⭐</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
