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
    <div className={`gov-section-head ${className}`}>
      <div className="min-w-0 flex-1 max-w-4xl">
        <span className="gov-section-kicker">{kicker}</span>
        <h2 className="gov-section-title">{title}</h2>
        {description ? (
          <p className="mt-2 text-xs sm:text-sm text-[#707070] font-medium leading-relaxed max-w-2xl">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:shrink-0">
        {children}
        {actionLabel && actionTo ? (
          <Link to={actionTo} className="gov-btn gov-btn-primary px-4 py-2.5 whitespace-nowrap">
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
