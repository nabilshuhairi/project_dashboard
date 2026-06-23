import type { TaskStatus } from '../../types'

interface FilterControlsProps {
  statusFilter: TaskStatus | 'All'
  searchQuery: string
  sortBy: 'dueDate' | 'progress' | ''
  onStatusChange: (value: TaskStatus | 'All') => void
  onSearchChange: (value: string) => void
  onSortByChange: (value: 'dueDate' | 'progress' | '') => void
}

const statusOptions: Array<TaskStatus | 'All'> = ['All', 'Not Started', 'In Progress', 'At Risk', 'Completed']

export function FilterControls({
  statusFilter,
  searchQuery,
  sortBy,
  onStatusChange,
  onSearchChange,
  onSortByChange,
}: FilterControlsProps) {
  return (
    <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-2 xl:grid-cols-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus | 'All')}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Search</label>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search task title"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Sort by</label>
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as 'dueDate' | 'progress' | '')}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
        >
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
          <option value="progress">Progress</option>
        </select>
      </div>

      <div className="flex flex-col justify-end gap-2">
        <p className="text-sm text-slate-500 dark:text-slate-400">Filters update immediately when tasks change.</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">Search, status, and sort are combined for dynamic analytics.</p>
      </div>
    </div>
  )
}
