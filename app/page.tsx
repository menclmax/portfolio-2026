'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { pinnedProjects } from '@/data/projects'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [amsterdamTime, setAmsterdamTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)

    // Handle smooth scroll to hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const header = document.querySelector('header')
          const headerHeight = header ? header.offsetHeight : 80
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerHeight - 20
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, mounted])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const amsterdamTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Amsterdam',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now)
      setAmsterdamTime(amsterdamTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const socialButtons = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/maxmencl/' },
    { name: 'Instagram', url: 'https://instagram.com/maxmencl' },
    { name: 'Discord', url: 'https://discord.gg/FkNrqrQPyx' },
    { name: 'YouTube', url: 'https://www.youtube.com/maxmencl' }
  ]


  // Close tooltips when clicking outside on mobile
  useEffect(() => {
    if (!isMobile) return
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative.group')) {
        setActiveTooltip(null)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  return (
    <main className="min-h-screen transition-colors overflow-x-hidden w-full" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between py-4 transition-colors w-full overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
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
            <button
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
              }}
              className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-black text-xs font-medium transition-colors"
            >
              Home
            </button>
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
            <button
              onClick={(e) => {
                e.preventDefault()
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  const header = document.querySelector('header')
                  const headerHeight = header ? header.offsetHeight : 80
                  const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY
                  const offsetPosition = elementPosition - headerHeight - 20
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                } else {
                  // If not on homepage, navigate to homepage with hash
                  window.location.href = '/#contact'
                }
              }}
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Contact
            </button>
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
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                Home
              </button>
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
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
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
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    const header = document.querySelector('header')
                    const headerHeight = header ? header.offsetHeight : 80
                    const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY
                    const offsetPosition = elementPosition - headerHeight - 20
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  } else {
                    window.location.href = '/#contact'
                  }
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-opacity hover:opacity-70 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Contact
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="mb-16 w-full overflow-x-hidden">
          <h1 className={`text-4xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            <span 
              className="relative group inline-block cursor-pointer touch-manipulation" 
              style={{ fontSize: '1.2em', marginRight: '0.5em' }}
              onClick={() => isMobile && setActiveTooltip(activeTooltip === 'ahoj' ? null : 'ahoj')}
              onTouchStart={() => isMobile && setActiveTooltip(activeTooltip === 'ahoj' ? null : 'ahoj')}
            >
              <span 
                style={{ fontFamily: 'Metal, cursive' }}
                className={`transition-all relative ${
                  isMobile 
                    ? activeTooltip === 'ahoj' 
                      ? 'opacity-80' 
                      : 'opacity-100'
                    : ''
                }`}
              >
                Ahoj!
                {isMobile && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-current opacity-20"></span>
                )}
              </span>
              <span className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full pulse-dot" style={{ backgroundColor: isDark ? '#ffffff' : '#000000' }}></span>
              <span 
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-normal rounded-lg whitespace-nowrap transition-all pointer-events-none z-[60] shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent ${
                  isDark ? 'bg-white text-black after:border-t-white' : 'bg-black text-white after:border-t-black'
                } ${
                  isMobile 
                    ? activeTooltip === 'ahoj' 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-2'
                    : 'opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 scale-95 translate-y-2'
                }`} 
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', maxWidth: 'calc(100vw - 2rem)' }}
              >
                Slovak for "hello"
              </span>
            </span> Max Mencl here!
          </h1>
          <p className={`text-base md:text-lg mb-8 max-w-1xl leading-relaxed break-words w-full ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', maxWidth: '100%', boxSizing: 'border-box' }}>
            User Experience (UX) Designer based in The Hague, The Netherlands{' '}
            <span 
              className="relative group inline-block cursor-pointer touch-manipulation" 
              style={{ maxWidth: '100%' }}
              onClick={() => isMobile && setActiveTooltip(activeTooltip === 'time' ? null : 'time')}
              onTouchStart={() => isMobile && setActiveTooltip(activeTooltip === 'time' ? null : 'time')}
            >
              (<span className={`underline transition-opacity ${isMobile && activeTooltip === 'time' ? 'opacity-80' : ''}`}>GMT+1</span>).
              {amsterdamTime && (
                <span 
                  className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all pointer-events-none z-10 shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent ${
                    isDark ? 'bg-white text-black after:border-t-white' : 'bg-black text-white after:border-t-black'
                  } ${
                    isMobile 
                      ? activeTooltip === 'time' 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 translate-y-2'
                      : 'opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 scale-95 translate-y-2'
                  }`} 
                  style={{ maxWidth: 'calc(100vw - 2rem)' }}
                >
                  Time: {amsterdamTime}
                </span>
              )}
            </span>
            {' '}I help brands build products that balance Dutch clarity with global reach. Through purposeful design, I turn complex problems into seamless digital experiences.
          </p>

          {/* Social Buttons */}
          <div className="flex flex-wrap gap-3">
            {socialButtons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors group ${isDark ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
              >
                {button.name}
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* Pinned Section */}
        <section>
          <h2 className={`text-xl font-semibold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Pinned</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedProjects.map((project, index) => {
              const mousePos = mousePositions[index]
              const isHovered = hoveredProject === index
              
              return (
                <Link
                  key={index}
                  href={`/projects/${project.slug}`}
                  className="group block transition-opacity relative"
                  style={{ opacity: hoveredProject !== null && hoveredProject !== index ? 0.5 : 1 }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => {
                    setHoveredProject(null)
                    setMousePositions(prev => {
                      const newPos = { ...prev }
                      delete newPos[index]
                      return newPos
                    })
                  }}
                  onMouseMove={(e) => {
                    if (isHovered) {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setMousePositions(prev => ({
                        ...prev,
                        [index]: {
                          x: ((e.clientX - rect.left) / rect.width) * 100,
                          y: ((e.clientY - rect.top) / rect.height) * 100
                        }
                      }))
                    }
                  }}
                >
                  <div className={`rounded-lg overflow-hidden transition-colors relative ${isDark ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    {isHovered && mousePos && (
                      <div
                        className="absolute inset-0 pointer-events-none rounded-lg z-10"
                        style={{
                          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)'} 0%, transparent 70%)`,
                        }}
                      />
                    )}
                    {/* Project Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className={`text-base font-semibold mb-1 group-hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                  </div>
              </Link>
              )
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-24 mb-[68px]">
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Contact</h2>
          <p className={`text-base mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Reach me at{' '}
            <a 
              href="mailto:mencl.max1@gmail.com" 
              className="underline hover:opacity-70 transition-opacity"
            >
              mencl.max1@gmail.com
            </a>
            {' '}for business. Join my{' '}
            <a 
              href="https://discord.gg/FkNrqrQPyx" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              Discord
            </a>
            {' '}community or connect with me on the platforms below.
          </p>
          <div className="flex flex-col items-start gap-3">
            <a 
              href="https://www.linkedin.com/in/maxmencl/" 
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com/maxmencl" 
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Instagram
            </a>
            <a 
              href="https://www.youtube.com/maxmencl" 
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              YouTube
            </a>
            <a 
              href="https://github.com/menclmax" 
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
