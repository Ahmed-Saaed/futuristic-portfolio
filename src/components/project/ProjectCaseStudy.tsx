import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ExternalLink, GitBranch, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { ProjectItem } from '@/types/project';

export interface ProjectCaseStudyProps {
  project: ProjectItem;
}

/**
 * Reusable Dedicated Case-Study Layout answering:
 * 1. What problem did the product solve?
 * 2. What was Ahmed's role?
 * 3. What technical decisions were made?
 * 4. What challenges were encountered?
 * 5. What was the result?
 * Clearly marks placeholder entries and never fabricates metrics or client achievements.
 */
export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const isCyan = project.accent === 'cyan';
  const { caseStudyDetails } = project;

  return (
    <article className="relative min-h-screen bg-obsidian pt-28 pb-24 text-warmWhite">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            'absolute right-[12%] top-[10%] h-96 w-96 rounded-full blur-[140px]',
            isCyan ? 'bg-cyan/15' : 'bg-gold/15'
          )}
        />
      </div>

      <Container className="relative z-10 max-w-4xl">
        {/* Back to Selected Work Link */}
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2.5 font-sans text-xs sm:text-sm text-mutedGrey transition-colors hover:text-gold-highlight"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Section 04 — Proof</span>
        </Link>

        {/* Top Badges & Title */}
        <header className="mt-8 border-b border-white/[0.08] pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant={isCyan ? 'cyan' : 'gold'}>
              {project.categoryLabel}
            </Badge>
            {project.status === 'placeholder' && (
              <Badge variant="neutral">
                Placeholder Case Study — Replace via src/data/projects.json or CMS
              </Badge>
            )}
          </div>

          <h1 className="font-serif text-[clamp(2.4rem,4.5vw+0.6rem,4.25rem)] font-semibold leading-[1.04] tracking-tight text-warmWhite">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl font-sans text-base sm:text-lg font-light leading-relaxed text-warmWhite/85">
            {project.description}
          </p>

          {/* Meta Grid: Role, Category, Status & Links */}
          <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.08] bg-[#0D1014]/90 p-6 sm:grid-cols-3">
            <div>
              <span className="block font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-highlight">
                Role & Ownership
              </span>
              <p className="mt-1.5 font-sans text-sm text-warmWhite/90">
                {caseStudyDetails.role}
              </p>
            </div>

            <div>
              <span className="block font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-highlight">
                Primary Stack
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
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

            <div>
              <span className="block font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-highlight">
                Verification & Links
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs text-cyan hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Live Application</span>
                  </a>
                ) : (
                  <span className="font-sans text-xs text-mutedGrey">
                    Live link pending configuration
                  </span>
                )}

                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs text-gold-highlight hover:underline"
                  >
                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Case Study Sections */}
        <div className="mt-12 space-y-12">
          {/* 1. Overview */}
          <section aria-labelledby="cs-overview">
            <h2
              id="cs-overview"
              className="font-display text-xs font-medium uppercase tracking-[0.22em] text-gold-highlight"
            >
              01 // Project Overview
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-warmWhite/85">
              {caseStudyDetails.overview}
            </p>
          </section>

          {/* 2. Problem & Solution Split */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section
              aria-labelledby="cs-problem"
              className="rounded-2xl border border-white/[0.08] bg-[#0D1014]/85 p-6"
            >
              <h2
                id="cs-problem"
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-gold-highlight"
              >
                02 // The Problem
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mutedGrey">
                {caseStudyDetails.problem}
              </p>
            </section>

            <section
              aria-labelledby="cs-solution"
              className="rounded-2xl border border-white/[0.08] bg-[#0D1014]/85 p-6"
            >
              <h2
                id="cs-solution"
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-cyan"
              >
                03 // The Engineering Solution
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mutedGrey">
                {caseStudyDetails.solution}
              </p>
            </section>
          </div>

          {/* 3. Architecture & Technical Decisions */}
          <section aria-labelledby="cs-architecture">
            <div className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 text-gold-highlight" aria-hidden="true" />
              <h2
                id="cs-architecture"
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-gold-highlight"
              >
                04 // Architecture & Engineering Decisions
              </h2>
            </div>

            <ul className="mt-4 space-y-3">
              {caseStudyDetails.architectureDecisions.map((decision) => (
                <li
                  key={decision}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-graphite/50 p-4 font-sans text-sm text-warmWhite/90"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 h-4 w-4 shrink-0',
                      isCyan ? 'text-cyan' : 'text-gold-highlight'
                    )}
                  />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Challenges & Verified Outcome */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section
              aria-labelledby="cs-challenges"
              className="rounded-2xl border border-white/[0.08] bg-[#0D1014]/85 p-6"
            >
              <h2
                id="cs-challenges"
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-gold-highlight"
              >
                05 // Key Challenges
              </h2>
              <ul className="mt-3 space-y-2.5">
                {caseStudyDetails.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="font-sans text-sm leading-relaxed text-mutedGrey"
                  >
                    • {challenge}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="cs-outcome"
              className="rounded-2xl border border-white/[0.08] bg-[#0D1014]/85 p-6"
            >
              <h2
                id="cs-outcome"
                className="font-display text-xs font-medium uppercase tracking-[0.22em] text-gold-highlight"
              >
                06 // Verified Outcome
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mutedGrey">
                {caseStudyDetails.outcome}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
