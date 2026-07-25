import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { personPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';

interface PersonCardProps {
  person: Person;
  onQuickView?: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onQuickView }) => {
  const { L } = useLanguage();
  const path = personPath(person);

  return (
    <div
      className={`group glass-card rounded-[2.5rem] p-6 border-amber-200/60 hover:shadow-2xl transition-all duration-500 text-center ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full"
      >
        <div className="relative w-36 h-36 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-amber-500/20 rounded-[2rem] rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
          <div className="absolute inset-3 overflow-hidden rounded-[1.75rem] shadow-xl border-2 border-white/40">
            <img
              src={person.photo}
              alt={L(person.name)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                person.isMemorial ? 'grayscale' : 'grayscale group-hover:grayscale-0'
              }`}
            />
          </div>
        </div>
        <h3 className="text-xl font-classic font-black text-slate-900 uppercase mb-2 group-hover:text-amber-800 transition-colors">
          {L(person.name)}
        </h3>
        {person.position && (
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700/80 mb-2 font-ui">
            {L(person.position)}
          </p>
        )}
        {person.degree && (
          <p className="text-sm italic text-slate-500 font-serif-classic mb-3">{L(person.degree)}</p>
        )}
        {person.yearsActive && (
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 font-ui">
            {person.yearsActive}
          </p>
        )}
        {person.badges && person.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {person.badges.map((b) => (
              <StudentBadgePill key={b} badge={b} />
            ))}
          </div>
        )}
      </button>
      <Link
        to={path}
        className="inline-flex mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-amber-800 hover:text-amber-600 font-ui"
      >
        →
      </Link>
    </div>
  );
};
