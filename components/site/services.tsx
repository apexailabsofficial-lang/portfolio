'use client'

import { motion } from 'framer-motion'
import { Bot, Check, Clapperboard, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { SectionHeading } from './section-heading'

interface Service {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  glow: string
  iconBg: string
}

const services: Service[] = [
  {
    title: 'AI Video Ads & Campaign Production',
    description:
      'Hyper-realistic, scroll-stopping video ads produced at the speed of your growth targets.',
    icon: Clapperboard,
    features: [
      'Hyper-realistic AI video creation',
      'Short-form visual ads for every platform',
      'Automated ad scripting',
      'End-to-end creative pipelines',
    ],
    glow: 'rgba(34, 211, 238, 0.18)',
    iconBg: 'from-brand-cyan/25 to-brand-cyan/5 text-brand-cyan',
  },
  {
    title: 'Business Workflow Automations',
    description:
      'n8n and custom API integrations that run your back office on autopilot, error-free.',
    icon: Workflow,
    features: [
      'n8n & custom API integrations',
      'Invoice & document processing',
      'Lead nurturing sequences',
      'Database & CRM synchronization',
    ],
    glow: 'rgba(59, 130, 246, 0.2)',
    iconBg: 'from-brand-blue/25 to-brand-blue/5 text-brand-blue',
  },
  {
    title: 'Custom AI Agents & Chatbots',
    description:
      'Always-on intelligent agents that qualify, support, and schedule like your best rep.',
    icon: Bot,
    features: [
      'Intelligent lead qualification',
      'Customer support agents',
      'Automated scheduling & booking',
      'Multi-channel deployment',
    ],
    glow: 'rgba(139, 92, 246, 0.22)',
    iconBg: 'from-brand-violet/25 to-brand-violet/5 text-brand-violet',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const Icon = service.icon

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="group glass relative flex flex-col gap-6 overflow-hidden rounded-2xl p-7 transition-colors hover:border-white/20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), ${service.glow}, transparent 60%)`,
        }}
      />
      <span
        className={`relative flex size-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${service.iconBg}`}
      >
        <Icon className="size-6" />
      </span>
      <div className="relative flex flex-col gap-2.5">
        <h3 className="text-xl font-semibold text-balance">{service.title}</h3>
        <p className="leading-relaxed text-pretty text-muted-foreground">{service.description}</p>
      </div>
      <ul className="relative mt-auto flex flex-col gap-2.5 border-t border-white/10 pt-5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              AI systems engineered for <span className="text-gradient">measurable growth</span>
            </>
          }
          description="Three core capabilities, one integrated approach. We build the creative, the automation, and the intelligence that connects them."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
