import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, Clock, ExternalLink, Users, BookOpen } from 'lucide-react';
import type { Person } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { personPath, groupPath, newsPath } from '@/lib/links';
import { getPeopleByIds, getPerson } from '@/data/people';
import { getNewsByPerson } from '@/data/news';
import { getGroup } from '@/data/groups';
import { getDepartment } from '@/data/departments';
import { getProgram } from '@/data/programs';
import { StudentBadgePill } from '@/components/ui/Badge';

interface PersonProfileProps {
  person: Person;
  compact?: boolean;
}

export const PersonProfile: React.FC<PersonProfileProps> = ({ person, compact = false }) => {
  const { t, L } = useLanguage();
  const supervisor = person.supervisorId ? getPerson(person.supervisorId) : undefined;
  const students = person.studentIds ? getPeopleByIds(person.studentIds) : [];
  const relatedNews = getNewsByPerson(person.id);
  const department = person.departmentId ? getDepartment(person.departmentId) : undefined;
  const program = person.programId ? getProgram(person.programId) : undefined;
  const group = person.groupId ? getGroup(person.groupId) : undefined;
  const tutor = group ? getPerson(group.tutorId) : undefined;

  return (
    <div className={compact ? 'p-8 md:p-12' : ''}>
      <div className={`grid ${compact ? 'lg:grid-cols-[280px_1fr]' : 'lg:grid-cols-[320px_1fr]'} gap-10`}>
        <div className="space-y-6">
          <div className={`overflow-hidden rounded-[2.5rem] shadow-2xl border-2 border-amber-200 ${person.isMemorial ? 'grayscale' : ''}`}>
            <img src={person.photo} alt={L(person.name)} className="w-full aspect-square object-cover" />
          </div>
          <div className="space-y-3">
            {person.email && (
              <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-slate-700 hover:text-amber-800">
                <Mail className="w-4 h-4 text-amber-600" /> {person.email}
              </a>
            )}
            {person.phone && (
              <p className="flex items-center gap-3 text-slate-700">
                <Phone className="w-4 h-4 text-amber-600" /> {person.phone}
              </p>
            )}
            {person.officeHours && (
              <p className="flex items-center gap-3 text-slate-700">
                <Clock className="w-4 h-4 text-amber-600" /> {L(person.officeHours)}
              </p>
            )}
            {person.external?.scholar && (
              <a href={person.external.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-amber-800 hover:underline">
                <ExternalLink className="w-4 h-4" /> Google Scholar
              </a>
            )}
            {person.external?.orcid && (
              <a href={person.external.orcid} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-amber-800 hover:underline">
                <ExternalLink className="w-4 h-4" /> ORCID
              </a>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            {person.isMemorial && (
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest font-ui">
                ✦ {t('honorary_memory')}
              </span>
            )}
            <h2 className="text-4xl md:text-6xl font-classic font-black text-slate-950 uppercase leading-none mb-3">
              {L(person.name)}
            </h2>
            {person.position && (
              <p className="text-2xl italic font-serif-classic text-amber-800 mb-2">{L(person.position)}</p>
            )}
            {person.degree && (
              <p className="flex items-center gap-2 text-slate-500 uppercase tracking-widest text-xs font-ui">
                <GraduationCap className="w-4 h-4 text-amber-600" /> {L(person.degree)}
              </p>
            )}
            {person.yearsActive && (
              <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-400 font-ui">{person.yearsActive}</p>
            )}
            {person.badges && (
              <div className="flex flex-wrap gap-2 mt-4">
                {person.badges.map((b) => (
                  <StudentBadgePill key={b} badge={b} />
                ))}
              </div>
            )}
          </div>

          {(department || program || group) && (
            <div className="flex flex-wrap gap-3 text-sm">
              {department && (
                <Link to={`/fakultet/tuzilma/${department.slug}`} className="px-4 py-2 rounded-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50">
                  {L(department.name)}
                </Link>
              )}
              {program && (
                <Link to={`/talim/yonalishlar/${program.slug}`} className="px-4 py-2 rounded-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50">
                  {L(program.name)}
                  {person.course ? ` · ${person.course}` : ''}
                </Link>
              )}
              {group && tutor && (
                <Link to={groupPath(tutor.slug, group.id)} className="px-4 py-2 rounded-full bg-white border border-amber-200 text-amber-900 hover:bg-amber-50">
                  {t('profile_group')}: {L(group.name)}
                </Link>
              )}
            </div>
          )}

          {person.bio && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-3 font-ui">{t('profile_bio')}</h3>
              <p className="text-xl md:text-2xl italic font-serif-classic text-slate-700 leading-relaxed">{L(person.bio)}</p>
            </div>
          )}

          {person.interests && person.interests.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-3 font-ui">{t('profile_interests')}</h3>
              <div className="flex flex-wrap gap-2">
                {person.interests.map((interest, i) => (
                  <span key={i} className="px-5 py-2 rounded-full bg-slate-900 text-amber-100 text-[10px] font-black uppercase tracking-widest font-ui">
                    # {L(interest)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {supervisor && (
            <div className="glass-card p-6 rounded-[2rem] border-amber-200">
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-3 font-ui">{t('profile_supervisor')}</h3>
              <Link to={personPath(supervisor)} className="flex items-center gap-4 group">
                <img src={supervisor.photo} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <p className="font-classic text-lg group-hover:text-amber-800">{L(supervisor.name)}</p>
                  <p className="text-sm italic text-slate-500">{L(supervisor.position)}</p>
                </div>
              </Link>
            </div>
          )}

          {students.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-4 font-ui flex items-center gap-2">
                <Users className="w-4 h-4" /> {t('profile_students')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {students.map((s) => (
                  <Link key={s.id} to={personPath(s)} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-amber-100 hover:border-amber-300 transition-all">
                    <img src={s.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-classic text-sm">{L(s.name)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedNews.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-700 mb-4 font-ui flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {t('profile_related_news')}
              </h3>
              <div className="space-y-3">
                {relatedNews.map((n) => (
                  <Link key={n.id} to={newsPath(n.slug)} className="block p-4 rounded-2xl bg-white border border-amber-100 hover:border-amber-300">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-ui">{n.date}</p>
                    <p className="font-classic text-lg leading-snug">{L(n.title)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
