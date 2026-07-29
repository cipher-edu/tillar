import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getRandomNavoiBand, NavoiBandQuote } from '@/data/navoiQuotes';

export const NavoiPageBand: React.FC = () => {
  const { L } = useLanguage();
  const location = useLocation();
  const [quote, setQuote] = useState<NavoiBandQuote>(() => getRandomNavoiBand());
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setQuote(getRandomNavoiBand());
  }, [location.pathname]);

  const handleRefresh = () => {
    setIsRotating(true);
    setQuote(getRandomNavoiBand());
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <section className="mt-12 overflow-hidden rounded-none border border-[#013D8C] bg-[#013D8C] text-white p-6 sm:p-8 relative font-sans">
      <Quote className="absolute right-4 bottom-4 w-28 h-28 text-white/5 pointer-events-none stroke-[1]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        {/* Header Ribbon & Refresh Button */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-amber-300/60" />
          <span className="text-xs font-bold text-amber-300 font-sans flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Alisher Navoiy Ma’rifiy Hikmatlari
          </span>
          <div className="h-px w-8 bg-amber-300/60" />

          <button
            type="button"
            onClick={handleRefresh}
            className="ml-2 p-1.5 rounded-none bg-white/10 hover:bg-amber-400 hover:text-slate-950 transition-colors text-amber-300 border border-white/15"
            title="Boshqa hikmatni ko‘rish (Random)"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* 4 Verses with Smooth Entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="space-y-1.5 py-1"
          >
            {quote.lines.map((line, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm md:text-base font-bold italic tracking-wide text-amber-50/95 leading-relaxed font-serif"
              >
                « {L(line)} »
              </p>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Attribution & Source */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] font-medium text-slate-300">
          <span className="font-extrabold text-amber-200 ">
            — {L(quote.attribution)}
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="text-blue-200/80 italic">{L(quote.source)}</span>
        </div>
      </div>
    </section>
  );
};
