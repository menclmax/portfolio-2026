'use client'

import { useState, useEffect } from 'react'

type Availability = {
  available: boolean
  startTime: string
  endTime: string
}

export default function TempPage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [availability, setAvailability] = useState<Record<number, Availability>>({})
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  // Generate all days of January 2026
  const january2026 = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(2026, 0, i + 1)
    return {
      day: i + 1,
      date: date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  })

  // Get the first day of the week (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(2026, 0, 1).getDay()
  const daysBeforeMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Convert to Monday = 0

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
    // Load saved availability
    const saved = localStorage.getItem('january-availability')
    if (saved) {
      try {
        setAvailability(JSON.parse(saved))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, mounted])

  useEffect(() => {
    if (Object.keys(availability).length > 0) {
      localStorage.setItem('january-availability', JSON.stringify(availability))
    }
  }, [availability])

  const toggleAvailability = (day: number) => {
    setAvailability(prev => {
      const current = prev[day]
      if (current?.available) {
        const newState = { ...prev }
        delete newState[day]
        setExpandedDay(null)
        return newState
      } else {
        setExpandedDay(day)
        return {
          ...prev,
          [day]: {
            available: true,
            startTime: current?.startTime || '09:00',
            endTime: current?.endTime || '17:00'
          }
        }
      }
    })
  }

  const updateTime = (day: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const copyToClipboard = () => {
    const lines = ['January 2026 Availability\n']
    january2026.forEach(({ day, dayName }) => {
      const avail = availability[day]
      if (avail?.available) {
        lines.push(`${day} ${dayName}: Available ${avail.startTime} - ${avail.endTime}`)
      } else {
        lines.push(`${day} ${dayName}: Not available`)
      }
    })
    navigator.clipboard.writeText(lines.join('\n'))
    alert('Availability copied to clipboard!')
  }

  return (
    <main className="min-h-screen transition-colors p-4" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            January 2026 Availability
          </h1>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              isDark 
                ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            Copy
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className={`text-center text-xs font-medium py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: daysBeforeMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {january2026.map(({ day, dayName }) => {
              const avail = availability[day]
              const isAvailable = avail?.available || false
              const isExpanded = expandedDay === day

              return (
                <div key={day} className="relative">
                  <button
                    onClick={() => {
                      if (isAvailable) {
                        setExpandedDay(isExpanded ? null : day)
                      } else {
                        toggleAvailability(day)
                      }
                    }}
                    className={`w-full aspect-square rounded text-xs font-medium transition-colors flex flex-col items-center justify-center ${
                      isAvailable
                        ? isDark
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                        : isDark
                          ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{day}</span>
                    {isAvailable && (
                      <span className="text-[10px] mt-0.5 opacity-90">
                        {avail.startTime} - {avail.endTime}
                      </span>
                    )}
                  </button>

                  {/* Expanded time inputs */}
                  {isExpanded && isAvailable && (
                    <div className={`absolute top-full left-0 right-0 mt-1 p-2 rounded z-10 ${
                      isDark ? 'bg-[#1a1a1a] border border-gray-700' : 'bg-white border border-gray-300 shadow-lg'
                    }`}>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>From:</span>
                          <input
                            type="time"
                            value={avail.startTime}
                            onChange={(e) => updateTime(day, 'startTime', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex-1 px-2 py-1 rounded text-xs border ${
                              isDark
                                ? 'bg-[#0f0f0f] border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-black'
                            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Until:</span>
                          <input
                            type="time"
                            value={avail.endTime}
                            onChange={(e) => updateTime(day, 'endTime', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex-1 px-2 py-1 rounded text-xs border ${
                              isDark
                                ? 'bg-[#0f0f0f] border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-black'
                            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleAvailability(day)
                          }}
                          className={`text-[10px] px-2 py-1 rounded ${
                            isDark
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
          Click a day to mark as available. Click again to set times.
        </div>
      </div>
    </main>
  )
}

