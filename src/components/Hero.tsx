import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CanvasParticles } from './CanvasParticles'
import { useTheme } from './ThemeProvider'
import { SITE } from '../config/site'

export default function Hero() {
  const { prefersReducedMotion } = useTheme()
  const phoneHref = SITE.phone.replace(/\s+/g, '')
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <CanvasParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/60 to-bg" aria-hidden="true" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/60"
        >
          <span className="font-medium text-ink/70">{SITE.name}</span>
          <a
            href={`tel:${phoneHref}`}
            className="hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            {SITE.email}
          </a>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Building context-aware AI systems for accessibility, culture, and research.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-4 text-lg text-ink/80 max-w-2xl"
        >
          Lead developer at Tradewind Technologies, AI engineer for CEEN.live, and former chief data scientist at
          Chulalongkorn University. I prototype AI accessibility agents, conversational cultural discovery tools, and
          scientometric analytics that move from research to deployment.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-4 text-sm text-ink/70 max-w-2xl"
        >
          Areas of expertise include AI engineering, software prototyping, machine learning, quantitative analysis, and team
          leadership across multi-disciplinary initiatives.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-5 py-3 rounded-xl bg-primary text-bg font-semibold transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            View Projects
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="px-5 py-3 rounded-xl border border-ink/20 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            Email Saksham
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl border border-ink/20 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}
