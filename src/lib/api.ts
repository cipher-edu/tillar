/**
 * Django / Strapi REST API client.
 * VITE_API_URL — masalan http://127.0.0.1:8000/api yoki https://tillar.navdu.uz/api
 */
const API_BASE =
  (import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ||
  'http://127.0.0.1:8000/api';

export function getApiBase() {
  return API_BASE.replace(/\/$/, '');
}

/** GET so'rovi bajaruvchi yordamchi funksiya */
export async function apiGet<T>(path: string): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API GET ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/** POST so'rovi bajaruvchi funksiya (Masalan: Contact form, auth, mutatsiyalar) */
export async function apiPost<T, TBody = unknown>(path: string, body: TBody): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`API POST ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/** Fayllarni yuklash uchun Multipart POST funksiya */
export async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
  if (!res.ok) {
    throw new Error(`API UPLOAD ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/** DRF pagination ({ results: [...] }) yoki oddiy massivni to'g'ri ochish */
export function unwrapList<T>(data: T[] | { results: T[] }): T[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && Array.isArray((data as { results: T[] }).results)) {
    return (data as { results: T[] }).results;
  }
  return [];
}
