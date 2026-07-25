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
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

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
        {/* 3D Gold Glow */}
        <div
          className="absolute -inset-1 rounded-[2.75rem] gold-gradient opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"
          style={{ transform: 'translateZ(-24px) scale(0.98)' }}
          aria-hidden
        />

        <Link
          to={programPath(program.slug)}
          className={`program-card-3d relative flex flex-col h-full rounded-[2.5rem] border-2 border-amber-300/80 bg-[#fdfbf7] backdrop-blur-xl overflow-hidden transition-all duration-500 ${
            hovered
              ? 'bg-slate-950 text-white border-amber-400 shadow-2xl'
              : 'shadow-lg'
          }`}
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Side Gold Line Accent */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-2 gold-gradient opacity-90"
            style={{ transform: 'translateZ(8px)' }}
          />

          <div
            className={`relative flex flex-col flex-1 ${variant === 'compact' ? 'p-7 md:p-8' : 'p-8 md:p-10'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Header: Icon + Specialty Code & Level Badge */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <motion.div
                animate={hovered ? { y: -4, rotateY: 10 } : { y: 0, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="relative"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-xl border-2 border-amber-400/60 group-hover:gold-gradient group-hover:text-slate-950 transition-all duration-300"
                >
                  <Icon className="w-7 h-7 drop-shadow-sm" />
                </div>
              </motion.div>

              <div className="text-right">
                <span className="block font-classic text-3xl md:text-4xl font-black text-amber-900/20 group-hover:text-amber-400/20 leading-none select-none">
                  {num}
                </span>
                <span className="inline-flex mt-2 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] font-ui gold-gradient text-slate-950 shadow-md border border-amber-300/40">
                  {program.level === 'master' ? t('level_master') : t('level_bachelor')}
                </span>
                {(program.studyForm === 'evening' || program.studyForm === 'distance') && (
                  <span className="inline-flex mt-1.5 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest font-ui border border-amber-400/40 bg-amber-500/20 text-amber-300">
                    {program.studyForm === 'evening' ? t('form_evening') : t('form_distance')}
                  </span>
                )}
              </div>
            </div>

            {/* Program Name */}
            <h3
              className={`font-classic text-slate-950 group-hover:text-amber-300 font-bold leading-snug mb-3 transition-colors ${
                variant === 'compact' ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.65rem]'
              }`}
            >
              {L(program.name)}
            </h3>

            {/* Description */}
            <p
              className={`italic font-serif-classic text-slate-700 group-hover:text-slate-200 leading-relaxed flex-1 transition-colors ${
                variant === 'compact' ? 'text-base line-clamp-3' : 'text-lg line-clamp-4'
              }`}
            >
              {L(program.description)}
            </p>

            {/* Careers Preview Chips */}
            {variant === 'full' && program.careers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {program.careers.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-ui text-amber-950 group-hover:text-amber-200 border border-amber-300/60 bg-amber-100/80 group-hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0" />
                    {L(c)}
                  </span>
                ))}
              </div>
            )}

            {/* Card Footer CTA */}
            <div className="mt-6 pt-5 border-t border-amber-200/80 group-hover:border-amber-500/30 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-900 group-hover:text-amber-400 font-ui transition-colors">
                {t('home_read_more')}
              </span>
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border border-amber-300/50 ${
                  hovered ? 'gold-gradient text-slate-950' : 'bg-slate-950 text-amber-300'
                }`}
              >
                <ArrowUpRight className="w-4.5 h-4.5" />
              </span>
            </div>
          </div>

          <div className="h-1.5 w-full gold-gradient opacity-90" />
        </Link>
      </motion.div>
    </div>
  );
};
