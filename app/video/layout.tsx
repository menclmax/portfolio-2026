import type { Metadata } from 'next'
import { VideoNavbar } from '@/components/VideoNavbar'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menclmax.com'

export const metadata: Metadata = {
  title: 'Video',
  description: 'Video portfolio - Max Mencl',
  openGraph: {
    title: 'Video | Max Mencl',
    description: 'Video portfolio - Max Mencl',
    url: `${baseUrl}/video`,
    siteName: 'Max Mencl',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video | Max Mencl',
    description: 'Video portfolio - Max Mencl',
  },
}

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen transition-colors overflow-x-hidden w-full" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <VideoNavbar />
      <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-8 pt-20 md:pt-8">
        {children}
      </div>
    </div>
  )
}
