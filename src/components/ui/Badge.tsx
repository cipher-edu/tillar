import React from 'react';
import type { StudentBadge } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const badgeStyles: Record<StudentBadge, string> = {
  innovator: 'bg-[#eff7ff] text-[#013d8c] border-[#b6c6d7]',
  gifted: 'bg-purple-100 text-purple-900 border-purple-300',
  scientific: 'bg-teal-100 text-teal-900 border-teal-300',
  creative: 'bg-rose-100 text-rose-900 border-rose-300',
  volunteer: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  international: 'bg-blue-100 text-blue-900 border-blue-300',
  winner: 'bg-yellow-200 text-yellow-950 border-yellow-400',
};

const badgeKeys: Record<StudentBadge, string> = {
  innovator: 'badge_innovator',
  gifted: 'badge_gifted',
  scientific: 'badge_scientific',
  creative: 'badge_creative',
  volunteer: 'badge_volunteer',
  international: 'badge_international',
  winner: 'badge_winner',
};

export const StudentBadgePill: React.FC<{ badge: StudentBadge }> = ({ badge }) => {
  const { t } = useLanguage();
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest font-ui ${badgeStyles[badge]}`}
    >
      {t(badgeKeys[badge])}
    </span>
  );
};

export const StatusBadge: React.FC<{ children: React.ReactNode; tone?: 'blue' | 'royal' | 'muted' }> = ({
  children,
  tone = 'blue',
}) => {
  const cls =
    tone === 'royal'
      ? 'royal-gradient text-white'
      : tone === 'muted'
        ? 'bg-slate-100 text-slate-600 border border-slate-200'
        : 'bg-[#eff7ff] text-[#013d8c] border border-[#b6c6d7]';
  return (
    <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest font-ui ${cls}`}>
      {children}
    </span>
  );
};
