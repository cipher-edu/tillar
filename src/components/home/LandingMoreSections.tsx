import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  FlaskConical,
  GraduationCap,
  MapPin,
  Play,
  Sparkles,
  Users,
  Award,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { people, getPerson } from '@/data/people';
import { projects, publications } from '@/data/science';
import { facultyFacts, stats } from '@/data/site';
import { personPath, projectPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS, ShamsaMedallion } from '@/components/ui/PatternBackground';

/** 1. FAKULTET HAQIDA (ABOUT FACULTY) */
export const AboutFacultySection: React.FC = () => {
  const { t } = useLanguage();
  const factCards = [
    { value: String(stats.students), label: t('stats_students') },
    { value: String(stats.professors), label: t('stats_professors') },
    { value: String(facultyFacts.departments), label: t('land_about_f1') },
    {
      value: `${facultyFacts.scientificPotentialPercent}%`,
      label: t('land_about_f4'),
    },
  ];
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#fdfaf3]">
      <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '240px 240px' }}
      />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-300/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-amber-800 font-ui mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {t('land_about_badge')} · {facultyFacts.academicYear}
          </p>
          <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide leading-tight mb-6">
            {t('land_about_title')}
          </h2>
          <div className="w-24 h-1 gold-gradient mb-8 rounded-full shadow-sm" />
          <p className="text-xl md:text-2xl font-serif-classic italic text-slate-800 leading-relaxed mb-6">
            {t('land_about_p1')}
          </p>
          <p className="text-lg font-serif-classic text-slate-700 leading-relaxed mb-10">
            {t('land_about_p2')}
          </p>
          <Link
            to="/fakultet/tarix"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950 text-amber-300 text-[11px] font-black uppercase tracking-[0.2em] font-ui hover:gold-gradient hover:text-slate-950 transition-all duration-300 shadow-xl"
          >
            {t('land_about_cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {factCards.map((item) => (
            <div
              key={item.label}
              className="p-6 md:p-8 rounded-[2rem] border border-amber-300/60 bg-white/90 backdrop-blur-md hover:bg-slate-950 hover:text-white hover:border-amber-400 hover:shadow-2xl transition-all duration-500 group"
            >
              <span className="font-classic text-3xl md:text-4xl text-amber-900 group-hover:text-amber-400 font-black tabular-nums transition-colors">
                {item.value}
              </span>
              <p className="mt-3 font-classic text-slate-800 group-hover:text-slate-200 text-base leading-snug font-bold transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/** 2. RAHBARIYAT (LEADERSHIP) */
export const LeadershipPreviewSection: React.FC = () => {
  const { t, L } = useLanguage();
  const leaders = people
    .filter((p) => p.roles.includes('leader') && p.leadershipLevel === 'university')
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none animated-pattern"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '120px 120px' }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 font-ui mb-3 flex items-center gap-2">
              <ShamsaMedallion className="w-5 h-5" />
              {t('land_lead_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic uppercase tracking-widest text-transparent bg-clip-text gold-gradient">
              {t('land_lead_title')}
            </h2>
          </div>
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/30 text-[11px] font-black uppercase tracking-[0.25em] text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all font-ui"
          >
            {t('land_lead_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={personPath(p)}
                className="group relative block rounded-[2rem] overflow-hidden border border-amber-500/30 bg-slate-900 hover:border-amber-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all duration-500"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={p.photo}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-4 left-4 font-classic text-2xl text-amber-400 font-bold drop-shadow-md">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-6 -mt-16 relative z-10 bg-slate-950/90 backdrop-blur-md">
                  <h3 className="font-classic text-xl text-white font-bold leading-snug group-hover:text-amber-300 transition-colors drop-shadow-sm">
                    {L(p.name)}
                  </h3>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-amber-400 font-ui font-bold">
                    {L(p.position)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 3. FAOL TALABALAR (ACTIVE STUDENTS) */
export const ActiveStudentsSection: React.FC = () => {
  const { t, L } = useLanguage();
  const students = people.filter((p) => p.roles.includes('student')).slice(0, 6);

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#fcf8ee]">
      <div className="absolute inset-0 parchment-texture opacity-45 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: PATTERNS.starSoft, backgroundSize: '140px 140px' }}
      />
      <div className="absolute -bottom-16 right-10 w-72 h-72 bg-amber-300/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-800 font-ui mb-3">
              <Users className="w-4 h-4 text-amber-600" /> {t('land_stu_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide">
              {t('land_stu_title')}
            </h2>
          </div>
          <Link
            to="/talabalar"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-amber-900 hover:text-amber-600 font-ui"
          >
            {t('land_stu_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {students.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="snap-start shrink-0"
            >
              <Link
                to={personPath(s)}
                className="block w-[280px] rounded-[2.5rem] bg-white/95 border border-amber-300/80 p-6 shadow-md hover:bg-slate-950 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-5 ring-4 ring-amber-400/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img src={s.photo} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-classic text-xl text-slate-950 group-hover:text-amber-300 font-bold leading-snug mb-2 transition-colors">
                  {L(s.name)}
                </h3>
                {s.course && (
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 group-hover:text-amber-400 font-ui mb-4 transition-colors font-bold">
                    {s.course}-{t('filter_course').toLowerCase()}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {(s.badges ?? []).slice(0, 2).map((b) => (
                    <StudentBadgePill key={b} badge={b} />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 4. ILM-FAN (SCIENCE) */
export const SciencePreviewSection: React.FC = () => {
  const { t, L } = useLanguage();
  const topProjects = projects.slice(0, 3);
  const topPubs = publications.filter((p) => p.indexed === 'scopus' || p.indexed === 'wos').slice(0, 3);

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-slate-950 text-amber-50">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '180px 180px' }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-400 font-ui mb-3">
              <FlaskConical className="w-4 h-4 text-amber-400" /> {t('land_sci_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic uppercase tracking-widest text-transparent bg-clip-text gold-gradient">
              {t('land_sci_title')}
            </h2>
          </div>
          <Link
            to="/ilm-fan"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/30 text-[11px] font-black uppercase tracking-[0.25em] text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all font-ui"
          >
            {t('land_sci_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 font-ui mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {t('land_sci_projects')}
            </h3>
            {topProjects.map((pr) => (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  to={projectPath(pr.slug)}
                  className="block p-6 rounded-2xl border border-amber-500/30 bg-slate-900/80 hover:border-amber-400 hover:bg-slate-900 transition-all duration-300 shadow-xl group"
                >
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full font-ui mb-3 bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    {pr.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
                  </span>
                  <p className="font-classic text-xl text-amber-50 group-hover:text-amber-300 font-bold leading-snug transition-colors">
                    {L(pr.title)}
                  </p>
                  <p className="mt-2 text-sm italic font-serif-classic text-slate-300 line-clamp-2">
                    {L(pr.description)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 font-ui mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" /> {t('land_sci_pubs')}
            </h3>
            {topPubs.map((pub) => {
              const author = getPerson(pub.authors[0]);
              return (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-amber-500/30 bg-slate-900/80 shadow-xl hover:border-amber-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full gold-gradient text-slate-950 font-ui font-bold">
                      {pub.indexed?.toUpperCase()}
                    </span>
                    <span className="text-xs text-amber-300 font-bold font-ui">{pub.year}</span>
                  </div>
                  <p className="font-serif-classic italic text-lg text-white font-semibold leading-snug">
                    {L(pub.title)}
                  </p>
                  {author && (
                    <p className="mt-2 text-xs font-ui text-amber-400 font-bold">{L(author.name)}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/** 5. VIRTUAL TUR (MEDIA TOUR) */
export const MediaTourSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#0a0806] text-white">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=70)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.3) brightness(0.4)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806] via-[#0a0806]/90 to-slate-950/80" />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 font-ui mb-4 flex items-center gap-2">
            <ShamsaMedallion className="w-5 h-5" />
            {t('land_media_badge')}
          </p>
          <h2 className="text-4xl md:text-6xl font-classic uppercase tracking-widest leading-tight mb-6 text-amber-50">
            {t('land_media_title')}
          </h2>
          <p className="text-lg md:text-xl font-serif-classic italic text-slate-200 leading-relaxed mb-8 max-w-lg">
            {t('land_media_text')}
          </p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl gold-gradient text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] font-ui shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-current" />
            {t('land_media_cta')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-black/60 group hover:border-amber-300 transition-colors"
        >
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full gold-gradient text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EVENTS = [
  {
    id: 'e1',
    date: '2025–2026',
    title: {
      uz: '120 ma’naviy-ma’rifiy tadbir (1500 ishtirokchi)',
      ru: '120 духовно-просветительских мероприятий (1500 участников)',
      en: '120 cultural-educational events (1,500 participants)',
    },
    place: { uz: 'Tillar fakulteti', ru: 'Факультет языков', en: 'Faculty of Languages' },
  },
  {
    id: 'e2',
    date: '2025–2026',
    title: {
      uz: 'Talabalar ligasi: 110 sport sovrindori',
      ru: 'Студенческая лига: 110 спортивных призёров',
      en: 'Student league: 110 sports awardees',
    },
    place: { uz: 'Universitet sport majmuasi', ru: 'Спорткомплекс университета', en: 'University sports complex' },
  },
  {
    id: 'e3',
    date: '2025–2026',
    title: {
      uz: '“Yosh ko‘makchi” volontyor guruhi — 110 nafar',
      ru: 'Волонтёрская группа «Ёш кўмакчи» — 110 человек',
      en: '“Yosh ko‘makchi” volunteer group — 110 members',
    },
    place: { uz: 'Fakultet va mahalla', ru: 'Факультет и махалля', en: 'Faculty and community' },
  },
  {
    id: 'e4',
    date: '2025–2026',
    title: {
      uz: 'Rektor kubogi: 142 ishtirokchi · 10 to‘garak (470 a’zo)',
      ru: 'Кубок ректора: 142 участника · 10 кружков (470 членов)',
      en: 'Rector’s Cup: 142 participants · 10 clubs (470 members)',
    },
    place: { uz: 'Navoiy davlat universiteti', ru: 'Навоийский государственный университет', en: 'Navoi State University' },
  },
];

/** 6. EVENT TADBIRLAR */
export const EventsSection: React.FC = () => {
  const { t, L } = useLanguage();
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#f3eee6]">
      <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '220px 220px' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-300/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-800 font-ui mb-3">
            <Calendar className="w-4 h-4 text-amber-600" /> {t('land_ev_badge')}
          </p>
          <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide">
            {t('land_ev_title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-14 bg-amber-600/50" />
            <ShamsaMedallion className="w-6 h-6" />
            <span className="h-px w-14 bg-amber-600/50" />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 gold-gradient md:-translate-x-1/2 rounded-full" />
          <div className="space-y-8">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch gap-4 md:gap-8`}
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full gold-gradient border-2 border-slate-950 md:-translate-x-1/2 mt-6 z-10 shadow-md" />
                <div className="ml-10 md:ml-0 flex-1 p-6 md:p-8 rounded-[2rem] bg-white/95 border border-amber-300/80 shadow-md hover:bg-slate-950 hover:text-white hover:border-amber-400 hover:shadow-2xl transition-all duration-500 group">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 group-hover:text-amber-400 font-ui mb-2 transition-colors font-bold">
                    {ev.date}
                  </p>
                  <h3 className="font-classic text-xl text-slate-950 group-hover:text-amber-300 font-bold mb-2 transition-colors">
                    {L(ev.title)}
                  </h3>
                  <p className="flex items-center gap-2 text-sm italic font-serif-classic text-slate-600 group-hover:text-slate-300 transition-colors">
                    <MapPin className="w-4 h-4 text-amber-600 group-hover:text-amber-400 shrink-0" /> {L(ev.place)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/** 7. CTA SECTION */
export const HomeCtaSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '80px 80px' }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <ShamsaMedallion className="w-12 h-12 mx-auto mb-6" />
        <h2 className="text-3xl md:text-5xl font-classic uppercase tracking-widest leading-tight mb-6">
          {t('land_cta_title')}
        </h2>
        <p className="text-lg md:text-xl font-serif-classic italic text-slate-300 max-w-2xl mx-auto mb-10">
          {t('land_cta_text')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/talim/yonalishlar"
            className="inline-flex items-center gap-2.5 px-9 py-5 rounded-2xl gold-gradient text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] font-ui shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <GraduationCap className="w-4 h-4" />
            {t('land_cta_programs')}
          </Link>
          <Link
            to="/aloqa"
            className="inline-flex items-center gap-2.5 px-9 py-5 rounded-2xl border-2 border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-[0.2em] font-ui hover:bg-amber-400 hover:text-slate-950 transition-all duration-300"
          >
            {t('land_cta_contact')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
