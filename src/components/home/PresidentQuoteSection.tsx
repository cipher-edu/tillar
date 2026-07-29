import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Award, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Bookmark, ExternalLink } from 'lucide-react';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

const PRESIDENT_QUOTES = [
  {
    id: 'quote-1',
    category: 'Xorijiy Tillarni O‘rganish va Islohotlar',
    text: '«Biz yangi O‘zbekistonni barpo etishda ta’lim va tarbiya sohasini, ilmiy-tadqiqot ishlarini, xorijiy tillarni puxta o‘rganishni eng ustuvor va strategik yo‘nalish deb bilamiz. Zamonaviy bilimlarni hamda xalqaro tillarni mukammal egallagan izlanuvchan yoshlarimiz — kelajagimiz va islohotlarimizning eng ishonchli tayanchidir.»',
    source: 'O‘zbekiston Respublikasi Prezidentining Oliy Majlisga Murojaatnomasidan',
    link: 'https://president.uz/oz/site/events',
    badge: 'Xorijiy Tillar Siyosati',
    image: '/images/president/lang-1.jpg',
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
  const current = PRESIDENT_QUOTES[activeIndex];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRESIDENT_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActiveIndex((prev) => (prev === 0 ? PRESIDENT_QUOTES.length - 1 : prev - 1));
  const next = () => setActiveIndex((prev) => (prev + 1) % PRESIDENT_QUOTES.length);

  return (
    <section className="gov-section bg-[#013D8C] text-white font-sans select-none overflow-hidden relative py-12 sm:py-16">
      <div className="gov-shell relative z-10">
        {/* Top Header & Interactive Category Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 block font-sans">
                O‘zbekiston Respublikasi Prezidentining
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-white font-sans">
                Ta’lim, Ilm-Fan, O‘zbek va Xorijiy Tillar borasidagi fikrlari
              </h2>
            </div>
          </div>

          {/* Interactive Quote Indicator Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PRESIDENT_QUOTES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-none text-xs font-bold transition-colors whitespace-nowrap font-sans ${
                  activeIndex === idx
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                0{idx + 1}. {q.category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.05] backdrop-blur-2xl border border-amber-400/40 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <Quote className="absolute right-4 top-4 w-32 h-32 text-white/5 pointer-events-none stroke-[0.8]" />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* BRAND NEW CREATIVE PORTRAIT CARD: Spherical Gold Ring Badge */}
            <div className="relative shrink-0 flex flex-col items-center">
              {/* Outer Pulsing Aura */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-400 via-[#013D8C] to-amber-300 opacity-50 blur-xl animate-pulse" />

              {/* Oval Golden Crown Portrait Ring */}
              <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-[3rem] p-1.5 bg-gradient-to-b from-amber-400 via-white/40 to-amber-400 border-2 border-white/60">
                <div className="w-full h-full rounded-[2.6rem] overflow-hidden relative bg-slate-900 ">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id}
                      initial={{ opacity: 0, scale: 1.15, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ duration: 0.45 }}
                      src={current.image}
                      alt="Shavkat Mirziyoyev"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Shavkat_Mirziyoyev_%282023-09-19%29.jpg';
                        }
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#013D8C]/95 via-[#002E69]/70 to-transparent p-2 text-center">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-amber-300 ">
                      O‘zbekiston Respublikasi Prezidenti
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Gold Seal */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-[10px] font-black uppercase tracking-wider ">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Shavkat Mirziyoyev</span>
              </div>
            </div>

            {/* Quote Content Showcase */}
            <div className="flex-1 min-w-0 space-y-5 text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider ">
                    <span>{current.category}</span>
                  </div>

                  <blockquote className="relative">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-blue-50 italic font-serif">
                      {current.text}
                    </p>
                  </blockquote>

                  <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium ">
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-amber-300 hover:text-white hover:underline inline-flex items-center gap-1.5 transition-colors group/link text-center sm:text-left cursor-pointer"
                      title="Rasmiy manbani ko‘rish (president.uz)"
                    >
                      <span>— {current.source}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover/link:translate-x-0.5 transition-transform shrink-0" />
                    </a>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/70 px-3 py-1 border border-emerald-400/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {current.badge}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Progress Bar & Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {PRESIDENT_QUOTES.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-colors "
                aria-label="Oldingi iqtibos"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-black text-amber-300 tabular-nums px-2 ">
                0{activeIndex + 1} / 0{PRESIDENT_QUOTES.length}
              </span>
              <button
                onClick={next}
                className="w-9 h-9 bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-colors "
                aria-label="Keyingi iqtibos"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
