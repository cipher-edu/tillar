import React from 'react';
import { Bell } from 'lucide-react';

export const GovMarquee: React.FC = () => {
  return (
    <div className="bg-[#002E69] text-white text-xs py-1.5 overflow-hidden border-b border-[#013D8C] relative flex items-center font-sans">
      <div className="bg-[#002E69] z-10 px-3 font-bold flex items-center gap-1.5 shrink-0 ">
        <Bell className="w-3.5 h-3.5 text-white" />
        <span className="uppercase text-[10px] tracking-wider text-white/95 ">E'lonlar:</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <div className="animate-gov-ticker text-[11px] font-medium tracking-wide">
          <span className="mx-6">
            Platforma sinov tariqasida ishga tushirilgan: NavDU Tillar fakulteti rasmiy veb-portali.
          </span>
          <span className="mx-6">
            2025–2026 o'quv yili: 3394 nafar talaba, ilmiy salohiyat 40%.
          </span>
          <span className="mx-6">
            Xalqaro akkreditatsiya: ingliz va rus tili yo'nalishlari ACQUIN sertifikatiga ega.
          </span>
          <span className="mx-6">
            Matn xatoligi topsangiz, belgilang va Ctrl + Enter bosing.
          </span>
          {/* duplicate for seamless loop */}
          <span className="mx-6">
            Platforma sinov tariqasida ishga tushirilgan: NavDU Tillar fakulteti rasmiy veb-portali.
          </span>
          <span className="mx-6">
            2025–2026 o'quv yili: 3394 nafar talaba, ilmiy salohiyat 40%.
          </span>
          <span className="mx-6">
            Xalqaro akkreditatsiya: ingliz va rus tili yo'nalishlari ACQUIN sertifikatiga ega.
          </span>
          <span className="mx-6">
            Matn xatoligi topsangiz, belgilang va Ctrl + Enter bosing.
          </span>
        </div>
      </div>
    </div>
  );
};
