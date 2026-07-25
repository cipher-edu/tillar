import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  GraduationCap,
  Users,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { stats } from '@/data/site';
import { news } from '@/data/news';
import { programs } from '@/data/programs';
import {
  SectionTitleDecoration,
  SectionAtmosphere,
  ShamsaMedallion,
  PATTERNS,
  HERITAGE_MANUSCRIPT_URL,
} from '@/components/ui/PatternBackground';
import { HeroSlider } from '@/components/home/HeroSlider';
import { PresidentialVision } from '@/components/home/PresidentialVision';
import { PartnersSection } from '@/components/home/PartnersSection';
import { RectorAddress } from '@/components/home/RectorAddress';
import { NavoiQuoteSection } from '@/components/home/NavoiQuoteSection';
import {
  AboutFacultySection,
  LeadershipPreviewSection,
  ActiveStudentsSection,
  SciencePreviewSection,
  MediaTourSection,
  EventsSection,
  HomeCtaSection,
} from '@/components/home/LandingMoreSections';
import { ProgramCard } from '@/components/education/ProgramCard';
import { navoiQuoteIlm, navoiQuoteTil } from '@/data/navoiQuotes';
import { newsPath } from '@/lib/links';

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let frame = 0;
    const steps = 40;
    setValue(0);
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((target * frame) / steps));
      if (frame >= steps) window.clearInterval(id);
    }, 30);
    return () => window.clearInterval(id);
  }, [target, active]);
  return value;
}

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: number; index: number }> = ({
  icon,
  label,
  value,
  index,
}) => {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  return (
    <motion.div
      onViewportEnter={() => setVisible(true)}
      onViewportLeave={() => setVisible(false)}
      viewport={{ once: false, amount: 0.35, margin: '0px 0px -40px 0px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[2.5rem] border-2 border-amber-300/60 bg-white/95 backdrop-blur-xl p-8 text-center shadow-lg transition-all duration-500 hover:bg-white hover:border-amber-400 hover:shadow-[0_22px_50px_-14px_rgba(212,175,55,0.32)] hover:-translate-y-2 flex flex-col justify-between items-center">
        {/* Soft gold wash on hover (no dark invert) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-amber-50/80 via-transparent to-amber-100/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none"
          style={{ backgroundImage: PATTERNS.girih, backgroundSize: '160px 160px' }}
        />

        <div className="relative z-10 w-full flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-black font-classic text-amber-800">
            0{index + 1}
          </span>
          <ShamsaMedallion className="w-5 h-5" />
        </div>

        <div className="relative z-10 my-6">
          <div className="w-16 h-16 rounded-2xl gold-gradient text-slate-950 flex items-center justify-center shadow-xl border border-amber-200/60 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_28px_rgba(212,175,55,0.45)] transition-all duration-500">
            {icon}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-4xl md:text-5xl font-classic font-black text-slate-950 group-hover:text-amber-950 transition-colors duration-300 tracking-tight mb-2">
            {count}+
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 group-hover:text-amber-900 transition-colors duration-300 font-ui">
            {label}
          </p>
        </div>

        <div className="relative z-10 w-0 group-hover:w-full h-1 gold-gradient transition-all duration-500 rounded-full mt-6 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      </div>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const { t, L } = useLanguage();
  const [programFilter, setProgramFilter] = useState<'all' | 'bachelor' | 'master'>('all');

  const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const featuredNewsItem = sortedNews[0];
  const secondaryNewsItems = sortedNews.slice(1, 4);

  const filteredPrograms = programs.filter((p) => {
    if (programFilter === 'bachelor') return p.level === 'bachelor';
    if (programFilter === 'master') return p.level === 'master';
    return true;
  });

  return (
    <>
      <HeroSlider />

      {/* ========== STATISTIKA SEKSIYASI ========== */}
      <section className="py-24 md:py-28 relative overflow-hidden bg-[#fdfaf3]">
        <SectionAtmosphere tone="heritage-strong" variant="center" manuscript />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitleDecoration />
          <h2 className="text-3xl md:text-5xl font-classic text-slate-950 uppercase tracking-widest text-center mb-3">
            Fakultet Ko'rsatkichlari
          </h2>
          <p className="text-center text-lg md:text-xl italic font-serif-classic text-amber-900/80 mb-14 max-w-xl mx-auto">
            Ilm-fan, ta'lim va xalqaro hamkorlikdagi bosh natijalarimiz
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            <StatItem icon={<Users className="w-8 h-8" />} label={t('stats_students')} value={stats.students} index={0} />
            <StatItem icon={<GraduationCap className="w-8 h-8" />} label={t('stats_professors')} value={stats.professors} index={1} />
            <StatItem icon={<BookOpen className="w-8 h-8" />} label={t('stats_programs')} value={stats.programs} index={2} />
            <StatItem icon={<Globe className="w-8 h-8" />} label={t('stats_partners')} value={stats.partners} index={3} />
            <StatItem icon={<FlaskConical className="w-8 h-8" />} label={t('stats_projects')} value={stats.projects} index={4} />
          </div>
        </div>
      </section>

      {/* ========== NAVOIY IQTIBOSI — ILM & TAMADDUN ========== */}
      <NavoiQuoteSection quote={navoiQuoteIlm} variant="heritage" />

      {/* ========== PREZIDENT FIKRLARI ========== */}
      <PresidentialVision />

      {/* ========== BENTO GRID: SO'NGGI YANGILIKLAR ========== */}
      <section id="home-news" className="py-24 md:py-32 relative overflow-hidden bg-[#fdfaf3]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionTitleDecoration />
              <h2 className="text-4xl md:text-6xl font-classic text-slate-950 uppercase tracking-widest leading-tight">
                {t('home_news')}
              </h2>
              <p className="text-lg font-serif-classic italic text-slate-700 mt-2">
                Fakultetimizning so'nggi ilmiy, madaniy va ta'limiy yangiliklari bilan tanishing
              </p>
            </div>
            <Link
              to="/yangiliklar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-400/60 bg-white/80 text-[11px] font-black uppercase tracking-[0.25em] text-amber-950 hover:bg-amber-50 hover:border-amber-500 hover:shadow-md transition-all font-ui self-center md:self-auto"
            >
              {t('home_news_more')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Spotlight News */}
            {featuredNewsItem && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.25, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <Link
                  to={newsPath(featuredNewsItem.slug)}
                  className="group relative block h-full min-h-[460px] rounded-[3rem] overflow-hidden border border-amber-400/40 shadow-2xl bg-slate-950 text-white"
                >
                  <img
                    src={featuredNewsItem.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest font-ui gold-gradient text-slate-950 shadow-md">
                        Muhim Yangilik
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 font-ui flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {featuredNewsItem.date}
                      </span>
                    </div>

                    <h3 className="font-classic text-3xl sm:text-4xl text-white uppercase tracking-tight leading-snug mb-4 group-hover:text-amber-300 transition-colors">
                      {L(featuredNewsItem.title)}
                    </h3>

                    <p className="text-lg font-serif-classic italic text-slate-300 line-clamp-3 mb-6">
                      {L(featuredNewsItem.excerpt)}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 font-ui">
                      <span>Batafsil o'qish</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Secondary News List */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {secondaryNewsItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <Link
                    to={newsPath(item.slug)}
                    className="glass-card rounded-[2rem] p-6 border-amber-300/60 group hover:shadow-[0_18px_40px_-12px_rgba(166,124,0,0.22)] hover:bg-white hover:border-amber-400 transition-all flex gap-5 items-center"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 ring-2 ring-amber-200/50 group-hover:ring-amber-400/60 transition-all">
                      <img
                        src={item.cover}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 group-hover:text-amber-800 font-ui mb-1 transition-colors">
                        {item.date}
                      </p>
                      <h4 className="font-classic text-lg text-slate-950 group-hover:text-amber-950 font-bold leading-snug line-clamp-2 mb-2 transition-colors">
                        {L(item.title)}
                      </h4>
                      <p className="text-xs font-serif-classic italic text-slate-600 group-hover:text-slate-700 line-clamp-2 transition-colors">
                        {L(item.excerpt)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REKTOR MUROJAATI */}
      <RectorAddress />

      {/* YANGI BO'LIMLAR */}
      <AboutFacultySection />
      <LeadershipPreviewSection />
      <ActiveStudentsSection />
      <SciencePreviewSection />
      <MediaTourSection />
      <EventsSection />
      <HomeCtaSection />

      {/* ========== TA'LIM YO'NALISHLARI — royal fon (Meros/Global dialogue dan) ========== */}
      <section className="py-24 relative overflow-hidden">
        {/* Oldin Navoiy «Meros · Modern world · Global dialogue» bo'limi foni */}
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-center mb-2 opacity-90">
            <SectionTitleDecoration />
          </div>
          <h2 className="text-4xl md:text-6xl font-classic text-transparent bg-clip-text gold-gradient uppercase tracking-widest text-center mb-4">
            {t('home_programs')}
          </h2>
          <p className="text-center text-xl md:text-2xl italic font-serif-classic text-amber-100/75 mb-10 max-w-2xl mx-auto">
            <span className="text-amber-400">❦</span> {t('programs_intro')}{' '}
            <span className="text-amber-400 inline-block rotate-180">❦</span>
          </p>

          {/* Level Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-amber-400/25 backdrop-blur-md">
              <button
                onClick={() => setProgramFilter('all')}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest font-ui transition-all ${
                  programFilter === 'all'
                    ? 'gold-gradient text-slate-950 shadow-lg'
                    : 'text-amber-100/70 hover:text-amber-200'
                }`}
              >
                Barchasi ({programs.length})
              </button>
              <button
                onClick={() => setProgramFilter('bachelor')}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest font-ui transition-all ${
                  programFilter === 'bachelor'
                    ? 'gold-gradient text-slate-950 shadow-lg'
                    : 'text-amber-100/70 hover:text-amber-200'
                }`}
              >
                {t('level_bachelor')}
              </button>
              <button
                onClick={() => setProgramFilter('master')}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest font-ui transition-all ${
                  programFilter === 'master'
                    ? 'gold-gradient text-slate-950 shadow-lg'
                    : 'text-amber-100/70 hover:text-amber-200'
                }`}
              >
                {t('level_master')}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredPrograms.slice(0, 6).map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} variant="compact" />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/talim/yonalishlar"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl gold-gradient text-slate-950 font-black text-xs uppercase tracking-[0.25em] shadow-xl hover:scale-105 transition-all font-ui"
            >
              {t('home_programs_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== NAVOIY — Meros · Modern world · Global dialogue (programs dan heritage fon) ========== */}
      <NavoiQuoteSection quote={navoiQuoteTil} variant="heritage" atmosphere="heritage-strong" />

      {/* XALQARO HAMKORLAR */}
      <PartnersSection />
    </>
  );
};
