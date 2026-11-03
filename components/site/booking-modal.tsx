'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, Clock, Globe, Video } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Modal } from './modal'

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

function getUpcomingWeekdays(count: number) {
  const days: Date[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    const day = cursor.getDay()
    if (day !== 0 && day !== 6) days.push(new Date(cursor))
  }
  return days
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const days = useMemo(() => getUpcomingWeekdays(10), [])
  const [dayIndex, setDayIndex] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setConfirmed(false)
      setSlot(null)
      setDayIndex(0)
    }, 300)
  }

  const selectedDay = days[dayIndex]
  const formattedDay = selectedDay?.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Modal open={open} onClose={handleClose} title="Book a Discovery Call">
      {confirmed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 px-6 py-14 text-center"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-violet shadow-lg shadow-brand-cyan/30">
            <CalendarCheck className="size-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold">{"You're booked!"}</h3>
          <p className="max-w-sm text-pretty text-muted-foreground">
            Your discovery call is set for{' '}
            <span className="font-medium text-foreground">
              {formattedDay} at {slot}
            </span>
            . A calendar invite and meeting link will arrive in your inbox shortly.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Done
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr]">
          <aside className="flex flex-col gap-4 md:border-r md:border-white/10 md:pr-6">
            <div>
              <p className="text-sm text-muted-foreground">Apex AI Labs</p>
              <p className="font-display text-lg font-semibold">30 Min Strategy Call</p>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-brand-cyan" /> 30 minutes
              </li>
              <li className="flex items-center gap-2">
                <Video className="size-4 text-brand-cyan" /> Google Meet
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-4 text-brand-cyan" /> Your local time
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {"We'll map your highest-ROI AI opportunities and outline a clear automation roadmap."}
            </p>
          </aside>

          <div className="flex min-w-0 flex-col gap-5">
            <fieldset className="min-w-0">
              <legend className="mb-3 text-sm font-medium">Select a date</legend>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((day, i) => (
                  <button
                    key={day.toISOString()}
                    type="button"
                    aria-pressed={i === dayIndex}
                    onClick={() => {
                      setDayIndex(i)
                      setSlot(null)
                    }}
                    className={cn(
                      'flex min-w-16 flex-col items-center rounded-xl border px-3 py-2.5 transition-all',
                      i === dayIndex
                        ? 'border-brand-cyan/60 bg-brand-cyan/10 text-foreground shadow-[0_0_20px_-6px] shadow-brand-cyan'
                        : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-foreground',
                    )}
                  >
                    <span className="text-xs uppercase">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="font-display text-lg font-semibold">{day.getDate()}</span>
                    <span className="text-[10px] uppercase">
                      {day.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">{formattedDay}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={slot === time}
                    onClick={() => setSlot(time)}
                    className={cn(
                      'rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                      slot === time
                        ? 'border-brand-violet/70 bg-brand-violet/20 text-foreground'
                        : 'border-white/10 bg-white/5 text-muted-foreground hover:border-brand-cyan/40 hover:text-foreground',
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              disabled={!slot}
              onClick={() => setConfirmed(true)}
              className="mt-1 rounded-lg bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all hover:shadow-brand-cyan/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {slot ? `Confirm ${slot}` : 'Pick a time slot'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
