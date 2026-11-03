'use client'

import { motion } from 'framer-motion'
import { LinkedinIcon, XIcon } from './brand-icons'
import { SectionHeading } from './section-heading'

interface Founder {
  name: string
  initials: string
  role: string
  bio: string
  tags: string[]
  linkedin: string
  twitter: string
  gradient: string
}

const founders: Founder[] = [
  {
    name: 'Muhammad Anas Naseer',
    initials: 'AN',
    role: 'Founder',
    bio: 'Architects the AI systems behind every Apex build, from multi-agent pipelines to enterprise-grade automation infrastructure.',
    tags: ['AI Engineering', 'Workflow Automation Architecture', 'Technical Strategy'],
    linkedin: 'https://linkedin.com/in/muhammad-anas-naseer',
    twitter: 'https://x.com/anasnaseer',
    gradient: 'from-brand-cyan to-brand-blue',
  },
  {
    name: 'Muhammad Arshan Khan',
    initials: 'AK',
    role: 'Co-Founder',
    bio: 'Leads growth and client success, turning AI capabilities into high-performing campaigns and measurable business outcomes.',
    tags: ['AI Growth Marketing', 'Campaign Optimization', 'Client Solutions'],
    linkedin: 'https://linkedin.com/in/muhammad-arshan-khan',
    twitter: 'https://x.com/arshankhan',
    gradient: 'from-brand-blue to-brand-violet',
  },
]

export function Founders() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title={
            <>
              Meet the Visionaries Behind <span className="text-gradient">Apex AI Labs</span>
            </>
          }
          description="An engineer and a growth strategist, united by one mission: make AI deliver real business results."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {founders.map((founder, i) => (
            <motion.article
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group glass relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 transition-colors hover:border-white/20"
            >
              <div
                aria-hidden="true"
                className={`absolute -top-24 -right-24 size-56 rounded-full bg-gradient-to-br ${founder.gradient} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
              />
              <div className="relative flex items-center gap-5">
                <div className={`rounded-2xl bg-gradient-to-br ${founder.gradient} p-[2px]`}>
                  <div className="flex size-20 items-center justify-center rounded-[14px] bg-[#0E121C]">
                    <span className="font-display text-2xl font-semibold text-gradient">
                      {founder.initials}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium tracking-wider text-brand-cyan uppercase">
                    {founder.role}
                  </span>
                  <h3 className="text-xl font-semibold text-balance">{founder.name}</h3>
                </div>
              </div>

              <p className="relative leading-relaxed text-pretty text-muted-foreground">{founder.bio}</p>

              <ul className="relative flex flex-wrap gap-2">
                {founder.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/85"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex gap-2 border-t border-white/10 pt-5">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-brand-cyan/40 hover:text-brand-cyan"
                >
                  <LinkedinIcon className="size-4" />
                  <span className="sr-only">{founder.name} on LinkedIn</span>
                </a>
                <a
                  href={founder.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-brand-cyan/40 hover:text-brand-cyan"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">{founder.name} on X</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
