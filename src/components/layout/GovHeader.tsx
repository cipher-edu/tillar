import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ChevronDown,
  Menu,
  PhoneCall,
  Search,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { programs } from '@/data/programs';
import { news } from '@/data/news';

export const GovHeader: React.FC = () => {
  const { t, L, language, setLanguage } = useLanguage();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sitemapOpen, setSitemapOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    setSitemapOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSitemapOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navDropdowns = [
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

  const filteredPrograms = searchQuery.trim()
    ? programs.filter((p) => L(p.name).toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredNews = searchQuery.trim()
    ? news.filter((n) => L(n.title).toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 text-sm font-semibold transition-colors inline-block border-r border-[#E1E1E1] ${
      isActive ? 'bg-[#013D8C] text-white' : 'text-[#000000] hover:bg-[#013D8C] hover:text-white'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#E1E1E1] font-sans">
        <div className="gov-shell py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
              <img
                src="/logo-navdu.png"
                alt="Navoiy davlat universiteti logosu"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-[3px] h-11 uz-flag-line shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#707070] line-clamp-1">
                O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-[#013D8C] group-hover:text-[#002E69] transition-colors leading-tight line-clamp-2 font-sans">
                Navoiy davlat universiteti — Tillar fakulteti
              </h1>
              <span className="text-[10px] font-medium text-[#707070] hidden sm:block">
                Rasmiy veb-portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-3 bg-[#F0F0F0] border border-[#E1E1E1] px-3.5 py-1.5 rounded-none">
              <div className="w-8 h-8 rounded-none bg-[#013D8C] text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-medium text-[#707070]">
                  Ishonch telefoni
                </span>
                <a
                  href="tel:1199"
                  className="text-sm font-bold text-[#013D8C] hover:underline leading-none font-sans"
                >
                  1199 / (79) 221-88-00
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-none bg-[#F0F0F0] hover:bg-[#013D8C] hover:text-white text-[#000000] transition-colors border border-[#E1E1E1]"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSitemapOpen((prev) => !prev)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-[#013D8C] text-white rounded-none text-xs font-semibold hover:bg-[#002E69] transition-colors border border-[#013D8C]"
            >
              <Menu className="w-4 h-4" />
              <span>Sayt xaritasi</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-none bg-[#013D8C] text-white"
              aria-label="Menyu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="bg-[#F0F0F0] border-t border-[#E1E1E1] hidden md:block">
          <div className="gov-shell flex items-center">
            <NavLink to="/" end className="px-4 py-3 text-sm font-semibold text-[#000000] hover:bg-[#013D8C] hover:text-white transition-colors border-r border-[#E1E1E1]">
              {t('nav_home')}
            </NavLink>

            {navDropdowns.map((menu) => (
              <div
                key={menu.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-4 py-3 text-sm font-semibold flex items-center gap-1.5 transition-colors border-r border-[#E1E1E1] ${
                    activeDropdown === menu.key
                      ? 'bg-[#013D8C] text-white'
                      : 'text-[#000000] hover:bg-[#013D8C] hover:text-white'
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeDropdown === menu.key && (
                  <div className="absolute left-0 top-full w-64 bg-[#013D8C] text-white py-1 z-50 border-t-2 border-[#013D8C] rounded-none ">
                    {menu.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="block px-4 py-2.5 text-xs font-medium text-blue-50 hover:bg-[#002E69] hover:text-white transition-colors border-b border-blue-800/40 last:border-0"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {plainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      {/* Official gov.uz/oz/edu Style Off-Canvas Side Drawer Navigation */}
      <AnimatePresence>
          {(mobileOpen || sitemapOpen) && (
            <div className="fixed inset-0 z-50 flex justify-end font-sans">
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setMobileOpen(false);
                  setSitemapOpen(false);
                }}
                className="fixed inset-0 bg-black/50 cursor-pointer"
              />

              {/* Off-canvas Side Drawer Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-full sm:w-[440px] h-full bg-[#013D8C] text-white z-10 flex flex-col justify-between overflow-y-auto border-l border-white/15"
              >
                {/* Top Drawer Header with State Emblem & Close Button */}
                <div className="p-5 border-b border-white/15 bg-[#013D8C] relative sticky top-0 z-20">
                  <div className="absolute top-0 inset-x-0 h-1 uz-flag-line" />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center shrink-0">
                        <img
                          src="/logo-navdu.png"
                          alt="Navoiy davlat universiteti logosu"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-blue-100 block">
                          O‘zbekiston Respublikasi
                        </span>
                        <h2 className="text-xs font-bold uppercase text-white">
                          NavDU — Tillar fakulteti
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setSitemapOpen(false);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                      aria-label="Menyuni yopish"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Drawer Quick Search Bar */}
                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Portal bo‘yicha qidiruv..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchOpen(true)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-2.5 pl-10 text-xs text-white placeholder-blue-200 focus:outline-none focus:bg-white/15 focus:border-white font-medium"
                    />
                    <Search className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Drawer Body: gov.uz/oz/edu Structured Categories */}
                <div className="p-6 space-y-6 flex-1">
                  {/* Section 1: Home */}
                  <NavLink
                    to="/"
                    end
                    onClick={() => {
                      setMobileOpen(false);
                      setSitemapOpen(false);
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 font-semibold text-sm transition-colors border ${
                        isActive
                          ? 'bg-white text-[#013D8C] border-white'
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`
                    }
                  >
                    <span>{t('nav_home')}</span>
                    <Building2 className="w-4 h-4" />
                  </NavLink>

                  {/* Section 2: Dropdown Categories */}
                  {navDropdowns.map((menu) => (
                    <div key={menu.key} className="space-y-2">
                      <div className="flex items-center gap-2 pb-1 border-b border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-100">
                          {menu.label}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-1 pl-3">
                        {menu.items.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => {
                              setMobileOpen(false);
                              setSitemapOpen(false);
                            }}
                            className="py-2 px-3 text-sm font-medium text-blue-50 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between group"
                          >
                            <span>· {sub.label}</span>
                            <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Section 3: Plain Navigation Links */}
                  <div className="space-y-2 pt-2 border-t border-white/20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 block mb-2">
                      Portal Bo‘limlari
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {plainLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => {
                            setMobileOpen(false);
                            setSitemapOpen(false);
                          }}
                          className="p-2.5 bg-white/5 hover:bg-white/15 text-sm font-semibold text-blue-50 hover:text-white transition-colors border border-white/10 text-center"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer: Language Switcher, Hotline & Info */}
                <div className="p-5 bg-[#013D8C] border-t border-white/15 space-y-4 sticky bottom-0 z-20">
                  {/* Language Switcher Buttons inside Drawer */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100 block">
                      Portal Tili / Язык портала
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
                        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                        { code: 'en', label: 'English', flag: '🇬🇧' },
                      ].map((langItem) => (
                        <button
                          key={langItem.code}
                          type="button"
                          onClick={() => {
                            setLanguage(langItem.code as any);
                          }}
                          className={`py-1.5 px-2 text-xs font-semibold flex items-center justify-center gap-1 transition-colors border ${
                            language === langItem.code
                              ? 'bg-white text-[#013D8C] border-white'
                              : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                          }`}
                        >
                          <span>{langItem.flag}</span>
                          <span>{langItem.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-white text-[#013D8C] flex items-center justify-center font-bold">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-blue-200 block">
                          Ishonch telefoni
                        </span>
                        <a href="tel:1199" className="text-xs font-black text-white hover:underline">
                          1199 / (79) 221-88-00
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-blue-200/80 font-medium">
                    © 2026 Navoiy davlat universiteti Tillar fakulteti portali.
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl overflow-hidden border border-[#E1E1E1]">
            <div className="p-4 bg-[#013D8C] text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Search className="w-5 h-5 text-white shrink-0" />
                <input
                  type="text"
                  placeholder="Sayt bo'yicha qidiruv..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-0 text-white placeholder-blue-200 text-sm focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-white hover:text-blue-100 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
              {!searchQuery.trim() && (
                <p className="text-xs text-gray-500 text-center py-6">
                  Qidirish uchun kalit so'zni kiriting...
                </p>
              )}

              {filteredPrograms.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase text-[#013D8C] tracking-wider block mb-2">
                    Ta'lim yo'nalishlari ({filteredPrograms.length})
                  </span>
                  {filteredPrograms.map((p) => (
                    <Link
                      key={p.id}
                      to={`/talim/yonalishlar/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block p-2 hover:bg-[#F0F6FE] text-xs font-semibold text-gray-800"
                    >
                      {L(p.name)}
                    </Link>
                  ))}
                </div>
              )}

              {filteredNews.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase text-[#013D8C] tracking-wider block mb-2">
                    Yangiliklar ({filteredNews.length})
                  </span>
                  {filteredNews.map((n) => (
                    <Link
                      key={n.id}
                      to={`/yangiliklar/${n.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block p-2 hover:bg-[#F0F6FE] text-xs font-semibold text-gray-800"
                    >
                      {L(n.title)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
