import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhySolar } from '@/components/sections/WhySolar';
import { Services } from '@/components/sections/Services';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { SolarProcess } from '@/components/sections/SolarProcess';
import { SubsidySection } from '@/components/sections/SubsidySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { AssistantProviderComponent } from '@/features/solar-assistant/AssistantContext';
import { SolarAssistantSection } from '@/features/solar-assistant/components/SolarAssistantSection';
import { FloatingAssistantLauncher } from '@/features/solar-assistant/components/FloatingAssistantLauncher';
import { BookingSection } from '@/features/booking/components/BookingSection';
import { QuoteSection } from '@/features/quote/components/QuoteSection';
import { Footer } from '@/components/navigation/Footer';

// Lazy-load Admin portal so public site bundle remains lightweight
const AdminRoot = lazy(() => import('@/features/admin/AdminRoot'));

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // If path is /admin or starts with /admin, render protected Admin portal
  if (currentPath.startsWith('/admin')) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-mono text-xs">
            Loading Sahaja Admin Portal...
          </div>
        }
      >
        <AdminRoot />
      </Suspense>
    );
  }

  // Otherwise render complete public website
  return (
    <AssistantProviderComponent>
      <div className="min-h-screen bg-surface-bg text-content-primary flex flex-col font-body selection:bg-brand-green selection:text-white relative">
        {/* Premium Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Step 2: Cinematic Pinned Scroll Video Hero */}
          <Hero
            videoSrc="/assets/videos/solar-hero.mp4"
            mobileVideoSrc="/assets/videos/solar-hero.mp4"
          />

          {/* Step 3: About Sahaja Solar */}
          <About />

          {/* Step 4: Why Solar Energy */}
          <WhySolar />

          {/* Step 5: Our Solar Solutions / Services */}
          <Services />

          {/* Step 6: Solar Cost & Savings Calculator */}
          <CalculatorSection />

          {/* Step 7: Your Journey to Solar / Installation Process */}
          <SolarProcess />

          {/* Step 8: Government Solar Subsidy */}
          <SubsidySection />

          {/* Step 9: Sahaja Solar Projects / Installations */}
          <ProjectsSection />

          {/* Step 10: Solar Products & Technology */}
          <ProductsSection />

          {/* Step 11: Customer Trust & Experience */}
          <TrustSection />

          {/* Step 12: Sahaja Solar AI Assistant */}
          <SolarAssistantSection />

          {/* Step 13: Consultation Booking System */}
          <BookingSection />

          {/* Step 14: Get a Solar Quote / Contact / WhatsApp */}
          <QuoteSection />
        </main>

        {/* Step 15: Premium Website Footer */}
        <Footer />

        {/* Persistent Floating Assistant & WhatsApp Launcher */}
        <FloatingAssistantLauncher />
      </div>
    </AssistantProviderComponent>
  );
};

export default App;
