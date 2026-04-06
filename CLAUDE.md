# Origin CRM & Content Dashboard - Tech Stack & Conventions

This document outlines the core architecture, technology stack, folder structure, and component conventions for the Origin Content Dashboard and CRM.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Mode by default)
- **UI Components:** shadcn/ui & Lucide React icons
- **State Management:** React Hooks (Context API if needed later)
- **Data Fetching/Mocking:** Mock data structures (arrays/objects) simulating real responses until DB is integrated.

## Project Structure
```
origin-crm/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (dashboard)/    # Dashboard layout group
│   │   │   ├── instagram/  # Instagram Manager
│   │   │   ├── analytics/  # Analytics 
│   │   │   ├── calendar/   # Content Calendar
│   │   │   ├── competitors/# Competitor Tracker
│   │   │   └── news/       # News Consolidator
│   │   ├── layout.tsx      # Global layout (Dark Mode)
│   │   └── page.tsx        # Main entry (Redirects or Summary)
│   ├── components/
│   │   ├── ui/             # shadcn/ui generic components
│   │   ├── shared/         # Shared app components (Sidebar, Topbar)
│   │   └── features/       # Feature-specific components
│   ├── lib/
│   │   ├── utils.ts        # Utility functions (cn class merging)
│   │   └── mock-data/      # Mock data for UI development
│   └── styles/
│       └── globals.css     # Global CSS and Tailwind directives
```

## Component Conventions
- **Functional Components:** Use React Functional Components with `React.FC` or just typed props.
- **Server vs Client:** Default to server components. Add `"use client"` only for components with state/effects.
- **Styling:** Use Tailwind utility classes directly in `className`. For dynamic classes, use the `cn` utility from `lib/utils`.
- **UI First:** We prioritize a functional, beautiful dark UI using shadcn components to ensure a premium look.

## Core App Features
1. **Instagram & Origin Entry System:** Register leads, analyze accounts via simulated data (VLAD equivalent), and present AI-generated conclusions.
2. **Analytics Dashboard:** Graphical representation of content performance.
3. **Content Calendar:** Visual posting logic.
4. **Competitor Tracker:** Monitoring direct/indirect niche competitors.
5. **News Consolidator:** Niche RSS feed visualization.

All modules focus on high utility and functional layout mapping exactly to the Origin operating system needs.
