import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-hairline bg-surface-card p-6 shadow-2xl shadow-slate-950/15 transition hover:-translate-y-1 hover:shadow-2xl dark:border-surface-dark-elevated dark:bg-surface-dark">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.description || 'No description provided.'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-800">Created {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-cream-strong"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-full border border-error/30 bg-error/10 px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
