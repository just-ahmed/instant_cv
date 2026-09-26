import { CVData, PresetPalette, ThemeConfig } from '../types';

export const INITIAL_CV_DATA: CVData = {
  personal: {
    fullName: 'أحمد محمود السعيد',
    jobTitle: 'مهندس برمجيات مطور واجهات (Full-Stack Developer)',
    email: 'ahmed.elsaeed@example.com',
    phone: '+966 50 123 4567',
    location: 'الرياض، المملكة العربية السعودية',
    website: 'https://ahmed-dev.io',
    linkedin: 'linkedin.com/in/ahmed-elsaeed',
    github: 'github.com/ahmed-elsaeed',
    avatarUrl: '',
    summary: 'مهندس برمجيات شغوف ومبتكر يمتلك أكثر من 5 سنوات من الخبرة في تطوير تطبيقات الويب الحديثة وحلول السحابة. متخصص في بناء واجهات مستخدم تفاعلية وسريعة باستخدام React وTypeScript وNext.js مع الالتزام بأفضل معايير تجربة المستخدم وأداء الأنظمة.'
  },
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'كبير مطوري الواجهات الأمامية (Senior Frontend Developer)',
      company: 'شركة حلول التقنية المتقدمة',
      startDate: 'يناير 2022',
      endDate: 'حتى الآن',
      currentlyWorking: true,
      responsibilities: [
        'قيادة فريق مكون من 6 مطورين لتطوير منصة التجارة الإلكترونية الرئيسية وتحديث معمارية النظام.',
        'تحسين زمن تحميل الصفحة بنسبة 40% من خلال تحسين أداء React وتطبيق استراتيجيات التخزين المؤقت.',
        'إعادة بناء نظام التصميم (Design System) الخاص بالشركة لتوحيد الواجهات عبر جميع المنتجات الرقمية.'
      ]
    },
    {
      id: 'exp-2',
      jobTitle: 'مطور واجهات وسحابيات (Frontend Developer)',
      company: 'مؤسسة الابتكار الرقمي',
      startDate: 'يونيو 2019',
      endDate: 'ديسمبر 2021',
      currentlyWorking: false,
      responsibilities: [
        'تطوير أكثر من 12 لوحة تحكم تفاعلية مخصصة لعملاء القطاع الحكومي والخاص.',
        'ربط الواجهات الأمامية بـ RESTful APIs و GraphQL بكفاءة وأمان عاليين.',
        'كتابة اختبارات البرمجة الآلية (Automated Tests) وضمان جودة الكود المكتوب.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'بكالوريوس علوم الحاسب والمعلومات',
      institution: 'جامعة الملك سعود - الرياض',
      startYear: '2015',
      endYear: '2019',
      description: 'مرتبة الشرف الأولى - التخصص الدقيق: هندسة البرمجيات والتكنيات السحابية.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React / Next.js', level: 5 },
    { id: 'sk-2', name: 'TypeScript / JavaScript', level: 5 },
    { id: 'sk-3', name: 'Tailwind CSS / HTML5 / CSS3', level: 5 },
    { id: 'sk-4', name: 'Node.js / Express', level: 4 },
    { id: 'sk-5', name: 'Git & GitHub / CI/CD', level: 4 },
    { id: 'sk-6', name: 'UI/UX Design Concepts', level: 4 }
  ],
  languages: [
    { id: 'lang-1', name: 'اللغة العربية', proficiency: 'اللغة الأم' },
    { id: 'lang-2', name: 'اللغة الإنجليزية', proficiency: 'ممتاز (C1/C2 - طلاقة احترافية)' }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: 'cert-2',
      title: 'Meta Frontend Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      year: '2022'
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
