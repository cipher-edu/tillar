import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Newspaper } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { news } from '@/data/news';
import { newsPath } from '@/lib/links';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

export const GovNewsSection: React.FC = () => {
  const { L } = useLanguage();
  const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sortedNews[0];
  const mainNews = sortedNews.slice(1, 4);
  const listNews = sortedNews.slice(4, 8);

  if (!featured) return null;

  return (
    <section className="gov-section gov-pattern-soft border-t border-[#e1e1e1]">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Axborot xizmati va tadbirlar"
          title="Yangiliklar va taвЂ™limiy voqealar"
          actionLabel="Barcha yangiliklar"
          actionTo="/yangiliklar"
        />

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* Featured */}
          <article className="lg:col-span-5 gov-card overflow-hidden group flex flex-col">
            <Link to={newsPath(featured.slug)} className="relative block h-52 sm:h-64 lg:h-full min-h-[220px] lg:min-h-[320px] overflow-hidden bg-[#e8e8e8]">
              <img
                src={featured.cover}
                alt={L(featured.title)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021e44]/85 via-[#013d8c]/25 to-transparent" />
              <span className="absolute top-3 left-3 bg-[#013d8c] text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10">
                {featured.category}
              </span>
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-100 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featured.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug line-clamp-3 group-hover:underline decoration-white underline-offset-4">
                  {L(featured.title)}
                </h3>
              </div>
            </Link>
            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <p className="text-xs sm:text-sm text-[#575757] font-medium leading-relaxed line-clamp-3 flex-1">
                {L(featured.excerpt)}
              </p>
              <Link
                to={newsPath(featured.slug)}
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#043b87] hover:text-[#1675e0] group/link"
              >
                <span>Batafsil oвЂqish</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </article>

          {/* 3 cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {mainNews.map((item) => (
              <article key={item.id} className="gov-card overflow-hidden flex flex-col group">
                <Link to={newsPath(item.slug)} className="relative h-36 overflow-hidden bg-[#e8e8e8] block">
                  <img
                    src={item.cover}
                    alt={L(item.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#013d8c] px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </Link>
                <div className="p-3.5 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[#043b87] mb-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xs font-extrabold text-[#131523] leading-snug line-clamp-3 group-hover:text-[#1675e0] transition-colors">
                    <Link to={newsPath(item.slug)}>{L(item.title)}</Link>
                  </h3>
                  <p className="mt-2 text-[11px] text-[#707070] leading-relaxed line-clamp-2 flex-1">
                    {L(item.excerpt)}
                  </p>
                  <Link
                    to={newsPath(item.slug)}
                    className="mt-3 pt-2.5 border-t border-[#f0f0f0] inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#043b87] hover:text-[#1675e0]"
                  >
                    OвЂqish
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Compact list */}
        {listNews.length > 0 && (
          <div className="mt-6 bg-white border border-[#e1e1e1] rounded-lg p-4 sm:p-5 shadow-gov">
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#e1e1e1]">
              <Newspaper className="w-4 h-4 text-[#013d8c]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#043b87]">
                QoвЂshimcha yangiliklar
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-2 sm:gap-3">
              {listNews.map((item) => (
                <Link
                  key={item.id}
                  to={newsPath(item.slug)}
                  className="flex items-start gap-3 p-2.5 rounded-md border border-transparent hover:border-[#013d8c]/25 hover:bg-[#eff7ff] transition-all group"
                >
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-[#e8e8e8] border border-[#e1e1e1]">
                    <img
                      src={item.cover}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#939393] font-medium block mb-0.5">{item.date}</span>
                    <h4 className="text-xs font-bold text-[#131523] group-hover:text-[#1675e0] group-hover:underline line-clamp-2 leading-snug">
                      {L(item.title)}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
