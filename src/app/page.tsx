import { Header } from '@/components/layout/Header';
import { LoaderSection } from '@/components/sections/LoaderSection';
import { HeroSection } from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <>
      <LoaderSection />
      <Header />
      <main id="main-content" className="relative min-h-screen bg-obsidian">
        <HeroSection />
      </main>
    </>
  );
}

