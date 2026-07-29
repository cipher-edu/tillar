import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { personPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';

interface PersonCardProps {
  person: Person;
  onQuickView?: (person: Person) => void;
}

/** gov.uz uslubidagi shaxs kartasi — ko'k palitra, tilla yo'q */
export const PersonCard: React.FC<PersonCardProps> = ({ person, onQuickView }) => {
  const { L } = useLanguage();
  const path = personPath(person);

  return (
    <div
      className={`group gov-card p-5 border border-[#E1E1E1] bg-white text-center flex flex-col justify-between hover:transition-all ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full text-center relative z-10 font-sans"
      >
        <div className="relative w-28 h-36 mx-auto mb-4 overflow-hidden border border-slate-200 bg-slate-100 ">
          <img
            src={person.photo}
            alt={L(person.name)}
            className={`w-full h-full object-cover object-top transition-transform duration-300 group-${
              person.isMemorial ? 'grayscale opacity-80' : ''
            }`}
          />
          <span className="absolute bottom-0 inset-x-0 bg-[#002E69]/90 text-white text-[9px] text-center py-0.5 font-extrabold uppercase ">
            {person.isMemorial ? 'Xotira' : 'Rasmiy'}
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase mb-1.5 group-hover:text-[#013D8C] transition-colors leading-snug ">
          {L(person.name)}
        </h3>

        {person.position && (
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#002E69] mb-1 ">
            {L(person.position)}
          </p>
        )}

        {person.degree && (
          <p className="text-xs text-slate-600 font-medium mb-2">{L(person.degree)}</p>
        )}

        {person.yearsActive && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {person.yearsActive}
          </p>
        )}

        {person.badges && person.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {person.badges.map((b) => (
              <StudentBadgePill key={b} badge={b} />
            ))}
          </div>
        )}
      </button>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between font-sans">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#002E69] ">
          Profilni ko'rish
        </span>
        <Link
          to={path}
          className="w-8 h-8 flex items-center justify-center bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/30 group-hover:bg-[#002E69] group-hover:text-white transition-all "
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
