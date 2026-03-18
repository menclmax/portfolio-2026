'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOME_OPTIONS = [
  { href: '/', label: 'UX' },
  { href: '/video', label: 'Video' },
] as const

const VIDEO_NAV = [
  { href: '/video/services', label: 'Services' },
  { href: '/video/projects', label: 'Projects' },
  { href: '/video/contact', label: 'Contact' },
] as const

export function VideoNavbar() {
  const pathname = usePathname()
  const homeTriggerRef = useRef<HTMLButtonElement>(null)
  const homeDropdownPanelRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false)
  const [homeDropdownRect, setHomeDropdownRect] = useState<{ top: number; left: number; width: number; height: number; bottom: number } | null>(null)
  const [isHomeDropdownOpenMobile, setIsHomeDropdownOpenMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isOnHome = pathname === '/' || pathname === '/video'

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setIsDark(savedTheme === 'dark')

    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHomeDropdownOpen) setIsHomeDropdownOpen(false)
        else if (isHomeDropdownOpenMobile) setIsHomeDropdownOpenMobile(false)
        else if (isMobileMenuOpen) setIsMobileMenuOpen(false)
      }
    }
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
  }, [isMobileMenuOpen, isHomeDropdownOpen, isHomeDropdownOpenMobile])

  useEffect(() => {
    if (!isHomeDropdownOpen || !homeTriggerRef.current) return
    const updateRect = () => {
      if (homeTriggerRef.current) {
        setHomeDropdownRect(homeTriggerRef.current.getBoundingClientRect())
      }
    }
    updateRect()
    window.addEventListener('scroll', updateRect, true)
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('scroll', updateRect, true)
      window.removeEventListener('resize', updateRect)
    }
  }, [isHomeDropdownOpen])

  useEffect(() => {
    if (!isHomeDropdownOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const inTrigger = homeTriggerRef.current?.contains(target)
      const inPanel = homeDropdownPanelRef.current?.contains(target)
      if (!inTrigger && !inPanel) setIsHomeDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isHomeDropdownOpen])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
    setIsHomeDropdownOpenMobile(false)
  }

  const linkClass = (active: boolean) =>
    `px-3 py-1.5 text-xs font-medium transition-opacity ${active ? 'rounded bg-gray-200 hover:bg-gray-300 text-black' : `hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}`

  const mobileLinkClass = (active: boolean) =>
    `w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${active ? isDark ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' : 'bg-gray-200 hover:bg-gray-300 text-black' : `hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}`

  const desktopHomeDropdown =
    mounted &&
    homeDropdownRect &&
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence onExitComplete={() => setHomeDropdownRect(null)}>
            {isHomeDropdownOpen && (
              <motion.div
                key="home-dropdown"
                ref={homeDropdownPanelRef}
                className="z-[130] py-1 rounded-md shadow border"
                style={{
                  position: 'fixed',
                  top: homeDropdownRect.bottom + 4,
                  left: homeDropdownRect.left,
                  minWidth: homeDropdownRect.width,
                  backgroundColor: 'var(--background)',
                  borderColor: isDark ? '#333' : '#e5e5e5',
                }}
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {HOME_OPTIONS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-3 py-2 text-xs font-medium hover:opacity-80 ${pathname === href ? 'opacity-100' : ''}`}
                    style={{ color: 'var(--foreground)' }}
                    onClick={() => setIsHomeDropdownOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null

  return (
    <>
      {desktopHomeDropdown}
      <header
        className="fixed md:sticky top-0 z-[120] flex items-center justify-between py-4 transition-colors w-full overflow-x-hidden"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between relative px-4 md:px-6">
          <Link href="/video" className="block" onClick={handleNavClick}>
            <img
              src="/assets/Signeture.svg"
              alt="Logo"
              className="h-8 w-auto"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'none' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <div>
              <button
                ref={homeTriggerRef}
                type="button"
                onClick={() => {
                  const next = !isHomeDropdownOpen
                  setIsHomeDropdownOpen(next)
                  if (next && homeTriggerRef.current) {
                    setHomeDropdownRect(homeTriggerRef.current.getBoundingClientRect())
                  }
                  // when closing, rect is cleared in AnimatePresence onExitComplete
                }}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-opacity rounded ${isOnHome ? 'bg-gray-200 hover:bg-gray-300 text-black' : `hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}`}
                aria-expanded={isHomeDropdownOpen}
                aria-haspopup="true"
              >
                Home
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isHomeDropdownOpen ? 'rotate-180' : ''}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            {VIDEO_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(pathname === href)}
                onClick={handleNavClick}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAnimating(true)
                setIsDark(!isDark)
                setTimeout(() => setIsAnimating(false), 500)
              }}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle theme"
              style={{ color: isDark ? '#ffffff' : '#000000' }}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isDark ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isAnimating ? 'theme-toggle-animate' : ''}>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isAnimating ? 'theme-toggle-animate' : ''}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </div>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:opacity-70 transition-opacity"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              style={{ color: isDark ? '#ffffff' : '#000000' }}
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] z-[110] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--background)', maxWidth: 'min(320px, 80vw)' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: isDark ? '#333' : '#e5e5e5' }}>
            <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:opacity-70 transition-opacity" aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 p-6">
            <div className="flex flex-col gap-2">
              <div>
                <button
                  type="button"
                  onClick={() => setIsHomeDropdownOpenMobile((o) => !o)}
                  className={mobileLinkClass(isOnHome)}
                  style={{ width: '100%' }}
                  aria-expanded={isHomeDropdownOpenMobile}
                >
                  <span className="flex items-center justify-between w-full">
                    Home
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isHomeDropdownOpenMobile ? 'rotate-180' : ''}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isHomeDropdownOpenMobile && (
                  <div className="flex flex-col gap-1 mt-1 pl-2 border-l-2" style={{ borderColor: isDark ? '#333' : '#e5e5e5' }}>
                    {HOME_OPTIONS.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium ${pathname === href ? 'opacity-100' : 'opacity-80'}`}
                        style={{ color: 'var(--foreground)' }}
                        onClick={handleNavClick}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {VIDEO_NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass(pathname === href)}
                  onClick={handleNavClick}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
