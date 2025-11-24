import React from 'react';

interface MangaCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  title?: string;
}

export const MangaCard: React.FC<MangaCardProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  title
}) => {
  const borderColors = {
    primary: 'border-cyan-400',
    secondary: 'border-pink-500',
    danger: 'border-yellow-400',
  };

  const shadowColors = {
    primary: 'shadow-[8px_8px_0px_0px_rgba(34,211,238,0.5)]',
    secondary: 'shadow-[8px_8px_0px_0px_rgba(236,72,153,0.5)]',
    danger: 'shadow-[8px_8px_0px_0px_rgba(250,204,21,0.5)]',
  };

  return (
    <div className={`
      relative bg-slate-500 dark:bg-slate-800 border-4 ${borderColors[variant]} 
      ${shadowColors[variant]} 
      transition-all duration-300 hover:translate-y-[-4px] hover:translate-x-[-4px] 
      hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]
      p-6 ${className}
    `}>
      {title && (
        <div className="absolute -top-6 -left-2 bg-black text-white px-4 py-1 font-display text-xl tracking-wider border-2 border-white transform -rotate-2 z-10">
          {title}
        </div>
      )}
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white opacity-50"></div>
      
      {children}
    </div>
  );
};