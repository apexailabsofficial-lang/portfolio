'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { type Project, projectFilters, projects } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useBooking } from './booking-provider'
import { Modal } from './modal'
import { SectionHeading } from './section-heading'

const badgeStyles: Record<Project['category'], string> = {
  'AI Ads': 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan',
  Automation: 'border-brand-blue/30 bg-brand-blue/10 text-sky-300',
  'Workflow AI': 'border-brand-violet/30 bg-brand-violet/10 text-violet-300',
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group glass flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-white/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`${project.title} interface preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/20 to-transparent" />
        <span
          className={cn(
            'absolute top-4 left-4 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md',
            badgeStyles[project.category],
          )}
        >
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-balance">{project.title}</h3>
          <p className="leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
        </div>
        <dl className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
              <dd className="font-display text-lg font-semibold text-gradient">{metric.value}</dd>
              <dt className="text-xs text-muted-foreground">{metric.label}</dt>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-cyan transition-colors hover:text-foreground"
        >
          View case study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All')
  const [active, setActive] = useState<Project | null>(null)
  const { openBooking } = useBooking()

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured work"
          title={
            <>
              Case studies that <span className="text-gradient">move the needle</span>
            </>
          }
          description="A selection of AI ad engines, automations, and agents we have shipped for ambitious teams."
        />

        <div role="group" aria-label="Filter projects" className="mt-12 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                filter === f ? 'text-white' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan/30 to-brand-violet/30 ring-1 ring-white/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setActive(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} title={active?.title ?? ''}>
        {active && (
          <div className="flex flex-col gap-6 p-6">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
              <Image
                src={active.image || '/placeholder.svg'}
                alt={`${active.title} interface preview`}
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <span
              className={cn(
                'self-start rounded-full border px-3 py-1 text-xs font-medium',
                badgeStyles[active.category],
              )}
            >
              {active.category}
            </span>
            <p className="leading-relaxed text-pretty text-muted-foreground">{active.description}</p>
            <dl className="grid grid-cols-3 gap-3">
              {active.metrics.map((m) => (
                <div key={m.label} className="glass rounded-xl p-4">
                  <dd className="font-display text-2xl font-semibold text-gradient">{m.value}</dd>
                  <dt className="text-xs text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold">Highlights</h3>
                <ul className="flex flex-col gap-2">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold">Tech stack</h3>
                <ul className="flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <li key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActive(null)
                openBooking()
              }}
              className="rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-5 py-3 font-semibold text-white"
            >
              Build something like this
            </button>
          </div>
        )}
      </Modal>
    </section>
  )
}
