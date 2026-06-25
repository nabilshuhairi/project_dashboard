# Project Pulse Dashboard

A polished project and task management dashboard built with React, TypeScript, Tailwind CSS, and Vite.

This app offers a modern workspace for tracking projects, managing tasks, visualizing progress, and generating AI-style insights with local persistence.

## What this system does

- Tracks projects and tasks in a centralized dashboard.
- Filters, sorts, and searches task data in real time.
- Shows KPI cards for total tasks, completed tasks, at-risk tasks, overdue tasks, and overall progress.
- Visualizes task status distribution and completion trends with charts.
- Supports project and task CRUD flows with modal forms.
- Generates AI-inspired insights from task and project data.
- Persists all state in browser storage for continued sessions.

## Main Pages

- **Dashboard Overview** (`src/pages/DashboardOverviewPage.tsx`)
  - Displays KPI cards, `FilterControls`, and charts for task analytics.
  - Provides status filtering, search, and sorting.
- **Project Management** (`src/pages/ProjectListPage.tsx`)
  - Offers add / edit / delete project workflows.
  - Uses `ProjectForm`, `ProjectCard`, and confirmation modals.
- **Task Management** (`src/pages/TaskListPage.tsx`)
  - Handles task creation, updates, and deletions.
  - Assigns tasks to projects and tracks progress/status.
- **AI Insights** (`src/pages/AIInsightsPage.tsx`)
  - Displays AI-generated summaries, risk analysis, next actions, and weekly updates.
  - Uses mock AI responses with optional OpenAI integration.

## Key Features

- Task and project CRUD management
- Persistent state using `localStorage`
- Form validation using `react-hook-form` and `zod`
- Responsive layout with desktop sidebar and mobile navigation
- Recharts visualizations for progress and status data
- Animated page transitions using Framer Motion
- Reusable modal and notification UI patterns

## Technology Stack

- React 19
- TypeScript 6
- Vite 5
- Tailwind CSS
- Zustand for global state management
- Recharts for charts and data visualizations
- Framer Motion for page transitions
- React Hook Form + Zod for form state and validation
- ESLint for code quality

## Architecture Overview

### State and persistence

- `src/store/dashboardStore.ts`
  - Zustand store for `projects` and `tasks`.
  - Provides add, update, remove, and clear actions.
  - Persists state under `project-dashboard-state` in `localStorage`.

### Data models and validation

- `src/types/project.ts`
  - Defines project data shape.
- `src/types/task.ts`
  - Defines task fields and status types.
- `src/validation/dashboardSchemas.ts`
  - Defines Zod schemas for project and task form validation.

### UI components

- `src/components/ui/FilterControls.tsx` — Status / search / sort filters
- `src/components/ui/KpiCard.tsx` — Metric cards
- `src/components/ui/ProgressBarChart.tsx` — Progress chart
- `src/components/ui/StatusPieChart.tsx` — Status distribution chart
- `src/components/ui/CompletionTrendChart.tsx` — Trend chart
- `src/components/ui/Modal.tsx` — Shared modal dialog
- `src/components/ui/Notification.tsx` — Toast notifications

### Feature components

- `src/components/project/ProjectForm.tsx`
- `src/components/project/ProjectCard.tsx`
- `src/components/task/TaskForm.tsx`
- `src/components/task/TaskCard.tsx`
- `src/components/task/TaskTable.tsx`

### Utilities

- `src/utils/storage.ts` — Storage helpers for JSON load/save/remove
- `src/utils/identity.ts` — ID generation and timestamp helpers

## Design and User Experience

- Dark dashboard aesthetic with polished cards and subtle shadows
- Consistent visual hierarchy across KPI, table, chart, and insight sections
- Centered content and spacing for clean layouts
- Distinct UI states for active filters, focused inputs, and modal dialogs
- Cohesive card styling across pages for clarity and visual consistency

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Notes

- AI insights use mock content by default, with optional OpenAI API key support via `VITE_OPENAI_API_KEY`.
- Data is stored locally and reloaded automatically after browser refresh.
- This repository is built for rapid UI iteration and task-driven project tracking.
