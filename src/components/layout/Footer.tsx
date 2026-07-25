import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Phone, ArrowUp, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/data/site';
import { PATTERNS } from '@/components/ui/PatternBackground';

/** Yandex Maps — interaktiv widget */
export const FOOTER_MAP_SHORT = 'https://yandex.uz/maps/-/CTfeeSZh';
export const FOOTER_MAP_EMBED = 'https://yandex.uz/map-widget/v1/-/CTfeeSZh';

export const Footer: React.FC = () => {
  const { t, L } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quick = [
    { to: '/', label: t('nav_home') },
    { to: '/fakultet/tarix', label: t('nav_history') },
    { to: '/talim/yonalishlar', label: t('nav_programs') },
    { to: '/jamoa/professorlar', label: t('nav_professors') },
    { to: '/talabalar', label: t('nav_students') },
    { to: '/yangiliklar', label: t('nav_news') },
    { to: '/aloqa', label: t('nav_contact') },
  ];

  return (
    <footer className="relative overflow-hidden pt-16 sm:pt-24 md:pt-28 pb-8 sm:pb-12 bg-slate-950 safe-pb text-slate-100">
      {/* Background & Patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#071324] to-slate-950" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: PATTERNS.girih,
          backgroundSize: '240px 240px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient shadow-[0_0_20px_#d4af37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 mb-10 sm:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center shadow-lg border border-amber-300/60">
                <span className="text-slate-950 font-classic font-black text-xl">TF</span>
              </div>
              <div>
                <h2 className="font-classic font-bold uppercase text-white leading-tight text-lg">
                  {t('site_name')}
                </h2>
                <p className="text-[9px] tracking-[0.25em] uppercase text-amber-400 font-ui mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {t('site_uni')}
                </p>
              </div>
            </div>
            <p className="text-slate-300 font-serif-classic italic text-lg leading-relaxed mb-6">
              {t('footer_text')}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-widest hover:gold-gradient hover:text-slate-950 transition-all font-ui bg-white/5 backdrop-blur-md"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-400 tracking-widest uppercase border-b border-amber-500/20 pb-3">
              {t('footer_quick')}
            </h4>
            <ul className="space-y-3 text-slate-300 font-ui text-xs font-bold uppercase tracking-wider">
              {quick.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="text-amber-500 text-sm group-hover:translate-x-1 transition-transform">→</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-400 tracking-widest uppercase border-b border-amber-500/20 pb-3">
              {t('footer_contact')}
            </h4>
            <div className="space-y-4 text-slate-300 font-ui text-xs font-medium">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{L(contactInfo.address)}</span>
              </p>
              <p className="flex items-center gap-3 font-semibold text-white">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-3 font-semibold text-white">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                {contactInfo.email}
              </p>
            </div>
            <a
              href={contactInfo.universityUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-widest font-ui hover:bg-amber-400 hover:text-slate-950 transition-all shadow-md"
            >
              {t('footer_uni')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map info column */}
          <div className="lg:col-span-3">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-400 tracking-widest uppercase border-b border-amber-500/20 pb-3">
              {t('footer_map')}
            </h4>
            <p className="text-slate-300 font-serif-classic italic text-base mb-4 leading-relaxed">
              Navoiy shahri, Navoiy State Pedagogical University Binosi
            </p>
            <a
              href={FOOTER_MAP_SHORT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl gold-gradient text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] font-ui hover:scale-105 transition-all shadow-lg"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t('footer_map_open')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="mb-12 rounded-[2.5rem] overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900">
          <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[360px]">
            <iframe
              title={t('footer_map')}
              src={FOOTER_MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Developer Credit & Copyright */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          <div className="relative rounded-[2rem] border border-amber-500/30 bg-slate-900/80 backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 shadow-2xl overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 gold-gradient" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-400 font-ui mb-1">
                {t('footer_dev_label')}
              </p>
              <p className="font-classic text-xl md:text-2xl text-white font-bold leading-snug">
                {t('footer_dev_name')}
              </p>
              <p className="text-xs font-serif-classic italic text-slate-300 mt-1">
                {t('footer_dev_role')}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.2em] font-ui">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                {t('footer_dev_badge')}
              </div>
              <button
                onClick={scrollToTop}
                className="w-11 h-11 rounded-full border border-amber-400/40 bg-white/10 hover:gold-gradient hover:text-slate-950 text-amber-400 flex items-center justify-center transition-all duration-300"
                title="Yuqoriga qaytish"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-slate-400 text-xs font-serif-classic italic">
              © {new Date().getFullYear()} NavDU — {t('site_name')}. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-400/70 font-ui flex items-center gap-2">
              <span className="text-amber-500/80">❦</span>
              {t('footer_heritage')}
              <span className="text-amber-500/80">❦</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
