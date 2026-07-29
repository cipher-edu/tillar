import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/ui/PageShell';
import { StatusBadge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { projects, publications, getProject } from '@/data/science';
import { getPerson, getPeopleByIds } from '@/data/people';
import { personPath, projectPath } from '@/lib/links';

export const SciencePage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const detail = slug ? getProject(slug) : null;

  if (detail) {
    const leader = getPerson(detail.leaderId);
    const participants = getPeopleByIds(detail.participantIds);
    return (
      <PageShell title={L(detail.title)}>
        <div className="mb-6 font-sans">
          <Link to="/ilm-fan" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
            ← {t('back')}
          </Link>
        </div>
        <div className="bg-white p-8 md:p-10 border border-[#E1E1E1] space-y-6 font-sans">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={detail.status === 'ongoing' ? 'royal' : 'blue'}>
              {detail.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
            </StatusBadge>
            {detail.grant && <StatusBadge tone="muted">{L(detail.grant)}</StatusBadge>}
          </div>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">{L(detail.description)}</p>
          {detail.results && (
            <div className="p-5 bg-[#F0F6FE] border border-[#013D8C]/20">
              <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">{L(detail.results)}</p>
            </div>
          )}
          {leader && (
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-3 ">{t('science_leader')}</h4>
              <Link to={personPath(leader)} className="inline-flex items-center gap-3 px-4 py-3 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 transition-all">
                <img src={leader.photo} alt="" className="w-10 h-10 object-cover" />
                <span className="font-bold text-slate-900 text-sm ">{L(leader.name)}</span>
              </Link>
            </div>
          )}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-3 ">{t('nav_students')} / jamoa</h4>
            <div className="flex flex-wrap gap-2">
              {participants.map((p) => (
                <Link key={p.id} to={personPath(p)} className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 transition-all">
                  <img src={p.photo} alt="" className="w-8 h-8 object-cover" />
                  <span className="font-bold text-slate-900 text-xs ">{L(p.name)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('science_title')}>
      <div className="mb-14 font-sans">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase tracking-wider text-center ">
          {t('science_projects')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const leader = getPerson(project.leaderId);
            return (
              <Link
                key={project.id}
                to={projectPath(project.slug)}
                className="gov-card p-6 md:p-8 border border-[#E1E1E1] bg-white hover:transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    <StatusBadge tone={project.status === 'ongoing' ? 'royal' : 'blue'}>
                      {project.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
                    </StatusBadge>
                  </div>
                  <h3 className="text-base md:text-lg font-black text-slate-900 mb-3 group-hover:text-[#013D8C] leading-snug transition-colors">
                    {L(project.title)}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 font-medium leading-relaxed">{L(project.description)}</p>
                </div>
                {leader && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#002E69] ">
                      {t('science_leader')}: {L(leader.name)}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="font-sans">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase tracking-wider text-center ">
          {t('science_pubs')}
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {publications
            .slice()
            .sort((a, b) => b.year - a.year)
            .map((pub) => {
              const authors = getPeopleByIds(pub.authors);
              return (
                <div key={pub.id} className="gov-card p-6 border border-[#E1E1E1] bg-white ">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <StatusBadge tone="muted">{pub.year}</StatusBadge>
                    {pub.indexed && pub.indexed !== 'none' && (
                      <StatusBadge tone="blue">
                        {t('science_indexed')}: {pub.indexed.toUpperCase()}
                      </StatusBadge>
                    )}
                    <StatusBadge tone="muted">{pub.type}</StatusBadge>
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 mb-2 leading-snug ">{L(pub.title)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {authors.map((a) => (
                      <Link key={a.id} to={personPath(a)} className="text-xs font-bold text-[#013D8C] hover:underline ">
                        {L(a.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </PageShell>
  );
};
