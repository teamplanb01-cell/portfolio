import { Link, NavLink } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'
import { Github, Linkedin, GraduationCap } from 'lucide-react'

export default function Navbar() {
  return (
    <MotionConfig reducedMotion="user">
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide">
            <span className="text-primary">AI/</span>ML Portfolio
          </Link>
          <div className="flex items-center gap-6">
            <NavLink to="/projects" className={({isActive}) => isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'}>Projects</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary' : 'text-ink/80 hover:text-primary'}>About</NavLink>
            <div className="flex items-center gap-3">
              <a href="https://github.com/yourname" target="_blank" className="text-ink/70 hover:text-primary" aria-label="GitHub"><Github size={18}/></a>
              <a href="https://www.linkedin.com/in/yourname" target="_blank" className="text-ink/70 hover:text-primary" aria-label="LinkedIn"><Linkedin size={18}/></a>
              <a href="#" className="text-ink/70 hover:text-primary" aria-label="Google Scholar"><GraduationCap size={18}/></a>
            </div>
          </div>
        </div>
      </nav>
    </MotionConfig>
  )
}
