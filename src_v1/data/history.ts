import type { HistoryEvent } from '@/types';

/**
 * Manba: «FAKULTET TARIXI.docx», «Rus tili va adabiyoti kafedrasi tarixi.docx»
 * Navoiy davlat universiteti — Tillar fakulteti
 */
export const historyEvents: HistoryEvent[] = [
  {
    id: 'h-1',
    year: '1984',
    title: {
      uz: 'Chet tillari o‘qitishining boshlanishi',
      ru: 'Начало преподавания иностранных языков',
      en: 'Start of foreign language teaching',
    },
    description: {
      uz: "Navoiy davlat pedagogika instituti tarkibida «Chet tili, o‘zbek va qozoq tillari» kafedrasi tashkil etildi. Kafedrani dotsent O‘tagan Turniyozov boshqargan.",
      ru: 'В составе Навоийского государственного педагогического института создана кафедра «Иностранный язык, узбекский и казахский языки». Кафедру возглавил доцент Утаган Турниязов.',
      en: 'The department of Foreign Language, Uzbek and Kazakh languages was established at Navoi State Pedagogical Institute under associate professor O‘tagan Turniyozov.',
    },
    relatedPersonIds: ['p-hon-turniyozov'],
    photos: ['https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'h-2',
    year: '1988',
    title: {
      uz: 'Rus tili va adabiyoti kafedrasining shakllanishi',
      ru: 'Формирование кафедры русского языка и литературы',
      en: 'Formation of the Russian Language and Literature department',
    },
    description: {
      uz: "1988-yil 5-oktabrda Tabiiy va gumanitar fanlar kafedrasidan «Rus tili», «Rus va chet el adabiyoti» hamda «Rus tili va uni o‘qitish metodikasi» kafedralari ajralib chiqdi; keyinchalik «Rus tili va adabiyoti» kafedrasi tashkil etildi.",
      ru: '5 октября 1988 года из кафедры естественных и гуманитарных наук выделились кафедры русского языка, русской и зарубежной литературы, методики; позднее создана кафедра «Русский язык и литература».',
      en: 'On 5 October 1988, Russian language and literature units were separated from Natural and Humanities sciences, later forming the Russian Language and Literature department.',
    },
    relatedPersonIds: ['p-head-ru', 'p-prof-raxmanova'],
  },
  {
    id: 'h-3',
    year: '1992',
    title: {
      uz: 'Kafedralarning mustaqil tashkil etilishi',
      ru: 'Самостоятельное формирование кафедр',
      en: 'Independent department formation',
    },
    description: {
      uz: "«O‘zbek, qozoq tillari» va «Umuminstitut chet tillari» kafedralari mustaqil tarzda shakllandi.",
      ru: 'Самостоятельно сформированы кафедры «Узбекский и казахский языки» и «Общеинститутские иностранные языки».',
      en: 'The Uzbek–Kazakh languages and Inter-institute foreign languages departments became independent units.',
    },
  },
  {
    id: 'h-4',
    year: '1995',
    title: {
      uz: 'Ingliz tili va adabiyoti kafedrasi',
      ru: 'Кафедра английского языка и литературы',
      en: 'English Language and Literature department',
    },
    description: {
      uz: "«Xorijiy til va adabiyoti (ingliz tili)» bakalavriat yo‘nalishi ochilishi munosabati bilan «Ingliz tili va adabiyoti» kafedrasi tashkil etildi (rahbar: Q.D. To‘xtayeva).",
      ru: 'В связи с открытием бакалавриата «Иностранный язык и литература (английский)» создана кафедра английского языка и литературы (рук. К.Д. Тухтаева).',
      en: 'With the opening of the English Language and Literature bachelor program, the English department was founded (head: Q.D. To‘xtayeva).',
    },
  },
  {
    id: 'h-5',
    year: '1997',
    title: {
      uz: 'Xorijiy tillar fakulteti',
      ru: 'Факультет иностранных языков',
      en: 'Faculty of Foreign Languages',
    },
    description: {
      uz: "Talabalar kontingenti ortishi natijasida «O‘zbek tili va tarix» fakulteti negizida mustaqil «Xorijiy tillar» fakulteti tashkil etildi. Turli yillarda F. Najmiddinov, R. Axmedova, T. Yusupov, Q. To‘xtayeva va boshqalar rahbarlik qilgan.",
      ru: 'Из-за роста контингента на базе факультета узбекского языка и истории создан самостоятельный факультет иностранных языков.',
      en: 'Due to student growth, an independent Faculty of Foreign Languages was established from the Uzbek language and history faculty base.',
    },
    relatedPersonIds: ['p-prof-najmiddinov'],
  },
  {
    id: 'h-6',
    year: '2021',
    title: {
      uz: 'Ingliz tili va adabiyoti / Tillar fakulteti bosqichi',
      ru: 'Этап факультета английского языка и литературы / языков',
      en: 'English Language and Literature / Languages faculty stage',
    },
    description: {
      uz: "Rektorning 2021-yil 7-sentabrdagi 380/AFO-sonli buyrug‘iga asosan Xorijiy tillar fakulteti negizida zamonaviy fakultet tashkil etildi. 2021-yildan PhD I. Shodiyev, 2024–2025-yillarda dotsent Q.D. To‘xtayeva, hozirda dekan — dotsent E.X. Musayev.",
      ru: 'Приказом ректора №380/AFO от 7 сентября 2021 г. на базе факультета иностранных языков создан современный факультет. С 2021 — PhD И. Шодиев, 2024–2025 — доц. К.Д. Тухтаева, ныне декан — доц. Э.Х. Мусаев.',
      en: 'By rector order No. 380/AFO of 7 September 2021, the modern faculty was formed. Deans: PhD I. Shodiyev (from 2021), Assoc. Prof. Q.D. To‘xtayeva (2024–25), currently Assoc. Prof. E.X. Musayev.',
    },
    relatedPersonIds: ['p-dekan'],
  },
  {
    id: 'h-7',
    year: '2021–hozir',
    title: {
      uz: 'Rus tili kafedrasi: Jumayeva F.R. rahbarligida',
      ru: 'Кафедра русского языка под руководством Ф.Р. Жумаевой',
      en: 'Russian department under F.R. Jumayeva',
    },
    description: {
      uz: "2021-yil 10-martdan kafedrani p.f.n., dotsent F.R. Jumayeva boshqaradi. 28 o‘qituvchi, ilmiy salohiyat ~33%. Polotsk DU bilan qo‘shma dastur yo‘lga qo‘yilgan. 2025-yilda E.X. Musayev va N.B. Sharopova PhD himoya qildi.",
      ru: 'С 10 марта 2021 г. кафедрой руководит к.п.н., доцент Ф.Р. Жумаева. 28 преподавателей, научный потенциал ~33%. Совместная программа с Полоцким ГУ. В 2025 г. PhD защитили Э.Х. Мусаев и Н.Б. Шаропова.',
      en: 'Since 10 March 2021 the department is led by Assoc. Prof. F.R. Jumayeva (PhD Pedagogy). 28 staff, ~33% research capacity. Joint program with Polotsk State University. In 2025 E.X. Musayev and N.B. Sharopova defended PhD.',
    },
    relatedPersonIds: ['p-head-ru', 'p-prof-raxmanova', 'p-dekan'],
  },
  {
    id: 'h-8',
    year: '2025',
    title: {
      uz: 'ACQUIN xalqaro akkreditatsiya va Osiyo hamkorligi',
      ru: 'Международная аккредитация ACQUIN и партнёрство с Азией',
      en: 'ACQUIN international accreditation and Asia partnerships',
    },
    description: {
      uz: "2025-yil 17–19-sentabrda ACQUIN (Germaniya) ekspertlari «Ingliz tili va adabiyoti» yo‘nalishini xalqaro akkreditatsiyadan o‘tkazdi — eng yuqori natijali dasturlardan biri. UCSI (Malayziya), Muhammadiyah Jakarta va UMY bilan hamkorlik kengaytirildi; 18 xodim xorijda malaka oshirdi.",
      ru: '17–19 сентября 2025 эксперты ACQUIN (Германия) провели международную аккредитацию направления «Английский язык и литература» — один из лучших результатов. Расширено сотрудничество с UCSI, Muhammadiyah Jakarta и UMY; 18 сотрудников повысили квалификацию за рубежом.',
      en: 'On 17–19 September 2025 ACQUIN (Germany) experts internationally accredited the English Language and Literature program — among the strongest results. Partnerships with UCSI, Muhammadiyah Jakarta and UMY expanded; 18 staff trained abroad.',
    },
    relatedPersonIds: ['p-head-en', 'p-dekan'],
  },
  {
    id: 'h-9',
    year: '2025–2026',
    title: {
      uz: 'Tillar fakulteti bugun: raqamlar va natijalar',
      ru: 'Факультет языков сегодня: цифры и результаты',
      en: 'Faculty of Languages today: figures and outcomes',
    },
    description: {
      uz: "7 kafedra, 148 professor-o‘qituvchi (8 fan doktori, 61 fan nomzodi), 3394 talaba (3217 bakalavriat, 177 magistratura), ilmiy salohiyat 40%. 15 darslik, 20 o‘quv qo‘llanma, 14 monografiya; 12 xorijiy va 74 OAK maqola. 105 izlanuvchi (6 DSc, 77 PhD). Dual ta’lim: Heritage va Zafar Farm. Bitiruvchilar: 1017, ishga joylashgan 549.",
      ru: '7 кафедр, 148 преподавателей (8 докторов, 61 кандидат), 3394 студента (3217 бакалавриат, 177 магистратура), научный потенциал 40%. 15 учебников, 20 пособий, 14 монографий; 12 зарубежных и 74 статей ВАК. 105 соискателей. Dual education: Heritage и Zafar Farm. Выпускники: 1017, трудоустроено 549.',
      en: '7 departments, 148 staff (8 doctors, 61 candidates), 3,394 students (3,217 bachelor, 177 master), 40% research capacity. 15 textbooks, 20 guides, 14 monographs; 12 foreign and 74 national journal articles. 105 researchers. Dual education: Heritage and Zafar Farm. Graduates: 1,017; employed: 549.',
    },
    relatedPersonIds: ['p-dekan', 'p-head-ru', 'p-head-en'],
  },
];
