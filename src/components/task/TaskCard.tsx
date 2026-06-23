import type { Task } from '../../types'
import { StatusBadge } from './StatusBadge'
import { ProgressBar } from './ProgressBar'

interface TaskCardProps {
  task: Task
  projectName: string
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, projectName, onEdit, onDelete }: TaskCardProps) {
  return (
    <article className="rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/15 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/5 dark:bg-slate-900/40">
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{task.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{task.description || 'No description provided.'}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">Assigned to {projectName}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/80 p-4 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
            <span className="font-semibold text-slate-100">{task.progress}%</span>
          </div>
          <div className="mt-4">
            <ProgressBar progress={task.progress} />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-full border border-slate-700/70 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
