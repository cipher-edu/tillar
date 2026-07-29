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
  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    return (localStorage.getItem('navdu_contrast') as ContrastMode) || 'normal';
  });
  const [fontScale, setFontScale] = useState<number>(() => {
    return Number(localStorage.getItem('navdu_font_scale')) || 100;
  });
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('navdu_contrast', contrastMode);
    const root = document.documentElement;
    root.setAttribute('data-gov-theme', contrastMode);

    // Apply global contrast filter directly to document element
    if (contrastMode === 'contrast') {
      root.style.filter = 'contrast(130%) brightness(95%)';
    } else if (contrastMode === 'grayscale') {
      root.style.filter = 'grayscale(100%)';
    } else {
      root.style.filter = 'none';
    }
  }, [contrastMode]);

  useEffect(() => {
    localStorage.setItem('navdu_font_scale', String(fontScale));
    const root = document.documentElement;
    root.style.fontSize = `${(fontScale / 100) * 16}px`;
  }, [fontScale]);

  // Global Speech synthesis click/hover reader when screen reader is active
  useEffect(() => {
    if (!screenReaderActive) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !screenReaderActive) return;
      const text = target.innerText || target.getAttribute('aria-label') || target.getAttribute('alt');
      if (text && text.trim().length > 2 && text.trim().length < 300) {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text.trim());
          utterance.rate = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [screenReaderActive]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
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
