import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string().uuid().or(z.string().min(1)),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  createdAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'createdAt must be a valid ISO date',
  }),
})

export const TaskSchema = z.object({
  id: z.string().uuid().or(z.string().min(1)),
  projectId: z.string().min(1),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  status: z.enum(['Not Started', 'In Progress', 'At Risk', 'Completed']),
  progress: z.number().min(0).max(100),
  dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'dueDate must be a valid ISO date',
  }),
  createdAt: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'createdAt must be a valid ISO date',
  }),
})

export const ProjectFormSchema = ProjectSchema.pick({
  name: true,
  description: true,
}).extend({
  id: z.string().optional(),
})

export const TaskFormSchema = TaskSchema.pick({
  projectId: true,
  title: true,
  description: true,
  status: true,
  progress: true,
  dueDate: true,
}).extend({
  id: z.string().optional(),
})

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>
export type TaskFormValues = z.infer<typeof TaskFormSchema>
