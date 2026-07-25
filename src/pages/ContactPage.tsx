import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
      // Backend REST API ga POST so'rov yuborish
      await apiPost('/contact/messages/', form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('[contact] API post bajarilmadi, mailto fallback ishlatiladi:', err);
      // Backend offline bo'lganda mailto fallback
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
    <PageShell title={t('contact_title')} topic="contact">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border border-amber-300/60 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 mb-1 font-ui">{t('contact_map')}</p>
                <p className="text-xl italic font-serif-classic text-slate-900 font-semibold">{L(contactInfo.address)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="text-xl font-serif-classic text-slate-900 font-bold">{contactInfo.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-amber-600 shrink-0" />
              <a href={`mailto:${contactInfo.email}`} className="text-xl font-serif-classic text-slate-900 font-bold hover:text-amber-700 transition-colors">
                {contactInfo.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-amber-400/40 text-[10px] font-black uppercase tracking-widest text-amber-950 hover:gold-gradient hover:text-slate-950 transition-all font-ui bg-white/70 shadow-sm"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {contactInfo.units.map((unit, i) => (
              <div key={i} className="glass-card p-6 rounded-[2rem] border border-amber-200/80 shadow-md hover:border-amber-400 transition-colors">
                <h4 className="font-classic text-xl text-slate-950 font-bold mb-1">{L(unit.name)}</h4>
                <p className="text-slate-700 font-serif-classic italic font-semibold">{unit.phone} · {unit.email}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[3rem] overflow-hidden border-2 border-amber-300/80 h-72 shadow-xl bg-slate-900">
            <iframe
              title="map"
              className="w-full h-full border-0 grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              src="https://yandex.uz/map-widget/v1/-/CTfeeSZh"
            />
          </div>
        </div>

        <div className="glass-card rounded-[3rem] border-2 border-amber-300/60 overflow-hidden shadow-2xl">
          <div className="gold-gradient h-2" />
          <form onSubmit={onSubmit} className="p-8 md:p-12 space-y-6">
            <h3 className="text-3xl md:text-4xl font-classic text-slate-950 font-bold mb-2">{t('contact_form')}</h3>
            <p className="text-base italic font-serif-classic text-slate-700 -mt-2">{t('contact_form_hint')}</p>
            
            {sent && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/50 text-emerald-900 font-serif-classic text-lg flex items-center gap-3 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{t('contact_success')}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/50 text-rose-900 font-serif-classic text-lg flex items-center gap-3 shadow-md">
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900 mb-2 font-ui">
                {t('contact_name')}
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl border border-amber-300/80 bg-white/80 focus:border-amber-500 focus:bg-white outline-none font-serif-classic text-xl text-slate-950 font-semibold shadow-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900 mb-2 font-ui">
                {t('contact_email')}
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl border border-amber-300/80 bg-white/80 focus:border-amber-500 focus:bg-white outline-none font-serif-classic text-xl text-slate-950 font-semibold shadow-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900 mb-2 font-ui">
                {t('contact_subject')}
              </label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl border border-amber-300/80 bg-white/80 focus:border-amber-500 focus:bg-white outline-none font-serif-classic text-xl text-slate-950 font-semibold shadow-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-900 mb-2 font-ui">
                {t('contact_message')}
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl border border-amber-300/80 bg-white/80 focus:border-amber-500 focus:bg-white outline-none font-serif-classic text-xl text-slate-950 font-semibold shadow-sm transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 gold-gradient text-slate-950 rounded-2xl text-[12px] font-black uppercase tracking-[0.25em] font-ui flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {loading ? 'Yuborilmoqda…' : t('contact_send')}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
};
