import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectListPage } from './pages/ProjectListPage'
import { TaskListPage } from './pages/TaskListPage'
import { DashboardOverviewPage } from './pages/DashboardOverviewPage'
import { AIInsightsPage } from './pages/AIInsightsPage'

const views = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'projects', label: 'Projects' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'ai', label: 'AI Insights' },
] as const

type ViewKey = (typeof views)[number]['key']

function App() {
  const [view, setView] = useState<ViewKey>('dashboard')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/95 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl font-semibold text-indigo-400">
              P
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Project Pulse</p>
              <p className="text-base font-semibold text-white">Project Update Dashboard</p>
            </div>
          </div>

          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
            {views.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setView(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  view === item.key
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'border border-slate-800/70 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35 }}
        >
          {view === 'dashboard' ? (
            <DashboardOverviewPage />
          ) : view === 'projects' ? (
            <ProjectListPage />
          ) : view === 'tasks' ? (
            <TaskListPage />
          ) : (
            <AIInsightsPage />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
