import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { rectorInfo, rectorMessage } from '@/data/rector';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS, ShamsaMedallion } from '@/components/ui/PatternBackground';

export const RectorAddress: React.FC = () => {
  const { t, L } = useLanguage();
  const [open, setOpen] = useState(false);

  const full = L(rectorMessage);

  const { firstHalf, secondHalf } = useMemo(() => {
    const text = full.trim();
    const parts = text.split(/\n\n+/).filter(Boolean);
    if (parts.length >= 2) {
      const mid = Math.ceil(parts.length / 2);
      return {
        firstHalf: parts.slice(0, mid).join('\n\n'),
        secondHalf: parts.slice(mid).join('\n\n'),
      };
    }
    const mid = Math.floor(text.length / 2);
    let splitAt = text.indexOf('. ', mid);
    if (splitAt === -1 || splitAt > text.length - 40) {
      splitAt = text.lastIndexOf('. ', mid);
    }
    if (splitAt === -1) splitAt = mid;
    else splitAt += 1;
    return {
      firstHalf: text.slice(0, splitAt).trim(),
      secondHalf: text.slice(splitAt).trim(),
    };
  }, [full]);

  return (
    <section
      id="rektor-murojaati"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="rector-address-title"
    >
      <div className="absolute inset-0 bg-[#fdfaf3]" />
      <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          filter: 'sepia(0.2)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '220px 220px' }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-amber-800 font-ui mb-4">
            <span className="w-8 h-px bg-amber-600/50" />
            {t('rector_badge')}
            <span className="w-8 h-px bg-amber-600/50" />
          </p>
          <h2
            id="rector-address-title"
            className="text-3xl md:text-5xl lg:text-6xl font-classic text-slate-950 uppercase tracking-widest leading-tight"
          >
            {t('rector_title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-16 bg-amber-600/50" />
            <ShamsaMedallion className="w-7 h-7" />
            <span className="h-px w-16 bg-amber-600/50" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-[360px] mx-auto lg:mx-0 lg:sticky lg:top-32">
              <div className="absolute -inset-3 rounded-[2.5rem] border border-amber-400/50 pointer-events-none" />
              <div
                className="relative overflow-hidden rounded-[2.25rem] border-2 border-amber-300 shadow-2xl bg-white group"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src={rectorInfo.photo}
                  alt={L(rectorInfo.name)}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  width={640}
                  height={800}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-classic text-xl text-amber-300 font-bold leading-snug drop-shadow-md">
                    {L(rectorInfo.name)}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white font-ui font-bold leading-relaxed">
                    {L(rectorInfo.title)}
                  </p>
                  <p className="mt-1 text-xs font-ui text-amber-200/80 font-bold tracking-wide">
                    {L(rectorInfo.university)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-[2.5rem] border border-amber-300/80 bg-white/95 backdrop-blur-md p-8 md:p-12 shadow-2xl overflow-hidden hover:border-amber-400 transition-colors">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-amber-500/15" strokeWidth={1} aria-hidden />
              <div className="absolute left-0 top-10 bottom-10 w-1.5 gold-gradient rounded-full" />

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800 font-ui mb-6 font-bold flex items-center gap-2">
                <ShamsaMedallion className="w-5 h-5" />
                {t('rector_topic')}
              </p>

              {/* First Half */}
              <div className="space-y-5 text-lg md:text-xl font-serif-classic italic text-slate-800 leading-relaxed whitespace-pre-line">
                {firstHalf}
              </div>

              {/* Second Half */}
              <AnimatePresence initial={false}>
                {open && secondHalf && (
                  <motion.div
                    id="rector-message-more"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 space-y-5 text-lg md:text-xl font-serif-classic italic text-slate-800 leading-relaxed whitespace-pre-line">
                      {secondHalf}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!open && secondHalf && (
                <div
                  className="pointer-events-none h-16 -mt-12 relative z-[1]"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 70%, rgba(255,255,255,1) 100%)',
                  }}
                  aria-hidden
                />
              )}

              {secondHalf && (
                <div className={`relative z-[2] ${open ? 'mt-8' : 'mt-2'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="rector-message-more"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gold-gradient text-slate-950 text-[10px] font-black uppercase tracking-[0.22em] font-ui shadow-lg hover:scale-105 transition-all"
                  >
                    {open ? t('rector_collapse') : t('rector_expand')}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-amber-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="font-classic text-xl text-slate-950 font-bold">{L(rectorInfo.name)}</p>
                  <p className="mt-1 text-xs font-ui text-amber-900 font-bold">{L(rectorInfo.title)}</p>
                  <p className="text-sm italic font-serif-classic text-slate-600">{L(rectorInfo.university)}</p>
                </div>
                <div className="self-start sm:self-auto">
                  <div className="px-6 py-3 rounded-2xl bg-slate-950 text-amber-300 text-[10px] font-black uppercase tracking-[0.2em] font-ui shadow-lg border border-amber-400/40">
                    {t('rector_sign')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
