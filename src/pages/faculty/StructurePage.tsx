import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/ui/PageShell';
import { useLanguage } from '@/context/LanguageContext';
import { departments, getDepartment } from '@/data/departments';
import { getPerson, getPeopleByIds } from '@/data/people';
import { personPath } from '@/lib/links';

export const StructurePage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const detail = slug ? getDepartment(slug) : null;

  if (detail) {
    const head = getPerson(detail.headId);
    const staff = getPeopleByIds(detail.professorIds);

    return (
      <PageShell title={L(detail.name)}>
        <div className="mb-6">
          <Link to="/fakultet/tuzilma" className="text-[11px] font-black uppercase tracking-widest text-[#013d8c] font-ui">
            в†ђ {t('back')}
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] border-[#d6e6f7]">
              <p className="text-2xl italic font-serif-classic text-slate-700 leading-relaxed">{L(detail.description)}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-[#043b87] mb-4 font-ui">
                {t('structure_research')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {detail.researchAreas.map((area, i) => (
                  <span key={i} className="px-5 py-2 rounded-full bg-slate-900 text-blue-100 text-[10px] font-black uppercase tracking-widest font-ui">
                    {L(area)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-[#043b87] mb-4 font-ui">
                {t('structure_staff')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {staff.map((p) => (
                  <Link key={p.id} to={personPath(p)} className="flex items-center gap-4 p-4 glass-card rounded-[2rem] border-blue-100 hover:border-[#b6c6d7]">
                    <img src={p.photo} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-classic text-lg">{L(p.name)}</p>
                      <p className="text-sm italic text-slate-500">{L(p.position)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {head && (
            <div className="glass-card p-8 rounded-[3rem] border-[#d6e6f7] h-fit">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#043b87] mb-4 font-ui">{t('structure_head')}</p>
              <Link to={personPath(head)} className="block text-center group">
                <img src={head.photo} alt="" className="w-32 h-32 rounded-[2rem] object-cover mx-auto mb-4 border-2 border-[#d6e6f7]" />
                <h3 className="font-classic text-2xl group-hover:text-[#013d8c]">{L(head.name)}</h3>
                <p className="text-sm italic text-slate-500 mt-2">{L(head.degree)}</p>
              </Link>
            </div>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_structure')}>
      <div className="grid md:grid-cols-2 gap-8">
        {departments.map((dep) => {
          const head = getPerson(dep.headId);
          return (
            <Link
              key={dep.id}
              to={`/fakultet/tuzilma/${dep.slug}`}
              className="glass-card p-10 md:p-12 rounded-[3rem] border-[#d6e6f7] hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 royal-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity" />
              <h3 className="text-2xl md:text-3xl font-classic text-slate-900 mb-4 group-hover:text-[#013d8c] transition-colors">
                {L(dep.name)}
              </h3>
              <p className="text-lg italic font-serif-classic text-slate-600 mb-6 line-clamp-3">{L(dep.description)}</p>
              {head && (
                <p className="text-[11px] font-black uppercase tracking-widest text-[#043b87] font-ui">
                  {t('structure_head')}: {L(head.name)}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
};
