import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { NavoiPageBand } from './NavoiPageBand';

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
  showDivider?: boolean;
  tone?: string;
  topic?: string;
  heritageIntensity?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] pb-16 font-sans">
      <div className="relative bg-[#013D8C] text-white py-10 border-b border-[#002E69] overflow-hidden">
        <div className="gov-shell relative z-10 space-y-4">
          <nav className="flex items-center gap-2 text-xs font-medium text-blue-100">
            <Link to="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Bosh sahifa</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
            <span className="text-white font-semibold truncate">{title}</span>
          </nav>

          <div className="flex flex-col gap-2">
            <div className="w-12 h-1 uz-flag-line mb-1" />
            <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-white font-sans">
              {title}
            </h1>
          </div>

          {subtitle ? (
            <p className="text-xs md:text-sm text-blue-100 font-normal max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="gov-shell py-8 sm:py-10">
        <div className="bg-white border border-[#E1E1E1] p-6 md:p-10 text-[#000000] rounded-none">
          {children}
        </div>

        {/* Alisher Navoiy Verse Heritage Band */}
        <NavoiPageBand />
      </div>
    </div>
  );
};
