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
    <PageShell title={t('history_title')} subtitle={t('history_subtitle')}>
      <div className="relative max-w-4xl mx-auto font-sans">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#002E69] md:-translate-x-1/2" />
        
        <div className="space-y-8">
          {historyEvents.map((event, i) => (
            <motion.button
              key={event.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(event)}
              className={`relative w-full text-left pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%]'}`}
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-[#002E69] border-2 border-white z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="gov-card p-6 md:p-8 border border-[#E1E1E1] bg-white hover:border-[#013D8C] hover:bg-[#F0F6FE] transition-all group">
                <span className="inline-block px-3 py-1 bg-[#002E69] text-white text-[10px] font-black tracking-wider mb-3 ">
                  {event.year} YIL
                </span>
                <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-[#013D8C] mb-2 transition-colors ">
                  {L(event.title)}
                </h3>
                <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed transition-colors">
                  {L(event.description)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#002E69] group-hover:text-[#013D8C] transition-colors">
                  <span>Batafsil ma'lumot</span> →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal for history item */}
      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidthClass="max-w-2xl">
        {selected && (
          <div className="p-6 md:p-8 bg-white text-slate-900 font-sans border border-[#E1E1E1] ">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-[#002E69] text-white text-[10px] font-black tracking-wider ">
                {selected.year} YIL
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#002E69] mb-4 ">{L(selected.title)}</h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6">{L(selected.description)}</p>
            {selected.photos?.[0] && (
              <img src={selected.photos[0]} alt="" className="w-full h-64 object-cover mb-6 border border-[#E1E1E1]" />
            )}
            {related.length > 0 && (
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002E69] mb-3 ">
                  {t('news_related')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      to={personPath(p)}
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-3 px-3 py-2 bg-[#F0F6FE] border border-[#013D8C]/20 hover:bg-[#002E69] hover:text-white transition-all text-xs font-bold "
                    >
                      <img src={p.photo} alt="" className="w-8 h-8 object-cover" />
                      <span>{L(p.name)}</span>
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
