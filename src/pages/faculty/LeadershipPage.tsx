import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Clock,
  ExternalLink,
  Award,
  Sparkles,
  BookOpen,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  ChevronRight,
  Search,
  Users,
  GraduationCap,
} from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonCard } from '@/components/people/PersonCard';
import { PersonProfile } from '@/components/people/PersonProfile';
import { Modal } from '@/components/ui/Modal';
import { ShamsaMedallion, BehzodStarMedallion, HERITAGE_MANUSCRIPT_URL, PATTERNS } from '@/components/ui/PatternBackground';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import type { Person } from '@/types';
import { personPath } from '@/lib/links';

type LeaderCategory = 'all' | 'dekanat' | 'kafedra';

export const LeadershipPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const [category, setCategory] = useState<LeaderCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quick, setQuick] = useState<Person | null>(null);

  const leaders = getPeopleByRole('leader');
  const byOrder = (a: Person, b: Person) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99);

  // Dekan & Prorektorlar (University/Faculty level)
  const uniLeaders = useMemo(
    () => leaders.filter((p) => p.leadershipLevel === 'university').sort(byOrder),
    [leaders],
  );
  // Kafedra mudirlari (Faculty level)
  const facultyLeaders = useMemo(
    () => leaders.filter((p) => p.leadershipLevel === 'faculty').sort(byOrder),
    [leaders],
  );

  // Dekan (Bosh rahbar)
  const dean = uniLeaders[0] || leaders[0];

  const filteredLeaders = useMemo(() => {
    let list =
      category === 'dekanat'
        ? uniLeaders
        : category === 'kafedra'
          ? facultyLeaders
          : [...uniLeaders, ...facultyLeaders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          L(p.name).toLowerCase().includes(q) ||
          (p.position && L(p.position).toLowerCase().includes(q)) ||
          (p.degree && L(p.degree).toLowerCase().includes(q)),
      );
    }
    return list;
  }, [category, facultyLeaders, L, searchQuery, uniLeaders]);

  const detail = slug ? getPerson(slug) : null;

  if (detail && detail.roles.includes('leader')) {
    return (
      <PageShell title={L(detail.name)} subtitle={L(detail.position ?? { uz: '', ru: '', en: '' })}>
        <div className="mb-6 max-w-6xl mx-auto">
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-800 hover:text-amber-600 font-ui transition-colors bg-white/80 px-5 py-2.5 rounded-full border border-amber-300 shadow-sm"
          >
            ← {t('back')}
          </Link>
        </div>
        <div className="glass-card rounded-[3.5rem] border-2 border-amber-300/80 p-6 md:p-12 shadow-2xl max-w-6xl mx-auto">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_leadership')} topic="leadership">
      <div className="space-y-16 max-w-7xl mx-auto">
        
        {/* ========== WARM GRAND DEAN SPOTLIGHT HERO CARD ========== */}
        {dean && (
          <div className="relative rounded-[3.5rem] border-2 border-amber-400/50 bg-slate-950 text-white overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 group hover:border-amber-300 transition-all duration-500">
            {/* Background Manuscript & Girih overlay */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none animated-pattern"
              style={{ backgroundImage: PATTERNS.girih, backgroundSize: '160px 160px' }}
            />
            <div
              className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Ambient Lighting Spheres */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 blur-[140px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-center relative z-10">
              {/* Photo Container — Oriental Mihrab Arch (Peshtoq) Frame */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 border-2 border-amber-400/40 rounded-t-[5rem] rounded-b-[2.2rem] group-hover:scale-105 group-hover:border-amber-300 transition-all duration-500 shadow-xl" />
                <div className="absolute inset-3 overflow-hidden rounded-t-[4.5rem] rounded-b-[1.75rem] shadow-2xl border-2 border-amber-300/80 bg-slate-900">
                  <img
                    src={dean.photo}
                    alt={L(dean.name)}
                    className="w-full h-full object-cover object-top group-hover:scale-108 contrast-[1.05] brightness-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Dean Details */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black tracking-[0.3em] uppercase font-ui shadow-lg">
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
                    <p className="text-sm italic text-slate-300 mt-1.5 font-serif-classic flex items-center justify-center lg:justify-start gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                      {L(dean.degree)}
                    </p>
                  )}
                </div>

                {dean.bio && (
                  <p className="text-base sm:text-lg italic font-serif-classic text-slate-200 leading-relaxed max-w-2xl font-normal">
                    <span className="text-amber-400 mr-2 text-2xl not-italic font-serif">“</span>
                    {L(dean.bio)}
                    <span className="text-amber-400 ml-2 text-2xl not-italic font-serif">”</span>
                  </p>
                )}

                {/* Quick Contacts */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                  {dean.email && (
                    <a
                      href={`mailto:${dean.email}`}
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/30 text-amber-200 text-xs font-serif-classic hover:bg-amber-400 hover:text-slate-950 transition-all font-semibold shadow-md"
                    >
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{dean.email}</span>
                    </a>
                  )}
                  {dean.officeHours && (
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-amber-400/30 text-amber-200 text-xs font-serif-classic font-semibold shadow-md">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{L(dean.officeHours)}</span>
                    </div>
                  )}
                </div>

                {/* Action CTAs */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Link
                    to={personPath(dean)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl gold-gradient text-slate-950 font-black text-[11px] uppercase tracking-[0.25em] font-ui shadow-xl hover:scale-105 transition-all"
                  >
                    To'liq Murojaat va Profil <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setQuick(dean)}
                    className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl border border-amber-400/40 text-amber-300 font-black text-[11px] uppercase tracking-[0.2em] font-ui hover:bg-white/10 transition-all shadow-md"
                  >
                    <UserCheck className="w-4 h-4" /> Tezkor Ma'lumot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== CONTROLS BAR: SEARCH & CATEGORY TABS ========== */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pt-6 border-t-2 border-amber-200/80">
          
          {/* Header Title */}
          <div className="flex items-center gap-3 shrink-0">
            <ShamsaMedallion className="w-8 h-8" />
            <div>
              <h3 className="text-xl sm:text-2xl font-classic font-black text-slate-950 uppercase tracking-widest leading-none">
                RAHBARIYAT XODIMLARI
              </h3>
              <p className="text-xs font-serif-classic italic text-amber-800 font-semibold mt-1">
                Fakultet dekanati va kafedra mudirlari ro'yxati
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 max-w-2xl justify-end">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ism yoki lavozim bo'yicha qidiruv…"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-amber-300/80 bg-white/90 focus:bg-white focus:border-amber-500 outline-none text-sm font-serif-classic text-slate-950 font-semibold shadow-sm transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Category Tabs */}
            <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-2xl border-2 border-amber-300/80 shadow-sm shrink-0">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-ui transition-all ${
                  category === 'all'
                    ? 'gold-gradient text-slate-950 shadow-md font-bold'
                    : 'text-slate-600 hover:text-amber-900'
                }`}
              >
                Barchasi ({leaders.length})
              </button>
              <button
                onClick={() => setCategory('dekanat')}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-ui transition-all ${
                  category === 'dekanat'
                    ? 'gold-gradient text-slate-950 shadow-md font-bold'
                    : 'text-slate-600 hover:text-amber-900'
                }`}
              >
                Dekanat ({uniLeaders.length})
              </button>
              <button
                onClick={() => setCategory('kafedra')}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-ui transition-all ${
                  category === 'kafedra'
                    ? 'gold-gradient text-slate-950 shadow-md font-bold'
                    : 'text-slate-600 hover:text-amber-900'
                }`}
              >
                Kafedralar ({facultyLeaders.length})
              </button>
            </div>
          </div>
        </div>

        {/* ========== LEADERS GRID WITH ANIMATION ========== */}
        {filteredLeaders.length > 0 ? (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLeaders.map((person) => (
                <motion.div
                  key={person.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <PersonCard person={person} onQuickView={setQuick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass-card p-12 rounded-[3rem] text-center border-2 border-amber-300/80 my-8">
            <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h4 className="text-2xl font-classic font-bold text-slate-950 mb-2 uppercase">
              Mos keluvchi rahbar topilmadi
            </h4>
            <p className="text-slate-600 font-serif-classic italic max-w-md mx-auto mb-6">
              Kiritilgan so'rov bo'yicha ma'lumot mavjud emas. Qidiruv so'rovini o'zgartirib ko'ring.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategory('all');
              }}
              className="px-6 py-3 gold-gradient text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl font-ui shadow-md"
            >
              Filtrni Tozalash
            </button>
          </div>
        )}

      </div>

      {/* ========== QUICK PROFILE MODAL ========== */}
      <Modal open={!!quick} onClose={() => setQuick(null)} maxWidthClass="max-w-5xl">
        {quick && (
          <div className="bg-[#fdfaf3] text-slate-950 rounded-[3.5rem] overflow-hidden shadow-2xl border-2 border-amber-400/60">
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
