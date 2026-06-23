interface KpiCardProps {
  title: string
  value: string
  description: string
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
