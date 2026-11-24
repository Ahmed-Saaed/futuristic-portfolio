import type { AboutContent } from '@/types/common';

export const ABOUT_CONTENT: AboutContent = {
  sectionIndex: '02',
  sectionLabel: '02 / THE PERSON',
  topRightLabel: 'ABOUT ME',
  headline: {
    line1: 'Beyond',
    line2: 'the code.',
  },
  fullHeadline: 'Beyond the code.',
  introduction:
    "I'm a software engineer driven by curiosity, problem-solving, and the craft of building digital products that feel as good as they work.",
  supportingStatement: 'THINK CLEARLY. BUILD WITH PURPOSE.',
  principles: [
    {
      id: 'curiosity',
      title: 'Curiosity',
      description: 'Keep learning.',
    },
    {
      id: 'craft',
      title: 'Craft',
      description: 'Write better code.',
    },
    {
      id: 'ownership',
      title: 'Ownership',
      description: 'Take responsibility.',
    },
  ],
  scrollCue: {
    label: 'Scroll to explore',
    href: '#skills',
  },
};

