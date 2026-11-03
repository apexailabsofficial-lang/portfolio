'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  'summary',
  '[role="button"]',
  '[role="combobox"]',
  '[role="option"]',
  '[role="link"]',
  '[role="tab"]',
  'article',
  '[data-cursor="hover"]',
].join(',')
const ACTIVE_CLASS = 'custom-cursor-active'

type Ripple = { id: number; x: number; y: number }

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleId = useRef(0)
  const reduceMotion = useReducedMotion()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = reduceMotion
    ? { stiffness: 2000, damping: 100, mass: 0.1 }
    : { stiffness: 380, damping: 32, mass: 0.6 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER_QUERY)
    const update = () => setEnabled(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add(ACTIVE_CLASS)

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setVisible(true)
      const target = event.target as Element | null
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)))
    }
    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      setPressed(true)
      if (reduceMotion) return
      const id = ++rippleId.current
      setRipples((current) => [
        ...current.slice(-4),
        { id, x: event.clientX, y: event.clientY },
      ])
    }
    const handleUp = () => setPressed(false)
    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerdown', handleDown, { passive: true })
    window.addEventListener('pointerup', handleUp, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    window.addEventListener('blur', handleLeave)

    return () => {
      root.classList.remove(ACTIVE_CLASS)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('blur', handleLeave)
    }
  }, [enabled, mouseX, mouseY, reduceMotion])

  if (!enabled) return null

  const ringScale = pressed ? 0.8 : hovering ? 1.6 : 1

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute left-0 top-0 h-10 w-10 rounded-full border border-primary/70 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
            style={{ x: ripple.x - 20, y: ripple.y - 20 }}
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setRipples((current) =>
                current.filter((item) => item.id !== ripple.id),
              )
            }
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-[2px]"
          animate={{
            scale: ringScale,
            opacity: visible ? 1 : 0,
            borderColor: hovering
              ? 'rgba(139, 92, 246, 0.85)'
              : 'rgba(34, 211, 238, 0.55)',
            backgroundColor: hovering
              ? 'rgba(139, 92, 246, 0.12)'
              : 'rgba(34, 211, 238, 0.04)',
            boxShadow: hovering
              ? '0 0 24px rgba(139, 92, 246, 0.45), inset 0 0 12px rgba(139, 92, 246, 0.25)'
              : '0 0 16px rgba(34, 211, 238, 0.3), inset 0 0 8px rgba(34, 211, 238, 0.12)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>

      <motion.div
        className="absolute left-0 top-0"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.span
          className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.9)]"
          animate={{
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.6 : hovering ? 1.4 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  )
}
