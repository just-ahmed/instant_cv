import React from 'react';
import { CVData, ThemeConfig } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, User } from 'lucide-react';
import { FacelessAvatar } from '../FacelessAvatar';

interface Props {
  data: CVData;
  theme: ThemeConfig;
}

export const ModernTemplate: React.FC<Props> = ({ data, theme }) => {
  const { personal, experience, education, skills, languages, certifications } = data;

  const fontClass = 
    theme.fontFamily === 'cairo' ? 'font-cairo' :
    theme.fontFamily === 'alexandria' ? 'font-alexandria' :
    theme.fontFamily === 'ibm' ? 'font-ibm' : 'font-tajawal';

  return (
    <div 
      id="cv-preview-content"
      className={`a4-page print-area ${fontClass} flex flex-row min-h-[297mm] text-slate-800 bg-white shadow-xl overflow-hidden`}
    >
      {/* Sidebar - RTL (Right Side) */}
      <div 
        className="w-[35%] p-5 text-white flex flex-col gap-5 shrink-0"
        style={{
          background: `linear-gradient(180deg, ${theme.primaryColor} 0%, #1e293b 100%)`
        }}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-1">
          <FacelessAvatar
            avatarUrl={personal.avatarUrl}
            fullName={personal.fullName}
            shape="circle"
            size="lg"
            borderColor={theme.accentColor}
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs leading-relaxed border-b border-white/10 pb-4">
          <h3 
            className="text-sm font-bold border-b pb-1.5 flex items-center gap-2"
            style={{ color: theme.highlightColor, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>معلومات الاتصال</span>
          </h3>
          
          {personal.phone && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <Phone className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" dir="ltr">{personal.phone}</span>
            </div>
          )}

          {personal.email && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <Mail className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" dir="ltr" title={personal.email}>{personal.email}</span>
            </div>
          )}

          {personal.location && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" title={personal.location}>{personal.location}</span>
            </div>
          )}

          {personal.website && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <Globe className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" dir="ltr" title={personal.website}>{personal.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}

          {personal.linkedin && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <Linkedin className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" dir="ltr" title={personal.linkedin}>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}

          {personal.github && (
            <div className="flex items-center gap-2.5 text-slate-100 min-w-0">
              <Github className="w-3.5 h-3.5 text-white/80 shrink-0" />
              <span className="text-xs leading-normal truncate flex-1" dir="ltr" title={personal.github}>{personal.github.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-2.5 border-b border-white/10 pb-4">
            <h3 
              className="text-sm font-bold border-b pb-1.5 flex items-center gap-2"
              style={{ color: theme.highlightColor, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <Code className="w-4 h-4 shrink-0" />
              <span>المهارات التقنية</span>
            </h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="w-full space-y-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-slate-100 text-xs leading-normal break-words flex-1">
                      {skill.name || 'اسم المهارة'}
                    </span>
                    {skill.level ? (
                      <span className="text-[10px] text-slate-300 shrink-0 bg-white/10 px-1.5 py-0.5 rounded">
                        {skill.level === 5 ? 'خبير' : skill.level === 4 ? 'متقدم' : skill.level === 3 ? 'جيد جداً' : skill.level === 2 ? 'متوسط' : 'مبتدئ'}
                      </span>
                    ) : null}
                  </div>
                  {skill.level ? (
                    <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(skill.level / 5) * 100}%`,
                          backgroundColor: theme.accentColor
                        }} 
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="space-y-2.5 border-b border-white/10 pb-4">
            <h3 
              className="text-sm font-bold border-b pb-1.5 flex items-center gap-2"
              style={{ color: theme.highlightColor, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <Languages className="w-4 h-4 shrink-0" />
              <span>اللغات</span>
            </h3>
            <div className="space-y-2 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="bg-white/5 p-2.5 rounded-lg border border-white/10 space-y-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-slate-100 text-xs truncate min-w-0">{lang.name || 'اسم اللغة'}</span>
                    <span className="text-[10px] text-slate-200 bg-white/15 px-2 py-0.5 rounded font-medium whitespace-nowrap shrink-0">
                      {lang.proficiency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="space-y-2.5">
            <h3 
              className="text-sm font-bold border-b pb-1.5 flex items-center gap-2"
              style={{ color: theme.highlightColor, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>الشهادات والدورات</span>
            </h3>
            <div className="space-y-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white/5 p-2.5 rounded-lg border border-white/10 space-y-1.5">
                  <div className="font-bold text-slate-100 text-xs leading-snug break-words">
                    {cert.title || 'عنوان الشهادة'}
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-300 pt-1.5 border-t border-white/10 min-w-0">
                    <span className="truncate flex-1" title={cert.issuer}>{cert.issuer || 'الجهة المانحة'}</span>
                    {cert.year && (
                      <span className="shrink-0 bg-white/15 px-1.5 py-0.5 rounded text-[10px] text-slate-200 font-medium" dir="ltr">
                        {cert.year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="w-[65%] p-6 flex flex-col gap-5 bg-slate-50/50">
        {/* Header Name & Title */}
        <div className="border-b-2 pb-5" style={{ borderColor: theme.primaryColor }}>
          <h1 
            className="text-2xl font-black"
            style={{ color: theme.primaryColor }}
          >
            {personal.fullName || 'الاسم الكامل'}
          </h1>
          <p className="text-base font-semibold text-slate-600 mt-1">
            {personal.jobTitle || 'المسمى الوظيفي'}
          </p>
        </div>

        {/* Summary / About */}
        {personal.summary && (
          <div className="space-y-2">
            <h2 
              className="text-base font-bold flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
            >
              <User className="w-4 h-4" />
              الملخص المهني
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-line">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <div className="space-y-4">
            <h2 
              className="text-base font-bold flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
            >
              <Briefcase className="w-4 h-4" />
              الخبرات العملية
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pr-3 border-r-2" style={{ borderColor: theme.primaryColor }}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{exp.jobTitle || 'المسمى الوظيفي'}</h3>
                      <p className="text-xs font-semibold text-slate-600 leading-normal">{exp.company || 'اسم الشركة / الجهة'}</p>
                    </div>
                    <span 
                      className="text-[11px] font-medium px-2 py-0.5 rounded text-slate-700 bg-slate-200/70 whitespace-nowrap shrink-0"
                    >
                      {exp.startDate || 'تاريخ البدء'} - {exp.currentlyWorking ? 'حتى الآن' : (exp.endDate || 'تاريخ الانتهاء')}
                    </span>
                  </div>

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-justify">{resp || 'المهام والإنجازات الرئيسية في هذا المنصب'}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="space-y-3">
            <h2 
              className="text-base font-bold flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
            >
              <GraduationCap className="w-4 h-4" />
              المؤهلات التعليمية
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">{edu.degree || 'الدرجة العلمية / الشهادة'}</h3>
                      <p className="text-xs text-slate-600 font-medium leading-normal">{edu.institution || 'الجامعة / المؤسسة التعليمية'}</p>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                      {edu.startYear || 'سنة البدء'} - {edu.endYear || 'سنة التخرج'}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
