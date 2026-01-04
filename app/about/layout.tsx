import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxmencl.com'

export const metadata: Metadata = {
  title: 'About - Max Mencl',
  description: 'Learn more about Max Mencl, a UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces.',
  openGraph: {
    title: 'About - Max Mencl',
    description: 'Learn more about Max Mencl, a UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces.',
    url: '/about',
    siteName: 'Max Mencl Portfolio',
    images: [
      {
        url: '/assets/Signeture.svg',
        width: 1200,
        height: 630,
        alt: 'Max Mencl - About',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Max Mencl',
    description: 'Learn more about Max Mencl, a UX Designer in The Netherlands.',
    images: ['/assets/Signeture.svg'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
