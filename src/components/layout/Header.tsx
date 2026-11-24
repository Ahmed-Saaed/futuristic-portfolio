'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BRAND_CONFIG, HEADER_CTA, NAVIGATION_ITEMS } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { Monogram } from '@/components/ui/Monogram';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/layout/Navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const isWorkRoute = pathname?.startsWith('/work') ?? false;
  const [activeId, setActiveId] = useState<string>(
    isWorkRoute ? 'work' : 'home'
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Sync active tab with route changes (e.g. /work or /work/[slug])
  useEffect(() => {
    if (isWorkRoute) {
      setActiveId('work');
    }
  }, [isWorkRoute]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isWorkRoute) return;

    const observedIds = NAVIGATION_ITEMS.map((item) => item.id);
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-38% 0px -48% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isWorkRoute]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavSelect = (id: string) => {
    setActiveId(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-obsidian/85 backdrop-blur-xl border-b border-white/[0.06] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.65)]'
          : 'bg-gradient-to-b from-obsidian/90 via-obsidian/45 to-transparent py-5 md:py-7'
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Left: AS Monogram + AHMED SA'ED Wordmark */}
        <a
          href={isWorkRoute ? '/#home' : '#home'}
          onClick={() => handleNavSelect('home')}
          className="group inline-flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian rounded-md"
          aria-label="Ahmed Sa'ed — Home"
        >
          <Monogram
            size="md"
            glow
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.28em] uppercase text-warmWhite/95 transition-colors duration-300 group-hover:text-gold-highlight">
            {BRAND_CONFIG.name}
          </span>
        </a>

        {/* Center: Desktop Navigation */}
        <Navigation
          items={NAVIGATION_ITEMS}
          activeId={activeId}
          onSelect={handleNavSelect}
          className="hidden md:block"
        />

        {/* Right: Desktop Let's Talk Pill CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button
              href={isWorkRoute ? `/${HEADER_CTA.href}` : HEADER_CTA.href}
              variant="nav-pill"
              size="sm"
              className="px-5 py-2.5 text-[0.8125rem]"
            >
              {HEADER_CTA.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-graphite/80 text-warmWhite transition-colors hover:border-gold-highlight hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-out border-b border-gold/20 bg-obsidian/95 backdrop-blur-2xl',
          isMobileMenuOpen
            ? 'max-h-[420px] opacity-100 py-6'
            : 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
        )}
      >
        <Container className="flex flex-col gap-6">
          <Navigation
            items={NAVIGATION_ITEMS}
            activeId={activeId}
            onSelect={handleNavSelect}
            orientation="vertical"
          />
          <div className="pt-2 border-t border-borderDark/60">
            <Button
              href={HEADER_CTA.href}
              variant="nav-pill"
              size="md"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full justify-center"
            >
              {HEADER_CTA.label}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

