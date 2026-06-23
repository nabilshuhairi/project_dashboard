import type { TaskStatus } from '../../types'

const statusStyles: Record<TaskStatus, string> = {
  'Not Started': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200',
  'At Risk': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200',
}

interface StatusBadgeProps {
  status: TaskStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  )
}
