export type ProjectCategory = 'AI Ads' | 'Automation' | 'Workflow AI'

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  videoUrl?: string; // HTML5 / MP4 / Drive preview link
  embedVideoUrl?: string; // Loom / YouTube / Vimeo iframe link
  metrics: { label: string; value: string }[];
  stack: string[];
  highlights: string[];
  caseStudy?: {
    problem: string;
    solution: string;
    architecture?: string[];
    results: string[];
  };
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
    id: 'ai-invoice-manager',
    title: 'AI Invoice Manager',
    category: 'Automation',
    summary:
      'n8n workflow that reads invoices from Gmail, extracts the data with AI and logs it to Excel automatically.',
    description:
      'An end-to-end invoice pipeline built on n8n. It watches Gmail for invoice attachments (PDF, JPG, PNG, WebP), reads text directly or with Claude vision OCR for scans and photos, extracts key fields with GPT-4o, validates every value against the source document, blocks duplicates, converts foreign currencies to PKR at the invoice-date rate, and appends a structured row to Excel. A separate error-alert workflow emails the team if any run fails.',
    image: '/projects/invoice-auto.jfif',
    videoUrl: 'https://drive.google.com/file/d/1H3JsGVr64N7fXzC3NwKvOWaxpuT4Wv3W/view?usp=sharing',
    metrics: [
      { label: 'Pipeline steps', value: '5' },
      { label: 'File formats', value: '4' },
      { label: 'Excel fields', value: '12' },
    ],
    stack: ['n8n', 'GPT-4o', 'Claude Vision', 'Gmail', 'Excel'],
    highlights: [
      'Scans, photos and PDFs handled with automatic OCR fallback',
      'Fact-check and duplicate protection before any row is saved',
      'Doubtful invoices flagged "Needs Review" with the exact reason',
    ],
    caseStudy: {
      problem:
        'Manual invoice entry from emails was error-prone, missed multi-currency calculations, and consumed 15+ hours weekly.',
      solution:
        'Automated n8n agent parsing raw attachments, running AI validation, handling fallback OCR, and outputting clean Excel rows in real-time.',
      architecture: [
        'Gmail Webhook Listener',
        'MIME Type Router & Vision OCR',
        'GPT-4o Extraction Engine',
        'Forex Rate API & Excel Writer',
      ],
      results: [
        '100% automated extraction accuracy',
        'Zero duplicate rows logged',
        'Instant PKR currency conversion at invoice-date rate',
      ],
    },
  },

  // ------------------- 1. AI UGC ADS CARD -------------------
  {
    id: 'ai-ugc-ads-engine',
    title: 'AI UGC Video Ads Engine',
    category: 'AI Ads',
    summary:
      'Conversion-focused UGC video ad workflow generating authentic short-form creators for TikTok, Reels & Shorts.',
    description:
      'An automated AI production engine designed for direct-response marketing. It generates realistic AI avatars, authentic script hooks, voiceovers, auto-captions, and product overlays in 9:16 vertical format for high-converting social campaigns.',
    image: '/projects/ecommerce-ad-pipeline.png',
    videoUrl: 'https://drive.google.com/file/d/1FyVJoZgNJ9A_fShB0m3e0BvFK11TNmIA/view?usp=drive_link', // Local MP4 ya Drive link
    metrics: [
      { label: 'Ad Format', value: '9:16' },
      { label: 'Hook Variants', value: '5+' },
      { label: 'Turnaround', value: '24h' },
    ],
    stack: ['AI Voiceovers', 'Auto Captions', 'Direct Response Prompts', 'CapCut API'],
    highlights: [
      'Script hook generation tailored for high scroll-stopping rates',
      'Platform-native vertical formats with safe-zone captions',
      'Rapid iteration of winning UGC hooks without expensive creator fees',
    ],
    caseStudy: {
      problem:
        'Hiring creators and video editors for UGC ads required heavy budget upfront with slow turnarounds and uncertain ad performance.',
      solution:
        'End-to-end AI workflow that turns ad copy briefs into high-converting UGC style video ads within 24 hours.',
      results: [
        'Massively reduced ad production cost',
        'Scalable creative testing for TikTok and Instagram Reels',
      ],
    },
  },

  // ------------------- 2. BRAND VISUAL ADS CARD (Pie In The Sky style) -------------------
  {
    id: 'ai-brand-commercials',
    title: 'Cinematic AI Brand Ads',
    category: 'AI Ads',
    summary:
      'High-end visual marketing & promotional ad workflow for premium food, retail, and lifestyle brands.',
    description:
      'A cinematic creative pipeline engineered for high-impact brand commercials (like Pie In The Sky). It generates studio-grade visual shots, hyper-realistic product motion, dynamic color grading, and ambient sound design tailored for commercial ad campaigns.',
    image: '/projects/ads-creative-engine.png',
    videoUrl: 'https://drive.google.com/file/d/1Dk0kex9n39lvvy0xu8rAWLlZiUF42qNw/view?usp=sharing', // Pie In The Sky ad video path
    metrics: [
      { label: 'Visual Quality', value: '4K HDR' },
      { label: 'Production Cost', value: '-80%' },
      { label: 'Ad Format', value: 'Brand Ads' },
    ],
    stack: ['Google Flow', 'Gen AI Video', 'Cinematic Sound Design', 'Color Grading'],
    highlights: [
      'Studio-grade product visuals without expensive physical shoots',
      'Custom cinematic lighting, camera movement, and slow-motion FX',
      'Tailored for food, e-commerce, and luxury brand commercials',
    ],
    caseStudy: {
      problem:
        'High-end commercial ad production required studio rentals, expensive cameras, lighting setups, and multi-week post-production.',
      solution:
        'Generative AI video workflow crafting commercial-grade visuals and motion graphics in a fraction of the traditional budget.',
      results: [
        'Studio-quality commercial video delivery in days',
        'Rich cinematic visuals tailored for social media & TV broadcast',
      ],
    },
  },
];
export const projectFilters: ('All' | ProjectCategory)[] = [
  'All',
  'AI Ads',
  'Automation',
]

export const contactInfo = {
  email: 'apexailabs.official@gmail.com',
  whatsapp: '+92 312 0280904',
  whatsappHref: 'https://wa.me/923120280904',
  linkedin: 'linkedin.com/in/muhammad-anas-cyberpro',
  linkedinHref: 'https://linkedin.com/in/muhammad-anas-cyberpro',

}
