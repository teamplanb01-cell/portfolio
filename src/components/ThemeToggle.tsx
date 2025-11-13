import { LayoutGroup, motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export const ThemeToggle = () => {
  const { themes, theme, setTheme, prefersReducedMotion } = useTheme()
  return (
    <LayoutGroup>
      <div
        role="radiogroup"
        aria-label="Theme"
        className="relative flex items-center gap-1 rounded-xl border border-white/10 px-1 py-1 text-xs"
      >
        {themes.map(option => {
          const isActive = option.id === theme.id
          return (
            <button
              key={option.id}
              role="radio"
              type="button"
              aria-checked={isActive}
              onClick={() => setTheme(option.id)}
              className={`relative z-10 rounded-lg px-3 py-1 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                isActive ? 'text-bg' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="theme-toggle-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-primary/90"
                  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {option.label}
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
