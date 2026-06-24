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
    <div className="overflow-hidden rounded-[2.0rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
        <thead className="bg-slate-900 text-xs uppercase tracking-[0.24em] text-slate-500">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Progress</th>
            <th className="px-6 py-4">Due Date</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-900/80">
              <td className="px-6 py-4 font-semibold text-slate-50">{task.title}</td>
              <td className="px-6 py-4 text-slate-400">{projectNames[task.projectId] ?? 'Unknown Project'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4">{task.progress}%</td>
              <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
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
