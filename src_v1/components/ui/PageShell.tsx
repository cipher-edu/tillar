import React from 'react';
import { motion } from 'framer-motion';
import {
  SectionTitleDecoration,
  SectionAtmosphere,
  ShamsaMedallion,
  PATTERNS,
  type AtmosphereTone,
} from './PatternBackground';

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
  /** @deprecated Navoiy merosi endi Layout da (har sahifa oxiri) */
  showDivider?: boolean;
  tone?: AtmosphereTone | 'behzod' | 'timurid';
  /** @deprecated Layout path bo‘yicha iqtibos tanlaydi */
  topic?: string;
  heritageIntensity?: 'soft' | 'medium' | 'strong';
}

export const PageShell: React.FC<PageShellProps> = ({
  title,
  subtitle,
  children,
  dark = false,
  showDivider: _showDivider,
  tone,
  topic: _topic,
  heritageIntensity = 'medium',
}) => {
  const isBehzod = tone === 'behzod';
  const isTimurid = tone === 'timurid';

  const resolvedTone: AtmosphereTone =
    (tone === 'behzod' || tone === 'timurid' ? 'heritage' : tone) ??
    (dark
      ? 'dark'
      : heritageIntensity === 'soft'
        ? 'soft'
        : heritageIntensity === 'strong'
          ? 'heritage-strong'
          : 'heritage');

  return (
    <section
      className={`relative overflow-x-hidden overflow-y-visible min-h-screen pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 ${
        dark ? 'text-white bg-slate-950' : 'bg-[#fdfaf3]'
      }`}
    >
      <SectionAtmosphere tone={resolvedTone} variant="default" manuscript={!dark} animated />

      {isBehzod && (
        <div
          className="absolute inset-0 opacity-[0.14] pointer-events-none animated-pattern"
          style={{ backgroundImage: PATTERNS.behzodMiniature, backgroundSize: '160px 160px' }}
        />
      )}

      {isTimurid && (
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: PATTERNS.deepStar, backgroundSize: '140px 140px' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex justify-center mb-3 sm:mb-4">
          <ShamsaMedallion className="w-8 h-8 sm:w-10 sm:h-10 shadow-lg rounded-full" />
        </div>

        <SectionTitleDecoration />

        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-classic uppercase tracking-wide sm:tracking-widest leading-tight px-1 ${
              dark ? 'text-amber-100 drop-shadow-md' : 'text-slate-950'
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl lg:text-3xl italic font-serif-classic max-w-4xl mx-auto leading-relaxed px-1 ${
                dark ? 'text-amber-200/80' : 'text-amber-900/90 font-semibold'
              }`}
            >
              <span className="text-amber-500 not-italic mr-2">❦</span>
              {subtitle}
              <span className="text-amber-500 not-italic ml-2 inline-block rotate-180">❦</span>
            </motion.p>
          )}
        </div>

        {children}
      </div>
      {/* Navoiy merosi — Layout da footer oldidan (dublikat yo‘q) */}
    </section>
  );
};
