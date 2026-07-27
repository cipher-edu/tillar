import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  const { t, L } = useLanguage();
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
    `px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors inline-block ${
      isActive ? 'bg-[#043b87] text-white' : 'text-gray-900 hover:bg-[#043b87] hover:text-white'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-[#e1e1e1]">
        <div className="gov-shell py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#eff7ff] border border-[#2578e0] p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Uzbekistan.svg"
                alt="O'zbekiston Gerbi"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-[3px] h-11 uz-flag-line rounded-full shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#043b87] line-clamp-1">
                O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi
              </span>
              <h1 className="text-xs sm:text-sm font-extrabold uppercase text-gray-900 group-hover:text-[#043b87] transition-colors leading-tight line-clamp-2">
                Navoiy davlat universiteti — Tillar fakulteti
              </h1>
              <span className="text-[10px] font-medium text-gray-500 hidden sm:block">
                Rasmiy veb-portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-3 bg-[#eff7ff] border border-[#bcdaff] px-3.5 py-1.5 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#043b87] text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                  Ishonch telefoni
                </span>
                <a
                  href="tel:1199"
                  className="text-sm font-extrabold text-[#043b87] hover:underline leading-none"
                >
                  1199 / (79) 221-88-00
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#043b87] hover:text-white text-gray-700 transition-colors shadow-sm"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSitemapOpen((prev) => !prev)}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#043b87] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-[#021e44] transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span>Sayt xaritasi</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded bg-[#043b87] text-white"
              aria-label="Menyu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="bg-[#f0f0f0] border-t border-[#e1e1e1] hidden md:block">
          <div className="gov-shell flex items-center">
            <NavLink to="/" end className={linkClass}>
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
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                    activeDropdown === menu.key
                      ? 'bg-[#043b87] text-white'
                      : 'text-gray-900 hover:bg-[#043b87] hover:text-white'
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeDropdown === menu.key && (
                  <div className="absolute left-0 top-full w-64 bg-[#043b87] shadow-xl text-white py-1 z-50 border-t-2 border-[#1675e0]">
                    {menu.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="block px-4 py-2.5 text-xs font-semibold text-blue-50 hover:bg-[#021e44] hover:text-white transition-colors border-b border-blue-900/40 last:border-0"
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

        {mobileOpen && (
          <div className="md:hidden bg-[#043b87] text-white p-4 space-y-3 border-t border-blue-900">
            <Link to="/" className="block py-2 text-sm font-bold uppercase border-b border-blue-800">
              {t('nav_home')}
            </Link>
            {navDropdowns.map((menu) => (
              <div key={menu.key} className="space-y-1">
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest block pt-2">
                  {menu.label}
                </span>
                {menu.items.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    className="block pl-3 py-1.5 text-xs text-blue-50 hover:text-white font-medium"
                  >
                    · {sub.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-blue-800 pt-2 space-y-2">
              {plainLinks.map((link) => (
                <Link key={link.to} to={link.to} className="block py-1.5 text-xs font-bold uppercase text-blue-50">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {sitemapOpen && (
        <div className="fixed inset-0 z-50 bg-[#043b87]/96 backdrop-blur-md text-white p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center pb-6 border-b border-blue-700">
              <h2 className="text-xl font-extrabold uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-6 h-6 text-white" />
                Sayt xaritasi — NavDU Tillar fakulteti
              </h2>
              <button
                type="button"
                onClick={() => setSitemapOpen(false)}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 py-8">
              <div>
                <h3 className="text-sm font-bold uppercase text-blue-100 mb-3 border-b border-blue-800 pb-1">
                  Fakultet
                </h3>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/fakultet/tarix" className="hover:underline">· Tarix va rivojlanish</Link></li>
                  <li><Link to="/fakultet/rahbariyat" className="hover:underline">· Rahbariyat</Link></li>
                  <li><Link to="/fakultet/tuzilma" className="hover:underline">· Kafedralar va tuzilma</Link></li>
                  <li><Link to="/fakultet/faxriy-ustozlar" className="hover:underline">· Faxriy ustozlar</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-blue-100 mb-3 border-b border-blue-800 pb-1">
                  Ta'lim va jamoa
                </h3>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/talim/yonalishlar" className="hover:underline">· Bakalavriat va magistratura</Link></li>
                  <li><Link to="/talim/oquv-rejalar" className="hover:underline">· O'quv rejalar</Link></li>
                  <li><Link to="/jamoa/professorlar" className="hover:underline">· Professor-o'qituvchilar</Link></li>
                  <li><Link to="/jamoa/tyutorlar" className="hover:underline">· Tyutorlar va guruhlar</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-blue-100 mb-3 border-b border-blue-800 pb-1">
                  Ilm-fan va axborot
                </h3>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/ilm-fan" className="hover:underline">· Ilmiy loyihalar</Link></li>
                  <li><Link to="/yangiliklar" className="hover:underline">· Yangiliklar</Link></li>
                  <li><Link to="/talabalar" className="hover:underline">· Talabalar hayoti</Link></li>
                  <li><Link to="/aloqa" className="hover:underline">· Aloqa va manzil</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-[#e1e1e1]">
            <div className="p-4 bg-[#043b87] text-white flex items-center justify-between gap-3">
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
                  <span className="text-[10px] font-bold uppercase text-[#043b87] tracking-wider block mb-2">
                    Ta'lim yo'nalishlari ({filteredPrograms.length})
                  </span>
                  {filteredPrograms.map((p) => (
                    <Link
                      key={p.id}
                      to={`/talim/yonalishlar/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block p-2 hover:bg-[#eff7ff] rounded text-xs font-semibold text-gray-800"
                    >
                      {L(p.name)}
                    </Link>
                  ))}
                </div>
              )}

              {filteredNews.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase text-[#043b87] tracking-wider block mb-2">
                    Yangiliklar ({filteredNews.length})
                  </span>
                  {filteredNews.map((n) => (
                    <Link
                      key={n.id}
                      to={`/yangiliklar/${n.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block p-2 hover:bg-[#eff7ff] rounded text-xs font-semibold text-gray-800"
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
