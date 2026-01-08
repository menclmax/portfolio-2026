'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setErrorMessage('')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again or email me directly at hello@menclmax.com')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again or email me directly at hello@menclmax.com')
    } finally {
      setIsSubmitting(false)
    }
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
              href="/contact" 
              className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-black text-xs font-medium transition-colors"
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
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] z-[110] transform transition-transform duration-300 ease-in-out md:hidden ${
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
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 pt-20 md:pt-8 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="mb-16 w-full">
          <h1 className={`text-4xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            Contact
          </h1>
          <p className={`text-base md:text-lg mb-12 max-w-1xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's work together. Reach out for business inquiries, collaborations, or just to say hello :)
          </p>

          {/* Contact Form */}
          <div className="mb-12">
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Send a message
            </h3>
            <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-0 py-2 text-base border-b transition-colors bg-transparent focus:outline-none ${
                      isDark 
                        ? 'text-white border-gray-700 focus:border-white' 
                        : 'text-black border-gray-300 focus:border-black'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-0 py-2 text-base border-b transition-colors bg-transparent focus:outline-none ${
                      isDark 
                        ? 'text-white border-gray-700 focus:border-white' 
                        : 'text-black border-gray-300 focus:border-black'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="subject" 
                  className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-0 py-2 text-base border-b transition-colors bg-transparent focus:outline-none ${
                    isDark 
                      ? 'text-white border-gray-700 focus:border-white' 
                      : 'text-black border-gray-300 focus:border-black'
                    }`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className={`block text-xs font-medium mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-0 py-2 text-base border-b transition-colors resize-none bg-transparent focus:outline-none ${
                    isDark 
                      ? 'text-white border-gray-700 focus:border-white' 
                      : 'text-black border-gray-300 focus:border-black'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className={`py-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  <p className="text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`py-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  <p className="text-sm">
                    ✗ {errorMessage || 'Something went wrong. Please try again or email me directly at hello@menclmax.com'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                } ${
                  isDark 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Connect
            </h2>
            <div className="flex flex-col gap-4">
              <a 
                href="https://www.linkedin.com/in/maxmencl/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 py-2 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="font-medium">LinkedIn</span>
              </a>

              <a 
                href="https://instagram.com/maxmencl" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 py-2 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="font-medium">Instagram</span>
              </a>

              <a 
                href="https://www.youtube.com/maxmencl" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 py-2 transition-opacity hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    fill={isDark ? '#000000' : '#ffffff'}
                  ></polygon>
                </svg>
                <span className="font-medium">YouTube</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
