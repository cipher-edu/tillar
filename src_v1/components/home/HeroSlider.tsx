import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, GraduationCap, Award, PlayCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { heroSlides } from '@/data/site';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS } from '@/components/ui/PatternBackground';

const SLIDE_MS = 6500;

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

  /* Mobil swipe */
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.changedTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    setTouchX(null);
  };

  // Entrance animation: starts blurred & scaled, clarifies into crisp focus
  const textVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      filter: 'blur(16px)',
      scale: 1.06,
      y: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      y: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      filter: 'blur(12px)',
      scale: 0.96,
      y: dir > 0 ? -20 : 20,
    }),
  };

  return (
    <section
      className="relative w-full min-h-[100svh] h-[100svh] max-h-[1200px] overflow-hidden bg-slate-950 touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
              className={`absolute inset-0 w-full h-full transition-all duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active ? 'opacity-100 scale-100 filter-none z-[1]' : 'opacity-0 scale-105 blur-sm z-0'
              }`}
              aria-hidden={!active}
            >
              <img
                src={slide.image}
                alt=""
                className={`w-full h-full object-cover object-center brightness-90 ${active ? 'hero-kenburns' : ''}`}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Manuscript overlay */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Subtle Girih Pattern */}
        <div
          className="absolute inset-0 z-[3] opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: PATTERNS.girih, backgroundSize: '240px 240px' }}
        />

        {/* Glowing Amber Orbs */}
        <div className="absolute z-[3] top-[15%] left-1/4 w-[min(90vw,700px)] h-[min(90vw,700px)] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute z-[3] bottom-10 right-10 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* ========== DESKTOP NAVIGATION ARROWS ========== */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-amber-400/30 bg-slate-900/60 backdrop-blur-2xl items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-2xl group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-amber-400/30 bg-slate-900/60 backdrop-blur-2xl items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 shadow-2xl group"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ========== MAIN CONTENT WITH UNBLUR/CLARIFY ANIMATION ========== */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-10 lg:px-20 pt-24 sm:pt-32 pb-6 sm:pb-10">
          <div className="w-full max-w-6xl mx-auto text-center">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-amber-400/30 bg-slate-900/70 backdrop-blur-xl text-amber-300 text-[9px] sm:text-[10px] font-black tracking-[0.22em] sm:tracking-[0.4em] uppercase mb-5 sm:mb-8 shadow-2xl font-ui max-w-[95vw]"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="truncate">{t('hero_badge')}</span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>

            {/* Slide Details with Clarifying Blur Transition */}
            <div className="relative min-h-[220px] sm:min-h-[300px] md:min-h-[340px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex flex-col items-center"
                >
                  <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-400 mb-4 font-ui flex items-center justify-center gap-4">
                    <span className="hidden sm:inline-block w-12 h-px bg-gradient-to-r from-transparent to-amber-400/80" />
                    {L(current.tag)}
                    <span className="hidden sm:inline-block w-12 h-px bg-gradient-to-l from-transparent to-amber-400/80" />
                  </p>

                  <h1 className="text-[1.65rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-classic font-black text-white sm:leading-[1.02] uppercase tracking-tight mb-4 sm:mb-6 whitespace-pre-line drop-shadow-2xl px-1">
                    {L(current.title)}
                  </h1>

                  <div className="h-0.5 w-24 sm:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4 sm:mb-6 opacity-90" />

                  <p className="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl lg:text-3xl font-serif-classic italic text-slate-200 leading-snug mb-6 sm:mb-10 px-1 drop-shadow-md line-clamp-4 sm:line-clamp-none">
                    <span className="text-amber-400 mr-2 not-italic">❦</span>
                    {L(current.description)}
                    <span className="text-amber-400 ml-2 not-italic inline-block rotate-180">❦</span>
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
                    <Link
                      to={current.ctaTo}
                      className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-5 rounded-2xl gold-gradient text-slate-950 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all font-ui"
                    >
                      {L(current.ctaLabel)}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/talim/yonalishlar"
                      className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-5 rounded-2xl border border-white/20 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] hover:bg-white/10 hover:border-amber-400 transition-all font-ui bg-slate-900/60 backdrop-blur-xl"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      {t('hero_cta_programs')}
                    </Link>
                    <Link
                      to="/talabalar"
                      className="hidden sm:inline-flex items-center gap-2.5 px-8 py-4 sm:py-5 rounded-2xl border border-amber-400/40 text-amber-300 font-black text-[11px] uppercase tracking-[0.22em] hover:bg-amber-500/20 transition-all font-ui bg-slate-950/70 backdrop-blur-xl"
                    >
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      {t('hero_cta_students')}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========== BOTTOM SLIDE PROGRESS & INDICATOR ========== */}
        <div className="relative z-20 w-full shrink-0 pb-5 sm:pb-8 pt-3 sm:pt-4 safe-pb">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
            <div
              className="h-full gold-gradient transition-[width] duration-100 ease-linear shadow-[0_0_15px_#d4af37]"
              style={{ width: `${((index + progress) / total) * 100}%` }}
            />
          </div>

          <div className="w-full px-4 sm:px-10 lg:px-16">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              {/* Counter & Mobile Arrows */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <p className="font-classic text-white text-base tracking-widest tabular-nums font-bold">
                  <span className="text-xl sm:text-2xl text-amber-400">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-white/30 mx-2">/</span>
                  <span className="text-slate-400">{String(total).padStart(2, '0')}</span>
                </p>
                <div className="flex md:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="w-11 h-11 rounded-full border border-white/20 bg-slate-900/80 flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-400" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="w-11 h-11 rounded-full border border-white/20 bg-slate-900/80 flex items-center justify-center text-white"
                  >
                    <ChevronRight className="w-5 h-5 text-amber-400" />
                  </button>
                </div>
              </div>

              {/* Segment Indicators */}
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
                      className={`block w-full h-[4px] rounded-full overflow-hidden transition-colors ${
                        i === index ? 'bg-white/30' : 'bg-white/10 group-hover:bg-white/20'
                      }`}
                    >
                      {i === index && (
                        <span
                          className="block h-full gold-gradient rounded-full shadow-[0_0_10px_#d4af37]"
                          style={{ width: `${progress * 100}%` }}
                        />
                      )}
                      {i < index && <span className="block h-full w-full gold-gradient rounded-full" />}
                    </span>
                    <span
                      className={`hidden lg:block text-[9px] font-black uppercase tracking-[0.2em] font-ui truncate transition-colors ${
                        i === index ? 'text-amber-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {L(s.tag)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
