
'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
