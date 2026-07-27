import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, Menu, Search, Sparkles, X, ArrowRight, BookOpen, GraduationCap, Newspaper, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PATTERNS } from '@/components/ui/PatternBackground';
import { programs } from '@/data/programs';
import { news } from '@/data/news';
import type { Language } from '@/types';

const languages: { code: Language; label: string }[] = [
  { code: 'uz', label: 'Oʻzbek' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export const Header: React.FC = () => {
  const { t, L, language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(false);
  }, [location.pathname]);

  /* Mobil menyu ochiqda body scroll qulflansin */
  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, searchOpen]);

  const dropdowns = [
    {
      key: 'faculty',
      label: t('nav_faculty'),
      items: [
        { to: '/fakultet/tarix', label: t('nav_history') },
        { to: '/fakultet/rahbariyat', label: t('nav_leadership') },
        { to: '/fakultet/tuzilma', label: t('nav_structure') },
        { to: '/fakultet/faxriy-ustozlar', label: t('nav_honorary') },
      ],
    },
    {
      key: 'education',
      label: t('nav_education'),
      items: [
        { to: '/talim/yonalishlar', label: t('nav_programs') },
        { to: '/talim/oquv-rejalar', label: t('nav_curricula') },
      ],
    },
    {
      key: 'community',
      label: t('nav_community'),
      items: [
        { to: '/jamoa/professorlar', label: t('nav_professors') },
        { to: '/jamoa/tyutorlar', label: t('nav_tutors') },
      ],
    },
  ];

  const plainLinks = [
    { to: '/talabalar', label: t('nav_students') },
    { to: '/ilm-fan', label: t('nav_science') },
    { to: '/yangiliklar', label: t('nav_news') },
    { to: '/aloqa', label: t('nav_contact') },
  ];

  // Quick search results
  const filteredPrograms = searchQuery.trim()
    ? programs.filter((p) => L(p.name).toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredNews = searchQuery.trim()
    ? news.filter((n) => L(n.title).toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-pt ${scrolled ? 'py-2' : 'py-3 sm:py-5'}`}>
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 md:px-8">
          <div
            className={`relative transition-all duration-500 rounded-2xl sm:rounded-[2.5rem] ${
              scrolled || mobileOpen
                ? 'bg-[#001524]/97 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] border border-amber-500/30 py-1.5 sm:py-2 text-white'
                : 'bg-[#fdfaf3]/97 backdrop-blur-xl border border-amber-200/70 shadow-[0_12px_40px_-12px_rgba(166,124,0,0.18)] py-2 sm:py-3 text-slate-900'
            }`}
          >
            {/* Yorug' rejimda yengil oltin yuvish (faqat desktop yopiq menyu) */}
            {!scrolled && !mobileOpen && (
              <div
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none bg-gradient-to-b from-white via-[#fdfaf3]/90 to-amber-50/50"
                aria-hidden
              />
            )}
            {/* Mobil menyu ochiq: qattiq to'q fon (oppoq emas) */}
            {mobileOpen && (
              <div
                className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] overflow-hidden pointer-events-none bg-gradient-to-b from-[#001a2c] via-[#001524] to-[#0a1628]"
                aria-hidden
              />
            )}
            <div
              className={`absolute inset-0 pointer-events-none rounded-[2.5rem] overflow-hidden ${
                scrolled || mobileOpen ? 'opacity-[0.06]' : 'opacity-[0.06]'
              }`}
              style={{
                backgroundImage: PATTERNS.diamondSm,
                backgroundSize: '60px 60px',
              }}
            />

            <div className="relative px-3 sm:px-5 md:px-8 flex justify-between items-center gap-2 min-h-12 sm:min-h-14">
              {/* Brand Logo & Name */}
              <Link to="/" className="flex items-center gap-2 sm:gap-3.5 group z-10 min-w-0 shrink">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 gold-gradient blur-xl opacity-40 group-hover:opacity-80 transition-opacity rounded-full" />
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 gold-gradient rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200/60 transition-transform duration-300 group-hover:scale-105">
                    <span className="text-slate-950 font-classic font-black text-sm sm:text-base">TF</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <h1 className={`text-[11px] sm:text-sm md:text-base font-classic font-bold leading-tight tracking-tight transition-colors uppercase truncate max-w-[46vw] sm:max-w-none ${
                    scrolled || mobileOpen ? 'text-amber-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-800'
                  }`}>
                    {t('site_name')}
                  </h1>
                  <p className={`hidden sm:flex text-[9px] tracking-[0.25em] uppercase font-bold mt-0.5 items-center gap-1 font-ui truncate ${
                    scrolled || mobileOpen ? 'text-amber-400/90' : 'text-amber-800'
                  }`}>
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{t('site_uni')}</span>
                  </p>
                </div>
              </Link>

              {/* Central Navigation */}
              <nav className={`hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
                scrolled
                  ? 'bg-white/10 border border-white/10'
                  : 'bg-white border border-amber-200/80 shadow-sm'
              }`}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest font-ui transition-all relative rounded-full ${
                      isActive
                        ? scrolled ? 'text-amber-300 bg-amber-500/20' : 'text-amber-950 bg-amber-100'
                        : scrolled ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/80'
                    }`
                  }
                >
                  {t('nav_home')}
                </NavLink>

                {dropdowns.map((menu) => (
                  <div
                    key={menu.key}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(menu.key)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className={`px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest font-ui flex items-center gap-1.5 rounded-full transition-all ${
                        openMenu === menu.key
                          ? scrolled ? 'text-amber-300 bg-amber-500/20' : 'text-amber-950 bg-amber-100'
                          : scrolled ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/80'
                      }`}
                    >
                      {menu.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openMenu === menu.key ? 'rotate-180 text-amber-500' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openMenu === menu.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-3 min-w-[270px] z-[60]"
                        >
                          <div className="glass-card-dark rounded-3xl p-2.5 text-white ring-1 ring-amber-400/20">
                            {/* Gold top accent */}
                            <div className="h-0.5 w-full rounded-full gold-gradient mb-2 opacity-80" />
                            {menu.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center justify-between px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-amber-50 hover:bg-amber-500/25 hover:text-amber-200 transition-all font-ui group"
                              >
                                <span>{item.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-400" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {plainLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest font-ui transition-all relative rounded-full ${
                        isActive
                          ? scrolled ? 'text-amber-300 bg-amber-500/20' : 'text-amber-950 bg-amber-100'
                          : scrolled ? 'text-slate-200 hover:text-amber-300' : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 z-10">
                {/* Search Button */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`flex items-center justify-center gap-2 min-w-11 min-h-11 sm:min-w-0 sm:min-h-0 px-2.5 sm:px-3.5 py-2 rounded-full border text-[11px] font-extrabold font-ui transition-all ${
                    scrolled || mobileOpen
                      ? 'border-amber-500/30 bg-white/10 text-slate-200 hover:bg-amber-500/20 hover:border-amber-400'
                      : 'border-amber-200 bg-white text-slate-800 hover:bg-amber-50 hover:border-amber-400 shadow-sm'
                  }`}
                  title="Qidiruv (Ctrl+K)"
                  aria-label="Qidiruv"
                >
                  <Search className="w-4 h-4 text-amber-500" />
                  <span className="hidden md:inline uppercase tracking-wider text-[10px]">Qidiruv</span>
                  <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] bg-slate-900/20 dark:bg-white/20 rounded font-mono text-slate-400">
                    ⌘K
                  </kbd>
                </button>

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen((v) => !v)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 min-w-11 min-h-11 sm:min-w-0 sm:min-h-0 px-2.5 sm:px-3.5 py-2 rounded-full border text-[10px] font-extrabold uppercase tracking-widest font-ui transition-all ${
                      scrolled || mobileOpen
                        ? 'border-amber-500/30 bg-white/10 text-slate-200 hover:bg-amber-500/20'
                        : 'border-amber-200 bg-white text-slate-800 hover:bg-amber-50 hover:border-amber-400 shadow-sm'
                    }`}
                    aria-label="Til"
                  >
                    <Globe className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px]">{language.toUpperCase()}</span>
                  </button>
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        className="absolute right-0 mt-2 glass-card-dark rounded-2xl p-2 min-w-[150px] z-[60] text-white ring-1 ring-amber-400/20"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLangOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-widest font-ui transition-colors ${
                              language === lang.code
                                ? 'bg-amber-500/30 text-amber-200 font-black'
                                : 'text-amber-50/90 hover:bg-amber-500/20 hover:text-amber-100'
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Drawer Button */}
                <button
                  className={`xl:hidden flex items-center justify-center min-w-11 min-h-11 p-2.5 rounded-2xl border transition-colors ${
                    scrolled || mobileOpen
                      ? 'border-amber-500/30 bg-white/10 text-white'
                      : 'border-amber-200 bg-white text-slate-900 shadow-sm'
                  }`}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Drawer — doim to'q royal fon (oppoq emas) */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="xl:hidden relative z-10 overflow-hidden border-t border-amber-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#001524] to-[#0a1628] pointer-events-none" aria-hidden />
                  <div className="relative p-3 sm:p-5 space-y-1.5 max-h-[min(75vh,calc(100dvh-6rem))] overflow-y-auto overscroll-contain safe-pb">
                    <div className="h-0.5 w-full rounded-full gold-gradient mb-2 opacity-80" />
                    <Link
                      to="/"
                      className="block px-4 py-3.5 rounded-2xl font-ui text-xs font-black uppercase tracking-widest text-amber-200 bg-amber-500/15 border border-amber-400/25"
                    >
                      {t('nav_home')}
                    </Link>
                    {dropdowns.map((menu) => (
                      <div key={menu.key} className="pt-2">
                        <p className="px-4 py-1.5 font-ui text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/80">
                          {menu.label}
                        </p>
                        {menu.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-4 py-3 rounded-2xl font-ui text-xs font-extrabold uppercase tracking-widest text-amber-50/95 hover:bg-amber-500/20 hover:text-amber-200 transition-colors active:bg-amber-500/25"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <div className="pt-2 border-t border-amber-500/15 mt-1">
                      {plainLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-4 py-3.5 rounded-2xl font-ui text-xs font-extrabold uppercase tracking-widest text-amber-50/95 hover:bg-amber-500/20 hover:text-amber-200 transition-colors active:bg-amber-500/25"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto safe-pt safe-pb">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl text-white relative my-4"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4 mb-6">
                <Search className="w-6 h-6 text-amber-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Fakultet bo'yicha qidirish (yo'nalishlar, yangiliklar...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-lg font-ui text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="max-h-[50vh] overflow-y-auto space-y-4">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-8 text-slate-400 font-ui">
                    <p className="text-sm font-bold uppercase tracking-wider">Tezkor havolalar</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <button
                        onClick={() => { navigate('/talim/yonalishlar'); setSearchOpen(false); }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-bold font-ui text-slate-300 flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-amber-400" /> O'quv Yo'nalishlari
                      </button>
                      <button
                        onClick={() => { navigate('/yangiliklar'); setSearchOpen(false); }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-bold font-ui text-slate-300 flex items-center gap-2"
                      >
                        <Newspaper className="w-4 h-4 text-amber-400" /> Yangiliklar
                      </button>
                      <button
                        onClick={() => { navigate('/fakultet/rahbariyat'); setSearchOpen(false); }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-bold font-ui text-slate-300 flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4 text-amber-400" /> Rahbariyat
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {filteredPrograms.length > 0 && (
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2 font-ui flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Ta'lim Yo'nalishlari
                        </h4>
                        <div className="space-y-2">
                          {filteredPrograms.map((p) => (
                            <Link
                              key={p.id}
                              to={`/talim/yonalishlar/${p.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="block p-3 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/10 font-ui text-sm text-slate-200 font-bold"
                            >
                              {L(p.name)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredNews.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2 font-ui flex items-center gap-2">
                          <Newspaper className="w-4 h-4" /> Yangilik va voqealar
                        </h4>
                        <div className="space-y-2">
                          {filteredNews.map((n) => (
                            <Link
                              key={n.id}
                              to={`/yangiliklar/${n.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="block p-3 rounded-2xl bg-white/5 hover:bg-amber-500/20 border border-white/10 font-ui text-sm text-slate-200"
                            >
                              {L(n.title)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredPrograms.length === 0 && filteredNews.length === 0 && (
                      <div className="text-center py-8 text-slate-400 font-ui text-sm">
                        Natija topilmadi. Qidiruv so'rovini o'zgartiring.
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
