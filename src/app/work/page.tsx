'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import {
  getAllProjects,
  PROJECT_FILTER_OPTIONS,
} from '@/lib/projects/project-service';
import { ProjectFilters } from '@/components/project/ProjectFilters';
import { ProjectCard } from '@/components/project/ProjectCard';
import { ProjectPreview } from '@/components/project/ProjectPreview';
import type { ProjectFilterCategory, ProjectItem } from '@/types/project';

export default function AllProjectsPage() {
  const allProjects = useMemo(() => getAllProjects(), []);
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterCategory>('all');
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(
    null
  );

  const totalCountByFilter = useMemo<Record<ProjectFilterCategory, number>>(
    () => ({
      all: allProjects.length,
      'react-native': allProjects.filter((p) => p.category === 'react-native')
        .length,
      web: allProjects.filter((p) => p.category === 'web').length,
    }),
    [allProjects]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeFilter);
  }, [allProjects, activeFilter]);

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden bg-obsidian pt-28 pb-24 text-warmWhite"
      >
        {/* Ambient background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute right-[12%] top-[8%] h-96 w-96 rounded-full bg-gold/15 blur-[140px]" />
          <div className="absolute left-[8%] bottom-[12%] h-96 w-96 rounded-full bg-cyan/15 blur-[140px]" />
        </div>

        <Container className="relative z-10">
          {/* Back to Homepage Link */}
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2.5 font-sans text-xs sm:text-sm text-mutedGrey transition-colors hover:text-gold-highlight"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Home — Section 04</span>
          </Link>

          {/* Archive Header */}
          <header className="mt-8 mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/[0.08] pb-10">
            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[1.5px] w-7 bg-gold-highlight/90"
                />
                <span className="font-display text-xs sm:text-[0.8125rem] font-medium tracking-[0.22em] uppercase text-gold-highlight">
                  PROJECT ARCHIVE // ALL WORK
                </span>
              </div>

              <h1 className="font-serif text-[clamp(2.75rem,5vw+0.6rem,4.75rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-warmWhite">
                All{' '}
                <span className="bg-gradient-to-r from-[#F5D794] via-[#E5BE78] to-[#B9893E] bg-clip-text text-transparent">
                  Projects.
                </span>
              </h1>

              <p className="mt-4 max-w-xl font-sans text-base sm:text-lg font-light leading-relaxed text-warmWhite/85">
                Complete archive of React Native mobile applications, full-stack
                web platforms, and interactive engineering case studies.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3">
              <Badge variant="gold">
                {filteredProjects.length} Project
                {filteredProjects.length === 1 ? '' : 's'} Displayed
              </Badge>
              <ProjectFilters
                options={PROJECT_FILTER_OPTIONS}
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                totalCountByFilter={totalCountByFilter}
              />
            </div>
          </header>

          {/* Equal-Importance Full Archive Grid */}
          <div
            role="tabpanel"
            aria-label="All projects archive grid"
            className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard
                  project={project}
                  onOpenPreview={(item) => setPreviewProject(item)}
                />
              </div>
            ))}
          </div>
        </Container>

        {/* Quick Preview Modal */}
        <ProjectPreview
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      </main>
    </>
  );
}
