import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GovSectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
  children?: React.ReactNode;
}

export const GovSectionHeader: React.FC<GovSectionHeaderProps> = ({
  kicker,
  title,
  description,
  actionLabel,
  actionTo,
  className = '',
  children,
}) => {
  return (
    <div className={`gov-section-head ${className} font-sans mb-8 pb-4 border-b border-[#E1E1E1]`}>
      <div className="min-w-0 flex-1 max-w-4xl">
        <span className="gov-section-kicker text-[#013D8C] font-bold text-xs tracking-wider block mb-1">{kicker}</span>
        <h2 className="gov-section-title text-[#043B87] font-sans font-extrabold uppercase text-xl sm:text-2xl md:text-3xl tracking-wide">{title}</h2>
        {description ? (
          <p className="mt-2 text-xs sm:text-sm text-[#707070] font-normal leading-relaxed max-w-3xl">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:shrink-0 mt-3 sm:mt-0">
        {children}
        {actionLabel && actionTo ? (
          <Link to={actionTo} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#013D8C] hover:bg-[#002E69] text-white text-xs font-semibold rounded-none transition-colors border border-[#013D8C]">
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
