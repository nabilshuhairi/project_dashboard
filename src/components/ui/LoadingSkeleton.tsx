interface LoadingSkeletonProps {
  lines?: number
}

export function LoadingSkeleton({ lines = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 w-full animate-pulse rounded-full bg-slate-700/60" />
      ))}
    </div>
  )
}
