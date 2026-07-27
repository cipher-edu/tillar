import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  FileText,
  Globe,
  GraduationCap,
  Users,
} from 'lucide-react';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

const services = [
  {
    title: "Bakalavriat yo'nalishlari",
    desc: "8 kunduzgi, 2 kechki, 1 sirtqi ta'lim yo'nalishi bo'yicha qabul va tartib",
    icon: GraduationCap,
    link: '/talim/yonalishlar',
    badge: "11 yo'nalish",
  },
  {
    title: 'Magistratura mutaxassisliklari',
    desc: "3 mutaxassislik bo'yicha chuqurlashtirilgan ilmiy va amaliy ta'lim dasturlari",
    icon: BookOpen,
    link: '/talim/yonalishlar',
    badge: '3 mutaxassislik',
  },
  {
    title: "O'quv rejalar va dasturlar",
    desc: "Davlat ta'lim standartlari hamda barcha fanlar ishchi dasturlari katalogi",
    icon: FileText,
    link: '/talim/oquv-rejalar',
    badge: 'Dasturlar',
  },
  {
    title: "Professor-o'qituvchilar",
    desc: "148 nafar professor va 7 ta ixtisoslashtirilgan kafedra o'qituvchilar jamoasi",
    icon: Users,
    link: '/jamoa/professorlar',
    badge: '148 ustoz',
  },
  {
    title: 'Ilmiy loyihalar · Scopus / WoS',
    desc: "Xalqaro bazalardagi 12 xorijiy va 74 OAK darajali ilmiy maqolalar",
    icon: Award,
    link: '/ilm-fan',
    badge: 'Scopus / WoS',
  },
  {
    title: 'Xalqaro hamkorlik · ACQUIN',
    desc: "9 ta xorijiy OTM bilan sheriklik hamda xalqaro sifat akkreditatsiyasi",
    icon: Globe,
    link: '/fakultet/tarix',
    badge: 'ACQUIN',
  },
];

export const GovServicesGrid: React.FC = () => {
  return (
    <section className="gov-section gov-pattern-soft border-y border-[#e1e1e1] select-none">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Interaktiv imkoniyatlar va xizmatlar"
          title="Hayotiy vaziyatlar va interaktiv xizmatlar"
          description="Talabalar, abituriyentlar va o‘qituvchilar uchun rasmiy ta’lim va axborot xizmatlari katalogi"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#e1e1e1] bg-white shadow-gov rounded-lg overflow-hidden">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} to={s.link} className="gov-card-service p-5 sm:p-6 group">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#eff7ff] border border-[#b6c6d7]/60 text-[#013d8c] flex items-center justify-center transition-all duration-200 group-hover:bg-[#013d8c] group-hover:text-white group-hover:border-[#013d8c] group-hover:scale-105 group-hover:rotate-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-[#a8a8a8] group-hover:text-[#013d8c] uppercase tracking-[0.16em] font-mono transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-[#013d8c] bg-[#eff7ff] px-2 py-0.5 rounded border border-[#d6e6f7] group-hover:bg-white group-hover:border-[#048708]/30 transition-colors">
                      {s.badge}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase text-[#131523] group-hover:text-[#048708] transition-colors leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#575757] font-medium leading-relaxed line-clamp-2">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#043b87] group-hover:text-[#048708] transition-colors">
                    Batafsil ma&apos;lumot
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#f5f5f5] text-[#575757] group-hover:bg-[#048708] group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
