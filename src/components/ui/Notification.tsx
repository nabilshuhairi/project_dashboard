interface NotificationProps {
  type: 'success' | 'error'
  message: string
}

export function Notification({ type, message }: NotificationProps) {
  return (
    <div className={`max-w-md rounded-3xl p-4 text-sm shadow-xl shadow-slate-900/5 ${type === 'success' ? 'bg-emerald-500/10 text-emerald-900 ring-1 ring-emerald-500/20' : 'bg-rose-500/10 text-rose-900 ring-1 ring-rose-500/20'}`}>
      <p>{message}</p>
    </div>
  )
}
