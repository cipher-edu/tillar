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
      <PageShell title={L(detail.name)}>
        <div className="mb-8 font-sans">
          <Link
            to="/talim/yonalishlar"
            className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline "
          >
            ← {t('back')}
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 font-sans">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden border border-[#E1E1E1] bg-white p-8 md:p-10 "
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#002E69] text-white text-[10px] font-black uppercase tracking-wider ">
                  <GraduationIcon level={detail.level} />
                  {detail.level === 'master' ? t('level_master') : t('level_bachelor')}
                </span>
                <span className="inline-flex px-3 py-1.5 border border-[#013D8C]/25 bg-[#F0F6FE] text-[#002E69] text-[10px] font-black uppercase tracking-wider ">
                  {studyFormLabel(detail.studyForm, t)}
                </span>
                <span className="text-2xl text-[#002E69]/20 font-black">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                {L(detail.description)}
              </p>
            </motion.div>

            {/* Careers */}
            <div className="relative p-8 border border-[#E1E1E1] bg-white ">
              <h3 className="relative text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-6 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#013D8C]" />
                {t('programs_careers')}
              </h3>
              <ul className="relative grid sm:grid-cols-2 gap-3">
                {detail.careers.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3.5 bg-[#F0F6FE] border border-[#013D8C]/20 text-slate-800 text-xs font-semibold"
                  >
                    <span className="w-7 h-7 bg-[#002E69] text-white flex items-center justify-center text-xs font-black shrink-0 ">
                      {i + 1}
                    </span>
                    <span>{L(c)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Staff */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                {t('programs_staff')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {staff.map((p) => (
                  <Link
                    key={p.id}
                    to={personPath(p)}
                    className="flex items-center gap-4 p-4 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 transition-all"
                  >
                    <img src={p.photo} alt="" className="w-12 h-12 object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 text-sm ">{L(p.name)}</p>
                      <p className="text-xs text-slate-500 font-medium">{L(p.position)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="p-6 border border-[#E1E1E1] bg-white ">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-2 ">
                {t('nav_curricula')}
              </h3>
              <p className="text-xs font-semibold text-slate-700 mb-5">
                {L(detail.name)}
              </p>
              {detail.curriculumUrl ? (
                <a
                  href={detail.curriculumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#002E69] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#013D8C] transition-colors "
                >
                  <Download className="w-4 h-4" /> {t('curricula_download')} PDF
                </a>
              ) : (
                <p className="w-full py-3 text-center text-[11px] font-bold uppercase tracking-wider border border-[#E1E1E1] bg-[#F0F6FE] text-[#002E69]">
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
    <PageShell title={t('programs_title')} subtitle={t('programs_subtitle')}>
      {/* Intro banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 border border-[#E1E1E1] bg-[#F0F6FE] p-6 md:p-8 font-sans "
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-14 h-14 bg-[#002E69] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#013D8C] mb-1 ">
              {t('site_name')}
            </p>
            <p className="text-sm md:text-base font-semibold text-slate-800 leading-relaxed max-w-3xl">
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
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider border transition-colors ${
                  level === opt.id
                    ? 'bg-[#002E69] text-white border-transparent '
                    : 'bg-white border-[#E1E1E1] text-slate-700 hover:bg-[#F0F6FE]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 font-sans">
        {filtered.map((program, i) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ delay: (i % 6) * 0.05, duration: 0.35 }}
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
