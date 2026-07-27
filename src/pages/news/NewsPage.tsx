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
          <Link to="/yangiliklar" className="text-[11px] font-black uppercase tracking-widest text-[#013d8c] font-ui">
            в†ђ {t('back')}
          </Link>
        </div>
        <article className="max-w-4xl mx-auto">
          {detail.cover && (
            <img
              src={detail.cover}
              alt=""
              className="w-full h-64 md:h-96 object-cover rounded-[3rem] mb-10 shadow-2xl"
            />
          )}
          <p className="text-[11px] font-black uppercase tracking-widest text-[#043b87] mb-6 font-ui">{detail.date}</p>
          {isHtml ? (
            <div
              className="news-rich-body prose prose-lg md:prose-xl max-w-none text-slate-800 font-serif-classic leading-relaxed mb-12
                prose-headings:font-classic prose-headings:text-slate-950
                prose-a:text-[#013d8c] prose-img:rounded-2xl prose-img:shadow-lg
                prose-blockquote:border-[#1675e0] prose-blockquote:text-slate-700"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="text-2xl md:text-3xl italic font-serif-classic text-slate-700 leading-relaxed mb-12 whitespace-pre-line">
              {bodyHtml}
            </p>
          )}
          {related.length > 0 && (
            <div className="glass-card p-8 rounded-[3rem] border-[#d6e6f7]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-[#043b87] mb-4 font-ui">
                {t('news_related')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={personPath(p)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-blue-100 hover:border-[#b6c6d7]"
                  >
                    <img src={p.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-classic text-lg">{L(p.name)}</span>
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
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest font-ui border ${
              cat === c.id ? 'royal-gradient text-white border-transparent' : 'bg-white border-[#d6e6f7] text-slate-600'
            }`}
          >
            {t(c.key)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-xl italic font-serif-classic text-slate-500 py-16">{t('empty')}</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pageItems.map((item) => (
              <Link
                key={item.id}
                to={newsPath(item.slug)}
                className="glass-card rounded-[3rem] overflow-hidden border-blue-100 group hover:shadow-2xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.cover}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#043b87] mb-3 font-ui">{item.date}</p>
                  <h3 className="font-classic text-2xl leading-snug text-slate-900 mb-3 group-hover:text-[#013d8c]">
                    {L(item.title)}
                  </h3>
                  <p className="text-lg italic font-serif-classic text-slate-600 line-clamp-3">{L(item.excerpt)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination вЂ” har sahifada 8 ta yangilik */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-6">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 font-ui">
                {t('pagination_showing')} {from}вЂ“{to} / {filtered.length}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  aria-label={t('pagination_prev')}
                  className="w-12 h-12 rounded-2xl border border-[#d6e6f7] bg-white/80 flex items-center justify-center text-slate-800 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#eff7ff] hover:text-[#021e44] hover:border-[#1675e0] transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`min-w-12 h-12 px-3 rounded-2xl text-sm font-black font-ui tracking-wider transition-all border ${
                      p === page
                        ? 'gov-gradient text-white border-transparent shadow-lg'
                        : 'bg-white/80 border-[#d6e6f7] text-slate-700 hover:border-[#1675e0]'
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
                  className="w-12 h-12 rounded-2xl border border-[#d6e6f7] bg-white/80 flex items-center justify-center text-slate-800 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#eff7ff] hover:text-[#021e44] hover:border-[#1675e0] transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </PageShell>
  );
};
