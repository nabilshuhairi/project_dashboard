import type { TaskStatus } from '../../types'

const statusStyles: Record<TaskStatus, string> = {
  'Not Started': 'bg-slate-100 text-slate-800',
  'In Progress': 'bg-accent-teal/10 text-accent-teal',
  'At Risk': 'bg-accent-amber/10 text-accent-amber',
  Completed: 'bg-success/10 text-success',
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
