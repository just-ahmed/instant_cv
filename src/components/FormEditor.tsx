import React, { useState } from 'react';
import { CVData, EducationItem, ExperienceItem, SkillItem, LanguageItem, CertificationItem } from '../types';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Languages, Award, Plus, Trash2, ChevronDown, ChevronUp, Image, Sparkles, X } from 'lucide-react';
import { FacelessAvatar } from './FacelessAvatar';

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
  onLoadSample: () => void;
  onClear: () => void;
}

export const FormEditor: React.FC<Props> = ({ data, onChange, onLoadSample, onClear }) => {
  const [activeSection, setActiveSection] = useState<string>('personal');

  // Helper updates
  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  // Avatar Upload Handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('avatarUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Experience handlers
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: [''],
    };
    onChange({
      ...data,
      experience: [...data.experience, newItem],
    });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const addResponsibility = (expId: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === expId ? { ...exp, responsibilities: [...exp.responsibilities, ''] } : exp
      ),
    });
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => {
        if (exp.id === expId) {
          const updated = [...exp.responsibilities];
          updated[index] = value;
          return { ...exp, responsibilities: updated };
        }
        return exp;
      }),
    });
  };

  const removeResponsibility = (expId: string, index: number) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: exp.responsibilities.filter((_, i) => i !== index) };
        }
        return exp;
      }),
    });
  };

  // Education handlers
  const addEducation = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      description: '',
    };
    onChange({
      ...data,
      education: [...data.education, newItem],
    });
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills handlers
  const addSkill = () => {
    const newItem: SkillItem = {
      id: Date.now().toString(),
      name: '',
      level: 4,
    };
    onChange({
      ...data,
      skills: [...data.skills, newItem],
    });
  };

  const updateSkill = (id: string, field: keyof SkillItem, value: any) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  // Language handlers
  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'طلاقة احترافية (C1/C2)',
    };
    onChange({
      ...data,
      languages: [...data.languages, newItem],
    });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  // Certification handlers
  const addCert = () => {
    const newItem: CertificationItem = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      year: '',
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newItem],
    });
  };

  const updateCert = (id: string, field: keyof CertificationItem, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    });
  };

  const removeCert = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id),
    });
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar for Preset and Reset */}
      <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#73FBD3]" />
          <span className="text-xs font-bold text-slate-200">محرر بيانات السيرة الذاتية</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4A8FE7] hover:bg-[#3b7cd4] text-white transition-all shadow-sm active:scale-95"
          >
            تحميل نموذج تجريبي
          </button>
          <button
            onClick={onClear}
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="مسح كافة البيانات والبدء بسيرة ذاتية فارغة"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح البيانات</span>
          </button>
        </div>
      </div>

      {/* Accordion 1: Personal & Contact Info */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#44E5E7]" />
            <span className="text-sm font-bold text-slate-100">المعلومات الشخصية والاتصال</span>
          </div>
          {activeSection === 'personal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'personal' && (
          <div className="p-4 space-y-4 border-t border-slate-700/50">
            {/* Profile Avatar Upload */}
            <div className="flex items-center gap-4 bg-slate-900/60 p-3 rounded-lg border border-slate-700/50">
              <FacelessAvatar
                avatarUrl={data.personal.avatarUrl}
                fullName={data.personal.fullName}
                shape="circle"
                size="sm"
                borderColor="#59D2FE"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200">الصورة الشخصية (شخصية رمزية افتراضياً)</label>
                  {data.personal.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => updatePersonal('avatarUrl', '')}
                      className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      title="إزالة الصورة والعودة للشخصية الرمزية"
                    >
                      <X className="w-3 h-3" />
                      <span>إزالة الصورة</span>
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="block w-full text-xs text-slate-400 file:ml-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#4A8FE7] file:text-white hover:file:bg-[#3b7cd4] cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  placeholder="أدخل الاسم الكامل (مثال: أحمد محمود)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">المسمى الوظيفي *</label>
                <input
                  type="text"
                  value={data.personal.jobTitle}
                  onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                  placeholder="أدخل المسمى الوظيفي (مثال: مهندس برمجيات)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني (اختياري)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7] dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الهاتف *</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  placeholder="أدخل رقم الهاتف (مثال: +966 50 123 4567)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7] dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الموقع / المدينة والعنوان *</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  placeholder="المدينة، الدولة (مثال: الرياض، السعودية)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">الموقع الشخصي / رابط لينكدإن</label>
                <input
                  type="text"
                  value={data.personal.linkedin || ''}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7] dir-ltr text-right"
                />
              </div>
            </div>

            {/* Summary Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">الملخص المهني (عن الكاتب) *</label>
              <textarea
                rows={4}
                value={data.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                placeholder="اكتب نبذة مختصرة عن مؤهلاتك، خبراتك، وأهدافك المهنية..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7] leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Accordion 2: Experience (الخبرة العملية) */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-[#59D2FE]" />
            <span className="text-sm font-bold text-slate-100">الخبرات العملية ({data.experience.length})</span>
          </div>
          {activeSection === 'experience' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'experience' && (
          <div className="p-4 space-y-4 border-t border-slate-700/50">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700 space-y-3 relative">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-[#59D2FE]">خبرة #{index + 1}</span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    type="button"
                    className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">المسمى الوظيفي</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      placeholder="مثال: مطور تطبيقات واجهات"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#59D2FE]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">اسم الشركة / الجهة</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="مثال: شركة الحلول المتقدمة"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#59D2FE]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">تاريخ البدء</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="مثال: يناير 2021"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#59D2FE]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">تاريخ الانتهاء</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        disabled={exp.currentlyWorking}
                        value={exp.currentlyWorking ? 'حتى الآن' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="مثال: مارس 2023"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#59D2FE] disabled:opacity-50"
                      />
                      <label className="flex items-center gap-1 shrink-0 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.currentlyWorking}
                          onChange={(e) => updateExperience(exp.id, 'currentlyWorking', e.target.checked)}
                          className="rounded border-slate-700 bg-slate-900 text-[#59D2FE]"
                        />
                        <span>حتى الآن</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-semibold text-slate-300">المهام والإنجازات الرئيسية</label>
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => updateResponsibility(exp.id, rIdx, e.target.value)}
                        placeholder="أدخل مهارة أو إنجاز حققته في هذه الوظيفة..."
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#59D2FE]"
                      />
                      {exp.responsibilities.length > 1 && (
                        <button
                          onClick={() => removeResponsibility(exp.id, rIdx)}
                          type="button"
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addResponsibility(exp.id)}
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] text-[#59D2FE] hover:underline font-semibold pt-1"
                  >
                    <Plus className="w-3 h-3" />
                    إضافة مهمة جديدة
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              type="button"
              className="w-full py-2.5 rounded-lg border border-dashed border-[#59D2FE]/50 text-[#59D2FE] hover:bg-[#59D2FE]/10 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              إضافة خبرة عملية جديدة
            </button>
          </div>
        )}
      </div>

      {/* Accordion 3: Education (المؤهلات التعليمية) */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('education')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-[#73FBD3]" />
            <span className="text-sm font-bold text-slate-100">المؤهلات التعليمية ({data.education.length})</span>
          </div>
          {activeSection === 'education' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'education' && (
          <div className="p-4 space-y-4 border-t border-slate-700/50">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-700 space-y-3 relative">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-[#73FBD3]">مؤهل تعليمي #{index + 1}</span>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    type="button"
                    className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">الدرجة العلمية / الشهادة</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="مثال: بكالوريوس علوم الحاسب"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#73FBD3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">الجامعة / المؤسسة التعليمية</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="مثال: جامعة الملك سعود"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#73FBD3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">سنة البدء</label>
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                      placeholder="مثال: 2016"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#73FBD3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">سنة التخرج</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                      placeholder="مثال: 2020"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#73FBD3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">تفاصيل إضافية / التقدير</label>
                  <input
                    type="text"
                    value={edu.description || ''}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder="مثال: مرتبة الشرف الأولى - التخصص الدقيق..."
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#73FBD3]"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              type="button"
              className="w-full py-2.5 rounded-lg border border-dashed border-[#73FBD3]/50 text-[#73FBD3] hover:bg-[#73FBD3]/10 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              إضافة مؤهل تعليمي جديد
            </button>
          </div>
        )}
      </div>

      {/* Accordion 4: Technical Skills (المهارات التقنية) */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <Code className="w-4 h-4 text-[#4A8FE7]" />
            <span className="text-sm font-bold text-slate-100">المهارات التقنية ({data.skills.length})</span>
          </div>
          {activeSection === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'skills' && (
          <div className="p-4 space-y-3 border-t border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="اسم المهارة (مثال: React.js)"
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#4A8FE7]"
                  />
                  <select
                    value={skill.level || 4}
                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value, 10))}
                    className="bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#4A8FE7] shrink-0"
                  >
                    <option value={5}>ممتاز (5/5)</option>
                    <option value={4}>جيد جداً (4/5)</option>
                    <option value={3}>متوسط (3/5)</option>
                    <option value={2}>مبتدئ (2/5)</option>
                  </select>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    type="button"
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addSkill}
              type="button"
              className="w-full py-2.5 rounded-lg border border-dashed border-[#4A8FE7]/50 text-[#4A8FE7] hover:bg-[#4A8FE7]/10 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              إضافة مهارة جديدة
            </button>
          </div>
        )}
      </div>

      {/* Accordion 5: Languages & Certifications */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('languages')}
          className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <Languages className="w-4 h-4 text-[#44E5E7]" />
            <span className="text-sm font-bold text-slate-100">اللغات والشهادات</span>
          </div>
          {activeSection === 'languages' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'languages' && (
          <div className="p-4 space-y-5 border-t border-slate-700/50">
            {/* Languages */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-200">إتقان اللغات</label>
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                    placeholder="اسم اللغة (مثال: العربية)"
                    className="w-1/2 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    className="w-1/2 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#44E5E7]"
                  >
                    <option value="اللغة الأم">اللغة الأم</option>
                    <option value="طلاقة احترافية (C1/C2)">طلاقة احترافية (C1/C2)</option>
                    <option value="جيد جداً (B2)">جيد جداً (B2)</option>
                    <option value="متوسط (B1)">متوسط (B1)</option>
                    <option value="مبتدئ (A1/A2)">مبتدئ (A1/A2)</option>
                  </select>
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    type="button"
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addLanguage}
                type="button"
                className="text-xs text-[#44E5E7] hover:underline font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> إضافة لغة جديدة
              </button>
            </div>

            {/* Certifications */}
            <div className="space-y-3 border-t border-slate-700/50 pt-4">
              <label className="block text-xs font-bold text-slate-200">الشهادات والدورات التدريبية</label>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 items-center">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCert(cert.id, 'title', e.target.value)}
                    placeholder="عنوان الشهادة (مثال: PMP)"
                    className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                    placeholder="الجهة المانحة (مثال: PMI)"
                    className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => updateCert(cert.id, 'year', e.target.value)}
                      placeholder="السنة (مثال: 2023)"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#44E5E7]"
                    />
                    <button
                      onClick={() => removeCert(cert.id)}
                      type="button"
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addCert}
                type="button"
                className="text-xs text-[#44E5E7] hover:underline font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> إضافة شهادة جديدة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
