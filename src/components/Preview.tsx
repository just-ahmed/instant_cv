import React from 'react';
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

  return (
    <div className="w-full flex justify-center items-start overflow-x-auto py-2">
      <div 
        className="a4-preview-wrapper transition-transform duration-200"
        style={{
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
