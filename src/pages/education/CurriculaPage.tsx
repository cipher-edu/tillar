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
      <div className="flex flex-wrap justify-center gap-2 mb-10 font-sans">
        {(['all', 'bachelor', 'master'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setLevel(v)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider border transition-colors ${
              level === v ? 'bg-[#002E69] text-white border-transparent ' : 'bg-white border-[#E1E1E1] text-slate-700 hover:bg-[#F0F6FE]'
            }`}
          >
            {v === 'all' ? t('filter_all') : v === 'bachelor' ? t('level_bachelor') : t('level_master')}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-4 font-sans">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="gov-card p-6 md:p-8 border border-[#E1E1E1] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#002E69] mb-1.5 ">
                {p.level === 'master' ? t('level_master') : t('level_bachelor')}
                {' · '}
                {p.studyForm === 'evening'
                  ? t('form_evening')
                  : p.studyForm === 'distance'
                    ? t('form_distance')
                    : t('form_full_time')}
              </p>
              <h3 className="text-lg md:text-xl font-black text-slate-900 ">{L(p.name)}</h3>
            </div>
            {p.curriculumUrl ? (
              <a
                href={p.curriculumUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002E69] text-white text-xs font-black uppercase tracking-wider hover:bg-[#013D8C] transition-colors "
              >
                <Download className="w-4 h-4" /> {t('curricula_download')}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border border-[#E1E1E1] bg-[#F0F6FE] text-[#002E69]">
                {t('curricula_unavailable')}
              </span>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
};
