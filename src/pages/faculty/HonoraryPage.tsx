import React, { useState } from 'react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole } from '@/data/people';
import type { Person } from '@/types';

export const HonoraryPage: React.FC = () => {
  const { t } = useLanguage();
  const all = getPeopleByRole('honorary');
  const living = all.filter((p) => !p.isMemorial);
  const memorial = all.filter((p) => p.isMemorial);
  const [quick, setQuick] = useState<Person | null>(null);

  return (
    <PageShell title={t('honorary_title')}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {living.map((p) => (
          <PersonCard key={p.id} person={p} onQuickView={setQuick} />
        ))}
      </div>

      {memorial.length > 0 && (
        <div className="pt-10 border-t border-[#d6e6f7]/50">
          <h2 className="text-3xl font-classic text-center text-slate-700 uppercase tracking-widest mb-10">
            ✦ {t('honorary_memory')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {memorial.map((p) => (
              <PersonCard key={p.id} person={p} onQuickView={setQuick} />
            ))}
          </div>
        </div>
      )}

      <Modal open={!!quick} onClose={() => setQuick(null)} maxWidthClass="max-w-5xl">
        {quick && <PersonProfile person={quick} compact />}
      </Modal>
    </PageShell>
  );
};
