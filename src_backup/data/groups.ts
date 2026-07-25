import type { TutorActivity, TutorGroup } from '@/types';

export const groups: TutorGroup[] = [
  {
    id: 'g-1',
    slug: 'ingliz-amaliy',
    name: { uz: 'Ingliz tili amaliyoti guruhi', ru: 'Группа практического английского', en: 'Practical English group' },
    tutorId: 'p-tutor-1',
    studentIds: ['p-st-2', 'p-st-4'],
    achievements: [
      { uz: 'Fakultet debat turniri ishtiroki', ru: 'Участие в дебатном турнире факультета', en: 'Faculty debate tournament participation' },
    ],
  },
  {
    id: 'g-2',
    slug: 'rus-tili-adabiyot',
    name: { uz: 'Rus tili va adabiyoti guruhi', ru: 'Группа русского языка и литературы', en: 'Russian Language and Literature group' },
    tutorId: 'p-tutor-2',
    studentIds: ['p-st-amonova', 'p-st-1', 'p-st-5'],
    achievements: [
      { uz: 'Adabiy kecha va «Pod dykhaniyem drevnikh skazaniy» tadbiri', ru: 'Литературный вечер и мероприятие по древним сказаниям', en: 'Literary evening and ancient legends event' },
      { uz: 'Navoiy stipendiyati (Amonova N.)', ru: 'Стипендия Навои (Амонова Н.)', en: 'Navoi scholarship (Amonova N.)' },
    ],
  },
];

export const tutorActivities: TutorActivity[] = [
  {
    id: 'act-1',
    tutorId: 'p-tutor-1',
    groupId: 'g-1',
    date: '2026-03-12',
    title: { uz: 'Ingliz tili debate club', ru: 'Debating club English', en: 'English Debate Club' },
    description: {
      uz: 'Guruh talabalari xalqaro mavzular bo‘yicha bahslashdi.',
      ru: 'Студенты группы обсуждали международные темы.',
      en: 'Group students debated international topics.',
    },
  },
  {
    id: 'act-2',
    tutorId: 'p-tutor-2',
    groupId: 'g-2',
    date: '2025-12-10',
    title: {
      uz: '«Pod dykhaniyem drevnikh skazaniy»',
      ru: '«Под дыханием древних сказаний»',
      en: 'Under the breath of ancient legends',
    },
    description: {
      uz: 'Rus tili faniga bag‘ishlangan tadbir; 3-kurs talabalari ishtiroki.',
      ru: 'Мероприятие, посвящённое русскому языку; участие студентов 3 курса.',
      en: 'Event dedicated to Russian language; 3rd-year students participated.',
    },
  },
  {
    id: 'act-3',
    tutorId: 'p-tutor-2',
    groupId: 'g-2',
    date: '2025-03-21',
    title: { uz: 'Navro‘z bayrami', ru: 'Праздник Навруз', en: 'Navruz celebration' },
    description: {
      uz: 'Tillar fakultetida milliy urf-odatlar, sahna ko‘rinishlari va milliy taomlar ko‘rgazmasi.',
      ru: 'На факультете языков — национальные традиции, сценические постановки и выставка блюд.',
      en: 'National traditions, stage performances and food exhibition at the Faculty of Languages.',
    },
  },
];

export const getGroup = (idOrSlug: string) =>
  groups.find((g) => g.id === idOrSlug || g.slug === idOrSlug);
