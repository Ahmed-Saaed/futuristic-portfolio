export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  ariaLabel: string;
}

export interface HeroContent {
  sectionIndex: string;
  totalSections: string;
  eyebrow: string;
  headlineLines: {
    line1Prefix: string;
    line1Build: string;
    line1Digital: string;
    line2Products: string;
    line2That: string;
    line3MoveIdeas: string;
    line3Forward: string;
  };
  fullHeadline: string;
  roles: string[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  scrollCueLabel: string;
  portrait: {
    src: string;
    fallbackSrc: string;
    alt: string;
  };
}

