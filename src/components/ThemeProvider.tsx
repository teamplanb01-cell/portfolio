import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type ThemeId = 'dark-neon' | 'terminal-green' | 'solar-light'

interface ThemeDefinition {
  id: ThemeId
  label: string
  description: string
}

interface ThemeContextValue {
  themes: ThemeDefinition[]
  theme: ThemeDefinition
  setTheme: (theme: ThemeId) => void
  cycleTheme: () => void
  prefersReducedMotion: boolean
}

const THEME_STORAGE_KEY = 'ai-ml-theme'

const themeDefinitions: ThemeDefinition[] = [
  { id: 'dark-neon', label: 'Dark Neon', description: 'Default vibrant night mode' },
  { id: 'terminal-green', label: 'Terminal', description: 'Retro phosphor glow' },
  { id: 'solar-light', label: 'Solar', description: 'Soft daylight palette' }
]

const ThemeContext = createContext<ThemeContextValue | null>(null)

const getStoredTheme = (): ThemeId | null => {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
  return stored && themeDefinitions.some(theme => theme.id === stored) ? stored : null
}

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeId, setActiveId] = useState<ThemeId>(() => getStoredTheme() ?? 'dark-neon')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const media = window.matchMedia(prefersReducedMotionQuery)
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches)
    }

    handleChange(media)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.dataset.theme = activeId
    window.localStorage.setItem(THEME_STORAGE_KEY, activeId)
  }, [activeId])

  const theme = useMemo(
    () => themeDefinitions.find(candidate => candidate.id === activeId) ?? themeDefinitions[0],
    [activeId]
  )

  const setTheme = useCallback((next: ThemeId) => {
    setActiveId(next)
  }, [])

  const cycleTheme = useCallback(() => {
    setActiveId(current => {
      const idx = themeDefinitions.findIndex(theme => theme.id === current)
      const nextIdx = (idx + 1) % themeDefinitions.length
      return themeDefinitions[nextIdx]?.id ?? 'dark-neon'
    })
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ themes: themeDefinitions, theme, setTheme, cycleTheme, prefersReducedMotion }),
    [theme, prefersReducedMotion, setTheme, cycleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
