import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface GovLoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export const GovLoader: React.FC<GovLoaderProps> = ({
  label,
  fullScreen = true,
}) => {
  const { t } = useLanguage();
  const loadingText = label || t('loading') || 'Yuklanmoqda...';

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md font-sans select-none'
    : 'w-full py-16 flex flex-col items-center justify-center font-sans select-none';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={containerClasses}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Smooth Circular Wave Container */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Ring 1 */}
          <div className="absolute inset-0 rounded-full border-2 border-[#013D8C]/20 animate-ping opacity-60" />

          {/* Rotating Dual Circle Ring */}
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#002E69] border-r-[#013D8C] animate-spin" />

          {/* Inner Counter-Rotating Circle */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#013D8C] border-l-[#013D8C] animate-[spin_1.5s_linear_infinite_reverse]" />

          {/* Center Pulsing Circle Badge with NavDU Blue Logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo-navdu.png" alt="NavDU" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* 3 Wave Pulse Dots */}
        <div className="flex items-center gap-1.5 mt-6 mb-2">
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-2.5 h-2.5 bg-[#013D8C]"
          />
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-2.5 h-2.5 bg-[#013D8C]"
          />
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-2.5 h-2.5 bg-[#013D8C]"
          />
        </div>

        {/* Flag line accent */}
        <div className="w-12 h-1 rounded-full uz-flag-line my-2 shadow-2xs" />

        {/* Loading text */}
        <p className="text-xs font-bold uppercase tracking-wider text-[#013D8C] font-sans">
          {loadingText}
        </p>
        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
          Navoiy davlat universiteti Tillar fakulteti portali
        </span>
      </div>
    </motion.div>
  );
};
