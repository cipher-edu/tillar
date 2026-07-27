import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUp, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/data/site';

export const GovFooter: React.FC = () => {
  const { L } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#143797] text-white pt-12 pb-6 border-t-4 border-[#013d8c]">
      <div className="gov-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/77/Emblem_of_Uzbekistan.svg"
                  alt="Gerb"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase text-white tracking-wider">
                  NavDU Tillar Fakulteti
                </h3>
                <span className="text-[10px] text-blue-100/80 block">Rasmiy ta'lim portali</span>
              </div>
            </div>
            <p className="text-[11px] text-blue-50/90 leading-relaxed font-normal">
              Navoiy davlat universiteti Tillar fakulteti ta'lim, ilm-fan va madaniyat sohasida malakali
              kadrlar tayyorlash rasmiy portali.
            </p>
            <div className="text-[10px] text-blue-100 font-mono bg-[#0f2d7a] p-2 rounded border border-white/10">
              gov.uz standarti · Platforma v2.0
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1">
              Fakultet va ta'lim
            </h4>
            <ul className="space-y-2 text-xs text-blue-50/90">
              <li>
                <Link to="/fakultet/tarix" className="hover:text-white hover:underline transition-colors">
                  · Tarix va akkreditatsiya
                </Link>
              </li>
              <li>
                <Link to="/fakultet/rahbariyat" className="hover:text-white hover:underline transition-colors">
                  · Universitet va fakultet rahbariyati
                </Link>
              </li>
              <li>
                <Link to="/fakultet/tuzilma" className="hover:text-white hover:underline transition-colors">
                  · 7 ta ixtisoslashtirilgan kafedra
                </Link>
              </li>
              <li>
                <Link to="/talim/yonalishlar" className="hover:text-white hover:underline transition-colors">
                  · Bakalavriat va magistratura
                </Link>
              </li>
              <li>
                <Link to="/talim/oquv-rejalar" className="hover:text-white hover:underline transition-colors">
                  · O'quv rejalar va malaka talablari
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1">
              Bog'lanish
            </h4>
            <ul className="space-y-2 text-xs text-blue-50/90">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                <span>{L(contactInfo.address)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/80 shrink-0" />
                <a href="tel:1199" className="hover:underline font-bold text-white">
                  1199 / {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/80 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/80 shrink-0" />
                <span>Dush–Jum (09:00–18:00)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1">
              Joylashuv
            </h4>
            <div className="w-full h-36 rounded overflow-hidden border border-white/15 bg-[#0f2d7a] relative">
              <iframe
                title="NavDU Xaritasi"
                src="https://yandex.ru/map-widget/v1/?um=constructor%3ACTfeeSZh&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-100/80 font-normal">
          <div className="text-center md:text-left space-y-1">
            <p>© 2026 Navoiy davlat universiteti Tillar fakulteti. Barcha huquqlar himoyalangan.</p>
            <p className="text-[10px] text-blue-100/60">
              Veb-sayt materiallaridan foydalanilganda manba ko'rsatilishi shart.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-[#0f2d7a] border border-white/10 text-[11px] text-white font-medium flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-white/80" />
              <span>
                Dasturchi: <strong>Oybek Abduraimov</strong>
              </span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#013d8c] hover:bg-white hover:text-[#013d8c] text-white transition-colors border border-white/10"
              title="Yuqoriga qaytish"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
