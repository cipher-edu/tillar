import type { ContactInfo, FacultyStats, Partner, LocaleString } from '@/types';

/**
 * Manba: Tillar fakulteti 2025вЂ“2026 oвЂquv yili hisoboti (UMUMIY MAвЂ™LUMOTLAR)
 * Navoiy davlat universiteti вЂ” Tillar fakulteti
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
  uz: "Tillar fakulteti Navoiy davlat universitetining chet tillari, oвЂzbek va rus tilshunosligi yoвЂnalishlarida kadrlar tayyorlovchi yetakchi fakultetlaridan biri hisoblanadi. Fakultet tarkibida 7 ta kafedra faoliyat yuritadi. 2025вЂ“2026 oвЂquv yilida jami 3394 nafar talaba tahsil oldi (3217 bakalavriat, 177 magistratura); 148 nafar professor-oвЂqituvchi ishlaydi, ilmiy salohiyat 40%.",
  ru: 'Р¤Р°РєСѓР»СЊС‚РµС‚ СЏР·С‹РєРѕРІ вЂ” РѕРґРёРЅ РёР· РІРµРґСѓС‰РёС… С„Р°РєСѓР»СЊС‚РµС‚РѕРІ РќР°РІРѕРёР№СЃРєРѕРіРѕ РіРѕСЃСѓРґР°СЂСЃС‚РІРµРЅРЅРѕРіРѕ СѓРЅРёРІРµСЂСЃРёС‚РµС‚Р° РїРѕ РїРѕРґРіРѕС‚РѕРІРєРµ РєР°РґСЂРѕРІ РІ РѕР±Р»Р°СЃС‚Рё РёРЅРѕСЃС‚СЂР°РЅРЅС‹С… СЏР·С‹РєРѕРІ, СѓР·Р±РµРєСЃРєРѕРіРѕ Рё СЂСѓСЃСЃРєРѕРіРѕ СЏР·С‹РєРѕР·РЅР°РЅРёСЏ. Р’ СЃРѕСЃС‚Р°РІРµ 7 РєР°С„РµРґСЂ. Р’ 2025вЂ“2026 СѓС‡. Рі. РѕР±СѓС‡Р°Р»РѕСЃСЊ 3394 СЃС‚СѓРґРµРЅС‚Р° (3217 Р±Р°РєР°Р»Р°РІСЂРёР°С‚, 177 РјР°РіРёСЃС‚СЂР°С‚СѓСЂР°); 148 РїСЂРµРїРѕРґР°РІР°С‚РµР»РµР№, РЅР°СѓС‡РЅС‹Р№ РїРѕС‚РµРЅС†РёР°Р» 40%.',
  en: 'The Faculty of Languages is one of the leading faculties of Navoi State University training specialists in foreign languages and Uzbek and Russian linguistics. It comprises 7 departments. In 2025вЂ“2026, 3,394 students studied (3,217 bachelor, 177 master); 148 academic staff; research capacity 40%.',
};

/** QoвЂshimcha faktlar вЂ” 2025вЂ“2026 hisobot */
export const facultyFacts = {
  academicYear: '2025вЂ“2026',
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
  /** Oliy oвЂquv yurtidan keyingi taвЂ™lim вЂ” jami 105 */
  postgradTotal: 105,
  dscStudents: 6,
  phdStudents: 77,
  independentResearchers: 19,
  internResearchers: 3,
  /** Professor-oвЂqituvchilar tarkibi */
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
  /** Kafedralar boвЂyicha ilmiy salohiyat (%) */
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

/** Xalqaro hamkorlik вЂ” hisobotdagi 9 ta xorijiy OTM/markaz */
export const partners: Partner[] = [
  { id: 'pt-1', name: 'Kazan Federal University', logoText: 'KFU', country: 'Russia', region: 'cis' },
  { id: 'pt-2', name: 'M. Auezov South Kazakhstan University', logoText: 'AUEZOV', country: 'Kazakhstan', region: 'cis' },
  { id: 'pt-3', name: 'NILE вЂ” Norwich Institute for Language Education', logoText: 'NILE', country: 'United Kingdom', region: 'europe' },
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
    ru: 'Рі. РќР°РІРѕРё, РќР°РІРѕРёР№СЃРєРёР№ РіРѕСЃСѓРґР°СЂСЃС‚РІРµРЅРЅС‹Р№ СѓРЅРёРІРµСЂСЃРёС‚РµС‚, Р¤Р°РєСѓР»СЊС‚РµС‚ СЏР·С‹РєРѕРІ',
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
      name: { uz: 'Dekanat', ru: 'Р”РµРєР°РЅР°С‚', en: "DeanвЂ™s office" },
      phone: '+998 79 123 45 01',
      email: 'dekanat@navoiyuni.uz',
    },
    {
      name: { uz: "O'quv bo'limi", ru: 'РЈС‡РµР±РЅС‹Р№ РѕС‚РґРµР»', en: 'Academic office' },
      phone: '+998 79 123 45 02',
      email: 'edu@navoiyuni.uz',
    },
    {
      name: { uz: 'Ilmiy boвЂlim', ru: 'РќР°СѓС‡РЅС‹Р№ РѕС‚РґРµР»', en: 'Research office' },
      phone: '+998 79 123 45 03',
      email: 'science@navoiyuni.uz',
    },
  ],
};

/** Hero slayder вЂ” 2025вЂ“2026 hisobot raqamlari */
export const heroSlides = [
  {
    id: 'heritage',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85',
    accent: 'blue' as const,
    tag: {
      uz: 'Meros va madaniyat',
      ru: 'РќР°СЃР»РµРґРёРµ Рё РєСѓР»СЊС‚СѓСЂР°',
      en: 'Heritage & culture',
    },
    title: {
      uz: 'Tillar orqali\ndunyoga ochilamiz',
      ru: 'РћС‚РєСЂС‹РІР°РµРј РјРёСЂ\nС‡РµСЂРµР· СЏР·С‹РєРё',
      en: 'Opening the world\nthrough languages',
    },
    description: {
      uz: 'Navoiy davlat universiteti Tillar fakulteti вЂ” 3394 talaba, 148 professor-oвЂqituvchi, 7 kafedra, ilmiy salohiyat 40%.',
      ru: 'Р¤Р°РєСѓР»СЊС‚РµС‚ СЏР·С‹РєРѕРІ РќР°РІРѕРёР№СЃРєРѕРіРѕ РіРѕСЃСѓРґР°СЂСЃС‚РІРµРЅРЅРѕРіРѕ СѓРЅРёРІРµСЂСЃРёС‚РµС‚Р° вЂ” 3394 СЃС‚СѓРґРµРЅС‚Р°, 148 РїСЂРµРїРѕРґР°РІР°С‚РµР»РµР№, 7 РєР°С„РµРґСЂ, РЅР°СѓС‡РЅС‹Р№ РїРѕС‚РµРЅС†РёР°Р» 40%.',
      en: 'Faculty of Languages at Navoi State University вЂ” 3,394 students, 148 faculty members, 7 departments, 40% research capacity.',
    },
    ctaLabel: {
      uz: 'Fakultet haqida',
      ru: 'Рћ С„Р°РєСѓР»СЊС‚РµС‚Рµ',
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
      ru: 'РќР°РїСЂР°РІР»РµРЅРёСЏ РѕР±СѓС‡РµРЅРёСЏ',
      en: 'Study programs',
    },
    title: {
      uz: "Zamonaviy til\nta'limi",
      ru: 'РЎРѕРІСЂРµРјРµРЅРЅРѕРµ\nСЏР·С‹РєРѕРІРѕРµ РѕР±СЂР°Р·РѕРІР°РЅРёРµ',
      en: 'Modern language\neducation',
    },
    description: {
      uz: 'Bakalavriat 3217, magistratura 177 talaba. 8 kunduzgi, 2 kechki, 1 sirtqi bakalavriat va 3 magistratura mutaxassisligi.',
      ru: 'Р‘Р°РєР°Р»Р°РІСЂРёР°С‚ 3217, РјР°РіРёСЃС‚СЂР°С‚СѓСЂР° 177. 8 РѕС‡РЅС‹С…, 2 РІРµС‡РµСЂРЅРёС…, 1 Р·Р°РѕС‡РЅР°СЏ РїСЂРѕРіСЂР°РјРјР° Р±Р°РєР°Р»Р°РІСЂРёР°С‚Р° Рё 3 РјР°РіРёСЃС‚РµСЂСЃРєРёРµ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё.',
      en: 'Bachelor 3,217, master 177 students. 8 full-time, 2 evening, 1 distance bachelor tracks and 3 master specializations.',
    },
    ctaLabel: {
      uz: "Yo'nalishlarni ko'rish",
      ru: 'РЎРјРѕС‚СЂРµС‚СЊ РЅР°РїСЂР°РІР»РµРЅРёСЏ',
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
      ru: 'РЎРѕРѕР±С‰РµСЃС‚РІРѕ Рё СЃС‚СѓРґРµРЅС‚С‹',
      en: 'Community & students',
    },
    title: {
      uz: 'Iqtidor va\njamoa markazi',
      ru: 'РџСЂРѕСЃС‚СЂР°РЅСЃС‚РІРѕ\nС‚Р°Р»Р°РЅС‚РѕРІ',
      en: 'A home for\ntalent',
    },
    description: {
      uz: '120 maвЂ™naviy-maвЂ™rifiy tadbir (1500+ talaba), 110 sport sovrindori, вЂњYosh koвЂmakchiвЂќ 110 volontyor, 10 toвЂgarak (470 talaba).',
      ru: '120 РґСѓС…РѕРІРЅРѕ-РїСЂРѕСЃРІРµС‚РёС‚РµР»СЊСЃРєРёС… РјРµСЂРѕРїСЂРёСЏС‚РёР№ (1500+ СЃС‚СѓРґРµРЅС‚РѕРІ), 110 СЃРїРѕСЂС‚РёРІРЅС‹С… РїСЂРёР·С‘СЂРѕРІ, 110 РІРѕР»РѕРЅС‚С‘СЂРѕРІ, 10 РєСЂСѓР¶РєРѕРІ (470 СЃС‚СѓРґРµРЅС‚РѕРІ).',
      en: '120 cultural events (1,500+ students), 110 sports awardees, 110 volunteers, 10 clubs (470 members).',
    },
    ctaLabel: {
      uz: 'Talabalar',
      ru: 'РЎС‚СѓРґРµРЅС‚С‹',
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
      ru: 'РњРµР¶РґСѓРЅР°СЂРѕРґРЅРѕРµ СЃРѕС‚СЂСѓРґРЅРёС‡РµСЃС‚РІРѕ',
      en: 'International partners',
    },
    title: {
      uz: "Jahon tillari\nbir tomonda",
      ru: 'РњРёСЂРѕРІС‹Рµ СЏР·С‹РєРё\nРІ РѕРґРЅРѕРј РјРµСЃС‚Рµ',
      en: 'World languages\nunder one roof',
    },
    description: {
      uz: '9 xorijiy OTM: KFU, Auezov, NILE, Baku DU, UNECON, NSU, UCSI (Malayziya), Muhammadiyah Jakarta va UMY. 18 xodim malaka oshirdi, 13 xorijiy professor dars berdi.',
      ru: '9 Р·Р°СЂСѓР±РµР¶РЅС‹С… РІСѓР·РѕРІ: РљР¤РЈ, РђСѓСЌР·РѕРІ, NILE, Р‘Р“РЈ, РЎРџР±Р“Р­РЈ, РќР“РЈ, UCSI, Muhammadiyah Jakarta Рё UMY. 18 СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РїРѕРІС‹СЃРёР»Рё РєРІР°Р»РёС„РёРєР°С†РёСЋ, 13 Р·Р°СЂСѓР±РµР¶РЅС‹С… РїСЂРѕС„РµСЃСЃРѕСЂРѕРІ РїСЂРѕРІРµР»Рё Р·Р°РЅСЏС‚РёСЏ.',
      en: '9 foreign HEIs: KFU, Auezov, NILE, Baku State, UNECON, NSU, UCSI, Muhammadiyah Jakarta and UMY. 18 staff trained abroad; 13 foreign professors taught.',
    },
    ctaLabel: {
      uz: 'Professorlar',
      ru: 'РџСЂРµРїРѕРґР°РІР°С‚РµР»Рё',
      en: 'Professors',
    },
    ctaTo: '/jamoa/professorlar',
  },
];
