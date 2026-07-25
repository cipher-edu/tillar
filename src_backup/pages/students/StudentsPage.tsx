import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import { programs } from '@/data/programs';
import type { Person, StudentBadge } from '@/types';
import { personPath } from '@/lib/links';

const allBadges: StudentBadge[] = [
  'innovator',
  'gifted',
  'scientific',
  'creative',
  'volunteer',
  'international',
  'winner',
];

export const StudentsPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const students = getPeopleByRole('student');
  const [query, setQuery] = useState('');
  const [badge, setBadge] = useState<string>('all');
  const [program, setProgram] = useState('all');
  const [course, setCourse] = useState('all');
  const [quick, setQuick] = useState<Person | null>(null);

  const detail = slug ? getPerson(slug) : null;

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const name = L(s.name).toLowerCase();
      const matchQ = !query || name.includes(query.toLowerCase());
      const matchB = badge === 'all' || s.badges?.includes(badge as StudentBadge);
      const matchP = program === 'all' || s.programId === program;
      const matchC = course === 'all' || String(s.course) === course;
      return matchQ && matchB && matchP && matchC;
    });
  }, [students, query, badge, program, course, L]);

  if (detail && detail.roles.includes('student')) {
    return (
      <PageShell title={L(detail.name)}>
        <div className="mb-6">
          <Link to="/talabalar" className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui">
            ← {t('back')}
          </Link>
        </div>
        <div className="glass-card rounded-[3rem] border-amber-200 p-6 md:p-10">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_students')} subtitle={t('students_subtitle')}>
      <div className="space-y-4 mb-12 max-w-5xl mx-auto">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-14 pr-5 py-4 rounded-2xl border border-amber-200 bg-white/70 outline-none focus:border-amber-500 font-serif-classic text-xl italic"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setBadge('all')}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest font-ui border ${
              badge === 'all' ? 'royal-gradient text-white border-transparent' : 'bg-white border-amber-200 text-slate-600'
            }`}
          >
            {t('filter_all')}
          </button>
          {allBadges.map((b) => (
            <button
              key={b}
              onClick={() => setBadge(b)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest font-ui border ${
                badge === b ? 'gold-gradient text-slate-950 border-transparent' : 'bg-white border-amber-200 text-slate-600'
              }`}
            >
              {t(`badge_${b === 'gifted' ? 'gifted' : b}`)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-amber-200 bg-white/70 font-ui text-xs font-bold uppercase tracking-widest"
          >
            <option value="all">{t('filter_program')}</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {L(p.name)}
              </option>
            ))}
          </select>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-amber-200 bg-white/70 font-ui text-xs font-bold uppercase tracking-widest"
          >
            <option value="all">{t('filter_course')}</option>
            {[1, 2, 3, 4].map((c) => (
              <option key={c} value={String(c)}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((s) => (
          <PersonCard key={s.id} person={s} onQuickView={setQuick} />
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-2xl italic text-slate-400 mt-16">{t('empty')}</p>}

      <Modal open={!!quick} onClose={() => setQuick(null)} maxWidthClass="max-w-5xl">
        {quick && (
          <>
            <PersonProfile person={quick} compact />
            <div className="px-10 pb-10">
              <Link
                to={personPath(quick)}
                className="inline-flex px-8 py-4 royal-gradient text-white rounded-2xl text-[11px] font-black uppercase tracking-widest font-ui"
                onClick={() => setQuick(null)}
              >
                {t('profile_full')}
              </Link>
            </div>
          </>
        )}
      </Modal>
    </PageShell>
  );
};
