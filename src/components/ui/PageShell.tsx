import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f9f9f9] pb-16">
      <div className="bg-[#043b87] text-white py-8 border-b border-[#021e44] shadow-inner">
        <div className="gov-shell space-y-3">
          <nav className="flex items-center gap-2 text-[11px] font-semibold text-blue-100">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Bosh sahifa</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-blue-200" />
            <span className="text-white font-bold uppercase truncate">{title}</span>
          </nav>

          <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-white">
            {title}
          </h1>

          {subtitle ? (
            <p className="text-xs md:text-sm text-blue-100 font-medium max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="gov-shell py-8">
        <div className="bg-white rounded-lg border border-[#e1e1e1] shadow-gov p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};
