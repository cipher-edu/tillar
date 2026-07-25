import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  GraduationCap,
  Users,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { stats } from '@/data/site';
import { news } from '@/data/news';
import { programs } from '@/data/programs';
import {
  SectionTitleDecoration,
  SectionAtmosphere,
} from '@/components/ui/PatternBackground';
import { HeroSlider } from '@/components/home/HeroSlider';
import { PresidentialVision } from '@/components/home/PresidentialVision';
import { PartnersSection } from '@/components/home/PartnersSection';
import { RectorAddress } from '@/components/home/RectorAddress';
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
import { newsPath } from '@/lib/links';

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const steps = 40;
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((target * frame) / steps));
      if (frame >= steps) window.clearInterval(id);
    }, 30);
    return () => window.clearInterval(id);
  }, [target, active]);
  return value;
}

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({
  icon,
  label,
  value,
}) => {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  return (
    <motion.div
      onViewportEnter={() => setVisible(true)}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-[2.5rem] border-amber-200/50 text-center hover:bg-white transition-all"
    >
      <div className="flex justify-center mb-4 text-amber-600">{icon}</div>
      <p className="text-4xl md:text-5xl font-classic font-black text-slate-900 mb-2">{count}+</p>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-ui">{label}</p>
    </motion.div>
  );
};

export const HomePage: React.FC = () => {
  const { t, L } = useLanguage();

  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <>
      <HeroSlider />

      {/*
        Statistika — sliderdan keyin: joriy soft fon SAQLANADI
        (SectionAtmosphere soft: krem + parchment/girih yengil, manuscript yo'q)
      */}
      <section className="py-24 relative overflow-hidden">
        <SectionAtmosphere tone="soft" variant="center" manuscript={false} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitleDecoration />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            <StatItem icon={<Users className="w-7 h-7" />} label={t('stats_students')} value={stats.students} />
            <StatItem icon={<GraduationCap className="w-7 h-7" />} label={t('stats_professors')} value={stats.professors} />
            <StatItem icon={<BookOpen className="w-7 h-7" />} label={t('stats_programs')} value={stats.programs} />
            <StatItem icon={<Globe className="w-7 h-7" />} label={t('stats_partners')} value={stats.partners} />
            <StatItem icon={<FlaskConical className="w-7 h-7" />} label={t('stats_projects')} value={stats.projects} />
          </div>
        </div>
      </section>

      {/* Prezident fikrlari — oliy ta'lim va o'zbek tili (rasmiy manbalar) */}
      <PresidentialVision />

      {/*
        So'nggi yangiliklar — namuna loyiha «Simpozium haqida» (About fullPage) foni:
        About.tsx: bg-[#fdfaf3] + relative overflow-hidden
      */}
      <section
        id="home-news"
        className="py-24 md:py-32 relative overflow-hidden min-h-0 bg-[#fdfaf3]"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionTitleDecoration />
              <h2 className="text-4xl md:text-6xl font-classic text-slate-950 uppercase tracking-widest text-center md:text-left leading-tight">
                {t('home_news')}
              </h2>
            </div>
            <Link
              to="/yangiliklar"
              className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-800 hover:text-amber-600 font-ui self-center md:self-auto"
            >
              {t('home_news_more')} →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                to={newsPath(item.slug)}
                className="glass-card rounded-[2.5rem] overflow-hidden border-amber-100 group hover:shadow-2xl transition-all"
              >
                <div className="h-44 overflow-hidden">
                  <img src={item.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2 font-ui">{item.date}</p>
                  <h3 className="font-classic text-xl leading-snug text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">
                    {L(item.title)}
                  </h3>
                  <p className="text-base italic font-serif-classic text-slate-600 line-clamp-3">{L(item.excerpt)}</p>
                  <span className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-amber-800 font-ui">
                    {t('home_read_more')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rektor murojaati — so‘nggi yangiliklardan keyin */}
      <RectorAddress />

      {/* Rektordan keyin: yangi bo‘limlar (takrorlanmas fon/dizayn) */}
      <AboutFacultySection />
      <LeadershipPreviewSection />
      <ActiveStudentsSection />
      <SciencePreviewSection />
      <MediaTourSection />
      <EventsSection />
      <HomeCtaSection />

      {/* Ta'lim yo'nalishlari — 3D kartochkalar */}
      <section className="py-24 relative overflow-hidden">
        <SectionAtmosphere tone="heritage-strong" variant="default" manuscript />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitleDecoration />
          <h2 className="text-4xl md:text-6xl font-classic text-slate-950 uppercase tracking-widest text-center mb-4">
            {t('home_programs')}
          </h2>
          <p className="text-center text-xl md:text-2xl italic font-serif-classic text-amber-800/80 mb-14 max-w-2xl mx-auto">
            <span className="text-amber-600">❦</span> {t('programs_intro')}{' '}
            <span className="text-amber-600 inline-block rotate-180">❦</span>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {programs.slice(0, 6).map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} variant="compact" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/talim/yonalishlar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-amber-700/25 text-amber-950 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-950 hover:text-amber-200 hover:border-slate-950 transition-all font-ui bg-white/50 backdrop-blur-sm shadow-lg"
            >
              {t('home_programs_all')}
            </Link>
          </div>
        </div>
      </section>

      {/* Xalqaro hamkorlar — zamonaviy dunyo + Navoiy merosi */}
      <PartnersSection />
    </>
  );
};
