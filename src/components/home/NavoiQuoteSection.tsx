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
  className = '',
}) => {
  const { t, L } = useLanguage();

  return (
    <section
      id={quote.id}
      aria-label="Alisher Navoiy iqtibosi"
      className={`relative overflow-hidden py-12 md:py-16 bg-[#013D8C] text-white font-sans ${className}`}
    >
      <div className="gov-shell relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Header Medallion Ribbon */}
          <div className="flex items-center gap-3 mb-4">
            <ShamsaMedallion className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 font-sans">
              {L(quote.sourceNote)}
            </span>
            <ShamsaMedallion className="w-6 h-6 text-amber-400" />
          </div>

          {/* Main Quote Card */}
          <div className="relative w-full rounded-none border border-white/20 bg-white/10 p-8 md:p-10 text-center">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl pointer-events-none" />

            <blockquote className="relative space-y-4">
              <div className="space-y-3">
                {quote.lines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.08 * i }}
                    className="font-serif italic font-bold leading-relaxed text-lg sm:text-xl md:text-2xl text-amber-50"
                  >
                    « {L(line)} »
                  </motion.p>
                ))}
              </div>

              <footer className="pt-6 border-t border-white/10 mt-6">
                <cite className="not-italic font-black text-sm md:text-base uppercase tracking-wider text-amber-300 ">
                  — {L(quote.attribution)}
                </cite>
              </footer>
            </blockquote>
          </div>

          {/* Modern Academic Bridge Explanation */}
          {quote.modernBridge && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 p-4 bg-white/5 border border-white/10 max-w-2xl text-center"
            >
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 block mb-1 ">
                {t('navoi_bridge_label')}
              </span>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium leading-relaxed">
                {L(quote.modernBridge)}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
