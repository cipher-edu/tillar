import type { Program } from '@/types';

/**
 * Ta’lim yo‘nalishlari — 2025–2026 hisobot:
 * 8 kunduzgi + 2 kechki + 1 sirtqi bakalavriat + 3 magistratura = 14
 */
export const programs: Program[] = [
  {
    id: 'prog-uzbek-lit',
    slug: 'ozbek-tili-adabiyoti',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: "O'zbek tili va adabiyoti",
      ru: 'Узбекский язык и литература',
      en: 'Uzbek Language and Literature',
    },
    description: {
      uz: "O'zbek tili, adabiyoti, navoiyshunoslik va pedagogika asoslarini o'rgatadi.",
      ru: 'Изучает узбекский язык, литературу, навоиеведение и основы педагогики.',
      en: 'Covers Uzbek language, literature, Navoi studies and pedagogy basics.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Muharrir', ru: 'Редактор', en: 'Editor' },
      { uz: 'Tadqiqotchi', ru: 'Исследователь', en: 'Researcher' },
    ],
    professorIds: ['p-head-uz'],
  },
  {
    id: 'prog-uzbek-ling',
    slug: 'ozbek-tilshunosligi',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'O‘zbek tilshunosligi',
      ru: 'Узбекское языкознание',
      en: 'Uzbek Linguistics',
    },
    description: {
      uz: 'O‘zbek tili nazariyasi, leksikografiya va zamonaviy tilshunoslik yo‘nalishi.',
      ru: 'Теория узбекского языка, лексикография и современная лингвистика.',
      en: 'Uzbek language theory, lexicography and modern linguistics.',
    },
    careers: [
      { uz: 'Tilshunos', ru: 'Лингвист', en: 'Linguist' },
      { uz: 'Leksikograf', ru: 'Лексикограф', en: 'Lexicographer' },
      { uz: 'OTM o‘qituvchisi', ru: 'Преподаватель вуза', en: 'University lecturer' },
    ],
    professorIds: ['p-head-uz'],
  },
  {
    id: 'prog-english-ling',
    slug: 'ingliz-tilshunosligi',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'Ingliz tilshunosligi',
      ru: 'Английская лингвистика',
      en: 'English Linguistics',
    },
    description: {
      uz: 'Ingliz tili nazariyasi, fonetika, grammatika. ACQUIN (Germaniya) xalqaro akkreditatsiyasidan o‘tgan «Ingliz tili va adabiyoti» dasturi bilan bog‘liq yo‘nalish; so‘nggi 3 yilda ~200 talaba CEFR B2, 15+ IELTS 6.0–7.5.',
      ru: 'Теория английского, фонетика, грамматика. Связано с программой «Английский язык и литература», прошедшей международную аккредитацию ACQUIN; за 3 года ~200 студентов CEFR B2, 15+ IELTS 6.0–7.5.',
      en: 'English theory, phonetics, grammar. Linked to the ACQUIN-accredited English Language and Literature program; in 3 years ~200 students reached CEFR B2, 15+ IELTS 6.0–7.5.',
    },
    careers: [
      { uz: "Ingliz tili o'qituvchisi", ru: 'Преподаватель английского', en: 'English teacher' },
      { uz: 'Tarjimon', ru: 'Переводчик', en: 'Translator' },
      { uz: 'Tadqiqotchi', ru: 'Исследователь', en: 'Researcher' },
    ],
    professorIds: ['p-head-en'],
  },
  {
    id: 'prog-english-prac',
    slug: 'ingliz-tili-amaliy',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'Ingliz tili amaliy fanlar',
      ru: 'Практические дисциплины английского языка',
      en: 'Practical English Disciplines',
    },
    description: {
      uz: 'Ingliz tili amaliyoti, akademik yozuv, nutq madaniyati. Dual ta’lim: «Heritage» MCHJ filiali va «Zafar Farm – 2021» shartnomasi. Kafedra yuklamasi 19 361,8 soat (2025–2026).',
      ru: 'Практика английского, академическое письмо. Dual education: филиал «Heritage» и договор «Zafar Farm – 2021». Нагрузка кафедры 19 361,8 ч (2025–2026).',
      en: 'Practical English and academic writing. Dual education: Heritage LLC branch and Zafar Farm – 2021 agreement. Department load 19,361.8 hours (2025–2026).',
    },
    careers: [
      { uz: "Ingliz tili o'qituvchisi", ru: 'Преподаватель английского', en: 'English teacher' },
      { uz: 'Xalqaro aloqa mutaxassisi', ru: 'Специалист по международным связям', en: 'International liaison' },
    ],
    professorIds: ['p-head-en', 'p-prof-3', 'p-tutor-1'],
  },
  {
    id: 'prog-inter-fl',
    slug: 'fakultetlararo-chet-tili',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'Fakultetlararo chet tili',
      ru: 'Межфакультетский иностранный язык',
      en: 'Inter-faculty Foreign Language',
    },
    description: {
      uz: 'Turli yo‘nalish talabalari uchun chet tillari va kasbiy til kompetentsiyalari.',
      ru: 'Иностранные языки и профессиональные языковые компетенции для студентов разных направлений.',
      en: 'Foreign languages and professional language skills for students across fields.',
    },
    careers: [
      { uz: "Chet tili o'qituvchisi", ru: 'Преподаватель иностранного языка', en: 'Foreign language teacher' },
      { uz: 'Tarjimon', ru: 'Переводчик', en: 'Translator' },
    ],
    professorIds: ['p-prof-2'],
  },
  {
    id: 'prog-russian',
    slug: 'rus-tili-adabiyoti',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'Rus tili va adabiyoti',
      ru: 'Русский язык и литература',
      en: 'Russian Language and Literature',
    },
    description: {
      uz: "Rus tili va adabiyoti bakalavriati. Kafedra: 28 o‘qituvchi, Navoiy va Prezident stipendiyatlari yetishib chiqqan.",
      ru: 'Бакалавриат «Русский язык и литература». Кафедра: 28 преподавателей; выпускники — стипендиаты Навои и Президента.',
      en: 'Bachelor in Russian Language and Literature. Department: 28 staff; alumni include Navoi and Presidential scholarship holders.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Filolog', ru: 'Филолог', en: 'Philologist' },
      { uz: 'Jurnalist', ru: 'Журналист', en: 'Journalist' },
    ],
    professorIds: ['p-head-ru', 'p-prof-raxmanova', 'p-prof-ibragimova', 'p-prof-aripova'],
  },
  {
    id: 'prog-russian-other',
    slug: 'ozga-tilli-rus-tili',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: "O‘zga tilli guruhlarda rus tili va adabiyoti",
      ru: 'Русский язык и литература в иноязычных группах',
      en: 'Russian Language and Literature in non-native groups',
    },
    description: {
      uz: "O‘zga tilli guruhlarda rus tili va adabiyotini o‘qitish bo‘yicha bakalavriat.",
      ru: 'Бакалавриат по преподаванию русского языка и литературы в иноязычных группах.',
      en: 'Bachelor track for teaching Russian language and literature in non-native groups.',
    },
    careers: [
      { uz: "Rus tili o'qituvchisi", ru: 'Учитель русского языка', en: 'Russian teacher' },
      { uz: 'Tarjimon', ru: 'Переводчик', en: 'Translator' },
    ],
    professorIds: ['p-head-ru', 'p-prof-roziyeva', 'p-teach-fefelova'],
  },
  {
    id: 'prog-kazakh',
    slug: 'qozoq-tili-adabiyoti',
    level: 'bachelor',
    studyForm: 'full_time',
    name: {
      uz: 'Qozoq tili va adabiyoti',
      ru: 'Казахский язык и литература',
      en: 'Kazakh Language and Literature',
    },
    description: {
      uz: 'Qozoq tili, adabiyoti va madaniyatlararo muloqot bo‘yicha mutaxassislar tayyorlaydi.',
      ru: 'Готовит специалистов по казахскому языку, литературе и межкультурной коммуникации.',
      en: 'Trains specialists in Kazakh language, literature and intercultural communication.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Tarjimon', ru: 'Переводчик', en: 'Translator' },
      { uz: 'Madaniyat mutaxassisi', ru: 'Специалист по культуре', en: 'Culture specialist' },
    ],
    professorIds: ['p-prof-1'],
  },

  // ——— Kechki (2) ———
  {
    id: 'prog-uzbek-lit-evening',
    slug: 'ozbek-tili-adabiyoti-kechki',
    level: 'bachelor',
    studyForm: 'evening',
    name: {
      uz: "O'zbek tili va adabiyoti (kechki)",
      ru: 'Узбекский язык и литература (вечерняя)',
      en: 'Uzbek Language and Literature (evening)',
    },
    description: {
      uz: "Kechki ta’lim shaklida o‘zbek tili, adabiyoti va pedagogika asoslari.",
      ru: 'Вечерняя форма: узбекский язык, литература и основы педагогики.',
      en: 'Evening form: Uzbek language, literature and pedagogy basics.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Muharrir', ru: 'Редактор', en: 'Editor' },
    ],
    professorIds: ['p-head-uz'],
  },
  {
    id: 'prog-russian-evening',
    slug: 'rus-tili-adabiyoti-kechki',
    level: 'bachelor',
    studyForm: 'evening',
    name: {
      uz: 'Rus tili va adabiyoti (kechki)',
      ru: 'Русский язык и литература (вечерняя)',
      en: 'Russian Language and Literature (evening)',
    },
    description: {
      uz: 'Kechki ta’lim shaklida rus tili va adabiyoti bakalavriati.',
      ru: 'Вечерняя форма бакалавриата «Русский язык и литература».',
      en: 'Evening bachelor track in Russian Language and Literature.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Filolog', ru: 'Филолог', en: 'Philologist' },
    ],
    professorIds: ['p-head-ru', 'p-prof-raxmanova'],
  },

  // ——— Sirtqi (1) ———
  {
    id: 'prog-russian-distance',
    slug: 'rus-tili-adabiyoti-sirtqi',
    level: 'bachelor',
    studyForm: 'distance',
    name: {
      uz: 'Rus tili va adabiyoti (sirtqi)',
      ru: 'Русский язык и литература (заочная)',
      en: 'Russian Language and Literature (distance)',
    },
    description: {
      uz: 'Sirtqi ta’lim shaklida rus tili va adabiyoti bakalavriati.',
      ru: 'Заочная форма бакалавриата «Русский язык и литература».',
      en: 'Distance bachelor track in Russian Language and Literature.',
    },
    careers: [
      { uz: "O'qituvchi", ru: 'Учитель', en: 'Teacher' },
      { uz: 'Filolog', ru: 'Филолог', en: 'Philologist' },
    ],
    professorIds: ['p-head-ru', 'p-dekan'],
  },

  // ——— Magistratura (3) ———
  {
    id: 'prog-russian-master',
    slug: 'rus-tili-magistr',
    level: 'master',
    studyForm: 'full_time',
    name: {
      uz: 'Rus tili va adabiyoti (magistratura)',
      ru: 'Русский язык и литература (магистратура)',
      en: 'Russian Language and Literature (Master)',
    },
    description: {
      uz: 'Magistratura mutaxassisliklari: rus tili va adabiyoti; adabiyotshunoslik: rus adabiyoti; lingvistika: rus tili.',
      ru: 'Магистратура: русский язык и литература; литературоведение; лингвистика русского языка.',
      en: 'Master tracks: Russian language and literature; literary studies; Russian linguistics.',
    },
    careers: [
      { uz: 'OTM o‘qituvchisi', ru: 'Преподаватель вуза', en: 'University lecturer' },
      { uz: 'Tadqiqotchi', ru: 'Исследователь', en: 'Researcher' },
    ],
    professorIds: ['p-prof-raxmanova', 'p-head-ru', 'p-dekan'],
  },
  {
    id: 'prog-ling-master',
    slug: 'tilshunoslik-magistr',
    level: 'master',
    studyForm: 'full_time',
    name: {
      uz: 'Tilshunoslik (magistratura)',
      ru: 'Лингвистика (магистратура)',
      en: 'Linguistics (Master)',
    },
    description: {
      uz: 'Zamonaviy tilshunoslik nazariyasi va ilmiy tadqiqot metodlari. Fakultet magistraturasi: 177 talaba (2025–2026).',
      ru: 'Теория современной лингвистики и методы научных исследований. Магистратура факультета: 177 студентов (2025–2026).',
      en: 'Modern linguistic theory and research methods. Faculty master’s cohort: 177 students (2025–2026).',
    },
    careers: [
      { uz: 'Ilmiy xodim', ru: 'Научный сотрудник', en: 'Researcher' },
      { uz: 'OTM o‘qituvchisi', ru: 'Преподаватель вуза', en: 'University lecturer' },
    ],
    professorIds: ['p-dekan', 'p-head-uz'],
  },
  {
    id: 'prog-fl-method-master',
    slug: 'xorijiy-til-metodikasi-magistr',
    level: 'master',
    studyForm: 'full_time',
    name: {
      uz: 'Xorijiy til o‘qitish metodikasi (magistratura)',
      ru: 'Методика преподавания иностранного языка (магистратура)',
      en: 'Foreign Language Teaching Methodology (Master)',
    },
    description: {
      uz: 'Chet tillarini o‘qitish metodikasi, amaliy til kompetentsiyalari va zamonaviy pedagogik yondashuvlar.',
      ru: 'Методика преподавания иностранных языков, практические языковые компетенции и современные педагогические подходы.',
      en: 'Foreign language teaching methodology, practical language competencies and modern pedagogical approaches.',
    },
    careers: [
      { uz: "Chet tili o'qituvchisi", ru: 'Преподаватель иностранного языка', en: 'Foreign language teacher' },
      { uz: 'OTM o‘qituvchisi', ru: 'Преподаватель вуза', en: 'University lecturer' },
      { uz: 'Metodist', ru: 'Методист', en: 'Methodologist' },
    ],
    professorIds: ['p-head-en', 'p-prof-3'],
  },
];

export const getProgram = (idOrSlug: string) =>
  programs.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
