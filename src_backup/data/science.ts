import type { Project, Publication } from '@/types';

export const projects: Project[] = [
  {
    id: 'pr-1',
    slug: 'navoiy-raqamli-korpus',
    title: {
      uz: 'Navoiy asarlari raqamli korpusi',
      ru: 'Цифровой корпус произведений Навои',
      en: 'Digital corpus of Navoi works',
    },
    leaderId: 'p-head-uz',
    participantIds: ['p-st-3', 'p-dekan'],
    status: 'ongoing',
    grant: {
      uz: 'Universitet ichki granti',
      ru: 'Внутренний грант университета',
      en: 'University internal grant',
    },
    description: {
      uz: "Navoiy g'azallarining raqamli annotatsiyasi va semantik tahlili.",
      ru: 'Цифровая аннотация и семантический анализ газелей Навои.',
      en: 'Digital annotation and semantic analysis of Navoi ghazals.',
    },
    results: {
      uz: "5000+ bayt annotatsiya qilingan, dastlabki nashr tayyorlanmoqda.",
      ru: 'Аннотировано 5000+ байтов, готовится первая публикация.',
      en: '5000+ bayts annotated; first publication in preparation.',
    },
  },
  {
    id: 'pr-2',
    slug: 'dual-talim-heritage',
    title: {
      uz: 'Dual ta’lim: Heritage va Zafar Farm',
      ru: 'Дуальное образование: Heritage и Zafar Farm',
      en: 'Dual education: Heritage and Zafar Farm',
    },
    leaderId: 'p-head-en',
    participantIds: ['p-tutor-1', 'p-dekan'],
    status: 'ongoing',
    grant: {
      uz: 'PF-5847, PQ-4939, PQ-378 ijrosi',
      ru: 'Исполнение УП-5847, ПП-4939, ПП-378',
      en: 'Implementation of PF-5847, PQ-4939, PQ-378',
    },
    description: {
      uz: '«Heritage» nodavlat ta’lim tashkiloti MCHJ negizida Ingliz tili amaliy fanlar kafedrasi qo‘shma filiali; «Zafar Farm – 2021» bilan amaliy ko‘nikmalarni ishlab chiqarish sharoitida mustahkamlash.',
      ru: 'Совместный филиал кафедры практических дисциплин английского на базе ООО «Heritage»; договор с «Zafar Farm – 2021» для практики на производстве.',
      en: 'Joint branch of the Practical English department at Heritage LLC; agreement with Zafar Farm – 2021 for workplace practice.',
    },
    results: {
      uz: 'Bitiruvchilarning ishlab chiqarishga moslashuvi va bandligini qo‘llab-quvvatlash mexanizmi yo‘lga qo‘yilgan.',
      ru: 'Запущен механизм поддержки адаптации и трудоустройства выпускников.',
      en: 'A mechanism supporting graduate workplace adaptation and employment is in place.',
    },
  },
  {
    id: 'pr-3',
    slug: 'acquinn-ingliz-akkreditatsiya',
    title: {
      uz: 'ACQUIN xalqaro akkreditatsiya (Ingliz tili va adabiyoti)',
      ru: 'Международная аккредитация ACQUIN (английский язык и литература)',
      en: 'ACQUIN international accreditation (English Language and Literature)',
    },
    leaderId: 'p-head-en',
    participantIds: ['p-dekan', 'p-prof-2'],
    status: 'completed',
    grant: {
      uz: 'ACQUIN (Germaniya) ekspert tashrifi, 2025-yil 17–19-sentabr',
      ru: 'Визит экспертов ACQUIN (Германия), 17–19 сентября 2025',
      en: 'ACQUIN (Germany) expert visit, 17–19 September 2025',
    },
    description: {
      uz: '«Ingliz tili va adabiyoti» yo‘nalishi xalqaro akkreditatsiyadan o‘tkazildi — universitetdagi eng yuqori natijali dasturlardan biri.',
      ru: 'Направление «Английский язык и литература» прошло международную аккредитацию — один из лучших результатов в университете.',
      en: 'The English Language and Literature program completed international accreditation — among the university’s strongest outcomes.',
    },
    results: {
      uz: 'So‘nggi 3 yilda ~200 talaba CEFR B2, 15+ talaba IELTS 6.0–7.5.',
      ru: 'За 3 года ~200 студентов CEFR B2, 15+ студентов IELTS 6.0–7.5.',
      en: 'In 3 years ~200 students reached CEFR B2; 15+ achieved IELTS 6.0–7.5.',
    },
  },
  {
    id: 'pr-4',
    slug: 'xalqaro-anjuman-2025',
    title: {
      uz: 'Globallashuv jarayonida zamonaviy tilshunoslik anjumani',
      ru: 'Конференция по современной лингвистике в условиях глобализации',
      en: 'Conference on modern linguistics in globalization',
    },
    leaderId: 'p-head-en',
    participantIds: ['p-prof-2', 'p-dekan'],
    status: 'completed',
    description: {
      uz: '2025-yil 4-dekabr: “Globallashuv jarayonida zamonaviy tilshunoslikning fan, ta’lim va amaliyot bilan integratsiyasi” — “Science and Innovation” jurnali hamkorligida. O‘zDJTU, MU, QarIPI, UCSI (Malayziya), Jakarta Muhammadiya universiteti ishtirok etdi.',
      ru: '4 декабря 2025: международная конференция при участии вузов Узбекистана, UCSI (Малайзия) и Muhammadiyah Jakarta.',
      en: '4 December 2025: international conference with Uzbek HEIs, UCSI (Malaysia) and Muhammadiyah Jakarta.',
    },
    results: {
      uz: 'Maqolalar Index Copernicus, Zenodo, OpenAIRE, CyberLeninka va Google Scholar’da indekslandi.',
      ru: 'Статьи проиндексированы в Index Copernicus, Zenodo, OpenAIRE, CyberLeninka и Google Scholar.',
      en: 'Papers indexed in Index Copernicus, Zenodo, OpenAIRE, CyberLeninka and Google Scholar.',
    },
  },
];

/**
 * 2025–2026 nashrlar (hisobot): darslik 15, o‘quv qo‘llanma 20, monografiya 14,
 * xorijiy maqola 12, OAK maqola 74. Fakultet ilmiy salohiyati: 40%.
 */
export const publications: Publication[] = [
  {
    id: 'pub-1',
    year: 2025,
    type: 'article',
    indexed: 'scopus',
    authors: ['p-head-uz', 'p-st-3'],
    departmentId: 'dep-uzbek',
    title: {
      uz: 'Navoiy g‘azallarida leksik parallelizm: korpus tahlili',
      ru: 'Лексический параллелизм в газелях Навои: корпусной анализ',
      en: 'Lexical parallelism in Navoi ghazals: a corpus analysis',
    },
  },
  {
    id: 'pub-2',
    year: 2025,
    type: 'article',
    indexed: 'wos',
    authors: ['p-prof-raxmanova'],
    departmentId: 'dep-russian',
    title: {
      uz: "Rus adabiyotidagi Qur’on motivlari madaniyatlararo muloqot hodisasi sifatida",
      ru: 'Коранические мотивы в русской литературе как феномен межкультурной коммуникации',
      en: 'Quranic motifs in Russian literature as intercultural communication',
    },
  },
  {
    id: 'pub-3',
    year: 2025,
    type: 'textbook',
    indexed: 'none',
    authors: ['p-prof-raxmanova'],
    departmentId: 'dep-russian',
    title: {
      uz: 'Poetik matn rivojidagi an’analar va yangilik (darslik)',
      ru: 'Традиции и новаторство в развитии поэтического текста (учебник)',
      en: 'Tradition and innovation in poetic text development (textbook)',
    },
  },
  {
    id: 'pub-4',
    year: 2025,
    type: 'monograph',
    indexed: 'none',
    authors: ['p-prof-raxmanova'],
    departmentId: 'dep-russian',
    title: {
      uz: 'Qur’on motivlari rus adabiyotida madaniyatlararo muloqot hodisasi sifatida (monografiya)',
      ru: 'Коранические мотивы в русской литературе (монография)',
      en: 'Quranic motifs in Russian literature (monograph)',
    },
  },
  {
    id: 'pub-5',
    year: 2025,
    type: 'article',
    indexed: 'none',
    authors: ['p-dekan'],
    departmentId: 'dep-russian',
    title: {
      uz: "O‘zbek va rus tillarida fe’l semantikasining chog‘ishtirma tadqiqi (PhD ishi yo‘nalishi)",
      ru: 'Сопоставительное исследование семантики глагола в узбекском и русском языках',
      en: 'Comparative study of verb semantics in Uzbek and Russian',
    },
  },
  {
    id: 'pub-6',
    year: 2025,
    type: 'textbook',
    indexed: 'none',
    authors: ['p-head-ru', 'p-teach-kamalova'],
    departmentId: 'dep-russian',
    title: {
      uz: 'Talabalar uchun rus tili (o‘quv materiallari)',
      ru: 'Русский язык для студентов (учебные материалы)',
      en: 'Russian for students (teaching materials)',
    },
  },
  {
    id: 'pub-7',
    year: 2026,
    type: 'textbook',
    indexed: 'none',
    authors: ['p-teach-hayit'],
    departmentId: 'dep-russian',
    title: {
      uz: 'Prakticheskiy russkiy yazyk (darslik)',
      ru: 'Практический русский язык (учебник)',
      en: 'Practical Russian (textbook)',
    },
  },
  {
    id: 'pub-8',
    year: 2025,
    type: 'textbook',
    indexed: 'none',
    authors: ['p-prof-1'],
    departmentId: 'dep-kazakh',
    title: {
      uz: 'Qozoq tilining teoretik grammatikasi (G‘. Kumakbayeva)',
      ru: 'Теоретическая грамматика казахского языка (Г. Кумакбаева)',
      en: 'Theoretical grammar of the Kazakh language (G. Kumakbayeva)',
    },
  },
  {
    id: 'pub-9',
    year: 2025,
    type: 'textbook',
    indexed: 'none',
    authors: ['p-prof-1'],
    departmentId: 'dep-kazakh',
    title: {
      uz: 'Qozoq adabiyoti tarixi — XX asr adabiyoti (M. Kushkarbekova)',
      ru: 'История казахской литературы — литература XX века (М. Кушкарбекова)',
      en: 'History of Kazakh literature — 20th century (M. Kushkarbekova)',
    },
  },
  {
    id: 'pub-10',
    year: 2025,
    type: 'monograph',
    indexed: 'none',
    authors: ['p-prof-1'],
    departmentId: 'dep-kazakh',
    title: {
      uz: 'O‘zbekiston Respublikasi Qizilqum hududi toponimlarining tarixiy-lingvistik tadqiqi (L.D. Berdimuratova, ISBN 978-9910-271-27-4)',
      ru: 'Историко-лингвистическое исследование топонимов Кызылкума (Л.Д. Бердимуратова)',
      en: 'Historical-linguistic study of Kyzylkum toponyms (L.D. Berdimuratova)',
    },
  },
  {
    id: 'pub-11',
    year: 2025,
    type: 'article',
    indexed: 'scopus',
    authors: ['p-head-en', 'p-st-2'],
    departmentId: 'dep-english-ling',
    title: {
      uz: 'Badiiy matndagi intertekstuallik va interdiskursivlikning tarjimada voqelanishi (N.K. Raximova va iqtidorli talabalar maqolalari)',
      ru: 'Интертекстуальность и интердискурсивность в переводе художественного текста',
      en: 'Intertextuality and interdiscursivity in literary translation',
    },
  },
];

export const getProject = (idOrSlug: string) =>
  projects.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
