interface KpiCardProps {
  title: string
  value: string
}

export function KpiCard({ title, value }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-card p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-surface-dark-elevated dark:bg-surface-dark flex flex-col justify-center gap-4 min-h-[120px]">
      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted dark:text-muted-soft mb-0">{title}</p>
      <p className="text-3xl font-semibold text-ink dark:text-on-dark">{value}</p>
    </div>
  )
}
