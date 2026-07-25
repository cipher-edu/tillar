import type { Language, LocaleString } from '@/types';
import { translations } from '@/i18n/translations';

export function loc(value: LocaleString | undefined, lang: Language, fallback = ''): string {
  if (!value) return fallback;
  return value[lang] || value.uz || fallback;
}

export function t(key: string, lang: Language): string {
  const table = translations[lang] as Record<string, string>;
  const uz = translations.uz as Record<string, string>;
  return table?.[key] ?? uz?.[key] ?? key;
}
