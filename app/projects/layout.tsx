import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Max Mencl',
  description: 'Explore the portfolio of Max Mencl - UX Designer projects including Campus Connext, LLO Caribbean, and more innovative digital solutions.',
  openGraph: {
    title: 'Projects - Max Mencl',
    description: 'Explore the portfolio of Max Mencl - UX Designer projects including Campus Connext, LLO Caribbean, and more innovative digital solutions.',
    url: '/projects',
    siteName: 'Max Mencl Portfolio',
    images: [
      {
        url: '/assets/og/og-picture.png',
        width: 1200,
        height: 630,
        alt: 'Max Mencl - Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Max Mencl',
    description: 'Explore the portfolio of Max Mencl - UX Designer projects.',
    images: ['/assets/og/og-picture.png'],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
