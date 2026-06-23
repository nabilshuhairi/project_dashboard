import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <article className="rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/15 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/5 dark:bg-slate-900/40">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{project.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{project.description || 'No description provided.'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span className="rounded-full bg-slate-800/70 px-3 py-1 text-slate-300">Created {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-full border border-slate-700/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
