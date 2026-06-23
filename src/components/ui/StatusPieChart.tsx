import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import type { TaskStatus } from '../../types'

interface StatusPieChartProps {
  data: Array<{ name: TaskStatus | 'Other'; value: number }>
}

const colors: Record<TaskStatus | 'Other', string> = {
  'Not Started': '#0f172a',
  'In Progress': '#2563eb',
  'At Risk': '#f59e0b',
  Completed: '#16a34a',
  Other: '#94a3b8',
}

export function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Task Status Distribution</h2>
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} innerRadius={44} paddingAngle={3}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={colors[entry.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} tasks`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
