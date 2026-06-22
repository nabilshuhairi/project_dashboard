import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Project, Task } from '../types'
import { loadJSON } from '../utils/storage'

export interface DashboardState {
  projects: Project[]
  tasks: Task[]
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  removeProject: (projectId: string) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
  clearAll: () => void
}

const STORAGE_KEY = 'project-dashboard-state'

const loadInitialState = (): { projects: Project[]; tasks: Task[] } =>
  loadJSON(STORAGE_KEY, { projects: [], tasks: [] })

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set) => ({
        ...loadInitialState(),
        addProject: (project: Project) =>
          set((state) => ({ projects: [...state.projects, project] })),
        updateProject: (project: Project) =>
          set((state) => ({
            projects: state.projects.map((item) =>
              item.id === project.id ? project : item,
            ),
          })),
        removeProject: (projectId: string) =>
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== projectId),
            tasks: state.tasks.filter((task) => task.projectId !== projectId),
          })),
        addTask: (task: Task) =>
          set((state) => ({ tasks: [...state.tasks, task] })),
        updateTask: (task: Task) =>
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === task.id ? task : item,
            ),
          })),
        removeTask: (taskId: string) =>
          set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
        clearAll: () => set({ projects: [], tasks: [] }),
      }),
      {
        name: STORAGE_KEY,
      },
    ),
  ),
)
