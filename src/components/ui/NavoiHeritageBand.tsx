import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  getNavoiBandForPath,
  NAVOIY_PAGE_BANDS,
  type NavoiBandQuote,
} from '@/data/navoiQuotes';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS, ShamsaMedallion } from '@/components/ui/PatternBackground';

type BandVariant = 'page' | 'compact';

interface NavoiHeritageBandProps {
  variant?: BandVariant;
  /** Aniq iqtibos yoki topic kaliti (home, history, leadership, …) */
  quote?: NavoiBandQuote;
  topic?: string;
  className?: string;
}

/**
 * Har sahifa oxiridagi «Navoiy merosi» —
 * hazratning 4 misrasi + brand dizayn (meros → footer o‘tishi).
 */
export const NavoiHeritageBand: React.FC<NavoiHeritageBandProps> = ({
  variant = 'page',
  quote: quoteProp,
  topic,
  className = '',
}) => {
  const { t, L } = useLanguage();
  const { pathname } = useLocation();

  const quote = useMemo(() => {
    if (quoteProp) return quoteProp;
    if (topic && NAVOIY_PAGE_BANDS[topic]) return NAVOIY_PAGE_BANDS[topic];
    return getNavoiBandForPath(pathname);
  }, [quoteProp, topic, pathname]);

  const isCompact = variant === 'compact';

  return (
    <section
      aria-label={t('navoi_merosi_title')}
      className={`relative overflow-hidden ${isCompact ? 'py-12 md:py-14' : 'py-16 md:py-22'} ${className}`}
    >
      {/* Fon: krem sahifadan to‘q footerga yumshoq o‘tish */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf3] via-[#f3e8d4] to-[#071018]" />
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.25)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '180px 180px' }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none animated-pattern"
        style={{ backgroundImage: PATTERNS.islimiy, backgroundSize: '200px 200px' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/55 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient opacity-90 shadow-[0_0_24px_#d4af37]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,680px)] h-[min(48vw,300px)] bg-amber-400/12 blur-[110px] rounded-full pointer-events-none" />

      <div className={`relative z-10 mx-auto px-5 sm:px-6 ${isCompact ? 'max-w-3xl' : 'max-w-4xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          {/* Sarlavha — NAVOIY MEROSI */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-9 px-1">
            <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-amber-600/55 shrink-0" />
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 md:px-8 md:py-3.5 rounded-full bg-slate-950 border border-amber-400/50 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)] max-w-full">
              <ShamsaMedallion className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
              <span className="font-classic font-bold text-amber-300 text-[11px] sm:text-base md:text-lg tracking-[0.12em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase truncate">
                ⚜ {t('navoi_merosi_title')} ⚜
              </span>
              <ShamsaMedallion className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0" />
            </div>
            <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-amber-600/55 shrink-0" />
          </div>

          {/* 4 misra kartasi */}
          <div
            className={`relative mx-auto rounded-[2rem] md:rounded-[2.75rem] border-2 border-amber-400/40 bg-slate-950/90 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-amber-300/70 transition-colors duration-500 ${
              isCompact ? 'px-6 py-8 md:px-10 md:py-9' : 'px-7 py-10 md:px-14 md:py-12'
            }`}
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-[2rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-[2rem] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.1] pointer-events-none"
              style={{
                backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
                backgroundSize: 'cover',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{ backgroundImage: PATTERNS.girih, backgroundSize: '140px 140px' }}
            />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-600/10 blur-3xl rounded-full pointer-events-none" />

            <Quote
              className="absolute top-6 right-6 w-12 h-12 md:w-14 md:h-14 text-amber-400/20 group-hover:text-amber-400/30 transition-colors"
              strokeWidth={1}
              aria-hidden
            />

            <blockquote className="relative">
              <div className="space-y-3 md:space-y-3.5">
                {quote.lines.map((line, i) => (
                  <motion.p
                    key={`${quote.id}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.07 * i }}
                    className={`font-serif-classic italic text-amber-50 leading-relaxed ${
                      isCompact
                        ? 'text-lg sm:text-xl md:text-[1.4rem]'
                        : 'text-xl sm:text-2xl md:text-[1.65rem]'
                    }`}
                  >
                    {i === 0 && (
                      <span className="text-amber-400 not-italic mr-1" aria-hidden>
                        “
                      </span>
                    )}
                    {L(line)}
                    {i === quote.lines.length - 1 && (
                      <span className="text-amber-400 not-italic ml-1" aria-hidden>
                        ”
                      </span>
                    )}
                  </motion.p>
                ))}
              </div>

              <footer className="mt-7 md:mt-9 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <span className="text-amber-400/80 text-sm">❦</span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/50" />
                </div>
                <cite className="not-italic font-classic text-amber-300 text-base md:text-lg tracking-wide">
                  — {L(quote.attribution)}
                </cite>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-400/85 font-ui px-5 py-2 rounded-full bg-white/5 border border-amber-400/25">
                  {L(quote.source)}
                </p>
              </footer>
            </blockquote>
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.32em] text-amber-200/50 font-ui">
            {t('navoi_merosi_sub')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/** PageShell mosligi: topic prop bilan */
export const IslimiyDivider: React.FC<{ topic?: string; lang?: string }> = ({ topic }) => (
  <NavoiHeritageBand variant="compact" topic={topic} className="mt-8" />
);
