import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { CustomCursor } from '@/components/site/custom-cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Apex AI Labs | AI Video Ads, Workflow Automation & AI Agents',
  description:
    'Apex AI Labs builds next-gen AI video ads, n8n workflow automations, and custom AI agents that scale revenue and cut manual work for modern businesses.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/fav-iconv2.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/fav-iconv2.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/fav-iconv2.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/fav-iconv2.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#0A0D14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} overflow-x-hidden`}
    >
      <body className="overflow-x-hidden antialiased">
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
          {children}
        </div>
        <CustomCursor />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}