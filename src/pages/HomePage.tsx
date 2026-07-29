import React from 'react';
import { GovHeroSlider } from '@/components/home/GovHeroSlider';
import { GovServicesGrid } from '@/components/home/GovServicesGrid';
import { GovStatsSection } from '@/components/home/GovStatsSection';
import { PresidentQuoteSection } from '@/components/home/PresidentQuoteSection';
import { GovNewsSection } from '@/components/home/GovNewsSection';
import { GovExplorerSection } from '@/components/home/GovExplorerSection';
import { GovRectorAddressSection } from '@/components/home/GovRectorAddressSection';
import { GovLeadershipSection } from '@/components/home/GovLeadershipSection';
import { GovPartnersSection } from '@/components/home/GovPartnersSection';
import { NavoiQuoteSection } from '@/components/home/NavoiQuoteSection';
import { navoiQuoteTil } from '@/data/navoiQuotes';

/**
 * Bosh sahifa — gov.uz uslubidagi rasmiy portal layout.
 * Bo‘lim tartibi: Hero → Xizmatlar → Prezident Fikrlari → Statistika → Yangiliklar → Navoiy Hikmati → Katalog → Rektor Murojaati → Rahbariyat → Hamkorlar
 */
export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-white font-sans">
      <GovHeroSlider />
      <GovServicesGrid />
      <PresidentQuoteSection />
      <GovStatsSection />
      <GovNewsSection />
      <NavoiQuoteSection quote={navoiQuoteTil} variant="royal" />
      <GovExplorerSection />
      <GovRectorAddressSection />
      <GovLeadershipSection />
      <GovPartnersSection />
    </div>
  );
};

export default HomePage;
