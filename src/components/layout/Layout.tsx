import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GovThemeProvider } from '@/context/GovThemeContext';
import { GovAccessibilityBar } from './GovAccessibilityBar';
import { GovHeader } from './GovHeader';
import { GovMarquee } from './GovMarquee';
import { GovFooter } from './GovFooter';
import { ScrollToTop } from './ScrollToTop';
import { GovLoader } from '@/components/ui/GovLoader';
import { AnimatePresence } from 'framer-motion';

export const Layout: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <GovThemeProvider>
      <div className="min-h-screen w-full flex flex-col bg-white text-slate-900 font-sans selection:bg-[#002E69] selection:text-white overflow-x-hidden">
        <ScrollToTop />
        <AnimatePresence>
          {loading && <GovLoader fullScreen label="Yuklanmoqda..." />}
        </AnimatePresence>
        <GovAccessibilityBar />
        <GovHeader />
        <GovMarquee />

        <main className="flex-grow w-full min-w-0">
          <Outlet />
        </main>

        <GovFooter />
      </div>
    </GovThemeProvider>
  );
};
