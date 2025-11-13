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
        <motion.dl
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="grid w-full max-w-3xl gap-4 text-sm text-ink/70 sm:grid-cols-3"
        >
          <div className="glass rounded-2xl p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Name</dt>
            <dd className="mt-2 text-base font-semibold text-ink">{SITE.name}</dd>
          </div>
          <div className="glass rounded-2xl p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Phone</dt>
            <dd className="mt-2 text-base font-medium text-ink">
              <a
                href={`tel:${phoneHref}`}
                className="inline-flex items-center gap-2 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                {SITE.phone}
              </a>
            </dd>
          </div>
          <div className="glass rounded-2xl p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Email</dt>
            <dd className="mt-2 text-base font-medium text-ink">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                {SITE.email}
              </a>
            </dd>
          </div>
        </motion.dl>
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-10 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink md:mt-12 md:text-6xl"
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
        <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
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
