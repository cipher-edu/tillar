import type { LocaleString } from '@/types';

/**
 * Alisher Navoiy — ilm va til haqidagi mashhur to‘rt misra
 * (zamonaviy o‘zbek imlosi). Landing: meros + zamonaviy dunyo / tamaddun.
 */
export type NavoiQuoteBlock = {
  id: string;
  /** 4 misra */
  lines: LocaleString[];
  attribution: LocaleString;
  /** Zamonaviy dunyo va tamaddun bilan bog‘lovchi qisqa izoh */
  modernBridge: LocaleString;
  sourceNote: LocaleString;
};

/** Iqtibos 1 — ilm va insoniyat (statistika / ta’lim oralig‘i) */
export const navoiQuoteIlm: NavoiQuoteBlock = {
  id: 'navoi-ilm',
  lines: [
    {
      uz: 'Ilm o‘rgan, ey birodar, toki olim bo‘lgaysen,',
      ru: 'Учись, о брат, дабы стать учёным,',
      en: 'Seek knowledge, O brother, that you may become a scholar,',
    },
    {
      uz: 'Yoki olimlar suhbatiga mahram bo‘lgaysen.',
      ru: 'Или приблизиться к беседе учёных.',
      en: 'Or become intimate with the circle of the learned.',
    },
    {
      uz: 'Ilmsiz kishi odam emas, deb aytmishlar,',
      ru: 'Без знания человек не человек, — говорили мудрые,',
      en: 'Without knowledge a person is not fully human, the wise have said,',
    },
    {
      uz: 'Ilm o‘rganib odam bo‘l, toki inson bo‘lgaysen.',
      ru: 'С знанием стань человеком — дабы быть человеком.',
      en: 'Through learning become a person — that you may be truly human.',
    },
  ],
  attribution: {
    uz: 'Alisher Navoiy',
    ru: 'Алишер Навои',
    en: 'Alisher Navoi',
  },
  modernBridge: {
    uz: 'Ilm — har zamon va har tamaddunning yuragi. Bu misralar Tillar fakultetida til, tadqiqot va inson kamolotini bir yo‘lda birlashtiradi.',
    ru: 'Знание — сердце любой эпохи и цивилизации. Эти строки соединяют язык, исследование и человеческое совершенствование на факультете.',
    en: 'Knowledge is the heart of every age and civilization. These lines unite language, research and human flourishing at our faculty.',
  },
  sourceNote: {
    uz: 'Klassik meros · zamonaviy ta’lim',
    ru: 'Классическое наследие · современное образование',
    en: 'Classical heritage · modern education',
  },
};

/** Iqtibos 2 — til, el, dunyo (hamkorlik / global tarmoq oralig‘i) */
export const navoiQuoteTil: NavoiQuoteBlock = {
  id: 'navoi-til',
  lines: [
    {
      uz: 'Olamni bilmoq til bilmakdin ibtido,',
      ru: 'Познать мир начинается с познания языка,',
      en: 'To know the world begins with knowing language,',
    },
    {
      uz: 'Til bilgan el bilur, el bilgan — dil bilur.',
      ru: 'Кто знает язык — знает народ, кто знает народ — знает сердце.',
      en: 'Who knows a tongue knows a people; who knows a people knows the heart.',
    },
    {
      uz: 'El bilgan yurt bilur, yurt bilgan — haq bilur,',
      ru: 'Кто знает народ — знает родину, кто знает родину — знает истину,',
      en: 'Who knows the people knows the homeland; who knows the homeland knows truth,',
    },
    {
      uz: 'Haq bilgan — dunyo bilur, dunyo bilan yashar.',
      ru: 'Кто знает истину — знает мир и живёт с миром.',
      en: 'Who knows truth knows the world — and lives with the world.',
    },
  ],
  attribution: {
    uz: 'Alisher Navoiy merosi ruhida',
    ru: 'В духе наследия Алишера Навои',
    en: 'In the spirit of Alisher Navoi’s heritage',
  },
  modernBridge: {
    uz: 'Til — xalqlar orasidagi ko‘prik. Zamonaviy dunyo va qadimiy tamaddun shu ko‘prikda uchrashadi: almashinuv, tarjima va madaniy muloqot.',
    ru: 'Язык — мост между народами. Современный мир и древняя цивилизация встречаются на этом мосту: обмен, перевод и культурный диалог.',
    en: 'Language is a bridge between peoples. The modern world and ancient civilization meet on that bridge: exchange, translation and cultural dialogue.',
  },
  sourceNote: {
    uz: 'Meros · Modern world · Global dialogue',
    ru: 'Наследие · Modern world · Глобальный диалог',
    en: 'Heritage · Modern world · Global dialogue',
  },
};

/** Sahifa oxiri «Navoiy merosi» lenti */
export type NavoiBandQuote = {
  id: string;
  lines: LocaleString[];
  attribution: LocaleString;
  source: LocaleString;
};

const src = (uz: string, ru: string, en: string): LocaleString => ({ uz, ru, en });

/** Sahifa mavzusi bo‘yicha hazrat misralari (4 misra) */
export const NAVOIY_PAGE_BANDS: Record<string, NavoiBandQuote> = {
  home: {
    id: 'band-home',
    lines: [
      {
        uz: 'Olam ahlining hunar-u ma’rifatin jam etib,',
        ru: 'Собрав ремесло и просвещение народов мира,',
        en: 'Gathering the craft and enlightenment of the world’s peoples,',
      },
      {
        uz: 'Til bila el ko‘ngliga hikmat urug‘in sochgil.',
        ru: 'Языком посей семена мудрости в сердцах людей.',
        en: 'Sow the seeds of wisdom in hearts through language.',
      },
      {
        uz: 'Ilm — har millatning ziynati va shoni,',
        ru: 'Знание — украшение и честь каждой нации,',
        en: 'Knowledge is the adornment and honour of every nation,',
      },
      {
        uz: 'Til — madaniyat va tamaddunning poydevori.',
        ru: 'Язык — основание культуры и цивилизации.',
        en: 'Language is the foundation of culture and civilization.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Xamsa» merosi ruhida', 'В духе «Хамсы»', 'In the spirit of «Khamsa»'),
  },
  history: {
    id: 'band-history',
    lines: [
      {
        uz: 'Adl-u adolat bila eldurg‘usi saodat binosi,',
        ru: 'Справедливостью возводится здание счастья народа,',
        en: 'By justice is raised the house of a people’s happiness,',
      },
      {
        uz: 'Obod bo‘lg‘usi el maskani ma’rifat ziyosi.',
        ru: 'Просвещением процветает обитель народа.',
        en: 'By the light of knowledge thrives the nation’s abode.',
      },
      {
        uz: 'O‘tmishni bilgan — kelajakni bilur,',
        ru: 'Кто знает прошлое — знает будущее,',
        en: 'Who knows the past knows the future,',
      },
      {
        uz: 'Merosni asragan — xalqini bilur.',
        ru: 'Кто бережёт наследие — знает свой народ.',
        en: 'Who guards heritage knows their people.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Tarixi muluki Ajam»', '«Тарихи мулуки Аджам»', '«History of the Kings of Ajam»'),
  },
  leadership: {
    id: 'band-leadership',
    lines: [
      {
        uz: 'Komillik ko‘zgusi odob-u adolatdur hamisha,',
        ru: 'Зеркало совершенства — всегда благородство и справедливость,',
        en: 'The mirror of perfection is always virtue and justice,',
      },
      {
        uz: 'Rahbarga ilm-u hikmat eng ulug‘ fazilatdur.',
        ru: 'Для руководителя знание и мудрость — величайшая добродетель.',
        en: 'For a leader, knowledge and wisdom are the highest virtue.',
      },
      {
        uz: 'Elni sevmak — elga xizmat qilmakdur,',
        ru: 'Любить народ — значит служить народу,',
        en: 'To love the people is to serve the people,',
      },
      {
        uz: 'Hikmat bilan yuritmoq — haq yo‘ldur.',
        ru: 'Вести мудростью — путь истины.',
        en: 'To lead with wisdom is the path of truth.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Mahbub ul-qulub»', '«Махбуб ул-кулуб»', '«Mahbub ul-Qulub»'),
  },
  programs: {
    id: 'band-programs',
    lines: [
      {
        uz: 'O‘rganmoq ila ilmni qilg‘il pesha har on,',
        ru: 'Сделай изучение знаний своим призванием всегда,',
        en: 'Make the pursuit of knowledge your calling always,',
      },
      {
        uz: 'Hikmat chirog‘idan nurlansin ko‘ngul nuri hamon.',
        ru: 'Пусть светильник мудрости озаряет сердце непрестанно.',
        en: 'Let the lamp of wisdom light the heart without end.',
      },
      {
        uz: 'Til bilgan — el bilur, el bilgan — dil bilur,',
        ru: 'Кто знает язык — знает народ, кто знает народ — знает сердце,',
        en: 'Who knows a tongue knows a people; who knows a people knows the heart,',
      },
      {
        uz: 'Ilm bilgan — dunyo bilur, odam bo‘lur.',
        ru: 'Кто знает знание — знает мир и становится человеком.',
        en: 'Who knows knowledge knows the world and becomes fully human.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Farhod va Shirin»', '«Фархад и Ширин»', '«Farhad and Shirin»'),
  },
  professors: {
    id: 'band-professors',
    lines: [
      {
        uz: 'Haq yo‘lida kimki bir harf o‘rgatdi chekib ranj,',
        ru: 'Кто на пути истины с трудом обучил хотя бы одной букве,',
        en: 'Whoever, with toil, taught even a single letter on the path of truth,',
      },
      {
        uz: 'Aylamak bo‘lmas ado oning haqin yuz ganj.',
        ru: 'Не измерить его заслугу и сотней сокровищ.',
        en: 'Cannot be repaid even with a hundred treasures.',
      },
      {
        uz: 'Ustoz so‘zi — yo‘lchi yulduz yoshga,',
        ru: 'Слово учителя — путеводная звезда юности,',
        en: 'A teacher’s word is a guiding star for the young,',
      },
      {
        uz: 'Ilm nuridan yorishadi el maskani.',
        ru: 'Светом знания озаряется обитель народа.',
        en: 'By the light of knowledge the people’s home is lit.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Sab’ai sayyor»', '«Сабъаи сайёр»', '«Sab’ai Sayyar»'),
  },
  students: {
    id: 'band-students',
    lines: [
      {
        uz: 'Yoshlikni g‘animat bil, ilm-u odob et pesha,',
        ru: 'Цени молодость, сделай знание и воспитанность призванием,',
        en: 'Treasure youth; make knowledge and virtue your calling,',
      },
      {
        uz: 'G‘ayrat bila intilgil oliy g‘oyag‘a hamisha.',
        ru: 'С усердием всегда стремись к высокой цели.',
        en: 'With zeal always strive toward a noble aim.',
      },
      {
        uz: 'Til o‘rganmoq — elni bilmoqdir,',
        ru: 'Изучать язык — значит познавать народ,',
        en: 'To learn a language is to know a people,',
      },
      {
        uz: 'Ilm izlamoq — o‘zni topmoqdir.',
        ru: 'Искать знание — значит обрести себя.',
        en: 'To seek knowledge is to find oneself.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Lison ut-tayr»', '«Лисон ут-тайр»', '«Lison ut-Tayr»'),
  },
  science: {
    id: 'band-science',
    lines: [
      {
        uz: 'Ilm ahlidin el topg‘usi izzat-u sharaf har on,',
        ru: 'От людей науки народ всегда обретает честь и славу,',
        en: 'From people of knowledge a nation always gains honour and glory,',
      },
      {
        uz: 'Ilmsiz kishi gumroh erur jahonda hamon.',
        ru: 'Без знания человек всё так же блуждает в мире.',
        en: 'Without knowledge one still wanders lost in the world.',
      },
      {
        uz: 'Tadqiq — haqiqatga ochilgan eshik,',
        ru: 'Исследование — дверь, открытая к истине,',
        en: 'Research is a door opened toward truth,',
      },
      {
        uz: 'Hikmat — kelajakka yoritilgan chiroq.',
        ru: 'Мудрость — светильник, зажжённый для будущего.',
        en: 'Wisdom is a lamp lit for the future.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Nazm ul-javohir»', '«Назм ул-джавохир»', '«Nazm ul-Javahir»'),
  },
  news: {
    id: 'band-news',
    lines: [
      {
        uz: 'Jahon bori yangilik-u xushxabardin obod,',
        ru: 'Весь мир процветает от благих вестей и обновления,',
        en: 'The whole world flourishes with good tidings and renewal,',
      },
      {
        uz: 'Ezgu so‘z bila el ko‘ngli bo‘lg‘usi shod.',
        ru: 'Добрым словом радуется сердце народа.',
        en: 'By kind words the people’s heart is gladdened.',
      },
      {
        uz: 'Haq so‘z — tillarning eng yorug‘ nuri,',
        ru: 'Правдивое слово — самый яркий свет языков,',
        en: 'A true word is the brightest light of languages,',
      },
      {
        uz: 'U elni birlashtiradi, yo‘lni yoritadi.',
        ru: 'Оно объединяет народ и освещает путь.',
        en: 'It unites the people and lights the path.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Munshaot» merosi', 'Наследие «Муншаат»', 'Heritage of «Munshaat»'),
  },
  contact: {
    id: 'band-contact',
    lines: [
      {
        uz: 'Saxovat-u muloqot elg‘a najot berur hamisha,',
        ru: 'Щедрость и общение всегда даруют людям спасение,',
        en: 'Generosity and dialogue always bring people salvation,',
      },
      {
        uz: 'Ezgu niyat va ixlos har ishg‘a hayot berur.',
        ru: 'Доброе намерение и искренность дают силу каждому делу.',
        en: 'Noble intent and sincerity give life to every endeavour.',
      },
      {
        uz: 'Til — ko‘prik, dil — manzil,',
        ru: 'Язык — мост, сердце — пристань,',
        en: 'Language is a bridge, the heart a destination,',
      },
      {
        uz: 'Muloqot — tinchlik va hurmat yo‘li.',
        ru: 'Диалог — путь мира и уважения.',
        en: 'Dialogue is the path of peace and respect.',
      },
    ],
    attribution: src('Alisher Navoiy', 'Алишер Навои', 'Alisher Navoi'),
    source: src('«Siroj ul-muslimin»', '«Сирадж ул-муслимин»', '«Siraj ul-Muslimin»'),
  },
  structure: {
    id: 'band-structure',
    lines: [
      {
        uz: 'Tartib-u tuzum bila ish o‘ngaydur har zamon,',
        ru: 'Порядком и строем дело всегда спорится,',
        en: 'By order and structure work prospers in every age,',
      },
      {
        uz: 'Har bo‘lim o‘z o‘rnida — butunlik nishoni.',
        ru: 'Каждая часть на своём месте — знак целостности.',
        en: 'Each part in its place is a sign of wholeness.',
      },
      {
        uz: 'Kafedralar — ilmning shoxlari,',
        ru: 'Кафедры — ветви древа знания,',
        en: 'Departments are the branches of knowledge’s tree,',
      },
      {
        uz: 'Fakultet — tillar bog‘ining ildizi.',
        ru: 'Факультет — корень сада языков.',
        en: 'The faculty is the root of the garden of languages.',
      },
    ],
    attribution: src('Alisher Navoiy merosi ruhida', 'В духе наследия Навои', 'In the spirit of Navoi’s heritage'),
    source: src('Tillar fakulteti', 'Факультет языков', 'Faculty of Languages'),
  },
  tutors: {
    id: 'band-tutors',
    lines: [
      {
        uz: 'Yoshlar qalbiga yo‘l topmoq — buyuk san’at,',
        ru: 'Найти путь к сердцу юности — великое искусство,',
        en: 'To find a path to the young heart is a great art,',
      },
      {
        uz: 'Tyutor mehru g‘amxo‘rlik bilan yo‘l ko‘rsatadi.',
        ru: 'Тьютор указывает путь заботой и участием.',
        en: 'A tutor guides with care and kindness.',
      },
      {
        uz: 'Guruh — bir oila, ilm — umumiy non,',
        ru: 'Группа — одна семья, знание — общий хлеб,',
        en: 'A group is one family, knowledge shared bread,',
      },
      {
        uz: 'Birgalikda o‘sadi inson va millat.',
        ru: 'Вместе растут человек и нация.',
        en: 'Together grow the person and the nation.',
      },
    ],
    attribution: src('Alisher Navoiy merosi ruhida', 'В духе наследия Навои', 'In the spirit of Navoi’s heritage'),
    source: src('Ustoz-shogird an’anasi', 'Традиция наставничества', 'Mentor–student tradition'),
  },
};

/** Marshrut bo‘yicha sahifa oxiri iqtibosini tanlash */
export function getNavoiBandForPath(pathname: string): NavoiBandQuote {
  if (pathname === '/' || pathname === '') return NAVOIY_PAGE_BANDS.home;
  if (pathname.startsWith('/fakultet/tarix') || pathname.startsWith('/fakultet/faxriy')) {
    return NAVOIY_PAGE_BANDS.history;
  }
  if (pathname.startsWith('/fakultet/rahbariyat')) return NAVOIY_PAGE_BANDS.leadership;
  if (pathname.startsWith('/fakultet/tuzilma')) return NAVOIY_PAGE_BANDS.structure;
  if (pathname.startsWith('/talim')) return NAVOIY_PAGE_BANDS.programs;
  if (pathname.startsWith('/jamoa/professor')) return NAVOIY_PAGE_BANDS.professors;
  if (pathname.startsWith('/jamoa/tyutor') || pathname.startsWith('/jamoa/guruh')) {
    return NAVOIY_PAGE_BANDS.tutors;
  }
  if (pathname.startsWith('/talabalar')) return NAVOIY_PAGE_BANDS.students;
  if (pathname.startsWith('/ilm-fan')) return NAVOIY_PAGE_BANDS.science;
  if (pathname.startsWith('/yangiliklar')) return NAVOIY_PAGE_BANDS.news;
  if (pathname.startsWith('/aloqa')) return NAVOIY_PAGE_BANDS.contact;
  return NAVOIY_PAGE_BANDS.home;
}

/** @deprecated — Layout path asosida ishlating */
export const navoiBandDefault = NAVOIY_PAGE_BANDS.home;
export const navoiBandIlm = NAVOIY_PAGE_BANDS.programs;
export const navoiBandTarix = NAVOIY_PAGE_BANDS.history;
