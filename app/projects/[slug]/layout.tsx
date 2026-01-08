import type { Metadata } from 'next'
import { getProjectBySlug } from '@/data/projects'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://menclmax.com'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found - Max Mencl',
    }
  }

  // Construct absolute URL for OpenGraph images
  // External URLs (http/https) are used as-is, relative paths are made absolute
  const projectImage = project.image.startsWith('http') 
    ? project.image 
    : `${baseUrl}${project.image.startsWith('/') ? project.image : `/${project.image}`}`

  return {
    title: `${project.title} - Max Mencl`,
    description: project.fullDescription || project.description,
    openGraph: {
      title: `${project.title} - Max Mencl`,
      description: project.fullDescription || project.description,
      url: `/projects/${project.slug}`,
      siteName: 'Max Mencl Portfolio',
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Max Mencl`,
      description: project.fullDescription || project.description,
      images: [projectImage],
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
