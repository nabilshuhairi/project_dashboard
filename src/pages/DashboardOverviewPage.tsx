import { useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { FilterControls } from '../components/ui/FilterControls'
import { KpiCard } from '../components/ui/KpiCard'
import { SectionHeader } from '../components/ui/SectionHeader'
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
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <SectionHeader title="Dashboard Analytics" subtitle="Analyze tasks, spot risks, and track delivery." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 text-white shadow-inner shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Task portfolio</p>
              <p className="mt-2 text-base leading-7 text-slate-300">Monitor the team’s active work and spot high-priority tasks at a glance.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 text-white shadow-inner shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Status updates</p>
              <p className="mt-2 text-base leading-7 text-slate-300">Use filters to surface exactly the tasks that matter most for your next sync.</p>
            </div>
          </div>
        </section>

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
