import React, { createContext, useContext, useEffect, useState } from 'react';

export type ContrastMode = 'normal' | 'contrast' | 'grayscale';

interface GovThemeContextValue {
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  fontScale: number;
  setFontScale: (scale: number | ((prev: number) => number)) => void;
  screenReaderActive: boolean;
  setScreenReaderActive: (active: boolean | ((prev: boolean) => boolean)) => void;
  speakText: (text: string) => void;
}

const GovThemeContext = createContext<GovThemeContextValue | null>(null);

export const GovThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contrastMode, setContrastMode] = useState<ContrastMode>('normal');
  const [fontScale, setFontScale] = useState<number>(100);
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-gov-theme', contrastMode);
    root.style.fontSize = `${fontScale}%`;
  }, [contrastMode, fontScale]);

  // Screen reader / speech synthesis function
  const speakText = (text: string) => {
    if (!screenReaderActive || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; // Default voice lang
    window.speechSynthesis.speak(utterance);
  };

  return (
    <GovThemeContext.Provider
      value={{
        contrastMode,
        setContrastMode,
        fontScale,
        setFontScale,
        screenReaderActive,
        setScreenReaderActive,
        speakText,
      }}
    >
      <div className={`gov-theme-wrapper mode-${contrastMode}`}>
        {children}
      </div>
    </GovThemeContext.Provider>
  );
};

export function useGovTheme() {
  const ctx = useContext(GovThemeContext);
  if (!ctx) {
    throw new Error('useGovTheme must be used within GovThemeProvider');
  }
  return ctx;
}
