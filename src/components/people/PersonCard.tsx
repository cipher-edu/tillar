import React from 'react';
import { Link } from 'react-router-dom';
import type { Person } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { personPath } from '@/lib/links';
import { StudentBadgePill } from '@/components/ui/Badge';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PersonCardProps {
  person: Person;
  onQuickView?: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onQuickView }) => {
  const { L } = useLanguage();
  const path = personPath(person);

  return (
    <div
      className={`group relative rounded-[2.5rem] p-7 border-2 border-amber-300/80 bg-[#fdfbf7] backdrop-blur-xl shadow-lg hover:bg-slate-950 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 text-center flex flex-col justify-between overflow-hidden ${
        person.isMemorial ? 'opacity-90' : ''
      }`}
    >
      {/* Warm Ambient Radial Glow on Card Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

      <button
        type="button"
        onClick={() => onQuickView?.(person)}
        className="w-full text-center relative z-10"
      >
        {/* Photo Container with Warm Gold Filigree Border */}
        <div className="relative w-36 h-36 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-amber-400/50 rounded-[2.2rem] rotate-45 group-hover:rotate-90 group-hover:border-amber-300 transition-transform duration-700 shadow-md" />
          <div className="absolute inset-3 overflow-hidden rounded-[1.75rem] shadow-xl border-2 border-amber-300/60 bg-amber-50 group-hover:border-amber-400 transition-all">
            <img
              src={person.photo}
              alt={L(person.name)}
              className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-108 contrast-[1.05] brightness-[1.02] ${
                person.isMemorial ? 'grayscale opacity-80' : 'filter-none'
              }`}
            />
          </div>
        </div>

        {/* Name Header — Warm Dark Sapphire standard, Vibrant Gold on Hover */}
        <h3 className="text-xl font-classic font-bold text-slate-950 uppercase mb-2 group-hover:text-amber-300 transition-colors duration-300 drop-shadow-sm leading-snug">
          {L(person.name)}
        </h3>

        {person.position && (
          <p className="text-[11px] font-black uppercase tracking-widest text-amber-900 group-hover:text-amber-400 font-bold mb-2 font-ui transition-colors">
            {L(person.position)}
          </p>
        )}

        {person.degree && (
          <p className="text-sm italic text-slate-700 group-hover:text-slate-300 font-serif-classic mb-3 transition-colors font-semibold">
            {L(person.degree)}
          </p>
        )}

        {person.yearsActive && (
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-400 mb-3 font-ui">
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

      {/* Bottom Profile Action Bar */}
      <div className="mt-4 pt-4 border-t border-amber-200/80 group-hover:border-amber-500/30 flex items-center justify-between relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 group-hover:text-amber-400 font-ui transition-colors font-bold">
          Profilni ko'rish
        </span>
        <Link
          to={path}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950 text-amber-300 group-hover:gold-gradient group-hover:text-slate-950 transition-all duration-300 shadow-md hover:scale-110"
        >
          <ArrowRight className="w-4.5 h-4.5" />
        </Link>
      </div>
    </div>
  );
};
