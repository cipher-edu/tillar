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
 * Barcha kartochkalar bir xil brand palitrasi:
 * heritage #fdfaf3, gold, royal, slate-950, amber.
 * Rang-barang accent yo'q — dizayn bir butun.
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
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

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
        {/* 3D soft gold depth */}
        <div
          className="absolute -inset-1 rounded-[2.75rem] gold-gradient opacity-0 group-hover:opacity-35 blur-[2px] transition-opacity duration-500"
          style={{ transform: 'translateZ(-24px) scale(0.98)' }}
          aria-hidden
        />
        <div
          className="absolute inset-2 rounded-[2.4rem] bg-amber-900/10 blur-xl opacity-25 group-hover:opacity-50 transition-opacity"
          style={{ transform: 'translateZ(-40px) translateY(18px)' }}
          aria-hidden
        />

        <Link
          to={programPath(program.slug)}
          className={`program-card-3d relative flex flex-col h-full rounded-[2.5rem] border border-amber-200/70 bg-[#fffdfa]/95 backdrop-blur-xl overflow-hidden transition-shadow duration-500 ${
            hovered
              ? 'shadow-2xl shadow-[0_24px_50px_-14px_rgba(166,124,0,0.32)]'
              : 'shadow-lg shadow-amber-900/5'
          }`}
          style={{ transform: 'translateZ(0)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'linear-gradient(145deg, rgba(253,250,243,0.95) 0%, transparent 45%, transparent 100%)',
              transform: 'translateZ(20px)',
            }}
          />
          {/* Yon chiziq — faqat gold */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-1.5 gold-gradient opacity-90"
            style={{ transform: 'translateZ(8px)' }}
          />

          <div
            className={`relative flex flex-col flex-1 ${variant === 'compact' ? 'p-7 md:p-8' : 'p-8 md:p-10'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <motion.div
                animate={hovered ? { y: -6, rotateY: 12, rotateX: -6 } : { y: 0, rotateY: 0, rotateX: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 rounded-2xl gold-gradient blur-md opacity-45"
                  style={{ transform: 'translateZ(-12px) translateY(8px)' }}
                />
                {/* Ikon — slate + amber (tizim) */}
                <div
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-xl ring-2 ring-white/50 border border-amber-500/20"
                  style={{ transform: 'translateZ(16px)' }}
                >
                  <Icon className="w-7 h-7 drop-shadow-sm" />
                </div>
              </motion.div>

              <div className="text-right">
                <span className="block font-classic text-3xl md:text-4xl font-black text-amber-900/10 leading-none select-none">
                  {num}
                </span>
                <span className="inline-flex mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] font-ui gold-gradient text-slate-950 shadow-md border border-amber-300/40">
                  {program.level === 'master' ? t('level_master') : t('level_bachelor')}
                </span>
                {(program.studyForm === 'evening' || program.studyForm === 'distance') && (
                  <span className="inline-flex mt-1.5 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest font-ui border border-amber-200 bg-white/90 text-amber-900">
                    {program.studyForm === 'evening' ? t('form_evening') : t('form_distance')}
                  </span>
                )}
              </div>
            </div>

            <h3
              className={`font-classic text-slate-950 leading-snug mb-3 group-hover:text-amber-900 transition-colors ${
                variant === 'compact' ? 'text-xl md:text-2xl' : 'text-2xl md:text-[1.65rem]'
              }`}
            >
              {L(program.name)}
            </h3>

            <p
              className={`italic font-serif-classic text-slate-600 leading-relaxed flex-1 ${
                variant === 'compact' ? 'text-base line-clamp-3' : 'text-lg line-clamp-4'
              }`}
            >
              {L(program.description)}
            </p>

            {variant === 'full' && program.careers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {program.careers.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-ui text-amber-950/80 border border-amber-200/90 bg-amber-50/90"
                  >
                    {L(c)}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-amber-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-800 font-ui">
                {t('home_read_more')}
              </span>
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border border-amber-200/40 ${
                  hovered ? 'gold-gradient text-slate-950' : 'bg-slate-950 text-amber-300'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="h-1.5 w-full gold-gradient opacity-85" style={{ transform: 'translateZ(4px)' }} />
        </Link>
      </motion.div>
    </div>
  );
};
