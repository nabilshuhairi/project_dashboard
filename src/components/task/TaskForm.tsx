import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormSchema } from '../../validation/dashboardSchemas'
import type { TaskFormValues } from '../../validation/dashboardSchemas'
import type { Task, TaskStatus, Project } from '../../types'

interface TaskFormProps {
  task?: Task
  projects: Project[]
  onSubmit: (values: TaskFormValues) => void
  onCancel: () => void
}

const statusOptions: TaskStatus[] = ['Not Started', 'In Progress', 'At Risk', 'Completed']

export function TaskForm({ task, projects, onSubmit, onCancel }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      id: task?.id ?? '',
      projectId: task?.projectId ?? projects[0]?.id ?? '',
      title: task?.title ?? '',
      description: task?.description ?? '',
      status: task?.status ?? 'Not Started',
      progress: task?.progress ?? 0,
      dueDate: task?.dueDate ?? new Date().toISOString().slice(0, 10),
    },
  })

  useEffect(() => {
    if (task) {
      form.reset({
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        description: task.description,
        status: task.status,
        progress: task.progress,
        dueDate: task.dueDate,
      })
    }
  }, [task, form])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 rounded-3xl border border-hairline bg-surface-card p-3 shadow-xl shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="projectId">
          Project
        </label>
        <select
          id="projectId"
          {...form.register('projectId')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="title">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          {...form.register('title')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
        />
        {form.formState.errors.title ? (
          <p className="mt-2 text-sm text-rose-600">{form.formState.errors.title.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={2}
          {...form.register('description')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...form.register('status')}
            className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="progress">
            Progress (%)
          </label>
          <input
            id="progress"
            type="number"
            {...form.register('progress', { valueAsNumber: true })}
            className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
            min={0}
            max={100}
          />
          {form.formState.errors.progress ? (
            <p className="mt-2 text-sm text-rose-600">{form.formState.errors.progress.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          {...form.register('dueDate')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-primary-active dark:focus:ring-primary-active/20"
        />
        {form.formState.errors.dueDate ? (
          <p className="mt-2 text-sm text-rose-600">{form.formState.errors.dueDate.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-hairline px-3 py-2 text-xs font-semibold text-body transition hover:bg-surface-cream-strong dark:border-surface-dark-elevated dark:text-on-dark dark:hover:bg-surface-dark-elevated"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#4F46E5] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#4338CA] active:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-[#C7D2FE]/60"
        >
          Save Task
        </button>
      </div>
    </form>
  )
}
