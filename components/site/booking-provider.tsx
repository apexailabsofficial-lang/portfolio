'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { BookingModal } from './booking-modal'

interface BookingContextValue {
  openBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openBooking = useCallback(() => setOpen(true), [])

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
