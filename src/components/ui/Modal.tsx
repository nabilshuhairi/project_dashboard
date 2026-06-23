import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  description?: string
  open: boolean
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel: () => void
  children?: ReactNode
}

export function Modal({
  title,
  description,
  open,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/90 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/95">
        <div className="space-y-4">
          <div>
            <h2 id="modal-title" className="text-2xl font-semibold text-slate-950 dark:text-white">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {description}
              </p>
            ) : null}
          </div>
          <div>{children}</div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {cancelLabel}
          </button>
          {onConfirm ? (
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {confirmLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
