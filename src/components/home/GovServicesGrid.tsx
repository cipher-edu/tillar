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
    <section className="gov-section bg-[#F0F0F0] border-y border-[#E1E1E1] select-none font-sans py-10 sm:py-12">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Interaktiv imkoniyatlar va xizmatlar"
          title="Hayotiy vaziyatlar va interaktiv xizmatlar"
          description="Talabalar, abituriyentlar va o‘qituvchilar uchun rasmiy ta’lim va axborot xizmatlari katalogi"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E1E1E1] bg-white rounded-none">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} to={s.link} className="p-5 sm:p-6 group hover:bg-[#F0F0F0] transition-colors border-r border-b border-[#E1E1E1]">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-11 h-11 rounded-none bg-[#F0F0F0] border border-[#E1E1E1] text-[#013D8C] flex items-center justify-center transition-colors group-hover:bg-[#013D8C] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#707070] group-hover:text-[#013D8C] font-mono transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="inline-block text-[10px] font-bold text-[#013D8C] bg-[#F0F0F0] px-2 py-0.5 rounded-none border border-[#E1E1E1]">
                      {s.badge}
                    </span>
                    <h3 className="text-sm font-bold text-[#000000] group-hover:text-[#013D8C] transition-colors leading-snug font-sans">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#707070] font-normal leading-relaxed line-clamp-2">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E1E1E1] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#013D8C] group-hover:underline font-sans">
                    Batafsil ma&apos;lumot
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#013D8C]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
