# Project Pulse Dashboard

A modern project and task management dashboard built with Vite, React, and TypeScript.

This application provides a workspace for tracking projects, tasks, progress metrics, and AI-inspired insights with local persistence and responsive analytics.

## Key Features

- Dashboard overview with KPI cards, filtered task lists, progress charts, status distribution, and completion trends.
- Project management page for creating, editing, and deleting projects.
- Task management page for adding, updating, and assigning tasks to projects.
- AI Insights page with generated summaries, risk highlights, next actions, and weekly updates.
- Persistent storage using `localStorage` so data survives browser refresh.
- Validation using `react-hook-form` and `zod`.
- Responsive UI styled with Tailwind CSS.

## Technology Stack

- React 19
- TypeScript 6
- Vite 5
- Zustand for state management
- Recharts for charts and data visualization
- Framer Motion for animated page transitions
- React Hook Form and Zod for form handling and validation
- Tailwind CSS for styling
- ESLint for code quality

## App Architecture

### Core Pages

- `src/pages/DashboardOverviewPage.tsx`
  - Main analytics view with task filtering, sorting, and KPI computation.
  - Displays charts for progress overview, status distribution, and completion trend.
- `src/pages/ProjectListPage.tsx`
  - Manage project entities with add/edit/delete flows and confirmation modals.
- `src/pages/TaskListPage.tsx`
  - Manage task entities, assign them to projects, and persist them in local state.
- `src/pages/AIInsightsPage.tsx`
  - Generate project insights from task and project data with mock AI output and optional OpenAI hook.

### State Management

- `src/store/dashboardStore.ts`
  - Zustand store for global `projects` and `tasks` state.
  - Supports CRUD actions and persistence via `localStorage`.

### Types and Validation

- `src/types/task.ts` and `src/types/project.ts`
  - Strongly typed project and task models.
- `src/validation/dashboardSchemas.ts`
  - Zod schemas for project and task form validation.

### UI Components

- `src/components/ui/FilterControls.tsx`
  - Filter controls for task status, search, and sorting.
- `src/components/ui/KpiCard.tsx`
  - Compact metric cards for dashboard KPIs.
- `src/components/ui/ProgressBarChart.tsx`
  - Progress bar chart with Recharts and tooltip customization.
- `src/components/ui/StatusPieChart.tsx`
  - Pie chart showing task status distribution.
- `src/components/ui/CompletionTrendChart.tsx`
  - Line chart displaying completed-task trends.
- `src/components/ui/Modal.tsx`
  - Reusable modal dialog component.
- `src/components/ui/Notification.tsx`
  - Toast-style notification component.

### Project Components

- `src/components/project/ProjectForm.tsx`
  - Project create/edit form with validation.
- `src/components/project/ProjectCard.tsx`
  - Project summary card display.
- `src/components/task/TaskForm.tsx`
  - Task form with project assignment, status, progress, and due date.
- `src/components/task/TaskCard.tsx`
  - Task summary card layout.
- `src/components/task/TaskTable.tsx`
  - Table layout for managing tasks.

### Utility Modules

- `src/utils/storage.ts`
  - Helper functions for loading, saving, and removing JSON from storage.
- `src/utils/identity.ts`
  - ID generation and timestamp utilities.

## Design and UX

- Dark and light-aware UI with polished cards, translucent surfaces, and subtle shadows.
- Responsive layout with a desktop sidebar and mobile navigation.
- Clean data visualization and analytics-first dashboard presentation.
- Modal and form interactions optimized for fast task and project management.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Notes

- AI insights currently use offline mock data unless `VITE_OPENAI_API_KEY` is provided.
- Project and task state is persisted under the `project-dashboard-state` localStorage key.
- Charts are implemented using Recharts and styled at the component level.
