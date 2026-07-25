import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  PRESIDENT_NAME,
  PRESIDENT_PHOTO_FALLBACK,
  PRESIDENT_TITLE,
  presidentialQuotes,
  type PresidentialTheme,
} from '@/data/presidential';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS, ShamsaMedallion } from '@/components/ui/PatternBackground';

const SLIDE_MS = 9000;
const total = presidentialQuotes.length;

const themeLabelKey: Record<PresidentialTheme, string> = {
  language: 'pres_theme_language',
  education: 'pres_theme_education',
  foreign: 'pres_theme_foreign',
};

function SafePhoto({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? PRESIDENT_PHOTO_FALLBACK : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setErr(true)}
    />
  );
}

export const PresidentialVision: React.FC = () => {
  const { t, L } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const current = presidentialQuotes[index];

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % total) + total) % total);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / SLIDE_MS);
      setProgress(p);
      if (p >= 1) {
        setDirection(1);
        setIndex((i) => (i + 1) % total);
        setProgress(0);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  if (!current) return null;

  return (
    <section
      id="prezident-fikrlari"
      className="relative overflow-hidden py-20 md:py-28 bg-slate-950"
      aria-roledescription="carousel"
      aria-labelledby="presidential-vision-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 opacity-[0.1] animated-pattern pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '120px 120px' }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient opacity-40" />
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-14">
          <p className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 font-ui mb-4">
            <ShamsaMedallion className="w-5 h-5" />
            {t('pres_badge')}
            <ShamsaMedallion className="w-5 h-5" />
          </p>
          <h2
            id="presidential-vision-title"
            className="text-3xl md:text-5xl lg:text-6xl font-classic text-white uppercase tracking-widest leading-tight"
          >
            {t('pres_title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl italic font-serif-classic text-slate-300 leading-relaxed">
            {t('pres_subtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Photo */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full max-w-[420px] mx-auto lg:mx-0">
                <div
                  className="relative w-full overflow-hidden rounded-[2.5rem] border border-amber-400/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] bg-slate-900"
                  style={{ aspectRatio: '4 / 5' }}
                >
                  <div className="absolute inset-3 rounded-[2rem] border border-amber-400/30 pointer-events-none z-20" />

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current.id + '-img'}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0"
                    >
                      <SafePhoto
                        src={current.photo}
                        alt={L(PRESIDENT_NAME)}
                        className="absolute inset-0 w-full h-full object-cover object-top brightness-95"
                        width={640}
                        height={800}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10 pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-lg shrink-0 border border-amber-200/50">
                        <span className="font-classic font-black text-slate-950 text-xs">SM</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-classic text-xl text-white font-bold leading-tight">
                          {L(PRESIDENT_NAME)}
                        </p>
                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.22em] text-amber-400 font-ui font-bold">
                          {L(PRESIDENT_TITLE)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Content */}
            <div className="lg:col-span-7 flex flex-col min-h-[380px] md:min-h-[460px]">
              <div className="relative flex-1 rounded-[2.5rem] border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-amber-500/15" strokeWidth={1} aria-hidden />
                <div className="absolute -left-1 top-10 bottom-10 w-1.5 gold-gradient rounded-full" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45 }}
                    className="relative h-full flex flex-col"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="inline-flex px-4 py-1.5 rounded-full gold-gradient text-slate-950 text-[9px] font-black uppercase tracking-[0.2em] font-ui shadow-md">
                        {t(themeLabelKey[current.theme])}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 font-ui tabular-nums font-bold">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                    </div>

                    <blockquote className="text-xl md:text-2xl lg:text-[1.55rem] font-serif-classic italic text-white leading-relaxed flex-1 drop-shadow-md">
                      <span className="text-amber-400 not-italic mr-1">“</span>
                      {L(current.quote)}
                      <span className="text-amber-400 not-italic ml-1">”</span>
                    </blockquote>

                    <div className="mt-8 pt-6 border-t border-amber-500/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 font-ui mb-2 font-bold">
                        {t('pres_source')}
                      </p>
                      <p className="text-sm md:text-base font-serif-classic text-slate-200 leading-snug mb-1 font-semibold">
                        {L(current.sourceTitle)}
                      </p>
                      <p className="text-[11px] font-ui text-slate-400 mb-4">{current.sourceDate}</p>
                      <a
                        href={current.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-[0.2em] font-ui hover:bg-amber-400 hover:text-slate-950 transition-all shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {t('pres_open_source')}
                        <span className="opacity-70 normal-case tracking-normal font-normal">president.uz</span>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label={t('pagination_prev')}
                className="w-12 h-12 rounded-full border border-amber-400/40 bg-white/10 text-amber-300 flex items-center justify-center hover:gold-gradient hover:text-slate-950 transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t('pagination_next')}
                className="w-12 h-12 rounded-full border border-amber-400/40 bg-white/10 text-amber-300 flex items-center justify-center hover:gold-gradient hover:text-slate-950 transition-all duration-300 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 w-full flex items-center gap-2 min-w-0">
              {presidentialQuotes.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  aria-label={`${t('pres_quote')} ${i + 1}`}
                  aria-current={i === index}
                  className="group flex-1 h-10 flex items-center min-w-0"
                >
                  <span
                    className={`block w-full h-[4px] rounded-full overflow-hidden ${
                      i === index ? 'bg-white/30' : 'bg-white/10 group-hover:bg-white/20'
                    }`}
                  >
                    {i === index && (
                      <span className="block h-full gold-gradient rounded-full shadow-[0_0_10px_#d4af37]" style={{ width: `${progress * 100}%` }} />
                    )}
                    {i < index && <span className="block h-full w-full gold-gradient rounded-full" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
