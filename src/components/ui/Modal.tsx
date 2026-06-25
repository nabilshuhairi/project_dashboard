import type { ReactNode } from 'react'

interface ModalProps {
  title?: string
  description?: string
  open: boolean
  confirmLabel?: string
  cancelLabel?: string
  showCancelButton?: boolean
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
  showCancelButton = true,
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-surface-dark/70 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="w-full max-w-lg rounded-xl border border-hairline bg-surface-card p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-surface-dark-elevated dark:bg-surface-dark">
        <div className="space-y-3">
          {(title || description) ? (
            <div>
              {title ? (
                <h2 id="modal-title" className="text-2xl font-semibold text-ink dark:text-on-dark">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id="modal-description" className="mt-2 text-sm text-body dark:text-muted-soft">
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}
          <div>{children}</div>
        </div>
        {(showCancelButton || onConfirm) && (
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            {showCancelButton ? (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-body transition hover:bg-surface-cream-strong dark:border-surface-dark-elevated dark:text-on-dark dark:hover:bg-surface-dark-elevated"
              >
                {cancelLabel}
              </button>
            ) : null}
            {onConfirm ? (
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-full bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4338CA] active:bg-[#3730A3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7D2FE]/60"
              >
                {confirmLabel}
              </button>
            ) : null}
          </div>
        )}

      </div>
    </div>
  )
}
