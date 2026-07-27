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
    <section ref={ref} className="gov-section bg-white select-none">
      <div className="gov-shell">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eff7ff] text-[#043b87] text-[10px] font-extrabold uppercase tracking-[0.14em] rounded-full mb-3 border border-[#b6c6d7]/50">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>2025–2026 o‘quv yili monitoringi</span>
          </div>
          <h2 className="gov-section-title justify-center">Fakultetning asosiy ko‘rsatkichlari</h2>
          <p className="text-xs sm:text-sm text-[#707070] font-medium mt-2">
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
  const isGreen = item.variant === 'green';

  return (
    <div
      className={`gov-stat-box ${isGreen ? 'gov-stat-box--green' : ''} p-4 sm:p-5 text-center group cursor-default`}
    >
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 border shadow-sm transition-transform duration-200 group-hover:scale-110 ${
          isGreen
            ? 'bg-emerald-50 border-emerald-300 text-[#048708]'
            : 'bg-white border-[#b6c6d7] text-[#013d8c]'
        }`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <span
        className={`text-2xl md:text-3xl font-extrabold block leading-none tabular-nums tracking-tight ${
          isGreen ? 'text-[#048708]' : 'text-[#013d8c]'
        }`}
      >
        {count}
        {item.suffix}
      </span>

      <span className="text-[11px] sm:text-xs font-extrabold uppercase text-[#131523] tracking-wider block mt-2">
        {item.label}
      </span>
      <span className="text-[10px] text-[#707070] font-medium block mt-1 leading-snug">{item.sub}</span>
    </div>
  );
};
