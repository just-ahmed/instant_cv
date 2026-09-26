import React from 'react';

interface Props {
  avatarUrl?: string;
  fullName?: string;
  className?: string;
  shape?: 'circle' | 'rounded' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: string;
}

export const FacelessAvatar: React.FC<Props> = ({
  avatarUrl,
  fullName = '',
  className = '',
  shape = 'circle',
  size = 'md',
  borderColor,
}) => {
  const shapeClass = 
    shape === 'circle' ? 'rounded-full' :
    shape === 'rounded' ? 'rounded-2xl' : 'rounded-xl';

  const sizeClass = 
    size === 'sm' ? 'w-14 h-14' :
    size === 'md' ? 'w-20 h-20' :
    size === 'lg' ? 'w-24 h-24' : 'w-28 h-28';

  // Only render user-provided image if it is not the old default Unsplash placeholder face
  const isValidCustomImage = avatarUrl && !avatarUrl.includes('unsplash.com') && avatarUrl.trim().length > 0;

  if (isValidCustomImage) {
    return (
      <img
        src={avatarUrl}
        alt={fullName || 'الصورة الشخصية'}
        className={`${sizeClass} ${shapeClass} object-cover border-2 shadow-md shrink-0 ${className}`}
        style={{ borderColor: borderColor || '#cbd5e1' }}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${shapeClass} bg-slate-200 border-2 border-slate-300/80 flex items-end justify-center overflow-hidden shrink-0 shadow-inner relative ${className}`}
      style={{ borderColor: borderColor || 'rgba(255, 255, 255, 0.4)' }}
      title="شخصية رمزية (Faceless Figure)"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-slate-400"
      >
        {/* Subtle background gradient */}
        <rect width="40" height="40" fill="#E2E8F0" />
        {/* Faceless Head */}
        <circle cx="20" cy="14.5" r="6.5" fill="#94A3B8" />
        {/* Faceless Torso / Shoulders */}
        <path
          d="M7 38C7 30.268 12.8198 24 20 24C27.1802 24 33 30.268 33 38V40H7V38Z"
          fill="#94A3B8"
        />
      </svg>
    </div>
  );
};

