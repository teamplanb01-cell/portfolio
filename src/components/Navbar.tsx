import { Link, NavLink } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Github, Mail, PenSquare, Phone } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from './ThemeProvider'
import { SITE } from '../config/site'

export default function Navbar() {
  const { cycleTheme } = useTheme()
  const phoneHref = SITE.phone.replace(/\s+/g, '')
  return (
    <MotionConfig reducedMotion="user">
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-semibold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70">
            {SITE.name}
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 ${
                  isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'
                }`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/writing"
              className={({ isActive }) =>
                `text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 ${
                  isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'
                }`
              }
            >
              Writing
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 ${
                  isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'
                }`
              }
            >
              About
            </NavLink>
            <div className="flex items-center gap-3 pl-0 md:pl-4 md:border-l md:border-white/10">
              <ThemeToggle />
              <button
                type="button"
                className="hidden lg:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                onClick={cycleTheme}
                aria-label="Cycle theme"
              >
                <PenSquare size={16} aria-hidden="true" />
              </button>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                aria-label="GitHub"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-ink/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                aria-label="Email"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
              <a
                href={`tel:${phoneHref}`}
                className="text-ink/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
                aria-label="Phone"
              >
                <Phone size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </MotionConfig>
  )
}
