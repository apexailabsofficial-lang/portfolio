'use client'

import { animate, motion, useInView } from 'framer-motion'
import { Gauge, Rocket, Timer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from './section-heading'

interface Stat {
  value: number
  prefix?: string
  suffix: string
  label: string
  description: string
  icon: LucideIcon
}

const stats: Stat[] = [
  {
    value: 10,
    suffix: 'x',
    label: 'Faster Workflow Execution',
    description: 'Processes that took days now complete in minutes, around the clock.',
    icon: Rocket,
  },
  {
    value: 85,
    suffix: '%',
    label: 'Manual Task Reduction',
    description: 'Your team stops copy-pasting and starts focusing on high-value work.',
    icon: Timer,
  },
  {
    value: 300,
    suffix: '%+',
    label: 'Ad Engagement Increase',
    description: 'AI-tested creatives that consistently outperform traditional production.',
    icon: Gauge,
  },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

const reasons = [
  'Senior AI engineers, not juniors',
  'ROI-first roadmap in week one',
  'Production-grade, fully documented builds',
  'Ongoing optimization & support',
]

export function Stats() {
  return (
    <section id="impact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Apex"
          title={
            <>
              Impact you can <span className="text-gradient">put on a spreadsheet</span>
            </>
          }
          description="We measure success the way you do: time saved, costs cut, and revenue gained."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass group relative overflow-hidden rounded-2xl p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <Icon className="relative size-6 text-brand-cyan" />
                <p className="relative mt-6 font-display text-6xl font-semibold tracking-tight text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <h3 className="relative mt-3 text-lg font-semibold">{stat.label}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass mt-6 grid gap-4 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason) => (
            <li key={reason} className="flex items-center gap-3 text-sm font-medium">
              <span className="size-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet" />
              {reason}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
