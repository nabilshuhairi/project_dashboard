import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ProjectFormValues } from '../../validation/dashboardSchemas'
import { ProjectFormSchema } from '../../validation/dashboardSchemas'
import type { Project } from '../../types'

interface ProjectFormProps {
  project?: Project
  headerTitle?: string
  headerDescription?: string
  onSubmit: (values: ProjectFormValues) => void
  onCancel: () => void
}

export function ProjectForm({ project, headerTitle, headerDescription, onSubmit, onCancel }: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      id: project?.id ?? '',
      name: project?.name ?? '',
      description: project?.description ?? '',
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({
        id: project.id,
        name: project.name,
        description: project.description,
      })
    }
  }, [project, form])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-hairline bg-surface-card p-6 shadow-xl shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark"
    >
      {headerTitle ? (
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-ink dark:text-on-dark">{headerTitle}</h2>
          {headerDescription ? (
            <p className="text-sm text-body dark:text-muted-soft">{headerDescription}</p>
          ) : null}
        </div>
      ) : null}
      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="name">
          Project Name
        </label>
        <input
          id="name"
          type="text"
          {...form.register('name')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-[#A855F7] dark:focus:ring-[#A855F7]/20"
        />
        {form.formState.errors.name ? (
          <p className="mt-2 text-sm text-error">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-body dark:text-on-dark" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...form.register('description')}
          className="w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 dark:border-surface-dark-elevated dark:bg-surface-dark dark:text-on-dark dark:focus:border-[#A855F7] dark:focus:ring-[#A855F7]/20"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-body transition hover:bg-surface-cream-strong dark:border-surface-dark-elevated dark:text-on-dark dark:hover:bg-surface-dark-elevated"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338CA] active:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-[#C7D2FE]/60"
        >
          Save Project
        </button>
      </div>
    </form>
  )
}
