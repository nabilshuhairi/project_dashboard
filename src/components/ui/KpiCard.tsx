interface KpiCardProps {
  title: string
  value: string
  description: string
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/90 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
