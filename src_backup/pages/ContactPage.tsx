import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { useLanguage } from '@/context/LanguageContext';
import { contactInfo } from '@/data/site';

export const ContactPage: React.FC = () => {
  const { t, L } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Tillar fakulteti] ${form.subject}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    const mailto = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <PageShell title={t('contact_title')}>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border-amber-200 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1 font-ui">{t('contact_map')}</p>
                <p className="text-xl italic font-serif-classic text-slate-700">{L(contactInfo.address)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-amber-600" />
              <p className="text-xl font-serif-classic">{contactInfo.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-amber-600" />
              <a href={`mailto:${contactInfo.email}`} className="text-xl font-serif-classic hover:text-amber-800">
                {contactInfo.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-amber-300 text-[10px] font-black uppercase tracking-widest text-amber-900 hover:bg-amber-600 hover:text-white transition-all font-ui"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {contactInfo.units.map((unit, i) => (
              <div key={i} className="glass-card p-6 rounded-[2rem] border-amber-100">
                <h4 className="font-classic text-xl text-slate-900 mb-2">{L(unit.name)}</h4>
                <p className="text-slate-600 font-serif-classic italic">{unit.phone} · {unit.email}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[3rem] overflow-hidden border-2 border-amber-200 h-64 bg-slate-100">
            <iframe
              title="map"
              className="w-full h-full border-0"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=65.35%2C40.08%2C65.42%2C40.12&layer=mapnik&marker=40.10%2C65.38"
            />
          </div>
        </div>

        <div className="glass-card rounded-[3rem] border-amber-200 overflow-hidden">
          <div className="gold-gradient h-1.5" />
          <form onSubmit={onSubmit} className="p-8 md:p-12 space-y-6">
            <h3 className="text-3xl font-classic text-slate-900 mb-2">{t('contact_form')}</h3>
            <p className="text-base italic font-serif-classic text-slate-600 -mt-2">{t('contact_form_hint')}</p>
            {sent && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 italic font-serif-classic text-lg">
                {t('contact_success')}
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2 font-ui">
                {t('contact_name')}
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none font-serif-classic text-xl"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2 font-ui">
                {t('contact_email')}
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none font-serif-classic text-xl"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2 font-ui">
                {t('contact_subject')}
              </label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none font-serif-classic text-xl"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2 font-ui">
                {t('contact_message')}
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none font-serif-classic text-xl resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 royal-gradient text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.25em] font-ui flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <Send className="w-4 h-4" /> {t('contact_send')}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
};
