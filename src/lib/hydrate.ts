/**
 * Backend bootstrap orqali barcha frontend ma'lumotlarini yuklaydi.
 * API ishlamasa static `src/data/*` saqlanadi.
 */
import { apiGet } from '@/lib/api';
import type {
  Person,
  Department,
  Program,
  NewsItem,
  HistoryEvent,
  Project,
  Publication,
  Partner,
  TutorGroup,
  TutorActivity,
  FacultyStats,
  ContactInfo,
  LocaleString,
} from '@/types';

import { people } from '@/data/people';
import { departments } from '@/data/departments';
import { programs } from '@/data/programs';
import { news } from '@/data/news';
import { historyEvents } from '@/data/history';
import { projects, publications } from '@/data/science';
import { groups, tutorActivities } from '@/data/groups';
import {
  partners,
  stats,
  facultyOverview,
  facultyFacts,
  contactInfo,
  heroSlides,
} from '@/data/site';
import {
  presidentialQuotes,
  PRESIDENT_NAME,
  PRESIDENT_TITLE,
} from '@/data/presidential';
import { rectorInfo, rectorMessage } from '@/data/rector';
import {
  navoiQuoteIlm,
  navoiQuoteTil,
  NAVOIY_PAGE_BANDS,
  type NavoiBandQuote,
  type NavoiQuoteBlock,
} from '@/data/navoiQuotes';

export type BootstrapPayload = {
  people: Person[];
  departments: Department[];
  programs: Program[];
  news: NewsItem[];
  historyEvents: HistoryEvent[];
  projects: Project[];
  publications: Publication[];
  partners: Partner[];
  groups: TutorGroup[];
  tutorActivities: TutorActivity[];
  heroSlides: typeof heroSlides;
  stats: FacultyStats;
  facultyOverview: LocaleString;
  facultyFacts: Record<string, unknown>;
  contactInfo: ContactInfo;
  presidentialQuotes: typeof presidentialQuotes;
  presidentName: LocaleString;
  presidentTitle: LocaleString;
  presidentPhotoFallback?: string;
  rectorInfo: typeof rectorInfo;
  rectorMessage: LocaleString;
  navoiQuotes: NavoiQuoteBlock[];
  navoiBands: Array<NavoiBandQuote & { pageKey?: string }>;
  meta?: { counts?: Record<string, number> };
};

function replaceArray<T>(target: T[], next: T[] | undefined | null) {
  if (!next || !Array.isArray(next)) return;
  target.splice(0, target.length, ...next);
}

function assignObject<T extends object>(target: T, next: Partial<T> | undefined | null) {
  if (!next || typeof next !== 'object') return;
  Object.assign(target, next);
}

export type HydrateResult = {
  ok: boolean;
  source: 'api' | 'static';
  error?: string;
  counts?: Record<string, number>;
};

export async function hydrateFromApi(): Promise<HydrateResult> {
  try {
    const data = await apiGet<BootstrapPayload>('/bootstrap/');

    // —— ro‘yxatlar ——
    replaceArray(people, data.people);
    replaceArray(departments, data.departments);
    replaceArray(programs, data.programs);
    replaceArray(news, data.news);
    replaceArray(historyEvents, data.historyEvents);
    replaceArray(projects, data.projects);
    replaceArray(publications, data.publications);
    replaceArray(partners, data.partners);
    replaceArray(groups, data.groups);
    replaceArray(tutorActivities, data.tutorActivities);
    replaceArray(heroSlides as unknown as object[], data.heroSlides as unknown as object[]);
    replaceArray(
      presidentialQuotes as unknown as object[],
      data.presidentialQuotes as unknown as object[],
    );

    // —— singleton / object ——
    if (data.stats) {
      assignObject(stats, {
        students: data.stats.students,
        professors: data.stats.professors,
        programs: data.stats.programs,
        partners: data.stats.partners,
        projects: data.stats.projects,
      });
    }
    assignObject(facultyOverview, data.facultyOverview);
    if (data.facultyFacts) {
      // tozalab qayta to‘ldirish — eski kalitlar qolmasin
      for (const k of Object.keys(facultyFacts as object)) {
        delete (facultyFacts as Record<string, unknown>)[k];
      }
      Object.assign(facultyFacts as object, data.facultyFacts);
    }
    if (data.contactInfo) {
      assignObject(contactInfo, {
        address: data.contactInfo.address,
        phone: data.contactInfo.phone,
        email: data.contactInfo.email,
        universityUrl: data.contactInfo.universityUrl,
        socials: data.contactInfo.socials,
        units: data.contactInfo.units,
      });
    }
    assignObject(rectorInfo, data.rectorInfo);
    assignObject(rectorMessage, data.rectorMessage);
    assignObject(PRESIDENT_NAME, data.presidentName);
    assignObject(PRESIDENT_TITLE, data.presidentTitle);

    // —— Navoiy landing iqtiboslari (id bo‘yicha, tartib o‘zgarsa ham) ——
    const applyNavoi = (target: NavoiQuoteBlock, src: NavoiQuoteBlock | undefined) => {
      if (!src?.lines?.length) return;
      // bo‘sh API ma’lumot static ni o‘chirmasin
      const hasText = src.lines.some(
        (ln) => ln && (ln.uz || ln.ru || ln.en),
      );
      if (!hasText) return;
      Object.assign(target, {
        id: src.id,
        lines: src.lines,
        attribution: src.attribution,
        modernBridge: src.modernBridge,
        sourceNote: src.sourceNote,
      });
    };
    const nqList = data.navoiQuotes || [];
    applyNavoi(
      navoiQuoteIlm,
      nqList.find((q) => q.id === 'navoi-ilm' || q.id?.includes('ilm')) || nqList[0],
    );
    applyNavoi(
      navoiQuoteTil,
      nqList.find((q) => q.id === 'navoi-til' || q.id?.includes('til')) || nqList[1],
    );

    // —— sahifa oxiri bandlari ——
    if (data.navoiBands?.length) {
      // eski kalitlarni tozalash
      for (const k of Object.keys(NAVOIY_PAGE_BANDS)) {
        delete NAVOIY_PAGE_BANDS[k];
      }
      for (const band of data.navoiBands) {
        const pageKey =
          band.pageKey ||
          (band.id?.startsWith('band-') ? band.id.replace(/^band-/, '') : band.id) ||
          'home';
        NAVOIY_PAGE_BANDS[pageKey] = {
          id: band.id,
          lines: band.lines,
          attribution: band.attribution,
          source: band.source,
        };
      }
    }

    const counts = data.meta?.counts || {
      people: people.length,
      news: news.length,
      programs: programs.length,
      departments: departments.length,
    };

    console.info('[hydrate] API bootstrap OK', counts);
    return { ok: true, source: 'api', counts };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn('[hydrate] API yo‘q — static ma’lumot:', msg);
    return { ok: false, source: 'static', error: msg };
  }
}
