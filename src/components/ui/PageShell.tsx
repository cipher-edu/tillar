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
    <div className="min-h-screen bg-[#F8FAFC] pb-16 font-sans">
      <div className="relative bg-gradient-to-r from-[#002E69] via-[#013D8C] to-[#002E69] text-white py-10 border-b border-[#002E69] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="gov-shell relative z-10 space-y-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200/90">
            <Link to="/" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Bosh sahifa</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300/60" />
            <span className="text-white font-bold uppercase tracking-wider truncate">{title}</span>
          </nav>

          <div className="flex flex-col gap-2">
            <div className="w-12 h-1 uz-flag-line rounded-full mb-1" />
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              {title}
            </h1>
          </div>

          {subtitle ? (
            <p className="text-xs md:text-sm text-blue-100/90 font-medium max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="gov-shell py-8 sm:py-10">
        <div className="bg-white border border-[#E1E1E1] hover:transition-shadow duration-300 p-6 md:p-10">
          {children}
        </div>

        {/* Alisher Navoiy Verse Heritage Band */}
        <NavoiPageBand />
      </div>
    </div>
  );
};
