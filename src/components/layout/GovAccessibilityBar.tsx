import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Eye, ZoomIn, ZoomOut, RotateCcw, Globe, ChevronDown, Check, Music2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGovTheme, type ContrastMode } from '@/context/GovThemeContext';
import type { Language } from '@/types';

const STATE_SYMBOLS: { title: string; href: string; imgSrc?: string; imgClass?: string; Icon?: typeof Music2 }[] = [
  {
    title: "Davlat bayrog'i",
    href: "https://uz.wikipedia.org/wiki/O%CA%BBzbekiston_bayrog%CA%BBi",
    imgSrc: '/uz-flag.svg',
    imgClass: 'w-5 h-3.5 border border-slate-300',
  },
  {
    title: 'Davlat gerbi',
    href: 'https://uz.wikipedia.org/wiki/O%CA%BBzbekiston_gerbi',
    imgSrc: '/uz-emblem.svg',
    imgClass: 'w-4 h-4',
  },
  {
    title: 'Davlat madhiyasi',
    href: 'https://uz.wikipedia.org/wiki/O%CA%BBzbekiston_Respublikasi_Davlat_madhiyasi',
    Icon: Music2,
  },
];

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export const GovAccessibilityBar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { contrastMode, setContrastMode, fontScale, setFontScale, screenReaderActive, setScreenReaderActive } = useGovTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#F0F0F0] border-b border-[#E1E1E1] text-xs text-[#707070] select-none font-sans relative z-[60]">
      <div className="gov-shell py-1.5 flex flex-wrap justify-between items-center gap-2">
        {/* Left: Accessibility Tools */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Ekran suhandoni / Text-to-Speech */}
          <div className="relative flex items-center gap-1">
            <button
              onClick={() => setScreenReaderActive((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-none transition-colors ${
                screenReaderActive ? 'bg-[#013D8C] text-white font-semibold' : 'hover:bg-slate-200 text-[#000000]'
              }`}
              title="Ekran suhandoni (Zaif ko'radiganlar uchun ovozli o'qish)"
            >
              {screenReaderActive ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="font-semibold text-xs font-sans">
                Ekran suhandoni {screenReaderActive ? '(Yoqilgan)' : ''}
              </span>
            </button>
            <button
              onClick={() => setInfoOpen((prev) => !prev)}
              className="text-[#707070] hover:text-[#000000] text-[10px] underline ml-0.5"
            >
              (?)
            </button>

            {infoOpen && (
              <div className="absolute top-full left-0 mt-2 z-[60] w-72 bg-white p-3.5 rounded-none border border-[#E1E1E1] text-[#000000] text-xs leading-relaxed shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                “Ekran suhandoni” zaif ko‘radigan foydalanuvchilar uchun mo‘ljallangan bo‘lib, sichqoncha olib borilgan matnlarni ovozli o‘qib beradi.
              </div>
            )}
          </div>

          <div className="h-3.5 w-[1px] bg-slate-300 hidden sm:block" />

          {/* Special Visual Contrast Modes */}
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#707070]" />
            <button
              onClick={() => setContrastMode('normal')}
              className={`px-2 py-0.5 rounded-none text-xs font-medium transition-colors ${
                contrastMode === 'normal' ? 'bg-[#013D8C] text-white font-semibold' : 'hover:bg-slate-200 text-[#000000]'
              }`}
            >
              Oddiy
            </button>
            <button
              onClick={() => setContrastMode('contrast')}
              className={`px-2 py-0.5 rounded-none text-xs font-medium transition-colors ${
                contrastMode === 'contrast' ? 'bg-black text-yellow-300 font-bold border border-yellow-300' : 'hover:bg-slate-200 text-[#000000]'
              }`}
            >
              Yuqori kontrast
            </button>
            <button
              onClick={() => setContrastMode('grayscale')}
              className={`px-2 py-0.5 rounded-none text-xs font-medium transition-colors ${
                contrastMode === 'grayscale' ? 'bg-slate-800 text-white font-semibold' : 'hover:bg-slate-200 text-[#000000]'
              }`}
            >
              Rangsiz
            </button>
          </div>

          <div className="h-3.5 w-[1px] bg-slate-300 hidden sm:block" />

          {/* Shrift o'lchami / Font Scaling */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#707070] font-medium">Shrift:</span>
            <button
              onClick={() => setFontScale((s) => Math.max(85, s - 10))}
              className="p-1 rounded-none hover:bg-slate-200 text-[#000000] font-bold text-xs"
              title="Shriftni kichiklashtirish"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-xs text-[#013D8C] px-1 font-sans">{fontScale}%</span>
            <button
              onClick={() => setFontScale((s) => Math.min(160, s + 10))}
              className="p-1 rounded-none hover:bg-slate-200 text-[#000000] font-bold text-xs"
              title="Shriftni kattalashtirish"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {fontScale !== 100 && (
              <button
                onClick={() => setFontScale(100)}
                className="p-1 rounded-none hover:bg-slate-200 text-[#707070] ml-1"
                title="Boshlang'ich holat"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="h-3.5 w-[1px] bg-slate-300 hidden sm:block" />

          {/* Davlat ramzlari: bayroq, gerb, madhiya (Vikipediya) */}
          <div className="flex items-center gap-1">
            {STATE_SYMBOLS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-slate-200 text-[#707070] hover:text-[#013D8C] transition-colors flex items-center justify-center"
                title={item.title}
                aria-label={item.title}
              >
                {item.imgSrc ? (
                  <img src={item.imgSrc} alt={item.title} className={`object-contain ${item.imgClass ?? ''}`} />
                ) : item.Icon ? (
                  <item.Icon className="w-3.5 h-3.5" />
                ) : null}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Interactive Language Selector */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setLangMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-[#E1E1E1] text-[#000000] font-semibold text-xs hover:bg-[#F0F0F0] transition-colors font-sans"
          >
            <Globe className="w-3.5 h-3.5 text-[#013D8C]" />
            <span className="flex items-center gap-1">
              <span>{currentLangObj.flag}</span>
              <span>{currentLangObj.label}</span>
            </span>
            <ChevronDown className={`w-3 h-3 text-[#707070] transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-full mt-1 z-[60] w-40 bg-white rounded-none border border-[#E1E1E1] py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors ${
                    language === l.code ? 'bg-[#F0F0F0] text-[#013D8C] font-bold' : 'hover:bg-[#F0F0F0] text-[#000000]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {language === l.code && <Check className="w-4 h-4 text-[#013D8C]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
