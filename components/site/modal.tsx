'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className={cn(
              'relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-white/10 bg-[#0E121C]/95 shadow-2xl shadow-brand-violet/10 outline-none backdrop-blur-xl sm:rounded-2xl',
              className,
            )}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0E121C]/90 px-6 py-4 backdrop-blur-xl">
              <h2 id={titleId} className="text-lg font-semibold text-balance">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
