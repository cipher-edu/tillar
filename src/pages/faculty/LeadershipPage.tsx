import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Award,
  ArrowRight,
  Search,
  Users,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { PageShell } from '@/components/ui/PageShell';
import { PersonProfile } from '@/components/people/PersonProfile';
import { useLanguage } from '@/context/LanguageContext';
import { getPeopleByRole, getPerson } from '@/data/people';
import type { Person } from '@/types';
import { personPath } from '@/lib/links';

type LeaderCategory = 'all' | 'dekanat' | 'kafedra';

export const LeadershipPage: React.FC = () => {
  const { t, L } = useLanguage();
  const { slug } = useParams();
  const [category, setCategory] = useState<LeaderCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const leaders = getPeopleByRole('leader');
  const byOrder = (a: Person, b: Person) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99);

  const uniLeaders = useMemo(
    () => leaders.filter((p) => p.leadershipLevel === 'university').sort(byOrder),
    [leaders],
  );
  const facultyLeaders = useMemo(
    () => leaders.filter((p) => p.leadershipLevel === 'faculty').sort(byOrder),
    [leaders],
  );

  const dean = uniLeaders[0] || leaders[0];

  const filteredLeaders = useMemo(() => {
    let list =
      category === 'dekanat'
        ? uniLeaders
        : category === 'kafedra'
          ? facultyLeaders
          : [...uniLeaders, ...facultyLeaders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          L(p.name).toLowerCase().includes(q) ||
          (p.position && L(p.position).toLowerCase().includes(q)) ||
          (p.degree && L(p.degree).toLowerCase().includes(q)),
      );
    }
    return list;
  }, [category, facultyLeaders, L, searchQuery, uniLeaders]);

  const detail = slug ? getPerson(slug) : null;

  if (detail && detail.roles.includes('leader')) {
    return (
      <PageShell title={L(detail.name)} subtitle={L(detail.position ?? { uz: '', ru: '', en: '' })}>
        <div className="mb-6 font-sans">
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#013D8C] hover:underline bg-[#F0F0F0] px-4 py-2 border border-[#E1E1E1] rounded-none"
          >
            ← {t('back')}
          </Link>
        </div>
        <div className="p-6 md:p-8 border border-[#E1E1E1] bg-white rounded-none">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_leadership')} subtitle="Universitet va fakultet rahbariyati, dekanat va kafedra mudirlari">
      <div className="space-y-8 font-sans">
        {/* Spotlight Dean Profile Card matching gov.uz */}
        {dean && (
          <div className="gov-card p-6 md:p-8 bg-gradient-to-r from-white to-[#F0F6FE] border-l-4 border-l-[#002E69] border border-[#E1E1E1] ">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-36 h-48 overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                <img src={dean.photo} alt={L(dean.name)} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="inline-block px-3 py-1 bg-[#002E69] text-white text-[10px] font-bold uppercase tracking-wider ">
                  {L(dean.position)}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase ">
                  {L(dean.name)}
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  {dean.degree ? L(dean.degree) : 'Oliy ma’lumotli'}
                </p>

                <div className="pt-2 text-xs text-slate-700 space-y-1.5 border-t border-slate-200">
                  <p>🗓 <strong>Qabul kunlari:</strong> {dean.officeHours ? L(dean.officeHours) : 'Seshanba, Payshanba (14:00-17:00)'}</p>
                  <p>📞 <strong>Telefon:</strong> {dean.phone || '+998 (79) 221-88-00'}</p>
                  <p>✉️ <strong>Email:</strong> {dean.email || 'dekanat@navdu.uz'}</p>
                </div>

                <div className="pt-2">
                  <Link
                    to={personPath(dean)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002E69] text-white text-xs font-bold uppercase hover:bg-[#013D8C] transition-colors "
                  >
                    <span>Batafsil biografiya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#F8FAFC] p-4 border border-[#E1E1E1]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                category === 'all' ? 'bg-[#002E69] text-white ' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setCategory('dekanat')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                category === 'dekanat' ? 'bg-[#002E69] text-white ' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Dekanat
            </button>
            <button
              onClick={() => setCategory('kafedra')}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                category === 'kafedra' ? 'bg-[#002E69] text-white ' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Kafedra Mudirlari
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="F.I.Sh. yoki lavozim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-slate-200 focus:outline-none focus:border-[#002E69]"
            />
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaders.map((person) => (
            <div key={person.id} className="gov-card p-5 border border-[#E1E1E1] flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-24 h-32 mx-auto overflow-hidden border border-slate-200 bg-slate-100 ">
                  <img src={person.photo} alt={L(person.name)} className="w-full h-full object-cover" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-[#002E69] uppercase tracking-wider block">
                    {person.position ? L(person.position) : 'Rahbariyat'}
                  </span>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-[#013D8C] transition-colors ">
                    <Link to={personPath(person)}>{L(person.name)}</Link>
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {person.degree ? L(person.degree) : 'Oliy ma’lumotli'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  to={personPath(person)}
                  className="w-full inline-flex items-center justify-center gap-1 py-2 bg-[#F0F6FE] text-[#002E69] text-[11px] font-bold uppercase hover:bg-[#002E69] hover:text-white transition-colors"
                >
                  <span>Batafsil ma'lumot</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};
