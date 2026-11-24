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

export type PrincipleIconId = 'curiosity' | 'craft' | 'ownership';

export interface PrincipleItem {
  id: PrincipleIconId;
  title: string;
  description: string;
}

export interface AboutContent {
  sectionIndex: string;
  sectionLabel: string;
  topRightLabel: string;
  headline: {
    line1: string;
    line2: string;
  };
  fullHeadline: string;
  introduction: string;
  supportingStatement: string;
  principles: PrincipleItem[];
  scrollCue: {
    label: string;
    href: string;
  };
}

export type CapabilityAreaId = 'frontend' | 'mobile' | 'backend';
export type CapabilityAccent = 'gold' | 'cyan';

export interface CapabilityArea {
  id: CapabilityAreaId;
  number: string;
  title: string;
  shortDescription: string;
  expandedSummary: string;
  accent: CapabilityAccent;
  primaryTags: string[];
  allTechnologies: string[];
  focusAreas: string[];
  centerpieceLayerLabel: string;
}

export interface CapabilitiesContent {
  sectionIndex: string;
  sectionLabel: string;
  headline: {
    line1: string;
    line2: string;
  };
  fullHeadline: string;
  introduction: string;
  areas: CapabilityArea[];
  scrollCue: {
    label: string;
    href: string;
  };
}

