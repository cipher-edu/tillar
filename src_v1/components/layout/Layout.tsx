import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalSiteBackground } from '@/components/ui/PatternBackground';
import { NavoiHeritageBand } from '@/components/ui/NavoiHeritageBand';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden w-full max-w-[100vw] selection:bg-amber-200 selection:text-amber-900">
      {/* Sahifalar almashganda avtomatik yuqoriga qaytarish */}
      <ScrollToTop />

      {/* Bir xil global fon: krem + parchment + girih + yulduz + manuscript */}
      <GlobalSiteBackground />
      <Header />

      <main className="flex-grow relative z-0">
        <Outlet />
      </main>

      {/* Har sahifa oxiri: Navoiy merosi + hazrat misralari */}
      <NavoiHeritageBand />
      <Footer />
    </div>
  );
};
