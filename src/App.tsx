import { useState } from 'react'
import { ProjectListPage } from './pages/ProjectListPage'
import { TaskListPage } from './pages/TaskListPage'
import { DashboardOverviewPage } from './pages/DashboardOverviewPage'

function App() {
  const [view, setView] = useState<'projects' | 'tasks' | 'dashboard'>('dashboard')

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white p-4 shadow-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-start gap-3">
          <button
            onClick={() => setView('dashboard')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'dashboard' ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('projects')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'projects' ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setView('tasks')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'tasks' ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-900'}`}
          >
            Tasks
          </button>
        </nav>
      </header>

      <main>
        {view === 'dashboard' ? <DashboardOverviewPage /> : view === 'projects' ? <ProjectListPage /> : <TaskListPage />}
      </main>
    </div>
  )
}

export default App
