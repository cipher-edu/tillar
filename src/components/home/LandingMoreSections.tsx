import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  FlaskConical,
  GraduationCap,
  MapPin,
  Megaphone,
  Play,
  Sparkles,
  Users,
  Award,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { people, getPerson } from '@/data/people';
import { projects, publications } from '@/data/science';
import { facultyFacts, stats } from '@/data/site';
import { personPath, projectPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import {
  BehzodStarMedallion,
  NAVOIY_COUPLETS,
  PATTERNS,
  ShamsaMedallion,
} from '@/components/ui/PatternBackground';

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
          viewport={{ once: false, margin: '-50px' }}
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
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {factCards.map((item) => (
            <div
              key={item.label}
              className="p-6 md:p-8 rounded-[2rem] border border-amber-300/60 bg-white/90 backdrop-blur-md hover:bg-white hover:border-amber-400 hover:shadow-[0_18px_40px_-12px_rgba(166,124,0,0.22)] hover:-translate-y-1 transition-all duration-500 group"
            >
              <span className="font-classic text-3xl md:text-4xl text-amber-900 group-hover:text-amber-950 font-black tabular-nums transition-colors">
                {item.value}
              </span>
              <p className="mt-3 font-classic text-slate-800 group-hover:text-slate-900 text-base leading-snug font-bold transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/** 2. RAHBARIYAT — yorug' heritage + ulug'vor islimiy naqshlar */
export const LeadershipPreviewSection: React.FC = () => {
  const { t, L, language } = useLanguage();
  const leaders = people
    .filter((p) => p.roles.includes('leader') && p.leadershipLevel === 'university')
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  const couplet = NAVOIY_COUPLETS.leadership;
  const verse = couplet[language] || couplet.uz;

  return (
    <section className="relative overflow-hidden py-24 md:py-28 bg-[#fdfaf3] text-slate-950">
      {/* === ULUG'VOR NAQSH QATLAMLARI === */}
      <div className="absolute inset-0 parchment-texture opacity-45 pointer-events-none" />

      {/* Asosiy girih panjara */}
      <div
        className="absolute inset-0 opacity-[0.55] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '200px 200px' }}
        aria-hidden
      />
      {/* Islimiy arabesk (sekin harakat) */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none animated-pattern"
        style={{ backgroundImage: PATTERNS.islimiy, backgroundSize: '220px 220px' }}
        aria-hidden
      />
      {/* Behzod miniatyura yulduzlari */}
      <div
        className="absolute inset-0 opacity-[0.28] pointer-events-none"
        style={{ backgroundImage: PATTERNS.behzodMiniature, backgroundSize: '180px 180px' }}
        aria-hidden
      />
      {/* Burchak romblari */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '140px 140px' }}
        aria-hidden
      />

      {/* Katta shamsa watermark (markaz) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] opacity-[0.07] pointer-events-none select-none"
        aria-hidden
      >
        <ShamsaMedallion className="w-full h-full" />
      </div>

      {/* Oltin ambient nurlanish */}
      <div className="absolute -top-24 -right-16 w-[420px] h-[420px] bg-amber-300/35 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-28 -left-20 w-[380px] h-[380px] bg-amber-200/40 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] bg-amber-100/50 blur-[100px] rounded-full pointer-events-none" />

      {/* Yuqori / pastki oltin chiziq */}
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient opacity-50" />

      {/* Dekorativ burchak medalyonlar */}
      <div className="absolute top-6 left-4 md:top-10 md:left-10 opacity-40 pointer-events-none" aria-hidden>
        <BehzodStarMedallion className="w-14 h-14 md:w-16 md:h-16" />
      </div>
      <div className="absolute top-6 right-4 md:top-10 md:right-10 opacity-40 pointer-events-none" aria-hidden>
        <BehzodStarMedallion className="w-14 h-14 md:w-16 md:h-16" />
      </div>
      <div className="absolute bottom-6 left-4 md:bottom-10 md:left-10 opacity-30 pointer-events-none" aria-hidden>
        <ShamsaMedallion className="w-12 h-12 md:w-14 md:h-14" />
      </div>
      <div className="absolute bottom-6 right-4 md:bottom-10 md:right-10 opacity-30 pointer-events-none" aria-hidden>
        <ShamsaMedallion className="w-12 h-12 md:w-14 md:h-14" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-800 font-ui mb-3 flex items-center gap-2">
              <ShamsaMedallion className="w-6 h-6" />
              {t('land_lead_badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-classic uppercase tracking-widest text-slate-950">
              <span className="text-transparent bg-clip-text gold-gradient">{t('land_lead_title')}</span>
            </h2>
          </div>
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-amber-400/60 bg-white/70 text-[11px] font-black uppercase tracking-[0.25em] text-amber-950 hover:bg-amber-50 hover:border-amber-500 hover:shadow-md transition-all font-ui"
          >
            {t('land_lead_all')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Navoiy hikmati — bo'lim ruhini kuchaytiradi */}
        <p className="max-w-3xl mb-12 text-base md:text-lg italic font-serif-classic text-slate-600 leading-relaxed border-l-4 border-amber-400/70 pl-5">
          {verse.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <span className="mt-2 block text-[10px] not-italic font-black uppercase tracking-[0.2em] text-amber-800 font-ui">
            — {couplet.source}
          </span>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {leaders.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={personPath(p)}
                className="group relative block rounded-[1.75rem] overflow-hidden border-2 border-amber-300/70 bg-white shadow-md hover:border-amber-400 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(166,124,0,0.25)] transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-80 z-20" />

                {/* Qisqaroq foto (3/4 o'rniga 5/5.5 ≈ biroz pastroq) */}
                <div className="aspect-[5/5.5] relative overflow-hidden bg-amber-50">
                  <img
                    src={p.photo}
                    alt=""
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Oq hiralik kamaytirildi */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf3]/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-classic text-xl text-amber-900 font-bold bg-white/70 px-2 py-0.5 rounded-lg border border-amber-300/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Pastki panel — kamroq oq blur, ixcham */}
                <div className="p-4 -mt-8 relative z-10 mx-2.5 mb-2.5 rounded-xl bg-white/85 border border-amber-200/70 shadow-sm group-hover:border-amber-300 transition-colors">
                  <h3 className="font-classic text-lg text-slate-950 font-bold leading-snug group-hover:text-amber-950 transition-colors">
                    {L(p.name)}
                  </h3>
                  <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-amber-900 font-ui line-clamp-2">
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

/**
 * ========== RAHBARIYATDAN KEYIN ==========
 * Har bo'lim o'ziga xos uslub: heritage/naqsh kartalari takrorlanmaydi.
 */

/** 3. FAOL TALABALAR — editorial magazine (oq, ink, katta rasm) */
export const ActiveStudentsSection: React.FC = () => {
  const { t, L } = useLanguage();
  const students = people.filter((p) => p.roles.includes('student')).slice(0, 6);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white">
      {/* Minimal grid — naqsh emas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,39,68,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,39,68,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0f2744]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0f2744]/55 mb-4">
              {t('land_stu_badge')}
            </p>
            <h2 className="font-classic text-4xl md:text-6xl text-[#0f2744] tracking-tight leading-[1.05]">
              {t('land_stu_title')}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-serif-classic italic text-lg text-slate-500 mb-5 max-w-sm lg:ml-auto">
              Fakultetning faol, ijodkor va tashabbuskor talabalari
            </p>
            <Link
              to="/talabalar"
              className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.22em] text-[#0f2744] border-b-2 border-[#0f2744]/25 pb-1 hover:border-amber-500 hover:text-amber-800 transition-colors"
            >
              {t('land_stu_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex gap-5 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {students.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="snap-start shrink-0 w-[240px] sm:w-[260px]"
            >
              <Link to={personPath(s)} className="group block">
                <div className="relative mb-5 overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[4/5]">
                  <img
                    src={s.photo}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f2744]/50 to-transparent opacity-80" />
                  <span className="absolute bottom-3 left-3 font-ui text-[10px] font-bold tracking-[0.2em] text-white/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-classic text-lg text-[#0f2744] leading-snug group-hover:text-amber-900 transition-colors">
                  {L(s.name)}
                </h3>
                {s.course && (
                  <p className="mt-1.5 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {s.course}-{t('filter_course').toLowerCase()}
                  </p>
                )}
                {(s.badges ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(s.badges ?? []).slice(0, 2).map((b) => (
                      <StudentBadgePill key={b} badge={b} />
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 4. ILM-FAN — royal + gold brand, scroll + hover */
export const SciencePreviewSection: React.FC = () => {
  const { t, L } = useLanguage();
  const topProjects = projects.slice(0, 3);
  const topPubs = publications.filter((p) => p.indexed === 'scopus' || p.indexed === 'wos').slice(0, 3);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#fdfaf3]">
      <div className="absolute inset-0 parchment-texture opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '220px 220px' }}
        aria-hidden
      />
      <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-amber-300/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] bg-[#003366]/08 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-70" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-900 font-ui mb-4">
              <FlaskConical className="w-4 h-4 text-amber-700" />
              {t('land_sci_badge')}
            </p>
            <h2 className="font-classic text-4xl md:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.08] mb-4">
              <span className="text-transparent bg-clip-text gold-gradient">{t('land_sci_title')}</span>
            </h2>
            <p className="font-serif-classic text-lg md:text-xl italic text-slate-600 leading-relaxed max-w-xl">
              Loyihalar va indeksli nashrlar — ilmiy faoliyatning ochiq vitrinasi
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/ilm-fan"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl gold-gradient text-slate-950 font-ui text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_16px_40px_-12px_rgba(166,124,0,0.45)] hover:shadow-[0_20px_48px_-10px_rgba(166,124,0,0.55)] transition-shadow"
            >
              {t('land_sci_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Loyihalar */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-3 mb-2"
            >
              <span className="w-9 h-9 rounded-xl gold-gradient text-slate-950 flex items-center justify-center shadow-md">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="font-ui text-[11px] font-black uppercase tracking-[0.28em] text-slate-800">
                {t('land_sci_projects')}
              </h3>
            </motion.div>

            {topProjects.map((pr, i) => (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={projectPath(pr.slug)}
                  className="group relative block overflow-hidden rounded-[1.75rem] border-2 border-amber-300/60 bg-white/90 p-6 md:p-7 shadow-md hover:border-amber-400 hover:shadow-[0_22px_50px_-16px_rgba(166,124,0,0.28)] transition-all duration-400"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full gold-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-amber-50/80 via-transparent to-transparent" />
                  <div className="relative flex gap-4 md:gap-5">
                    <span className="font-classic text-3xl md:text-4xl font-black text-amber-900/15 group-hover:text-amber-800/30 tabular-nums leading-none transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span
                          className={`text-[9px] font-ui font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            pr.status === 'ongoing'
                              ? 'bg-amber-50 text-amber-900 border-amber-300/70'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {pr.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
                        </span>
                      </div>
                      <p className="font-classic text-lg md:text-xl text-slate-950 leading-snug group-hover:text-amber-950 transition-colors">
                        {L(pr.title)}
                      </p>
                      <p className="mt-2 text-sm md:text-base font-serif-classic italic text-slate-600 line-clamp-2 group-hover:text-slate-700">
                        {L(pr.description)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-ui font-black uppercase tracking-[0.2em] text-amber-900 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Batafsil <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Nashrlar */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-[2rem] border-2 border-amber-400/40 bg-[#001524] text-amber-50 overflow-hidden shadow-2xl relative"
            >
              <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '90px 90px' }}
                aria-hidden
              />
              <div className="absolute top-0 left-0 right-0 h-1 gold-gradient" />

              <div className="relative px-6 md:px-7 py-5 border-b border-amber-400/20 flex items-center justify-between gap-3">
                <h3 className="font-ui text-[11px] font-black uppercase tracking-[0.25em] text-amber-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  {t('land_sci_pubs')}
                </h3>
                <span className="text-[9px] font-ui font-bold uppercase tracking-wider px-2.5 py-1 rounded-full gold-gradient text-slate-950">
                  Scopus / WoS
                </span>
              </div>

              <ul className="relative divide-y divide-amber-400/10">
                {topPubs.map((pub, i) => {
                  const author = getPerson(pub.authors[0]);
                  return (
                    <motion.li
                      key={pub.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="group px-6 md:px-7 py-5 hover:bg-white/[0.04] transition-colors cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-ui font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {pub.indexed?.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-ui font-semibold text-amber-200/50">{pub.year}</span>
                      </div>
                      <p className="font-serif-classic text-base md:text-lg text-amber-50/95 leading-snug italic group-hover:text-amber-100 transition-colors">
                        {L(pub.title)}
                      </p>
                      {author && (
                        <p className="mt-2 font-ui text-[11px] font-bold text-amber-400/90">{L(author.name)}</p>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <div className="relative px-6 md:px-7 py-5 border-t border-amber-400/15">
                <Link
                  to="/ilm-fan"
                  className="inline-flex items-center gap-2 text-[10px] font-ui font-black uppercase tracking-[0.22em] text-amber-300 hover:text-amber-200 transition-colors"
                >
                  Barcha nashrlar <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Fakultet virtual tur — YouTube */
const FACULTY_TOUR_VIDEO_ID = 'vNiVQlPxBbk';
const FACULTY_TOUR_WATCH_URL = `https://youtu.be/${FACULTY_TOUR_VIDEO_ID}`;
const FACULTY_TOUR_EMBED_URL = `https://www.youtube.com/embed/${FACULTY_TOUR_VIDEO_ID}?rel=0&modestbranding=1`;

/** 5. MEDIA TUR — split cinema (chap video, o'ng matn) */
export const MediaTourSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#f7f5f2]">
      <div className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[560px]">
        {/* Chap: YouTube virtual tur */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="relative order-1 min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-[#1a1a1a]"
        >
          <iframe
            title={t('land_media_title')}
            src={FACULTY_TOUR_EMBED_URL}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-600 pointer-events-none z-10" />
        </motion.div>

        {/* O'ng: matn maydoni */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20 order-2">
          <div className="absolute top-0 left-0 w-px h-full bg-slate-200/80 hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="max-w-md"
          >
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.4em] text-amber-800/80 mb-5">
              {t('land_media_badge')}
            </p>
            <h2 className="font-classic text-4xl md:text-5xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-6">
              {t('land_media_title')}
            </h2>
            <p className="font-serif-classic text-lg text-slate-600 leading-relaxed mb-10">
              {t('land_media_text')}
            </p>
            <a
              href={FACULTY_TOUR_WATCH_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#1a1a1a] text-white font-ui text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-amber-700 transition-colors"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                <Play className="w-3.5 h-3.5 fill-current" />
              </span>
              {t('land_media_cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/** Kalendar tadbirlari */
const CALENDAR_EVENTS = [
  {
    id: 'c1',
    day: '17',
    month: { uz: 'SEN', ru: 'СЕН', en: 'SEP' },
    year: '2025',
    title: {
      uz: 'ACQUIN ekspert tashrifi',
      ru: 'Визит экспертов ACQUIN',
      en: 'ACQUIN expert visit',
    },
    place: { uz: 'Ingliz tili kafedrasi', ru: 'Кафедра английского', en: 'English department' },
    tag: { uz: 'Xalqaro', ru: 'Международное', en: 'International' },
  },
  {
    id: 'c2',
    day: '05',
    month: { uz: 'OKT', ru: 'ОКТ', en: 'OCT' },
    year: '2025',
    title: {
      uz: 'Rektor kubogi — ochilish marosimi',
      ru: 'Кубок ректора — церемония открытия',
      en: 'Rector’s Cup — opening ceremony',
    },
    place: { uz: 'Sport majmuasi', ru: 'Спорткомплекс', en: 'Sports complex' },
    tag: { uz: 'Sport', ru: 'Спорт', en: 'Sport' },
  },
  {
    id: 'c3',
    day: '12',
    month: { uz: 'NOY', ru: 'НОЯ', en: 'NOV' },
    year: '2025',
    title: {
      uz: 'Ma’naviy-ma’rifiy tadbirlar oyig‘i',
      ru: 'Месяц духовно-просветительских мероприятий',
      en: 'Month of cultural-educational events',
    },
    place: { uz: 'Tillar fakulteti', ru: 'Факультет языков', en: 'Faculty of Languages' },
    tag: { uz: 'Madaniyat', ru: 'Культура', en: 'Culture' },
  },
  {
    id: 'c4',
    day: '20',
    month: { uz: 'YAN', ru: 'ЯНВ', en: 'JAN' },
    year: '2026',
    title: {
      uz: 'Talabalar ilmiy anjumani',
      ru: 'Студенческая научная конференция',
      en: 'Student research conference',
    },
    place: { uz: 'Konferens-zal', ru: 'Конференц-зал', en: 'Conference hall' },
    tag: { uz: 'Ilm-fan', ru: 'Наука', en: 'Science' },
  },
];

/** E'lonlar */
const ANNOUNCEMENTS = [
  {
    id: 'a1',
    date: '2026-02-10',
    urgent: true,
    title: {
      uz: '2026-yil bahorgi semestr jadvali e’lon qilindi',
      ru: 'Объявлено расписание весеннего семестра 2026',
      en: 'Spring 2026 semester timetable published',
    },
    excerpt: {
      uz: 'Barcha yo‘nalishlar uchun dars jadvali dekanat e’lonlar taxtasida va saytda joylashtirildi.',
      ru: 'Расписание для всех направлений размещено на доске объявлений деканата и на сайте.',
      en: 'Timetables for all programs are posted on the dean’s board and the website.',
    },
  },
  {
    id: 'a2',
    date: '2026-01-28',
    urgent: false,
    title: {
      uz: 'Dual ta’lim amaliyoti — arizalar qabul qilinmoqda',
      ru: 'Приём заявок на практику dual-обучения',
      en: 'Applications open for dual-education practice',
    },
    excerpt: {
      uz: 'Heritage va Zafar Farm filiallari bo‘yicha amaliyotga qiziqqan talabalar dekanatga murojaat qilsin.',
      ru: 'Студентов, заинтересованных в практике в филиалах Heritage и Zafar Farm, ждут в деканате.',
      en: 'Students interested in Heritage and Zafar Farm practice should contact the dean’s office.',
    },
  },
  {
    id: 'a3',
    date: '2026-01-15',
    urgent: false,
    title: {
      uz: 'Xorijiy professorlar ma’ruzalari seriyasi',
      ru: 'Серия лекций зарубежных профессоров',
      en: 'Series of lectures by visiting professors',
    },
    excerpt: {
      uz: 'Fevral–mart oylarida 13 nafar xorijiy mutaxassis ishtirokida ochiq ma’ruzalar rejalashtirilgan.',
      ru: 'В феврале–марте запланированы открытые лекции с участием 13 зарубежных специалистов.',
      en: 'Open lectures with 13 international experts are planned for February–March.',
    },
  },
  {
    id: 'a4',
    date: '2025-12-20',
    urgent: false,
    title: {
      uz: 'Volontyor guruhi «Yosh ko‘makchi» — yangi a’zolar',
      ru: 'Волонтёрская группа «Ёш кўмакчи» — новый набор',
      en: '“Yosh ko‘makchi” volunteers — new members',
    },
    excerpt: {
      uz: 'Jamoat ishlari va ma’naviy tadbirlarga qo‘shilmoqchi bo‘lgan talabalar ro‘yxatdan o‘tishi mumkin.',
      ru: 'Студенты, желающие участвовать в общественных и культурных мероприятиях, могут зарегистрироваться.',
      en: 'Students wishing to join community and cultural activities may register.',
    },
  },
];

/** 6. KALENDAR + E'LONLAR — brand ranglar, scroll & hover */
export const EventsSection: React.FC = () => {
  const { t, L } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#fcf8ee]">
      <div className="absolute inset-0 parchment-texture opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{ backgroundImage: PATTERNS.starSoft, backgroundSize: '130px 130px' }}
        aria-hidden
      />
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60" />
      <div className="absolute -bottom-24 right-0 w-[400px] h-[400px] bg-amber-300/20 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-amber-900 font-ui mb-3">
            <Calendar className="w-4 h-4 text-amber-700" />
            {t('land_ev_badge')}
          </p>
          <h2 className="font-classic text-4xl md:text-5xl text-slate-950 tracking-tight">
            <span className="text-transparent bg-clip-text gold-gradient">{t('land_ev_title')}</span>
          </h2>
          <p className="mt-4 font-serif-classic italic text-lg text-slate-600 max-w-lg mx-auto">
            Kalendar va e’lonlar — fakultet hayotidan muhim sanalar
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-12 bg-amber-600/40" />
            <span className="w-2 h-2 rounded-full gold-gradient" />
            <span className="h-px w-12 bg-amber-600/40" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* ——— KALENDAR ——— */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-10 rounded-2xl bg-[#001524] text-amber-300 flex items-center justify-center shadow-lg border border-amber-400/30">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-classic text-2xl text-slate-950">Kalendar</h3>
                <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800/80">
                  2025–2026 tadbirlar
                </p>
              </div>
            </motion.div>

            <div className="space-y-3.5">
              {CALENDAR_EVENTS.map((ev, i) => (
                <motion.article
                  key={ev.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group flex gap-4 md:gap-5 p-4 md:p-5 rounded-2xl border-2 border-amber-300/50 bg-white/95 shadow-sm hover:border-amber-400 hover:shadow-[0_18px_40px_-14px_rgba(166,124,0,0.25)] transition-shadow duration-300 cursor-default"
                >
                  {/* Sana bloki */}
                  <div className="shrink-0 w-[4.5rem] md:w-20 rounded-xl bg-[#001524] text-center py-3 px-2 border border-amber-400/35 group-hover:border-amber-400/70 transition-colors shadow-md">
                    <span className="block font-ui text-[9px] font-black uppercase tracking-widest text-amber-400/90">
                      {L(ev.month)}
                    </span>
                    <span className="block font-classic text-3xl md:text-4xl text-amber-50 leading-none my-1 tabular-nums">
                      {ev.day}
                    </span>
                    <span className="block font-ui text-[9px] font-bold text-amber-200/50">{ev.year}</span>
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <span className="inline-block mb-2 text-[9px] font-ui font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300/60">
                      {L(ev.tag)}
                    </span>
                    <h4 className="font-classic text-lg md:text-xl text-slate-950 leading-snug group-hover:text-amber-950 transition-colors">
                      {L(ev.title)}
                    </h4>
                    <p className="mt-2 flex items-center gap-1.5 font-ui text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      {L(ev.place)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ——— E'LONLAR ——— */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-10 rounded-2xl gold-gradient text-slate-950 flex items-center justify-center shadow-lg">
                <Megaphone className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-classic text-2xl text-slate-950">E’lonlar</h3>
                <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800/80">
                  Rasmiy xabarlar
                </p>
              </div>
            </motion.div>

            <div className="rounded-[2rem] border-2 border-amber-300/60 bg-white/90 overflow-hidden shadow-md">
              <ul className="divide-y divide-amber-100">
                {ANNOUNCEMENTS.map((a, i) => (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: i * 0.09 }}
                    whileHover={{ backgroundColor: 'rgba(253, 250, 243, 1)' }}
                    className="group relative px-5 md:px-6 py-5 md:py-6 transition-colors"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 gold-gradient transition-all duration-300" />
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <time className="font-ui text-[10px] font-bold uppercase tracking-wider text-amber-800/70">
                        {a.date}
                      </time>
                      {a.urgent && (
                        <span className="text-[9px] font-ui font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-400/50">
                          Muhim
                        </span>
                      )}
                    </div>
                    <h4 className="font-classic text-base md:text-lg text-slate-950 leading-snug group-hover:text-amber-950 transition-colors">
                      {L(a.title)}
                    </h4>
                    <p className="mt-2 font-serif-classic text-sm text-slate-600 line-clamp-2 group-hover:text-slate-700">
                      {L(a.excerpt)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-ui font-black uppercase tracking-[0.18em] text-amber-900/0 group-hover:text-amber-900 transition-all duration-300">
                      Batafsil <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pastki metric strip — yil yakunlari */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { n: '120', l: { uz: 'Ma’naviy tadbir', ru: 'Мероприятия', en: 'Cultural events' } },
            { n: '110', l: { uz: 'Sport sovrindori', ru: 'Спорт призёры', en: 'Sports awards' } },
            { n: '110', l: { uz: 'Volontyorlar', ru: 'Волонтёры', en: 'Volunteers' } },
            { n: '10', l: { uz: 'To‘garaklar', ru: 'Кружки', en: 'Clubs' } },
          ].map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl border-2 border-amber-300/50 bg-white/90 px-4 py-5 text-center shadow-sm hover:border-amber-400 hover:shadow-[0_14px_32px_-12px_rgba(166,124,0,0.3)] transition-shadow"
            >
              <p className="font-classic text-3xl md:text-4xl text-transparent bg-clip-text gold-gradient tabular-nums">
                {m.n}
              </p>
              <p className="mt-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                {L(m.l)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/** 7. CTA — ikki panelli «doorway» (to'liq qora blok emas) */
export const HomeCtaSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 md:py-24 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,39,68,0.35)] border border-slate-200/60">
          {/* Chap: yo'nalishlar */}
          <div className="relative bg-[#0f2744] text-white p-10 md:p-14 flex flex-col justify-between min-h-[280px]">
            <div>
              <GraduationCap className="w-8 h-8 text-amber-400 mb-6" />
              <h2 className="font-classic text-3xl md:text-4xl leading-tight tracking-tight mb-4">
                {t('land_cta_title')}
              </h2>
              <p className="font-serif-classic text-base text-slate-300 leading-relaxed max-w-sm">
                {t('land_cta_text')}
              </p>
            </div>
            <Link
              to="/talim/yonalishlar"
              className="mt-10 inline-flex items-center gap-2 self-start font-ui text-[11px] font-bold uppercase tracking-[0.22em] text-[#0f2744] bg-amber-400 hover:bg-amber-300 px-6 py-3.5 rounded-full transition-colors"
            >
              {t('land_cta_programs')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* O'ng: aloqa */}
          <div className="relative bg-white p-10 md:p-14 flex flex-col justify-between min-h-[280px]">
            <div>
              <Users className="w-8 h-8 text-[#0f2744] mb-6" />
              <h3 className="font-classic text-2xl md:text-3xl text-[#0f2744] leading-tight mb-4">
                {t('land_cta_contact')}
              </h3>
              <p className="font-serif-classic text-base text-slate-500 leading-relaxed max-w-sm">
                Savollaringiz bormi? Fakultet bilan bog‘laning — yo‘nalish, qabul va hamkorlik.
              </p>
            </div>
            <Link
              to="/aloqa"
              className="mt-10 inline-flex items-center gap-2 self-start font-ui text-[11px] font-bold uppercase tracking-[0.22em] text-white bg-[#0f2744] hover:bg-[#0d7377] px-6 py-3.5 rounded-full transition-colors"
            >
              {t('land_cta_contact')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
