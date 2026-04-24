import type { Metadata } from 'next'
import { Unbounded, DM_Mono } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-unbounded',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STOLEY — Electronic Music Artist & DJ',
  description: 'House and electronic music producer and DJ. Releases on Catch & Release Records and beyond.',
  openGraph: {
    title: 'STOLEY',
    description: 'Electronic music artist & DJ. House · Dance · Rhythm.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${dmMono.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
