import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/ui/PageShell';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { historyEvents } from '@/data/history';
import { getPeopleByIds } from '@/data/people';
import { personPath } from '@/lib/links';
import { ShamsaMedallion } from '@/components/ui/PatternBackground';
import type { HistoryEvent } from '@/types';

export const HistoryPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [selected, setSelected] = useState<HistoryEvent | null>(null);
  const related = selected?.relatedPersonIds ? getPeopleByIds(selected.relatedPersonIds) : [];

  return (
    <PageShell title={t('history_title')} subtitle={t('history_subtitle')} tone="behzod" topic="history">
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 gold-gradient md:-translate-x-1/2 rounded-full shadow-[0_0_10px_#d4af37]" />
        
        <div className="space-y-12">
          {historyEvents.map((event, i) => (
            <motion.button
              key={event.id}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(event)}
              className={`relative w-full text-left pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%]'}`}
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full gold-gradient border-2 border-slate-950 shadow-xl z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-950" />
              </div>

              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-amber-300/70 hover:bg-white hover:border-amber-400 hover:shadow-[0_20px_48px_-14px_rgba(166,124,0,0.25)] hover:-translate-y-0.5 transition-all duration-500 group">
                <span className="inline-block px-5 py-1.5 rounded-full gold-gradient text-slate-950 text-[10px] font-black tracking-widest mb-4 font-ui shadow-md">
                  {event.year} YIL
                </span>
                <h3 className="text-2xl md:text-3xl font-classic text-slate-950 group-hover:text-amber-950 font-bold mb-3 transition-colors">
                  {L(event.title)}
                </h3>
                <p className="text-lg italic font-serif-classic text-slate-700 group-hover:text-slate-800 line-clamp-3 transition-colors">
                  {L(event.description)}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-800 group-hover:text-amber-900 font-ui transition-colors">
                  <span>To'liq ma'lumot</span> →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal for history item */}
      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidthClass="max-w-3xl">
        {selected && (
          <div className="p-8 md:p-12 bg-slate-950 text-white border border-amber-400/40 rounded-[2.5rem]">
            <div className="flex items-center gap-3 mb-4">
              <ShamsaMedallion className="w-6 h-6" />
              <span className="inline-block px-4 py-1.5 rounded-full gold-gradient text-slate-950 text-[10px] font-black tracking-widest font-ui">
                {selected.year} YIL
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-classic text-amber-300 mb-6 font-bold">{L(selected.title)}</h2>
            <p className="text-xl italic font-serif-classic text-slate-200 leading-relaxed mb-8">{L(selected.description)}</p>
            {selected.photos?.[0] && (
              <img src={selected.photos[0]} alt="" className="w-full h-64 object-cover rounded-[2rem] mb-8 border border-amber-400/30" />
            )}
            {related.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 mb-4 font-ui font-bold">
                  {t('news_related')}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      to={personPath(p)}
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 transition-all"
                    >
                      <img src={p.photo} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-classic text-sm font-bold">{L(p.name)}</span>
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
