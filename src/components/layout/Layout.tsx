import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalSiteBackground } from '@/components/ui/PatternBackground';
import { NavoiHeritageBand } from '@/components/ui/NavoiHeritageBand';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      {/* Bir xil global fon: krem + parchment + girih + yulduz + manuscript */}
      <GlobalSiteBackground />
      <Header />
      <main className="flex-grow relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Har sahifa oxiri: Navoiy merosi + hazrat misralari */}
      <NavoiHeritageBand key={`navoi-band-${location.pathname}`} />
      <Footer />
    </div>
  );
};
