import type { CapabilitiesContent } from '@/types/common';

export const CAPABILITIES_CONTENT: CapabilitiesContent = {
  sectionIndex: '03',
  sectionLabel: '03 / CAPABILITIES',
  headline: {
    line1: 'From interface to',
    line2: 'architecture.',
  },
  fullHeadline: 'From interface to architecture.',
  introduction:
    'A practical engineering toolkit for turning product requirements into reliable experiences.',
  areas: [
    {
      id: 'frontend',
      number: '01',
      title: 'Frontend Engineering',
      shortDescription: 'Modern, performant, and accessible web experiences.',
      expandedSummary:
        'Component-driven web interfaces engineered for clarity, responsive precision, accessibility, and fast rendering.',
      accent: 'gold',
      primaryTags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      allTechnologies: [
        'React',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'UI architecture',
        'Performance',
        'Accessibility',
      ],
      focusAreas: [
        'Reusable component systems and strict TypeScript contracts',
        'Core Web Vitals, rendering performance, and semantic accessibility',
      ],
      centerpieceLayerLabel: 'LAYER 01 // INTERFACE & WEB ARCHITECTURE',
    },
    {
      id: 'mobile',
      number: '02',
      title: 'Mobile Development',
      shortDescription: 'Native-feeling apps with React Native.',
      expandedSummary:
        'Cross-platform mobile applications with fluid gesture navigation, predictable state management, and native device integrations.',
      accent: 'cyan',
      primaryTags: ['React Native', 'Expo', 'Navigation', 'Performance'],
      allTechnologies: [
        'React Native',
        'Expo',
        'Navigation',
        'State management',
        'Native integrations',
        'Mobile performance',
      ],
      focusAreas: [
        'Smooth 60fps animations, navigation flows, and offline-resilient state',
        'Native SDK bridges, hardware capabilities, and production store delivery',
      ],
      centerpieceLayerLabel: 'LAYER 02 // MOBILE & RUNTIME ENGINE',
    },
    {
      id: 'backend',
      number: '03',
      title: 'Backend & Systems',
      shortDescription: 'Scalable and reliable server-side solutions.',
      expandedSummary:
        'Structured APIs, relational and document data models, secure authentication flows, and maintainable service boundaries.',
      accent: 'gold',
      primaryTags: ['Node.js', 'APIs', 'Databases', 'System Design'],
      allTechnologies: [
        'Node.js',
        'APIs',
        'Databases',
        'Authentication',
        'System design',
      ],
      focusAreas: [
        'Clean API contracts, schema validation, and secure authentication',
        'Database modeling, query optimization, and end-to-end reliability',
      ],
      centerpieceLayerLabel: 'LAYER 03 // DATA & SYSTEMS INFRASTRUCTURE',
    },
  ],
  scrollCue: {
    label: 'Scroll to explore',
    href: '#work',
  },
};
