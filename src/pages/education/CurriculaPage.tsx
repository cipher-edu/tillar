import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { useLanguage } from '@/context/LanguageContext';
import { programs } from '@/data/programs';

export const CurriculaPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [level, setLevel] = useState<'all' | 'bachelor' | 'master'>('all');

  const filtered = programs.filter((p) => level === 'all' || p.level === level);

  return (
    <PageShell title={t('curricula_title')}>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(['all', 'bachelor', 'master'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setLevel(v)}
            className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest font-ui border ${
              level === v ? 'royal-gradient text-white border-transparent' : 'bg-white border-[#d6e6f7] text-slate-600'
            }`}
          >
            {v === 'all' ? t('filter_all') : v === 'bachelor' ? t('level_bachelor') : t('level_master')}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="glass-card p-6 md:p-8 rounded-[2rem] border-[#d6e6f7] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#043b87] mb-2 font-ui">
                {p.level === 'master' ? t('level_master') : t('level_bachelor')}
                {' В· '}
                {p.studyForm === 'evening'
                  ? t('form_evening')
                  : p.studyForm === 'distance'
                    ? t('form_distance')
                    : t('form_full_time')}
              </p>
              <h3 className="text-2xl font-classic text-slate-900">{L(p.name)}</h3>
            </div>
            {p.curriculumUrl ? (
              <a
                href={p.curriculumUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 gov-gradient text-white rounded-2xl text-[11px] font-black uppercase tracking-widest font-ui hover:brightness-110"
              >
                <Download className="w-4 h-4" /> {t('curricula_download')}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest font-ui border border-[#d6e6f7] bg-[#eff7ff] text-[#013d8c]/80">
                {t('curricula_unavailable')}
              </span>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
};
