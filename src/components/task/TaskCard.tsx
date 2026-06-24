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
    <article className="rounded-xl border border-hairline bg-surface-card p-6 shadow-2xl shadow-slate-950/15 transition hover:-translate-y-1 hover:shadow-2xl dark:border-surface-dark-elevated dark:bg-surface-dark">
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">{task.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{task.description || 'No description provided.'}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">Assigned to {projectName}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <div className="rounded-lg border border-surface-dark-elevated bg-surface-dark p-4 text-sm text-on-dark">
          <div className="flex items-center justify-between">
            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
            <span className="font-semibold text-on-dark">{task.progress}%</span>
          </div>
          <div className="mt-4">
            <ProgressBar progress={task.progress} />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-full border border-hairline bg-surface-cream-strong px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-cream-strong/90"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-full border border-error/30 bg-error/10 px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
