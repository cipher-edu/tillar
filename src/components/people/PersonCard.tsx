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
      className={`group gov-card p-5 sm:p-6 text-center flex flex-col justify-between ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full text-center relative z-10"
      >
        <div className="relative w-28 h-36 mx-auto mb-4 overflow-hidden rounded border border-[#e1e1e1] bg-[#f5f5f5]">
          <img
            src={person.photo}
            alt={L(person.name)}
            className={`w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 ${
              person.isMemorial ? 'grayscale opacity-80' : ''
            }`}
          />
          <span className="absolute bottom-0 inset-x-0 bg-[#013d8c]/90 text-white text-[9px] text-center py-0.5 font-bold uppercase">
            {person.isMemorial ? 'Xotira' : 'Rasmiy'}
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-[#131523] uppercase mb-1.5 group-hover:text-[#1675e0] transition-colors leading-snug">
          {L(person.name)}
        </h3>

        {person.position && (
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#043b87] mb-1">
            {L(person.position)}
          </p>
        )}

        {person.degree && (
          <p className="text-xs text-[#707070] font-medium mb-2">{L(person.degree)}</p>
        )}

        {person.yearsActive && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#939393] mb-2">
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

      <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#043b87]">
          Profilni ko'rish
        </span>
        <Link
          to={path}
          className="w-9 h-9 rounded-md flex items-center justify-center bg-[#eff7ff] text-[#013d8c] border border-[#d6e6f7] group-hover:bg-[#013d8c] group-hover:text-white group-hover:border-[#013d8c] transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
