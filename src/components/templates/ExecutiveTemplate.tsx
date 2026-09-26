import React from 'react';
import { CVData, ThemeConfig } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Languages, User } from 'lucide-react';
import { FacelessAvatar } from '../FacelessAvatar';

interface Props {
  data: CVData;
  theme: ThemeConfig;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data, theme }) => {
  const { personal, experience, education, skills, languages, certifications } = data;

  const fontClass = 
    theme.fontFamily === 'cairo' ? 'font-cairo' :
    theme.fontFamily === 'alexandria' ? 'font-alexandria' :
    theme.fontFamily === 'ibm' ? 'font-ibm' : 'font-tajawal';

  return (
    <div 
      id="cv-preview-content"
      className={`a4-page print-area ${fontClass} min-h-[297mm] text-slate-800 bg-white shadow-xl flex flex-col justify-between`}
    >
      <div>
        {/* Top Executive Header Band */}
        <div 
          className="p-8 text-white relative overflow-hidden"
          style={{
            backgroundColor: theme.primaryColor,
          }}
        >
          <div className="flex items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5 flex-1 min-w-0">
              <h1 className="text-2xl font-black leading-tight">{personal.fullName || 'الاسم الكامل'}</h1>
              <p className="text-sm font-medium text-white/90 leading-snug">{personal.jobTitle || 'المسمى الوظيفي'}</p>
            </div>
            
            {/* Faceless Avatar or User Photo */}
            <FacelessAvatar
              avatarUrl={personal.avatarUrl}
              fullName={personal.fullName}
              shape="rounded"
              size="md"
              borderColor="rgba(255,255,255,0.4)"
            />
          </div>

          {/* Quick Contact Bar - Isolated Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-white/95 mt-5 pt-4 border-t border-white/20">
            {personal.phone && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" dir="ltr">{personal.phone}</span>
              </div>
            )}
            {personal.email && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <Mail className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" dir="ltr" title={personal.email}>{personal.email}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <MapPin className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" title={personal.location}>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <Globe className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" dir="ltr" title={personal.website}>{personal.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <Linkedin className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" dir="ltr" title={personal.linkedin}>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                <Github className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-xs truncate flex-1" dir="ltr" title={personal.github}>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          {/* Summary Box */}
          {personal.summary && (
            <div className="bg-slate-50 border-r-4 p-4 rounded-l-lg space-y-1.5" style={{ borderColor: theme.primaryColor }}>
              <h2 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
                ملخص إلتزام وتأهيل تنفيذي
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Main Column: Experience & Education */}
            <div className="col-span-8 space-y-6">
              {/* Experience */}
              {experience && experience.length > 0 && (
                <section className="space-y-4">
                  <h2 
                    className="text-sm font-bold flex items-center gap-2 border-b-2 pb-1.5"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
                  >
                    <Briefcase className="w-4 h-4" />
                    السجل المهني والمناصب
                  </h2>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex justify-between items-start gap-3">
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <h3 className="text-xs font-bold text-slate-900 leading-snug">{exp.jobTitle || 'المسمى الوظيفي'}</h3>
                            <p className="text-xs font-medium text-slate-600 leading-normal">{exp.company || 'اسم الشركة / الجهة'}</p>
                          </div>
                          <span 
                            className="text-[10px] font-bold px-2 py-0.5 rounded text-white shrink-0 whitespace-nowrap"
                            style={{ backgroundColor: theme.primaryColor }}
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

              {/* Education */}
              {education && education.length > 0 && (
                <section className="space-y-3">
                  <h2 
                    className="text-sm font-bold flex items-center gap-2 border-b-2 pb-1.5"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
                  >
                    <GraduationCap className="w-4 h-4" />
                    التعليم والشهادات الأكاديمية
                  </h2>
                  <div className="space-y-2.5">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-start gap-3">
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <h3 className="text-xs font-bold text-slate-900 leading-snug">{edu.degree || 'الدرجة العلمية / الشهادة'}</h3>
                          <p className="text-xs text-slate-600 leading-normal">{edu.institution || 'الجامعة / المؤسسة التعليمية'}</p>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 shrink-0 whitespace-nowrap">{edu.startYear || 'سنة البدء'} - {edu.endYear || 'سنة التخرج'}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Column: Skills, Languages, Certs */}
            <div className="col-span-4 space-y-6 border-r border-slate-100 pr-4">
              {/* Skills */}
              {skills && skills.length > 0 && (
                <section className="space-y-2.5">
                  <h2 
                    className="text-xs font-bold flex items-center gap-1.5 border-b pb-1"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
                  >
                    <Code className="w-3.5 h-3.5" />
                    المهارات الأساسية
                  </h2>
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="w-full space-y-1">
                        <div className="flex justify-between items-center gap-2">
                          <span className="font-semibold text-slate-800 text-xs leading-normal break-words flex-1">
                            {skill.name || 'اسم المهارة'}
                          </span>
                          {skill.level ? (
                            <span className="text-[10px] font-medium text-slate-500 shrink-0 px-1.5 py-0.5 rounded bg-slate-100">
                              {skill.level === 5 ? 'خبير' : skill.level === 4 ? 'متقدم' : skill.level === 3 ? 'جيد جداً' : skill.level === 2 ? 'متوسط' : 'مبتدئ'}
                            </span>
                          ) : null}
                        </div>
                        {skill.level ? (
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(skill.level / 5) * 100}%`,
                                backgroundColor: theme.primaryColor
                              }} 
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <section className="space-y-2">
                  <h2 
                    className="text-xs font-bold flex items-center gap-1.5 border-b pb-1"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
                  >
                    <Languages className="w-3.5 h-3.5" />
                    اللغات
                  </h2>
                  <div className="space-y-1.5 text-xs">
                    {languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between items-center gap-2 text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
                        <span className="font-semibold text-slate-800 text-xs truncate min-w-0">{lang.name || 'اسم اللغة'}</span>
                        <span className="text-slate-600 text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <section className="space-y-2">
                  <h2 
                    className="text-xs font-bold flex items-center gap-1.5 border-b pb-1"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}30` }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    الشهادات المعتمده
                  </h2>
                  <div className="space-y-2 text-xs">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                        <div className="font-bold text-slate-900 leading-snug break-words text-xs">{cert.title || 'عنوان الشهادة'}</div>
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
      </div>
    </div>
  );
};
