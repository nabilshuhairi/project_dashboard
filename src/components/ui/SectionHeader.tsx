interface SectionHeaderProps {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">{title}</p>
      <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">{subtitle}</h2>
    </div>
  )
}
