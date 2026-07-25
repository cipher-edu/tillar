import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/ui/PageShell';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { historyEvents } from '@/data/history';
import { getPeopleByIds } from '@/data/people';
import { personPath } from '@/lib/links';
import type { HistoryEvent } from '@/types';

export const HistoryPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [selected, setSelected] = useState<HistoryEvent | null>(null);
  const related = selected?.relatedPersonIds ? getPeopleByIds(selected.relatedPersonIds) : [];

  return (
    <PageShell title={t('history_title')} subtitle={t('history_subtitle')}>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400 via-amber-600/40 to-transparent md:-translate-x-1/2" />
        <div className="space-y-10">
          {historyEvents.map((event, i) => (
            <motion.button
              key={event.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(event)}
              className={`relative w-full text-left pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%]'}`}
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full gold-gradient border-4 border-[#fdfaf3] shadow-lg z-10" />
              <div className="glass-card p-8 rounded-[2.5rem] border-amber-200 hover:shadow-2xl transition-all">
                <span className="inline-block px-4 py-1 rounded-full royal-gradient text-white text-[10px] font-black tracking-widest mb-4 font-ui">
                  {event.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-classic text-slate-900 mb-3">{L(event.title)}</h3>
                <p className="text-lg italic font-serif-classic text-slate-600 line-clamp-3">{L(event.description)}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidthClass="max-w-3xl">
        {selected && (
          <div className="p-10 md:p-14">
            <span className="inline-block px-4 py-1 rounded-full gold-gradient text-slate-950 text-[10px] font-black tracking-widest mb-6 font-ui">
              {selected.year}
            </span>
            <h2 className="text-4xl font-classic text-slate-950 mb-6">{L(selected.title)}</h2>
            <p className="text-2xl italic font-serif-classic text-slate-700 leading-relaxed mb-8">{L(selected.description)}</p>
            {selected.photos?.[0] && (
              <img src={selected.photos[0]} alt="" className="w-full h-56 object-cover rounded-[2rem] mb-8" />
            )}
            {related.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-4 font-ui">
                  {t('news_related')}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      to={personPath(p)}
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100"
                    >
                      <img src={p.photo} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-classic text-sm">{L(p.name)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </PageShell>
  );
};
