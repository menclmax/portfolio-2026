'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProjectBySlug } from '@/data/projects'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const project = getProjectBySlug(slug)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
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
  const reflectionRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
      
      // Calculate scroll progress for mobile reading progress bar
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
      
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
        { ref: testimonialsRef, id: 'testimonials' },
        { ref: reflectionRef, id: 'reflection' },
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

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Close mobile menu on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    // Prevent body scroll when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }
  
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

  // Reset carousel when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [slug])

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!project?.aboutImages || project.aboutImages.length <= 1) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev === 0 ? project.aboutImages!.length - 1 : prev - 1
        )
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev === project.aboutImages!.length - 1 ? 0 : prev + 1
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project?.aboutImages])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, mounted])

  // Update tooltip positions on scroll for mobile
  useEffect(() => {
    if (!mounted || !isMobile) return

    const handleScroll = () => {
      const tooltipGroups = document.querySelectorAll('.design-process-tooltip-group')
      tooltipGroups.forEach(group => {
        const textTooltip = group.querySelector('.design-process-tooltip') as HTMLElement
        const imageTooltip = group.querySelector('.design-process-image-tooltip') as HTMLElement
        
        // Only update if tooltip is visible (opacity > 0)
        if (textTooltip && parseFloat(textTooltip.style.opacity) > 0) {
          const rect = group.getBoundingClientRect()
          const screenCenterX = window.innerWidth / 2
          textTooltip.style.left = `${screenCenterX}px`
          textTooltip.style.top = `${rect.top - 8}px`
        }
        
        if (imageTooltip && parseFloat(imageTooltip.style.opacity) > 0) {
          const rect = group.getBoundingClientRect()
          const screenCenterX = window.innerWidth / 2
          imageTooltip.style.left = `${screenCenterX}px`
          imageTooltip.style.top = `${rect.top - 8}px`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted, isMobile])

  // Enhance tooltips with dynamic positioning and animations
  useEffect(() => {
    if (!mounted) return

    const handleMouseEnter = (e: Event) => {
      const group = e.currentTarget as HTMLElement
      const textTooltip = group.querySelector('.design-process-tooltip') as HTMLElement
      const imageTooltip = group.querySelector('.design-process-image-tooltip') as HTMLElement
      
      // Check if mobile viewport (width < 768px)
      const isMobileViewport = window.innerWidth < 768
      const rect = group.getBoundingClientRect()
      
      if (textTooltip) {
        textTooltip.style.position = 'fixed'
        if (isMobileViewport) {
          // Mobile: center horizontally, position vertically near text
          const screenCenterX = window.innerWidth / 2
          textTooltip.style.left = `${screenCenterX}px`
          textTooltip.style.top = `${rect.top - 8}px`
          textTooltip.style.transform = 'translate(-50%, -100%) scale(1)'
        } else {
          // Desktop: position relative to trigger
          textTooltip.style.left = `${rect.left + rect.width / 2}px`
          textTooltip.style.top = `${rect.top - 8}px`
          textTooltip.style.transform = 'translate(-50%, -100%) scale(1)'
        }
        textTooltip.style.opacity = '1'
        textTooltip.style.zIndex = '1000'
      }
      
      if (imageTooltip) {
        imageTooltip.style.position = 'fixed'
        
        if (isMobileViewport) {
          // Mobile: center horizontally, position vertically near text
          const screenCenterX = window.innerWidth / 2
          imageTooltip.style.left = `${screenCenterX}px`
          imageTooltip.style.top = `${rect.top - 8}px`
          imageTooltip.style.bottom = 'auto'
          imageTooltip.style.right = 'auto'
          imageTooltip.style.transform = 'translate(-50%, -100%) scale(1)'
        } else {
          // Desktop: position relative to trigger
          const centerX = rect.left + rect.width / 2
          imageTooltip.style.left = `${centerX}px`
          imageTooltip.style.top = `${rect.top - 8}px`
          imageTooltip.style.bottom = 'auto'
          imageTooltip.style.right = 'auto'
          imageTooltip.style.transform = 'translate(-50%, -100%) scale(1)'
        }
        
        imageTooltip.style.opacity = '1'
        imageTooltip.style.zIndex = '1000'
      }
    }

    const handleMouseLeave = (e: Event) => {
      const group = e.currentTarget as HTMLElement
      const textTooltip = group.querySelector('.design-process-tooltip') as HTMLElement
      const imageTooltip = group.querySelector('.design-process-image-tooltip') as HTMLElement
      
      if (textTooltip) {
        textTooltip.style.opacity = '0'
        textTooltip.style.transform = 'translate(-50%, calc(-100% + 8px)) scale(0.95)'
      }
      
      if (imageTooltip) {
        imageTooltip.style.opacity = '0'
        imageTooltip.style.transform = 'translate(-50%, calc(-100% + 8px)) scale(0.95)'
      }
    }

    const enhanceTooltips = () => {
      const tooltipGroups = document.querySelectorAll('.design-process-tooltip-group')
      
      tooltipGroups.forEach(group => {
        const textTooltip = group.querySelector('.design-process-tooltip') as HTMLElement
        const imageTooltip = group.querySelector('.design-process-image-tooltip') as HTMLElement
        
        if (!(group as any).__tooltipEnhanced) {
          if (textTooltip) {
            // Update text tooltip styles to match homepage
            textTooltip.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
            textTooltip.style.opacity = '0'
            textTooltip.style.transform = 'translate(-50%, calc(-100% + 8px)) scale(0.95)'
            textTooltip.style.zIndex = '100'
            textTooltip.style.position = 'fixed'
          }
          
          if (imageTooltip) {
            // Update image tooltip styles - positioned above
            imageTooltip.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
            imageTooltip.style.opacity = '0'
            imageTooltip.style.transform = 'translate(-50%, calc(-100% + 8px)) scale(0.95)'
            imageTooltip.style.zIndex = '100'
            imageTooltip.style.position = 'fixed'
          }
          
          if (textTooltip || imageTooltip) {
            // Add hover handlers for both desktop and mobile (mobile browsers support hover on tap)
            group.addEventListener('mouseenter', handleMouseEnter)
            group.addEventListener('mouseleave', handleMouseLeave)
            // Also add touch handlers for better mobile support
            if (isMobile) {
              group.addEventListener('touchstart', handleMouseEnter)
              group.addEventListener('touchend', handleMouseLeave)
            }
            
            // Mark as enhanced to avoid duplicate listeners
            ;(group as any).__tooltipEnhanced = true
          }
        }
      })
    }

    // Wait for content to be rendered, then enhance tooltips
    const timeoutId = setTimeout(enhanceTooltips, 200)
    
    // Also use MutationObserver to catch dynamically added content
    const observer = new MutationObserver(() => {
      enhanceTooltips()
    })
    
    const mainContent = document.querySelector('main')
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
      // Clean up event listeners
      const tooltipGroups = document.querySelectorAll('.design-process-tooltip-group')
      tooltipGroups.forEach(group => {
        group.removeEventListener('mouseenter', handleMouseEnter)
        group.removeEventListener('mouseleave', handleMouseLeave)
        group.removeEventListener('touchstart', handleMouseEnter)
        group.removeEventListener('touchend', handleMouseLeave)
        ;(group as any).__tooltipEnhanced = false
      })
    }
  }, [mounted, isMobile, project])

  // Function to add flag icons before university names and hyperlinks
  const renderAboutWithFlags = (text: string) => {
    const universityFlags: { [key: string]: { code: string, name: string, url: string } } = {
      'The Hague University of Applied Sciences': { code: 'nl', name: 'Netherlands', url: 'https://www.thehagueuniversity.com/' },
      'Utrecht University': { code: 'nl', name: 'Netherlands', url: 'https://www.uu.nl/en' },
      'University of Curaçao': { code: 'cw', name: 'Curaçao', url: 'https://www.uoc.cw/' },
      'University of Aruba': { code: 'aw', name: 'Aruba', url: 'https://www.ua.aw/' }
    }

    let processedText = text
    const flagImg = (code: string, name: string) => 
      `<img src="https://hatscripts.github.io/circle-flags/flags/${code}.svg" alt="${name} flag" style="width: 1rem; height: 1rem; border-radius: 50%; vertical-align: middle; display: inline; margin-right: 0.375rem;" />`
    
    const createLink = (university: string, content: string) => {
      const universityData = universityFlags[university]
      if (!universityData) return content
      return `<a href="${universityData.url}" target="_blank" rel="noopener noreferrer" class="university-link">${content}</a>`
    }
    
    // First, handle cases where "the" appears before University of Curaçao/Aruba
    // This ensures the flag appears before "the" and wraps the whole phrase in a link
    const flagCw = universityFlags['University of Curaçao']
    const flagAw = universityFlags['University of Aruba']
    
    // Match "the University of Curaçao" and place flag before "the", wrap in link
    processedText = processedText.replace(/\bthe\s+University of Curaçao/gi, (match, offset) => {
      const beforeMatch = processedText.substring(0, offset)
      const openTags = (beforeMatch.match(/<a[^>]*>/g) || []).length
      const closeTags = (beforeMatch.match(/<\/a>/g) || []).length
      if (openTags > closeTags) return match
      
      const flag = flagImg(flagCw.code, flagCw.name)
      return flag + createLink('University of Curaçao', match)
    })
    
    // Match "the University of Aruba" and place flag before "the", wrap in link
    processedText = processedText.replace(/\bthe\s+University of Aruba/gi, (match, offset) => {
      const beforeMatch = processedText.substring(0, offset)
      const openTags = (beforeMatch.match(/<a[^>]*>/g) || []).length
      const closeTags = (beforeMatch.match(/<\/a>/g) || []).length
      if (openTags > closeTags) return match
      
      const flag = flagImg(flagAw.code, flagAw.name)
      return flag + createLink('University of Aruba', match)
    })
    
    // Handle "University of Curaçao" and "University of Aruba" without "the"
    // Note: These will be skipped if already inside a link (from "the University of..." above)
    processedText = processedText.replace(/\bUniversity of Curaçao\b/gi, (match, offset) => {
      const beforeMatch = processedText.substring(0, offset)
      const openTags = (beforeMatch.match(/<a[^>]*>/g) || []).length
      const closeTags = (beforeMatch.match(/<\/a>/g) || []).length
      // Skip if already inside an anchor tag (would be the case if "the University of Curaçao" was processed)
      if (openTags > closeTags) return match
      
      const flag = flagImg(flagCw.code, flagCw.name)
      return flag + createLink('University of Curaçao', match)
    })
    
    processedText = processedText.replace(/\bUniversity of Aruba\b/gi, (match, offset) => {
      const beforeMatch = processedText.substring(0, offset)
      const openTags = (beforeMatch.match(/<a[^>]*>/g) || []).length
      const closeTags = (beforeMatch.match(/<\/a>/g) || []).length
      // Skip if already inside an anchor tag (would be the case if "the University of Aruba" was processed)
      if (openTags > closeTags) return match
      
      const flag = flagImg(flagAw.code, flagAw.name)
      return flag + createLink('University of Aruba', match)
    })
    
    // Then process all other university names (in reverse order to handle longer names first)
    const universities = Object.keys(universityFlags)
    universities.sort((a, b) => b.length - a.length).forEach(university => {
      // Skip University of Curaçao/Aruba as they're handled above
      if (university === 'University of Curaçao' || university === 'University of Aruba') return
      
      const flag = universityFlags[university]
      // Create a regex that matches the university name (case-insensitive)
      // Use a function to check if we're inside HTML before replacing
      const regex = new RegExp(`\\b${university.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      processedText = processedText.replace(regex, (match, offset) => {
        // Skip if already inside HTML (already processed)
        const beforeMatch = processedText.substring(0, offset)
        const openTags = (beforeMatch.match(/<a[^>]*>/g) || []).length
        const closeTags = (beforeMatch.match(/<\/a>/g) || []).length
        const openSpans = (beforeMatch.match(/<span[^>]*>/g) || []).length
        const closeSpans = (beforeMatch.match(/<\/span>/g) || []).length
        // Skip if already inside an anchor tag or span
        if (openTags > closeTags || openSpans > closeSpans) return match
        
        const flagIcon = flagImg(flag.code, flag.name)
        return flagIcon + createLink(university, match)
      })
    })

    return processedText
  }

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
    <main className="min-h-screen transition-colors overflow-x-hidden w-full" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="fixed md:sticky top-0 z-[120] flex items-center justify-between py-4 transition-colors w-full overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
        {/* Mobile Reading Progress Bar - Bottom border of header */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px] z-[121] md:hidden"
          style={{ 
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
          }}
        >
          <div 
            className="h-full transition-all duration-150 ease-out"
            style={{ 
              width: `${scrollProgress}%`,
              backgroundColor: isDark ? '#ffffff' : '#000000'
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between relative px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="block" onClick={handleNavClick}>
            <img 
              src="/assets/Signeture.svg" 
              alt="Logo" 
              className="h-8 w-auto"
              style={{
                filter: isDark ? 'brightness(0) invert(1)' : 'none'
              }}
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
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

          {/* Mobile Menu Button & Theme Toggle Container */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle - Always visible */}
            <button
              onClick={() => {
                setIsAnimating(true)
                setIsDark(!isDark)
                setTimeout(() => setIsAnimating(false), 500)
              }}
              className="p-2 hover:opacity-70 transition-opacity relative"
              aria-label="Toggle theme"
              style={{ color: isDark ? '#ffffff' : '#000000' }}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isDark ? (
                  // Sun icon for dark mode (clicking switches to light)
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={isAnimating ? 'theme-toggle-animate' : ''}
                    style={{ color: isDark ? '#ffffff' : '#000000' }}
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  // Moon icon for light mode (clicking switches to dark)
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={isAnimating ? 'theme-toggle-animate' : ''}
                    style={{ color: isDark ? '#ffffff' : '#000000' }}
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </div>
            </button>
            
            {/* Mobile Menu Button - Visible only on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              style={{ color: isDark ? '#ffffff' : '#000000' }}
            >
              {isMobileMenuOpen ? (
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ color: isDark ? '#ffffff' : '#000000' }}
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ color: isDark ? '#ffffff' : '#000000' }}
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--background)', maxWidth: 'min(320px, 80vw)' }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: isDark ? '#333' : '#e5e5e5' }}>
            <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 p-6">
            <div className="flex flex-col gap-2">
              <Link 
                href="/"
                onClick={handleNavClick}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/about"
                onClick={handleNavClick}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                About
              </Link>
              <Link 
                href="/projects"
                onClick={handleNavClick}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                Projects
              </Link>
              <Link 
                href="/ventures"
                onClick={handleNavClick}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Ventures
              </Link>
              <Link 
                href="/#contact"
                onClick={handleNavClick}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 pt-20 md:pt-24 relative w-full overflow-x-hidden">
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
            {project.reflection && (
              <button
                onClick={() => scrollToSection(reflectionRef)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'reflection' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Reflection
              </button>
            )}
            {project.testimonials && project.testimonials.length > 0 && (
              <button
                onClick={() => scrollToSection(testimonialsRef)}
                className={`block text-base hover:opacity-70 transition-colors duration-300 text-left cursor-pointer ${
                  activeSection === 'testimonials' 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
              >
                Testimonials
              </button>
            )}
          </nav>
        </div>

        {/* Project Content */}
        <article>
          {/* Back Arrow and Visit Project */}
          <div className="flex items-center justify-between mb-6 mt-8 md:mt-12">
            <button 
              onClick={() => router.push('/')}
              className={`inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}
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
            </button>
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
              <p 
                className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: renderAboutWithFlags(project.about) }}
              />
              {/* Image Carousel or Single Image */}
              {project.aboutImages && project.aboutImages.length > 0 ? (
                <div style={{ marginTop: '48px' }}>
                  <div className="relative">
                    <div 
                      className={`${isMobile ? 'rounded-lg' : 'p-4 rounded-lg'} relative overflow-hidden`}
                      style={{
                        border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                        backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                        boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                    >
                      {/* Carousel Images */}
                      <div className="relative">
                        {project.aboutImages.map((image, index) => (
                          <div
                            key={index}
                            className={`transition-opacity duration-500 ${
                              index === currentImageIndex ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                            }`}
                          >
                            <img 
                              src={image.src} 
                              alt={`${project.title} - Image ${index + 1}`}
                              className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      {project.aboutImages.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? project.aboutImages!.length - 1 : prev - 1
                            )}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-opacity hover:opacity-80 ${
                              isDark ? 'bg-[#1a1a1a] border border-[#232323] text-white' : 'bg-white border border-gray-300 text-black'
                            }`}
                            aria-label="Previous image"
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
                              <path d="M15 18l-6-6 6-6"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === project.aboutImages!.length - 1 ? 0 : prev + 1
                            )}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-opacity hover:opacity-80 ${
                              isDark ? 'bg-[#1a1a1a] border border-[#232323] text-white' : 'bg-white border border-gray-300 text-black'
                            }`}
                            aria-label="Next image"
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
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Dot Indicators */}
                    {project.aboutImages.length > 1 && (
                      <div className="flex justify-center gap-2 mt-4">
                        {project.aboutImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`transition-all rounded-full ${
                              index === currentImageIndex
                                ? (isDark ? 'bg-white' : 'bg-black')
                                : (isDark ? 'bg-gray-600' : 'bg-gray-300')
                            }`}
                            style={{
                              width: index === currentImageIndex ? '8px' : '6px',
                              height: index === currentImageIndex ? '8px' : '6px',
                            }}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : project.aboutImage ? (
                <div style={{ marginTop: '48px' }}>
                  <div 
                    className={isMobile ? 'rounded-lg overflow-hidden' : 'p-4 rounded-lg'}
                    style={{
                      border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                      backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                      boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                  >
                    <img 
                      src={project.aboutImage} 
                      alt={project.title}
                      className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
                    />
                  </div>
                  {project.aboutImageDescription && (
                    <p className={`text-sm text-center mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.aboutImageDescription}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* Detail Image */}
          {project.detailImage && (
            <div className="mb-8">
              <div 
                className={isMobile ? 'rounded-lg overflow-hidden' : 'p-4 rounded-lg'}
                style={{
                  border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                  backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                  boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                <img 
                  src={project.detailImage} 
                  alt={project.title}
                  className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
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
                      className={isMobile ? 'rounded-lg overflow-hidden' : 'p-4 rounded-lg'}
                      style={{
                        border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                        backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                        boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                    >
                      <img 
                        src="/assets/1734032789373.jpeg" 
                        alt={project.title}
                        className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
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
                            className={isMobile ? 'rounded-lg overflow-hidden' : 'p-4 rounded-lg'}
                            style={{
                              border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                              backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                              boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                            }}
                          >
                            <img 
                              src={imagePath} 
                              alt={description || `Prototyping ${index}`}
                              className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
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
                className={isMobile ? '' : 'p-4 rounded-lg'}
                style={{
                  border: isMobile ? 'none' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                  backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9')
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
                className={isMobile ? 'rounded-lg overflow-hidden' : 'p-4 rounded-lg'}
                style={{
                  border: isMobile ? '1px solid #e5e5e5' : (isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)'),
                  backgroundColor: isMobile ? 'transparent' : (isDark ? '#1a1a1a' : '#f9f9f9'),
                  boxShadow: isMobile ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                <img 
                  src={project.detailImage2} 
                  alt={project.title}
                  className={`w-full h-auto ${isMobile ? '' : 'rounded-lg'}`}
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

          {/* Reflection */}
          {project.reflection && (
            <div ref={reflectionRef} style={{ marginBottom: '64px' }}>
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Reflection
              </h2>
              <p 
                className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: project.reflection }}
              />
            </div>
          )}

          {/* Testimonials */}
          {project.testimonials && project.testimonials.length > 0 && (
            <div ref={testimonialsRef} style={{ marginBottom: '64px' }}>
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Testimonials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="space-y-4 flex flex-col"
                    style={{
                      padding: '24px',
                      borderRadius: '8px',
                      border: isDark ? '1.5px solid #232323' : '1.5px solid rgba(35, 35, 35, 0.3)',
                      backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9',
                      minHeight: '280px',
                      height: '100%'
                    }}
                  >
                    <p className={`text-base leading-relaxed flex-grow ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      "{testimonial.text}"
                    </p>
                    <div className="mt-auto">
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                        {testimonial.name}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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

