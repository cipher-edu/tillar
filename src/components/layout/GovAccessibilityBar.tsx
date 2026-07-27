import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, ZoomIn, ZoomOut, RotateCcw, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useGovTheme, type ContrastMode } from '@/context/GovThemeContext';
import type { Language } from '@/types';

const languages: { code: Language; label: string }[] = [
  { code: 'uz', label: 'OК»zbek' },
  { code: 'ru', label: 'Р СѓСЃСЃРєРёР№' },
  { code: 'en', label: 'English' },
];

export const GovAccessibilityBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { contrastMode, setContrastMode, fontScale, setFontScale, screenReaderActive, setScreenReaderActive } = useGovTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const currentLangLabel = languages.find((l) => l.code === language)?.label || 'OК»zbek';

  return (
    <div className="bg-[#f0f0f0] border-b border-gray-300 text-xs text-gray-700 select-none">
      <div className="gov-shell py-1.5 flex flex-wrap justify-between items-center gap-2">
        {/* Left: Accessibility Tools */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Ekran suhandoni / Text-to-Speech */}
          <div className="relative flex items-center gap-1">
            <button
              onClick={() => setScreenReaderActive((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                screenReaderActive ? 'bg-[#043b87] text-white font-medium' : 'hover:bg-gray-200 text-gray-800'
              }`}
              title="Ekran suhandoni (Zaif ko'radiganlar uchun)"
            >
              {screenReaderActive ? <Volume2 className="w-3.5 h-3.5 text-blue-200" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="font-semibold uppercase tracking-wider text-[11px]">Ekran suhandoni</span>
            </button>
            <button
              onClick={() => setInfoOpen((prev) => !prev)}
              className="text-gray-500 hover:text-gray-800 text-[10px] underline ml-0.5"
            >
              (?)
            </button>

            {infoOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 w-72 bg-white p-3 rounded shadow-xl border border-gray-300 text-gray-800 text-[11px] leading-relaxed">
                В«Ekran suhandoniВ» zaif koвЂradigan foydalanuvchilar uchun moвЂljallangan boвЂlib, sahifalardagi matnni ovozli oвЂqittirish imkonini beradi.
              </div>
            )}
          </div>

          <div className="h-3.5 w-[1px] bg-gray-300 hidden sm:block" />

          {/* Special Visual Modes */}
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <button
              onClick={() => setContrastMode('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] ${contrastMode === 'normal' ? 'bg-gray-300 font-bold text-gray-900' : 'hover:bg-gray-200'}`}
            >
              Oddiy
            </button>
            <button
              onClick={() => setContrastMode('contrast')}
              className={`px-1.5 py-0.5 rounded text-[11px] ${contrastMode === 'contrast' ? 'bg-black text-yellow-300 font-bold' : 'hover:bg-gray-200'}`}
            >
              Yuqori kontrast
            </button>
            <button
              onClick={() => setContrastMode('grayscale')}
              className={`px-1.5 py-0.5 rounded text-[11px] ${contrastMode === 'grayscale' ? 'bg-gray-700 text-white font-bold' : 'hover:bg-gray-200'}`}
            >
              Rangsiz
            </button>
          </div>

          <div className="h-3.5 w-[1px] bg-gray-300 hidden sm:block" />

          {/* Shrift o'lchami / Font Scaling */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-gray-500 font-medium">Shrift:</span>
            <button
              onClick={() => setFontScale((s) => Math.max(85, s - 10))}
              className="p-1 rounded hover:bg-gray-200 text-gray-800 font-bold text-[11px]"
              title="Shriftni kichiklashtirish"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="font-bold text-[11px] text-[#043b87] px-1">{fontScale}%</span>
            <button
              onClick={() => setFontScale((s) => Math.min(160, s + 10))}
              className="p-1 rounded hover:bg-gray-200 text-gray-800 font-bold text-[11px]"
              title="Shriftni kattalashtirish"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            {fontScale !== 100 && (
              <button
                onClick={() => setFontScale(100)}
                className="p-1 rounded hover:bg-gray-200 text-gray-500"
                title="Boshlang'ich holat"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-gray-300 text-gray-800 font-semibold text-[11px] hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#043b87]" />
            <span>{currentLangLabel}</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 w-36 bg-white rounded shadow-xl border border-gray-200 py-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-medium text-left transition-colors ${
                    language === l.code ? 'bg-[#eff7ff] text-[#043b87] font-bold' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{l.label}</span>
                  {language === l.code && <Check className="w-3.5 h-3.5 text-[#043b87]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
