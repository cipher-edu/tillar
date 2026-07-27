import React from 'react';
import { Outlet } from 'react-router-dom';
import { GovThemeProvider } from '@/context/GovThemeContext';
import { GovAccessibilityBar } from './GovAccessibilityBar';
import { GovHeader } from './GovHeader';
import { GovMarquee } from './GovMarquee';
import { GovFooter } from './GovFooter';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {
  return (
    <GovThemeProvider>
      <div className="min-h-screen w-full flex flex-col bg-white text-[#131523] font-sans selection:bg-[#013d8c] selection:text-white overflow-x-hidden">
        <ScrollToTop />
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
