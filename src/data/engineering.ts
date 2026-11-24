import type { EngineeringProcessContent } from '@/types/common';

export const ENGINEERING_PROCESS_CONTENT: EngineeringProcessContent = {
  sectionIndex: '05',
  sectionLabel: '05 / THE PROCESS',
  headline: {
    line1: 'A thoughtful process.',
    line2: 'A better product.',
  },
  fullHeadline: 'A thoughtful process. A better product.',
  supportingText:
    'Good engineering is more than making things work. It is understanding why they should exist, making deliberate decisions, and caring about the details.',
  supportingCaption: 'FROM FIRST QUESTION TO CONTINUOUS IMPROVEMENT',
  stages: [
    {
      id: 'understand',
      number: '01',
      title: 'UNDERSTAND',
      description:
        'Clarify the problem, users, requirements, and constraints.',
      expandedDetails: [
        'Analyze requirements.',
        'Identify user needs.',
        'Define success criteria.',
        'Understand technical and business constraints.',
      ],
      accent: 'gold',
      statueLightingFocus: {
        goldIntensity: 1,
        cyanIntensity: 0.45,
        orbitAngle: 0,
      },
    },
    {
      id: 'architect',
      number: '02',
      title: 'ARCHITECT',
      description:
        'Shape the structure, responsibilities, and technical approach.',
      expandedDetails: [
        'Define component responsibilities.',
        'Plan application structure.',
        'Consider data flow and dependencies.',
        'Prioritize maintainability and scalability.',
      ],
      accent: 'cyan',
      statueLightingFocus: {
        goldIntensity: 0.55,
        cyanIntensity: 1,
        orbitAngle: 14,
      },
    },
    {
      id: 'build',
      number: '03',
      title: 'BUILD',
      description:
        'Turn ideas into clean, maintainable, reusable software.',
      expandedDetails: [
        'Build reusable components.',
        'Follow consistent coding standards.',
        'Keep responsibilities separated.',
        'Focus on performance and code quality.',
      ],
      accent: 'gold',
      statueLightingFocus: {
        goldIntensity: 1,
        cyanIntensity: 0.65,
        orbitAngle: 28,
      },
    },
    {
      id: 'validate',
      number: '04',
      title: 'VALIDATE',
      description:
        'Test, review, and improve the quality of the result.',
      expandedDetails: [
        'Test important user flows.',
        'Review implementation quality.',
        'Identify and resolve defects.',
        'Improve reliability and usability.',
      ],
      accent: 'cyan',
      statueLightingFocus: {
        goldIntensity: 0.5,
        cyanIntensity: 1,
        orbitAngle: 42,
      },
    },
    {
      id: 'deliver',
      number: '05',
      title: 'DELIVER',
      description:
        'Release, learn from real use, and keep improving.',
      expandedDetails: [
        'Prepare production releases.',
        'Deploy and monitor applications.',
        'Learn from feedback.',
        'Iterate and improve continuously.',
      ],
      accent: 'gold',
      statueLightingFocus: {
        goldIntensity: 0.95,
        cyanIntensity: 0.85,
        orbitAngle: 56,
      },
    },
  ],
};
