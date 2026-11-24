'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  getAllProjects,
  PROJECT_FILTER_OPTIONS,
} from '@/lib/projects/project-service';
import { ProjectFilters } from '@/components/project/ProjectFilters';
import { ProjectCard } from '@/components/project/ProjectCard';
import { ProjectPagination } from '@/components/project/ProjectPagination';
import { ProjectPreview } from '@/components/project/ProjectPreview';
import { MOTION_TOKENS } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ProjectFilterCategory, ProjectItem } from '@/types/project';

const ITEMS_PER_PAGE = 3;

export function ProjectGallery() {
  const allProjects = useMemo(() => getAllProjects(), []);
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterCategory>('all');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(
    null
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Compute project counts per filter category
  const totalCountByFilter = useMemo<Record<ProjectFilterCategory, number>>(
    () => ({
      all: allProjects.length,
      'react-native': allProjects.filter((p) => p.category === 'react-native')
        .length,
      web: allProjects.filter((p) => p.category === 'web').length,
    }),
    [allProjects]
  );

  // Filtered projects for the active tab
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeFilter);
  }, [allProjects, activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  );

  const visibleProjects = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Smooth GSAP transition whenever filter or page changes (450ms, power2.out)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-project-card]',
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: MOTION_TOKENS.stagger.tight,
          ease: MOTION_TOKENS.ease.primary,
          clearProps: 'transform,opacity,visibility',
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter, currentPage, prefersReducedMotion]);

  const handleSelectFilter = (category: ProjectFilterCategory) => {
    setActiveFilter(category);
    setCurrentPage(0);
    setActiveSlotIndex(0);
  };

  const handleStepPrevious = () => {
    if (filteredProjects.length <= 1) return;
    if (totalPages > 1) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
    setActiveSlotIndex(
      (prev) => (prev - 1 + visibleProjects.length) % visibleProjects.length
    );
  };

  const handleStepNext = () => {
    if (filteredProjects.length <= 1) return;
    if (totalPages > 1) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
    setActiveSlotIndex((prev) => (prev + 1) % visibleProjects.length);
  };

  const handleSelectSlot = (slotIdx: number) => {
    setActiveSlotIndex(slotIdx);
    const targetProject = visibleProjects[slotIdx];
    if (targetProject) {
      setPreviewProject(targetProject);
    }
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* 1. Horizontal Category Filter Pills */}
      <div data-proof-filters>
        <ProjectFilters
          options={PROJECT_FILTER_OPTIONS}
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
          totalCountByFilter={totalCountByFilter}
        />
      </div>

      {/* 2. Equal-Importance 3-Column Project Cards Grid */}
      {visibleProjects.length > 0 ? (
        <div
          id="project-gallery-grid"
          ref={gridRef}
          role="tabpanel"
          aria-label={`Displaying ${activeFilter} projects`}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
        >
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setActiveSlotIndex(index)}
              className="h-full"
            >
              <ProjectCard
                project={project}
                onOpenPreview={(item) => setPreviewProject(item)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          id="project-gallery-grid"
          role="tabpanel"
          className="rounded-2xl border border-white/[0.08] bg-[#0D1014]/80 p-10 text-center"
        >
          <p className="font-display text-base text-warmWhite">
            No projects in this category yet.
          </p>
          <p className="mt-1 font-sans text-sm text-mutedGrey">
            Add new entries to <code>src/data/projects.json</code> or select
            another filter.
          </p>
          <button
            type="button"
            onClick={() => handleSelectFilter('all')}
            className="mt-4 inline-flex items-center rounded-full border border-gold/50 px-4 py-2 font-sans text-xs text-gold-highlight hover:bg-gold/10"
          >
            View All Projects
          </button>
        </div>
      )}

      {/* 3. Gallery Pagination & Navigation Controls */}
      <div data-proof-pagination>
        <ProjectPagination
          totalItems={visibleProjects.length}
          activeSlotIndex={activeSlotIndex}
          totalPages={totalPages}
          currentPage={currentPage}
          onStepPrevious={handleStepPrevious}
          onStepNext={handleStepNext}
          onSelectSlot={handleSelectSlot}
          exploreHref="/work"
          exploreLabel="Explore More Projects"
        />
      </div>

      {/* 4. Accessible Quick-Preview Dialog */}
      <ProjectPreview
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
