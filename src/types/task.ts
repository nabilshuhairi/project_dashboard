export type TaskStatus = 'Not Started' | 'In Progress' | 'At Risk' | 'Completed'

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  progress: number
  dueDate: string
  createdAt: string
}
