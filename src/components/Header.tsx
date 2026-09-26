import React from 'react';
import { TemplateId, ThemeConfig, FontFamilyId } from '../types';
import { PALETTES } from '../data/initialData';
import { Download, Printer, FileCode, Upload, Sparkles, Layout, Palette, Type, Check } from 'lucide-react';

interface Props {
  template: TemplateId;
  onSelectTemplate: (t: TemplateId) => void;
  theme: ThemeConfig;
  onUpdateTheme: (t: ThemeConfig) => void;
  onExportPDF: () => void;
  onPrint: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isExporting: boolean;
  mobileTab: 'edit' | 'preview';
  onSelectMobileTab: (tab: 'edit' | 'preview') => void;
}

export const Header: React.FC<Props> = ({
  template,
  onSelectTemplate,
  theme,
  onUpdateTheme,
  onExportPDF,
  onPrint,
  onExportJSON,
  onImportJSON,
  isExporting,
  mobileTab,
  onSelectMobileTab,
}) => {
  const templatesList: { id: TemplateId; name: string }[] = [
    { id: 'modern', name: 'عصري (Modern)' },
    { id: 'classic', name: 'كلاسيكي (Classic)' },
    { id: 'executive', name: 'تنفيذي (Executive)' },
    { id: 'creative', name: 'إبداعي (Creative)' },
  ];

  const fontsList: { id: FontFamilyId; name: string }[] = [
    { id: 'tajawal', name: 'خط تجوال (Tajawal)' },
    { id: 'cairo', name: 'خط القاهرة (Cairo)' },
    { id: 'alexandria', name: 'خط الإسكندرية (Alexandria)' },
    { id: 'ibm', name: 'خط IBM Plex Arabic' },
  ];

  return (
    <header className="no-print bg-slate-900/95 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-900 font-black shadow-lg"
            style={{
              background: `linear-gradient(135deg, #73FBD3 0%, #44E5E7 30%, #59D2FE 70%, #4A8FE7 100%)`
            }}
          >
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              سيرة فورية
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#44E5E7]/20 text-[#44E5E7] border border-[#44E5E7]/30">
                مجاني 100%
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              صانع السيرة الذاتية الاحترافي باللغة العربية مع معاينة مباشرة وتصدير PDF
            </p>
          </div>
        </div>

        {/* Action Buttons: PDF Export, Print, Import/Export */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onExportPDF}
            disabled={isExporting}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, #73FBD3 0%, #44E5E7 50%, #59D2FE 100%)`
            }}
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'جاري التصدير...' : 'تحميل PDF'}</span>
          </button>

          <button
            onClick={onPrint}
            type="button"
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="طباعة مباشرة"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden md:inline">طباعة</span>
          </button>

          {/* Export/Import JSON */}
          <div className="hidden lg:flex items-center gap-1 border-r border-slate-800 pr-2 mr-1">
            <button
              onClick={onExportJSON}
              type="button"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title="حفظ الملف كمستند JSON"
            >
              <FileCode className="w-4 h-4" />
            </button>
            <label 
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              title="استعادة ملف JSON سابق"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Toolbar Controls Sub-Header: Templates, Colors, Fonts */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Template Selector */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
              <Layout className="w-3.5 h-3.5 text-[#59D2FE]" />
              القالب:
            </span>
            <div className="flex gap-1.5 shrink-0">
              {templatesList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTemplate(t.id)}
                  type="button"
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    template === t.id
                      ? 'bg-[#4A8FE7] text-white shadow-sm'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-[#44E5E7]" />
              اللون:
            </span>
            <div className="flex items-center gap-1.5">
              {PALETTES.map((p) => {
                const isSelected = theme.primaryColor === p.primary;
                return (
                  <button
                    key={p.id}
                    onClick={() =>
                      onUpdateTheme({
                        ...theme,
                        primaryColor: p.primary,
                        secondaryColor: p.secondary,
                        accentColor: p.accent,
                        highlightColor: p.highlight,
                      })
                    }
                    type="button"
                    title={p.name}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      isSelected ? 'ring-2 ring-white scale-110' : 'hover:scale-105 opacity-80'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${p.primary} 0%, ${p.accent} 100%)`,
                    }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-[#73FBD3]" />
              الخط:
            </span>
            <select
              value={theme.fontFamily}
              onChange={(e) => onUpdateTheme({ ...theme, fontFamily: e.target.value as FontFamilyId })}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#73FBD3]"
            >
              {fontsList.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Tab View Toggle (Sits under toolbar on small screens) */}
      <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-2 flex justify-center gap-2">
        <button
          onClick={() => onSelectMobileTab('edit')}
          type="button"
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileTab === 'edit'
              ? 'bg-[#4A8FE7] text-white shadow'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          تعديل البيانات (النموذج)
        </button>
        <button
          onClick={() => onSelectMobileTab('preview')}
          type="button"
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileTab === 'preview'
              ? 'bg-[#4A8FE7] text-white shadow'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          معاينة السيرة الذاتية
        </button>
      </div>
    </header>
  );
};
