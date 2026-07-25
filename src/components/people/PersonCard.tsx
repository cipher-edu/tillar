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

/**
 * Yorug' heritage karta — hover da to'q invert YO'Q.
 * Oltin soyalar, yumshoq amber fon, matn o'qiladigan qoladi.
 */
export const PersonCard: React.FC<PersonCardProps> = ({ person, onQuickView }) => {
  const { L } = useLanguage();
  const path = personPath(person);

  return (
    <div
      className={`group relative rounded-[2.5rem] p-7 border-2 border-amber-300/70 bg-[#fdfbf7] backdrop-blur-xl shadow-md hover:bg-white hover:border-amber-400 hover:shadow-[0_20px_48px_-16px_rgba(166,124,0,0.28)] hover:-translate-y-1.5 transition-all duration-400 text-center flex flex-col justify-between overflow-hidden ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      {/* Soft gold ambient glow on hover */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-amber-300/0 group-hover:bg-amber-300/25 blur-3xl pointer-events-none transition-all duration-500"
        aria-hidden
      />
      <div
        className="absolute -bottom-10 -left-6 w-36 h-36 rounded-full bg-amber-200/0 group-hover:bg-amber-200/30 blur-3xl pointer-events-none transition-all duration-500"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full text-center relative z-10"
      >
        {/* Photo — mihrab frame */}
        <div className="relative w-40 h-44 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-amber-400/40 rounded-t-[4.5rem] rounded-b-[1.75rem] group-hover:scale-[1.03] group-hover:border-amber-500/70 transition-all duration-500 shadow-sm" />

          <div className="absolute inset-2 overflow-hidden rounded-t-[4rem] rounded-b-[1.5rem] shadow-lg border-2 border-amber-300/70 bg-amber-50 group-hover:border-amber-400 group-hover:shadow-[0_12px_28px_-8px_rgba(166,124,0,0.35)] transition-all">
            <img
              src={person.photo}
              alt={L(person.name)}
              className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 contrast-[1.04] brightness-[1.02] ${
                person.isMemorial ? 'grayscale opacity-80' : 'filter-none'
              }`}
            />
          </div>
        </div>

        <h3 className="text-xl font-classic font-bold text-slate-950 uppercase mb-2 group-hover:text-amber-900 transition-colors duration-300 leading-snug">
          {L(person.name)}
        </h3>

        {person.position && (
          <p className="text-[11px] font-black uppercase tracking-widest text-amber-900/90 group-hover:text-amber-800 mb-2 font-ui transition-colors">
            {L(person.position)}
          </p>
        )}

        {person.degree && (
          <p className="text-sm italic text-slate-600 group-hover:text-slate-700 font-serif-classic mb-3 transition-colors">
            {L(person.degree)}
          </p>
        )}

        {person.yearsActive && (
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-amber-800/80 mb-3 font-ui transition-colors">
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

      <div className="mt-4 pt-4 border-t border-amber-200/80 group-hover:border-amber-300 flex items-center justify-between relative z-10 transition-colors">
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 font-ui transition-colors">
          Profilni ko'rish
        </span>
        <Link
          to={path}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 text-amber-950 border border-amber-300/70 group-hover:gold-gradient group-hover:border-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-sm hover:scale-105"
        >
          <ArrowRight className="w-4.5 h-4.5" />
        </Link>
      </div>
    </div>
  );
};
