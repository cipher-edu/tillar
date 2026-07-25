import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Download, Sparkles, Users } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { ProgramCard } from '@/components/education/ProgramCard';
import { useLanguage } from '@/context/LanguageContext';
import { programs, getProgram } from '@/data/programs';
import { getPeopleByIds } from '@/data/people';
import { personPath } from '@/lib/links';
import type { DegreeLevel, StudyForm } from '@/types';

function studyFormLabel(form: StudyForm | undefined, t: (k: string) => string) {
  if (form === 'evening') return t('form_evening');
  if (form === 'distance') return t('form_distance');
  return t('form_full_time');
}

export const ProgramsPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const detail = slug ? getProgram(slug) : null;
  const [level, setLevel] = useState<DegreeLevel | 'all'>('all');

  const filtered = useMemo(() => {
    if (level === 'all') return programs;
    return programs.filter((p) => p.level === level);
  }, [level]);

  if (detail) {
    const staff = getPeopleByIds(detail.professorIds);
    const idx = Math.max(0, programs.findIndex((p) => p.id === detail.id));

    return (
      <PageShell title={L(detail.name)} heritageIntensity="medium">
        <div className="mb-8">
          <Link
            to="/talim/yonalishlar"
            className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui hover:text-amber-600"
          >
            ← {t('back')}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero detail card — 3D */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[3rem] overflow-hidden border border-amber-200/80 bg-white/90 shadow-2xl shadow-amber-900/10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-[#fffdfa] to-[#f3eee6]/60 pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-200/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[rgba(0,77,97,0.08)] blur-3xl rounded-full" />
              <div className="relative p-10 md:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full royal-gradient text-amber-100 text-[10px] font-black uppercase tracking-widest font-ui shadow-lg">
                    <GraduationIcon level={detail.level} />
                    {detail.level === 'master' ? t('level_master') : t('level_bachelor')}
                  </span>
                  <span className="inline-flex px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-[10px] font-black uppercase tracking-widest font-ui">
                    {studyFormLabel(detail.studyForm, t)}
                  </span>
                  <span className="font-classic text-3xl text-amber-900/10 font-black">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl italic font-serif-classic text-slate-700 leading-relaxed">
                  {L(detail.description)}
                </p>
              </div>
              <div className="h-1.5 w-full gold-gradient" />
            </motion.div>

            {/* Careers — 3D chips */}
            <div className="relative rounded-[3rem] p-10 border border-amber-100 bg-white/85 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 blur-2xl rounded-full" />
              <h3 className="relative text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-6 font-ui flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {t('programs_careers')}
              </h3>
              <ul className="relative grid sm:grid-cols-2 gap-3">
                {detail.careers.map((c, i) => (
                  <li
                    key={i}
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-white to-amber-50/60 border border-amber-100 shadow-md hover:shadow-xl hover:-translate-y-1 hover:rotate-[0.5deg] transition-all duration-300"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <span className="w-9 h-9 rounded-xl gold-gradient text-slate-950 flex items-center justify-center text-sm font-black shadow-md shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-lg italic font-serif-classic text-slate-700">{L(c)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Staff */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-4 font-ui flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                {t('programs_staff')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {staff.map((p) => (
                  <Link
                    key={p.id}
                    to={personPath(p)}
                    className="flex items-center gap-4 p-5 rounded-[2rem] bg-white/90 border border-amber-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber-300 transition-all duration-300"
                  >
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-2xl gold-gradient blur-md opacity-40" />
                      <img src={p.photo} alt="" className="relative w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                    </div>
                    <div>
                      <p className="font-classic text-lg text-slate-900">{L(p.name)}</p>
                      <p className="text-sm italic text-slate-500">{L(p.position)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar 3D */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div
              className="relative rounded-[3rem] p-8 border border-amber-200/80 bg-white/95 shadow-2xl overflow-hidden"
              style={{ transform: 'perspective(800px) rotateY(-2deg)' }}
            >
              <div className="absolute inset-0 royal-gradient opacity-[0.04]" />
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-amber-200/40 blur-2xl rounded-full" />
              <h3 className="relative text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3 font-ui">
                {t('nav_curricula')}
              </h3>
              <p className="relative text-base italic font-serif-classic text-slate-600 mb-6">
                {L(detail.name)}
              </p>
              {detail.curriculumUrl ? (
                <a
                  href={detail.curriculumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-full py-5 royal-gradient text-white rounded-2xl text-[11px] font-black uppercase tracking-widest font-ui flex items-center justify-center gap-3 hover:brightness-110 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Download className="w-4 h-4" /> {t('curricula_download')} PDF
                </a>
              ) : (
                <p className="relative w-full py-5 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest font-ui border border-amber-200 bg-amber-50/80 text-amber-900/80">
                  {t('curricula_unavailable')}
                </p>
              )}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('programs_title')} subtitle={t('programs_subtitle')} heritageIntensity="strong">
      {/* Intro 3D banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12 rounded-[3rem] overflow-hidden border border-amber-200/60 bg-white/70 backdrop-blur-md shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 via-[#fdfaf3]/40 to-[rgba(0,77,97,0.04)]" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 gold-gradient opacity-20 blur-3xl rounded-full" />
        <div className="relative px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center gap-8">
          <div
            className="w-20 h-20 rounded-[1.5rem] royal-gradient text-amber-200 flex items-center justify-center shadow-2xl shrink-0 border border-amber-500/20"
            style={{ transform: 'perspective(600px) rotateY(-12deg) rotateX(8deg)' }}
          >
            <BookOpen className="w-9 h-9" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-2 font-ui">
              {t('site_name')}
            </p>
            <p className="text-xl md:text-2xl italic font-serif-classic text-slate-700 leading-relaxed max-w-3xl">
              {t('programs_intro')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all' as const, label: t('filter_all') },
                { id: 'bachelor' as const, label: t('level_bachelor') },
                { id: 'master' as const, label: t('level_master') },
              ]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLevel(opt.id)}
                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest font-ui border transition-all ${
                  level === opt.id
                    ? 'bg-slate-950 text-amber-200 border-slate-950 shadow-lg'
                    : 'bg-[#fffdfa] border-amber-200 text-slate-600 hover:border-amber-500 hover:text-amber-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D cards grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
        {filtered.map((program, i) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 6) * 0.06, duration: 0.45 }}
          >
            <ProgramCard program={program} index={programs.indexOf(program)} variant="full" />
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
};

function GraduationIcon({ level }: { level: DegreeLevel }) {
  return level === 'master' ? (
    <Sparkles className="w-3.5 h-3.5" />
  ) : (
    <BookOpen className="w-3.5 h-3.5" />
  );
}
