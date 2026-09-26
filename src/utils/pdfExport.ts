import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Loads an image from a Data URL and returns an HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Main export function to generate high-quality A4 PDF with 100% accurate Arabic ligatures,
 * true native CSS colors, gradients, and proper A4 pagination.
 */
export async function exportCVToPDF(
  elementId: string = 'cv-preview-content',
  fileName: string = 'السيرة_الذاتية.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('تعذر العثور على عنصر المعاينة لطباعته.');
    return false;
  }

  let sandbox: HTMLElement | null = null;

  try {
    // 1. Ensure all Arabic fonts are fully loaded
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn('Font ready check warning:', e);
      }
    }

    // 2. Clone the element into an isolated, clean rendering container
    sandbox = document.createElement('div');
    sandbox.id = 'cv-pdf-render-sandbox';
    sandbox.style.position = 'fixed';
    sandbox.style.top = '-10000px';
    sandbox.style.left = '-10000px';
    sandbox.style.width = '794px'; // Standard A4 at 96 DPI
    sandbox.style.background = '#ffffff';
    sandbox.style.margin = '0';
    sandbox.style.padding = '0';
    sandbox.style.overflow = 'visible';
    sandbox.style.zIndex = '-1000';
    sandbox.style.opacity = '1';

    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-export-clone';
    clone.style.width = '794px';
    clone.style.minHeight = '1123px';
    clone.style.margin = '0';
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';
    clone.style.boxSizing = 'border-box';
    clone.style.background = '#ffffff';
    clone.style.visibility = 'visible';
    clone.style.letterSpacing = 'normal';

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // Wait a brief tick for layout settling
    await new Promise((resolve) => setTimeout(resolve, 100));

    const totalHeight = Math.max(clone.scrollHeight, clone.offsetHeight, 1123);
    const targetWidth = 794;

    let dataUrl = '';

    // 3. Try primary rendering via html-to-image (SVG foreignObject engine for crisp Arabic ligatures)
    try {
      dataUrl = await htmlToImage.toPng(clone, {
        width: targetWidth,
        height: totalHeight,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        cacheBust: false,
        skipFonts: false,
        style: {
          transform: 'none',
          margin: '0',
          padding: '0',
        },
      });
    } catch (primaryErr) {
      console.warn('html-to-image primary render failed, switching to html2canvas fallback:', primaryErr);
      // Fallback to html2canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: targetWidth,
        windowHeight: totalHeight,
      });
      dataUrl = canvas.toDataURL('image/png');
    }

    // Clean up temporary sandbox immediately after rasterization
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
      sandbox = null;
    }

    if (!dataUrl || dataUrl.length < 100) {
      throw new Error('Render produced empty image data');
    }

    // 4. Load the generated PNG image into an HTML image object
    const img = await loadImage(dataUrl);
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) {
      throw new Error('Failed to obtain image dimensions from raster');
    }

    // 5. Initialize jsPDF (A4 in mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // mm
    const pdfHeight = 297; // mm

    // Total content height in mm
    const contentHeightMm = (imgHeight * pdfWidth) / imgWidth;

    // If single page fit (within 302mm with tolerance)
    if (contentHeightMm <= 302) {
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    } else {
      // Multi-page CV handling via clean canvas slicing
      const pageHeightPx = Math.floor((imgWidth * pdfHeight) / pdfWidth);
      let renderedHeight = 0;
      let pageIndex = 0;

      while (renderedHeight < imgHeight) {
        if (pageIndex > 0) {
          pdf.addPage();
        }

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgWidth;
        const currentSliceHeight = Math.min(pageHeightPx, imgHeight - renderedHeight);
        sliceCanvas.height = currentSliceHeight;

        const sliceCtx = sliceCanvas.getContext('2d');
        if (sliceCtx) {
          sliceCtx.fillStyle = '#ffffff';
          sliceCtx.fillRect(0, 0, imgWidth, currentSliceHeight);
          sliceCtx.drawImage(
            img,
            0,
            renderedHeight,
            imgWidth,
            currentSliceHeight,
            0,
            0,
            imgWidth,
            currentSliceHeight
          );

          const sliceData = sliceCanvas.toDataURL('image/png');
          const sliceHeightMm = (currentSliceHeight * pdfWidth) / imgWidth;
          const safeSliceHeight = Math.min(sliceHeightMm, pdfHeight);

          pdf.addImage(sliceData, 'PNG', 0, 0, pdfWidth, safeSliceHeight, undefined, 'FAST');
        }

        renderedHeight += pageHeightPx;
        pageIndex++;
      }
    }

    // 6. Download the PDF
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF export error, falling back to browser print dialog:', error);
    // Cleanup any lingering sandbox
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
    const lingeringSandbox = document.getElementById('cv-pdf-render-sandbox');
    if (lingeringSandbox && lingeringSandbox.parentNode) {
      lingeringSandbox.parentNode.removeChild(lingeringSandbox);
    }
    // Clean fallback to native browser print
    window.print();
    return false;
  }
}
