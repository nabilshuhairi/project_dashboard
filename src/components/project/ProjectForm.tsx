import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ProjectFormValues } from '../../validation/dashboardSchemas'
import { ProjectFormSchema } from '../../validation/dashboardSchemas'
import type { Project } from '../../types'

interface ProjectFormProps {
  project?: Project
  onSubmit: (values: ProjectFormValues) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
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
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="name">
          Project Name
        </label>
        <input
          id="name"
          type="text"
          {...form.register('name')}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
        />
        {form.formState.errors.name ? (
          <p className="mt-2 text-sm text-rose-600">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...form.register('description')}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Save Project
        </button>
      </div>
    </form>
  )
}
