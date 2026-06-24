import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface ProgressBarChartProps {
  data: Array<{ name: string; progress: number }>
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
            <Bar dataKey="progress" fill="#cc785c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
