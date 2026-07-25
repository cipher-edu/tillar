import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { heroSlides } from '@/data/site';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS } from '@/components/ui/PatternBackground';

const SLIDE_MS = 7500;

export const HeroSlider: React.FC = () => {
  const { t, L } = useLanguage();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = heroSlides.length;
  const current = heroSlides[index];

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % total) + total) % total);
      setProgress(0);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      const p = Math.min(1, elapsed / SLIDE_MS);
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
  }, [index, paused, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const textVariants = {
    enter: (dir: number) => ({ opacity: 0, y: 28, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0, x: 0 },
    exit: (dir: number) => ({ opacity: 0, y: -16, x: dir > 0 ? -30 : 30 }),
  };

  return (
    <section
      className="relative w-full min-h-[100svh] h-[100svh] max-h-[1200px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={t('hero_title')}
    >
      {/* ========== FULL-WIDTH BACKGROUND ========== */}
      <div className="absolute inset-0 w-full h-full">
        {heroSlides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
              }`}
              aria-hidden={!active}
            >
              <img
                src={slide.image}
                alt=""
                className={`w-full h-full object-cover object-center ${active ? 'hero-kenburns' : ''}`}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Manuscript wash — sayt imidji */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.22] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.3) contrast(0.95)',
          }}
        />

        {/* Cinematic overlays — matn o'qilishi + heritage palette */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-[#0c1620]/25" />
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-[#fdfaf3] via-[#fdfaf3]/35 to-transparent" />
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-[#fdfaf3]/85 via-[#fdfaf3]/20 to-transparent" />
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-r from-[#fdfaf3]/70 via-transparent to-[#fdfaf3]/40" />

        {/* Girih panjara — yulduz (star) naqshi sliderda ishlatilmaydi */}
        <div
          className="absolute inset-0 z-[3] opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: PATTERNS.girih, backgroundSize: '240px 240px' }}
        />

        {/* Amber glows */}
        <div className="absolute z-[3] top-[20%] left-1/2 -translate-x-1/2 w-[min(90vw,800px)] h-[min(90vw,800px)] bg-amber-200/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute z-[3] bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fdfaf3] to-transparent pointer-events-none" />
      </div>

      {/* ========== SIDE NAV (desktop) ========== */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-amber-300/40 bg-white/50 backdrop-blur-xl items-center justify-center text-slate-900 hover:bg-slate-950 hover:text-amber-200 hover:border-slate-950 transition-all shadow-xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-amber-300/40 bg-white/50 backdrop-blur-xl items-center justify-center text-slate-900 hover:bg-slate-950 hover:text-amber-200 hover:border-slate-950 transition-all shadow-xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* ========== FULL-WIDTH CONTENT ========== */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-20 pt-28 pb-8">
          <div className="w-full max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-300/50 bg-white/55 backdrop-blur-md text-amber-950 text-[10px] font-black tracking-[0.4em] uppercase mb-8 shadow-sm font-ui"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {t('hero_badge')}
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </motion.div>

            <div className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[340px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex flex-col items-center"
                >
                  <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-900/90 mb-5 font-ui flex items-center justify-center gap-4">
                    <span className="hidden sm:inline-block w-12 h-px bg-gradient-to-r from-transparent to-amber-600/70" />
                    {L(current.tag)}
                    <span className="hidden sm:inline-block w-12 h-px bg-gradient-to-l from-transparent to-amber-600/70" />
                  </p>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-classic font-black text-slate-950 leading-[0.98] uppercase tracking-tight mb-6 whitespace-pre-line drop-shadow-sm">
                    {L(current.title)}
                  </h1>

                  <div className="h-px w-28 sm:w-40 bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-6 opacity-80" />

                  <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif-classic italic text-slate-800 leading-snug mb-10 px-2">
                    <span className="text-amber-500 mr-2 not-italic">❦</span>
                    {L(current.description)}
                    <span className="text-amber-500 ml-2 not-italic inline-block rotate-180">❦</span>
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <Link
                      to={current.ctaTo}
                      className="group inline-flex items-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.22em] shadow-2xl hover:-translate-y-0.5 transition-all font-ui"
                    >
                      {L(current.ctaLabel)}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/talim/yonalishlar"
                      className="inline-flex items-center gap-2 px-8 py-4 sm:py-5 rounded-2xl border-2 border-amber-700/30 text-amber-950 font-black text-[11px] uppercase tracking-[0.22em] hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all font-ui bg-white/50 backdrop-blur-md"
                    >
                      {t('hero_cta_programs')}
                    </Link>
                    <Link
                      to="/talabalar"
                      className="hidden sm:inline-flex items-center gap-2 px-8 py-4 sm:py-5 rounded-2xl gold-gradient text-slate-950 font-black text-[11px] uppercase tracking-[0.22em] shadow-lg hover:brightness-110 transition-all font-ui"
                    >
                      {t('hero_cta_students')}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========== FULL-WIDTH BOTTOM BAR ========== */}
        <div className="relative z-20 w-full shrink-0 pb-6 sm:pb-8 pt-2">
          {/* Progress track — edge to edge thin gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-900/10">
            <div
              className="h-full gold-gradient transition-[width] duration-100 ease-linear"
              style={{ width: `${((index + progress) / total) * 100}%` }}
            />
          </div>

          <div className="w-full px-5 sm:px-10 lg:px-16">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              {/* Counter + mobile arrows */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <p className="font-classic text-slate-900 text-sm tracking-widest tabular-nums">
                  <span className="text-2xl text-amber-800">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-amber-700/40 mx-2">/</span>
                  <span className="text-slate-400">{String(total).padStart(2, '0')}</span>
                </p>
                <div className="flex md:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="w-11 h-11 rounded-full border border-amber-300/50 bg-white/70 backdrop-blur flex items-center justify-center text-slate-900"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="w-11 h-11 rounded-full border border-amber-300/50 bg-white/70 backdrop-blur flex items-center justify-center text-slate-900"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Full-width slide segments */}
              <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    aria-label={L(s.tag)}
                    aria-current={i === index}
                    className="group flex-1 min-w-0 flex flex-col gap-2 text-left"
                  >
                    <span
                      className={`block w-full h-[3px] rounded-full overflow-hidden transition-colors ${
                        i === index ? 'bg-amber-200/80' : 'bg-amber-900/12 group-hover:bg-amber-900/22'
                      }`}
                    >
                      {i === index && (
                        <span
                          className="block h-full gold-gradient rounded-full"
                          style={{ width: `${progress * 100}%` }}
                        />
                      )}
                      {i < index && <span className="block h-full w-full gold-gradient rounded-full" />}
                    </span>
                    <span
                      className={`hidden lg:block text-[9px] font-black uppercase tracking-[0.2em] font-ui truncate transition-colors ${
                        i === index ? 'text-amber-900' : 'text-slate-400 group-hover:text-amber-800'
                      }`}
                    >
                      {L(s.tag)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active tag chip */}
              <div className="hidden xl:flex items-center gap-3 px-5 py-3 rounded-2xl border border-amber-200/60 bg-white/55 backdrop-blur-md max-w-xs">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-200 shrink-0">
                  <img src={current.image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700 font-ui leading-snug line-clamp-2">
                  {L(current.tag)}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-5 flex flex-col items-center gap-1.5 text-amber-800/40 pointer-events-none"
          >
            <span className="text-[9px] font-black uppercase tracking-widest font-ui">{t('scroll')}</span>
            <div className="w-px h-8 bg-gradient-to-b from-amber-600/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
