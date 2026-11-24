import type {
  ProjectCategory,
  ProjectCaseStudyDetails,
  ProjectItem,
  ProjectMockupVariant,
  ProjectStatus,
  RawProjectRecord,
} from '@/types/project';

const DEFAULT_CASE_STUDY_DETAILS: ProjectCaseStudyDetails = {
  overview:
    'Placeholder project overview. Replace this record in src/data/projects.json or via your CMS provider when real case-study documentation is ready.',
  role: 'Software Engineer (Placeholder)',
  problem:
    'Placeholder problem statement awaiting real project documentation.',
  solution:
    'Placeholder technical solution awaiting real architecture notes.',
  architectureDecisions: [
    'Modular component architecture with strict TypeScript contracts',
    'Clear separation between data access adapters and UI presentation',
  ],
  challenges: [
    'Placeholder engineering challenge awaiting real project details',
  ],
  outcome:
    'Placeholder outcome — No fabricated metrics or unverified claims are displayed.',
};

function normalizeCategory(raw: string): ProjectCategory {
  const cleaned = raw.trim().toLowerCase();
  if (
    cleaned === 'react-native' ||
    cleaned === 'mobile' ||
    cleaned === 'react native'
  ) {
    return 'react-native';
  }
  return 'web';
}

function normalizeMockupVariant(
  raw: string | undefined,
  category: ProjectCategory,
  index: number
): ProjectMockupVariant {
  if (
    raw === 'web-collaborative' ||
    raw === 'mobile-suite' ||
    raw === 'web-analytics'
  ) {
    return raw;
  }
  if (category === 'react-native') {
    return 'mobile-suite';
  }
  return index % 2 === 0 ? 'web-collaborative' : 'web-analytics';
}

function normalizeStatus(raw: string | undefined): ProjectStatus {
  return raw === 'published' ? 'published' : 'placeholder';
}

/**
 * Normalizes a raw project record (from local JSON, Sanity, Strapi, Contentful, or a custom API)
 * into the strict internal `ProjectItem` domain model consumed by presentation components.
 */
export function adaptProjectRecord(
  record: RawProjectRecord,
  index = 0
): ProjectItem {
  const category = normalizeCategory(record.category);
  const isMobile = category === 'react-native';
  const slug = record.slug?.trim() || record.id;

  const defaultCategoryLabel = isMobile
    ? 'Mobile Application'
    : 'Web Application';

  return {
    id: record.id,
    slug,
    title: record.title,
    category,
    categoryLabel: record.categoryLabel?.trim() || defaultCategoryLabel,
    accent: isMobile ? 'cyan' : 'gold',
    description: record.description,
    thumbnail: record.thumbnail,
    mockupVariant: normalizeMockupVariant(
      record.mockupVariant,
      category,
      index
    ),
    technologies: Array.isArray(record.technologies)
      ? record.technologies
      : [],
    caseStudyUrl: record.caseStudy?.trim() || `/work/${slug}`,
    liveUrl: record.liveUrl ?? null,
    repositoryUrl: record.repositoryUrl ?? null,
    status: normalizeStatus(record.status),
    caseStudyDetails: {
      overview:
        record.caseStudyDetails?.overview ||
        DEFAULT_CASE_STUDY_DETAILS.overview,
      role: record.caseStudyDetails?.role || DEFAULT_CASE_STUDY_DETAILS.role,
      problem:
        record.caseStudyDetails?.problem || DEFAULT_CASE_STUDY_DETAILS.problem,
      solution:
        record.caseStudyDetails?.solution ||
        DEFAULT_CASE_STUDY_DETAILS.solution,
      architectureDecisions:
        record.caseStudyDetails?.architectureDecisions?.length
          ? record.caseStudyDetails.architectureDecisions
          : DEFAULT_CASE_STUDY_DETAILS.architectureDecisions,
      challenges: record.caseStudyDetails?.challenges?.length
        ? record.caseStudyDetails.challenges
        : DEFAULT_CASE_STUDY_DETAILS.challenges,
      outcome:
        record.caseStudyDetails?.outcome || DEFAULT_CASE_STUDY_DETAILS.outcome,
      confidentialityNote: record.caseStudyDetails?.confidentialityNote,
    },
  };
}

export function adaptProjectList(records: RawProjectRecord[]): ProjectItem[] {
  return records.map((record, index) => adaptProjectRecord(record, index));
}
