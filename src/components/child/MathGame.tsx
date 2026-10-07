import React, { useState } from 'react';
import { Language } from '../../types';
import { sound } from '../../services/sound';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2, RefreshCw } from 'lucide-react';

interface MathGameProps {
  lang: Language;
  onBack: () => void;
  onEarnStars: (amount: number, activityTitle: string, category: 'math') => void;
}

interface Question {
  id: number;
  level: number;
  promptAr: string;
  promptEn: string;
  groupA: { icon: string; count: number; nameAr: string; nameEn: string };
  groupB?: { icon: string; count: number; nameAr: string; nameEn: string };
  operator?: '+' | '-';
  correctAnswer: number;
  options: number[];
  hintAr: string;
  hintEn: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    level: 1,
    promptAr: 'عد ثمار رطب القصيم اللذيذة! كم حبة تمر تشاهد؟',
    promptEn: 'Count the delicious Qassim dates! How many are there?',
    groupA: { icon: '🌴', count: 3, nameAr: 'رطب', nameEn: 'Dates' },
    correctAnswer: 3,
    options: [2, 3, 4, 5],
    hintAr: 'المس كل رطبة لتعدها: 1.. 2.. 3',
    hintEn: 'Touch each date to count: 1.. 2.. 3'
  },
  {
    id: 2,
    level: 2,
    promptAr: 'اجمع الفواكه: ما هو مجموع التفاح والموز؟',
    promptEn: 'Add the fruits: What is the total?',
    groupA: { icon: '🍎', count: 3, nameAr: 'تفاح', nameEn: 'Apples' },
    operator: '+',
    groupB: { icon: '🍌', count: 2, nameAr: 'موز', nameEn: 'Bananas' },
    correctAnswer: 5,
    options: [4, 5, 6, 7, 8],
    hintAr: '3 تفاحات + موزتان = 5 فواكه',
    hintEn: '3 apples + 2 bananas = 5 fruits'
  },
  {
    id: 3,
    level: 3,
    promptAr: 'كم حبة فراولة نرى هنا؟',
    promptEn: 'How many strawberries do you see?',
    groupA: { icon: '🍓', count: 4, nameAr: 'فراولة', nameEn: 'Strawberries' },
    correctAnswer: 4,
    options: [3, 4, 5, 6],
    hintAr: 'أربعة حبات حمراء لذيذة',
    hintEn: 'Four sweet red strawberries'
  },
  {
    id: 4,
    level: 3,
    promptAr: 'مغامرة الجمع: 4 برتقالات + 3 برتقالات، كم المجموع؟',
    promptEn: 'Addition adventure: 4 oranges + 3 oranges, what is the total?',
    groupA: { icon: '🍊', count: 4, nameAr: 'برتقال', nameEn: 'Oranges' },
    operator: '+',
    groupB: { icon: '🍊', count: 3, nameAr: 'برتقال', nameEn: 'Oranges' },
    correctAnswer: 7,
    options: [5, 6, 7, 8, 9],
    hintAr: 'عد جميع البرتقالات معاً لتصل للرقم 7',
    hintEn: 'Count all oranges together to reach 7'
  },
  {
    id: 5,
    level: 4,
    promptAr: 'لدينا 6 تفاحات، أكلنا منها 2. كم تبقى؟',
    promptEn: 'We have 6 apples, we ate 2. How many are left?',
    groupA: { icon: '🍎', count: 6, nameAr: 'تفاح', nameEn: 'Apples' },
    operator: '-',
    groupB: { icon: '🍎', count: 2, nameAr: 'تفاح', nameEn: 'Apples' },
    correctAnswer: 4,
    options: [2, 3, 4, 5],
    hintAr: '6 تفاحات ناقص 2 = 4',
    hintEn: '6 apples minus 2 = 4'
  }
];

export const MathGame: React.FC<MathGameProps> = ({ lang, onBack, onEarnStars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'try_again'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [completedAll, setCompletedAll] = useState(false);
  const [tappedItems, setTappedItems] = useState<Record<string, boolean>>({});

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (num: number) => {
    sound.playClick();
    setSelectedAnswer(num);
    setFeedback('idle');
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQ.correctAnswer) {
      sound.playSuccess();
      setFeedback('correct');
      onEarnStars(5, lang === 'ar' ? currentQ.promptAr : currentQ.promptEn, 'math');

      setTimeout(() => {
        if (currentIndex < QUESTIONS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setFeedback('idle');
          setShowHint(false);
          setTappedItems({});
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

  const toggleItemTap = (key: string) => {
    sound.playClick();
    setTappedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentPrompt = lang === 'ar' ? currentQ.promptAr : currentQ.promptEn;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Top Bar with Back and Progress */}
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

        {/* Progress Pill */}
        <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
          <span className="font-mono tabular-nums">{currentIndex + 1}</span> / <span className="font-mono tabular-nums">{QUESTIONS.length}</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setShowHint(prev => !prev);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'مساعدة' : 'Hint'}</span>
        </button>
      </div>

      {completedAll ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 animate-bounce">
            🏆
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {lang === 'ar' ? 'رائع يا بطل الرياضيات! 🌟' : 'Awesome Math Hero! 🌟'}
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            {lang === 'ar'
              ? 'أكملت جميع تحديات الحساب وحصلت على 25 نجمة ذهبية!'
              : 'You completed all math challenges and earned 25 golden stars!'}
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setFeedback('idle');
                setCompletedAll(false);
                setTappedItems({});
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{lang === 'ar' ? 'العب مرة أخرى' : 'Play Again'}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onBack();
              }}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
            >
              {lang === 'ar' ? 'متابعة الأنشطة' : 'Continue'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
          {/* Question Header & Audio Speaker */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentPrompt}
            </h2>
            <AudioSpeakerButton text={currentPrompt} lang={lang} />
          </div>

          {/* Hint callout */}
          {showHint && (
            <div className="mb-6 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{lang === 'ar' ? currentQ.hintAr : currentQ.hintEn}</span>
            </div>
          )}

          {/* Interactive Visual Counter Stage (Items to count) */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 mb-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 min-h-[90px]">
              {/* Group A */}
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: currentQ.groupA.count }).map((_, i) => {
                  const key = `A-${i}`;
                  const isTapped = tappedItems[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleItemTap(key)}
                      type="button"
                      className={`text-4xl sm:text-5xl transition-all transform cursor-pointer ${
                        isTapped ? 'scale-125 rotate-6 filter drop-shadow-md' : 'hover:scale-110 active:scale-95'
                      }`}
                      title={`${currentQ.groupA.nameAr} ${i + 1}`}
                    >
                      {currentQ.groupA.icon}
                    </button>
                  );
                })}
              </div>

              {/* Operator if present */}
              {currentQ.operator && (
                <div className="text-3xl font-black text-indigo-600 px-2 font-mono">
                  {currentQ.operator}
                </div>
              )}

              {/* Group B if present */}
              {(() => {
                const groupB = currentQ.groupB;
                if (!groupB) return null;
                return (
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: groupB.count }).map((_, i) => {
                      const key = `B-${i}`;
                      const isTapped = tappedItems[key];
                      return (
                        <button
                          key={key}
                          onClick={() => toggleItemTap(key)}
                          type="button"
                          className={`text-4xl sm:text-5xl transition-all transform cursor-pointer ${
                            isTapped ? 'scale-125 -rotate-6 filter drop-shadow-md' : 'hover:scale-110 active:scale-95'
                          }`}
                          title={`${groupB.nameAr} ${i + 1}`}
                        >
                          {groupB.icon}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <p className="text-xs text-slate-400 mt-3 font-medium">
              {lang === 'ar' ? '💡 المس أي فاكهة لتتأكد من عدها بسهولة' : '💡 Tap any fruit to count visually'}
            </p>
          </div>

          {/* Answer Keypad / Options Grid (matching the uploaded UI kit style!) */}
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-500 mb-3 text-center">
              {lang === 'ar' ? 'اختر الرقم الصحيح:' : 'Select the correct number:'}
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2.5 max-w-md mx-auto">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={`h-14 sm:h-16 rounded-2xl text-xl sm:text-2xl font-black font-mono transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-lg scale-105 ring-4 ring-indigo-200'
                        : 'bg-slate-50 hover:bg-indigo-50/60 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Message */}
          {feedback === 'correct' && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'ar' ? 'رائع جداً! إجابة صحيحة ⭐' : 'Great job! Correct answer ⭐'}</span>
            </div>
          )}

          {feedback === 'try_again' && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-center font-bold text-sm">
              <span>{lang === 'ar' ? 'قريب جداً! حاول العد مرة أخرى بروية 😊' : 'Almost! Count carefully and try again 😊'}</span>
            </div>
          )}

          {/* Check / Submit Action Button */}
          <div className="mt-4">
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className={`w-full py-4 rounded-2xl font-black text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                selectedAnswer === null
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white'
              }`}
            >
              <span>{lang === 'ar' ? 'تحقق من الإجابة' : 'Check'}</span>
              <span>⭐</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
