export type Language = 'uz' | 'ru' | 'en';

export type LocaleString = {
  uz: string;
  ru: string;
  en: string;
};

export type PersonRole = 'leader' | 'professor' | 'tutor' | 'student' | 'honorary';

export type StudentBadge =
  | 'innovator'
  | 'gifted'
  | 'scientific'
  | 'creative'
  | 'volunteer'
  | 'international'
  | 'winner';

export type DegreeLevel = 'bachelor' | 'master';

/** Ta’lim shakli — 2025–2026: 8 kunduzgi + 2 kechki + 1 sirtqi bakalavriat */
export type StudyForm = 'full_time' | 'evening' | 'distance';

export type NewsCategory =
  | 'faculty'
  | 'education'
  | 'science'
  | 'achievements'
  | 'international'
  | 'student_life'
  | 'teachers'
  | 'announcements';

export type ProjectStatus = 'ongoing' | 'completed';

export interface Person {
  id: string;
  slug: string;
  roles: PersonRole[];
  name: LocaleString;
  photo: string;
  degree?: LocaleString;
  position?: LocaleString;
  departmentId?: string;
  programId?: string;
  course?: number;
  groupId?: string;
  badges?: StudentBadge[];
  supervisorId?: string;
  studentIds?: string[];
  groupIds?: string[];
  interests?: LocaleString[];
  bio?: LocaleString;
  email?: string;
  phone?: string;
  officeHours?: LocaleString;
  office?: LocaleString;
  external?: {
    orcid?: string;
    scholar?: string;
    scopus?: string;
  };
  yearsActive?: string;
  isMemorial?: boolean;
  leadershipLevel?: 'university' | 'faculty';
  /** Rahbariyat ro‘yxatida tartib (kichik = yuqorida) */
  sortOrder?: number;
  publicationsCount?: number;
}

export interface Department {
  id: string;
  slug: string;
  name: LocaleString;
  headId: string;
  description: LocaleString;
  researchAreas: LocaleString[];
  professorIds: string[];
}

export interface Program {
  id: string;
  slug: string;
  name: LocaleString;
  level: DegreeLevel;
  /** Default: full_time */
  studyForm?: StudyForm;
  description: LocaleString;
  careers: LocaleString[];
  professorIds: string[];
  /** Haqiqiy PDF bo‘lmasa bo‘sh qoldiring — UI «tez orada» ko‘rsatadi */
  curriculumUrl?: string;
  icon?: string;
}

export interface TutorGroup {
  id: string;
  slug: string;
  name: LocaleString;
  tutorId: string;
  studentIds: string[];
  achievements: LocaleString[];
}

export interface TutorActivity {
  id: string;
  tutorId: string;
  groupId?: string;
  date: string;
  title: LocaleString;
  description: LocaleString;
  photo?: string;
}

export interface HistoryEvent {
  id: string;
  year: string;
  title: LocaleString;
  description: LocaleString;
  photos?: string[];
  relatedPersonIds?: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  category: NewsCategory;
  title: LocaleString;
  excerpt: LocaleString;
  body: LocaleString;
  date: string;
  cover: string;
  authorId?: string;
  relatedPersonIds: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: LocaleString;
  leaderId: string;
  participantIds: string[];
  status: ProjectStatus;
  grant?: LocaleString;
  description: LocaleString;
  results?: LocaleString;
}

export interface Publication {
  id: string;
  title: LocaleString;
  year: number;
  authors: string[];
  departmentId?: string;
  indexed?: 'scopus' | 'wos' | 'none';
  type: 'article' | 'monograph' | 'textbook';
}

export interface Partner {
  id: string;
  name: string;
  logoText: string;
  /** Mamlakat yoki shahar (UI) */
  country?: string;
  region?: 'europe' | 'asia' | 'cis' | 'global';
}

export interface FacultyStats {
  students: number;
  professors: number;
  programs: number;
  partners: number;
  projects: number;
}

export interface ContactInfo {
  address: LocaleString;
  phone: string;
  email: string;
  universityUrl: string;
  socials: { label: string; url: string }[];
  units: { name: LocaleString; phone: string; email: string }[];
}
