import type { Task } from '../../types'
import { StatusBadge } from './StatusBadge'

interface TaskTableProps {
  tasks: Task[]
  projectNames: Record<string, string>
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskTable({ tasks, projectNames, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600 dark:divide-slate-800 dark:text-slate-300">
        <thead className="bg-slate-50 text-xs uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Progress</th>
            <th className="px-6 py-4">Due Date</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/80">
              <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{task.title}</td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-300">{projectNames[task.projectId] ?? 'Unknown Project'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4">{task.progress}%</td>
              <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
