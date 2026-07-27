import React from 'react';
import { GovHeroSlider } from '@/components/home/GovHeroSlider';
import { GovServicesGrid } from '@/components/home/GovServicesGrid';
import { GovStatsSection } from '@/components/home/GovStatsSection';
import { GovNewsSection } from '@/components/home/GovNewsSection';
import { GovExplorerSection } from '@/components/home/GovExplorerSection';
import { GovLeadershipSection } from '@/components/home/GovLeadershipSection';
import { GovPartnersSection } from '@/components/home/GovPartnersSection';

/**
 * Bosh sahifa — gov.uz uslubidagi rasmiy portal layout.
 * Bo‘lim tartibi: Hero → Xizmatlar → Statistika → Yangiliklar → Katalog → Rahbariyat → Hamkorlar
 */
export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <GovHeroSlider />
      <GovServicesGrid />
      <GovStatsSection />
      <GovNewsSection />
      <GovExplorerSection />
      <GovLeadershipSection />
      <GovPartnersSection />
    </div>
  );
};

export default HomePage;
