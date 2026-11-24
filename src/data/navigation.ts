import type { HeroContent, NavItem, SocialLinkItem } from '@/types/common';

export const BRAND_CONFIG = {
  name: "AHMED SA'ED",
  monogram: 'AS',
  tagline: 'ENGINEERING IDEAS INTO EXPERIENCES.',
} as const;

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const HEADER_CTA = {
  label: "Let's Talk",
  href: '#contact',
} as const;

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: '#contact',
    ariaLabel: "Ahmed Sa'ed on GitHub (configure profile link)",
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#contact',
    ariaLabel: "Ahmed Sa'ed on LinkedIn (configure profile link)",
  },
  {
    id: 'email',
    label: 'Email',
    href: '#contact',
    ariaLabel: "Email Ahmed Sa'ed",
  },
];

export const HERO_CONTENT: HeroContent = {
  sectionIndex: '01',
  totalSections: '07',
  eyebrow: 'ENGINEERING IDEAS INTO EXPERIENCES.',
  headlineLines: {
    line1Prefix: 'I',
    line1Build: 'BUILD',
    line1Digital: 'DIGITAL',
    line2Products: 'PRODUCTS',
    line2That: 'THAT',
    line3MoveIdeas: 'MOVE IDEAS',
    line3Forward: 'FORWARD.',
  },
  fullHeadline: 'I BUILD DIGITAL PRODUCTS THAT MOVE IDEAS FORWARD.',
  roles: ['React Native Developer', 'Full-Stack Engineer', 'Problem Solver'],
  primaryCta: {
    label: 'Explore My Work',
    href: '#work',
  },
  secondaryCta: {
    label: "Let's Build Together",
    href: '#contact',
  },
  scrollCueLabel: 'Scroll to explore',
  portrait: {
    src: '/images/ahmed-hero-portrait.jpg',
    fallbackSrc: '/images/ahmed-source-portrait.jpg',
    alt: "Ahmed Sa'ed — React Native Developer and Full-Stack Engineer",
  },
};

