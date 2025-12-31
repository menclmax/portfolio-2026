'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getProjectBySlug } from '@/data/projects'

export default function ProjectPage() {
  const params = useParams()
  const slug = params?.slug as string
  const project = getProjectBySlug(slug)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null)
  const authorSectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const whereItBeganRef = useRef<HTMLDivElement>(null)
  const detailImage2Ref = useRef<HTMLDivElement>(null)
  const designProcessRef = useRef<HTMLDivElement>(null)
  const researchRef = useRef<HTMLDivElement>(null)
  const ideationRef = useRef<HTMLDivElement>(null)
  const prototypingRef = useRef<HTMLDivElement>(null)
  const testingRef = useRef<HTMLDivElement>(null)
  const figmaPrototypeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
      
      // Check if scrolled past author section
      if (authorSectionRef.current) {
        const rect = authorSectionRef.current.getBoundingClientRect()
        setShowScrollTop(rect.bottom < 0)
      }

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 200 // Offset for better detection
      
      // Check subsections first (more specific)
      const subSections = [
        { ref: testingRef, id: 'testing' },
        { ref: prototypingRef, id: 'prototyping' },
        { ref: ideationRef, id: 'ideation' },
        { ref: researchRef, id: 'research' }
      ]

      for (const subSection of subSections) {
        if (subSection.ref.current) {
          const rect = subSection.ref.current.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection('designProcess')
            setActiveSubSection(subSection.id)
            return
          }
        }
      }

      // Check if in Design Process section (but not in a subsection)
      if (designProcessRef.current) {
        const rect = designProcessRef.current.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActiveSection('designProcess')
          setActiveSubSection(null)
          return
        }
      }
      
      // Check main sections (in order from bottom to top of page)
      const sections = [
        { ref: figmaPrototypeRef, id: 'figmaPrototype' },
        { ref: detailImage2Ref, id: 'features' },
        { ref: designProcessRef, id: 'designProcess' },
        { ref: whereItBeganRef, id: 'whereItBegan' },
        { ref: titleRef, id: 'overview' }
      ]

      // Check sections from bottom to top (most recent first)
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          // Check if scroll position is within the section bounds
          if (scrollPosition >= elementTop - 100 && scrollPosition < elementBottom) {
            setActiveSection(section.id)
            setActiveSubSection(null)
            return
          }
        }
      }
      
      // Default to overview if at top
      if (window.scrollY < 100) {
        setActiveSection('overview')
        setActiveSubSection(null)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 80
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight - 20 // 20px extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, mounted])

  if (!project) {
    return (
      <main className="min-h-screen transition-colors" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8">
          <p>Project not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen transition-colors" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between py-4 transition-colors w-full" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between relative px-6">
          {/* Logo */}
          <Link href="/" className="block">
            <img 
              src="/assets/Signeture.svg" 
              alt="Logo" 
              className="h-8 w-auto"
              style={{
                filter: isDark ? 'brightness(0) invert(1)' : 'none'
              }}
            />
          </Link>

          {/* Navigation - Centered */}
          <nav className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/" 
              className={`px-3 py-1.5 rounded text-xs font-medium hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              About
            </Link>
            <Link 
              href="/projects" 
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Projects
            </Link>
            <Link 
              href="/ventures" 
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Ventures
            </Link>
            <Link 
              href="/#contact" 
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Theme Toggle - Right */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8 pt-24 relative">
        {/* Fixed Sidebar Menu */}
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <nav className="space-y-4">
            {project.title && (
              <button
                onClick={() => scrollToSection(titleRef)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'overview' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Overview
              </button>
            )}
            {project.detailImageSection && (
              <button
                onClick={() => scrollToSection(whereItBeganRef)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'whereItBegan' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Where It All Began
              </button>
            )}
            {designProcessRef.current && (
              <div>
                <button
                  onClick={() => scrollToSection(designProcessRef)}
                  className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                    activeSection === 'designProcess' 
                      ? (isDark ? 'text-white' : 'text-black') 
                      : (isDark ? 'text-gray-400' : 'text-gray-600')
                  }`}
                >
                  Design Process
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeSection === 'designProcess' 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 space-y-3 mt-2">
                    {researchRef.current && (
                      <button
                        onClick={() => scrollToSection(researchRef)}
                        className={`block text-sm hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                          activeSubSection === 'research' 
                            ? (isDark ? 'text-white' : 'text-black') 
                            : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}
                      >
                        Research
                      </button>
                    )}
                    {ideationRef.current && (
                      <button
                        onClick={() => scrollToSection(ideationRef)}
                        className={`block text-sm hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                          activeSubSection === 'ideation' 
                            ? (isDark ? 'text-white' : 'text-black') 
                            : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}
                      >
                        Ideation
                      </button>
                    )}
                    {prototypingRef.current && (
                      <button
                        onClick={() => scrollToSection(prototypingRef)}
                        className={`block text-sm hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                          activeSubSection === 'prototyping' 
                            ? (isDark ? 'text-white' : 'text-black') 
                            : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}
                      >
                        Prototyping
                      </button>
                    )}
                    {testingRef.current && (
                      <button
                        onClick={() => scrollToSection(testingRef)}
                        className={`block text-sm hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                          activeSubSection === 'testing' 
                            ? (isDark ? 'text-white' : 'text-black') 
                            : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}
                      >
                        Testing
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {project.detailImage2 && (
              <button
                onClick={() => scrollToSection(detailImage2Ref)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'features' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Features
              </button>
            )}
            {project.designProcess?.figmaEmbed && (
              <button
                onClick={() => scrollToSection(figmaPrototypeRef)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'figmaPrototype' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Figma Prototype
              </button>
            )}
          </nav>
        </div>

        {/* Project Content */}
        <article>
          {/* Back Arrow and Visit Project */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className={`inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </Link>
            {project.projectUrl && (
              <Link 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm underline hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
              >
                Visit Project
              </Link>
            )}
          </div>

          {/* Title */}
          <h1 ref={titleRef} className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {project.title}
          </h1>

          {/* Description */}
          {project.fullDescription && (
            <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {project.fullDescription}
            </p>
          )}

          {/* Author Block */}
          {(project.author || project.role) && (
            <div ref={authorSectionRef} className="flex items-center gap-4" style={{ marginBottom: '96px' }}>
              <Link href="/" className="flex items-center gap-4 flex-1 hover:opacity-70 transition-opacity">
                {/* Profile Picture */}
                <img 
                  src="/assets/profile.jpg" 
                  alt={project.author || 'Profile'}
                  className="w-12 h-12 object-cover"
                  style={{ borderRadius: '15px' }}
                />
                <div className="flex-1">
                  {project.author && (
                    <p className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {project.author}
                    </p>
                  )}
                  {project.role && (
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.role}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          )}

          {/* About the Project */}
          {project.about && (
            <div ref={aboutRef} className="space-y-4" style={{ marginBottom: '64px' }}>
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                About the Project
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.about}
              </p>
              {project.aboutImage && (
                <div style={{ marginTop: '48px' }}>
                  <div 
                    className="p-4 rounded-lg"
                    style={{
                      border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                      backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                    }}
                  >
                    <img 
                      src={project.aboutImage} 
                      alt={project.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  {project.aboutImageDescription && (
                    <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.aboutImageDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Detail Image */}
          {project.detailImage && (
            <div className="mb-8">
              <div 
                className="p-4 rounded-lg"
                style={{
                  border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                  backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                }}
              >
                <img 
                  src={project.detailImage} 
                  alt={project.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {project.detailImageDescription ? (
                <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ marginBottom: '64px' }}>
                  {project.detailImageDescription}
                </p>
              ) : (
                <div style={{ marginBottom: '64px' }}></div>
              )}
              
              {/* Detail Image Section */}
              {project.detailImageSection && (
                <div ref={whereItBeganRef} className="mt-8 space-y-4" style={{ marginBottom: '64px' }}>
                  <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {project.detailImageSection.title}
                  </h2>
                  <p className={`text-base leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ marginBottom: '64px' }}>
                    {project.detailImageSection.text}
                  </p>
                  <div>
                    <div 
                      className="p-4 rounded-lg"
                      style={{
                        border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                        backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                      }}
                    >
                      <img 
                        src="/assets/1734032789373.jpeg" 
                        alt={project.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      HSiF Pitching Contest
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Design Process */}
          <div ref={designProcessRef} style={{ marginBottom: '64px' }}>
            <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Design Process
            </h2>
            
            {project.designProcess?.introduction && (
              <p 
                className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: project.designProcess.introduction }}
              />
            )}
            
            {/* Research */}
            <div ref={researchRef} style={{ marginBottom: '64px' }}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Research
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.designProcess?.research || 'To understand the root causes of campus fragmentation, I initiated the Discovery phase with a mix of qualitative and quantitative research. I conducted user interviews and surveys with students across various faculties to map their pain points. The research revealed a critical \'information overload\'—students were juggling multiple platforms for news, events, and networking. This insight shifted our focus from simply adding features to centralizing the ecosystem, ensuring that the MVP solved the actual problem of mental friction and missed opportunities.'}
              </p>
            </div>

            {/* Ideation */}
            <div ref={ideationRef} style={{ marginBottom: '64px' }}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Ideation
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.designProcess?.ideation || 'Ideation content will go here...'}
              </p>
            </div>

            {/* Prototyping */}
            <div ref={prototypingRef} style={{ marginBottom: '64px' }}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Prototyping
              </h3>
              {project.designProcess?.prototyping ? (
                <div className="space-y-8">
                  {project.designProcess.prototyping.split('[IMAGE:').map((part, index) => {
                    if (index === 0) {
                      return (
                        <div 
                          key={index}
                          className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                          dangerouslySetInnerHTML={{ __html: part }}
                        />
                      )
                    }
                    const [imageInfo, ...rest] = part.split(']')
                    const [imageName, description] = imageInfo.split('|')
                    const imagePath = `/assets/${imageName}`
                    const remainingText = rest.join(']')
                    return (
                      <div key={index}>
                        <div className="mt-8 mb-8">
                          <div 
                            className="p-4 rounded-lg"
                            style={{
                              border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                              backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                            }}
                          >
                            <img 
                              src={imagePath} 
                              alt={description || `Prototyping ${index}`}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                          {description && (
                            <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {description}
                            </p>
                          )}
                        </div>
                        {remainingText && (
                          <div 
                            className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                            dangerouslySetInnerHTML={{ __html: remainingText }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Prototyping content will go here...
                </p>
              )}
            </div>

            {/* Testing */}
            <div ref={testingRef} style={{ marginBottom: '64px' }}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                Testing
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.designProcess?.testing || 'Testing content will go here...'}
              </p>
            </div>
          </div>

          {/* Figma Prototype */}
          {project.designProcess?.figmaEmbed && (
            <div ref={figmaPrototypeRef} style={{ marginBottom: '64px' }}>
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Figma Prototype
              </h2>
              <div 
                className="p-4 rounded-lg"
                style={{
                  border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                  backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                }}
              >
                <iframe
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    height: '450px',
                    borderRadius: '0.5rem'
                  }}
                  src={project.designProcess.figmaEmbed}
                  allowFullScreen
                  title="Figma Design"
                />
              </div>
              <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive Figma prototype - drag to explore the design
              </p>
            </div>
          )}

          {/* Detail Image 2 */}
          {project.detailImage2 && (
            <div ref={detailImage2Ref} className="mb-8">
              <div 
                className="p-4 rounded-lg"
                style={{
                  border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                  backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9'
                }}
              >
                <img 
                  src={project.detailImage2} 
                  alt={project.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {project.detailImage2Description ? (
                <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ marginBottom: '64px' }}>
                  {project.detailImage2Description}
                </p>
              ) : (
                <div style={{ marginBottom: '64px' }}></div>
              )}
            </div>
          )}
        </article>
        
        {/* Scroll to Top Arrow */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity z-50 ${isDark ? 'bg-[#1a1a1a] border border-[#232323]' : 'bg-white border border-gray-300'}`}
            aria-label="Scroll to top"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={isDark ? '#ffffff' : '#000000'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        )}
      </div>
    </main>
  )
}

