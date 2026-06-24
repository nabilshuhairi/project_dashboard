import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import type { TaskStatus } from '../../types'

interface StatusPieChartProps {
  data: Array<{ name: TaskStatus | 'Other'; value: number }>
}

const colors: Record<TaskStatus | 'Other', string> = {
  'Not Started': '#9c9fa9',
  'In Progress': '#6b9cea',
  'At Risk': '#eb673b',
  Completed: '#38c76d',
  Other: '#8e8b82',
}

export function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-card p-6 shadow-lg shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark">
      <h2 className="text-lg font-semibold text-ink dark:text-on-dark">Task Status Distribution</h2>
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
