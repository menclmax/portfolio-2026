import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menclmax.com'

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
        url: `${baseUrl}/assets/og/OG-new.png`,
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
    images: [`${baseUrl}/assets/og/OG-new.png`],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
