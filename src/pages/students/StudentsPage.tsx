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
        <div className="mb-6 font-sans">
          <Link to="/talabalar" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
            ← {t('back')}
          </Link>
        </div>
        <div className="bg-white border border-[#E1E1E1] p-6 md:p-10 font-sans">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_students')} subtitle={t('students_subtitle')}>
      <div className="space-y-4 mb-10 max-w-5xl mx-auto font-sans">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002E69] w-4 h-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-11 pr-4 py-3 border border-[#E1E1E1] bg-white outline-none focus:border-[#013D8C] font-medium text-sm text-slate-900 shadow-2xs"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => setBadge('all')}
            className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-colors ${
              badge === 'all' ? 'bg-[#002E69] text-white border-transparent ' : 'bg-white border-[#E1E1E1] text-slate-700 hover:bg-[#F0F6FE]'
            }`}
          >
            {t('filter_all')}
          </button>
          {allBadges.map((b) => (
            <button
              key={b}
              onClick={() => setBadge(b)}
              className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-colors ${
                badge === b ? 'bg-[#002E69] text-white border-transparent ' : 'bg-white border-[#E1E1E1] text-slate-700 hover:bg-[#F0F6FE]'
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
            className="px-4 py-2.5 border border-[#E1E1E1] bg-white text-xs font-bold uppercase tracking-wider text-slate-700 outline-none focus:border-[#013D8C]"
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
            className="px-4 py-2.5 border border-[#E1E1E1] bg-white text-xs font-bold uppercase tracking-wider text-slate-700 outline-none focus:border-[#013D8C]"
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
        {filtered.map((s) => (
          <PersonCard key={s.id} person={s} onQuickView={setQuick} />
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-base font-semibold text-slate-400 mt-16 font-sans">{t('empty')}</p>}

      <Modal open={!!quick} onClose={() => setQuick(null)} maxWidthClass="max-w-4xl">
        {quick && (
          <div className="font-sans">
            <PersonProfile person={quick} compact />
            <div className="px-8 pb-8 pt-2">
              <Link
                to={personPath(quick)}
                className="inline-flex px-6 py-3 bg-[#002E69] text-white text-xs font-black uppercase tracking-wider hover:bg-[#013D8C] transition-colors "
                onClick={() => setQuick(null)}
              >
                {t('profile_full')}
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </PageShell>
  );
};
