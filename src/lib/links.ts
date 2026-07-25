import type { Person, PersonRole } from '@/types';

export function personPath(person: Person): string {
  if (person.roles.includes('student')) return `/talabalar/${person.slug}`;
  if (person.roles.includes('tutor')) return `/jamoa/tyutorlar/${person.slug}`;
  if (person.roles.includes('leader')) return `/fakultet/rahbariyat/${person.slug}`;
  if (person.roles.includes('honorary')) return `/fakultet/faxriy-ustozlar#${person.slug}`;
  return `/jamoa/professorlar/${person.slug}`;
}

export function primaryRole(person: Person): PersonRole {
  if (person.roles.includes('leader')) return 'leader';
  if (person.roles.includes('professor')) return 'professor';
  if (person.roles.includes('tutor')) return 'tutor';
  if (person.roles.includes('student')) return 'student';
  return 'honorary';
}

export function newsPath(slug: string) {
  return `/yangiliklar/${slug}`;
}

export function departmentPath(slug: string) {
  return `/fakultet/tuzilma/${slug}`;
}

export function programPath(slug: string) {
  return `/talim/yonalishlar/${slug}`;
}

export function projectPath(slug: string) {
  return `/ilm-fan/loyihalar/${slug}`;
}

export function groupPath(tutorSlug: string, groupId: string) {
  return `/jamoa/tyutorlar/${tutorSlug}/guruh/${groupId}`;
}
