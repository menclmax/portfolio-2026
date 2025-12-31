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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }

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

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className={`text-4xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            <span className="relative group inline-block" style={{ fontSize: '1.2em', marginRight: '0.5em' }}>
              <span style={{ fontFamily: 'Metal, cursive' }}>Ahoj!</span>
              <span className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full pulse-dot" style={{ backgroundColor: isDark ? '#ffffff' : '#000000' }}></span>
              <span className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-normal rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent ${isDark ? 'bg-white text-black after:border-t-white' : 'bg-black text-white after:border-t-black'}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
                Slovak for "hello"
              </span>
            </span> Max Mencl here!
          </h1>
          <p className={`text-base md:text-lg mb-8 max-w-1xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            User Experience (UX) Designer based in The Hague, The Netherlands{' '}
            <span className="relative group inline-block">
              (<span className="underline">GMT+1</span>).
              {amsterdamTime && (
                <span className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent ${isDark ? 'bg-white text-black after:border-t-white' : 'bg-black text-white after:border-t-black'}`}>
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
