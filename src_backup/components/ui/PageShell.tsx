import React from 'react';
import { motion } from 'framer-motion';
import {
  SectionTitleDecoration,
  IslimiyDivider,
  SectionAtmosphere,
  type AtmosphereTone,
} from './PatternBackground';

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
  showDivider?: boolean;
  /** Bo'lim fon toni — loyiha bo'ylab bir xil naqsh tizimi */
  tone?: AtmosphereTone;
  /** @deprecated tone ishlatiladi */
  heritageIntensity?: 'soft' | 'medium' | 'strong';
}

export const PageShell: React.FC<PageShellProps> = ({
  title,
  subtitle,
  children,
  dark = false,
  showDivider = true,
  tone,
  heritageIntensity = 'medium',
}) => {
  const resolvedTone: AtmosphereTone =
    tone ??
    (dark
      ? 'dark'
      : heritageIntensity === 'soft'
        ? 'soft'
        : heritageIntensity === 'strong'
          ? 'heritage-strong'
          : 'heritage');

  return (
    <section className={`relative overflow-hidden min-h-screen pt-40 pb-24 ${dark ? 'text-white' : ''}`}>
      <SectionAtmosphere
        tone={resolvedTone}
        variant="default"
        manuscript={!dark}
        animated
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-7xl font-classic uppercase tracking-widest leading-tight ${
              dark ? 'text-amber-100' : 'text-slate-950'
            }`}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <p
              className={`mt-6 text-xl md:text-3xl italic font-serif-classic max-w-4xl mx-auto leading-relaxed ${
                dark ? 'text-amber-200/70' : 'text-amber-900/80'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      {showDivider && !dark && <IslimiyDivider />}
    </section>
  );
};
