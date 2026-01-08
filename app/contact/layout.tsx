import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxmencl.com'

export const metadata: Metadata = {
  title: 'Contact - Max Mencl',
  description: 'Get in touch with Max Mencl, a UX Designer in The Netherlands. Reach out for business inquiries or connect on social platforms.',
  openGraph: {
    title: 'Contact - Max Mencl',
    description: 'Get in touch with Max Mencl, a UX Designer in The Netherlands.',
    url: '/contact',
    siteName: 'Max Mencl Portfolio',
    images: [
      {
        url: '/assets/og/og-picture.png',
        width: 1200,
        height: 630,
        alt: 'Max Mencl - Contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Max Mencl',
    description: 'Get in touch with Max Mencl, a UX Designer in The Netherlands.',
    images: ['/assets/og/og-picture.png'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
