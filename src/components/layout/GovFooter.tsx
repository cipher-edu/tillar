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
    <footer className="bg-[#013D8C] text-white pt-10 sm:pt-12 pb-6 border-t-4 border-[#002E69] font-sans">
      <div className="gov-shell space-y-10">
        {/* Contact Section Map Banner (Aloqa qismidan keltirilgan to'liq interaktiv xarita) */}
        <div className="bg-[#002E69] border border-white/15 p-4 sm:p-6 lg:p-8 space-y-5 rounded-none shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                Rasmiy Manzil va Joylashuv Xaritasi
              </span>
              <h3 className="text-sm sm:text-lg font-bold text-white uppercase font-sans leading-snug">
                Navoiy davlat universiteti Tillar fakulteti binosi
              </h3>
            </div>
            <a
              href="https://yandex.uz/maps/-/CTfeeSZh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#013D8C] hover:bg-blue-50 font-bold text-xs transition-colors shrink-0 border border-white"
            >
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span>Yandex Xaritada kattaroq ochish</span>
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {/* Interactive Map Embed */}
            <div className="lg:col-span-2 h-60 sm:h-72 md:h-80 w-full overflow-hidden border border-white/20 bg-[#001736] relative rounded-none">
              <iframe
                title="NavDU Tillar fakulteti joylashuvi xaritasi"
                src="https://yandex.uz/map-widget/v1/-/CTfeeSZh"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>

            {/* Direct Contact Info Details from Contact Page */}
            <div className="bg-[#001D42] border border-white/10 p-4 sm:p-5 space-y-4 flex flex-col justify-between text-xs">
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/10 pb-2">
                  Aloqa & Qabul Ma'lumotlari
                </h4>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-blue-200 uppercase font-semibold block">Manzil:</span>
                    <p className="font-semibold text-white leading-tight">{L(contactInfo.address)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-blue-200 uppercase font-semibold block">Ishonch telefoni:</span>
                    <a href="tel:1199" className="font-bold text-white hover:underline">
                      1199 / {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-blue-200 uppercase font-semibold block">Elektron pochta:</span>
                    <a href={`mailto:${contactInfo.email}`} className="font-medium text-white hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-blue-200 uppercase font-semibold block">Ish vaqti:</span>
                    <span className="font-medium text-white">Dushanba – Juma (09:00 – 18:00)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                {contactInfo.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-white/10 hover:bg-white hover:text-[#013D8C] text-white text-[10px] font-bold uppercase transition-colors border border-white/15"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 shrink-0">
                <img
                  src="/logo-navdu.png"
                  alt="Navoiy davlat universiteti logosu"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-white tracking-wider font-sans">
                  NavDU Tillar Fakulteti
                </h3>
                <span className="text-[10px] text-blue-100 block font-medium">Rasmiy ta'lim portali</span>
              </div>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed font-normal">
              Navoiy davlat universiteti Tillar fakulteti ta'lim, ilm-fan va madaniyat sohasida malakali
              kadrlar tayyorlash rasmiy portali.
            </p>
            <div className="text-[10px] text-blue-100 font-mono bg-[#002E69] p-2 rounded-none border border-white/10">
              gov.uz standarti · Platforma v2.0
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1 font-sans">
              Fakultet va Ta'lim
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1 font-sans">
              Talabalar & Jamoa
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li>
                <Link to="/jamoa/professorlar" className="hover:text-white hover:underline transition-colors">
                  · Professor-o'qituvchilar tarkibi
                </Link>
              </li>
              <li>
                <Link to="/jamoa/tyutorlar" className="hover:text-white hover:underline transition-colors">
                  · Fakultet tyutorlari va guruhlar
                </Link>
              </li>
              <li>
                <Link to="/talabalar" className="hover:text-white hover:underline transition-colors">
                  · Talabalar hayoti va stependiyalar
                </Link>
              </li>
              <li>
                <Link to="/ilm-fan" className="hover:text-white hover:underline transition-colors">
                  · Ilmiy tadqiqotlar va xalqaro aloqalar
                </Link>
              </li>
              <li>
                <Link to="/yangiliklar" className="hover:text-white hover:underline transition-colors">
                  · Yangiliklar va e'lonlar
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1 font-sans">
              Tezkor Murojaat
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Savol yoki murojaatingiz bormi? Onlayn murojaat yuborish bo'limi orqali ma'muriyatga bog'laning.
            </p>
            <Link
              to="/aloqa"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#013D8C] hover:bg-blue-50 font-bold text-xs transition-colors w-full justify-center"
            >
              <Mail className="w-4 h-4 text-[#013D8C]" />
              <span>Murojaat Yuborish</span>
            </Link>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-200 font-normal">
          <div className="text-center sm:text-left space-y-1">
            <p>© 2026 Navoiy davlat universiteti Tillar fakulteti. Barcha huquqlar himoyalangan.</p>
            <p className="text-[10px] text-blue-300">
              Veb-sayt materiallaridan foydalanilganda manba ko‘rsatilishi shart.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-3 py-1.5 bg-[#001736] border border-white/15 text-xs text-white font-medium flex items-center gap-1.5 rounded-none font-sans">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Dasturchi: <strong>Oybek Abduraimov</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 bg-[#002E69] hover:bg-white hover:text-[#013D8C] text-white transition-colors border border-white/20 rounded-none shrink-0"
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
