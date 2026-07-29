import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Quote, Award, Sparkles, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { rectorInfo, rectorMessage } from '@/data/rector';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

export const GovRectorAddressSection: React.FC = () => {
  const { L } = useLanguage();
  const [open, setOpen] = useState(false);

  const full = L(rectorMessage);

  const { firstHalf, secondHalf } = useMemo(() => {
    const text = full.trim();
    const parts = text.split(/\n\n+/).filter(Boolean);
    if (parts.length >= 2) {
      const mid = Math.ceil(parts.length / 2);
      return {
        firstHalf: parts.slice(0, mid).join('\n\n'),
        secondHalf: parts.slice(mid).join('\n\n'),
      };
    }
    const mid = Math.floor(text.length / 2);
    let splitAt = text.indexOf('. ', mid);
    if (splitAt === -1 || splitAt > text.length - 40) {
      splitAt = text.lastIndexOf('. ', mid);
    }
    if (splitAt === -1) splitAt = mid;
    else splitAt += 1;
    return {
      firstHalf: text.slice(0, splitAt).trim(),
      secondHalf: text.slice(splitAt).trim(),
    };
  }, [full]);

  return (
    <section
      id="rektor-murojaati"
      className="gov-section bg-[#F0F0F0] border-y border-[#E1E1E1] font-sans select-none overflow-hidden relative py-10 sm:py-12"
      aria-labelledby="rector-address-title"
    >
      <div className="gov-shell relative z-10">
        <GovSectionHeader
          kicker="Universitet Rahbariyati Murojaati"
          title="Navoiy davlat universiteti rektorining murojaati"
          description="Oliy ta’lim, ilm-fan, taraqqiyot va zamonaviy yoshlar tarbiyasi borasida universitet strategiyasi"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Rector Official Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-[340px] mx-auto lg:mx-0 lg:sticky lg:top-32 group">
              {/* State Portrait Window with Bottom Overlay */}
              <div
                className="relative overflow-hidden rounded-none border-4 border-white bg-[#013D8C]"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src={rectorInfo.photo}
                  alt={L(rectorInfo.name)}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Shavkat_Mirziyoyev_%282023-09-19%29.jpg';
                    }
                  }}
                />

                {/* Subtle Gradient Shadow at Bottom Only */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#013D8C]/95 via-[#013D8C]/30 to-transparent pointer-events-none" />

                {/* Compact Bottom Text Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-amber-400 text-slate-950 text-[10px] font-bold tracking-wide mb-1 font-sans">
                    <Award className="w-3 h-3 text-slate-950" />
                    <span>Navoiy davlat universiteti rektori</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight font-sans">
                    {L(rectorInfo.name)}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-semibold text-blue-100 font-sans">
                    {L(rectorInfo.title)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-amber-200 font-medium">
                    {L(rectorInfo.university)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Expandable Rector Speech Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="relative border border-[#E1E1E1] bg-white p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* Top Flag Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 uz-flag-line" />
              <Quote className="absolute top-6 right-6 w-24 h-24 text-[#002E69]/5 pointer-events-none stroke-[0.8]" />

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F6FE] text-[#002E69] border border-[#013D8C]/20 text-xs font-extrabold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#013D8C]" />
                <span>Ta’lim, Taraqqiyot Va Yoshlar Kelajagi</span>
              </div>

              {/* First Half Speech Text */}
              <div className="space-y-4 text-base sm:text-lg font-bold leading-relaxed text-slate-800 italic font-serif whitespace-pre-line">
                {firstHalf}
              </div>

              {/* Second Half Expandable Speech Text */}
              <AnimatePresence initial={false}>
                {open && secondHalf && (
                  <motion.div
                    id="rector-message-more"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4 text-base sm:text-lg font-bold leading-relaxed text-slate-800 italic font-serif whitespace-pre-line">
                      {secondHalf}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!open && secondHalf && (
                <div
                  className="pointer-events-none h-16 -mt-10 relative z-[1]"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 70%, rgba(255,255,255,1) 100%)',
                  }}
                  aria-hidden
                />
              )}

              {secondHalf && (
                <div className={`relative z-[2] ${open ? 'mt-6' : 'mt-1'}`}>
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="rector-message-more"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#002E69] text-white text-xs font-black uppercase tracking-wider hover:bg-[#013D8C] transition-all "
                  >
                    <span>{open ? "Murojaatni qisqartirish" : "Murojaatni to‘liq o‘qish"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}

              {/* Signature & Official Designation Bar */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
                <div>
                  <h4 className="text-base font-black text-slate-900 uppercase">
                    {L(rectorInfo.name)}
                  </h4>
                  <p className="text-xs font-extrabold text-[#002E69]">
                    {L(rectorInfo.title)}
                  </p>
                </div>
                <div className="self-start sm:self-auto">
                  <div className="px-4 py-2 bg-[#F0F6FE] text-[#002E69] text-[10px] font-black uppercase tracking-widest border border-[#013D8C]/20 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#013D8C]" />
                    <span>Rasmiy Murojaatnoma</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
