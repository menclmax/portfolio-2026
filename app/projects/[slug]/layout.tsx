import type { Metadata } from 'next'
import { getProjectBySlug } from '@/data/projects'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found - Max Mencl',
    }
  }

  // Use relative URL - metadataBase from root layout will resolve it
  const projectImage = project.image.startsWith('http') 
    ? project.image 
    : project.image

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
