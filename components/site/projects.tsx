'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { type Project, type ProjectCategory, projectFilters, projects } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useBooking } from './booking-provider'
import { Modal } from './modal'
import { SectionHeading } from './section-heading'

const badgeStyles: Record<ProjectCategory, string> = {
  'AI Ads': 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan',
  Automation: 'border-brand-blue/30 bg-brand-blue/10 text-sky-300',
  'Workflow AI': 'border-brand-violet/30 bg-brand-violet/10 text-violet-300',
}

// Google Drive view URL ko embed iframe preview format me convert karne ke liye helper
function getDriveEmbedUrl(url?: string) {
  if (!url) return null
  if (url.includes('drive.google.com') && url.includes('/view')) {
    return url.replace('/view', '/preview')
  }
  return url
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const categoryKey = project.category as ProjectCategory

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
            badgeStyles[categoryKey] || badgeStyles.Automation,
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
            {/* Media Banner: Drive Embed vs Direct MP4 Video vs Image Fallback */}
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
              {active.videoUrl?.includes('drive.google.com') || active.embedVideoUrl ? (
                <iframe
                  src={getDriveEmbedUrl(active.videoUrl) || active.embedVideoUrl}
                  className="h-full w-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={`${active.title} Demo Video`}
                />
              ) : active.videoUrl ? (
                <video
                  src={active.videoUrl}
                  controls
                  playsInline
                  poster={active.image}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={active.image || '/placeholder.svg'}
                  alt={`${active.title} interface preview`}
                  fill
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            <span
              className={cn(
                'self-start rounded-full border px-3 py-1 text-xs font-medium',
                badgeStyles[active.category as ProjectCategory] || badgeStyles.Automation,
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

            {/* Structured Case Study Section */}
            {active.caseStudy && (
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-brand-cyan">
                  Case Study Overview
                </h3>

                <div>
                  <h4 className="text-xs font-medium text-rose-400">The Problem</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {active.caseStudy.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-emerald-400">The Solution</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {active.caseStudy.solution}
                  </p>
                </div>

                {active.caseStudy.architecture && (
                  <div>
                    <h4 className="text-xs font-medium text-sky-400 mb-1.5">Architecture Workflow</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.caseStudy.architecture.map((step, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[11px] text-sky-300"
                        >
                          {idx + 1}. {step}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {active.caseStudy.results && (
                  <div>
                    <h4 className="text-xs font-medium text-brand-cyan mb-1.5">Key Results</h4>
                    <ul className="flex flex-col gap-1">
                      {active.caseStudy.results.map((res, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-foreground/90">
                          <span className="size-1.5 rounded-full bg-brand-cyan" />
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Highlights</h3>
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
                <h3 className="mb-3 text-sm font-semibold text-foreground">Tech stack</h3>
                <ul className="flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/80"
                    >
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
              className="rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Build something like this
            </button>
          </div>
        )}
      </Modal>
    </section>
  )
}