# Project Pulse Dashboard

Project Pulse Dashboard is a production-style project and task management application created with Vite, React, TypeScript, Tailwind CSS, and Zustand.

It delivers a streamlined workspace for tracking projects, managing task workflows, visualizing progress, and generating AI-style insights with local persistence and responsive UI behavior.

## System Functionality

- Centralized project and task management with create, edit, and delete operations
- Task filtering by status, search, and sorting across the dashboard
- KPI summaries for total tasks, completed tasks, at-risk tasks, overdue tasks, and overall progress
- Recharts-based visualizations showing status distribution, progress composition, and completion trends
- Responsive sidebar navigation with desktop and mobile layouts
- Modal-driven forms for task/project creation and editing
- AI Insights page with generated summaries and mock AI output
- Persistent local storage so state survives refreshes and browser reloads

## Core Pages

- **Dashboard Overview** (`src/pages/DashboardOverviewPage.tsx`)
  - Displays KPI cards, filter controls, and analytics charts.
  - Implements task search, status filtering, and sorting by due date or progress.
- **Project Management** (`src/pages/ProjectListPage.tsx`)
  - Handles adding, editing, and deleting projects using a reusable modal form.
  - Renders project cards with edit/delete actions.
- **Task Management** (`src/pages/TaskListPage.tsx`)
  - Handles task entry, editing, deletion, and project assignment.
  - Uses table and card layouts for managing tasks.
- **AI Insights** (`src/pages/AIInsightsPage.tsx`)
  - Generates AI-style summaries, risks, next actions, and weekly updates.
  - Uses mock data with optional placeholder support for OpenAI integration.

## Technology Stack

- React 19
- TypeScript 6
- Vite 5
- Tailwind CSS
- Zustand for application state
- Recharts for charts
- Framer Motion for animated transitions
- React Hook Form + Zod for form handling and validation
- ESLint for linting and code quality

## Architecture Overview

### App shell

- `src/App.tsx`
  - Main application shell with view switching between pages.
  - Includes a persistent desktop sidebar and mobile navigation.
  - Uses Framer Motion for animated transitions between views.

### State management

- `src/store/dashboardStore.ts`
  - Zustand store for global `projects` and `tasks` state.
  - Supports CRUD actions and local persistence through `localStorage`.

### Data models and validation

- `src/types/project.ts`
  - Project model definition.
- `src/types/task.ts`
  - Task model definition, including status and progress fields.
- `src/validation/dashboardSchemas.ts`
  - Zod schemas for project and task form validation.

### Reusable UI components

- `src/components/ui/FilterControls.tsx` — Dashboard filter input controls
- `src/components/ui/KpiCard.tsx` — Summary metric cards
- `src/components/ui/ProgressBarChart.tsx` — Progress composition chart
- `src/components/ui/StatusPieChart.tsx` — Status distribution pie chart
- `src/components/ui/CompletionTrendChart.tsx` — Completion trend chart
- `src/components/ui/Modal.tsx` — Shared modal dialog wrapper
- `src/components/ui/Notification.tsx` — Feedback notifications

### Feature components

- `src/components/project/ProjectForm.tsx`
- `src/components/project/ProjectCard.tsx`
- `src/components/task/TaskForm.tsx`
- `src/components/task/TaskCard.tsx`
- `src/components/task/TaskTable.tsx`

### Utility helpers

- `src/utils/storage.ts` — JSON storage helpers for LocalStorage
- `src/utils/identity.ts` — ID and timestamp generation utilities

## Design and UX

- Modern dashboard aesthetic with clean cards, elevated surfaces, and subtle shadows
- Responsive layout that adapts between desktop sidebar and mobile nav
- Clear interactive states for input focus, dropdowns, modals, and buttons
- Balanced spacing and typography for readability and hierarchy
- Unified color usage across cards, charts, and forms to maintain consistency

## Setup and development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Notes

- AI Insights currently generate mock data unless `VITE_OPENAI_API_KEY` is configured.
- Application state persists through the browser using `localStorage`.
- This README now reflects the actual system architecture, styling, and functionality instead of starter Vite documentation.
