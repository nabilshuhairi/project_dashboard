import { useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { ProjectForm } from '../components/project/ProjectForm'
import { ProjectCard } from '../components/project/ProjectCard'
import { Modal } from '../components/ui/Modal'
import { Notification } from '../components/ui/Notification'
import { createId, createIsoTimestamp } from '../utils/identity'
import type { Project } from '../types'
import type { ProjectFormValues } from '../validation/dashboardSchemas'

export function ProjectListPage() {
  const projects = useDashboardStore((state) => state.projects)
  const addProject = useDashboardStore((state) => state.addProject)
  const updateProject = useDashboardStore((state) => state.updateProject)
  const removeProject = useDashboardStore((state) => state.removeProject)

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [notification, setNotification] = useState<{type: 'success' | 'error'; message: string} | null>(null)

  const isEmpty = useMemo(() => projects.length === 0, [projects])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    window.setTimeout(() => setNotification(null), 3500)
  }

  const handleCreate = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDelete = (project: Project) => {
    setSelectedProject(project)
  }

  const handleDeleteConfirm = () => {
    if (!selectedProject) {
      return
    }

    removeProject(selectedProject.id)
    setSelectedProject(null)
    showNotification('success', 'Project deleted successfully.')
  }

  const handleSubmit = (values: ProjectFormValues) => {
    try {
      if (editingProject) {
        updateProject({
          ...editingProject,
          name: values.name,
          description: values.description ?? '',
        })
        showNotification('success', 'Project updated successfully.')
      } else {
        addProject({
          id: values.id || createId(),
          name: values.name,
          description: values.description ?? '',
          createdAt: createIsoTimestamp(),
        })
        showNotification('success', 'Project created successfully.')
      }
      setShowForm(false)
      setEditingProject(null)
    } catch (error) {
      showNotification('error', 'Failed to Save Project. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">Project Management</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Manage your active projects</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Create, edit, and delete projects with instant validation and persistent storage.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add Project
            </button>
          </div>
          {notification ? (
            <div className="mt-4">
              <Notification type={notification.type} message={notification.message} />
            </div>
          ) : null}
        </header>

        {isEmpty ? (
          <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">No projects yet</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Start your first project</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Projects are saved automatically to LocalStorage and will be available after refresh.
            </p>
            <button
              type="button"
              onClick={handleCreate}
              className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Create project
            </button>
          </section>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>

      {showForm ? (
        <Modal
          title={editingProject ? undefined : 'New Project'}
          description={editingProject ? undefined : 'Use the form below to save your project details.'}
          open={showForm}
          showCancelButton={false}
          onCancel={() => {
            setShowForm(false)
            setEditingProject(null)
          }}
        >
          <ProjectForm
            project={editingProject ?? undefined}
            headerTitle={editingProject ? 'Edit Project' : undefined}
            headerDescription={editingProject ? 'Use the form below to save your project details.' : undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingProject(null)
            }}
          />
        </Modal>
      ) : null}

      <Modal
        title="Delete project"
        description={selectedProject ? `Are you sure you want to delete “${selectedProject.name}”? This action cannot be undone.` : undefined}
        open={Boolean(selectedProject)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedProject(null)}
      />
    </main>
  )
}
