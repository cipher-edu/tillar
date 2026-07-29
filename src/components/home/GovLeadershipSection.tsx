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
    <section className="gov-section bg-white border-t border-[#E1E1E1] font-sans py-10 sm:py-12">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Tuzilma va boshqaruv"
          title="Universitet va fakultet rahbariyati"
          actionLabel="Barcha rahbarlar"
          actionTo="/fakultet/rahbariyat"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {leadershipPeople.map((person) => (
            <article key={person.id} className="p-5 rounded-none border border-[#E1E1E1] flex flex-col group bg-white hover:bg-[#F0F0F0] transition-colors">
              <div className="flex-1">
                <Link
                  to={personPath(person)}
                  className="relative block w-28 h-36 mx-auto mb-4 overflow-hidden rounded-none border border-[#E1E1E1] bg-slate-100"
                >
                  <img
                    src={person.photo}
                    alt={L(person.name)}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#013D8C] text-white text-[9px] text-center py-1 font-bold tracking-wide font-sans">
                    Rasmiy
                  </span>
                </Link>

                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-[#013D8C] tracking-wider block leading-snug">
                    {person.position ? L(person.position) : 'Rahbariyat'}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#000000] leading-snug transition-colors group-hover:text-[#013D8C] font-sans">
                    <Link to={personPath(person)}>{L(person.name)}</Link>
                  </h3>
                  <span className="text-[10px] text-[#707070] font-medium block">
                    {person.degree ? L(person.degree) : "Oliy ma'lumotli"}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E1E1E1] text-[11px] space-y-2 text-[#707070]">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#013D8C] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Qabul:{' '}
                      {person.officeHours
                        ? L(person.officeHours)
                        : 'Seshanba, Payshanba (14:00–17:00)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Phone className="w-3.5 h-3.5 text-[#002E69] shrink-0" />
                    <a
                      href={`tel:${(person.phone || '+998792218800').replace(/\s/g, '')}`}
                      className="truncate hover:text-[#013D8C] hover:underline transition-colors "
                    >
                      {person.phone || '+998 (79) 221-88-00'}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-[#002E69] shrink-0" />
                    <a
                      href={`mailto:${person.email || 'tillar@navdu.uz'}`}
                      className="truncate hover:text-[#013D8C] hover:underline transition-colors"
                    >
                      {person.email || 'tillar@navdu.uz'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  to={personPath(person)}
                  className="gov-btn bg-[#F0F6FE] text-[#002E69] hover:bg-[#002E69] hover:text-white w-full py-2 text-[11px] transition-colors font-extrabold uppercase"
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
