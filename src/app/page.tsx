import { Header } from '@/components/layout/Header';
import { LoaderSection } from '@/components/sections/LoaderSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { WorkSection } from '@/components/sections/WorkSection';

export default function HomePage() {
  return (
    <>
      <LoaderSection />
      <Header />
      <main id="main-content" className="relative min-h-screen bg-obsidian">
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <WorkSection />
      </main>
    </>
  );
}

