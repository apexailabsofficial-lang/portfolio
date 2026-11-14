'use client'

import { motion } from 'framer-motion'
import { CalendarDays, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { useActionState } from 'react'
import { type ContactState, submitContact } from '@/app/actions/contact'
import { contactInfo } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useBooking } from './booking-provider'
import { LinkedinIcon } from './brand-icons'
import { SectionHeading } from './section-heading'
import { ServiceSelect } from './service-select'

const services = ['AI Video Ads', 'Workflow Automation', 'AI Agents & Chatbots', 'Not sure yet']
const budgets = ['< $2k', '$2k – $5k', '$5k – $15k', '$15k+']

// text-base on mobile prevents iOS Safari auto-zoom on input focus
const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-brand-cyan/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-brand-cyan/20 aria-invalid:border-destructive/60'

const contactCards = [
  { label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: Mail },
  { label: 'WhatsApp', value: contactInfo.whatsapp, href: contactInfo.whatsappHref, icon: MessageCircle },
  { label: 'LinkedIn', value: contactInfo.linkedin, href: contactInfo.linkedinHref, icon: LinkedinIcon },
]

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {error}
    </p>
  )
}

export function Contact() {
  const { openBooking } = useBooking()
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: 'idle',
  })
  const errors = state.errors ?? {}

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title={
            <>
              {"Let's build your "}
              <span className="text-gradient">AI advantage</span>
            </>
          }
          description="Tell us about your goals and we'll come back with a tailored automation and growth plan."
        />

        {/* grid-cols-1 ensures clean full-width stacking on mobile without horizontal overflow */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass min-w-0 rounded-2xl p-5 sm:p-8"
          >
            {state.status === 'success' ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="size-14 text-brand-cyan" />
                <h3 className="text-2xl font-semibold">Message received</h3>
                <p className="max-w-sm text-pretty text-muted-foreground">{state.message}</p>
              </div>
            ) : (
              <form action={formAction} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Cooper"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputClass}
                    />
                    <FieldError id="name-error" error={errors.name} />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClass}
                    />
                    <FieldError id="email-error" error={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="service" className="mb-2 block text-sm font-medium">
                      Service needed
                    </label>
                    <ServiceSelect
                      id="service"
                      name="service"
                      options={services}
                      placeholder="Select a service"
                      invalid={!!errors.service}
                      describedBy={errors.service ? 'service-error' : undefined}
                    />
                    <FieldError id="service-error" error={errors.service} />
                  </div>
                  <fieldset className="min-w-0">
                    <legend className="mb-2 block text-sm font-medium">Project budget</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {budgets.map((b) => (
                        <label key={b} className="cursor-pointer">
                          <input type="radio" name="budget" value={b} className="peer sr-only" />
                          <span className="block rounded-lg border border-white/10 bg-white/[0.03] px-2 py-2.5 text-center text-xs font-medium text-muted-foreground transition-all peer-checked:border-brand-cyan/60 peer-checked:bg-brand-cyan/10 peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-brand-cyan/40 hover:border-white/25">
                            {b}
                          </span>
                        </label>
                      ))}
                    </div>
                    <FieldError id="budget-error" error={errors.budget} />
                  </fieldset>
                </div>

                <div className="min-w-0">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What would you like to automate or scale?"
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={cn(inputClass, 'resize-none')}
                  />
                  <FieldError id="message-error" error={errors.message} />
                </div>

                {state.status === 'error' && state.message && (
                  <p role="alert" className="text-sm text-destructive">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all hover:shadow-brand-cyan/40 disabled:opacity-60"
                >
                  {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {pending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex min-w-0 flex-col gap-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-cyan/15 via-brand-blue/10 to-brand-violet/20 p-6 sm:p-7">
              <CalendarDays className="size-7 text-brand-cyan" />
              <h3 className="mt-4 text-xl font-semibold">Prefer to talk live?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Grab a free 30-minute discovery call and leave with a clear AI roadmap for your
                business.
              </p>
              <button
                type="button"
                onClick={openBooking}
                className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0A0D14] transition-transform hover:scale-[1.02]"
              >
                Schedule a Discovery Call
              </button>
            </div>

            {contactCards.map((card) => {
              const Icon = card.icon
              const external = card.href.startsWith('http')
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group glass flex min-w-0 items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-brand-cyan/30 sm:p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan transition-colors group-hover:bg-brand-cyan/15">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted-foreground">{card.label}</span>
                    <span className="block truncate text-sm font-medium">{card.value}</span>
                  </span>
                </a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}