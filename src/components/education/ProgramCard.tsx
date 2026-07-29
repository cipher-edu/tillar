import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  GraduationCap,
  Languages,
  Library,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import type { Program } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { programPath } from '@/lib/links';

const ICONS = [BookOpen, Languages, Library, Globe2, GraduationCap, Sparkles] as const;

interface ProgramCardProps {
  program: Program;
  index?: number;
  variant?: 'compact' | 'full';
}

/**
 * 3D dastur kartasi — hover yorug' heritage (to'q invert yo'q).
 */
export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  index = 0,
  variant = 'full',
}) => {
  const { t, L } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 180, damping: 18 });
  const springY = useSpring(my, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const Icon = ICONS[index % ICONS.length];
  const num = String(index + 1).padStart(2, '0');

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <div className="perspective-card h-full" style={{ perspective: '1200px' }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full group"
      >
        <div
          className="absolute -inset-1 rounded-[2.75rem] gov-gradient opacity-0 group-hover:opacity-35 blur-md transition-opacity duration-500"
          style={{ transform: 'translateZ(-24px) scale(0.98)' }}
          aria-hidden
        />

        <Link
          to={programPath(program.slug)}
          className={`program-card-3d relative flex flex-col h-full border overflow-hidden transition-all duration-300 ${
            hovered
              ? 'bg-white border-[#013D8C] '
              : 'bg-white border-[#E1E1E1] '
          }`}
          style={{ transform: 'translateZ(0)' }}
        >
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-1 bg-[#002E69]"
            style={{ transform: 'translateZ(8px)' }}
          />

          <div
            className={`relative flex flex-col flex-1 ${variant === 'compact' ? 'p-6' : 'p-6 md:p-8'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <motion.div
                animate={hovered ? { y: -3 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="relative"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                    hovered
                      ? 'bg-[#002E69] text-white border-[#002E69]'
                      : 'bg-[#F0F6FE] text-[#002E69] border-[#013D8C]/30'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </motion.div>

              <div className="text-right">
                <span className="block text-2xl font-black text-[#002E69]/20 group-hover:text-[#002E69]/40 leading-none select-none transition-colors">
                  {num}
                </span>
                <span className="inline-flex mt-2 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#002E69] text-white ">
                  {program.level === 'master' ? t('level_master') : t('level_bachelor')}
                </span>
                {(program.studyForm === 'evening' || program.studyForm === 'distance') && (
                  <span className="inline-flex mt-1.5 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border border-[#013D8C]/25 bg-[#F0F6FE] text-[#002E69]">
                    {program.studyForm === 'evening' ? t('form_evening') : t('form_distance')}
                  </span>
                )}
              </div>
            </div>

            <h3
              className={`text-slate-900 group-hover:text-[#013D8C] font-black leading-snug mb-2 transition-colors ${
                variant === 'compact' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}
            >
              {L(program.name)}
            </h3>

            <p
              className={`text-slate-600 group-hover:text-slate-700 leading-relaxed font-medium flex-1 transition-colors ${
                variant === 'compact' ? 'text-xs line-clamp-3' : 'text-xs md:text-sm line-clamp-4'
              }`}
            >
              {L(program.description)}
            </p>

            {variant === 'full' && program.careers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {program.careers.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#002E69] border border-[#013D8C]/20 bg-[#F0F6FE]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#013D8C] shrink-0" />
                    {L(c)}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002E69] ">
                {t('home_read_more')}
              </span>
              <span
                className={`w-8 h-8 flex items-center justify-center transition-all duration-300 border ${
                  hovered
                    ? 'bg-[#002E69] text-white border-[#002E69]'
                    : 'bg-[#F0F6FE] text-[#002E69] border-[#013D8C]/30'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};
