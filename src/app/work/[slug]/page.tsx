import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { ProjectCaseStudy } from '@/components/project/ProjectCaseStudy';
import {
  getAllProjects,
  getProjectBySlug,
} from '@/lib/projects/project-service';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — AHMED SA'ED",
    };
  }

  return {
    title: `${project.title} (${project.categoryLabel}) — Case Study | AHMED SA'ED`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-obsidian">
        <ProjectCaseStudy project={project} />
      </main>
    </>
  );
}
