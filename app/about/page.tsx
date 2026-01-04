'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({})

  const toggleCardFlip = (cardIndex: number) => {
    setFlippedCards(prev => {
      // If this card is already flipped, just flip it back
      if (prev[cardIndex]) {
        return { [cardIndex]: false }
      }
      // Otherwise, flip this card and reset all others
      return { [cardIndex]: true }
    })
  }

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
      <header className="fixed md:sticky top-0 z-[120] flex items-center justify-between py-4 transition-colors w-full overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
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
              href="/contact" 
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
                href="/contact"
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

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 pt-20 md:pt-8 w-full">
        {/* About Section */}
        <section className="mb-2">
          <h1 className={`text-4xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            About
          </h1>
          <p className={`text-base md:text-lg mb-0 max-w-1xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Get to know me.
          </p>
        </section>
      </div>

      {/* Image Gallery - Full width container to accommodate all images */}
      <div className="w-full overflow-visible mb-16">
        <div className="max-w-5xl mx-auto px-2 md:px-6 overflow-visible">
          {/* Mobile Grid 2x2 with overlap */}
          <div className="grid grid-cols-2 gap-0 md:hidden mx-4 py-4 overflow-visible" style={{ perspective: '1000px' }}>
            {/* Card 1 - Top Left */}
            <div className="relative flex justify-center items-center py-2">
              <div 
                className="rounded-xl shadow-xl cursor-pointer"
                style={{
                  width: '160px',
                  height: '200px',
                  transform: 'translate(8px, 15px) rotate(-6deg)',
                  zIndex: flippedCards[1] ? 10 : 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => toggleCardFlip(1)}
              >
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flippedCards[1] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="rounded-xl overflow-hidden"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <Image 
                      src="/assets/about/IMG_1452-c.jpg" 
                      alt="Interviewing worldwide pianist Costantino Carrara" 
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div 
                    className="rounded-xl"
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
            </div>

            {/* Card 2 - Top Right */}
            <div className="relative flex justify-center items-center py-2">
              <div 
                className="rounded-xl shadow-xl cursor-pointer"
                style={{
                  width: '160px',
                  height: '200px',
                  transform: 'translate(-8px, 15px) rotate(5deg)',
                  zIndex: flippedCards[2] ? 10 : 1,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => toggleCardFlip(2)}
              >
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flippedCards[2] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="rounded-xl overflow-hidden"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <Image 
                      src="/assets/about/IMG_2680-c.jpg" 
                      alt="Interviewing Ivana Tattoo Art" 
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div 
                    className="rounded-xl"
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
            </div>

            {/* Card 3 - Bottom Left */}
            <div className="relative flex justify-center items-center py-2">
              <div 
                className="rounded-xl shadow-xl cursor-pointer"
                style={{
                  width: '160px',
                  height: '200px',
                  transform: 'translate(8px, -15px) rotate(5deg)',
                  zIndex: flippedCards[3] ? 10 : 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => toggleCardFlip(3)}
              >
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flippedCards[3] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="rounded-xl overflow-hidden"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <Image 
                      src="/assets/about/IMG_6704-c.jpg" 
                      alt="Bratislava, Slovakia" 
                      fill
                      loading="eager"
                      sizes="160px"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div 
                    className="rounded-xl"
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
            </div>

            {/* Card 4 - Bottom Right */}
            <div className="relative flex justify-center items-center py-2">
              <div 
                className="rounded-xl shadow-xl cursor-pointer"
                style={{
                  width: '160px',
                  height: '200px',
                  transform: 'translate(-8px, -15px) rotate(-5deg)',
                  zIndex: flippedCards[4] ? 10 : 4,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => toggleCardFlip(4)}
              >
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flippedCards[4] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="rounded-xl overflow-hidden"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <Image 
                      src="/assets/about/IMG_8467-c.jpg" 
                      alt="TV Markiza" 
                      fill
                      loading="eager"
                      sizes="160px"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div 
                    className="rounded-xl"
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
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative" style={{ height: '350px', perspective: '1000px' }}>
            <div className="relative mx-auto" style={{ width: '820px', height: '350px', maxWidth: '100%' }}>
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
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src="/assets/about/IMG_1452-c.jpg" 
                      alt="About me" 
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
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
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src="/assets/about/IMG_2680-c.jpg" 
                      alt="About me" 
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
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
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src="/assets/about/IMG_6704-c.jpg" 
                      alt="About me" 
                      fill
                      loading="eager"
                      sizes="220px"
                      className="object-cover rounded-lg"
                    />
                  </div>
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
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src="/assets/about/IMG_8467-c.jpg" 
                      alt="About me" 
                      fill
                      loading="eager"
                      sizes="220px"
                      className="object-cover rounded-lg"
                    />
                  </div>
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
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 w-full">
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

        {/* Toolkit Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <h2 className={`text-xl font-semibold flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`}>
              Toolkit
            </h2>
            <div className="flex-1">
              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                The tools and skills I use to bring ideas to life.
              </p>
              
              <div className="space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* UX Design */}
                  <div>
                    <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      User Experience Design
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      User research · Information architecture · Wireframing · Hi-fi prototyping · Usability testing · Design systems
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Scrumwise'].map((tool) => (
                        <span 
                          key={tool}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            isDark 
                              ? 'border-gray-700 text-gray-300' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Video & Motion */}
                  <div>
                    <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      Video & Motion
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Video production · Editing · Motion design · Color · Sound · Storytelling
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio', 'Blender', 'Cinema 4D'].map((tool) => (
                        <span 
                          key={tool}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            isDark 
                              ? 'border-gray-700 text-gray-300' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Digital Marketing */}
                  <div>
                    <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      Digital Marketing
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Growth strategy · Campaigns · Content creation · Performance creative · CRO · Reporting
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Google Analytics', 'Google Ads', 'Meta Ads Manager', 'Mailchimp'].map((tool) => (
                        <span 
                          key={tool}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            isDark 
                              ? 'border-gray-700 text-gray-300' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI & Development */}
                  <div>
                    <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                      AI & Vibecoding
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      AI prototyping · Automations · Custom agents · Frontend builds · API integrations · Deployment
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['ChatGPT', 'Claude', 'Cursor', 'VS Code', 'GitHub', 'Netlify'].map((tool) => (
                        <span 
                          key={tool}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            isDark 
                              ? 'border-gray-700 text-gray-300' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                href="https://www.linkedin.com/in/maxmencl"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-4 rounded-lg text-sm font-medium transition-colors group ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
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
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="/assets/128449075_2794675187518913_5970271266785482180_n.jpg" 
                      alt="New Designers" 
                      fill
                      className="object-cover"
                      sizes="48px"
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
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="/assets/images (1).png" 
                      alt="The Lighthouse" 
                      fill
                      className="object-cover"
                      sizes="48px"
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
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="/assets/channels4_profile (2).jpg" 
                      alt="TV Markiza" 
                      fill
                      className="object-cover"
                      sizes="48px"
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
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden relative">
                    <Image 
                      src="/assets/mcdonalds-logo-1993.webp" 
                      alt="McDonald's Slovakia" 
                      fill
                      className="object-cover"
                      sizes="48px"
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

