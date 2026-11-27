export type ContactPathMode = 'hire' | 'work';

export const CONTACT_SECTION_CONTENT = {
  sectionIndex: '06',
  sectionLabel: "06 / LET'S CONNECT",
  headline: {
    line1: 'Have an idea',
    line2: 'worth building?',
  },
  fullHeadline: 'Have an idea worth building?',
  supportingText:
    'Whether you are hiring for an engineering role or planning a new digital product, choose a path below to start a conversation.',
  email: 'ahmed.saaed.abdelgel@gmail.com',
  paths: {
    hire: {
      id: 'hire' as const,
      tabLabel: 'Hire Me',
      tabSublabel: 'Engineering Roles',
      badge: 'DIRECT ACCESS & CREDENTIALS',
      formBadge: 'ENGINEERING ROLE INQUIRY',
      title: 'Engineering Opportunities',
      description:
        'Open to international, remote, and high-impact React Native or Full-Stack engineering roles.',
      availabilityLabel: 'Available for remote & international roles',
      cvHref: '/cv/Ahmed-Saeed-CV.pdf',
      cvDownloadName: 'Ahmed-Saeed-CV.pdf',
      cvLabel: 'Download CV',
      cvTitle: 'Curriculum Vitae (PDF)',
      cvDescription:
        'Mid-Level Software Engineer · React Native & React.js Developer (3 years experience across fintech & insurtech).',
      formHeading: 'Discuss an Engineering Role',
      formDescription:
        'Share the role details, team context, or hiring timeline and I will respond promptly.',
      submitLabel: 'Send Role Inquiry',
    },
    work: {
      id: 'work' as const,
      tabLabel: 'Work With Me',
      tabSublabel: 'Freelance & Products',
      badge: 'PRODUCT & FREELANCE INQUIRY',
      formBadge: 'PRODUCT & FREELANCE INQUIRY',
      title: 'Start a Project Inquiry',
      description:
        "Share your product goals, timeline, and scope. Let's explore what we can build together.",
      submitLabel: 'Send Project Inquiry',
    },
  },
} as const;
