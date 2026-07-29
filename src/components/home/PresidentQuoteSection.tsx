import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

const PRESIDENT_QUOTES = [
  {
    id: 'quote-1',
    category: 'Xorijiy Tillarni O‘rganish va Islohotlar',
    text: '«Biz yangi O‘zbekistonni barpo etishda ta’lim va tarbiya sohasini, ilmiy-tadqiqot ishlarini, xorijiy tillarni puxta o‘rganishni eng ustuvor va strategik yo‘nalish deb bilamiz. Zamonaviy bilimlarni hamda xalqaro tillarni mukammal egallagan izlanuvchan yoshlarimiz — kelajagimiz va islohotlarimizning eng ishonchli tayanchidir.»',
    source: 'O‘zbekiston Respublikasi Prezidentining Oliy Majlisga Murojaatnomasidan',
    link: 'https://president.uz/oz/site/events',
    badge: 'Xorijiy Tillar Siyosati',
    image: '/images/president/lang-3.jpg',
  },
  {
    id: 'quote-2',
    category: 'O‘zbek Tili Va Milliy Qadriyatlar',
    text: '«O‘zbek tili — xalqimizning milliy g‘ururi, ma’naviyatimiz va o‘zligimiz timsolidir. Tilimizni chuqur o‘rganish, uni xalqaro miqyosda keng targ‘ib etish hamda yoshlarimizda ana shu boy merosga nisbatan yuksak hurmat tuyg‘usini shakllantirish barchamizning sharafli burchimizdir.»',
    source: 'O‘zbek Tili Bayrami Kuniga Bag‘ishlangan Rasmiy Tabrikdan',
    link: 'https://president.uz/oz/site/speeches',
    badge: 'O‘zbek Tili Va Milliy G‘urur',
    image: '/images/president/edu-1b.jpg',
  },
  {
    id: 'quote-3',
    category: 'Oliy Ta’lim Va Ilm-Fan Salohiyati',
    text: '«Bugun ilm-fan va innovatsiyasiz birorta sohani rivojlantirib bo‘lmaydi. Dunyo tajribasi shuni ko‘rsatadiki, qaysi davlat ilm-fanga, kadrlar tayyorlashga va zamonaviy texnologiyalarga sarmoya kiritsa, albatta yuksak marralarni zabt etadi.»',
    source: 'Oliy Ta’lim Muassasalari Rektorlari Va Ota-onalar Bilan Uchrashuvdan',
    link: 'https://president.uz/oz/site/events',
    badge: 'Ilm-Fan Va Kadrlar Salohiyati',
    image: '/images/president/edu-2b.jpg',
  },
  {
    id: 'quote-4',
    category: 'Jahondan Olingan Bilim Va Tarjima',
    text: '«Xorijiy tillarni bilish — jahon sivilizatsiyasi va jahon ilm-faniga yo‘l ochadi. Chet tillarini mukammal bilgan mutassis dunyo tajribasini o‘rganadi, ilg‘or g‘oyalarni yurtimizga olib kiradi hamda milliy manfaatlarimizni xalqaro maydonda munosib himoya qiladi.»',
    source: 'Xorijiy Tillarni O‘rganishni Ommalashtirishga Bag‘ishlangan Videoselektor Yig‘ilishidan',
    link: 'https://president.uz/oz/site/events',
    badge: 'Xalqaro Intekratsiya',
    image: '/images/president/lang-3.jpg',
  },
  {
    id: 'quote-5',
    category: 'Uchinchi Renessans Va Yoshlar',
    text: '«Uchinchi Renessans poydevorini barpo etishda ma’rifatli, bilimli va bir necha tillarda erkin muloqot qila oladigan yangi avlod hal qiluvchi kuch bo‘ladi. Har bir yosh kamida ikkita xorijiy til va bitta zamonaviy kasbni egallashi shart.»',
    source: 'Yoshlar Forumidagi Nutqidan',
    link: 'https://president.uz/oz/site/speeches',
    badge: 'Uchinchi Renessans',
    image: '/images/president/lang-extra.jpg',
  },
];

export const PresidentQuoteSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = PRESIDENT_QUOTES[activeIndex];

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRESIDENT_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setActiveIndex((p) => (p === 0 ? PRESIDENT_QUOTES.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p + 1) % PRESIDENT_QUOTES.length);

  return (
    <section
      className="gov-section bg-white font-sans select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="gov-shell">
        <GovSectionHeader
          kicker="O‘zbekiston Respublikasi Prezidentining"
          title="Ta’lim, ilm-fan, o‘zbek va xorijiy tillar borasidagi fikrlari"
        />

        {/* Document-style topic tabs */}
        <div className="flex items-stretch gap-0 overflow-x-auto scrollbar-none border-b border-[#E1E1E1] mb-8 -mt-2">
          {PRESIDENT_QUOTES.map((q, idx) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                activeIndex === idx
                  ? 'border-[#013D8C] text-[#013D8C]'
                  : 'border-transparent text-[#707070] hover:text-[#013D8C]'
              }`}
            >
              <span className="tabular-nums opacity-60 mr-1.5">0{idx + 1}</span>
              {q.badge}
            </button>
          ))}
        </div>

        {/* Editorial pull-quote layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Portrait medallion + attribution */}
          <div className="lg:col-span-3 flex lg:flex-col items-center gap-4 lg:gap-0 lg:sticky lg:top-24">
            {/* Rotating photo card */}
            <div className="w-24 sm:w-32">
              <div className="relative w-24 h-32 sm:w-32 sm:h-40 border border-[#013D8C]/30 overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    src={current.image}
                    alt="Shavkat Mirziyoyev — O‘zbekiston Respublikasi Prezidenti"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Shavkat_Mirziyoyev_%282023-09-19%29.jpg';
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>

              {/* Mini slider dots for the photo card */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {PRESIDENT_QUOTES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 transition-all duration-300 ${
                      activeIndex === idx ? 'w-4 bg-[#013D8C]' : 'w-1 bg-[#013D8C]/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:mt-3 lg:text-left">
              <span className="text-sm font-extrabold text-[#000000] block">Shavkat Mirziyoyev</span>
              <span className="text-xs text-[#707070] block">O‘zbekiston Respublikasi Prezidenti</span>
              <div className="hidden lg:block h-px w-10 bg-amber-400 mt-4" />
            </div>
          </div>

          {/* Quote content */}
          <div className="lg:col-span-9 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-10 h-10 text-[#013D8C]/20 mb-2" fill="currentColor" />

                <blockquote>
                  <p className="text-xl sm:text-2xl md:text-[1.75rem] font-medium leading-snug text-[#000000] font-serif">
                    {current.text}
                  </p>
                </blockquote>

                <div className="mt-6 pt-4 border-t border-[#E1E1E1] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#013D8C] hover:underline inline-flex items-center gap-1.5"
                    title="Rasmiy manbani ko‘rish (president.uz)"
                  >
                    <span>— {current.source}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={prev}
                      className="w-8 h-8 border border-[#E1E1E1] text-[#013D8C] flex items-center justify-center hover:bg-[#013D8C] hover:text-white hover:border-[#013D8C] transition-colors"
                      aria-label="Oldingi iqtibos"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-semibold text-[#707070] tabular-nums">
                      0{activeIndex + 1} / 0{PRESIDENT_QUOTES.length}
                    </span>
                    <button
                      type="button"
                      onClick={next}
                      className="w-8 h-8 border border-[#E1E1E1] text-[#013D8C] flex items-center justify-center hover:bg-[#013D8C] hover:text-white hover:border-[#013D8C] transition-colors"
                      aria-label="Keyingi iqtibos"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
