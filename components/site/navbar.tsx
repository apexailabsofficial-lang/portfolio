'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useBooking } from './booking-provider'
import { Logo } from './logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openBooking } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/10 bg-[#0A0D14]/75 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-21 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openBooking}
            className="hidden rounded-lg bg-gradient-to-r from-brand-cyan to-brand-violet px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-shadow hover:shadow-brand-cyan/40 sm:inline-flex"
          >
            Book a Call
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-[#0A0D14]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3.5 font-display text-2xl font-medium transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-8">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  openBooking()
                }}
                className="w-full rounded-xl bg-gradient-to-r from-brand-cyan to-brand-violet px-5 py-3.5 font-semibold text-white"
              >
                Book a Discovery Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
