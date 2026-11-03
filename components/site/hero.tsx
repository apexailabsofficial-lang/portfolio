'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { useBooking } from './booking-provider'
import { WorkflowVisual } from './workflow-visual'

const trustedBy = ['Scale-ups', 'E-commerce', 'SaaS', 'Agencies', 'Enterprise']

export function Hero() {
  const { openBooking } = useBooking()

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute top-40 -left-40 size-[420px] rounded-full bg-brand-cyan/10 blur-[120px]" />
        <div className="absolute top-60 -right-40 size-[420px] rounded-full bg-brand-violet/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-brand-cyan" />
            AI Ads Studio &amp; Automation Agency
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Transforming Businesses with{' '}
            <span className="text-gradient">Next-Gen AI Ads</span> &amp; Intelligent Automations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            We design scalable AI video campaigns and cutting-edge workflow automations that
            multiply ROI, eliminate manual busywork, and give modern enterprises an unfair
            operational advantage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              onClick={openBooking}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-6 py-3.5 font-semibold text-white shadow-[0_0_40px_-8px] shadow-brand-blue transition-all hover:shadow-[0_0_60px_-6px] hover:shadow-brand-cyan"
            >
              Book a Discovery Call
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-foreground transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Explore Our Work
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3 pt-4"
          >
            <p className="text-xs tracking-wider text-muted-foreground uppercase">
              Trusted by teams across
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {trustedBy.map((item) => (
                <li key={item} className="font-display text-sm font-medium text-foreground/60">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WorkflowVisual />
        </motion.div>
      </div>
    </section>
  )
}
