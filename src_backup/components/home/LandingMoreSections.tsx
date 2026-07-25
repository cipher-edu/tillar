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
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { people, getPerson } from '@/data/people';
import { projects, publications } from '@/data/science';
import { facultyFacts, stats } from '@/data/site';
import { personPath, projectPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS } from '@/components/ui/PatternBackground';

/**
 * Landing qo‘shimcha bo‘limlar — faqat loyiha palitrasi:
 * heritage #fdfaf3 · parchment #fcf8ee · gold · royal teal/deep-blue · slate
 * Farq: layout, naqsh intensivligi, light/dark — rang-barang emas.
 */

/** 1. Fakultet haqida — #fdfaf3 (Simpozium About uslubi) + 2025–2026 hisobot */
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
      <div className="absolute inset-0 parchment-texture opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '240px 240px' }}
      />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-800 font-ui mb-4">
            {t('land_about_badge')} · {facultyFacts.academicYear}
          </p>
          <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide leading-tight mb-6">
            {t('land_about_title')}
          </h2>
          <div className="w-20 h-[3px] gold-gradient mb-8 rounded-full" />
          <p className="text-xl md:text-2xl font-serif-classic italic text-slate-700 leading-relaxed mb-6">
            {t('land_about_p1')}
          </p>
          <p className="text-lg font-serif-classic text-slate-600 leading-relaxed mb-10">
            {t('land_about_p2')}
          </p>
          <Link
            to="/fakultet/tarix"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-slate-950 text-amber-100 text-[11px] font-black uppercase tracking-[0.2em] font-ui hover:brightness-110 transition-all shadow-lg"
          >
            {t('land_about_cta')} <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {factCards.map((item) => (
            <div
              key={item.label}
              className="p-6 md:p-8 rounded-[1.75rem] border border-amber-200/70 bg-white/80 backdrop-blur-sm hover:border-amber-400 hover:shadow-xl transition-all"
            >
              <span className="font-classic text-3xl md:text-4xl text-amber-900 font-black tabular-nums">
                {item.value}
              </span>
              <p className="mt-3 font-classic text-slate-700 text-base leading-snug">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/** 2. Rahbariyat — deep-blue / royal dark (Speakers uslubi) */
export const LeadershipPreviewSection: React.FC = () => {
  const { t, L } = useLanguage();
  // Landing: universitet rahbariyati to‘liq tartibda (rektor + barcha prorektorlar)
  const leaders = people
    .filter((p) => p.roles.includes('leader') && p.leadershipLevel === 'university')
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#001524] text-white">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none animated-pattern"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '120px 120px' }}
      />
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[rgba(0,77,97,0.4)] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400/90 font-ui mb-3">
              {t('land_lead_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic uppercase tracking-widest text-transparent bg-clip-text gold-gradient">
              {t('land_lead_title')}
            </h2>
          </div>
          <Link
            to="/fakultet/rahbariyat"
            className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-200/80 hover:text-amber-100 font-ui"
          >
            {t('land_lead_all')} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leaders.map((p, i) => (
            <Link
              key={p.id}
              to={personPath(p)}
              className="group relative rounded-[1.75rem] overflow-hidden border border-amber-500/20 bg-white/[0.04] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={p.photo}
                  alt=""
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001524] via-[#001524]/50 to-transparent" />
                <span className="absolute top-4 left-4 font-classic text-2xl text-amber-500/25 font-black">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-5 -mt-16 relative z-10">
                <h3 className="font-classic text-lg text-amber-50 leading-snug group-hover:text-amber-200 transition-colors">
                  {L(p.name)}
                </h3>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-amber-400/70 font-ui">
                  {L(p.position)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 3. Faol talabalar — parchment #fcf8ee + amber */
export const ActiveStudentsSection: React.FC = () => {
  const { t, L } = useLanguage();
  const students = people.filter((p) => p.roles.includes('student')).slice(0, 6);

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#fcf8ee]">
      <div className="absolute inset-0 parchment-texture opacity-45 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: PATTERNS.starSoft, backgroundSize: '140px 140px' }}
      />
      <div className="absolute -bottom-16 right-10 w-72 h-72 bg-amber-200/25 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-800 font-ui mb-3">
              <Users className="w-3.5 h-3.5" /> {t('land_stu_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide">
              {t('land_stu_title')}
            </h2>
          </div>
          <Link
            to="/talabalar"
            className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-800 hover:text-amber-600 font-ui"
          >
            {t('land_stu_all')} →
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {students.map((s) => (
            <Link
              key={s.id}
              to={personPath(s)}
              className="snap-start shrink-0 w-[260px] rounded-[2rem] bg-white/90 border border-amber-200/80 p-6 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 ring-2 ring-amber-100 shadow-md">
                <img src={s.photo} alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-classic text-xl text-slate-900 leading-snug mb-2">{L(s.name)}</h3>
              {s.course && (
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-700/80 font-ui mb-3">
                  {s.course}-{t('filter_course').toLowerCase()}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {(s.badges ?? []).slice(0, 2).map((b) => (
                  <StudentBadgePill key={b} badge={b} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 4. Ilm-fan — #001a2c royal dark + gold (hamkorlar/footer dark oilasi) */
export const SciencePreviewSection: React.FC = () => {
  const { t, L } = useLanguage();
  const topProjects = projects.slice(0, 3);
  const topPubs = publications.filter((p) => p.indexed === 'scopus' || p.indexed === 'wos').slice(0, 3);

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#001a2c] text-amber-50">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '180px 180px' }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] animated-pattern pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '100px 100px' }}
      />
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-400 font-ui mb-3">
              <FlaskConical className="w-3.5 h-3.5" /> {t('land_sci_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic uppercase tracking-widest text-transparent bg-clip-text gold-gradient">
              {t('land_sci_title')}
            </h2>
          </div>
          <Link
            to="/ilm-fan"
            className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-200/80 hover:text-amber-100 font-ui"
          >
            {t('land_sci_all')} →
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80 font-ui mb-2">
              {t('land_sci_projects')}
            </h3>
            {topProjects.map((pr) => (
              <Link
                key={pr.id}
                to={projectPath(pr.slug)}
                className="block p-6 rounded-2xl border border-amber-500/20 bg-white/[0.04] hover:border-amber-400/40 hover:bg-white/[0.07] transition-all"
              >
                <span
                  className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full font-ui mb-2 ${
                    pr.status === 'ongoing'
                      ? 'bg-amber-400/20 text-amber-200'
                      : 'bg-white/10 text-amber-100/60'
                  }`}
                >
                  {pr.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
                </span>
                <p className="font-classic text-xl text-amber-50 leading-snug">{L(pr.title)}</p>
                <p className="mt-2 text-sm italic font-serif-classic text-amber-100/55 line-clamp-2">
                  {L(pr.description)}
                </p>
              </Link>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80 font-ui mb-2">
              {t('land_sci_pubs')}
            </h3>
            {topPubs.map((pub) => {
              const author = getPerson(pub.authors[0]);
              return (
                <div
                  key={pub.id}
                  className="p-6 rounded-2xl border border-amber-500/15 bg-black/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full gold-gradient text-slate-950 font-ui">
                      {pub.indexed?.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-amber-200/40 font-ui">{pub.year}</span>
                  </div>
                  <p className="font-serif-classic italic text-lg text-amber-50 leading-snug">
                    {L(pub.title)}
                  </p>
                  {author && (
                    <p className="mt-2 text-[11px] font-ui text-amber-300/50">{L(author.name)}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/** 5. Virtual tur — qora + gold accent (brand) */
export const MediaTourSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#0c0a08] text-white">
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=70)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.25) brightness(0.4)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08] via-[#0c0a08]/85 to-[#001a2c]/70" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '90px 90px' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400/80 font-ui mb-4">
            {t('land_media_badge')}
          </p>
          <h2 className="text-4xl md:text-6xl font-classic uppercase tracking-widest leading-tight mb-6 text-amber-50">
            {t('land_media_title')}
          </h2>
          <p className="text-lg md:text-xl font-serif-classic italic text-amber-100/70 leading-relaxed mb-8 max-w-lg">
            {t('land_media_text')}
          </p>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl gold-gradient text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] font-ui shadow-xl hover:brightness-110 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            {t('land_media_cta')}
          </a>
        </div>
        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-amber-500/25 shadow-2xl bg-black/50 group">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full gold-gradient text-slate-950 flex items-center justify-center shadow-xl border border-amber-200/40">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Planshet: ma’naviy-ma’rifiy, sport, volontyorlik, to‘garaklar */
const EVENTS = [
  {
    id: 'e1',
    date: '2025–2026',
    title: {
      uz: '120 ma’naviy-ma’rifiy tadbir (1500 ishtirokchi)',
      ru: '120 духовно-просветительских мероприятий (1500 участников)',
      en: '120 cultural-educational events (1,500 participants)',
    },
    place: {
      uz: 'Tillar fakulteti',
      ru: 'Факультет языков',
      en: 'Faculty of Languages',
    },
  },
  {
    id: 'e2',
    date: '2025–2026',
    title: {
      uz: 'Talabalar ligasi: 110 sport sovrindori',
      ru: 'Студенческая лига: 110 спортивных призёров',
      en: 'Student league: 110 sports awardees',
    },
    place: {
      uz: 'Universitet sport majmuasi',
      ru: 'Спорткомплекс университета',
      en: 'University sports complex',
    },
  },
  {
    id: 'e3',
    date: '2025–2026',
    title: {
      uz: '“Yosh ko‘makchi” volontyor guruhi — 110 nafar',
      ru: 'Волонтёрская группа «Ёш кўмакчи» — 110 человек',
      en: '“Yosh ko‘makchi” volunteer group — 110 members',
    },
    place: {
      uz: 'Fakultet va mahalla',
      ru: 'Факультет и махалля',
      en: 'Faculty and community',
    },
  },
  {
    id: 'e4',
    date: '2025–2026',
    title: {
      uz: 'Rektor kubogi: 142 ishtirokchi · 10 to‘garak (470 a’zo)',
      ru: 'Кубок ректора: 142 участника · 10 кружков (470 членов)',
      en: 'Rector’s Cup: 142 participants · 10 clubs (470 members)',
    },
    place: {
      uz: 'Navoiy davlat universiteti',
      ru: 'Навоийский государственный университет',
      en: 'Navoi State University',
    },
  },
];

/** 6. Kalendar — antique-white + amber timeline */
export const EventsSection: React.FC = () => {
  const { t, L } = useLanguage();
  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#f3eee6]">
      <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '220px 220px' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-200/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-800 font-ui mb-3">
            <Calendar className="w-3.5 h-3.5" /> {t('land_ev_badge')}
          </p>
          <h2 className="text-4xl md:text-5xl font-classic text-slate-950 uppercase tracking-wide">
            {t('land_ev_title')}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-amber-600/50" />
            <span className="text-amber-600/70 text-sm tracking-[0.35em]">✧ ❦ ✧</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-amber-300/60 md:-translate-x-1/2" />
          <div className="space-y-8">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch gap-4 md:gap-8`}
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-4 border-[#f3eee6] md:-translate-x-1/2 mt-6 z-10" />
                <div className="ml-10 md:ml-0 flex-1 p-6 rounded-3xl bg-white/90 border border-amber-200/80 shadow-sm hover:shadow-lg hover:border-amber-400 transition-all">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 font-ui mb-2">
                    {ev.date}
                  </p>
                  <h3 className="font-classic text-xl text-slate-900 mb-2">{L(ev.title)}</h3>
                  <p className="flex items-center gap-2 text-sm italic font-serif-classic text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" /> {L(ev.place)}
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

/** 7. CTA — royal-gradient (brand) */
export const HomeCtaSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 royal-gradient" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '80px 80px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-60" />
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
        <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-5" />
        <h2 className="text-3xl md:text-5xl font-classic uppercase tracking-widest leading-tight mb-5">
          {t('land_cta_title')}
        </h2>
        <p className="text-lg md:text-xl font-serif-classic italic text-amber-100/85 max-w-2xl mx-auto mb-10">
          {t('land_cta_text')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/talim/yonalishlar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gold-gradient text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] font-ui shadow-xl hover:brightness-110 transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            {t('land_cta_programs')}
          </Link>
          <Link
            to="/aloqa"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-amber-300/50 text-amber-50 text-[11px] font-black uppercase tracking-[0.2em] font-ui hover:bg-amber-50 hover:text-slate-950 transition-all"
          >
            {t('land_cta_contact')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
