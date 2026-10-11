import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = false 
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Identity Emblem Icon */}
      <div 
        className={`${sizeMap[size]} relative rounded-xl flex items-center justify-center p-0.5 shrink-0 shadow-lg shadow-cyan-500/10 group transition-all duration-300 hover:scale-105`}
        style={{
          background: 'linear-gradient(135deg, #73FBD3 0%, #44E5E7 35%, #59D2FE 70%, #4A8FE7 100%)',
        }}
      >
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle luminous glow background inside */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #44E5E7 0%, transparent 70%)',
            }}
          />
          
          {/* Custom SVG Monogram: Abstract Arabic 'س' + Resume Document Sheet */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4/5 h-4/5 relative z-10 transition-transform duration-300 group-hover:scale-110"
          >
            {/* CV Document Silhouette */}
            <path
              d="M11 9C11 7.89543 11.8954 7 13 7H22L29 14V31C29 32.1046 28.1046 33 27 33H13C11.8954 33 11 32.1046 11 31V9Z"
              stroke="#59D2FE"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            />
            {/* Folded corner */}
            <path
              d="M22 7V14H29"
              stroke="#73FBD3"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            />
            
            {/* Dynamic Arabic 'س' Flowing Ribbon overlaid on the CV */}
            <path
              d="M15 25C15 27 16.5 28.5 19 28.5C22 28.5 23.5 26.5 24 24.5C24.5 22.5 25.5 20 27.5 20C28.5 20 29 20.5 29 21.5"
              stroke="#73FBD3"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 21C16.2 21 17.5 21.8 18 23"
              stroke="#44E5E7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19.5 21C20.5 21 21.5 21.8 22 23"
              stroke="#44E5E7"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Spark of speed/instantaneity dot */}
            <circle cx="15.5" cy="14.5" r="1.5" fill="#73FBD3" />
            <circle cx="19.5" cy="14.5" r="1.5" fill="#44E5E7" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-black text-white tracking-tight">سيرة فورية</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#44E5E7]/15 text-[#44E5E7] border border-[#44E5E7]/30">
              SIRA FAWRIYA
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">المنصة المتكاملة لصناعة السيرة الذاتية الاحترافية</span>
        </div>
      )}
    </div>
  );
};
