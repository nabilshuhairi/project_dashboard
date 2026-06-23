import { useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { FilterControls } from '../components/ui/FilterControls'
import { KpiCard } from '../components/ui/KpiCard'
import { StatusPieChart } from '../components/ui/StatusPieChart'
import { ProgressBarChart } from '../components/ui/ProgressBarChart'
import { CompletionTrendChart } from '../components/ui/CompletionTrendChart'
import type { Task, TaskStatus } from '../types'

function getCompletionProgress(tasks: Task[]) {
  if (tasks.length === 0) {
    return 0
  }

  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0)
  return Math.round(totalProgress / tasks.length)
}

function getStatusDistribution(tasks: Task[]) {
  const distribution: Record<TaskStatus, number> = {
    'Not Started': 0,
    'In Progress': 0,
    'At Risk': 0,
    Completed: 0,
  }

  tasks.forEach((task) => {
    distribution[task.status] += 1
  })

  return Object.entries(distribution).map(([name, value]) => ({ name: name as TaskStatus, value }))
}

function getCompletionTrend(tasks: Task[]) {
  const sorted = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  const trend: Array<{ date: string; completed: number }> = []
  let completed = 0

  sorted.forEach((task) => {
    if (task.status === 'Completed') {
      completed += 1
    }
    const date = new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    const existing = trend.find((entry) => entry.date === date)
    if (existing) {
      existing.completed = completed
    } else {
      trend.push({ date, completed })
    }
  })

  return trend.length ? trend : [{ date: 'No tasks', completed: 0 }]
}

function getProgressOverview(tasks: Task[]) {
  const summary: Record<string, { name: string; progress: number }> = {}

  tasks.forEach((task) => {
    const key = task.status
    if (!summary[key]) {
      summary[key] = { name: key, progress: 0 }
    }
    summary[key].progress += task.progress
  })

  return Object.values(summary).map((entry) => ({
    name: entry.name,
    progress: Math.round(entry.progress / Math.max(1, tasks.filter((task) => task.status === entry.name).length)),
  }))
}

export function DashboardOverviewPage() {
  const tasks = useDashboardStore((state) => state.tasks)

  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'dueDate' | 'progress' | ''>('')

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (statusFilter !== 'All') {
      result = result.filter((task) => task.status === statusFilter)
    }

    if (searchQuery.trim()) {
      result = result.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (sortBy === 'dueDate') {
      result = result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    }

    if (sortBy === 'progress') {
      result = result.sort((a, b) => a.progress - b.progress)
    }

    return result
  }, [tasks, statusFilter, searchQuery, sortBy])

  const totalTasks = filteredTasks.length
  const completedTasks = filteredTasks.filter((task) => task.status === 'Completed').length
  const atRiskTasks = filteredTasks.filter((task) => task.status === 'At Risk').length
  const overdueTasks = filteredTasks.filter((task) => new Date(task.dueDate).getTime() < Date.now() && task.status !== 'Completed').length
  const overallProgress = getCompletionProgress(filteredTasks)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">Dashboard Analytics</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Track tasks and project health</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Filter, search, and sort tasks while analytics update automatically with every task change.
              </p>
            </div>
          </div>
        </header>

        <FilterControls
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onStatusChange={setStatusFilter}
          onSearchChange={setSearchQuery}
          onSortByChange={setSortBy}
        />

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard title="Total Tasks" value={`${totalTasks}`} description="All tasks matching the current filters." />
          <KpiCard title="Completed" value={`${completedTasks}`} description="Tasks marked as completed." />
          <KpiCard title="At Risk" value={`${atRiskTasks}`} description="Tasks that need immediate attention." />
          <KpiCard title="Overdue" value={`${overdueTasks}`} description="Tasks past their due date and not completed." />
          <KpiCard title="Overall Progress" value={`${overallProgress}%`} description="Average progress for filtered tasks." />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <StatusPieChart data={getStatusDistribution(filteredTasks)} />
          <ProgressBarChart data={getProgressOverview(filteredTasks)} />
          <CompletionTrendChart data={getCompletionTrend(filteredTasks)} />
        </section>
      </div>
    </main>
  )
}
