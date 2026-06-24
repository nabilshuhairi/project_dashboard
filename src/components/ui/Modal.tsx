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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-surface-dark/70 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="w-full max-w-lg rounded-xl border border-hairline bg-surface-card p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-surface-dark-elevated dark:bg-surface-dark">
        <div className="space-y-4">
          <div>
            <h2 id="modal-title" className="text-2xl font-semibold text-ink dark:text-on-dark">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="mt-2 text-sm text-body dark:text-muted-soft">
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
            className="rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-body transition hover:bg-surface-cream-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 dark:border-surface-dark-elevated dark:text-on-dark dark:hover:bg-surface-dark-elevated"
          >
            {cancelLabel}
          </button>
          {onConfirm ? (
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition hover:bg-primary-active focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-active/30"
            >
              {confirmLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
