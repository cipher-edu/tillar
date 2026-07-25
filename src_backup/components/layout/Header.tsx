import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, Menu, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PATTERNS } from '@/components/ui/PatternBackground';
import type { Language } from '@/types';

const languages: { code: Language; label: string }[] = [
  { code: 'uz', label: 'Oʻzbek' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] font-ui transition-all relative ${
      isActive ? 'text-amber-900' : 'text-slate-500 hover:text-amber-800'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        <div
          className={`relative transition-all duration-500 rounded-[2.5rem] ${
            scrolled
              ? 'bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(166,124,0,0.2)] border border-amber-200/40 py-2'
              : 'bg-white/45 backdrop-blur-md border border-white/40 py-3'
          }`}
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-[2.5rem] overflow-hidden"
            style={{
              backgroundImage: PATTERNS.diamondSm,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative px-5 md:px-8 flex justify-between items-center min-h-16">
            <Link to="/" className="flex items-center gap-3 group z-10">
              <div className="relative">
                <div className="absolute inset-0 gold-gradient blur-xl opacity-40 group-hover:opacity-70 transition-opacity rounded-full" />
                <div className="relative w-12 h-12 gold-gradient rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(166,124,0,0.3)] border-2 border-white/50">
                  <span className="text-slate-950 font-classic font-black text-lg">TF</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-base font-classic font-black leading-none text-slate-900 group-hover:text-amber-700 transition-colors uppercase tracking-tight">
                  {t('site_name')}
                </h1>
                <p className="text-[8px] tracking-[0.3em] uppercase text-amber-700 font-black mt-1 flex items-center gap-1 font-ui">
                  <Sparkles className="w-3 h-3" /> {t('site_uni')}
                </p>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center bg-slate-950/5 p-1.5 rounded-full border border-slate-950/5">
              <NavLink to="/" end className={linkClass}>
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
                    className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] font-ui flex items-center gap-1 ${
                      openMenu === menu.key ? 'text-amber-900' : 'text-slate-500 hover:text-amber-800'
                    }`}
                  >
                    {menu.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {openMenu === menu.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 pt-3 min-w-[240px]"
                      >
                        <div className="glass-card rounded-3xl border-amber-200 p-2 shadow-2xl">
                          {menu.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-amber-50 hover:text-amber-900 font-ui"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {plainLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 z-10">
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-amber-200/60 bg-white/50 text-[10px] font-black uppercase tracking-widest text-slate-700 font-ui"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-700" />
                  {language.toUpperCase()}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 mt-2 glass-card rounded-2xl border-amber-200 p-2 min-w-[140px] shadow-xl"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest font-ui ${
                            language === lang.code ? 'bg-amber-50 text-amber-900' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="xl:hidden p-2.5 rounded-2xl border border-amber-200 bg-white/60"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="xl:hidden overflow-hidden border-t border-amber-100/60"
              >
                <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                  <Link to="/" className="block px-4 py-3 rounded-2xl font-ui text-sm font-bold uppercase tracking-widest text-slate-700">
                    {t('nav_home')}
                  </Link>
                  {[...dropdowns.flatMap((d) => d.items), ...plainLinks].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-3 rounded-2xl font-ui text-sm font-bold uppercase tracking-widest text-slate-700 hover:bg-amber-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
