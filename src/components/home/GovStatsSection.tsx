import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Building2,
  Globe,
  GraduationCap,
  TrendingUp,
  Users,
} from 'lucide-react';
import { stats, facultyFacts } from '@/data/site';

function useCountUp(target: number, enabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const steps = 36;
    const timer = setInterval(() => {
      frame += 1;
      setCount(Math.round((target * frame) / steps));
      if (frame >= steps) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [target, enabled]);

  return count;
}

const items = [
  {
    key: 'students',
    label: 'Talabalar',
    sub: `${facultyFacts.bachelorStudents} bakalavr, ${facultyFacts.masterStudents} magistr`,
    icon: Users,
    value: stats.students,
    suffix: '+',
    variant: 'default' as const,
  },
  {
    key: 'professors',
    label: "O'qituvchilar",
    sub: `${facultyFacts.staffDoctors} DSc, ${facultyFacts.staffCandidates} PhD / dotsent`,
    icon: GraduationCap,
    value: stats.professors,
    suffix: '',
    variant: 'default' as const,
  },
  {
    key: 'science',
    label: 'Ilmiy salohiyat',
    sub: "O'zbek tilshunosligi 100%",
    icon: Award,
    value: facultyFacts.scientificPotentialPercent,
    suffix: '%',
    variant: 'green' as const,
  },
  {
    key: 'departments',
    label: 'Kafedralar',
    sub: "Ixtisoslashtirilgan bo'limlar",
    icon: Building2,
    value: facultyFacts.departments,
    suffix: '',
    variant: 'default' as const,
  },
  {
    key: 'programs',
    label: 'Dasturlar',
    sub: '11 bakalavr, 3 magistr',
    icon: BookOpen,
    value: stats.programs,
    suffix: '',
    variant: 'default' as const,
  },
  {
    key: 'partners',
    label: 'Xalqaro OTM',
    sub: 'Xalqaro shartnomalar',
    icon: Globe,
    value: stats.partners,
    suffix: '',
    variant: 'default' as const,
  },
];

export const GovStatsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="gov-section bg-white select-none font-sans py-10 sm:py-12 border-b border-[#E1E1E1]">
      <div className="gov-shell">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F0F0] text-[#013D8C] text-xs font-semibold rounded-none mb-3 border border-[#E1E1E1]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2025–2026 o‘quv yili monitoringi</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-[#043B87] font-sans justify-center">Fakultetning asosiy ko‘rsatkichlari</h2>
          <p className="text-xs sm:text-sm text-[#707070] font-normal mt-2">
            Ilmiy salohiyat, ta’lim va xalqaro munosabatlardagi rasmiy statistika
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item) => (
            <StatCard key={item.key} item={item} enabled={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{
  item: (typeof items)[number];
  enabled: boolean;
}> = ({ item, enabled }) => {
  const count = useCountUp(item.value, enabled);
  const Icon = item.icon;

  return (
    <div
      className="p-4 sm:p-5 text-center group cursor-default rounded-none border border-[#E1E1E1] bg-white transition-colors hover:bg-[#F0F0F0]"
    >
      <div
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-[#F0F0F0] border border-[#E1E1E1] text-[#013D8C] flex items-center justify-center mx-auto mb-3 transition-colors group-hover:bg-[#013D8C] group-hover:text-white"
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <span
        className="text-2xl md:text-3xl font-black block leading-none tabular-nums tracking-tight font-sans text-[#013D8C]"
      >
        {count}
        {item.suffix}
      </span>

      <span className="text-xs font-bold text-[#000000] block mt-2 font-sans">
        {item.label}
      </span>
      <span className="text-[10px] text-[#707070] font-medium block mt-1 leading-snug">{item.sub}</span>
    </div>
  );
};
