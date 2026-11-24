import rawProjectsData from '@/data/projects.json';
import { adaptProjectList } from '@/lib/projects/project-adapter';
import type {
  ProjectFilterCategory,
  ProjectFilterOption,
  ProjectItem,
  RawProjectRecord,
} from '@/types/project';

/**
 * Abstract repository interface so replacing local JSON with Sanity, Strapi,
 * Contentful, or a REST/GraphQL endpoint later requires zero changes to UI components.
 */
export interface ProjectRepository {
  getAllProjects(): ProjectItem[];
  getProjectsByCategory(category: ProjectFilterCategory): ProjectItem[];
  getProjectBySlug(slug: string): ProjectItem | null;
}

export const PROJECT_FILTER_OPTIONS: ProjectFilterOption[] = [
  { id: 'all', label: 'All Projects', accent: 'gold' },
  { id: 'react-native', label: 'React Native', accent: 'cyan' },
  { id: 'web', label: 'Web Development', accent: 'gold' },
];

class JsonProjectRepository implements ProjectRepository {
  private readonly projects: ProjectItem[];

  constructor(rawRecords: RawProjectRecord[]) {
    this.projects = adaptProjectList(rawRecords);
  }

  getAllProjects(): ProjectItem[] {
    return this.projects;
  }

  getProjectsByCategory(category: ProjectFilterCategory): ProjectItem[] {
    if (category === 'all') {
      return this.projects;
    }
    return this.projects.filter((project) => project.category === category);
  }

  getProjectBySlug(slug: string): ProjectItem | null {
    return (
      this.projects.find(
        (project) => project.slug === slug || project.id === slug
      ) ?? null
    );
  }
}

const projectRepository: ProjectRepository = new JsonProjectRepository(
  rawProjectsData as RawProjectRecord[]
);

export function getAllProjects(): ProjectItem[] {
  return projectRepository.getAllProjects();
}

export function getProjectsByCategory(
  category: ProjectFilterCategory
): ProjectItem[] {
  return projectRepository.getProjectsByCategory(category);
}

export function getProjectBySlug(slug: string): ProjectItem | null {
  return projectRepository.getProjectBySlug(slug);
}
