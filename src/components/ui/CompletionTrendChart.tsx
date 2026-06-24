import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface CompletionTrendChartProps {
  data: Array<{ date: string; completed: number }>
}

export function CompletionTrendChart({ data }: CompletionTrendChartProps) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-card p-6 shadow-lg shadow-slate-900/5 dark:border-surface-dark-elevated dark:bg-surface-dark">
      <h2 className="text-lg font-semibold text-ink dark:text-on-dark">Completion Trend</h2>
      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ebe6df" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip formatter={(value: number) => `${value} tasks`} />
            <Line type="monotone" dataKey="completed" stroke="#5db872" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
