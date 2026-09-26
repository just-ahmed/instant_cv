import React from 'react';
import { CVData, ThemeConfig } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, User } from 'lucide-react';
import { FacelessAvatar } from '../FacelessAvatar';

interface Props {
  data: CVData;
  theme: ThemeConfig;
}

export const ClassicTemplate: React.FC<Props> = ({ data, theme }) => {
  const { personal, experience, education, skills, languages, certifications } = data;

  const fontClass = 
    theme.fontFamily === 'cairo' ? 'font-cairo' :
    theme.fontFamily === 'alexandria' ? 'font-alexandria' :
    theme.fontFamily === 'ibm' ? 'font-ibm' : 'font-tajawal';

  return (
    <div 
      id="cv-preview-content"
      className={`a4-page print-area ${fontClass} p-8 min-h-[297mm] text-slate-800 bg-white shadow-xl flex flex-col gap-6`}
    >
      {/* Top Header Centered */}
      <div className="text-center border-b-2 pb-6" style={{ borderColor: theme.primaryColor }}>
        <div className="flex justify-center mb-3">
          <FacelessAvatar
            avatarUrl={personal.avatarUrl}
            fullName={personal.fullName}
            shape="circle"
            size="md"
            borderColor={theme.primaryColor}
          />
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          {personal.fullName || 'الاسم الكامل'}
        </h1>
        <p className="text-base font-semibold text-slate-600 mt-1">
          {personal.jobTitle || 'المسمى الوظيفي'}
        </p>

        {/* Contact Info Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
          {personal.phone && (
            <div className="flex items-center gap-1.5 dir-ltr">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="whitespace-nowrap text-xs">{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className="flex items-center gap-1.5 dir-ltr">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="break-words text-xs">{personal.email}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="break-words text-xs">{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1.5 dir-ltr">
              <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="break-words text-xs">{personal.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-1.5 dir-ltr">
              <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="break-words text-xs">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-1.5 dir-ltr">
              <Github className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span className="break-words text-xs">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="space-y-2">
          <h2 
            className="text-sm font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
          >
            <User className="w-4 h-4" />
            نبذة شخصية / الملخص المهني
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-line pt-1">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="space-y-4">
          <h2 
            className="text-sm font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
          >
            <Briefcase className="w-4 h-4" />
            الخبرة المهنية والعملية
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{exp.jobTitle || 'المسمى الوظيفي'}</h3>
                    <p className="text-xs font-semibold text-slate-700 leading-normal">{exp.company || 'اسم الشركة / الجهة'}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 shrink-0 whitespace-nowrap">
                    {exp.startDate || 'تاريخ البدء'} - {exp.currentlyWorking ? 'حتى الآن' : (exp.endDate || 'تاريخ الانتهاء')}
                  </span>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 leading-relaxed pr-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-justify">{resp || 'المهام والإنجازات الرئيسية في هذا المنصب'}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="space-y-3">
          <h2 
            className="text-sm font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
          >
            <GraduationCap className="w-4 h-4" />
            المؤهلات والمراحل التعليمية
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree || 'الدرجة العلمية / الشهادة'}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{edu.institution || 'الجامعة / المؤسسة التعليمية'}</p>
                  {edu.description && (
                    <p className="text-[11px] text-slate-500 mt-1">{edu.description}</p>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                  {edu.startYear || 'سنة البدء'} - {edu.endYear || 'سنة التخرج'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Columns Grid for Skills & Languages */}
      <div className="grid grid-cols-2 gap-6 pt-2">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-2">
            <h2 
              className="text-xs font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
              style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
            >
              <Code className="w-3.5 h-3.5" />
              المهارات التقنية
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 border text-slate-800"
                  style={{ borderColor: `${theme.primaryColor}40` }}
                >
                  {skill.name || 'اسم المهارة'}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications */}
        <div className="space-y-4">
          {languages && languages.length > 0 && (
            <section className="space-y-2">
              <h2 
                className="text-xs font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
                style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
              >
                <Languages className="w-3.5 h-3.5" />
                إتقان اللغات
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center gap-2 text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    <span className="font-semibold text-xs truncate min-w-0">{lang.name || 'اسم اللغة'}</span>
                    <span className="text-[10px] text-slate-600 bg-slate-200/70 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="space-y-2">
              <h2 
                className="text-xs font-bold uppercase border-b-2 pb-1 flex items-center gap-2"
                style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
              >
                <Award className="w-3.5 h-3.5" />
                الشهادات والدورات
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-slate-900 text-xs leading-snug break-words">{cert.title || 'عنوان الشهادة'}</div>
                    <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 min-w-0">
                      <span className="truncate flex-1" title={cert.issuer}>{cert.issuer || 'الجهة المانحة'}</span>
                      {cert.year && (
                        <span className="shrink-0 font-medium px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600" dir="ltr">
                          {cert.year}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
