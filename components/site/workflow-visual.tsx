'use client'

import { motion } from 'framer-motion'
import { Bot, Clapperboard, Database, Mail, TrendingUp, Webhook } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FlowNode {
  id: string
  label: string
  sub: string
  icon: LucideIcon
  x: number
  y: number
  accent: string
}

const nodes: FlowNode[] = [
  { id: 'trigger', label: 'New Lead', sub: 'Webhook', icon: Webhook, x: 14, y: 22, accent: 'text-brand-cyan' },
  { id: 'brief', label: 'Ad Brief', sub: 'Campaign', icon: Mail, x: 14, y: 78, accent: 'text-brand-cyan' },
  { id: 'agent', label: 'Apex Agent', sub: 'LLM Reasoning', icon: Bot, x: 50, y: 50, accent: 'text-white' },
  { id: 'crm', label: 'CRM Sync', sub: 'HubSpot', icon: Database, x: 86, y: 18, accent: 'text-brand-violet' },
  { id: 'video', label: 'Video Ads', sub: '9:16 Render', icon: Clapperboard, x: 86, y: 50, accent: 'text-brand-violet' },
  { id: 'roi', label: 'ROI Report', sub: 'Analytics', icon: TrendingUp, x: 86, y: 82, accent: 'text-brand-violet' },
]

const edges: [string, string][] = [
  ['trigger', 'agent'],
  ['brief', 'agent'],
  ['agent', 'crm'],
  ['agent', 'video'],
  ['agent', 'roi'],
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

function edgePath(from: FlowNode, to: FlowNode) {
  const x1 = from.x * 4
  const y1 = from.y * 3
  const x2 = to.x * 4
  const y2 = to.y * 3
  const mid = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`
}

export function WorkflowVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-cyan/20 via-brand-blue/10 to-brand-violet/20 blur-3xl"
      />
      <div className="glass relative overflow-hidden rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Workflow running
          </span>
        </div>

        <div
          className="relative aspect-[4/3] w-full rounded-xl border border-white/5 bg-[#070A10]/70 bg-grid"
          role="img"
          aria-label="Animated AI workflow: new leads and ad briefs flow into the Apex Agent, which syncs the CRM, renders video ads, and generates ROI reports."
        >
          <svg
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="edge-gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {edges.map(([from, to], i) => {
              const d = edgePath(byId[from], byId[to])
              return (
                <g key={`${from}-${to}`}>
                  <path d={d} stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" fill="none" />
                  <motion.path
                    d={d}
                    stroke="url(#edge-gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="14 220"
                    initial={{ strokeDashoffset: 234 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.35,
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {nodes.map((node, i) => {
            const Icon = node.icon
            const isCore = node.id === 'agent'
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {isCore ? (
                  <div className="relative flex flex-col items-center gap-1.5">
                    <motion.span
                      aria-hidden="true"
                      className="absolute top-0 size-14 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-violet blur-lg sm:size-16"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                    <span className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet sm:size-16">
                      <Icon className="size-7 text-white" />
                    </span>
                    <span className="relative text-center">
                      <span className="block text-xs font-semibold whitespace-nowrap">{node.label}</span>
                      <span className="block text-[10px] whitespace-nowrap text-muted-foreground">
                        {node.sub}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111622]/90 px-2 py-1.5 shadow-lg backdrop-blur sm:px-2.5 sm:py-2">
                    <Icon className={`size-3.5 shrink-0 sm:size-4 ${node.accent}`} />
                    <span className="hidden flex-col min-[420px]:flex">
                      <span className="text-[11px] leading-tight font-medium whitespace-nowrap">
                        {node.label}
                      </span>
                      <span className="text-[9px] leading-tight whitespace-nowrap text-muted-foreground">
                        {node.sub}
                      </span>
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: 'Tasks automated', value: '48,210' },
            { label: 'Avg. ROAS', value: '4.8x' },
            { label: 'Hours saved', value: '1,920' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2">
              <p className="font-display text-sm font-semibold sm:text-base">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground sm:text-[11px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        className="glass absolute -top-8 -left-6 hidden items-center gap-3 rounded-xl px-4 py-3 shadow-xl sm:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-400/15">
          <TrendingUp className="size-5 text-emerald-300" />
        </span>
        <span>
          <span className="block font-display text-lg leading-none font-semibold">+312%</span>
          <span className="text-xs text-muted-foreground">Ad engagement this month</span>
        </span>
      </motion.div>
    </div>
  )
}
