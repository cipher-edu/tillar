import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChevronRight, GraduationCap } from 'lucide-react';
import { departments } from '@/data/departments';
import { programs } from '@/data/programs';
import { useLanguage } from '@/context/LanguageContext';
import { departmentPath, programPath } from '@/lib/links';
import { GovSectionHeader } from '@/components/ui/GovSectionHeader';

export const GovExplorerSection: React.FC = () => {
  const { L } = useLanguage();
  const [tab, setTab] = useState<'departments' | 'programs'>('departments');

  return (
    <section className="gov-section bg-white border-t border-[#e1e1e1] select-none">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Katalog va tuzilma"
          title="Kafedralar va ta’lim yo‘nalishlari"
        >
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#eff7ff] border border-[#b6c6d7]/60">
            <button
              type="button"
              onClick={() => setTab('departments')}
              className={`px-3.5 sm:px-4 py-2 rounded-md text-[11px] sm:text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === 'departments'
                  ? 'bg-[#013d8c] text-white shadow-gov'
                  : 'text-[#575757] hover:text-[#043b87] hover:bg-white/70'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{departments.length} kafedra</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('programs')}
              className={`px-3.5 sm:px-4 py-2 rounded-md text-[11px] sm:text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                tab === 'programs'
                  ? 'bg-[#013d8c] text-white shadow-gov'
                  : 'text-[#575757] hover:text-[#043b87] hover:bg-white/70'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{programs.length} dastur</span>
            </button>
          </div>
        </GovSectionHeader>

        {tab === 'departments' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {departments.map((dept) => (
              <div key={dept.id} className="gov-card p-5 flex flex-col group">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#eff7ff] text-[#013d8c] flex items-center justify-center border border-[#b6c6d7]/50 transition-all duration-200 group-hover:bg-[#013d8c] group-hover:text-white group-hover:border-[#013d8c] group-hover:scale-105">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#048708] bg-[#f3fbf4] px-2 py-0.5 rounded border border-emerald-200/80">
                      Faol
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold uppercase text-[#131523] leading-snug transition-colors group-hover:text-[#1675e0]">
                    <Link to={departmentPath(dept.slug)}>{L(dept.name)}</Link>
                  </h3>

                  <p className="text-xs text-[#575757] font-medium leading-relaxed line-clamp-2">
                    {L(dept.description)}
                  </p>

                  <div className="pt-2 border-t border-[#f0f0f0] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#939393] uppercase tracking-wider block">
                      Ilmiy yo‘nalishlar
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dept.researchAreas.slice(0, 2).map((area, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#f5f5f5] text-[#424242] px-2 py-0.5 rounded font-medium border border-[#ececec] group-hover:bg-[#eff7ff] group-hover:border-[#d6e6f7] transition-colors"
                        >
                          {L(area)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
                  <Link
                    to={departmentPath(dept.slug)}
                    className="text-xs font-bold uppercase text-[#043b87] hover:text-[#1675e0] inline-flex items-center gap-1 group/link"
                  >
                    <span>Kafedra sahifasi</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="text-[10px] font-bold text-[#939393] whitespace-nowrap">
                    {dept.professorIds.length} professor
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'programs' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {programs.map((prog) => (
              <div key={prog.id} className="gov-card p-5 flex flex-col group">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        prog.level === 'bachelor'
                          ? 'bg-[#eff7ff] text-[#013d8c] border-[#b6c6d7]/60'
                          : 'bg-[#fff8e8] text-[#8a6200] border-[#e8d29a]/80'
                      }`}
                    >
                      {prog.level === 'bachelor' ? 'Bakalavriat' : 'Magistratura'}
                    </span>
                    <span className="text-[10px] text-[#939393] font-semibold uppercase">
                      {prog.studyForm === 'evening'
                        ? 'Kechki'
                        : prog.studyForm === 'distance'
                          ? 'Sirtqi'
                          : 'Kunduzgi'}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold uppercase text-[#131523] leading-snug transition-colors group-hover:text-[#1675e0]">
                    <Link to={programPath(prog.slug)}>{L(prog.name)}</Link>
                  </h3>

                  <p className="text-xs text-[#575757] font-medium leading-relaxed line-clamp-2">
                    {L(prog.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
                  <Link
                    to={programPath(prog.slug)}
                    className="text-xs font-bold uppercase text-[#043b87] hover:text-[#1675e0] inline-flex items-center gap-1 group/link"
                  >
                    <span>Malaka va reja</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="text-[10px] font-semibold text-[#048708] bg-[#f3fbf4] px-2 py-0.5 rounded border border-emerald-200/70">
                    Qabul ochiq
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
