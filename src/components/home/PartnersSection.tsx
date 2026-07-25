import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { partners } from '@/data/site';
import { HERITAGE_MANUSCRIPT_URL, PATTERNS } from '@/components/ui/PatternBackground';
import type { Partner } from '@/types';

/**
 * Xalqaro hamkorlar — zamonaviy global tarmoq + Alisher Navoiy davri merosi.
 * Fon: to‘q royal, oltin islimiy naqsh, qo‘lyozma wash, yumshoq “globus” glow.
 */

function PartnerCard({ p, reverse }: { p: Partner; reverse?: boolean }) {
  return (
    <div
      className={`group relative w-[220px] sm:w-[240px] h-[120px] shrink-0 rounded-[1.75rem] overflow-hidden
        border border-amber-500/25 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent
        backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]
        hover:border-amber-400/50 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.35)]
        transition-all duration-500 ${reverse ? '' : ''}`}
    >
      {/* Navoiy-uslub burchak ornament */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-amber-400/40 rounded-tl-[1.75rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-amber-400/40 rounded-br-[1.75rem] pointer-events-none" />
      {/* Yengil manuscript corner */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c]/80 via-transparent to-transparent pointer-events-none" />

      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <span className="font-classic text-xl sm:text-2xl tracking-[0.2em] text-transparent bg-clip-text gold-gradient font-black">
          {p.logoText}
        </span>
        <span className="mt-2 text-[11px] sm:text-xs font-serif-classic italic text-amber-100/75 line-clamp-2 leading-snug">
          {p.name}
        </span>
        {p.country && (
          <span className="mt-2 text-[9px] font-black uppercase tracking-[0.25em] text-amber-500/70 font-ui">
            {p.country}
          </span>
        )}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration = 40,
}: {
  items: Partner[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-2">
      <div
        className={`flex gap-5 min-w-max px-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((p, i) => (
          <PartnerCard key={`${p.id}-${reverse ? 'r' : 'f'}-${i}`} p={p} reverse={reverse} />
        ))}
      </div>
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#001a2c] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#001a2c] to-transparent z-10" />
    </div>
  );
}

export const PartnersSection: React.FC = () => {
  const { t } = useLanguage();
  const rowA = partners;
  const rowB = [...partners].reverse();

  return (
    <section
      id="xalqaro-hamkorlar"
      className="relative overflow-hidden py-24 md:py-32 text-white"
      aria-labelledby="partners-title"
    >
      {/* ——— Fon: zamonaviy globus + Navoiy merosi ——— */}
      <div className="absolute inset-0 bg-[#001018]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a2c] via-[#001524] to-[#0a1628]" />

      {/* Qo‘lyozma (Navoiy davri) */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.35) contrast(0.9)',
        }}
      />

      {/* Girih + oltin romb (islimiy) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: PATTERNS.girih, backgroundSize: '200px 200px' }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] animated-pattern pointer-events-none"
        style={{ backgroundImage: PATTERNS.diamond, backgroundSize: '100px 100px' }}
      />

      {/* Zamonaviy “globus” orbit chiziqlari */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] pointer-events-none opacity-30">
        <div className="absolute inset-0 rounded-full border border-amber-500/20" />
        <div className="absolute inset-[12%] rounded-full border border-amber-400/15 border-dashed" />
        <div className="absolute inset-[28%] rounded-full border border-amber-500/10" />
        <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Soft glows */}
      <div className="absolute -top-20 left-1/4 w-72 h-72 bg-amber-600/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[rgba(0,77,97,0.35)] blur-[110px] rounded-full pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-gradient opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Sarlavha bloki */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-300 text-[10px] font-black uppercase tracking-[0.4em] font-ui mb-6"
          >
            <Globe2 className="w-3.5 h-3.5" />
            {t('partners_badge')}
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>

          <motion.h2
            id="partners-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-classic uppercase tracking-widest text-transparent bg-clip-text gold-gradient leading-tight"
          >
            {t('home_partners')}
          </motion.h2>

          {/* Navoiy va zamon — o‘rtadagi islimiy chiziq */}
          <div className="flex items-center justify-center gap-4 mt-6 mb-5">
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="text-amber-400/80 text-lg tracking-[0.4em]">✧ ❦ ✧</span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg md:text-2xl italic font-serif-classic text-amber-100/75 leading-relaxed"
          >
            <span className="text-amber-400 not-italic">“</span>
            {t('partners_navoi_quote')}
            <span className="text-amber-400 not-italic">”</span>
          </motion.p>
          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.35em] text-amber-500/60 font-ui">
            {t('partners_navoi_author')}
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-sm md:text-base font-ui text-slate-300/70 leading-relaxed">
            {t('partners_subtitle')}
          </p>
        </div>

        {/* Ikki qator marquee — global oqim */}
        <div className="space-y-5">
          <MarqueeRow items={rowA} duration={45} />
          <MarqueeRow items={rowB} reverse duration={52} />
        </div>

        {/* Pastki bridge strip: Sharq — G‘arb */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-16 relative rounded-[2rem] border border-amber-500/20 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a2c]/90 via-[#001a2c]/70 to-[#001a2c]/90" />
          <div className="relative px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center shadow-lg border border-amber-200/30">
                <span className="font-classic font-black text-slate-950 text-lg">AN</span>
              </div>
              <div>
                <p className="font-classic text-amber-100 text-lg md:text-xl tracking-wide">
                  {t('partners_bridge_title')}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/70 font-ui mt-1">
                  {t('partners_bridge_sub')}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] font-ui text-amber-200/80">
              <span className="px-4 py-2 rounded-full border border-amber-500/25 bg-white/5">{t('partners_tag_europe')}</span>
              <span className="px-4 py-2 rounded-full border border-amber-500/25 bg-white/5">{t('partners_tag_asia')}</span>
              <span className="px-4 py-2 rounded-full border border-amber-500/25 bg-white/5">{t('partners_tag_cis')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
