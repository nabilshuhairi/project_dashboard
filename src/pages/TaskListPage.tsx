import { useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { TaskForm } from '../components/task/TaskForm'
import { TaskCard } from '../components/task/TaskCard'
import { TaskTable } from '../components/task/TaskTable'
import { Modal } from '../components/ui/Modal'
import { Notification } from '../components/ui/Notification'
import { createId, createIsoTimestamp } from '../utils/identity'
import type { Task } from '../types'
import type { TaskFormValues } from '../validation/dashboardSchemas'

export function TaskListPage() {
  const projects = useDashboardStore((state) => state.projects)
  const tasks = useDashboardStore((state) => state.tasks)
  const addTask = useDashboardStore((state) => state.addTask)
  const updateTask = useDashboardStore((state) => state.updateTask)
  const removeTask = useDashboardStore((state) => state.removeTask)

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const projectMap = useMemo(() => {
    return projects.reduce<Record<string, string>>((acc, project) => {
      acc[project.id] = project.name
      return acc
    }, {})
  }, [projects])

  const isEmpty = useMemo(() => tasks.length === 0, [tasks])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    window.setTimeout(() => setNotification(null), 3500)
  }

  const handleCreate = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleDelete = (task: Task) => {
    setSelectedTask(task)
  }

  const handleDeleteConfirm = () => {
    if (!selectedTask) {
      return
    }

    removeTask(selectedTask.id)
    setSelectedTask(null)
    showNotification('success', 'Task deleted successfully.')
  }

  const handleSubmit = (values: TaskFormValues) => {
    try {
      if (editingTask) {
        updateTask({
          ...editingTask,
          projectId: values.projectId,
          title: values.title,
          description: values.description ?? '',
          status: values.status,
          progress: values.progress,
          dueDate: values.dueDate,
        })
        showNotification('success', 'Task updated successfully.')
      } else {
        addTask({
          id: values.id || createId(),
          projectId: values.projectId,
          title: values.title,
          description: values.description ?? '',
          status: values.status,
          progress: values.progress,
          dueDate: values.dueDate,
          createdAt: createIsoTimestamp(),
        })
        showNotification('success', 'Task created successfully.')
      }
      setShowForm(false)
      setEditingTask(null)
    } catch (error) {
      showNotification('error', 'Failed to save task. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-slate-950 dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">Task Management</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Organize your project tasks</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Create, update, and assign tasks to projects with validation and persistent state.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add Task
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">No tasks yet</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Create your first task</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Tasks are assigned to projects and saved automatically to LocalStorage.
            </p>
            <button
              type="button"
              onClick={handleCreate}
              className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Create task
            </button>
          </section>
        ) : (
          <section className="space-y-6">
            <TaskTable tasks={tasks} projectNames={projectMap} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  projectName={projectMap[task.projectId] ?? 'Unknown Project'}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {showForm ? (
        <Modal
          title={editingTask ? 'Edit Task' : 'New Task'}
          description="Fill in the task details and assign it to a project."
          open={showForm}
          cancelLabel="Close"
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
        >
          <TaskForm
            task={editingTask ?? undefined}
            projects={projects}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingTask(null)
            }}
          />
        </Modal>
      ) : null}

      <Modal
        title="Delete task"
        description={selectedTask ? `Are you sure you want to delete “${selectedTask.title}”? This action cannot be undone.` : undefined}
        open={Boolean(selectedTask)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedTask(null)}
      />
    </main>
  )
}
