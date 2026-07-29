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
    <section className="gov-section bg-[#F0F0F0] border-t border-[#E1E1E1] font-sans py-10 sm:py-12">
      <div className="gov-shell">
        {/* Government portals */}
        <div className="mb-10">
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
                className="p-3.5 rounded-none border border-[#E1E1E1] flex items-center gap-3 group bg-white hover:bg-[#F0F0F0] transition-colors"
              >
                <div className="w-11 h-11 rounded-none bg-[#013D8C] text-white flex items-center justify-center font-bold text-xs shrink-0 font-sans">
                  {item.badge}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-[#000000] group-hover:text-[#013D8C] block leading-snug line-clamp-2 transition-colors font-sans">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#707070] font-medium inline-flex items-center gap-1 mt-1 group-hover:text-[#013D8C] transition-colors">
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
          <div className="gov-section-head mb-6 pb-4 border-b border-[#E1E1E1]">
            <div className="min-w-0 max-w-3xl">
              <span className="gov-section-kicker inline-flex items-center gap-1.5 text-[#013D8C] font-bold text-xs mb-1">
                <Globe2 className="w-3.5 h-3.5" />
                Xalqaro integratsiya
              </span>
              <h2 className="gov-section-title text-[#043B87] font-sans font-extrabold uppercase text-xl sm:text-2xl">
                Xalqaro hamkor universitetlar ({partners.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-none border border-[#E1E1E1] text-center group bg-white hover:bg-[#F0F0F0] transition-colors flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-none bg-[#F0F0F0] p-1.5 flex items-center justify-center mb-2 border border-[#E1E1E1]">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-[#000000] group-hover:text-[#013D8C] block leading-snug line-clamp-2 font-sans">
                  {p.name}
                </span>
                <span className="text-[10px] text-[#707070] font-medium block mt-0.5">
                  {p.country}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
