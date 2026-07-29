import type { ContactInfo, FacultyStats, Partner, LocaleString } from '@/types';

/**
 * Manba: Tillar fakulteti 2025–2026 o‘quv yili hisoboti (UMUMIY MA’LUMOTLAR)
 * Navoiy davlat universiteti — Tillar fakulteti
 */
export const stats: FacultyStats = {
  students: 3394,
  professors: 148,
  /** 8 kunduzgi + 2 kechki + 1 sirtqi bakalavriat + 3 magistratura */
  programs: 14,
  partners: 9,
  projects: 12,
};

/** Fakultet haqida qisqa matn (landing / tarix) */
export const facultyOverview: LocaleString = {
  uz: "Tillar fakulteti Navoiy davlat universitetining chet tillari, o‘zbek va rus tilshunosligi yo‘nalishlarida kadrlar tayyorlovchi yetakchi fakultetlaridan biri hisoblanadi. Fakultet tarkibida 7 ta kafedra faoliyat yuritadi. 2025–2026 o‘quv yilida jami 3394 nafar talaba tahsil oldi (3217 bakalavriat, 177 magistratura); 148 nafar professor-o‘qituvchi ishlaydi, ilmiy salohiyat 40%.",
  ru: 'Факультет языков — один из ведущих факультетов Навоийского государственного университета по подготовке кадров в области иностранных языков, узбекского и русского языкознания. В составе 7 кафедр. В 2025–2026 уч. г. обучалось 3394 студента (3217 бакалавриат, 177 магистратура); 148 преподавателей, научный потенциал 40%.',
  en: 'The Faculty of Languages is one of the leading faculties of Navoi State University training specialists in foreign languages and Uzbek and Russian linguistics. It comprises 7 departments. In 2025–2026, 3,394 students studied (3,217 bachelor, 177 master); 148 academic staff; research capacity 40%.',
};

/** Qo‘shimcha faktlar — 2025–2026 hisobot */
export const facultyFacts = {
  academicYear: '2025–2026',
  bachelorStudents: 3217,
  masterStudents: 177,
  /** Bakalavriat kurslar kesimida */
  bachelorByCourse: {
    course1: 596,
    course2: 691,
    course3: 736,
    course4: 1020,
    course5: 174,
  },
  maleStudents: 73,
  malePercent: 2,
  femaleStudents: 3321,
  femalePercent: 98,
  fullTimePercent: 98,
  scientificPotentialPercent: 40,
  departments: 7,
  /** Bakalavriat: 8 kunduzgi, 2 kechki, 1 sirtqi; magistratura: 3 */
  bachelorFullTime: 8,
  bachelorEvening: 2,
  bachelorDistance: 1,
  masterPrograms: 3,
  textbooks2025: 15,
  studyGuides2025: 20,
  monographs2025: 14,
  foreignArticles2025: 12,
  oakArticles2025: 74,
  foreignTraining: 18,
  foreignTeachers: 13,
  spiritualEvents: 120,
  spiritualParticipants: 1500,
  sportWinners: 110,
  volunteers: 110,
  rectorCup: 142,
  clubs: 10,
  clubMembers: 470,
  initiatives: 5,
  /** Oliy o‘quv yurtidan keyingi ta’lim — jami 105 */
  postgradTotal: 105,
  dscStudents: 6,
  phdStudents: 77,
  independentResearchers: 19,
  internResearchers: 3,
  /** Professor-o‘qituvchilar tarkibi */
  staffDoctors: 8,
  staffDoctorsPercent: 5.4,
  staffCandidates: 61,
  staffCandidatesPercent: 41.2,
  staffSenior: 23,
  staffSeniorPercent: 15,
  staffTeachers: 56,
  staffTeachersPercent: 38,
  /** Bitiruvchilar bandligi */
  graduatesTotal: 1017,
  graduatesEmployed: 549,
  graduatesMonitoring: 468,
  privilegedDiplomas: 16,
  /** Kafedralar bo‘yicha ilmiy salohiyat (%) */
  deptPotential: {
    englishLing: 24,
    englishPractical: 18,
    interForeign: 16,
    russian: 33,
    kazakh: 20,
    uzbekLit: 63.1,
    uzbekLing: 100,
  },
};

/** Xalqaro hamkorlik — hisobotdagi 9 ta xorijiy OTM/markaz */
export const partners: Partner[] = [
  { id: 'pt-1', name: 'Kazan Federal University', logoText: 'KFU', country: 'Russia', region: 'cis' },
  { id: 'pt-2', name: 'M. Auezov South Kazakhstan University', logoText: 'AUEZOV', country: 'Kazakhstan', region: 'cis' },
  { id: 'pt-3', name: 'NILE — Norwich Institute for Language Education', logoText: 'NILE', country: 'United Kingdom', region: 'europe' },
  { id: 'pt-4', name: 'Baku State University', logoText: 'BSU', country: 'Azerbaijan', region: 'cis' },
  { id: 'pt-5', name: 'St. Petersburg State University of Economics', logoText: 'UNECON', country: 'Russia', region: 'cis' },
  { id: 'pt-6', name: 'Novosibirsk State University', logoText: 'NSU', country: 'Russia', region: 'cis' },
  { id: 'pt-7', name: 'UCSI University', logoText: 'UCSI', country: 'Malaysia', region: 'asia' },
  { id: 'pt-8', name: 'Muhammadiyah University of Jakarta', logoText: 'UMJ', country: 'Indonesia', region: 'asia' },
  { id: 'pt-9', name: 'Muhammadiyah University of Yogyakarta (UMY)', logoText: 'UMY', country: 'Indonesia', region: 'asia' },
];

export const contactInfo: ContactInfo = {
  address: {
    uz: 'Navoiy shahri, Navoiy davlat universiteti, Tillar fakulteti',
    ru: 'г. Навои, Навоийский государственный университет, Факультет языков',
    en: 'Navoi city, Navoi State University, Faculty of Languages',
  },
  phone: '+998 79 123 45 67',
  email: 'languages@navoiyuni.uz',
  universityUrl: 'https://www.navoiyuni.uz',
  socials: [
    { label: 'Telegram', url: 'https://t.me' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
  ],
  units: [
    {
      name: { uz: 'Dekanat', ru: 'Деканат', en: "Dean’s office" },
      phone: '+998 79 123 45 01',
      email: 'dekanat@navoiyuni.uz',
    },
    {
      name: { uz: "O'quv bo'limi", ru: 'Учебный отдел', en: 'Academic office' },
      phone: '+998 79 123 45 02',
      email: 'edu@navoiyuni.uz',
    },
    {
      name: { uz: 'Ilmiy bo‘lim', ru: 'Научный отдел', en: 'Research office' },
      phone: '+998 79 123 45 03',
      email: 'science@navoiyuni.uz',
    },
  ],
};

/** Hero slayder — 2025–2026 hisobot raqamlari */
export const heroSlides = [
  {
    id: 'heritage',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85',
    accent: 'blue' as const,
    tag: {
      uz: 'Meros va madaniyat',
      ru: 'Наследие и культура',
      en: 'Heritage & culture',
    },
    title: {
      uz: 'Tillar orqali\ndunyoga ochilamiz',
      ru: 'Открываем мир\nчерез языки',
      en: 'Opening the world\nthrough languages',
    },
    description: {
      uz: 'Navoiy davlat universiteti Tillar fakulteti — 3394 talaba, 148 professor-o‘qituvchi, 7 kafedra, ilmiy salohiyat 40%.',
      ru: 'Факультет языков Навоийского государственного университета — 3394 студента, 148 преподавателей, 7 кафедр, научный потенциал 40%.',
      en: 'Faculty of Languages at Navoi State University — 3,394 students, 148 faculty members, 7 departments, 40% research capacity.',
    },
    ctaLabel: {
      uz: 'Fakultet haqida',
      ru: 'О факультете',
      en: 'About the Faculty',
    },
    ctaTo: '/fakultet/tarix',
  },
  {
    id: 'education',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=85',
    accent: 'teal' as const,
    tag: {
      uz: "Ta'lim yo'nalishlari",
      ru: 'Направления обучения',
      en: 'Study programs',
    },
    title: {
      uz: "Zamonaviy til\nta'limi",
      ru: 'Современное\nязыковое образование',
      en: 'Modern language\neducation',
    },
    description: {
      uz: 'Bakalavriat 3217, magistratura 177 talaba. 8 kunduzgi, 2 kechki, 1 sirtqi bakalavriat va 3 magistratura mutaxassisligi.',
      ru: 'Бакалавриат 3217, магистратура 177. 8 очных, 2 вечерних, 1 заочная программа бакалавриата и 3 магистерские специальности.',
      en: 'Bachelor 3,217, master 177 students. 8 full-time, 2 evening, 1 distance bachelor tracks and 3 master specializations.',
    },
    ctaLabel: {
      uz: "Yo'nalishlarni ko'rish",
      ru: 'Смотреть направления',
      en: 'Explore programs',
    },
    ctaTo: '/talim/yonalishlar',
  },
  {
    id: 'community',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85',
    accent: 'blue' as const,
    tag: {
      uz: 'Jamoa va talabalar',
      ru: 'Сообщество и студенты',
      en: 'Community & students',
    },
    title: {
      uz: 'Iqtidor va\njamoa markazi',
      ru: 'Пространство\nталантов',
      en: 'A home for\ntalent',
    },
    description: {
      uz: '120 ma’naviy-ma’rifiy tadbir (1500+ talaba), 110 sport sovrindori, “Yosh ko‘makchi” 110 volontyor, 10 to‘garak (470 talaba).',
      ru: '120 духовно-просветительских мероприятий (1500+ студентов), 110 спортивных призёров, 110 волонтёров, 10 кружков (470 студентов).',
      en: '120 cultural events (1,500+ students), 110 sports awardees, 110 volunteers, 10 clubs (470 members).',
    },
    ctaLabel: {
      uz: 'Talabalar',
      ru: 'Студенты',
      en: 'Students',
    },
    ctaTo: '/talabalar',
  },
  {
    id: 'global',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85',
    accent: 'royal' as const,
    tag: {
      uz: 'Xalqaro hamkorlik',
      ru: 'Международное сотрудничество',
      en: 'International partners',
    },
    title: {
      uz: "Jahon tillari\nbir tomonda",
      ru: 'Мировые языки\nв одном месте',
      en: 'World languages\nunder one roof',
    },
    description: {
      uz: '9 xorijiy OTM: KFU, Auezov, NILE, Baku DU, UNECON, NSU, UCSI (Malayziya), Muhammadiyah Jakarta va UMY. 18 xodim malaka oshirdi, 13 xorijiy professor dars berdi.',
      ru: '9 зарубежных вузов: КФУ, Ауэзов, NILE, БГУ, СПбГЭУ, НГУ, UCSI, Muhammadiyah Jakarta и UMY. 18 сотрудников повысили квалификацию, 13 зарубежных профессоров провели занятия.',
      en: '9 foreign HEIs: KFU, Auezov, NILE, Baku State, UNECON, NSU, UCSI, Muhammadiyah Jakarta and UMY. 18 staff trained abroad; 13 foreign professors taught.',
    },
    ctaLabel: {
      uz: 'Professorlar',
      ru: 'Преподаватели',
      en: 'Professors',
    },
    ctaTo: '/jamoa/professorlar',
  },
];
