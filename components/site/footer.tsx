import { Mail } from 'lucide-react'
import { contactInfo, navLinks } from '@/lib/site-data'
import { LinkedinIcon, XIcon, InstagramIcon } from './brand-icons'
import { Logo } from './logo'

const socials = [
  { label: 'LinkedIn', href: contactInfo.linkedinHref, icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/apexailabs.official/', icon: InstagramIcon },
  { label: 'Email', href: `mailto:${contactInfo.email}`, icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex max-w-sm flex-col gap-3">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Next-gen AI ads, intelligent automations, and custom agents for businesses ready to
              scale.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Apex AI Labs. All rights reserved.
          </p>
          <ul className="flex gap-2">
            {socials.map((s) => {
              const Icon = s.icon
              const external = s.href.startsWith('http')
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
