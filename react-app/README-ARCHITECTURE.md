# Archin React App — Design & UX Notes

## Goals
- Preserve the original site content and flows while delivering a modern, accessible, responsive UI.
- Improve information architecture with clear navigation and page structure.

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 (no custom config; theme extended via CSS @theme)
- React Router (code-split, lazy routes)
- Zustand (lightweight UI state; mobile menu)
- Testing: Vitest + Testing Library (tests excluded from build)

## Key UX Improvements
- Accessible navigation with keyboard focus styles, skip link, mobile menu.
- Clear hierarchy, generous spacing, brand palette (warm neutral browns) and serif display.
- Responsive layout with container utility and fluid grid.
- Loading states via Suspense fallbacks; error boundary for resilience.

## Structure
- `src/routes/AppShell.tsx`: Layout, header, footer, and route definitions.
- `src/screens/*`: Route components (Home, Apartments, Location, Gallery, Blog).
- `src/store/ui.ts`: UI state (mobile menu open/close).
- `src/index.css`: Tailwind base + custom theme tokens and utilities.

## Accessibility
- WCAG-focused: Skip to content, semantic landmarks, focus-visible, color contrast.

## Performance
- Lazy loaded route screens, CSS via Tailwind JIT, asset reuse from `public/`.

## Next
- Add real gallery images, connect blog data, and integrate a map provider.
