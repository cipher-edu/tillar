import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Phone, Clock, ExternalLink, Award, Sparkles, BookOpen, ShieldCheck, UserCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { ShamsaMedallion } from '@/components/ui/PatternBackground';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import type { Person } from '@/types';
import { personPath } from '@/lib/links';

type LeaderCategory = 'all' | 'dekanat' | 'kafedra';

export const LeadershipPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const [category, setCategory] = useState<LeaderCategory>('all');
  const [quick, setQuick] = useState<Person | null>(null);

  const leaders = getPeopleByRole('leader');
  const byOrder = (a: Person, b: Person) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99);

  // Dekan & Prorektorlar (University level)
  const uniLeaders = leaders.filter((p) => p.leadershipLevel === 'university').sort(byOrder);
  // Kafedra mudirlari (Faculty level)
  const facultyLeaders = leaders.filter((p) => p.leadershipLevel === 'faculty').sort(byOrder);

  // Dekan (bosh rahbar)
  const dean = uniLeaders[0] || leaders[0];

  const filteredLeaders =
    category === 'dekanat'
      ? uniLeaders
      : category === 'kafedra'
        ? facultyLeaders
        : [...uniLeaders, ...facultyLeaders];

  const detail = slug ? getPerson(slug) : null;

  if (detail && detail.roles.includes('leader')) {
    return (
      <PageShell title={L(detail.name)} subtitle={L(detail.position ?? { uz: '', ru: '', en: '' })}>
        <div className="mb-6">
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-800 hover:text-amber-600 font-ui transition-colors"
          >
            ← {t('back')}
          </Link>
        </div>
        <div className="glass-card rounded-[3rem] border-2 border-amber-300/80 p-6 md:p-12 shadow-2xl">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_leadership')} topic="leadership">
      <div className="space-y-16 max-w-7xl mx-auto">
        
        {/* ========== WARM DEAN SPOTLIGHT HERO CARD ========== */}
        {dean && (
          <div className="relative rounded-[3.5rem] border-2 border-amber-400/50 bg-slate-950 text-white overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 group hover:border-amber-300 transition-all duration-500">
            {/* Ambient Lighting & Filigree Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-center relative z-10">
              {/* Photo Container with Rotating Gold Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 border-2 border-amber-400/50 rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-700" />
                <div className="absolute inset-0 border-2 border-amber-300/30 rounded-[3rem] -rotate-6 group-hover:-rotate-12 transition-transform duration-700" />
                <div className="absolute inset-2 overflow-hidden rounded-[2.5rem] shadow-2xl border-2 border-amber-300/60 bg-slate-900">
                  <img
                    src={dean.photo}
                    alt={L(dean.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 z-20">
                  <ShamsaMedallion className="w-14 h-14 shadow-2xl rounded-full" />
                </div>
              </div>

              {/* Dean Details */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black tracking-[0.3em] uppercase font-ui">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  FAKULTET DEKANI
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-classic font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">
                    {L(dean.name)}
                  </h2>
                  <p className="text-xl sm:text-2xl italic font-serif-classic text-amber-300 font-semibold">
                    {L(dean.position)}
                  </p>
                  {dean.degree && (
                    <p className="text-sm italic text-slate-300 mt-1 font-serif-classic">
                      {L(dean.degree)}
                    </p>
                  )}
                </div>

                {dean.bio && (
                  <p className="text-base sm:text-lg italic font-serif-classic text-slate-200 leading-relaxed max-w-2xl">
                    <span className="text-amber-400 mr-2 not-italic">“</span>
                    {L(dean.bio)}
                    <span className="text-amber-400 ml-2 not-italic">”</span>
                  </p>
                )}

                {/* Quick Contacts */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                  {dean.email && (
                    <a
                      href={`mailto:${dean.email}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-amber-400/30 text-amber-200 text-xs font-serif-classic hover:bg-amber-400 hover:text-slate-950 transition-all font-semibold"
                    >
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{dean.email}</span>
                    </a>
                  )}
                  {dean.officeHours && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-amber-400/30 text-amber-200 text-xs font-serif-classic font-semibold">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{L(dean.officeHours)}</span>
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Link
                    to={personPath(dean)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl gold-gradient text-slate-950 font-black text-[11px] uppercase tracking-[0.25em] font-ui shadow-xl hover:scale-105 transition-all"
                  >
                    To'liq Murojaat va Profil <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setQuick(dean)}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-amber-400/40 text-amber-300 font-black text-[11px] uppercase tracking-[0.2em] font-ui hover:bg-white/10 transition-all"
                  >
                    <UserCheck className="w-4 h-4" /> Tezkor Ma'lumot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== CATEGORY FILTER TABS ========== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-amber-200/80">
          <div className="flex items-center gap-3">
            <ShamsaMedallion className="w-7 h-7" />
            <h3 className="text-xl sm:text-2xl font-classic font-black text-slate-950 uppercase tracking-widest">
              RAHBARIYAT XODIMLARI
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-white/90 p-2 rounded-2xl border-2 border-amber-300/60 shadow-md">
            <button
              onClick={() => setCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-ui transition-all ${
                category === 'all'
                  ? 'gold-gradient text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              Barchasi ({leaders.length})
            </button>
            <button
              onClick={() => setCategory('dekanat')}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-ui transition-all ${
                category === 'dekanat'
                  ? 'gold-gradient text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              Fakultet Dekanati ({uniLeaders.length})
            </button>
            <button
              onClick={() => setCategory('kafedra')}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-ui transition-all ${
                category === 'kafedra'
                  ? 'gold-gradient text-slate-950 shadow-md'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              Kafedra Mudirlari ({facultyLeaders.length})
            </button>
          </div>
        </div>

        {/* ========== LEADERS GRID ========== */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredLeaders.map((person) => (
              <motion.div
                key={person.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PersonCard person={person} onQuickView={setQuick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ========== QUICK PROFILE MODAL ========== */}
      <Modal open={!!quick} onClose={() => setQuick(null)} maxWidthClass="max-w-5xl">
        {quick && (
          <div className="bg-[#fdfaf3] text-slate-950 rounded-[3rem] overflow-hidden">
            <div className="gold-gradient h-3" />
            <PersonProfile person={quick} compact />
            <div className="px-10 pb-10 flex justify-end">
              <Link
                to={personPath(quick)}
                className="inline-flex items-center gap-3 px-8 py-4 gold-gradient text-slate-950 rounded-2xl text-[11px] font-black uppercase tracking-widest font-ui shadow-xl hover:scale-105 transition-all"
                onClick={() => setQuick(null)}
              >
                To'liq Profilni Ko'rish <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </PageShell>
  );
};
