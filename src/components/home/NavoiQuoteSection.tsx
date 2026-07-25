import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { NavoiQuoteBlock } from '@/data/navoiQuotes';
import {
  HERITAGE_MANUSCRIPT_URL,
  PATTERNS,
  SectionAtmosphere,
  ShamsaMedallion,
  type AtmosphereTone,
} from '@/components/ui/PatternBackground';

type Variant = 'heritage' | 'royal';

interface NavoiQuoteSectionProps {
  quote: NavoiQuoteBlock;
  /** heritage — parchment/krem; royal — to‘q navy (zamonaviy globus) */
  variant?: Variant;
  /**
   * Agar berilsa, variant o‘rniga SectionAtmosphere ishlatiladi
   * (masalan programs bo‘limidan olingan heritage-strong).
   */
  atmosphere?: AtmosphereTone;
  className?: string;
}

/**
 * Alisher Navoiy 4 misra — meros + zamonaviy dunyo / tamaddun uyg‘unligi.
 */
export const NavoiQuoteSection: React.FC<NavoiQuoteSectionProps> = ({
  quote,
  variant = 'heritage',
  atmosphere,
  className = '',
}) => {
  const { t, L } = useLanguage();
  const useAtmosphere = Boolean(atmosphere);
  const isRoyal = !useAtmosphere && variant === 'royal';
  const isLight = useAtmosphere || variant === 'heritage';

  return (
    <section
      id={quote.id}
      aria-label="Alisher Navoiy iqtibosi"
      className={`relative overflow-hidden py-20 md:py-28 ${className}`}
    >
      {/* ——— Fon ——— */}
      {useAtmosphere && atmosphere ? (
        <SectionAtmosphere tone={atmosphere} variant="default" manuscript />
      ) : isRoyal ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#001a2c] via-[#001524] to-[#0a1628]" />
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-soft-light pointer-events-none"
            style={{
              backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'sepia(0.3)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: PATTERNS.girih, backgroundSize: '200px 200px' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(88vw,560px)] h-[min(88vw,560px)] pointer-events-none opacity-25">
            <div className="absolute inset-0 rounded-full border border-amber-500/20" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-amber-400/15" />
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#fdfaf3]" />
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: PATTERNS.girih, backgroundSize: '180px 180px' }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </>
      )}

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-5">
            <ShamsaMedallion className="w-8 h-8 md:w-10 md:h-10" />
            <span
              className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] font-ui ${
                isLight ? 'text-amber-800' : 'text-amber-400/90'
              }`}
            >
              {L(quote.sourceNote)}
            </span>
            <ShamsaMedallion className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          <div
            className={`relative w-full max-w-3xl mx-auto rounded-[2.5rem] md:rounded-[3rem] border p-8 md:p-12 shadow-2xl overflow-hidden ${
              isLight
                ? 'border-amber-300/70 bg-white/90 shadow-amber-900/10'
                : 'border-amber-500/25 bg-white/[0.04] backdrop-blur-md shadow-black/40'
            }`}
          >
            <div
              className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-[2.5rem] pointer-events-none ${
                isLight ? 'border-amber-500/50' : 'border-amber-400/40'
              }`}
            />
            <div
              className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-[2.5rem] pointer-events-none ${
                isLight ? 'border-amber-500/50' : 'border-amber-400/40'
              }`}
            />

            <Quote
              className={`absolute top-6 right-6 w-14 h-14 md:w-16 md:h-16 opacity-20 ${
                isLight ? 'text-amber-600' : 'text-amber-400'
              }`}
              strokeWidth={1}
              aria-hidden
            />

            <blockquote className="relative">
              <div className="space-y-3 md:space-y-4">
                {quote.lines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.45, delay: 0.08 * i }}
                    className={`font-serif-classic italic leading-relaxed text-xl sm:text-2xl md:text-[1.65rem] ${
                      isLight ? 'text-slate-800' : 'text-amber-50/95'
                    }`}
                  >
                    {L(line)}
                  </motion.p>
                ))}
              </div>

              <footer className="mt-8 md:mt-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className={`h-px w-10 ${isLight ? 'bg-amber-400/60' : 'bg-amber-500/50'}`} />
                  <span className={isLight ? 'text-amber-600/80' : 'text-amber-400/70'}>❦</span>
                  <span className={`h-px w-10 ${isLight ? 'bg-amber-400/60' : 'bg-amber-500/50'}`} />
                </div>
                <cite
                  className={`not-italic font-classic text-lg md:text-xl tracking-wide ${
                    isLight ? 'text-amber-900' : 'text-amber-300'
                  }`}
                >
                  — {L(quote.attribution)}
                </cite>
              </footer>
            </blockquote>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className={`mt-8 md:mt-10 max-w-2xl mx-auto text-base md:text-lg font-serif-classic leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-amber-100/65'
            }`}
          >
            <span
              className={`not-italic font-ui text-[10px] font-black uppercase tracking-[0.3em] block mb-3 ${
                isLight ? 'text-amber-700/90' : 'text-amber-400/90'
              }`}
            >
              {t('navoi_bridge_label')}
            </span>
            {L(quote.modernBridge)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
