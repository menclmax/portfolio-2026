import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxmencl.com'

export const metadata: Metadata = {
  title: 'Ventures - Max Mencl',
  description: 'Discover the ventures and entrepreneurial projects by Max Mencl, UX Designer and Co-Founder.',
  openGraph: {
    title: 'Ventures - Max Mencl',
    description: 'Discover the ventures and entrepreneurial projects by Max Mencl, UX Designer and Co-Founder.',
    url: '/ventures',
    siteName: 'Max Mencl Portfolio',
    images: [
      {
        url: `${baseUrl}/assets/og/OG-new.png`,
        width: 1200,
        height: 630,
        alt: 'Max Mencl - Ventures',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ventures - Max Mencl',
    description: 'Discover the ventures and entrepreneurial projects by Max Mencl.',
    images: [`${baseUrl}/assets/og/OG-new.png`],
  },
}

export default function VenturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
