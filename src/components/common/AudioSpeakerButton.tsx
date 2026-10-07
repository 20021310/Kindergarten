import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { Language } from '../../types';

interface AudioSpeakerButtonProps {
  text: string;
  lang: Language;
  className?: string;
  label?: string;
}

export const AudioSpeakerButton: React.FC<AudioSpeakerButtonProps> = ({
  text,
  lang,
  className = '',
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsPlaying(true);
    sound.speakText(text, lang);
    setTimeout(() => setIsPlaying(false), 2200);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all active:scale-95 text-xs font-medium cursor-pointer shadow-xs ${
        isPlaying ? 'ring-2 ring-indigo-400 animate-pulse' : ''
      } ${className}`}
      title={lang === 'ar' ? 'استمع إلى التعليمات' : 'Listen to instructions'}
      aria-label={lang === 'ar' ? 'استمع إلى التعليمات' : 'Listen to instructions'}
    >
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-indigo-600 animate-bounce' : 'text-indigo-500'}`} />
      {label && <span>{label}</span>}
    </button>
  );
};
