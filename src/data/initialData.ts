import { CVData, PresetPalette, ThemeConfig } from '../types';

export const INITIAL_CV_DATA: CVData = {
  personal: {
    fullName: 'طارق عبد السلام الفرجاني',
    jobTitle: 'مهندس برمجيات ومطور نظم (Full-Stack Developer)',
    email: 'tarek.alferjani@example.ly',
    phone: '+218 91 234 5678',
    location: 'طرابلس، ليبيا',
    website: 'https://tarek-tech.ly',
    linkedin: 'linkedin.com/in/tarek-alferjani',
    github: 'github.com/tarek-alferjani',
    avatarUrl: '',
    summary: 'مهندس برمجيات متخصص في تطوير منصات الويب السحابية والأنظمة الرقمية بخبرة تزيد عن 5 سنوات. أمتلك سجلاً متميزاً في بناء حلول تقنية مرنة وعالية الأداء للمؤسسات والشركات، بالاعتماد على أحدث التقنيات الحديثة مثل React وTypeScript وNode.js وقواعد البيانات السحابية.'
  },
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'كبير مهندسي تطوير البرمجيات',
      company: 'شركة ليبيانا للهاتف المحمول - طرابلس',
      startDate: 'يناير 2021',
      endDate: 'حتى الآن',
      currentlyWorking: true,
      responsibilities: [
        'قيادة فريق تطوير النظم الرقمية وتحديث البوابة الإلكترونية لخدمات المشتركين وتطبيقات الويب.',
        'تطوير واجهات برمجة التطبيقات (APIs) وربطها الآمن مع منصات الدفع المصرفي الإلكتروني في ليبيا.',
        'تحسين أداء واستجابة الأنظمة وتقليل زمن التحميل بنسبة 35% لخدمة ملايين المشتركين بكفاءة عالية.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'بكالوريوس هندسة الحاسوب وتقنية المعلومات',
      institution: 'جامعة طرابلس - كلية تقنية المعلومات',
      startYear: '2015',
      endYear: '2020',
      description: 'الترتيب الأول على الدفعة بتقدير ممتاز مع مرتبة الشرف، مشروع التخرج في الحوسبة السحابية.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'تطوير تطبيقات الويب (React / TypeScript / Node.js)', level: 5 }
  ],
  languages: [
    { id: 'lang-1', name: 'اللغة العربية (اللغة الأم)', proficiency: 'اللغة الأم' }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'شهادة مهندس حلول سحابية معتمد (AWS Certified Solutions Architect)',
      issuer: 'أمازون لخدمات الويب (AWS)',
      year: '2023'
    }
  ]
};

export const EMPTY_CV_DATA: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    avatarUrl: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: []
};

export const PALETTES: PresetPalette[] = [
  {
    id: 'default-gradient',
    name: 'سيرة فورية (الرئيسية)',
    primary: '#4A8FE7',
    secondary: '#59D2FE',
    accent: '#44E5E7',
    highlight: '#73FBD3'
  },
  {
    id: 'ocean-blue',
    name: 'أزرق محيطي',
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    highlight: '#93C5FD'
  },
  {
    id: 'teal-mint',
    name: 'نعناعي زمردي',
    primary: '#0F766E',
    secondary: '#14B8A6',
    accent: '#44E5E7',
    highlight: '#73FBD3'
  },
  {
    id: 'royal-purple',
    name: 'بنفسجي ملوكي',
    primary: '#6D28D9',
    secondary: '#8B5CF6',
    accent: '#A78BFA',
    highlight: '#73FBD3'
  },
  {
    id: 'slate-modern',
    name: 'رمادي احترافي',
    primary: '#334155',
    secondary: '#475569',
    accent: '#59D2FE',
    highlight: '#73FBD3'
  }
];

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#4A8FE7',
  secondaryColor: '#59D2FE',
  accentColor: '#44E5E7',
  highlightColor: '#73FBD3',
  fontFamily: 'tajawal'
};
