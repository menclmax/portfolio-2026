import type { Metadata } from 'next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menclmax.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Max Mencl - UX Designer Portfolio',
    template: '%s | Max Mencl',
  },
  description: 'UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces. Guided by the principles of Dutch Design, I strip away the noise to focus on what matters: creating seamless digital paths that feel as good as they look.',
  keywords: ['UX Designer', 'User Experience', 'Portfolio', 'Netherlands', 'Dutch Design', 'UI/UX', 'Design', 'Max Mencl'],
  authors: [{ name: 'Max Mencl' }],
  creator: 'Max Mencl',
  publisher: 'Max Mencl',
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
  icons: {
    icon: '/assets/Signeture.svg',
  },
  openGraph: {
    title: 'Max Mencl - UX Designer Portfolio',
    description: 'UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces. Guided by the principles of Dutch Design.',
    url: baseUrl,
    siteName: 'Max Mencl Portfolio',
    images: [
      {
        url: `${baseUrl}/assets/og/OG-new.png`,
        width: 1200,
        height: 630,
        alt: 'Max Mencl - UX Designer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Max Mencl - UX Designer Portfolio',
    description: 'UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces.',
    images: [`${baseUrl}/assets/og/OG-new.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data (JSON-LD) for Person/Portfolio
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Max Mencl',
    jobTitle: 'UX Designer',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressLocality: 'The Netherlands',
    },
    url: baseUrl,
    sameAs: [
      // Add your social media profiles here when available
      // 'https://linkedin.com/in/yourprofile',
      // 'https://twitter.com/yourhandle',
    ],
    knowsAbout: ['UX Design', 'User Experience', 'UI Design', 'Dutch Design', 'Product Design'],
    description: 'UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces.',
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Signeture.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Metal&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Add verification meta tags here when needed */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

