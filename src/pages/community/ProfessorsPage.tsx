import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import { departments } from '@/data/departments';
import type { Person } from '@/types';
import { personPath } from '@/lib/links';

export const ProfessorsPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const professors = getPeopleByRole('professor');
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('all');
  const [quick, setQuick] = useState<Person | null>(null);

  const detail = slug ? getPerson(slug) : null;

  const filtered = useMemo(() => {
    return professors.filter((p) => {
      const name = L(p.name).toLowerCase();
      const matchQ = !query || name.includes(query.toLowerCase());
      const matchD = dept === 'all' || p.departmentId === dept;
      return matchQ && matchD;
    });
  }, [professors, query, dept, L]);

  if (detail && detail.roles.includes('professor')) {
    return (
      <PageShell title={L(detail.name)}>
        <div className="mb-6">
          <Link to="/jamoa/professorlar" className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui">
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
    <PageShell title={t('nav_professors')}>
      <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-14 pr-5 py-4 rounded-2xl border border-amber-200 bg-white/70 outline-none focus:border-amber-500 font-serif-classic text-xl italic"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-5 py-4 rounded-2xl border border-amber-200 bg-white/70 font-ui text-sm font-bold uppercase tracking-widest text-slate-700"
        >
          <option value="all">{t('filter_all')}</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {L(d.name)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((p) => (
          <PersonCard key={p.id} person={p} onQuickView={setQuick} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-2xl italic text-slate-400 mt-16">{t('empty')}</p>
      )}

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
