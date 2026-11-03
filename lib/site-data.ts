export type ProjectCategory = 'AI Ads' | 'Automation' | 'Workflow AI'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  summary: string
  description: string
  image: string
  metrics: { label: string; value: string }[]
  stack: string[]
  highlights: string[]
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Impact', href: '#impact' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
] as const

export const projects: Project[] = [
  {
    id: 'ecommerce-ad-pipeline',
    title: 'Automated E-Commerce Ad Pipeline',
    category: 'AI Ads',
    summary:
      'AI short-form video platform integration generating dynamic video creatives at scale.',
    description:
      'We connected a Shopify catalog to an AI short-form video generation platform, turning every product into a library of scroll-stopping video creatives. New SKUs trigger automated scripting, voiceover, and rendering, then ship straight to ad accounts for testing.',
    image: '/projects/ecommerce-ad-pipeline.png',
    metrics: [
      { label: 'Creatives / week', value: '1,200+' },
      { label: 'Lower CPA', value: '-42%' },
      { label: 'Production time', value: '-90%' },
    ],
    stack: ['Shopify API', 'AI Video Gen', 'n8n', 'Meta Ads API'],
    highlights: [
      'Catalog-driven creative generation per SKU',
      'Automated hook and script variants for A/B testing',
      'Direct publishing to Meta and TikTok ad accounts',
    ],
  },
  {
    id: 'invoice-automation',
    title: 'Enterprise Invoice & Document Automation',
    category: 'Automation',
    summary:
      'Automated document processing workflow on n8n with zero-data-loss validation.',
    description:
      'An end-to-end document pipeline that ingests invoices from email and cloud drives, extracts line items with AI, validates against purchase orders, and syncs approved records to the ERP with full audit trails and human-in-the-loop exception handling.',
    image: '/projects/invoice-automation.png',
    metrics: [
      { label: 'Docs / month', value: '25k' },
      { label: 'Accuracy', value: '99.7%' },
      { label: 'Manual work', value: '-85%' },
    ],
    stack: ['n8n', 'OCR + LLM', 'PostgreSQL', 'ERP Sync'],
    highlights: [
      'Multi-step validation with zero data loss',
      'Exception queue routed to finance via Slack',
      'Complete audit trail for compliance',
    ],
  },
  {
    id: 'lead-qualification-agent',
    title: 'AI Lead Qualification & CRM Sync Agent',
    category: 'Workflow AI',
    summary:
      'Multi-channel lead scoring, enrichment, and instant follow-up system.',
    description:
      'An AI agent that captures leads from forms, WhatsApp, and email, enriches them with firmographic data, scores intent in real time, and books qualified prospects directly on the sales calendar while keeping the CRM perfectly in sync.',
    image: '/projects/lead-qualification-agent.png',
    metrics: [
      { label: 'Response time', value: '< 60s' },
      { label: 'Qualified leads', value: '+3.2x' },
      { label: 'CRM accuracy', value: '100%' },
    ],
    stack: ['AI Agents', 'HubSpot', 'WhatsApp API', 'Clearbit'],
    highlights: [
      'Instant personalized follow-up across channels',
      'Intent scoring with automatic routing',
      'Self-booking for high-value prospects',
    ],
  },
  {
    id: 'ads-creative-engine',
    title: 'AI Ads Creative Engine',
    category: 'AI Ads',
    summary:
      'High-converting visual marketing workflow producing 9:16 short ads for every platform.',
    description:
      'A creative engine that turns a single brief into dozens of 9:16 short-form ads tailored for Reels, TikTok, and Shorts, with brand-safe visuals, auto captions, and performance feedback loops that retire losers and scale winners.',
    image: '/projects/ads-creative-engine.png',
    metrics: [
      { label: 'Engagement', value: '+310%' },
      { label: 'Platforms', value: '5' },
      { label: 'Turnaround', value: '24h' },
    ],
    stack: ['Gen AI Video', 'Brand Kits', 'Auto Captions', 'Analytics'],
    highlights: [
      'Brief-to-ads in under 24 hours',
      'Platform-native formats and safe zones',
      'Performance-driven creative iteration',
    ],
  },
]

export const projectFilters: ('All' | ProjectCategory)[] = [
  'All',
  'AI Ads',
  'Automation',
  'Workflow AI',
]

export const contactInfo = {
  email: 'apexailabs.official@gmail.com',
  whatsapp: '+92 317 2951022',
  whatsappHref: 'https://wa.me/923001234567',
  linkedin: 'linkedin.com/in/muhammad-anas-cyberpro',
  linkedinHref: 'https://linkedin.com/in/muhammad-anas-cyberpro',

}
