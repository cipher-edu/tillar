import type { Department } from '@/types';

/**
 * 7 kafedra — 2025–2026 o‘quv yili hisoboti.
 * Ilmiy salohiyat (umumiy): O‘zbek tilshunosligi 100%, O‘zbek tili va adabiyoti 63,1%,
 * Rus 33%, Ingliz tilshunosligi 24%, Qozoq 20%, Ingliz amaliy fanlar 18%, Fakultetlararo 16%.
 */
export const departments: Department[] = [
  {
    id: 'dep-uzbek-ling',
    slug: 'ozbek-tilshunosligi',
    name: {
      uz: 'O‘zbek tilshunosligi kafedrasi',
      ru: 'Кафедра узбекского языкознания',
      en: 'Department of Uzbek Linguistics',
    },
    headId: 'p-head-uz',
    description: {
      uz: 'O‘zbek tili nazariyasi va zamonaviy tilshunoslik. Ilmiy salohiyat: 100% (3 fan doktori/professor — 21,4%; 11 fan nomzodi/dotsent — 78,6%). 2025–2026 o‘quv yilida o‘quv yuklamasi 14 734 soat — to‘liq bajarilgan.',
      ru: 'Теория узбекского языка и современная лингвистика. Научный потенциал: 100% (3 доктора/профессора — 21,4%; 11 кандидатов/доцентов — 78,6%). Учебная нагрузка 2025–2026: 14 734 ч. — выполнена полностью.',
      en: 'Uzbek language theory and modern linguistics. Research capacity: 100% (3 doctors/professors — 21.4%; 11 candidates/associate professors — 78.6%). Teaching load 2025–2026: 14,734 hours — fully delivered.',
    },
    researchAreas: [
      { uz: 'O‘zbek tili nazariyasi', ru: 'Теория узбекского языка', en: 'Uzbek language theory' },
      { uz: 'Leksikografiya', ru: 'Лексикография', en: 'Lexicography' },
      { uz: 'Zamonaviy tilshunoslik', ru: 'Современная лингвистика', en: 'Modern linguistics' },
    ],
    professorIds: ['p-head-uz'],
  },
  {
    id: 'dep-uzbek',
    slug: 'ozbek-tili-adabiyoti',
    name: {
      uz: "O'zbek tili va adabiyoti kafedrasi",
      ru: 'Кафедра узбекского языка и литературы',
      en: 'Department of Uzbek Language and Literature',
    },
    headId: 'p-head-uz',
    description: {
      uz: "O'zbek tili, adabiyoti, navoiyshunoslik. Ilmiy salohiyat: 63,1%. Asosiy shtatda 29, ichki o‘rindoshlikda 2 professor-o‘qituvchi (2 fan doktori-professor, 21 fan nomzodi-dotsent, 4 katta o‘qituvchi, 3 assistent). 2025–2026 o‘quv yuklamasi 22 576,1 soat — to‘liq bajarilgan.",
      ru: 'Узбекский язык, литература, навоиеведение. Научный потенциал: 63,1%. Основной штат 29 + 2 внутренних совместителя (2 доктора-профессора, 21 кандидат-доцент, 4 ст. преподавателя, 3 ассистента). Нагрузка 2025–2026: 22 576,1 ч.',
      en: 'Uzbek language, literature, Navoi studies. Research capacity: 63.1%. 29 full-time + 2 internal part-time staff (2 doctor-professors, 21 candidate-associate professors, 4 senior lecturers, 3 assistants). Load 2025–2026: 22,576.1 hours.',
    },
    researchAreas: [
      { uz: 'Navoiyshunoslik', ru: 'Навоиеведение', en: 'Navoi studies' },
      { uz: 'Zamonaviy o‘zbek adabiyoti', ru: 'Современная узбекская литература', en: 'Modern Uzbek literature' },
      { uz: 'Matnshunoslik', ru: 'Текстология', en: 'Textology' },
    ],
    professorIds: ['p-head-uz'],
  },
  {
    id: 'dep-english-ling',
    slug: 'ingliz-tilshunosligi',
    name: {
      uz: 'Ingliz tilshunosligi kafedrasi',
      ru: 'Кафедра английской лингвистики',
      en: 'Department of English Linguistics',
    },
    headId: 'p-head-en',
    description: {
      uz: 'Ingliz tili nazariyasi, fonetika, grammatika va tilshunoslik tadqiqotlari. Ilmiy salohiyat: 24%. 2025–2026: 29 professor-o‘qituvchi (4 dotsent, 1 dotsent v.b., 3 katta o‘qituvchi, 19 o‘qituvchi); o‘quv yuklamasi 18 734 soat — to‘liq bajarilgan. “English for Practical Purposes” o‘quv qo‘llanmasi nashrga tayyorlandi. 2025-yil 4-dekabrda xalqaro ilmiy-amaliy anjuman o‘tkazildi.',
      ru: 'Теория английского языка, фонетика, грамматика. Научный потенциал: 24%. 2025–2026: 29 преподавателей; нагрузка 18 734 ч. Подготовлено пособие «English for Practical Purposes». 4 декабря 2025 — международная конференция.',
      en: 'English language theory, phonetics, grammar. Research capacity: 24%. 2025–2026: 29 staff; load 18,734 hours. “English for Practical Purposes” guide prepared. International conference held 4 Dec 2025.',
    },
    researchAreas: [
      { uz: 'Ingliz tili nazariyasi', ru: 'Теория английского', en: 'English language theory' },
      { uz: 'Amaliy tilshunoslik', ru: 'Прикладная лингвистика', en: 'Applied linguistics' },
      { uz: 'Intertekstuallik va tarjima', ru: 'Интертекстуальность и перевод', en: 'Intertextuality and translation' },
    ],
    professorIds: ['p-head-en'],
  },
  {
    id: 'dep-english',
    slug: 'ingliz-tili-amaliy',
    name: {
      uz: 'Ingliz tili amaliy fanlar kafedrasi',
      ru: 'Кафедра практических дисциплин английского языка',
      en: 'Department of Practical English Disciplines',
    },
    headId: 'p-head-en',
    description: {
      uz: 'Ingliz tili amaliyoti, akademik yozuv va nutq madaniyati. Ilmiy salohiyat: 18%. 2025–2026: 29 professor-o‘qituvchi (4 dotsent, 1 dotsent v.b., 3 katta o‘qituvchi, 19 o‘qituvchi); o‘quv yuklamasi 19 361,8 soat (amaliy 12 630, ma’ruza 210, seminar 60, laboratoriya 270, reyting 2352,5 va b.) — to‘liq bajarilgan. “Heritage” MCHJ negizida qo‘shma filial; “Zafar Farm – 2021” bilan dual ta’lim shartnomasi.',
      ru: 'Практика английского, академическое письмо. Научный потенциал: 18%. 2025–2026: 29 преподавателей; нагрузка 19 361,8 ч. Совместный филиал на базе «Heritage»; договор dual education с «Zafar Farm – 2021».',
      en: 'Practical English, academic writing. Research capacity: 18%. 2025–2026: 29 staff; load 19,361.8 hours. Joint branch with Heritage LLC; dual-education agreement with Zafar Farm – 2021.',
    },
    researchAreas: [
      { uz: 'Ingliz tili metodikasi', ru: 'Методика английского', en: 'English methodology' },
      { uz: 'Akademik yozuv', ru: 'Академическое письмо', en: 'Academic writing' },
      { uz: 'Dual ta’lim', ru: 'Дуальное образование', en: 'Dual education' },
    ],
    professorIds: ['p-head-en', 'p-prof-3', 'p-tutor-1'],
  },
  {
    id: 'dep-inter-foreign',
    slug: 'fakultetlararo-chet-tili',
    name: {
      uz: 'Fakultetlararo chet tili kafedrasi',
      ru: 'Межфакультетская кафедра иностранных языков',
      en: 'Inter-faculty Department of Foreign Languages',
    },
    headId: 'p-prof-2',
    description: {
      uz: 'Barcha fakultetlar uchun chet tillari. Ilmiy salohiyat: 16% (batafsil 17,8%). 42 o‘qituvchi (3 dotsent, 2 v.b. dotsent, 3 PhD, 4 katta o‘qituvchi, 33 o‘qituvchi). 2025–2026 yuklama 27 012,5 soat (auditoriyа 23 838; reyting 3174,5). 1–3 kurslarning 58 ta yo‘nalishiga xorijiy tillar o‘qitiladi (ingliz, nemis, fransuz, italyan, xitoy). O‘quv adabiyotlari bilan ta’minlanganlik 100% (ARM: 51 ta). Scopus/WoS 2, OAK 64+ maqola; 3 monografiya nashrga tavsiya.',
      ru: 'Иностранные языки для всех факультетов. Научный потенциал: 16% (детально 17,8%). 42 преподавателя; нагрузка 27 012,5 ч. Обучение на 58 направлениях (англ., нем., фр., итал., кит.). Обеспеченность учебниками 100%.',
      en: 'Foreign languages for all faculties. Research capacity: 16% (detail 17.8%). 42 staff; load 27,012.5 hours. Teaching across 58 programs (English, German, French, Italian, Chinese). Textbook coverage 100%.',
    },
    researchAreas: [
      { uz: 'Chet tili metodikasi', ru: 'Методика иностранного языка', en: 'FL methodology' },
      { uz: 'Kasbiy til', ru: 'Профессиональный язык', en: 'Language for specific purposes' },
      { uz: 'Ko‘p tillilik', ru: 'Многоязычие', en: 'Multilingualism' },
    ],
    professorIds: ['p-prof-2'],
  },
  {
    id: 'dep-russian',
    slug: 'rus-tili',
    name: {
      uz: 'Rus tili va adabiyoti kafedrasi',
      ru: 'Кафедра русского языка и литературы',
      en: 'Department of Russian Language and Literature',
    },
    headId: 'p-head-ru',
    description: {
      uz: '1988-yildan. Bakalavriat: «Rus tili va adabiyoti», «O‘zga tilli guruhlarda rus tili va adabiyoti»; magistratura yo‘nalishlari. 28 professor-o‘qituvchi (3 katta o‘qituvchi, 17 assistent-o‘qituvchi va b.); ilmiy salohiyat 33% (hisobot: 32%). Mudir: dots. F.R. Jumayeva (2021-yildan). 2025-yilda E.X. Musayev va N.B. Sharopova PhD himoya qildi. 822 talaba, shundan 225 iqtidorli; 2 ilmiy-ijodiy to‘garak.',
      ru: 'С 1988 г. Бакалавриат и магистратура по русскому языку и литературе. 28 преподавателей; научный потенциал 33%. Зав. каф.: доц. Ф.Р. Жумаева (с 2021). В 2025 г. PhD защитили Э.Х. Мусаев и Н.Б. Шаропова. 822 студента, 225 одарённых.',
      en: 'Since 1988. Bachelor and master tracks in Russian. 28 staff; research capacity 33%. Head: Assoc. Prof. F.R. Jumayeva (since 2021). In 2025 E.X. Musayev and N.B. Sharopova defended PhD. 822 students, 225 gifted.',
    },
    researchAreas: [
      { uz: 'Qiyosiy adabiyotshunoslik', ru: 'Сравнительное литературоведение', en: 'Comparative literature' },
      { uz: 'Chog‘ishtirma tilshunoslik', ru: 'Сопоставительная лингвистика', en: 'Comparative linguistics' },
      { uz: 'Tarjimashunoslik', ru: 'Переводоведение', en: 'Translation studies' },
      { uz: 'RFL (rus tili chet tili sifatida)', ru: 'РКИ', en: 'Russian as a foreign language' },
    ],
    professorIds: [
      'p-head-ru',
      'p-prof-raxmanova',
      'p-prof-ibragimova',
      'p-prof-aripova',
      'p-prof-roziyeva',
      'p-dekan',
      'p-teach-fefelova',
      'p-teach-kamalova',
      'p-teach-hayit',
      'p-teach-sidirova',
      'p-teach-shamsieva',
      'p-teach-xolov',
      'p-teach-halikova',
    ],
  },
  {
    id: 'dep-kazakh',
    slug: 'qozoq-tili-adabiyoti',
    name: {
      uz: 'Qozoq tili va adabiyoti kafedrasi',
      ru: 'Кафедра казахского языка и литературы',
      en: 'Department of Kazakh Language and Literature',
    },
    headId: 'p-prof-1',
    description: {
      uz: 'Qozoq tili, adabiyoti va madaniyatlararo muloqot. Ilmiy salohiyat: 20%. 5 o‘qituvchi; 2025–2026 o‘quv yuklamasi 4384 soat; 2 blokda 25 asosiy va 9 tanlov fani. Nashrlar: “Qozoq tilining teoretik grammatikasi”, “Qozoq adabiyoti tarixi (XX asr)”, L.D. Berdimuratova monografiyasi va b. 13 ilmiy maqola; “Yosh tilchi” va “Yosh ijodkor” to‘garaklari. Yil yakunida 7 nafar bitiruvchi imtiyozli diplomga tavsiya etildi.',
      ru: 'Казахский язык, литература и межкультурная коммуникация. Научный потенциал: 20%. 5 преподавателей; нагрузка 4384 ч. Изданы учебники и монография; 13 научных статей. Кружки «Жас тілші» и «Жас шығармашыл».',
      en: 'Kazakh language, literature and intercultural communication. Research capacity: 20%. 5 staff; load 4,384 hours. Textbooks and a monograph published; 13 research papers. “Young linguist” and “Young creator” clubs.',
    },
    researchAreas: [
      { uz: 'Qozoq filologiyasi', ru: 'Казахская филология', en: 'Kazakh philology' },
      { uz: 'Dialektologiya va toponimika', ru: 'Диалектология и топонимика', en: 'Dialectology and toponymy' },
      { uz: 'Madaniyatlararo muloqot', ru: 'Межкультурная коммуникация', en: 'Intercultural communication' },
    ],
    professorIds: ['p-prof-1'],
  },
];

export const getDepartment = (idOrSlug: string) =>
  departments.find((d) => d.id === idOrSlug || d.slug === idOrSlug);
