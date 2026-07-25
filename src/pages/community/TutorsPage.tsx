import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '@/components/ui/PageShell';
import { PersonProfile } from '@/components/people/PersonProfile';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson, getPeopleByIds } from '@/data/people';
import { groups, tutorActivities, getGroup } from '@/data/groups';
import { personPath, groupPath } from '@/lib/links';

export const TutorsPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug, groupId } = useParams();
  const tutors = getPeopleByRole('tutor');

  // Group detail
  if (slug && groupId) {
    const tutor = getPerson(slug);
    const group = getGroup(groupId);
    if (!tutor || !group) {
      return (
        <PageShell title={t('empty')}>
          <p className="text-center text-xl italic text-slate-400">{t('empty')}</p>
        </PageShell>
      );
    }
    const students = getPeopleByIds(group.studentIds);
    const activities = tutorActivities.filter((a) => a.groupId === group.id);

    return (
      <PageShell title={L(group.name)}>
        <div className="mb-6">
          <Link to={personPath(tutor)} className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui">
            ← {L(tutor.name)}
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-[3rem] border-amber-200">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4 font-ui">{t('nav_students')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {students.map((s) => (
                  <Link key={s.id} to={personPath(s)} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-amber-100 hover:border-amber-300">
                    <img src={s.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-classic">{L(s.name)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 rounded-[3rem] border-amber-200">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4 font-ui">{t('tutors_activity')}</h3>
              <div className="space-y-4">
                {activities.map((a) => (
                  <div key={a.id} className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 font-ui">{a.date}</p>
                    <h4 className="font-classic text-xl mb-2">{L(a.title)}</h4>
                    <p className="italic font-serif-classic text-slate-600">{L(a.description)}</p>
                  </div>
                ))}
                {activities.length === 0 && <p className="italic text-slate-400">{t('empty')}</p>}
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-[3rem] border-amber-200 h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4 font-ui">{t('profile_achievements')}</h3>
            <ul className="space-y-3">
              {group.achievements.map((ach, i) => (
                <li key={i} className="flex gap-2 text-lg italic font-serif-classic text-slate-700">
                  <span className="text-amber-600">✦</span> {L(ach)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageShell>
    );
  }

  // Tutor detail
  if (slug) {
    const tutor = getPerson(slug);
    if (!tutor) {
      return (
        <PageShell title={t('empty')}>
          <p className="text-center">{t('empty')}</p>
        </PageShell>
      );
    }
    const tutorGroups = groups.filter((g) => g.tutorId === tutor.id);
    const activities = tutorActivities.filter((a) => a.tutorId === tutor.id);

    return (
      <PageShell title={L(tutor.name)}>
        <div className="mb-6">
          <Link to="/jamoa/tyutorlar" className="text-[11px] font-black uppercase tracking-widest text-amber-800 font-ui">
            ← {t('back')}
          </Link>
        </div>
        <div className="glass-card rounded-[3rem] border-amber-200 p-6 md:p-10 mb-10">
          <PersonProfile person={tutor} />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-[3rem] border-amber-200">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4 font-ui">{t('tutors_groups')}</h3>
            <div className="space-y-3">
              {tutorGroups.map((g) => (
                <Link
                  key={g.id}
                  to={groupPath(tutor.slug, g.id)}
                  className="block p-5 rounded-2xl bg-white border border-amber-100 hover:border-amber-300"
                >
                  <p className="font-classic text-xl">{L(g.name)}</p>
                  <p className="text-sm text-slate-500 mt-1">{g.studentIds.length} {t('nav_students').toLowerCase()}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="glass-card p-8 rounded-[3rem] border-amber-200">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-4 font-ui">{t('tutors_activity')}</h3>
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-ui">{a.date}</p>
                  <p className="font-classic text-lg mt-1">{L(a.title)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_tutors')}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.map((tutor) => {
          const count = groups.filter((g) => g.tutorId === tutor.id).length;
          return (
            <Link
              key={tutor.id}
              to={personPath(tutor)}
              className="glass-card p-8 rounded-[3rem] border-amber-200 text-center hover:shadow-2xl transition-all group"
            >
              <img
                src={tutor.photo}
                alt=""
                className="w-32 h-32 rounded-[2rem] object-cover mx-auto mb-6 border-2 border-amber-200 grayscale group-hover:grayscale-0 transition-all"
              />
              <h3 className="text-2xl font-classic text-slate-900 group-hover:text-amber-800">{L(tutor.name)}</h3>
              <p className="text-sm italic text-slate-500 mt-2 mb-4">{L(tutor.position)}</p>
              <span className="inline-flex px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-widest font-ui">
                {count} {t('tutors_groups').toLowerCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
};
