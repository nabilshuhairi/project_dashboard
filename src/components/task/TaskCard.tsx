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
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{task.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{task.description || 'No description provided.'}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">Assigned to {projectName}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">Due {new Date(task.dueDate).toLocaleDateString()}</div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Progress</div>
          <div className="text-sm font-semibold text-slate-950 dark:text-white">{task.progress}%</div>
        </div>
        <ProgressBar progress={task.progress} />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
