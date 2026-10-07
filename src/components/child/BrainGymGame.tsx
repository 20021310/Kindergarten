import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { sound } from '../../services/sound';
import { AudioSpeakerButton } from '../common/AudioSpeakerButton';
import { ArrowLeft, ArrowRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface BrainGymProps {
  lang: Language;
  onBack: () => void;
  onEarnStars: (amount: number, activityTitle: string, category: 'brain') => void;
}

interface Card {
  id: number;
  symbol: string;
  nameAr: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_SYMBOLS = [
  { symbol: '🌴', nameAr: 'نخلة' },
  { symbol: '🦊', nameAr: 'ثعلب' },
  { symbol: '🍎', nameAr: 'تفاحة' },
  { symbol: '🐪', nameAr: 'جمل' }
];

export const BrainGymGame: React.FC<BrainGymProps> = ({ lang, onBack, onEarnStars }) => {
  const [activeTab, setActiveTab] = useState<'memory' | 'patterns'>('memory');

  // Memory Game State
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memoryComplete, setMemoryComplete] = useState(false);

  // Pattern Game State
  const [patternIndex, setPatternIndex] = useState(0);
  const [selectedPatternChoice, setSelectedPatternChoice] = useState<string | null>(null);
  const [patternFeedback, setPatternFeedback] = useState<'idle' | 'correct' | 'try_again'>('idle');
  const [patternComplete, setPatternComplete] = useState(false);

  const PATTERNS = [
    {
      sequence: ['🔴', '🟡', '🔴', '🟡'],
      correct: '🔴',
      options: ['🔴', '🟢', '🟦'],
      nameAr: 'أحمر، أصفر، أحمر، أصفر، ثم...',
      nameEn: 'Red, Yellow, Red, Yellow, then...'
    },
    {
      sequence: ['🌴', '🐪', '🌴', '🐪'],
      correct: '🌴',
      options: ['🌴', '⭐', '🦁'],
      nameAr: 'نخلة، جمل، نخلة، جمل، ثم...',
      nameEn: 'Palm, Camel, Palm, Camel, then...'
    },
    {
      sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'],
      correct: '🌙',
      options: ['🌙', '⭐', '☀️'],
      nameAr: 'نجمة، نجمة، هلال، نجمة، نجمة، ثم...',
      nameEn: 'Star, Star, Moon, Star, Star, then...'
    }
  ];

  // Initialize Memory Game
  const initMemory = () => {
    const deck: Card[] = [];
    let id = 0;
    MEMORY_SYMBOLS.forEach((item) => {
      deck.push({ id: id++, symbol: item.symbol, nameAr: item.nameAr, isFlipped: false, isMatched: false });
      deck.push({ id: id++, symbol: item.symbol, nameAr: item.nameAr, isFlipped: false, isMatched: false });
    });
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setCards(deck);
    setFlippedIndices([]);
    setMemoryComplete(false);
    setIsProcessing(false);
  };

  useEffect(() => {
    initMemory();
  }, []);

  // Handle Card Flip
  const handleCardClick = (index: number) => {
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

    sound.playClick();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].symbol === newCards[secondIdx].symbol) {
        sound.playSuccess();
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);

          if (newCards.every(c => c.isMatched)) {
            setMemoryComplete(true);
            sound.playBadgeUnlock();
            onEarnStars(10, 'تحدي ذاكرة الأشكال', 'brain');
          }
        }, 500);
      } else {
        sound.playTryAgain();
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  // Pattern Check
  const handlePatternChoice = (item: string) => {
    sound.playClick();
    setSelectedPatternChoice(item);
    const curr = PATTERNS[patternIndex];
    if (item === curr.correct) {
      sound.playSuccess();
      setPatternFeedback('correct');
      onEarnStars(5, 'إكمال النمط الذكي', 'brain');

      setTimeout(() => {
        if (patternIndex < PATTERNS.length - 1) {
          setPatternIndex(prev => prev + 1);
          setSelectedPatternChoice(null);
          setPatternFeedback('idle');
        } else {
          setPatternComplete(true);
          sound.playBadgeUnlock();
        }
      }, 1400);
    } else {
      sound.playTryAgain();
      setPatternFeedback('try_again');
    }
  };

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

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('memory');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'memory' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {lang === 'ar' ? 'بطاقات الذاكرة' : 'Memory Cards'}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('patterns');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'patterns' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            {lang === 'ar' ? 'تسلسل الأنماط' : 'Patterns'}
          </button>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            if (activeTab === 'memory') initMemory();
            else {
              setPatternIndex(0);
              setSelectedPatternChoice(null);
              setPatternFeedback('idle');
              setPatternComplete(false);
            }
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          title={lang === 'ar' ? 'إعادة اللعبة' : 'Reset'}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'إعادة' : 'Reset'}</span>
        </button>
      </div>

      {activeTab === 'memory' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'تحدي الذاكرة البصرية: طابق الأزواج' : 'Visual Memory: Match Pairs'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? 'اقلب بطاقتين وابحث عن الصورتين المتشابهتين' : 'Flip two cards and match identical symbols'}
              </p>
            </div>
            <AudioSpeakerButton
              text={lang === 'ar' ? 'اقلب بطاقتين وابحث عن الصورتين المتشابهتين' : 'Flip two cards and match pairs'}
              lang={lang}
            />
          </div>

          {memoryComplete ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4">
                🧠
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {lang === 'ar' ? 'ذاكرة خارقة ومذهلة! ⭐' : 'Super Sharp Memory! ⭐'}
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                {lang === 'ar' ? 'وجدت جميع البطاقات المتشابهة وحصلت على 10 نجوم!' : 'You matched all card pairs and earned 10 stars!'}
              </p>
              <button
                onClick={initMemory}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
              >
                {lang === 'ar' ? 'العب مرة ثانية' : 'Play Again'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto my-6">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  disabled={card.isFlipped || card.isMatched}
                  className={`aspect-square rounded-2xl sm:rounded-3xl text-3xl sm:text-4xl flex items-center justify-center transition-all cursor-pointer font-bold transform select-none ${
                    card.isMatched
                      ? 'bg-emerald-100 border-2 border-emerald-300 opacity-90 scale-95'
                      : card.isFlipped
                      ? 'bg-white border-2 border-indigo-400 shadow-lg scale-105'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-102 shadow-md hover:from-indigo-600'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <span>{card.symbol}</span>
                  ) : (
                    <span className="text-xl opacity-60">❓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'ar' ? 'تسلسل الأنماط: ما هو الشكل التالي؟' : 'Pattern Sequences: What comes next?'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'ar' ? PATTERNS[patternIndex].nameAr : PATTERNS[patternIndex].nameEn}
              </p>
            </div>
            <AudioSpeakerButton
              text={lang === 'ar' ? PATTERNS[patternIndex].nameAr : PATTERNS[patternIndex].nameEn}
              lang={lang}
            />
          </div>

          {patternComplete ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4">
                🧩
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {lang === 'ar' ? 'عبقري الأنماط والذكاء! 🌟' : 'Pattern Master! 🌟'}
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                {lang === 'ar' ? 'أكملت جميع الأنماط المنطقية بنجاح باهر.' : 'You completed all logical pattern sequences!'}
              </p>
              <button
                onClick={() => {
                  setPatternIndex(0);
                  setSelectedPatternChoice(null);
                  setPatternFeedback('idle');
                  setPatternComplete(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
              >
                {lang === 'ar' ? 'إعادة التحدي' : 'Play Again'}
              </button>
            </div>
          ) : (
            <div>
              {/* Sequence Display Stage */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center gap-3 my-6 min-h-[90px] overflow-x-auto">
                {PATTERNS[patternIndex].sequence.map((item, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center text-3xl shrink-0"
                  >
                    {item}
                  </div>
                ))}

                {/* The Missing Slot */}
                <div className="w-14 h-14 bg-indigo-100 border-2 border-dashed border-indigo-400 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-700 shrink-0 animate-pulse">
                  ?
                </div>
              </div>

              {/* Choices */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 mb-3 text-center">
                  {lang === 'ar' ? 'اختر الشكل الذي يكمل النمط:' : 'Pick what fits the pattern:'}
                </p>
                <div className="flex justify-center gap-4">
                  {PATTERNS[patternIndex].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handlePatternChoice(opt)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-4xl border border-slate-200 bg-white hover:bg-indigo-50 shadow-sm transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 ${
                        selectedPatternChoice === opt ? 'ring-4 ring-indigo-400 scale-105' : ''
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {patternFeedback === 'correct' && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{lang === 'ar' ? 'نمط رائع وصحيح! ⭐' : 'Awesome pattern match! ⭐'}</span>
                </div>
              )}

              {patternFeedback === 'try_again' && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-center font-bold text-sm">
                  <span>{lang === 'ar' ? 'تأمل ترتيب الأشكال جيداً وجرب ثانية 😊' : 'Look closely at the order and try again 😊'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
