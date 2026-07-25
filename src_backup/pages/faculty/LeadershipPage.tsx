import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import type { Person } from '@/types';
import { personPath } from '@/lib/links';

export const LeadershipPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const leaders = getPeopleByRole('leader');
  const byOrder = (a: Person, b: Person) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99);
  const uni = leaders.filter((p) => p.leadershipLevel === 'university').sort(byOrder);
  // Fakultet: dekan + barcha kafedra mudirlari (leadershipLevel === 'faculty')
  const faculty = leaders.filter((p) => p.leadershipLevel === 'faculty').sort(byOrder);
  const [quick, setQuick] = useState<Person | null>(null);

  const detail = slug ? getPerson(slug) : null;

  if (detail && detail.roles.includes('leader')) {
    return (
      <PageShell title={L(detail.name)} subtitle="">
        <div className="mb-6">
          <Link to="/fakultet/rahbariyat" className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui">
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
    <PageShell title={t('nav_leadership')}>
      <div className="space-y-16">
        <div>
          <h2 className="text-2xl md:text-3xl font-classic text-slate-900 mb-8 text-center uppercase tracking-widest">
            {t('leadership_uni')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {uni.map((p) => (
              <PersonCard key={p.id} person={p} onQuickView={setQuick} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-classic text-slate-900 mb-8 text-center uppercase tracking-widest">
            {t('leadership_faculty')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((p) => (
              <PersonCard key={p.id} person={p} onQuickView={setQuick} />
            ))}
          </div>
        </div>
      </div>

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
