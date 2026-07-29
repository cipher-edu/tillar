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
    <section className="gov-section bg-white border-t border-[#E1E1E1] select-none font-sans py-10 sm:py-12">
      <div className="gov-shell">
        <GovSectionHeader
          kicker="Katalog va tuzilma"
          title="Kafedralar va ta’lim yo‘nalishlari"
        >
          <div className="flex items-center gap-1 p-1 rounded-none bg-[#F0F0F0] border border-[#E1E1E1]">
            <button
              type="button"
              onClick={() => setTab('departments')}
              className={`px-3.5 sm:px-4 py-2 rounded-none text-xs font-semibold transition-colors flex items-center gap-1.5 font-sans ${
                tab === 'departments'
                  ? 'bg-[#013D8C] text-white'
                  : 'text-[#000000] hover:bg-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{departments.length} kafedra</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('programs')}
              className={`px-3.5 sm:px-4 py-2 rounded-none text-xs font-semibold transition-colors flex items-center gap-1.5 font-sans ${
                tab === 'programs'
                  ? 'bg-[#013D8C] text-white'
                  : 'text-[#000000] hover:bg-white'
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
              <div key={dept.id} className="p-5 rounded-none border border-[#E1E1E1] flex flex-col group bg-white hover:bg-[#F0F0F0] transition-colors">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-none bg-[#F0F0F0] text-[#013D8C] flex items-center justify-center border border-[#E1E1E1] transition-colors group-hover:bg-[#013D8C] group-hover:text-white">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#013D8C] bg-[#F0F0F0] px-2.5 py-0.5 rounded-none border border-[#E1E1E1]">
                      Faol
                    </span>
                  </div>

                  <h3 className="text-sm font-black uppercase text-slate-900 leading-snug transition-colors group-hover:text-[#013D8C] ">
                    <Link to={departmentPath(dept.slug)}>{L(dept.name)}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {L(dept.description)}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Ilmiy yo‘nalishlar
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dept.researchAreas.slice(0, 2).map((area, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200 group-hover:bg-[#F0F6FE] group-hover:border-[#013D8C]/30 transition-colors"
                        >
                          {L(area)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={departmentPath(dept.slug)}
                    className="text-xs font-extrabold uppercase text-[#002E69] hover:text-[#013D8C] inline-flex items-center gap-1 group/link "
                  >
                    <span>Kafedra sahifasi</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
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
              <div key={prog.id} className="gov-card p-5 border border-[#E1E1E1] flex flex-col group bg-white">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        prog.level === 'bachelor'
                          ? 'bg-[#F0F6FE] text-[#002E69] border-[#013D8C]/30'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {prog.level === 'bachelor' ? 'Bakalavriat' : 'Magistratura'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      {prog.studyForm === 'evening'
                        ? 'Kechki'
                        : prog.studyForm === 'distance'
                          ? 'Sirtqi'
                          : 'Kunduzgi'}
                    </span>
                  </div>

                  <h3 className="text-sm font-black uppercase text-slate-900 leading-snug transition-colors group-hover:text-[#013D8C] ">
                    <Link to={programPath(prog.slug)}>{L(prog.name)}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {L(prog.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={programPath(prog.slug)}
                    className="text-xs font-extrabold uppercase text-[#002E69] hover:text-[#013D8C] inline-flex items-center gap-1 group/link "
                  >
                    <span>Malaka va reja</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                  <span className="text-[10px] font-semibold text-[#013D8C] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
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
