'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
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
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, mounted])

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
            <Link 
              href="/" 
              className={`px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity ${isDark ? 'text-white' : 'text-black'}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-black text-xs font-medium transition-colors"
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
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
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

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 w-full overflow-x-hidden">
        {/* About Section */}
        <section className="mb-16">
          <h1 className={`text-4xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            About
          </h1>
          <p className={`text-base md:text-lg mb-12 max-w-1xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Get to know me.
          </p>

          {/* Image Gallery - Overlapping Rotated Images with Flip Effect */}
          <div className="relative mb-16" style={{ height: '350px', perspective: '1000px' }}>
            {/* First Image - Left, rotated slightly counter-clockwise */}
            <div 
              className="absolute rounded-lg overflow-hidden shadow-lg flip-card"
              style={{
                width: '220px',
                height: '280px',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%) rotate(-5deg)',
                zIndex: 1,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s'
              }}
            >
              <div 
                className="flip-card-inner"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                <div 
                  className="flip-card-front"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src="/assets/IMG_1452.JPG" 
                    alt="About me" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div 
                  className="flip-card-back rounded-lg"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${isDark ? '#333' : '#ddd'}`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-center p-4">
                    <div 
                      className="text-xs leading-relaxed"
                      style={{ color: isDark ? '#999' : '#666' }}
                    >
                      Interviewing worldwide pianist Costantino Carrara
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Image - Left-Center, rotated slightly clockwise */}
            <div 
              className="absolute rounded-lg overflow-hidden shadow-lg flip-card"
              style={{
                width: '220px',
                height: '280px',
                left: '200px',
                top: '50%',
                transform: 'translateY(-50%) rotate(4deg)',
                zIndex: 2,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s'
              }}
            >
              <div 
                className="flip-card-inner"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                <div 
                  className="flip-card-front"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src="/assets/IMG_2680.JPG" 
                    alt="About me" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div 
                  className="flip-card-back rounded-lg"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${isDark ? '#333' : '#ddd'}`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-center p-4">
                    <div 
                      className="text-xs leading-relaxed"
                      style={{ color: isDark ? '#999' : '#666' }}
                    >
                      Interviewing the world's best female Tattoo Artist - Ivana Tattoo Art
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Image - Center, rotated slightly clockwise */}
            <div 
              className="absolute rounded-lg overflow-hidden shadow-lg flip-card"
              style={{
                width: '220px',
                height: '280px',
                left: '400px',
                top: '50%',
                transform: 'translateY(-50%) rotate(3deg)',
                zIndex: 3,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s'
              }}
            >
              <div 
                className="flip-card-inner"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                <div 
                  className="flip-card-front"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src="/assets/IMG_6704.JPG" 
                    alt="About me" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div 
                  className="flip-card-back rounded-lg"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${isDark ? '#333' : '#ddd'}`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-center p-4">
                    <div 
                      className="text-xs leading-relaxed"
                      style={{ color: isDark ? '#999' : '#666' }}
                    >
                      Bratislava, Slovakia - my hometown
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Image - Right, rotated slightly counter-clockwise */}
            <div 
              className="absolute rounded-lg overflow-hidden shadow-lg flip-card"
              style={{
                width: '220px',
                height: '280px',
                left: '600px',
                top: '50%',
                transform: 'translateY(-50%) rotate(-2deg)',
                zIndex: 4,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s'
              }}
            >
              <div 
                className="flip-card-inner"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                <div 
                  className="flip-card-front"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src="/assets/IMG_8467.JPG" 
                    alt="About me" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div 
                  className="flip-card-back rounded-lg"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${isDark ? '#333' : '#ddd'}`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-center p-4">
                    <div 
                      className="text-xs leading-relaxed"
                      style={{ color: isDark ? '#999' : '#666' }}
                    >
                      Picture from my time in TV Markiza - Slovakia's leading television
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* About Text Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <h2 className={`text-xl font-semibold flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`}>
              About
            </h2>
            <div className="flex-1 space-y-4">
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <span 
                  className="relative group inline-block"
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      const tooltip = e.currentTarget.querySelector('[data-tooltip]') as HTMLElement
                      if (tooltip) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        tooltip.style.left = `${rect.left + rect.width / 2}px`
                        tooltip.style.top = `${rect.top - 8}px`
                        tooltip.style.transform = 'translate(-50%, -100%)'
                      }
                    }
                  }}
                >
                  <em className="cursor-pointer">Ahoj</em>
                  {!isMobile && (
                    <>
                      {/* Desktop tooltip */}
                      <span 
                        data-tooltip
                        className="px-3 py-1.5 text-xs font-normal rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-lg relative scale-95 translate-y-2 group-hover:scale-100 group-hover:translate-y-0"
                        style={{ 
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', 
                          maxWidth: 'calc(100vw - 2rem)',
                          backgroundColor: isDark ? '#ffffff' : '#000000',
                          color: isDark ? '#000000' : '#ffffff',
                          zIndex: 100,
                          position: 'fixed',
                          left: '50%',
                          top: '0',
                          transform: 'translate(-50%, -100%)'
                        }}
                      >
                        Slovak for "hello"
                        <span 
                          className="absolute top-full left-1/2 transform -translate-x-1/2"
                          style={{
                            border: '4px solid transparent',
                            borderTopColor: isDark ? '#ffffff' : '#000000'
                          }}
                        ></span>
                      </span>
                    </>
                  )}
                </span>, I'm Max Mencl! Originally from Slovakia, I'm now based in the vibrant place that is The Hague, Netherlands.
              </p>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                My passion for design and digital experiences began early, which naturally led me to pursue a career in UX design. I've been working as a UX Designer, specializing in user experience, digital marketing, and videography, for several years now!
              </p>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Alongside my design journey, I used to run a{' '}
                <a 
                  href="https://www.youtube.com/maxmencl" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  YouTube channel
                </a>
                {' '}where I interviewed fascinating and accomplished individuals from around the world, sharing their stories and insights while honing my videography and storytelling skills.
              </p>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                When I'm not at my desk, you can find me exploring the city, working on creative projects, or enjoying some coffee at a local shop!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <h2 className={`text-xl font-semibold flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`}>
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
              <a
                href="mailto:mencl.max1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Collaborations</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/maxmencl"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <a
                href="https://instagram.com/maxmencl"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <a
                href="https://discord.gg/FkNrqrQPyx"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Join the Discord</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

              <a
                href="https://github.com/menclmax"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>

            </div>
          </div>
        </section>

        {/* Work Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <h2 className={`text-xl font-semibold flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`}>
              Work
            </h2>
            <div className="flex-1">
              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I specialize in UX design, digital marketing, and videography. But I am always learning new things. Here are some of the places I have worked.
              </p>
              
              <div className="space-y-6">
                {/* Work Experience 1 */}
                <a 
                  href="https://newdesigners.agency/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="/assets/128449075_2794675187518913_5970271266785482180_n.jpg" 
                      alt="New Designers" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      UX Designer, Lead of Videography
                    </div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      New Designers
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      2023 - 2025
                    </div>
                  </div>
                </a>

                {/* Work Experience 2 */}
                <a 
                  href="https://www.thuas.com/about-thuas/lighthouse" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="/assets/images (1).png" 
                      alt="The Lighthouse" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      Student Assistant
                    </div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      The Lighthouse
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      2024-2025
                    </div>
                  </div>
                </a>

                {/* Work Experience 3 */}
                <a 
                  href="https://www.markiza.sk/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="/assets/channels4_profile (2).jpg" 
                      alt="TV Markiza" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      Reporter, Screenwriter
                    </div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      TV Markiza
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      2023-2024
                    </div>
                  </div>
                </a>

                {/* Work Experience 4 */}
                <a 
                  href="https://www.mcdonalds.sk/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="/assets/mcdonalds-logo-1993.webp" 
                      alt="McDonald's Slovakia" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      Brand Ambassador, Guest Experience Leader
                    </div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      McDonald's Slovakia
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      2020-2022
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

