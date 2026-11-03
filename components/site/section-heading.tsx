'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('mx-auto flex max-w-2xl flex-col items-center gap-4 text-center', className)}
    >
      <span className="glass rounded-full px-3.5 py-1 text-xs font-medium tracking-wider text-brand-cyan uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
