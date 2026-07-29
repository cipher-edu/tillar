import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { useLanguage } from '@/context/LanguageContext';
import { news, getNews } from '@/data/news';
import { getPeopleByIds } from '@/data/people';
import { personPath, newsPath } from '@/lib/links';
import type { NewsCategory } from '@/types';

const PAGE_SIZE = 8;

const categories: { id: NewsCategory | 'all'; key: string }[] = [
  { id: 'all', key: 'filter_all' },
  { id: 'faculty', key: 'nav_faculty' },
  { id: 'education', key: 'nav_education' },
  { id: 'science', key: 'nav_science' },
  { id: 'achievements', key: 'badge_winner' },
  { id: 'international', key: 'badge_international' },
  { id: 'student_life', key: 'nav_students' },
  { id: 'teachers', key: 'nav_professors' },
  { id: 'announcements', key: 'nav_news' },
];

export const NewsPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const [cat, setCat] = useState<string>('all');
  const [page, setPage] = useState(1);

  const detail = slug ? getNews(slug) : null;

  const filtered = useMemo(() => {
    const list = [...news].sort((a, b) => b.date.localeCompare(a.date));
    if (cat === 'all') return list;
    return list.filter((n) => n.category === cat);
  }, [cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [cat]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const goToPage = (p: number) => {
    const next = Math.min(totalPages, Math.max(1, p));
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (detail) {
    const authors = detail.authorIds ? getPeopleByIds(detail.authorIds) : [];
    const related = news.filter((n) => n.id !== detail.id && n.category === detail.category).slice(0, 3);
    const bodyHtml = L(detail.body) || '';
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(bodyHtml);

    return (
      <PageShell title={L(detail.title)}>
        <div className="mb-6 font-sans">
          <Link
            to="/yangiliklar"
            className="text-xs font-semibold text-[#013D8C] hover:underline"
          >
            ← {t('back')}
          </Link>
        </div>

        <article className="space-y-6 max-w-4xl font-sans">
          <div className="flex items-center gap-3 text-xs text-[#707070]">
            <span className="bg-[#013D8C] text-white px-2.5 py-1 text-xs font-bold rounded-none">
              {detail.category}
            </span>
            <span>{detail.date}</span>
          </div>

          <div className="border border-[#E1E1E1] bg-slate-100 p-2 rounded-none max-w-3xl">
            <img
              src={detail.cover}
              alt={L(detail.title)}
              className="w-full h-auto object-cover max-h-[450px]"
            />
          </div>
          
          {isHtml ? (
            <div
              className="news-rich-body prose prose-lg md:prose-xl max-w-none text-slate-800 leading-relaxed mb-12
                prose-headings:prose-headings:text-slate-950
                prose-a:text-[#013D8C] prose-img:prose-img:prose-blockquote:border-[#013D8C] prose-blockquote:text-slate-700"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="text-2xl md:text-3xl italic font-serif text-slate-700 leading-relaxed mb-12 whitespace-pre-line">
              {bodyHtml}
            </p>
          )}
          {related.length > 0 && (
            <div className="bg-[#F0F0F0] p-6 border border-[#E1E1E1] rounded-none">
              <h3 className="text-xs font-bold uppercase text-[#043B87] mb-4 font-sans">
                {t('news_related')}
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((n) => (
                  <Link
                    key={n.id}
                    to={newsPath(n)}
                    className="group flex flex-col p-3 bg-white border border-[#E1E1E1] hover:border-[#013D8C] transition-colors rounded-none"
                  >
                    <img src={n.cover} alt={L(n.title)} className="w-full h-24 object-cover mb-2" />
                    <span className="font-bold text-[#000000] text-xs line-clamp-2 group-hover:text-[#013D8C] font-sans">
                      {L(n.title)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </PageShell>
    );
  }

  const from = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <PageShell title={t('news_title')}>
      <div className="flex flex-wrap justify-center gap-2 mb-12 font-sans">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider border transition-colors ${
              cat === c.id ? 'bg-[#002E69] text-white border-transparent ' : 'bg-white border-[#E1E1E1] text-slate-700 hover:bg-[#F0F6FE]'
            }`}
          >
            {t(c.key)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-xl italic font-serif text-slate-500 py-16">{t('empty')}</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
            {pageItems.map((item) => (
              <Link
                key={item.id}
                to={newsPath(item.slug)}
                className="gov-card overflow-hidden border border-[#E1E1E1] bg-white group hover:transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.cover}
                      alt=""
                      className="w-full h-full object-cover group-transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#002E69] px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#002E69] mb-2">{item.date}</p>
                    <h3 className="font-black text-base leading-snug text-slate-900 mb-2 group-hover:text-[#013D8C] transition-colors ">
                      {L(item.title)}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">{L(item.excerpt)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-6 font-sans">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-400 ">
                {t('pagination_showing')} {from}–{to} / {filtered.length}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  aria-label={t('pagination_prev')}
                  className="w-10 h-10 border border-[#E1E1E1] bg-white flex items-center justify-center text-slate-800 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#F0F6FE] hover:text-[#002E69] hover:border-[#013D8C] transition-all shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`min-w-10 h-10 px-3 text-xs font-black tracking-wider transition-all border ${
                      p === page
                        ? 'bg-[#002E69] text-white border-transparent '
                        : 'bg-white border-[#E1E1E1] text-slate-700 hover:border-[#013D8C] hover:bg-[#F0F6FE]'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  aria-label={t('pagination_next')}
                  className="w-10 h-10 border border-[#E1E1E1] bg-white flex items-center justify-center text-slate-800 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#F0F6FE] hover:text-[#002E69] hover:border-[#013D8C] transition-all shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </PageShell>
  );
};
