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
    const related = getPeopleByIds(detail.relatedPersonIds);
    const bodyHtml = L(detail.body) || '';
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(bodyHtml);
    return (
      <PageShell title={L(detail.title)}>
        <div className="mb-6">
          <Link to="/yangiliklar" className="text-[11px] font-black uppercase tracking-widest text-[#002E69] ">
            ← {t('back')}
          </Link>
        </div>
        <article className="max-w-4xl mx-auto font-sans">
          {detail.cover && (
            <img
              src={detail.cover}
              alt=""
              className="w-full h-64 md:h-96 object-cover mb-10 border border-[#E1E1E1]"
            />
          )}
          <p className="text-[11px] font-black uppercase tracking-widest text-[#002E69] mb-6 ">{detail.date}</p>
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
            <div className="bg-[#F0F6FE] p-8 border border-[#013D8C]/20 ">
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-[#002E69] mb-4 ">
                {t('news_related')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={personPath(p)}
                    className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 hover:border-[#013D8C]/40 "
                  >
                    <img src={p.photo} alt="" className="w-12 h-12 object-cover" />
                    <span className="font-bold text-slate-900 text-sm ">{L(p.name)}</span>
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
