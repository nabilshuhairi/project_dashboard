import { useEffect, useRef, useState } from 'react'
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
const sortOptions: Array<{ value: '' | 'dueDate' | 'progress'; label: string }> = [
  { value: '', label: 'None' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'progress', label: 'Progress' },
]

interface DropdownSelectProps<T extends string> {
  label: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
}

function DropdownSelect<T extends string>({ label, value, options, onChange }: DropdownSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((option) => option.value === value)?.label ?? ''

  return (
    <div className="relative flex h-full flex-col justify-between" ref={menuRef}>
      <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark">{label}</label>
      <button
        type="button"
        className="flex h-14 w-full items-center justify-between rounded-2xl border border-[#D5C9B2] bg-[#F8F3E8] px-4 text-left text-sm text-[#111827] shadow-sm transition focus:border-[#BFA975] focus:outline-none focus:ring-2 focus:ring-[#BFA975]/20"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 overflow-auto rounded-2xl border border-[#D5C9B2] bg-[#F8F3E8] shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full px-4 py-3 text-left text-sm text-[#111827] transition hover:bg-[#E8E2D6]"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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
      <DropdownSelect
        label="Status"
        value={statusFilter}
        options={statusOptions.map((status) => ({ value: status, label: status }))}
        onChange={(value) => onStatusChange(value)}
      />

      <div className="flex h-full flex-col justify-between">
        <label className="mb-2 block text-sm font-medium text-[#374151]">Search</label>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search task title"
          className="h-14 w-full rounded-2xl border border-[#D5C9B2] bg-[#F8F3E8] px-4 text-sm text-[#111827] placeholder:text-[#6B7280] shadow-sm outline-none transition focus:border-[#BFA975] focus:ring-2 focus:ring-[#BFA975]/20"
        />
      </div>

      <DropdownSelect
        label="Sort by"
        value={sortBy}
        options={sortOptions}
        onChange={(value) => onSortByChange(value)}
      />
    </div>
  )
}
