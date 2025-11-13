import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CanvasParticles } from './CanvasParticles'
import { useTheme } from './ThemeProvider'

export default function Hero() {
  const { prefersReducedMotion } = useTheme()
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <CanvasParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/60 to-bg" aria-hidden="true" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Building systems that <span className="text-primary">understand context</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-4 text-lg text-ink/80 max-w-2xl"
        >
          Applied research, evaluation, and production ML. LLMs, multimodal perception, and human-in-the-loop systems.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-5 py-3 rounded-xl bg-primary text-bg font-semibold transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            View Projects
          </Link>
          <a
            href="mailto:you@example.com"
            className="px-5 py-3 rounded-xl border border-ink/20 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  )
}
