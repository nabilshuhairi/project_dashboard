import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'

interface ProgressBarChartProps {
  data: Array<{ name: string; progress: number }>
}

const barColorMap: Record<string, string> = {
  'In Progress': '#6b9cea',
  Completed: '#38c76d',
  'Not Started': '#9c9fa9',
  'At Risk': '#eb673b',
}

export function ProgressBarChart({ data }: ProgressBarChartProps) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-card p-6 shadow-lg shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark">
      <h2 className="text-lg font-semibold text-ink dark:text-on-dark">Progress Overview</h2>
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ebe6df" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={barColorMap[entry.name] ?? '#cc785c'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
