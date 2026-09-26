export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number; // 1 to 5
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string; // e.g., "اللغة الأم", "ممتاز (C1/C2)", "جيد جداً (B2)", "مبتدئ"
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface CVData {
  personal: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
}

export type TemplateId = 'modern' | 'classic' | 'executive' | 'creative';
export type FontFamilyId = 'tajawal' | 'cairo' | 'alexandria' | 'ibm';

export interface ThemeConfig {
  primaryColor: string; // e.g., #4A8FE7
  secondaryColor: string; // e.g., #59D2FE
  accentColor: string; // e.g., #44E5E7
  highlightColor: string; // e.g., #73FBD3
  fontFamily: FontFamilyId;
}

export interface PresetPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
}
