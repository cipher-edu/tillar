import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone } from 'lucide-react';
import { people } from '@/data/people';
import { useLanguage } from '@/context/LanguageContext';
import { personPath } from '@/lib/links';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

export const GovLeadershipSection: React.FC = () => {
  const { L } = useLanguage();
  const leadershipPeople = people
    .filter((p) => p.leadershipLevel === 'university' || p.leadershipLevel === 'faculty')
    .slice(0, 4);

  return (
    <section className="gov-section bg-white border-t border-[#e1e1e1]">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Tuzilma va boshqaruv"
          title="Universitet va fakultet rahbariyati"
          actionLabel="Barcha rahbarlar"
          actionTo="/fakultet/rahbariyat"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {leadershipPeople.map((person) => (
            <article key={person.id} className="gov-card p-5 flex flex-col group">
              <div className="flex-1">
                <Link
                  to={personPath(person)}
                  className="relative block w-28 h-36 mx-auto mb-4 overflow-hidden rounded border border-[#e1e1e1] bg-[#f5f5f5] shadow-sm"
                >
                  <img
                    src={person.photo}
                    alt={L(person.name)}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#013d8c] to-[#043b87] text-white text-[9px] text-center py-1 font-bold uppercase tracking-wide">
                    Rasmiy
                  </span>
                </Link>

                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-[#043b87] uppercase tracking-wider block leading-snug">
                    {person.position ? L(person.position) : 'Rahbariyat'}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#131523] leading-snug transition-colors group-hover:text-[#1675e0]">
                    <Link to={personPath(person)}>{L(person.name)}</Link>
                  </h3>
                  <span className="text-[10px] text-[#707070] font-medium block">
                    {person.degree ? L(person.degree) : "Oliy ma'lumotli"}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e1e1e1] text-[11px] space-y-2 text-[#575757]">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#013d8c] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Qabul:{' '}
                      {person.officeHours
                        ? L(person.officeHours)
                        : 'Seshanba, Payshanba (14:00–17:00)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Phone className="w-3.5 h-3.5 text-[#013d8c] shrink-0" />
                    <a
                      href={`tel:${(person.phone || '+998792218800').replace(/\s/g, '')}`}
                      className="truncate hover:text-[#1675e0] hover:underline transition-colors"
                    >
                      {person.phone || '+998 (79) 221-88-00'}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-[#013d8c] shrink-0" />
                    <a
                      href={`mailto:${person.email || 'tillar@navdu.uz'}`}
                      className="truncate hover:text-[#1675e0] hover:underline transition-colors"
                    >
                      {person.email || 'tillar@navdu.uz'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0f0f0]">
                <Link
                  to={personPath(person)}
                  className="gov-btn gov-btn-ghost w-full py-2 text-[11px]"
                >
                  Tarjimai hol
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
