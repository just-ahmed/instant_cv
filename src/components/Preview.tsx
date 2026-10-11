import React, { useRef, useEffect, useState } from 'react';
import { CVData, TemplateId, ThemeConfig } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface Props {
  data: CVData;
  template: TemplateId;
  theme: ThemeConfig;
  scale?: number;
}

export const Preview: React.FC<Props> = ({ data, template, theme, scale = 1 }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(1123);

  // Keep track of actual rendered height
  useEffect(() => {
    if (!contentRef.current) return;
    const updateHeight = () => {
      if (contentRef.current) {
        const h = Math.max(contentRef.current.scrollHeight, contentRef.current.offsetHeight, 1123);
        setContentHeight(h);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [data, template]);

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} theme={theme} />;
      case 'executive':
        return <ExecutiveTemplate data={data} theme={theme} />;
      case 'creative':
        return <CreativeTemplate data={data} theme={theme} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} theme={theme} />;
    }
  };

  const a4BaseWidth = 794;
  const scaledWidth = Math.round(a4BaseWidth * scale);
  const scaledHeight = Math.round(contentHeight * scale);

  return (
    <div 
      className="w-full flex justify-center items-start overflow-x-auto py-1 sm:py-2 select-none"
      dir="rtl"
    >
      {/* Viewport container with exact scaled dimensions */}
      <div 
        className="a4-preview-viewport transition-all duration-150 shrink-0 mx-auto"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative',
        }}
      >
        {/* Scaler anchored top-right in RTL so right-side personal info is NEVER clipped */}
        <div 
          ref={contentRef}
          className="a4-preview-scaler"
          style={{
            width: `${a4BaseWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top right',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
