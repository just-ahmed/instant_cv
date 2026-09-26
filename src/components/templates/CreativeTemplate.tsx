import React from 'react';
import { CVData, ThemeConfig } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, User, Sparkles } from 'lucide-react';
import { FacelessAvatar } from '../FacelessAvatar';

interface Props {
  data: CVData;
  theme: ThemeConfig;
}

export const CreativeTemplate: React.FC<Props> = ({ data, theme }) => {
  const { personal, experience, education, skills, languages, certifications } = data;

  const fontClass = 
    theme.fontFamily === 'cairo' ? 'font-cairo' :
    theme.fontFamily === 'alexandria' ? 'font-alexandria' :
    theme.fontFamily === 'ibm' ? 'font-ibm' : 'font-tajawal';

  return (
    <div 
      id="cv-preview-content"
      className={`a4-page print-area ${fontClass} p-7 min-h-[297mm] text-slate-800 bg-white shadow-xl flex flex-col gap-6`}
    >
      {/* Creative Header Banner */}
      <div 
        className="rounded-2xl p-6 text-slate-900 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 50%, ${theme.accentColor} 100%)`
        }}
      >
        <div className="space-y-2 text-center md:text-right text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>سيرة ذاتية احترافية</span>
          </div>
          <h1 className="text-2xl font-black drop-shadow-sm">{personal.fullName || 'الاسم الكامل'}</h1>
          <p className="text-sm font-bold text-white/95">{personal.jobTitle || 'المسمى الوظيفي'}</p>

          {/* Contact Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-900">
            {personal.phone && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm dir-ltr">
                <Phone className="w-3 h-3 text-sky-600 shrink-0" /> <span className="whitespace-nowrap">{personal.phone}</span>
              </span>
            )}
            {personal.email && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm dir-ltr">
                <Mail className="w-3 h-3 text-sky-600 shrink-0" /> <span className="break-words">{personal.email}</span>
              </span>
            )}
            {personal.location && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm">
                <MapPin className="w-3 h-3 text-sky-600 shrink-0" /> <span className="break-words">{personal.location}</span>
              </span>
            )}
            {personal.website && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm dir-ltr">
                <Globe className="w-3 h-3 text-sky-600 shrink-0" /> <span className="break-words">{personal.website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personal.linkedin && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm dir-ltr">
                <Linkedin className="w-3 h-3 text-sky-600 shrink-0" /> <span className="break-words">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </span>
            )}
            {personal.github && (
              <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm dir-ltr">
                <Github className="w-3 h-3 text-sky-600 shrink-0" /> <span className="break-words">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <FacelessAvatar
            avatarUrl={personal.avatarUrl}
            fullName={personal.fullName}
            shape="rounded"
            size="md"
            borderColor="rgba(255,255,255,0.8)"
          />
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
          <h2 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-1.5">
            <User className="w-4 h-4" style={{ color: theme.primaryColor }} />
            نبذة عني
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-line">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="space-y-3">
          <h2 
            className="text-sm font-bold flex items-center gap-2 border-b-2 pb-1.5"
            style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
          >
            <Briefcase className="w-4 h-4" />
            الخبرات المهنية
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{exp.jobTitle || 'المسمى الوظيفي'}</h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{exp.company || 'اسم الشركة / الجهة'}</p>
                  </div>
                  <span 
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full text-slate-800"
                    style={{ backgroundColor: theme.highlightColor }}
                  >
                    {exp.startDate || 'تاريخ البدء'} - {exp.currentlyWorking ? 'حتى الآن' : (exp.endDate || 'تاريخ الانتهاء')}
                  </span>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 leading-relaxed">
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

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {education && education.length > 0 && (
          <section className="space-y-3">
            <h2 
              className="text-xs font-bold flex items-center gap-1.5 border-b pb-1"
              style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
            >
              <GraduationCap className="w-4 h-4" />
              التعليم والدرجات العلمية
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="p-2.5 rounded-lg border border-slate-100 bg-white">
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree || 'الدرجة العلمية / الشهادة'}</h3>
                  <div className="text-[11px] text-slate-600 font-medium">{edu.institution || 'الجامعة / المؤسسة التعليمية'}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{edu.startYear || 'سنة البدء'} - {edu.endYear || 'سنة التخرج'}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-3">
            <h2 
              className="text-xs font-bold flex items-center gap-1.5 border-b pb-1"
              style={{ color: theme.primaryColor, borderColor: theme.primaryColor }}
            >
              <Code className="w-4 h-4" />
              المهارات المتميزة
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg text-slate-800 shadow-2xs border border-slate-200"
                  style={{ backgroundColor: `${theme.secondaryColor}20` }}
                >
                  {skill.name || 'اسم المهارة'}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
        {languages && languages.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b pb-1" style={{ borderColor: `${theme.primaryColor}30` }}>
              <Languages className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span>اللغات</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 text-xs truncate min-w-0">{lang.name || 'اسم اللغة'}</span>
                  <span className="text-slate-600 text-[10px] bg-slate-200/70 px-2 py-0.5 rounded whitespace-nowrap shrink-0">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b pb-1" style={{ borderColor: `${theme.primaryColor}30` }}>
              <Award className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primaryColor }} />
              <span>الشهادات</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-xs leading-snug break-words">{cert.title || 'عنوان الشهادة'}</div>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 min-w-0">
                    <span className="truncate flex-1" title={cert.issuer}>{cert.issuer || 'الجهة المانحة'}</span>
                    {cert.year && (
                      <span className="shrink-0 font-medium bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-600" dir="ltr">
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
  );
};
