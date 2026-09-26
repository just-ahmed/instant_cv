import React, { useState, useEffect } from 'react';
import { CVData, TemplateId, ThemeConfig } from './types';
import { INITIAL_CV_DATA, EMPTY_CV_DATA, DEFAULT_THEME } from './data/initialData';
import { Header } from './components/Header';
import { FormEditor } from './components/FormEditor';
import { Preview } from './components/Preview';
import { ConfirmModal } from './components/ConfirmModal';
import { exportCVToPDF } from './utils/pdfExport';
import { ZoomIn, ZoomOut, RefreshCw, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Load initial data from localStorage if present
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem('sira_fawriya_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically purge any old unsplash placeholder faces
        if (parsed.personal?.avatarUrl && parsed.personal.avatarUrl.includes('unsplash.com')) {
          parsed.personal.avatarUrl = '';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    return INITIAL_CV_DATA;
  });

  // Ensure state never carries old placeholder face
  useEffect(() => {
    if (cvData.personal?.avatarUrl && cvData.personal.avatarUrl.includes('unsplash.com')) {
      setCvData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          avatarUrl: '',
        },
      }));
    }
  }, [cvData.personal?.avatarUrl]);

  const [template, setTemplate] = useState<TemplateId>('modern');
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [previewScale, setPreviewScale] = useState<number>(0.85);
  const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auto-save to localStorage whenever cvData changes
  useEffect(() => {
    try {
      localStorage.setItem('sira_fawriya_data', JSON.stringify(cvData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [cvData]);

  // Handle PDF Export
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportCVToPDF('cv-preview-content', `${cvData.personal.fullName || 'السيرة_الذاتية'}.pdf`);
      showToast('تم تصدير ملف PDF بنجاح!');
    } catch (err) {
      console.error('Export error:', err);
      showToast('تعذر تصدير ملف PDF، يرجى المحاولة مرة أخرى.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  // Handle Load Sample Data
  const handleLoadSample = () => {
    setCvData(INITIAL_CV_DATA);
    showToast('تم تحميل النموذج التجريبي بنجاح!');
  };

  // Trigger Clear Data Modal
  const handlePromptClear = () => {
    setIsClearModalOpen(true);
  };

  // Confirm Clear Data Execution
  const handleConfirmClear = () => {
    setCvData(EMPTY_CV_DATA);
    try {
      localStorage.setItem('sira_fawriya_data', JSON.stringify(EMPTY_CV_DATA));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    setIsClearModalOpen(false);
    showToast('تم مسح كافة البيانات والبدء بسيرة ذاتية فارغة.');
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sira_fawriya_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم حفظ ملف JSON على جهازك.');
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          if (event.target?.result) {
            const parsed = JSON.parse(event.target.result as string);
            if (parsed.personal) {
              setCvData(parsed);
              showToast('تم استيراد بيانات السيرة الذاتية بنجاح!');
            } else {
              showToast('الملف المحدد غير صالح لمُنشئ السيرة الذاتية.', 'error');
            }
          }
        } catch (error) {
          showToast('تعذر قراءة ملف JSON.', 'error');
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-tajawal relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-2xl border text-xs font-bold transition-all animate-in slide-in-from-top-3 duration-300"
          style={{
            backgroundColor: toastMessage.type === 'success' ? '#064e3b' : '#7f1d1d',
            borderColor: toastMessage.type === 'success' ? '#059669' : '#dc2626',
            color: '#ffffff'
          }}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isClearModalOpen}
        title="مسح كافة بيانات السيرة الذاتية"
        message="هل أنت متأكد من رغبتك في مسح كافة الحقول والخبرات والشهادات والبدء بسيرة ذاتية فارغة؟ لا يمكن التراجع عن هذه الخطوة."
        confirmText="نعم، مسح كافة البيانات"
        cancelText="تراجع"
        onConfirm={handleConfirmClear}
        onCancel={() => setIsClearModalOpen(false)}
      />

      {/* Header Bar */}
      <Header
        template={template}
        onSelectTemplate={setTemplate}
        theme={theme}
        onUpdateTheme={setTheme}
        onExportPDF={handleExportPDF}
        onPrint={handlePrint}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        isExporting={isExporting}
        mobileTab={mobileTab}
        onSelectMobileTab={setMobileTab}
      />

      {/* Main Content Split View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Editor Column (Hidden on mobile if Preview tab is active) */}
          <div className={`lg:col-span-5 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <FormEditor
              data={cvData}
              onChange={setCvData}
              onLoadSample={handleLoadSample}
              onClear={handlePromptClear}
            />
          </div>

          {/* Live Preview Column (Hidden on mobile if Edit tab is active) */}
          <div className={`lg:col-span-7 ${mobileTab === 'edit' ? 'hidden lg:block' : 'block'} lg:sticky lg:top-24`}>
            {/* Preview Controls Bar */}
            <div className="no-print bg-slate-800/90 border border-slate-700/80 p-3 rounded-xl mb-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Eye className="w-4 h-4 text-[#44E5E7]" />
                <span>معاينة السيرة الذاتية المباشرة (A4)</span>
              </div>

              {/* Zoom Scale Controls */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setPreviewScale((s) => Math.max(0.5, s - 0.05))}
                  type="button"
                  className="hover:text-white p-0.5"
                  title="تصغير المعاينة"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-slate-200 min-w-[40px] text-center">
                  {Math.round(previewScale * 100)}%
                </span>
                <button
                  onClick={() => setPreviewScale((s) => Math.min(1.2, s + 0.05))}
                  type="button"
                  className="hover:text-white p-0.5"
                  title="تكبير المعاينة"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewScale(0.85)}
                  type="button"
                  className="hover:text-white p-0.5 border-r border-slate-700 pr-1.5 mr-1"
                  title="إعادة تعيين الحجم"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Render Printable A4 Sheet */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden min-h-[600px] flex justify-center items-start">
              <Preview
                data={cvData}
                template={template}
                theme={theme}
                scale={previewScale}
              />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>سيرة فورية © {new Date().getFullYear()} - منشئ السير الذاتية الاحترافي باللغة العربية. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
