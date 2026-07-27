import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { heroSlides } from '@/data/site';

const QUICK_LINKS = [
  { label: 'Bakalavriat', short: 'Bak.', to: '/talim/yonalishlar', icon: GraduationCap },
  { label: 'Magistratura', short: 'Mag.', to: '/talim/yonalishlar', icon: BookOpen },
  { label: 'Kafedralar', short: 'Kaf.', to: '/fakultet/tuzilma', icon: Building2 },
  { label: "O'qituvchilar", short: "O'qit.", to: '/jamoa/professorlar', icon: Users },
  { label: 'Ilm-fan', short: 'Ilm', to: '/ilm-fan', icon: Sparkles },
];

const SEARCH_ROUTES: { keys: string[]; to: string }[] = [
  { keys: ['bakalavr', 'magistr', 'yonalish', "yo'nalish", 'dastur', 'program'], to: '/talim/yonalishlar' },
  { keys: ['kafedra', 'tuzilma', 'department'], to: '/fakultet/tuzilma' },
  { keys: ['professor', 'oqituv', "o'qituv", 'ustoz', 'jamoa'], to: '/jamoa/professorlar' },
  { keys: ['yangilik', 'news', 'axborot'], to: '/yangiliklar' },
  { keys: ['rahbar', 'dekan', 'rektor'], to: '/fakultet/rahbariyat' },
  { keys: ['ilm', 'fan', 'scopus', 'loyiha'], to: '/ilm-fan' },
  { keys: ['aloqa', 'kontakt', 'contact'], to: '/aloqa' },
  { keys: ['talaba', 'student'], to: '/talabalar' },
  { keys: ['reja', 'curriculum'], to: '/talim/oquv-rejalar' },
];

export const GovHeroSlider: React.FC = () => {
  const { L } = useLanguage();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [animKey, setAnimKey] = useState(0);

  const total = heroSlides.length;
  const slide = heroSlides[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setAnimKey((k) => k + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [total, currentIndex]);

  const goTo = (idx: number) => {
    setCurrentIndex(idx);
    setAnimKey((k) => k + 1);
  };

  const prev = () => goTo(currentIndex === 0 ? total - 1 : currentIndex - 1);
  const next = () => goTo((currentIndex + 1) % total);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      navigate('/yangiliklar');
      return;
    }
    const hit = SEARCH_ROUTES.find((r) => r.keys.some((k) => q.includes(k)));
    navigate(hit?.to ?? '/talim/yonalishlar');
  };

  const progressKey = useMemo(() => `p-${animKey}-${currentIndex}`, [animKey, currentIndex]);

  return (
    <section className="gov-hero relative text-white overflow-hidden select-none" aria-label="Asosiy slayder">
      {/* Full-bleed images */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
            }`}
            aria-hidden={idx !== currentIndex}
          >
            <img
              src={s.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover object-center ${
                idx === currentIndex ? 'gov-kenburns' : ''
              }`}
              draggable={false}
            />
          </div>
        ))}
        <div className="absolute inset-0 z-[2] gov-hero-gradient" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#013d8c] via-[#013d8c]/30 to-[#021e44]/35" />
      </div>

      <div className="relative z-20 w-full h-full min-h-[inherit] flex flex-col">
        <div className="gov-shell flex-1 flex flex-col justify-between gap-5 sm:gap-6 py-5 sm:py-7 md:py-9">
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-semibold tracking-wide text-blue-100/90">
            <div className="inline-flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.2)] shrink-0" />
              <span className="uppercase tracking-[0.12em] truncate">
                Navoiy davlat universiteti · Tillar fakulteti
              </span>
            </div>
            <span className="text-white/75 tabular-nums shrink-0">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Copy */}
          <div
            key={slide.id}
            className="w-full max-w-3xl xl:max-w-4xl mr-auto lg:mr-0 lg:ml-auto gov-fade-up space-y-3.5 sm:space-y-4 md:space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#013d8c] text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.1em] shadow-gov border border-white/80">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{L(slide.tag)}</span>
            </div>

            <h1 className="text-[1.65rem] leading-[1.12] sm:text-4xl md:text-5xl lg:text-[3.15rem] font-extrabold uppercase tracking-wide drop-shadow-lg">
              {L(slide.title)}
            </h1>

            <p className="text-[13px] sm:text-sm md:text-base text-blue-50/95 font-medium leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none">
              {L(slide.description)}
            </p>

            <div className="pt-0.5 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                to={slide.ctaTo}
                className="gov-btn px-4 sm:px-6 py-3 sm:py-3.5 bg-white text-[#013d8c] border border-white shadow-gov hover:bg-[#eff7ff] hover:-translate-y-0.5 group text-[11px] sm:text-xs"
              >
                <span>{L(slide.ctaLabel)}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/talim/yonalishlar"
                className="gov-btn gov-btn-outline px-4 sm:px-5 py-3 sm:py-3.5 backdrop-blur-md group text-[11px] sm:text-xs"
              >
                <BookOpen className="w-4 h-4 text-white/90" />
                <span>Ta'lim yo'nalishlari</span>
              </Link>
            </div>
          </div>

          {/* Search — full width panel */}
          <div className="w-full">
            <div className="w-full bg-[#013d8c]/92 backdrop-blur-xl rounded-xl border border-white/20 shadow-gov-lg p-3 sm:p-4 md:p-5">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg p-1.5 sm:p-2 shadow-inner focus-within:ring-2 focus-within:ring-[#1675e0] transition-shadow"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0 px-1">
                  <Search className="w-5 h-5 text-[#707070] shrink-0 ml-1" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Yo'nalish, kafedra, professor yoki xizmat..."
                    className="w-full min-w-0 text-xs sm:text-sm text-[#131523] placeholder:text-[#9ca3af] focus:outline-none py-2.5 font-medium bg-transparent"
                    aria-label="Qidiruv"
                  />
                </div>
                <button
                  type="submit"
                  className="gov-btn w-full sm:w-auto shrink-0 px-6 py-3 bg-[#013d8c] text-white border border-[#013d8c] hover:bg-[#021e44]"
                >
                  Qidirish
                </button>
              </form>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-white/90 shrink-0 pr-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tezkor:
                </span>
                {QUICK_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to + item.label}
                      to={item.to}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold text-blue-50 bg-white/10 border border-white/15 hover:bg-white hover:text-[#013d8c] transition-all duration-200 shrink-0 whitespace-nowrap"
                    >
                      <Icon className="w-3 h-3 opacity-90" />
                      <span className="sm:hidden">{item.short}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="hidden sm:flex absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-[60%] z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#013d8c] backdrop-blur-md border border-white/25 items-center justify-center transition-all hover:scale-105 shadow-gov"
        aria-label="Oldingi slayd"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        className="hidden sm:flex absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-[60%] z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#013d8c] backdrop-blur-md border border-white/25 items-center justify-center transition-all hover:scale-105 shadow-gov"
        aria-label="Keyingi slayd"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <div className="gov-shell pb-3 sm:pb-4 pt-12 bg-gradient-to-t from-[#013d8c]/95 via-[#013d8c]/30 to-transparent">
          <div className="flex items-center justify-center gap-3 pointer-events-auto">
            <button
              type="button"
              onClick={prev}
              className="sm:hidden w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
              aria-label="Oldingi"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex justify-center items-center gap-2">
              {heroSlides.map((_, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Slayd ${idx + 1}`}
                    className={`relative h-2 sm:h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                      active ? 'w-9 sm:w-12 bg-white/25' : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/75'
                    }`}
                  >
                    {active ? (
                      <span key={progressKey} className="absolute inset-y-0 left-0 gov-progress-fill rounded-full" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={next}
              className="sm:hidden w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
              aria-label="Keyingi"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
