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
  { key: 'ai', label: 'AI Insights', accent: true },
] as const

type ViewKey = (typeof views)[number]['key']

function App() {
  const [view, setView] = useState<ViewKey>('dashboard')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,_1fr)] lg:px-8">
        <aside className="hidden rounded-[2rem] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl lg:block">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/15 text-xl font-semibold text-indigo-300">
                P
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Project Pulse</p>
                <h1 className="mt-2 text-2xl font-semibold text-white">Dashboard</h1>
              </div>
            </div>

            <nav aria-label="Sidebar" className="space-y-2">
              {views.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setView(item.key)}
                  className={`flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    view === item.key
                      ? 'bg-indigo-500/15 text-white shadow-inner shadow-indigo-500/10'
                      : 'border border-slate-800/70 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <span>{item.label}</span>
                  {'accent' in item && item.accent ? <span className="rounded-full bg-indigo-500 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white">New</span> : null}
                </button>
              ))}
            </nav>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-400 shadow-inner shadow-slate-950/10">
              <p className="font-semibold text-slate-100">Quick actions</p>
              <p className="mt-3 leading-6">
                Jump between analytics, project planning, task management, and AI-generated updates with a single click.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="lg:hidden rounded-[2rem] border border-white/10 bg-slate-900/85 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-indigo-300">Project Pulse</p>
                <h1 className="text-lg font-semibold text-white">Dashboard</h1>
              </div>
              <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white">AI</span>
            </div>
            <nav aria-label="Mobile navigation" className="mt-4 flex flex-wrap gap-2">
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
      </div>
    </div>
  )
}

export default App
