interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-full bg-hairline dark:bg-surface-dark-elevated">
      <div
        className="h-3 rounded-full bg-primary transition-all duration-300"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  )
}
