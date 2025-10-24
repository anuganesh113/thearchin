# Admin Dashboard Redesign (React + Tailwind)

This document outlines key design decisions, UX principles, and improvements over the legacy admin.

## Design System
- Color: primary indigo scale, neutral slate grays; dark mode supported.
- Typography: system stack for performance and consistency.
- Spacing: 4px base scale; generous whitespace for scanability.
- Components: Button, Card, Table, Modal designed for accessibility and responsiveness.

## Accessibility
- Color contrast meets WCAG AA; focus states visible with ring.
- Keyboard friendly: buttons/links use visible focus, modals trap focus (lightweight impl).
- Semantics: sections labeled via headings and ARIA roles where applicable.

## Information Architecture
- Sidebar navigation with clear grouping; breadcrumbs via URL path.
- Topbar hosts theme toggle and session actions.
- Content uses cards for separation and quick scanning.

## Performance
- Route-based code splitting via React.lazy + Suspense.
- React Query caching and background fetching.
- SWC React plugin for faster HMR.

## State & Data
- React Query for server state.
- Zustand for UI/app state (theme).
- Mock API with localStorage persistence.

## Testing
- Vitest + RTL for components; jsdom environment.

## Responsiveness
- Mobile-first: collapsible sidebar, fluid grids, overflow handling on tables.

## Differences vs Original
- Modern visual language, consistent spacing, dark mode.
- Clear feedback, loading states, and error handling.
- Streamlined navigation and page structure.
