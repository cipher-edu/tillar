/**
 * Frontend ma'lumotlarini backend/fixtures/seed.json ga eksport qiladi.
 * Ishlatish: npx tsx scripts/export-seed.ts
 */
import { writeFileSync, mkdirSync } from 'fs';
import { people } from '../src/data/people';
import { news } from '../src/data/news';
import { departments } from '../src/data/departments';
import { programs } from '../src/data/programs';
import {
  partners,
  stats,
  facultyOverview,
  facultyFacts,
  contactInfo,
  heroSlides,
} from '../src/data/site';
import { historyEvents } from '../src/data/history';
import { projects, publications } from '../src/data/science';
import { groups, tutorActivities } from '../src/data/groups';
import {
  presidentialQuotes,
  PRESIDENT_NAME,
  PRESIDENT_TITLE,
  PRESIDENT_PHOTO_FALLBACK,
} from '../src/data/presidential';
import { rectorInfo, rectorMessage } from '../src/data/rector';
import {
  navoiQuoteIlm,
  navoiQuoteTil,
  NAVOIY_PAGE_BANDS,
} from '../src/data/navoiQuotes';

const data = {
  people,
  news,
  departments,
  programs,
  partners,
  stats,
  facultyOverview,
  facultyFacts,
  contactInfo,
  heroSlides,
  historyEvents,
  projects,
  publications,
  groups,
  tutorActivities,
  presidentialQuotes,
  presidentName: PRESIDENT_NAME,
  presidentTitle: PRESIDENT_TITLE,
  presidentPhotoFallback: PRESIDENT_PHOTO_FALLBACK,
  rectorInfo,
  rectorMessage,
  navoiQuotes: [navoiQuoteIlm, navoiQuoteTil],
  navoiBands: Object.values(NAVOIY_PAGE_BANDS),
};

mkdirSync('backend/fixtures', { recursive: true });
writeFileSync('backend/fixtures/seed.json', JSON.stringify(data, null, 0), 'utf-8');
console.log(
  'Exported seed.json:',
  Object.fromEntries(
    Object.entries(data).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.length : typeof v,
    ]),
  ),
);
