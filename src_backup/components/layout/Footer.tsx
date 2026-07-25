import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/data/site';
import { PATTERNS } from '@/components/ui/PatternBackground';

/** Yandex Maps — interaktiv widget (qisqa havola: https://yandex.uz/maps/-/CTfeeSZh) */
export const FOOTER_MAP_SHORT = 'https://yandex.uz/maps/-/CTfeeSZh';
export const FOOTER_MAP_EMBED = 'https://yandex.uz/map-widget/v1/-/CTfeeSZh';

/**
 * Footer — fon: namuna loyiha «Simpozium haqida» (About fullPage) = bg-[#fdfaf3]
 * + interaktiv Yandex xarita.
 */
export const Footer: React.FC = () => {
  const { t, L } = useLanguage();

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
    <footer className="relative overflow-hidden pt-28 pb-12 bg-[#fdfaf3] text-slate-800">
      {/* About (Simpozium haqida) fon uslubi */}
      <div className="absolute inset-0 bg-[#fdfaf3]" />
      <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35] animated-pattern pointer-events-none"
        style={{
          backgroundImage: PATTERNS.starSoft,
          backgroundSize: '150px 150px',
        }}
      />
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage: PATTERNS.girih,
          backgroundSize: '240px 240px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-200/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Yuqori bezak — gumbaz */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 flex justify-center z-[1] pointer-events-none">
        <div className="w-full h-full bg-[#fdfaf3] rounded-b-[50%] border-x border-b border-amber-300/50 flex items-center justify-center -translate-y-1/2 shadow-sm">
          <span className="text-amber-700 text-3xl md:text-4xl pt-12">⚜ ❦ ⚜</span>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)] border border-amber-200/50">
                <span className="text-slate-950 font-classic font-black text-xl">TF</span>
              </div>
              <div>
                <h2 className="font-classic font-black uppercase text-slate-950 leading-tight">
                  {t('site_name')}
                </h2>
                <p className="text-[9px] tracking-[0.25em] uppercase text-amber-800/80 font-ui mt-1">
                  {t('site_uni')}
                </p>
              </div>
            </div>
            <p className="text-slate-600 font-serif-classic italic text-lg leading-relaxed mb-6">
              {t('footer_text')}
            </p>
            <div className="flex flex-wrap gap-2">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-full border border-amber-400/40 text-amber-900 text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all font-ui bg-white/60"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-800 tracking-widest uppercase border-b border-amber-300/40 pb-3">
              {t('footer_quick')}
            </h4>
            <ul className="space-y-2.5 text-slate-700 font-serif-classic italic text-base">
              {quick.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-amber-800 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-amber-600/60 text-[10px]">✦</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-800 tracking-widest uppercase border-b border-amber-300/40 pb-3">
              {t('footer_contact')}
            </h4>
            <div className="space-y-4 text-slate-700 font-serif-classic italic text-base">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
                <span>{L(contactInfo.address)}</span>
              </p>
              <p className="flex items-center gap-3 not-italic font-ui text-sm font-semibold text-slate-800">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-3 not-italic font-ui text-sm font-semibold text-slate-800">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                {contactInfo.email}
              </p>
            </div>
            <a
              href={contactInfo.universityUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-2xl royal-gradient text-amber-100 text-[10px] font-black uppercase tracking-widest font-ui hover:brightness-110 transition-all shadow-md"
            >
              {t('footer_uni')}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Xarita havolasi (ustun) */}
          <div className="lg:col-span-3">
            <h4 className="font-classic text-sm font-black mb-6 text-amber-800 tracking-widest uppercase border-b border-amber-300/40 pb-3">
              {t('footer_map')}
            </h4>
            <p className="text-slate-600 font-serif-classic italic text-base mb-4 leading-relaxed">
              {L(contactInfo.address)}
            </p>
            <a
              href={FOOTER_MAP_SHORT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-amber-300/60 bg-white/80 text-amber-950 text-[10px] font-black uppercase tracking-[0.2em] font-ui hover:bg-slate-950 hover:text-amber-200 hover:border-slate-950 transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t('footer_map_open')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Interaktiv Yandex xarita — to‘liq kenglik */}
        <div className="mb-12 rounded-[2rem] overflow-hidden border-2 border-amber-200/70 shadow-xl bg-white">
          <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[360px]">
            <iframe
              title={t('footer_map')}
              src={FOOTER_MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="border-t border-amber-300/30 pt-8 space-y-6">
          {/* Sayt ishlab chiquvchisi — ko‘rinadigan blok */}
          <div className="relative rounded-[1.75rem] border border-amber-300/50 bg-white/80 backdrop-blur-sm px-6 py-5 md:px-8 md:py-6 shadow-md overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 gold-gradient" />
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-200/30 blur-2xl rounded-full pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-800 font-ui mb-2">
                  {t('footer_dev_label')}
                </p>
                <p className="font-classic text-xl md:text-2xl text-slate-950 leading-snug">
                  {t('footer_dev_name')}
                </p>
                <p className="mt-1.5 text-sm md:text-base font-serif-classic italic text-slate-600">
                  {t('footer_dev_role')}
                </p>
              </div>
              <div className="shrink-0 self-center sm:self-auto">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl royal-gradient text-amber-100 text-[10px] font-black uppercase tracking-[0.2em] font-ui shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                  {t('footer_dev_badge')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-slate-500 text-sm font-serif-classic italic">
              © {new Date().getFullYear()} NavDU — {t('site_name')}.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-800/50 font-ui">
              {t('footer_heritage')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
