import type { Metadata } from 'next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxmencl.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Max Mencl - UX Designer Portfolio',
  description: 'UX Designer in The Netherlands building clean, functional, and aesthetically honest interfaces. Guided by the principles of Dutch Design, I strip away the noise to focus on what matters: creating seamless digital paths that feel as good as they look.',
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
        url: '/assets/Signeture.svg',
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
    images: ['/assets/Signeture.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Signeture.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Metal&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
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

