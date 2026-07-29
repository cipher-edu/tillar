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
    <section className="gov-section bg-[#F0F0F0] border-t border-[#E1E1E1] font-sans py-10 sm:py-12">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Axborot xizmati va tadbirlar"
          title="Yangiliklar va ta'limiy voqealar"
          actionLabel="Barcha yangiliklar"
          actionTo="/yangiliklar"
        />

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* Featured */}
          <article className="lg:col-span-5 border border-[#E1E1E1] group flex flex-col bg-white">
            <Link to={newsPath(featured.slug)} className="relative block h-52 sm:h-64 lg:h-full min-h-[220px] lg:min-h-[320px] overflow-hidden bg-slate-100">
              <img
                src={featured.cover}
                alt={L(featured.title)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013D8C]/90 via-[#013D8C]/30 to-transparent" />
              <span className="absolute top-3 left-3 bg-[#013D8C] text-white px-2.5 py-1 rounded-none text-[10px] font-bold border border-white/20 font-sans">
                {featured.category}
              </span>
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-blue-100 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featured.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-3 group-hover:underline font-sans">
                  {L(featured.title)}
                </h3>
              </div>
            </Link>
            <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
              <p className="text-xs sm:text-sm text-[#707070] font-normal leading-relaxed line-clamp-3 flex-1">
                {L(featured.excerpt)}
              </p>
              <Link
                to={newsPath(featured.slug)}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#013D8C] hover:underline font-sans"
              >
                <span>Batafsil o'qish</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* 3 cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {mainNews.map((item) => (
              <article key={item.id} className="gov-card overflow-hidden border border-[#E1E1E1] flex flex-col group bg-white">
                <Link to={newsPath(item.slug)} className="relative h-36 overflow-hidden bg-slate-100 block">
                  <img
                    src={item.cover}
                    alt={L(item.title)}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#013D8C] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                    {item.category}
                  </span>
                </Link>
                <div className="p-3.5 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#002E69] mb-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-900 leading-snug line-clamp-3 group-hover:text-[#013D8C] transition-colors ">
                    <Link to={newsPath(item.slug)}>{L(item.title)}</Link>
                  </h3>
                  <p className="mt-2 text-[11px] text-slate-600 leading-relaxed line-clamp-2 flex-1">
                    {L(item.excerpt)}
                  </p>
                  <Link
                    to={newsPath(item.slug)}
                    className="mt-3 pt-2.5 border-t border-slate-100 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#002E69] hover:text-[#013D8C]"
                  >
                    O'qish
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Compact list */}
        {listNews.length > 0 && (
          <div className="mt-6 bg-white border border-[#E1E1E1] p-4 sm:p-5 ">
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#E1E1E1]">
              <Newspaper className="w-4 h-4 text-[#002E69]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#002E69] ">
                Qo'shimcha yangiliklar
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-2 sm:gap-3">
              {listNews.map((item) => (
                <Link
                  key={item.id}
                  to={newsPath(item.slug)}
                  className="flex items-start gap-3 p-2.5 border border-transparent hover:border-[#013D8C]/30 hover:bg-[#F0F6FE] transition-all group"
                >
                  <div className="w-16 h-16 overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <img
                      src={item.cover}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-500 font-medium block mb-0.5">{item.date}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#013D8C] group-hover:underline line-clamp-2 leading-snug ">
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
