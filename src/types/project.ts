export type ProjectCategory = 'web' | 'react-native';
export type ProjectFilterCategory = 'all' | ProjectCategory;
export type ProjectStatus = 'placeholder' | 'published';
export type ProjectMockupVariant =
  | 'web-collaborative'
  | 'mobile-suite'
  | 'web-analytics';

export interface ProjectCaseStudyDetails {
  overview: string;
  role: string;
  problem: string;
  solution: string;
  architectureDecisions: string[];
  challenges: string[];
  outcome: string;
  confidentialityNote?: string;
}

export interface RawProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  description: string;
  thumbnail: string;
  mockupVariant?: string;
  technologies: string[];
  caseStudy?: string;
  liveUrl: string | null;
  repositoryUrl: string | null;
  status?: string;
  caseStudyDetails?: Partial<ProjectCaseStudyDetails>;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  accent: 'gold' | 'cyan';
  description: string;
  thumbnail: string;
  mockupVariant: ProjectMockupVariant;
  technologies: string[];
  caseStudyUrl: string;
  liveUrl: string | null;
  repositoryUrl: string | null;
  status: ProjectStatus;
  caseStudyDetails: ProjectCaseStudyDetails;
}

export interface ProjectFilterOption {
  id: ProjectFilterCategory;
  label: string;
  accent: 'gold' | 'cyan';
}
