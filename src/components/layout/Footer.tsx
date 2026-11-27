import { BRAND_CONFIG, NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/data/navigation';
import { CONTACT_SECTION_CONTENT } from '@/data/contact';
import { Container } from '@/components/ui/Container';
import { Monogram } from '@/components/ui/Monogram';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="relative border-t border-white/[0.07] bg-obsidian py-12 md:py-14 text-warmWhite"
    >
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Left: AS Monogram + AHMED SA'ED + Short Brand Statement */}
          <div className="space-y-3">
            <a
              href="#home"
              className="group inline-flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-md"
            >
              <Monogram size="sm" glow />
              <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.28em] uppercase text-warmWhite group-hover:text-gold-highlight transition-colors">
                {BRAND_CONFIG.name}
              </span>
            </a>

            <p className="max-w-sm font-sans text-xs sm:text-sm text-mutedGrey">
              Engineering ideas into experiences. Building digital products that
              move ideas forward.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-6 sm:gap-8">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="font-sans text-xs sm:text-sm text-mutedGrey transition-colors duration-200 hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight rounded-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Direct Email & Social Links */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <a
              href={`mailto:${CONTACT_SECTION_CONTENT.email}`}
              className="font-display text-xs sm:text-sm font-medium text-gold-highlight hover:underline"
            >
              {CONTACT_SECTION_CONTENT.email}
            </a>

            <ul className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={
                      social.id === 'email'
                        ? `mailto:${CONTACT_SECTION_CONTENT.email}`
                        : social.href
                    }
                    aria-label={social.ariaLabel}
                    className="font-sans text-xs text-mutedGrey transition-colors duration-200 hover:text-warmWhite"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-mutedGrey/75">
          <p>
            © {currentYear} {BRAND_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-gold/75">
            REACT NATIVE DEVELOPER · FULL-STACK ENGINEER
          </p>
        </div>
      </Container>
    </footer>
  );
}
