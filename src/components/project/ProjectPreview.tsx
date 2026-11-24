'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, GitBranch, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { ProjectItem } from '@/types/project';

export interface ProjectPreviewProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Accessible Quick-Preview Modal for any selected project.
 * Displays the project's overview, placeholder status badge, role, problem/solution
 * summary, technology tags, optional external links, and a direct CTA to the full case study page.
 */
export function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const isCyan = project.accent === 'cyan';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Surface */}
      <div
        className={cn(
          'relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border bg-[#0E1116]/95 p-6 sm:p-8 shadow-2xl',
          isCyan
            ? 'border-cyan/60 shadow-[0_0_50px_-10px_rgba(0,213,232,0.45)]'
            : 'border-gold/60 shadow-[0_0_50px_-10px_rgba(229,190,120,0.4)]'
        )}
      >
        {/* Top specular line */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-10 -top-px h-[2px] bg-gradient-to-r from-transparent to-transparent',
            isCyan ? 'via-cyan' : 'via-gold-highlight'
          )}
        />

        {/* Header Row: Category & Status Badges + Close Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant={isCyan ? 'cyan' : 'gold'}>
              {project.categoryLabel}
            </Badge>
            {project.status === 'placeholder' && (
              <Badge variant="neutral">Placeholder Entry — CMS Ready</Badge>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-warmWhite/80 transition-colors hover:border-gold-highlight hover:text-gold-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Title & Short Description */}
        <div className="mt-5">
          <h3
            id="project-preview-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-warmWhite"
          >
            {project.title}
          </h3>
          <p className="mt-2 font-sans text-sm sm:text-base text-warmWhite/85">
            {project.description}
          </p>
        </div>

        {/* Overview & Role Box */}
        <div className="mt-6 space-y-4 rounded-xl border border-white/[0.08] bg-obsidian/70 p-4 sm:p-5">
          <div>
            <span className="block font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-highlight">
              Overview
            </span>
            <p className="mt-1 font-sans text-xs sm:text-sm leading-relaxed text-mutedGrey">
              {project.caseStudyDetails.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2 border-t border-white/[0.06]">
            <div>
              <span className="block font-display text-[0.68rem] uppercase tracking-[0.18em] text-warmWhite/75">
                Role
              </span>
              <p className="mt-1 font-sans text-xs text-mutedGrey">
                {project.caseStudyDetails.role}
              </p>
            </div>
            <div>
              <span className="block font-display text-[0.68rem] uppercase tracking-[0.18em] text-warmWhite/75">
                Architecture Focus
              </span>
              <p className="mt-1 font-sans text-xs text-mutedGrey">
                {project.caseStudyDetails.architectureDecisions[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-5">
          <span className="block mb-2.5 font-display text-[0.68rem] uppercase tracking-[0.18em] text-mutedGrey">
            Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant={isCyan ? 'tech-pill-cyan' : 'tech-pill-gold'}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs text-warmWhite/85 hover:text-gold-highlight"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="font-sans text-xs text-mutedGrey/70">
                Live URL configurable in projects.json
              </span>
            )}

            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs text-warmWhite/85 hover:text-gold-highlight"
              >
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <Link
            href={project.caseStudyUrl}
            onClick={onClose}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-xs sm:text-sm font-medium transition-all duration-300',
              isCyan
                ? 'border-cyan/75 bg-cyan/15 text-cyan hover:bg-cyan/25'
                : 'border-gold-highlight/80 bg-gold/15 text-gold-highlight hover:bg-gold/25'
            )}
          >
            <span>Read Full Case Study</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
