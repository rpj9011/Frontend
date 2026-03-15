import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RJ | Premium Digital Agency for Growth-Focused Companies',
  description: 'Production-grade web development and performance marketing for ambitious businesses. We deliver measurable ROI through custom websites, e-commerce platforms, SEO, and data-driven campaigns. Trusted by 6+ companies across India.',
  keywords: [
    'digital agency India',
    'web development company',
    'performance marketing',
    'SEO services',
    'e-commerce development',
    'custom web applications',
    'digital marketing agency',
    'brand strategy',
    'conversion optimization',
  ],
  authors: [{ name: 'Agency K' }],
  creator: 'Agency K',
  publisher: 'Agency K',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Agency K | Premium Digital Agency',
    description: 'Production-grade web development and performance marketing that drives revenue. 6+ projects delivered, 98% client retention.',
    siteName: 'Agency K',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agency K - Premium Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency K | Premium Digital Agency',
    description: 'Production-grade web development and performance marketing that drives revenue.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E10600" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-brand-black`}>
        {children}
      </body>
    </html>
  )
}
