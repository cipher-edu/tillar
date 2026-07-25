import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { personPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import { ArrowRight, UserCheck } from 'lucide-react';

interface PersonCardProps {
  person: Person;
  onQuickView?: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onQuickView }) => {
  const { L, t } = useLanguage();
  const path = personPath(person);

  return (
    <div
      className={`group relative rounded-[2.5rem] p-7 border-2 border-amber-300/60 bg-white/95 backdrop-blur-xl shadow-md hover:bg-slate-950 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 text-center flex flex-col justify-between ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full text-center"
      >
        <div className="relative w-36 h-36 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-amber-400/40 rounded-[2.2rem] rotate-45 group-hover:rotate-90 group-hover:border-amber-300 transition-transform duration-700" />
          <div className="absolute inset-3 overflow-hidden rounded-[1.75rem] shadow-xl border-2 border-white/60 group-hover:border-amber-400 transition-colors">
            <img
              src={person.photo}
              alt={L(person.name)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                person.isMemorial ? 'grayscale' : 'grayscale group-hover:grayscale-0'
              }`}
            />
          </div>
        </div>

        <h3 className="text-xl font-classic font-bold text-slate-950 uppercase mb-2 group-hover:text-amber-300 transition-colors duration-300 drop-shadow-sm">
          {L(person.name)}
        </h3>

        {person.position && (
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 group-hover:text-amber-400 font-bold mb-2 font-ui transition-colors">
            {L(person.position)}
          </p>
        )}

        {person.degree && (
          <p className="text-sm italic text-slate-600 group-hover:text-slate-300 font-serif-classic mb-3 transition-colors">
            {L(person.degree)}
          </p>
        )}

        {person.yearsActive && (
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-400 mb-3 font-ui">
            {person.yearsActive}
          </p>
        )}

        {person.badges && person.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {person.badges.map((b) => (
              <StudentBadgePill key={b} badge={b} />
            ))}
          </div>
        )}
      </button>

      <div className="mt-4 pt-4 border-t border-amber-200/50 group-hover:border-amber-500/30 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 group-hover:text-amber-400 font-ui transition-colors">
          Profilni ko'rish
        </span>
        <Link
          to={path}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-950 text-amber-300 group-hover:gold-gradient group-hover:text-slate-950 transition-all duration-300 shadow-md"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
