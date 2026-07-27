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
        <div className="mb-6">
          <Link to="/ilm-fan" className="text-[11px] font-black uppercase tracking-widest text-[#013d8c] font-ui">
            в†ђ {t('back')}
          </Link>
        </div>
        <div className="glass-card p-10 rounded-[3rem] border-[#d6e6f7] space-y-8">
          <div className="flex flex-wrap gap-3">
            <StatusBadge tone={detail.status === 'ongoing' ? 'royal' : 'blue'}>
              {detail.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
            </StatusBadge>
            {detail.grant && <StatusBadge tone="muted">{L(detail.grant)}</StatusBadge>}
          </div>
          <p className="text-2xl italic font-serif-classic text-slate-700 leading-relaxed">{L(detail.description)}</p>
          {detail.results && (
            <div className="p-6 rounded-[2rem] bg-[#eff7ff] border border-blue-100">
              <p className="text-xl italic font-serif-classic text-slate-800">{L(detail.results)}</p>
            </div>
          )}
          {leader && (
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#043b87] mb-3 font-ui">{t('science_leader')}</h4>
              <Link to={personPath(leader)} className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-[#d6e6f7]">
                <img src={leader.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <span className="font-classic text-lg">{L(leader.name)}</span>
              </Link>
            </div>
          )}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#043b87] mb-3 font-ui">{t('nav_students')} / jamoa</h4>
            <div className="flex flex-wrap gap-3">
              {participants.map((p) => (
                <Link key={p.id} to={personPath(p)} className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-blue-100">
                  <img src={p.photo} alt="" className="w-9 h-9 rounded-lg object-cover" />
                  <span className="font-classic text-sm">{L(p.name)}</span>
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
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-classic text-slate-900 mb-8 uppercase tracking-widest text-center">
          {t('science_projects')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const leader = getPerson(project.leaderId);
            return (
              <Link
                key={project.id}
                to={projectPath(project.slug)}
                className="glass-card p-8 rounded-[3rem] border-[#d6e6f7] hover:shadow-2xl transition-all group"
              >
                <div className="mb-4">
                  <StatusBadge tone={project.status === 'ongoing' ? 'royal' : 'blue'}>
                    {project.status === 'ongoing' ? t('science_status_ongoing') : t('science_status_completed')}
                  </StatusBadge>
                </div>
                <h3 className="text-2xl font-classic text-slate-900 mb-4 group-hover:text-[#013d8c] leading-snug">
                  {L(project.title)}
                </h3>
                <p className="text-lg italic font-serif-classic text-slate-600 line-clamp-3 mb-4">{L(project.description)}</p>
                {leader && (
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#043b87] font-ui">
                    {t('science_leader')}: {L(leader.name)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-classic text-slate-900 mb-8 uppercase tracking-widest text-center">
          {t('science_pubs')}
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {publications
            .slice()
            .sort((a, b) => b.year - a.year)
            .map((pub) => {
              const authors = getPeopleByIds(pub.authors);
              return (
                <div key={pub.id} className="glass-card p-6 md:p-8 rounded-[2rem] border-[#d6e6f7]">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <StatusBadge tone="muted">{pub.year}</StatusBadge>
                    {pub.indexed && pub.indexed !== 'none' && (
                      <StatusBadge tone="blue">
                        {t('science_indexed')}: {pub.indexed.toUpperCase()}
                      </StatusBadge>
                    )}
                    <StatusBadge tone="muted">{pub.type}</StatusBadge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-classic text-slate-900 mb-3 leading-snug">{L(pub.title)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {authors.map((a) => (
                      <Link key={a.id} to={personPath(a)} className="text-sm italic text-[#013d8c] hover:underline font-serif-classic">
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
