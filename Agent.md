# AHMED SA’ED — Portfolio Website
## Master Design & Implementation Brief

You are a senior creative frontend engineer, software architect, and digital experience designer.

Your task is to design and implement a premium, production-quality personal portfolio for **AHMED SA’ED**, a React Native Developer and Full-Stack Engineer.

This portfolio has two equally important business objectives:

1. Help Ahmed secure stronger software engineering opportunities, including international and remote positions.
2. Generate qualified freelance opportunities by demonstrating his ability to build polished, reliable digital products.

The result must feel like a carefully art-directed digital experience, not a template portfolio.

---

# 1. Brand identity

**Brand:** AHMED SA’ED  
**Logo:** Custom AS monogram  
**Primary positioning:** Engineering ideas into experiences.  
**Hero headline:**

"I BUILD DIGITAL PRODUCTS THAT MOVE IDEAS FORWARD."

**Professional title:**
React Native Developer · Full-Stack Engineer · Problem Solver

### Brand personality

- Sophisticated
- Confident
- Technical
- Creative
- Precise
- Ambitious
- Personal without being overly casual

The design should combine luxury editorial aesthetics with experimental digital engineering.

Avoid generic developer aesthetics, excessive gradients, random floating icons, and repetitive glassmorphism cards.

# 2. Visual design system

### Color palette

| Token | Color | Usage |
|---|---|---|
| Obsidian | #08090B | Main background |
| Graphite | #14171A | Cards and surfaces |
| Elevated | #1C2024 | Interactive surfaces |
| Champagne Gold | #C4A45A | Primary brand accent |
| Gold Highlight | #E5BE78 | Important emphasis |
| Electric Cyan | #00D5E8 | Technical and interactive accent |
| Warm White | #F2F0E9 | Main text |
| Muted Grey | #92949B | Secondary text |
| Border | #30343A | Dividers and borders |

Gold is the primary identity color. Cyan is used selectively to communicate technology and interactivity.

Do not use both accents equally everywhere.

### Typography

- Space Grotesk: headlines, branding, and prominent navigation.
- Inter: body copy, UI labels, and descriptions.
- Cormorant Garamond: occasional editorial emphasis.

Use responsive typography with CSS clamp().

### Layout

- Maximum content width: approximately 1440px.
- Desktop gutters: 64px.
- Tablet gutters: 32px.
- Mobile gutters: 20px.
- Desktop grid: 12 columns.
- Tablet grid: 8 columns.
- Mobile grid: 4 columns.

Use generous whitespace, strong visual hierarchy, and asymmetric compositions.

# 3. Personal portrait

Use the actual photograph supplied by Ahmed as the portrait reference.

The same person must remain recognizable. Do not replace him with an unrelated generated person or substantially alter his facial identity.

### Portrait placement

- Hero: large cinematic portrait on the right.
- About: more natural, editorial portrait treatment.
- Contact: optional subtle portrait detail if it improves the composition.

The hero can use artistic lighting, background removal, contrast adjustment, and cinematic color grading.

Do not repeat the same large portrait in every section. Give each appearance a different visual purpose.

Keep the original uploaded photograph available as the source asset. Do not assume its filename or invent an asset path; identify it in the provided project assets.

# 4. Navigation and logo

Create a premium navigation system featuring:

- AS monogram in champagne gold.
- AHMED SA’ED wordmark.
- Home
- About
- Work
- Skills
- Contact
- Let's Talk CTA

The logo must be a consistent brand asset, not a generic text abbreviation.

Use a sticky or intelligently transitioning navigation bar. Maintain strong visibility over both dark and visually complex sections.

On mobile, use a compact navigation menu with accessible controls.

# 5. Loader experience

The loading screen must use the AS monogram itself as the loading indicator.

### Concept

1. Display the AS logo in a subtle outlined or dimmed state.
2. Progressively fill the logo with champagne gold.
3. Add a subtle glow when the fill completes.
4. Transition into the hero with a cinematic mask or reveal.

The logo fill must reflect meaningful loading progress rather than being a decorative animation pretending to track loading.

Implementation guidance:

- Use real asset-loading events where practical.
- Track essential initialization milestones.
- Never wait indefinitely for optional assets or third-party scripts.
- Set a sensible maximum loading duration.
- Avoid artificial delays when the page is ready.
- Provide a reduced-motion alternative.
- Do not prevent access to essential content if an optional animation fails.

# 6. Homepage structure

Build the homepage in this order:

1. Loader
2. Hero
3. About
4. Capabilities
5. Selected Work
6. Engineering
7. Beyond the Code
8. Contact
9. Footer

Each section must feel like part of the same brand, but must have its own visual personality.

---

# 7. Hero section

This is the most important first impression.

Use the approved cinematic hero direction:

- Dark obsidian background.
- Ahmed's portrait on the right.
- Large editorial headline on the left.
- Gold and cyan cinematic lighting.
- Metallic orbital elements or carefully designed 3D forms.
- Subtle environmental depth and particles.
- Clear navigation.
- Vertical section progress indicator on desktop.
- Social links.
- Scroll cue.

### Content

Eyebrow:
ENGINEERING IDEAS INTO EXPERIENCES.

Headline:
I BUILD DIGITAL PRODUCTS THAT MOVE IDEAS FORWARD.

Professional title:
React Native Developer · Full-Stack Engineer · Problem Solver

Primary CTA:
Explore My Work

Secondary CTA:
Let's Build Together

The original headline must remain the dominant message. Do not replace it with a new headline.

### Composition

Desktop:
- Left: eyebrow, headline, role, CTAs.
- Right: portrait and cinematic visual environment.
- Keep the headline readable and avoid collisions with the portrait.
- Maintain strong negative space.

Mobile:
- Recompose the layout rather than simply scaling down desktop.
- Keep the headline readable.
- Position the portrait below or behind the content with sufficient contrast.
- Stack or appropriately resize the CTAs.
- Remove or simplify decorative 3D effects.
- Do not let the portrait obscure essential text.

The hero should feel cinematic without sacrificing performance or usability.

---

# 8. About section — Beyond the code

Section label:
02 / THE PERSON

Headline:
Beyond the code.

Purpose:
Introduce Ahmed as the person and engineer behind the work.

Use:
- Editorial typography.
- A natural portrait treatment.
- Short personal introduction.
- Three guiding principles.

Suggested principles:
- Curiosity
- Craft
- Ownership

Suggested introductory copy:

"I'm a software engineer driven by curiosity, problem-solving, and the craft of building digital products that feel as good as they work."

This copy can be refined later.

Do not invent career achievements, company names, awards, or personal statistics.

### Interaction

- Subtle masked portrait reveal.
- Staggered text entrance.
- Principles revealed progressively.
- Keep the interaction restrained.

The section should feel human and personal, providing contrast to the cinematic hero.

---

# 9. Capabilities section

Section label:
03 / CAPABILITIES

Headline:
From interface to architecture.

Organize the capabilities into three main areas.

### 01 — Frontend Engineering

Technologies and areas to accommodate:
- React
- TypeScript
- Next.js
- UI architecture
- Performance optimization
- Accessibility

### 02 — Mobile Development

- React Native
- Expo
- Navigation
- State management
- Native integrations
- Mobile performance

### 03 — Backend & Systems

- Node.js
- APIs
- Databases
- Authentication
- System design

These are editable content groups, not claims of equal proficiency in every technology.

### Design

Use structured technical panels with:
- Clear titles.
- Short descriptions.
- Relevant technologies.
- Subtle icons.
- Gold and cyan accent details.

### Interaction

Panels can expand to reveal:
- More detailed capabilities.
- Practical use cases.
- Related projects.

Do not display arbitrary skill percentages or fake proficiency meters.

---

# 10. Selected Work section

Section label:
04 / SELECTED WORK

Headline:
Selected work.

This section must demonstrate actual engineering ability and help convert visitors into opportunities.

Use a hybrid project gallery:

- One prominent featured project.
- Smaller supporting project cards.
- Varied image proportions.
- Editorial typography.
- Real product screenshots when available.
- Clear case-study navigation.

### Temporary project content

Ahmed does not currently have the application data and screenshots ready.

Therefore, implement three clearly identifiable placeholders:

- Project 01
- Project 02
- Project 03

Use neutral visual mockups or designed placeholder artwork.

Never present fictional applications as completed real projects.

Do not invent:
- Client names.
- Company logos.
- Business outcomes.
- User counts.
- Revenue figures.
- Performance improvements.
- Project descriptions presented as facts.

### Project data structure

Make the gallery data-driven.

Each project should support:

- ID
- Project name
- Short description
- Long description
- Cover image
- Gallery images
- Technologies
- Role
- Problem
- Solution
- Engineering decisions
- Challenges
- Outcome
- Live URL
- Repository URL
- Confidentiality status

Optional fields should be allowed to remain empty.

### Case studies

Create a reusable case-study layout that answers:

1. What problem did the product solve?
2. What was Ahmed's role?
3. What technical decisions were made?
4. What challenges were encountered?
5. What was the result?

Do not display empty sections or fabricated content.

The structure must allow real information to be added later without redesigning the site.

---

# 11. Engineering section

Section label:
05 / ENGINEERING MINDSET

Headline:
Good software is intentional.

This section communicates how Ahmed approaches software engineering.

Create a visual architecture map with three layers:

### Presentation layer
Web · Mobile · User Experience

### Application layer
Business Logic · State · Validation

### Data & Infrastructure
APIs · Persistence · External Services

Add four engineering principles:

- Performance
- Reliability
- Maintainability
- Collaboration

### Interaction

On desktop, allow users to select an architecture layer and reveal:
- A short explanation.
- Relevant technologies.
- A related project, when available.

On mobile, use a simplified vertical architecture flow.

Do not imply that the conceptual diagram represents a real production system unless an actual project supports it.

---

# 12. Beyond the Code section

This section adds personality and makes the portfolio memorable.

Use a restrained editorial layout to communicate interests and perspectives beyond software engineering.

Possible themes:
- Continuous learning.
- Problem-solving.
- Creativity.
- Personal development.

Keep the content authentic and editable.

Do not invent hobbies, personal stories, or achievements.

This section should not distract from the professional purpose of the website.

---

# 13. Contact section

Section label:
06 / LET'S CONNECT

Headline:
Have an idea worth building?

The contact experience must serve two audiences equally.

### Path A — Recruitment

Provide:
- Download CV.
- Email contact.
- LinkedIn profile.
- GitHub profile.

### Path B — Freelance projects

Provide a contact form with:
- Name.
- Email.
- Project type.
- Budget range (optional).
- Message.

Use clear validation, accessible error messages, loading states, success states, and spam protection.

Do not invent social profile URLs or contact details. Keep them configurable.

If backend email delivery is not configured, make the form explicitly show that configuration is needed rather than pretending a message was sent.

---

# 14. Footer

Include:
- AS monogram.
- AHMED SA’ED.
- Short brand statement.
- Navigation links.
- Social links.
- Email.
- Copyright year generated dynamically.

Keep it minimal and elegant.

# 15. Motion and interaction system

Use animation to support the experience, not overwhelm it.

Recommended:
- GSAP
- ScrollTrigger
- CSS transitions
- Three.js / React Three Fiber only where it adds real value

Animation direction:

| Section | Animation |
|---|---|
| Loader | AS monogram fills with gold |
| Hero | Cinematic reveal and subtle environmental motion |
| About | Portrait mask and staggered typography |
| Capabilities | Expandable panels |
| Work | Image reveals and hover details |
| Engineering | Architecture connections draw progressively |
| Contact | Subtle transition and form feedback |

Technical rules:
- Respect prefers-reduced-motion.
- Clean up animation timelines and event listeners.
- Avoid scroll hijacking.
- Avoid excessive parallax.
- Do not animate every element.
- Keep interactions responsive to input.
- Disable or simplify expensive effects on mobile.

# 16. Recommended technical architecture

First inspect the existing repository.

Do not blindly replace the existing stack or project structure.

If starting from scratch, prefer:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP / ScrollTrigger
- Three.js or React Three Fiber only when justified
- Zod for validation
- Resend or another configurable email provider
- Vercel deployment

### Architecture principles

- Server components by default.
- Client components only for interactive functionality.
- Reusable design-system components.
- Data-driven projects and capabilities.
- Clear separation of content and presentation.
- Centralized theme tokens.
- Lazy-load heavy assets.
- Use semantic HTML.
- Keep the project maintainable.

Suggested structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css
  api/
    contact/
      route.ts

components/
  layout/
    Header.tsx
    Footer.tsx
    Navigation.tsx

  sections/
    Loader.tsx
    HeroSection.tsx
    AboutSection.tsx
    CapabilitiesSection.tsx
    WorkSection.tsx
    EngineeringSection.tsx
    BeyondCodeSection.tsx
    ContactSection.tsx

  project/
    ProjectCard.tsx
    ProjectCaseStudy.tsx
    ProjectGallery.tsx

  engineering/
    ArchitectureMap.tsx
    ArchitectureNode.tsx

  ui/
    Button.tsx
    SectionHeading.tsx
    Reveal.tsx
    Monogram.tsx

data/
  projects.ts
  capabilities.ts
  engineering.ts
  navigation.ts

lib/
  validation.ts
  email.ts

public/
  images/
  icons/
  fonts/
```

Adapt the structure if the existing repository already has a better organization.

# 17. Performance and accessibility

The portfolio must look premium and still perform well.

Requirements:
- Responsive layouts.
- Optimized images and modern formats.
- Explicit image dimensions or aspect ratios.
- Lazy loading for below-the-fold media.
- Lazy loading for 3D scenes.
- Avoid unnecessary client-side JavaScript.
- Keyboard-accessible navigation.
- Visible focus states.
- Proper heading hierarchy.
- Sufficient color contrast.
- Accessible form labels and errors.
- Reduced-motion support.
- No horizontal overflow on mobile.

Do not sacrifice the website's performance for decorative effects.

# 18. Implementation workflow

Work in deliberate stages.

### Phase 1 — Repository audit

Inspect:
- Existing framework and dependencies.
- Existing assets.
- Existing components.
- Current styling system.
- Existing functionality.

Report the current state before making architectural changes.

### Phase 2 — Design foundation

Implement:
- Design tokens.
- Typography.
- Global layout.
- Buttons.
- Navigation.
- AS monogram.
- Responsive foundations.

### Phase 3 — First impression

Implement:
- Loader.
- Hero.
- Actual supplied portrait.
- Responsive hero composition.

Validate the result on desktop and mobile.

### Phase 4 — Main content

Implement:
- About.
- Capabilities.
- Selected Work.
- Engineering.
- Beyond the Code.

### Phase 5 — Conversion

Implement:
- Contact.
- Recruitment path.
- Freelance inquiry path.
- Footer.

### Phase 6 — Polish

Test:
- Responsive behavior.
- Animations.
- Reduced motion.
- Performance.
- Accessibility.
- Broken links.
- Form validation.
- Loading and error states.

Do not claim completion if any critical functionality is still a placeholder.

# 19. Quality bar

The final portfolio should feel like a premium digital experience created by a strong creative engineering team.

Prioritize these qualities:

1. Distinctive art direction.
2. Excellent typography and composition.
3. Strong personal branding.
4. Authentic portrait integration.
5. Clear professional positioning.
6. Convincing project presentation.
7. High-quality responsive behavior.
8. Meaningful interactions.
9. Clean, maintainable implementation.
10. Real lead-generation functionality.

The site must not become a collection of visual effects with weak content.

**The guiding principle:**

Build a portfolio that makes people remember the person, trust the engineer, and want to start a conversation.

Start by auditing the repository, then implement the experience in stages. Do not fabricate missing project information. Keep all temporary content easy to replace.

# 20. Mandatory Technology Stack & Engineering Standards

You must follow these architectural standards throughout the project.

## A. Technology stack

Unless the repository audit reveals a strong reason to preserve an existing stack, use:

| Technology | Responsibility |
|---|---|
| Next.js (App Router) | Application framework and routing |
| React | Component-based UI |
| TypeScript | Strict type safety |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | Advanced animations and scroll interactions |
| Framer Motion (optional) | Lightweight UI transitions where GSAP is unnecessary |
| Three.js / React Three Fiber | Selective 3D experiences |
| Zod | Runtime validation and schemas |
| React Hook Form | Contact form state and validation |
| Resend | Contact form email delivery |
| Lucide React | Consistent icon system |
| Vercel | Deployment |

Do not introduce a library simply because it is popular.

Every dependency must have a clear purpose. Avoid overlapping animation libraries and unnecessary packages.

Use stable, mutually compatible versions and document the selected versions.

## B. Non-negotiable code quality rules

**1. Component-based architecture**

- Every major homepage section must be its own component.
- Extract repeated UI patterns into reusable components.
- Components must have a clear, single responsibility.
- Avoid monolithic components.
- Do not place the entire homepage implementation inside `page.tsx`.
- Keep business logic separate from visual presentation.
- Keep components small enough to understand and maintain.

**2. Reusability**

Create shared components for repeated patterns, including:

- Buttons
- Section headings
- Navigation links
- Project cards
- Technology badges
- Reveal animations
- Image containers
- Modal/dialog elements
- Form fields
- Loading indicators
- Interactive architecture nodes

Do not duplicate the same markup and styling across multiple sections.

Use configurable props and composition rather than creating slightly different copies of the same component.

**3. Separation of concerns**

Keep these responsibilities separate:

- UI components
- Page composition
- Content and configuration
- Animation logic
- Validation
- API communication
- Shared utilities
- Type definitions

Do not mix contact form API logic with presentation components.

Do not hardcode project information directly inside project card components.

**4. TypeScript discipline**

- Enable strict TypeScript.
- Avoid `any`.
- Define explicit interfaces or types for reusable component props.
- Define typed project and capability data models.
- Avoid unnecessary type assertions.
- Handle optional and nullable values correctly.

**5. Styling discipline**

- Centralize design tokens.
- Reuse colors, typography, spacing, and responsive breakpoints.
- Avoid scattered hardcoded color values.
- Avoid arbitrary CSS overrides.
- Avoid global styles that unintentionally affect unrelated components.
- Keep responsive styling consistent.

**6. Animation architecture**

- Reusable animation utilities where appropriate.
- Clean up GSAP timelines and ScrollTriggers.
- Avoid duplicated animation logic.
- Respect reduced-motion preferences.
- Never allow animation code to break the underlying content.
- Lazy-load expensive visual experiences.

## C. Recommended project architecture

Adapt this structure intelligently, but preserve its separation of responsibilities.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── contact/
│           └── route.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── sections/
│   │   ├── LoaderSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── EngineeringSection.tsx
│   │   ├── BeyondCodeSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Container.tsx
│   │   ├── Reveal.tsx
│   │   ├── Monogram.tsx
│   │   └── Badge.tsx
│   │
│   ├── project/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGallery.tsx
│   │   └── ProjectCaseStudy.tsx
│   │
│   └── engineering/
│       ├── ArchitectureMap.tsx
│       └── ArchitectureNode.tsx
│
├── hooks/
│   └── useReducedMotion.ts
│
├── data/
│   ├── projects.ts
│   ├── capabilities.ts
│   ├── navigation.ts
│   └── engineering.ts
│
├── lib/
│   ├── validation.ts
│   ├── email.ts
│   └── utils.ts
│
├── types/
│   ├── project.ts
│   └── common.ts
│
└── styles/
    └── tokens.css
```

Do not create unnecessary files or abstractions just to match the folder tree. Keep the architecture clean and proportionate.

## D. Architecture enforcement

Before implementing each major phase:

1. Identify which components are reusable.
2. Define their responsibilities and interfaces.
3. Identify the data models required.
4. Determine which components need client-side interactivity.
5. Keep server components as the default.
6. Implement the section using the established design system.

After each phase:

- Review the component structure.
- Identify duplicated code.
- Refactor repeated patterns.
- Check TypeScript errors.
- Check responsive behavior.
- Verify that existing functionality still works.

Do not leave temporary hacks or duplicated components for later cleanup.

## E. Code review checklist

Before considering the project complete, verify:

- [ ] No giant monolithic page component.
- [ ] Every major section is independently maintainable.
- [ ] Shared UI is implemented through reusable components.
- [ ] Content is separated from presentation.
- [ ] Project cards are data-driven.
- [ ] TypeScript strict mode is enabled.
- [ ] No unnecessary `any` types.
- [ ] No duplicated animation logic.
- [ ] No unnecessary dependencies.
- [ ] Server/client boundaries are intentional.
- [ ] Responsive behavior is verified.
- [ ] Accessibility requirements are met.
- [ ] Production build succeeds.
- [ ] No console errors or broken interactions.

**Important:** A visually impressive website with messy, duplicated, unmaintainable code is not an acceptable result.

Treat code quality, architecture, maintainability, and visual quality as equally important deliverables.