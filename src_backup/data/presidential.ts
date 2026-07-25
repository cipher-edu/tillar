import type { LocaleString } from '@/types';

/** Mavzu yorlig‘i — filtr emas, faqat slaydda ko‘rsatiladi */
export type PresidentialTheme = 'language' | 'education' | 'foreign';

export interface PresidentialQuote {
  id: string;
  theme: PresidentialTheme;
  quote: LocaleString;
  sourceTitle: LocaleString;
  sourceDate: string;
  sourceUrl: string;
  photo: string;
}

export const PRESIDENT_PHOTO_FALLBACK = '/images/president/lang-1.jpg';

export const PRESIDENT_NAME: LocaleString = {
  uz: 'Shavkat Miromonovich Mirziyoyev',
  ru: 'Шавкат Миромонович Мирзиёев',
  en: 'Shavkat Miromonovich Mirziyoyev',
};

export const PRESIDENT_TITLE: LocaleString = {
  uz: "O‘zbekiston Respublikasi Prezidenti",
  ru: 'Президент Республики Узбекистан',
  en: 'President of the Republic of Uzbekistan',
};

/** 21.10.2019 — president.uz/oz/lists/view/2954 */
const SOURCE_LANG_30: LocaleString = {
  uz: "O‘zbek tiliga davlat tili maqomi berilganining o‘ttiz yilligiga bag‘ishlangan tantanali marosimdagi nutq",
  ru: 'Речь на торжественной церемонии, посвящённой тридцатилетию придания узбекскому языку статуса государственного языка',
  en: 'Address at the solemn ceremony marking thirty years of Uzbek as the state language',
};

/**
 * Ketma-ket slider tartibi: o‘zbek tili → oliy ta’lim → chet tillari.
 * Matnlar president.uz dan; suratlar lokal.
 */
export const presidentialQuotes: PresidentialQuote[] = [
  {
    id: 's1',
    theme: 'language',
    photo: '/images/president/lang-1.jpg',
    quote: {
      uz: "Dunyodagi qadimiy va boy tillardan biri bo‘lgan o‘zbek tili xalqimiz uchun milliy o‘zligimiz va mustaqil davlatchiligimiz timsoli, bebaho ma’naviy boylik, buyuk qadriyatdir.",
      ru: 'Узбекский язык — один из древних и богатых языков мира — для нашего народа является символом национальной самобытности и независимой государственности, бесценным духовным богатством, великой ценностью.',
      en: 'The Uzbek language, one of the world’s ancient and rich languages, is for our people a symbol of national identity and independent statehood, an invaluable spiritual treasure and a great value.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's2',
    theme: 'language',
    photo: '/images/president/lang-3.jpg',
    quote: {
      uz: "Ona tilimiz – milliy ma’naviyatimizning bitmas-tuganmas bulog‘idir. Shunday ekan, unga munosib hurmat va ehtirom ko‘rsatish barchamizning nafaqat vazifamiz, balki muqaddas insoniy burchimizdir.",
      ru: 'Родной язык — неиссякаемый родник нашей национальной духовности. Поэтому достойное уважение и почтение к нему — не только наш долг, но и священный человеческий долг.',
      en: 'Our mother tongue is an inexhaustible spring of national spirituality. Showing it due respect and reverence is not only our duty, but a sacred human obligation.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's3',
    theme: 'language',
    photo: '/images/president/lang-extra.jpg',
    // Manbadan to‘liq mantiqiy parchasi (oldingi jumla + “Toki…” maqsad bandi)
    quote: {
      uz: "Yosh avlod qalbiga ona tilimizni bolalikdan singdirish maqsadida ta’limning barcha bosqichlarida o‘zbek tilini zamonaviy va innovatsion texnologiyalar asosida mukammal o‘rgatishga alohida e’tibor qaratishimiz lozim. Toki, bolalarimiz o‘zbek tilida ravon o‘qiydigan, ravon yozadigan va teran fikrlaydigan insonlar bo‘lib yetishsin.",
      ru: 'Чтобы внедрить родной язык в сердца молодого поколения с детства, мы должны уделить особое внимание совершенному обучению узбекскому языку на всех ступенях образования на основе современных и инновационных технологий. Чтобы наши дети выросли людьми, свободно читающими, свободно пишущими и глубоко мыслящими на узбекском языке.',
      en: 'To instil our mother tongue in the hearts of the younger generation from childhood, we must pay special attention to teaching Uzbek thoroughly at every stage of education using modern and innovative technologies — so that our children grow into people who read fluently, write fluently and think deeply in the Uzbek language.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's4',
    theme: 'education',
    photo: '/images/president/edu-1b.jpg',
    quote: {
      uz: "Mamlakatimizda so‘nggi yillarda oliy ta’lim qamrovini kengaytirish, ta’lim sifatini oshirish, ilmiy salohiyatni mustahkamlash va xalqaro hamkorlikni rivojlantirish bo‘yicha keng ko‘lamli islohotlar amalga oshirilmoqda.",
      ru: 'В последние годы в нашей стране проводятся масштабные реформы по расширению охвата высшим образованием, повышению качества обучения, укреплению научного потенциала и развитию международного сотрудничества.',
      en: 'In recent years our country has been carrying out large-scale reforms to expand higher-education coverage, improve quality, strengthen scientific capacity and develop international cooperation.',
    },
    sourceTitle: {
      uz: "Oliy ta’lim, fan va innovatsiyalar tizimini takomillashtirishga qaratilgan takliflar taqdimoti",
      ru: 'Презентация предложений по совершенствованию системы высшего образования, науки и инноваций',
      en: 'Presentation of proposals to improve higher education, science and innovation',
    },
    sourceDate: '03.04.2026',
    sourceUrl: 'https://president.uz/oz/lists/view/9070',
  },
  {
    id: 's5',
    theme: 'education',
    photo: '/images/president/edu-2b.jpg',
    // Manba: president.uz/oz/lists/view/8127 — oldingi jumlalar + yakuniy xulosa bandi
    quote: {
      uz: "Ta’lim dasturlari eng ilg‘or mamlakatlar tajribasiga moslashtirilmoqda, darsliklar yangilanayapti, maktablarga zamonaviy jihozlar olib berilayapti. Endi muallimlar yangi metodikalarni o‘zlashtirib, bolalarga yaxshi bilim berishi kerak. Buning uchun pedagogika yo‘nalishidagi oliy ta’lim sifatini oshirish zarur.",
      ru: 'Образовательные программы приводятся в соответствие с опытом самых передовых стран, обновляются учебники, школы оснащаются современным оборудованием. Теперь учителя должны освоить новые методики и давать детям качественные знания. Для этого необходимо повысить качество высшего образования по педагогическим направлениям.',
      en: 'Education programmes are being aligned with the experience of the most advanced countries, textbooks are being updated, and schools are being equipped with modern facilities. Teachers must now master new methods and provide children with strong knowledge. To this end, the quality of higher education in pedagogical fields must be raised.',
    },
    sourceTitle: {
      uz: "Maktab ta’limidagi islohotlarning yangi bosqichi (videoselektor yig‘ilishi)",
      ru: 'Новый этап реформ школьного образования (видеоселекторное совещание)',
      en: 'New stage of school education reforms (video conference meeting)',
    },
    sourceDate: '15.05.2025',
    sourceUrl: 'https://president.uz/oz/lists/view/8127',
  },
  {
    id: 's6',
    theme: 'education',
    photo: '/images/president/lang-1.jpg',
    quote: {
      uz: "Davlatimiz tomonidan ma’naviy hayotimizni yanada rivojlantirish, jumladan, ta’lim-tarbiya ishlarini zamon talablari asosida tashkil etish, madaniyat, san’at va adabiyot sohalarini takomillashtirish, kitobxonlik madaniyatini oshirish bo‘yicha qabul qilingan o‘nlab farmon va qarorlar o‘zbek tili ravnaqiga bevosita xizmat qilmoqda.",
      ru: 'Десятки указов и постановлений, принятых государством для дальнейшего развития духовной жизни — в том числе организации образования и воспитания в соответствии с требованиями времени, совершенствования культуры, искусства и литературы, повышения культуры чтения — непосредственно служат развитию узбекского языка.',
      en: 'Dozens of decrees and resolutions adopted by the state to further develop spiritual life — including organising education in line with modern requirements, improving culture, arts and literature, and raising reading culture — directly serve the flourishing of the Uzbek language.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's7',
    theme: 'foreign',
    photo: '/images/president/edu-1b.jpg',
    quote: {
      uz: "Biz yoshlarimizning jahon tillarini egallashga bo‘lgan ulkan qiziqish va intilishlarini har doim qo‘llab-quvvatlaymiz.",
      ru: 'Мы всегда поддерживаем огромный интерес и стремление нашей молодёжи к овладению мировыми языками.',
      en: 'We always support our youth’s great interest and drive to master world languages.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's8',
    theme: 'foreign',
    photo: '/images/president/lang-3.jpg',
    quote: {
      uz: "Dono xalqimiz “Til bilgan – el biladi” deydi. Bu borada buyuk bobolarimiz ibrat va namuna ko‘rsatganlar.",
      ru: 'Наш мудрый народ говорит: «Кто знает язык — знает народ». В этом великие предки подали нам пример.',
      en: 'Our wise people say: “He who knows a language knows a people.” Our great ancestors set an example in this.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
  {
    id: 's9',
    theme: 'foreign',
    photo: '/images/president/lang-extra.jpg',
    quote: {
      uz: "Bugungi kunda yurtimizdagi ta’lim maskanlarida ingliz, rus, nemis, fransuz, ispan, italyan, arab, fors, turk, xitoy, yapon, koreys, hind va urdu tillari chuqur o‘qitilayotgani bu an’analar davom etayotganining yorqin ifodasidir.",
      ru: 'То, что сегодня в учебных заведениях страны углублённо преподаются английский, русский, немецкий, французский, испанский, итальянский, арабский, персидский, турецкий, китайский, японский, корейский, хинди и урду, — яркое свидетельство продолжения этих традиций.',
      en: 'The fact that English, Russian, German, French, Spanish, Italian, Arabic, Persian, Turkish, Chinese, Japanese, Korean, Hindi and Urdu are taught in depth at educational institutions today is a clear sign that these traditions continue.',
    },
    sourceTitle: SOURCE_LANG_30,
    sourceDate: '21.10.2019',
    sourceUrl: 'https://president.uz/oz/lists/view/2954',
  },
];
