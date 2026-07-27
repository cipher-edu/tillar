import React from 'react';
import { ExternalLink, Globe2 } from 'lucide-react';
import { partners } from '@/data/site';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

const govLinks = [
  { name: "O‘zbekiston Respublikasi Hukumat portali", url: 'https://gov.uz', badge: 'GOV' },
  { name: "Oliy ta’lim, fan va innovatsiyalar vazirligi", url: 'https://gov.uz/edu', badge: 'EDU' },
  { name: 'Yagona interaktiv davlat xizmatlari', url: 'https://my.gov.uz', badge: 'MY' },
  { name: "O‘zbekiston Respublikasi qonunchilik bazasi", url: 'https://lex.uz', badge: 'LEX' },
  { name: 'Davlat statistika qo‘mitasi', url: 'https://stat.uz', badge: 'STAT' },
];

export const GovPartnersSection: React.FC = () => {
  return (
    <section className="gov-section gov-pattern-soft border-t border-[#e1e1e1]">
      <div className="gov-shell">
        {/* Government portals */}
        <div className="mb-12">
          <GovSectionHeader
            kicker="Davlat axborot resurslari"
            title="Rasmiy davlat portallari va havolalar"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {govLinks.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-card p-3.5 flex items-center gap-3 group"
              >
                <div className="w-11 h-11 rounded-md bg-gradient-to-br from-[#013d8c] to-[#021e44] text-white flex items-center justify-center font-black text-[10px] tracking-wide shrink-0 border border-white/10 shadow-gov transition-transform duration-200 group-hover:scale-105">
                  {item.badge}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-extrabold text-[#131523] group-hover:text-[#1675e0] block leading-snug line-clamp-2 transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-[#939393] font-semibold inline-flex items-center gap-1 mt-1 group-hover:text-[#043b87] transition-colors">
                    O‘tish
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* International partners */}
        <div className="pt-2">
          <div className="gov-section-head">
            <div className="min-w-0 max-w-3xl">
              <span className="gov-section-kicker inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                Xalqaro integratsiya
              </span>
              <h2 className="gov-section-title">
                Xalqaro hamkor universitetlar ({partners.length})
              </h2>
            </div>
            <p className="text-xs text-[#707070] max-w-md font-medium leading-relaxed">
              Rossiya, Buyuk Britaniya, Ozarbayjon, Qozog‘iston, Indoneziya va Malayziya OTMlari
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((p) => (
              <div
                key={p.id}
                className="gov-card p-3.5 text-center flex flex-col items-center justify-between min-h-[132px] group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#013d8c] to-[#143797] text-white font-bold text-[10px] flex items-center justify-center mb-2 border-2 border-white shadow-gov ring-1 ring-[#e1e1e1] transition-transform duration-200 group-hover:scale-110 group-hover:ring-[#013d8c]/40">
                  {p.logoText || 'OTM'}
                </div>
                <span className="text-[11px] font-bold text-[#131523] group-hover:text-[#043b87] leading-snug line-clamp-2 transition-colors">
                  {p.name}
                </span>
                <span className="text-[9px] font-medium text-[#939393] uppercase tracking-wider block mt-1.5">
                  {p.country || 'Xalqaro OTM'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
