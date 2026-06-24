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
    <div className="grid gap-4 rounded-xl border border-hairline bg-surface-card p-6 shadow-lg shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark sm:grid-cols-2 xl:grid-cols-3">
      <div className="flex h-full flex-col justify-between">
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark">Status</label>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus | 'All')}
          className="h-14 w-full rounded-2xl border border-[#252320] bg-[#C7C7C7] px-4 text-sm text-[#ffffff] shadow-sm outline-none appearance-none transition focus:border-[#dbdbdb33] focus:ring-2 focus:ring-[#dbdbdb33]/20"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} className="bg-[#C7C7C7] text-[#ffffff]">
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex h-full flex-col justify-between">
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark">Search</label>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search task title"
          className="h-14 w-full rounded-2xl border border-[#252320] bg-[#C7C7C7] px-4 text-sm text-[#faf9f5] placeholder:text-[#ffffff] shadow-sm outline-none transition focus:border-[#dbdbdb33] focus:ring-2 focus:ring-[#dbdbdb33]/20"
        />
      </div>

      <div className="flex h-full flex-col justify-between">
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark">Sort by</label>
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as 'dueDate' | 'progress' | '')}
          className="h-14 w-full rounded-2xl border border-[#252320] bg-[#C7C7C7] px-4 text-sm text-[#ffffff] shadow-sm outline-none appearance-none transition focus:border-[#dbdbdb33] focus:ring-2 focus:ring-[#dbdbdb33]/20"
        >
          <option value="" className="bg-[#C7C7C7] text-[#faf9f5]">None</option>
          <option value="dueDate" className="bg-[#C7C7C7] text-[#faf9f5]">Due Date</option>
          <option value="progress" className="bg-[#C7C7C7] text-[#faf9f5]">Progress</option>
        </select>
      </div>
    </div>
  )
}
