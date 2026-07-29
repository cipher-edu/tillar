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
        <div className="mb-6 font-sans">
          <Link to="/jamoa/professorlar" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
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
    <PageShell title={t('nav_professors')}>
      <div className="flex flex-col md:flex-row gap-3 mb-10 max-w-4xl mx-auto font-sans">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002E69] w-4 h-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-11 pr-4 py-3 border border-[#E1E1E1] bg-white outline-none focus:border-[#013D8C] focus:ring-1 focus:ring-[#013D8C] font-medium text-sm text-slate-900 shadow-2xs"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-4 py-3 border border-[#E1E1E1] bg-white text-xs font-bold uppercase tracking-wider text-slate-700 outline-none focus:border-[#013D8C] shadow-2xs"
        >
          <option value="all">{t('filter_all')}</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {L(d.name)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
        {filtered.map((p) => (
          <PersonCard key={p.id} person={p} onQuickView={setQuick} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-base font-semibold text-slate-400 mt-16 font-sans">{t('empty')}</p>
      )}

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
