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
        <div className="mb-6 font-sans">
          <Link to="/fakultet/tuzilma" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
            ← {t('back')}
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 font-sans">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 border border-[#E1E1E1] ">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">{L(detail.description)}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">
                {t('structure_research')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {detail.researchAreas.map((area, i) => (
                  <span key={i} className="px-4 py-2 bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/20 text-[10px] font-extrabold uppercase tracking-wider ">
                    {L(area)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">
                {t('structure_staff')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {staff.map((p) => (
                  <Link key={p.id} to={personPath(p)} className="flex items-center gap-4 p-4 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 transition-all">
                    <img src={p.photo} alt="" className="w-14 h-14 object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 text-sm ">{L(p.name)}</p>
                      <p className="text-xs text-slate-500 font-medium">{L(p.position)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {head && (
            <div className="bg-white p-8 border border-[#E1E1E1] h-fit">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('structure_head')}</p>
              <Link to={personPath(head)} className="block text-center group">
                <img src={head.photo} alt="" className="w-32 h-32 object-cover mx-auto mb-4 border border-[#E1E1E1] " />
                <h3 className="font-black text-lg text-slate-900 group-hover:text-[#013D8C] transition-colors ">{L(head.name)}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{L(head.degree)}</p>
              </Link>
            </div>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_structure')}>
      <div className="grid md:grid-cols-2 gap-6 font-sans">
        {departments.map((dep) => {
          const head = getPerson(dep.headId);
          return (
            <Link
              key={dep.id}
              to={`/fakultet/tuzilma/${dep.slug}`}
              className="gov-card p-6 md:p-8 border border-[#E1E1E1] bg-white hover:transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 group-hover:text-[#013D8C] transition-colors ">
                  {L(dep.name)}
                </h3>
                <p className="text-xs text-slate-600 font-medium mb-6 line-clamp-3 leading-relaxed">{L(dep.description)}</p>
              </div>
              {head && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#002E69] ">
                    {t('structure_head')}: {L(head.name)}
                  </span>
                  <span className="text-[10px] font-bold text-[#013D8C] group-hover:underline">
                    Batafsil →
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
};
