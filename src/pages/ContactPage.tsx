import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Clock, Building2, Globe } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/data/site';
import { apiPost } from '@/lib/api';

export const ContactPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await apiPost('/contact/messages/', form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('[contact] API post error, using mailto fallback:', err);
      const subject = encodeURIComponent(`[Tillar fakulteti] ${form.subject}`);
      const body = encodeURIComponent(
        `${form.message}\n\n—\n${form.name}\n${form.email}`,
      );
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title={t('contact_title')} subtitle="Fakultet ma'muriyati, qabul bo'limi va aloqa ma'lumotlari">
      <div className="grid lg:grid-cols-2 gap-8 font-sans">
        {/* Left Column: Official Contact Info */}
        <div className="space-y-6">
          <div className="bg-[#F0F0F0] border border-[#E1E1E1] p-6 md:p-8 space-y-4 rounded-none">
            <h3 className="text-sm font-bold uppercase text-[#043B87] border-b border-[#E1E1E1] pb-2 font-sans">
              Rasmiy Manzil va Aloqa
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#013D8C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-medium uppercase text-[#707070] block">Manzil:</span>
                <p className="text-xs font-semibold text-[#000000]">{L(contactInfo.address)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#013D8C] shrink-0" />
              <div>
                <span className="text-[10px] font-medium uppercase text-[#707070] block">Ishonch telefoni:</span>
                <a href={`tel:${contactInfo.phone}`} className="text-xs font-bold text-[#013D8C] hover:underline font-sans">
                  1199 / {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#002E69] shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Elektron pochta:</span>
                <a href={`mailto:${contactInfo.email}`} className="text-xs font-semibold text-slate-900 hover:underline">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#002E69] shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block">Ish vaqti:</span>
                <span className="text-xs font-semibold text-slate-900">Dushanba - Juma (09:00 - 18:00)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#013D8C]/20 text-[#002E69] text-[10px] font-bold uppercase hover:bg-[#002E69] hover:text-white transition-colors "
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Department Contact Units */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-slate-700 block ">
              Bo'limlar va Qabul Aloqalari
            </span>
            <div className="grid sm:grid-cols-2 gap-3">
              {contactInfo.units.map((unit, i) => (
                <div key={i} className="gov-card p-4 border border-[#E1E1E1] space-y-1">
                  <h4 className="text-xs font-bold text-[#002E69] uppercase ">{L(unit.name)}</h4>
                  <p className="text-[11px] text-slate-600 font-medium">{unit.phone}</p>
                  <p className="text-[11px] text-slate-500">{unit.email}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="overflow-hidden border border-slate-200 h-64 bg-slate-100">
            <iframe
              title="map"
              className="w-full h-full border-0"
              loading="lazy"
              src="https://yandex.uz/map-widget/v1/-/CTfeeSZh"
            />
          </div>
        </div>

        {/* Right Column: Contact & Murojaat Form */}
        <div className="gov-card p-6 md:p-8 border border-[#E1E1E1] ">
          <div className="border-b-2 border-[#002E69] pb-3 mb-6">
            <span className="text-[10px] font-extrabold uppercase text-[#013D8C] tracking-widest block">
              Rasmiy Qayta Aloqa
            </span>
            <h3 className="text-lg font-black uppercase text-slate-900 mt-0.5 ">
              MUROJAAT VA TAKLIF YUBORISH
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Savol, taklif yoki murojaatingizni yuboring. Tez orada javob qaytariladi.
            </p>
          </div>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold uppercase ">Murojaatingiz Qabul Qilindi!</h4>
              <p className="text-xs">
                Rahmat! Sizning xabaringiz muvaffaqiyatli yuborildi. Mas'ul xodimlarimiz tez orada siz bilan bog'lanishadi.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold uppercase hover:bg-emerald-700 transition-colors "
              >
                Yangi xabar yuborish
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  F.I.Sh. (Ismingiz) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Familiya Ism Sharifingiz"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#002E69] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Elektron Pochta / Telefon *
                </label>
                <input
                  type="text"
                  required
                  placeholder="pochta@domain.uz yoki +998901234567"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#002E69] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Murojaat Mavzusi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Bakalavriat qabuli yoki hujjatlar bo'yicha"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#002E69] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Murojaat Matni *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Savolingiz yoki murojaatingizni batafsil yozing..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#002E69] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#002E69] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#013D8C] transition-colors flex items-center justify-center gap-2 "
              >
                {loading ? (
                  <span>Yuborilmoqda...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Murojaatni Yuborish</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
};
