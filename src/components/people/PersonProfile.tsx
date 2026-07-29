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
    <div className={`font-sans text-[#000000] ${compact ? 'p-5 sm:p-6' : ''}`}>
      {/* Official gov.uz Header Hero Persona Card */}
      <div className="border border-[#E1E1E1] bg-white overflow-hidden mb-8 rounded-none">
        <div className="bg-[#013D8C] px-6 py-3 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100 font-sans">
              Navoiy davlat universiteti Tillar fakulteti
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-100 hidden sm:inline font-sans">
            Rasmiy Profil
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Portrait Photo */}
          <div className="relative shrink-0 w-36 h-48 sm:w-44 sm:h-56 mx-auto md:mx-0 overflow-hidden border border-[#E1E1E1] bg-slate-100 rounded-none">
            <img
              src={person.photo}
              alt={L(person.name)}
              className={`w-full h-full object-cover object-top ${
                person.isMemorial ? 'grayscale' : ''
              }`}
            />
            {person.isMemorial && (
              <span className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white text-[9px] text-center py-1 font-extrabold uppercase tracking-wider">
                ❖ Xotira
              </span>
            )}
          </div>

          {/* Core Info & Direct Contact Actions */}
          <div className="flex-1 min-w-0 space-y-3.5 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/25 text-[10px] font-black uppercase tracking-wider ">
                  {person.position ? L(person.position) : 'Rahbariyat'}
                </span>
                {person.degree && (
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider ">
                    {L(person.degree)}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 uppercase leading-snug ">
                {L(person.name)}
              </h1>
            </div>

            {/* Quick Contact & Reception Hours Badges */}
            <div className="grid sm:grid-cols-2 gap-2.5 pt-2 text-xs font-medium">
              {person.officeHours && (
                <div className="flex items-center gap-2 p-2.5 bg-[#F0F6FE] border border-[#013D8C]/20 text-slate-800">
                  <Clock className="w-4 h-4 text-[#002E69] shrink-0" />
                  <span className="truncate"><strong>Qabul:</strong> {L(person.officeHours)}</span>
                </div>
              )}
              {person.phone && (
                <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 p-2.5 bg-[#F0F6FE] border border-[#013D8C]/20 text-slate-800 hover:text-[#013D8C] transition-colors ">
                  <Phone className="w-4 h-4 text-[#002E69] shrink-0" />
                  <span className="truncate"><strong>Tel:</strong> {person.phone}</span>
                </a>
              )}
              {person.email && (
                <a href={`mailto:${person.email}`} className="flex items-center gap-2 p-2.5 bg-[#F0F6FE] border border-[#013D8C]/20 text-slate-800 hover:text-[#013D8C] transition-colors truncate">
                  <Mail className="w-4 h-4 text-[#002E69] shrink-0" />
                  <span className="truncate"><strong>Email:</strong> {person.email}</span>
                </a>
              )}
              <Link to="/aloqa" className="flex items-center justify-center gap-1.5 p-2.5 bg-[#002E69] text-white hover:bg-[#013D8C] transition-colors font-bold text-xs uppercase tracking-wider shadow-2xs">
                <span>Qabulxonaga yozilish</span>
              </Link>
            </div>

            {/* External Academic Links */}
            {(person.external?.scholar || person.external?.orcid) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
                {person.external?.scholar && (
                  <a href={person.external.scholar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#013D8C] hover:underline ">
                    <ExternalLink className="w-3.5 h-3.5" /> Google Scholar Profil
                  </a>
                )}
                {person.external?.orcid && (
                  <a href={person.external.orcid} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#013D8C] hover:underline ">
                    <ExternalLink className="w-3.5 h-3.5" /> ORCID iD
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Structural & Bio Detail Cards */}
      <div className="space-y-6">
        {/* Department / Program Badges */}
        {(department || program || group) && (
          <div className="flex flex-wrap gap-2 text-xs">
            {department && (
              <Link to={`/fakultet/tuzilma/${department.slug}`} className="px-3.5 py-1.5 bg-[#F0F6FE] border border-[#013D8C]/30 text-[#002E69] font-bold hover:bg-[#002E69] hover:text-white transition-colors ">
                Kafedra: {L(department.name)}
              </Link>
            )}
            {program && (
              <Link to={`/talim/yonalishlar/${program.slug}`} className="px-3.5 py-1.5 bg-[#F0F6FE] border border-[#013D8C]/30 text-[#002E69] font-bold hover:bg-[#002E69] hover:text-white transition-colors ">
                Yo‘nalish: {L(program.name)} {person.course ? `· ${person.course}-kurs` : ''}
              </Link>
            )}
            {group && tutor && (
              <Link to={groupPath(tutor.slug, group.id)} className="px-3.5 py-1.5 bg-[#F0F6FE] border border-[#013D8C]/30 text-[#002E69] font-bold hover:bg-[#002E69] hover:text-white transition-colors ">
                Guruh: {L(group.name)}
              </Link>
            )}
          </div>
        )}

        {/* Bio / Biography Section */}
        {person.bio && (
          <div className="bg-white p-6 border border-[#E1E1E1] space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#002E69]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-[#002E69] ">
                {t('profile_bio')} / Mehnat Faoliyati
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {L(person.bio)}
            </p>
          </div>
        )}

        {/* Scientific Interests & Badges */}
        {person.interests && person.interests.length > 0 && (
          <div className="bg-white p-6 border border-[#E1E1E1] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#002E69] ">
              {t('profile_interests')} va Ilmiy Yo‘nalishlari
            </h3>
            <div className="flex flex-wrap gap-2">
              {person.interests.map((interest, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/25 text-[11px] font-black uppercase tracking-wider ">
                  # {L(interest)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supervisor */}
        {supervisor && (
          <div className="p-5 bg-white border border-[#E1E1E1] space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] ">
              {t('profile_supervisor')}
            </h3>
            <Link to={personPath(supervisor)} className="flex items-center gap-3 group">
              <img src={supervisor.photo} alt="" className="w-11 h-11 object-cover border border-slate-200" />
              <div>
                <p className="font-bold text-xs text-slate-900 group-hover:text-[#013D8C] transition-colors ">{L(supervisor.name)}</p>
                <p className="text-[11px] text-slate-500 font-medium">{L(supervisor.position)}</p>
              </div>
            </Link>
          </div>
        )}

        {/* Subordinate Students Grid */}
        {students.length > 0 && (
          <div className="bg-white p-6 border border-[#E1E1E1] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#002E69] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#013D8C]" /> {t('profile_students')} ({students.length})
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {students.map((s) => (
                <Link key={s.id} to={personPath(s)} className="flex items-center gap-3 p-3 bg-[#F0F6FE] border border-[#013D8C]/20 hover:bg-[#002E69] hover:text-white group transition-all">
                  <img src={s.photo} alt="" className="w-9 h-9 object-cover shrink-0 border border-white" />
                  <span className="font-bold text-xs text-slate-900 group-hover:text-white truncate">{L(s.name)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related News & Speeches */}
        {relatedNews.length > 0 && (
          <div className="bg-white p-6 border border-[#E1E1E1] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#002E69] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#013D8C]" /> {t('profile_related_news')} ({relatedNews.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {relatedNews.map((n) => (
                <Link key={n.id} to={newsPath(n.slug)} className="block p-3.5 bg-white border border-[#E1E1E1] hover:border-[#013D8C] hover:bg-[#F0F6FE] transition-all shadow-2xs group">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#002E69] mb-1 ">{n.date}</p>
                  <p className="font-black text-xs text-slate-900 group-hover:text-[#013D8C] leading-snug transition-colors">{L(n.title)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
