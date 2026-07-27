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
        <div className="mb-6">
          <Link
            to="/fakultet/rahbariyat"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#043b87] hover:underline bg-[#eff7ff] px-4 py-2 rounded border border-blue-200"
          >
            ← {t('back')}
          </Link>
        </div>
        <div className="gov-card rounded-lg p-6 md:p-8">
          <PersonProfile person={detail} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('nav_leadership')} subtitle="Universitet va fakultet rahbariyati, dekanat va kafedra mudirlari">
      <div className="space-y-8">
        {/* Spotlight Dean Profile Card matching gov.uz */}
        {dean && (
          <div className="gov-card p-6 md:p-8 rounded-lg bg-gradient-to-r from-white to-[#eff7ff] border-l-4 border-l-[#043b87]">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-36 h-48 rounded overflow-hidden border border-gray-300 shadow-md shrink-0 bg-gray-100">
                <img src={dean.photo} alt={L(dean.name)} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="inline-block px-3 py-1 bg-[#043b87] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  {L(dean.position)}
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 uppercase">
                  {L(dean.name)}
                </h2>
                <p className="text-xs font-semibold text-gray-600">
                  {dean.degree ? L(dean.degree) : 'Oliy ma’lumotli'}
                </p>

                <div className="pt-2 text-xs text-gray-700 space-y-1.5 border-t border-gray-200">
                  <p>🗓 <strong>Qabul kunlari:</strong> {dean.officeHours ? L(dean.officeHours) : 'Seshanba, Payshanba (14:00-17:00)'}</p>
                  <p>📞 <strong>Telefon:</strong> {dean.phone || '+998 (79) 221-88-00'}</p>
                  <p>✉️ <strong>Email:</strong> {dean.email || 'dekanat@navdu.uz'}</p>
                </div>

                <div className="pt-2">
                  <Link
                    to={personPath(dean)}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-[#043b87] text-white text-xs font-bold uppercase rounded hover:bg-[#002654] transition-colors"
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#f9f9f9] p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                category === 'all' ? 'bg-[#043b87] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setCategory('dekanat')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                category === 'dekanat' ? 'bg-[#043b87] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              Dekanat
            </button>
            <button
              onClick={() => setCategory('kafedra')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                category === 'kafedra' ? 'bg-[#043b87] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              Kafedra Mudirlari
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="F.I.Sh. yoki lavozim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#043b87]"
            />
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaders.map((person) => (
            <div key={person.id} className="gov-card p-5 rounded-lg flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-24 h-32 mx-auto rounded overflow-hidden border border-gray-300 bg-gray-100">
                  <img src={person.photo} alt={L(person.name)} className="w-full h-full object-cover" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-[#043b87] uppercase tracking-wider block">
                    {person.position ? L(person.position) : 'Rahbariyat'}
                  </span>
                  <h3 className="text-xs font-extrabold text-gray-900 group-hover:text-[#1675e0]">
                    <Link to={personPath(person)}>{L(person.name)}</Link>
                  </h3>
                  <span className="text-[10px] text-gray-500 font-medium block">
                    {person.degree ? L(person.degree) : 'Oliy ma’lumotli'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link
                  to={personPath(person)}
                  className="w-full inline-flex items-center justify-center gap-1 py-1.5 bg-[#eff7ff] text-[#043b87] text-[11px] font-bold uppercase rounded hover:bg-[#043b87] hover:text-white transition-colors"
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
