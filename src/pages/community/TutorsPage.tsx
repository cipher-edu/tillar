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
          <p className="text-center text-sm font-semibold text-slate-400">{t('empty')}</p>
        </PageShell>
      );
    }
    const students = getPeopleByIds(group.studentIds);
    const activities = tutorActivities.filter((a) => a.groupId === group.id);

    return (
      <PageShell title={L(group.name)}>
        <div className="mb-6 font-sans">
          <Link to={personPath(tutor)} className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
            ← {L(tutor.name)}
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 font-sans">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 border border-[#E1E1E1] ">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('nav_students')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {students.map((s) => (
                  <Link key={s.id} to={personPath(s)} className="flex items-center gap-3 p-3 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 transition-all">
                    <img src={s.photo} alt="" className="w-10 h-10 object-cover" />
                    <span className="font-bold text-slate-900 text-sm ">{L(s.name)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 border border-[#E1E1E1] ">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('tutors_activity')}</h3>
              <div className="space-y-4">
                {activities.map((a) => (
                  <div key={a.id} className="p-4 bg-[#F0F6FE] border border-[#013D8C]/20">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#002E69] mb-1 ">{a.date}</p>
                    <h4 className="font-black text-slate-900 text-base mb-1 ">{L(a.title)}</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{L(a.description)}</p>
                  </div>
                ))}
                {activities.length === 0 && <p className="text-xs text-slate-400 font-medium">{t('empty')}</p>}
              </div>
            </div>
          </div>
          <div className="bg-white p-8 border border-[#E1E1E1] h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('profile_achievements')}</h3>
            <ul className="space-y-2.5">
              {group.achievements.map((ach, i) => (
                <li key={i} className="flex gap-2 text-xs font-semibold text-slate-700">
                  <span className="text-[#013D8C]">✓</span> {L(ach)}
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
        <div className="mb-6 font-sans">
          <Link to="/jamoa/tyutorlar" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] hover:underline ">
            ← {t('back')}
          </Link>
        </div>
        <div className="bg-white border border-[#E1E1E1] p-6 md:p-10 mb-8 font-sans">
          <PersonProfile person={tutor} />
        </div>
        <div className="grid lg:grid-cols-2 gap-8 font-sans">
          <div className="bg-white p-8 border border-[#E1E1E1] ">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('tutors_groups')}</h3>
            <div className="space-y-3">
              {tutorGroups.map((g) => (
                <Link
                  key={g.id}
                  to={groupPath(tutor.slug, g.id)}
                  className="block p-4 bg-white border border-[#E1E1E1] hover:border-[#013D8C]/40 shadow-2xs transition-all"
                >
                  <p className="font-black text-slate-900 text-base ">{L(g.name)}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">{g.studentIds.length} {t('nav_students').toLowerCase()}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 border border-[#E1E1E1] ">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-4 ">{t('tutors_activity')}</h3>
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="p-3.5 bg-[#F0F6FE] border border-[#013D8C]/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#002E69] ">{a.date}</p>
                  <p className="font-bold text-slate-900 text-xs mt-1 ">{L(a.title)}</p>
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {tutors.map((tutor) => {
          const count = groups.filter((g) => g.tutorId === tutor.id).length;
          return (
            <Link
              key={tutor.id}
              to={personPath(tutor)}
              className="gov-card p-6 border border-[#E1E1E1] bg-white text-center hover:transition-all group flex flex-col items-center justify-between"
            >
              <div>
                <img
                  src={tutor.photo}
                  alt=""
                  className="w-28 h-28 object-cover mx-auto mb-4 border border-[#E1E1E1] group-transition-all duration-300"
                />
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#013D8C] transition-colors ">{L(tutor.name)}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 mb-4">{L(tutor.position)}</p>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/25 text-[10px] font-extrabold uppercase tracking-wider ">
                {count} {t('tutors_groups').toLowerCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
};
