import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CanvasParticles } from './CanvasParticles'
import { useTheme } from './ThemeProvider'
import { SITE } from '../config/site'

export default function Hero() {
  const { prefersReducedMotion } = useTheme()

  return (
    <section aria-labelledby="home-hero" className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0">
        <CanvasParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/60 to-bg" aria-hidden="true" />
      </div>

      {/* content */}
      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <motion.h1
          id="home-hero"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl"
        >
          Building context-aware AI systems for accessibility, culture, and research.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-5 max-w-3xl text-lg text-ink/80"
        >
          Lead developer at Tradewind Technologies; AI engineer for CEEN.live; formerly chief data scientist at
          Chulalongkorn University. I prototype AI accessibility agents, conversational cultural discovery tools, and
          scientometric analytics that ship from research to production.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-4 max-w-3xl text-sm text-ink/70"
        >
          Focus: AI engineering, rapid software prototyping, quantitative analysis, and leading multi-disciplinary builds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <Link
            to="/projects"
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-bg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            View Projects
          </Link>

          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-ink/20 px-5 py-3 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            GitHub Profile
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="rounded-xl border border-ink/20 px-5 py-3 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
          >
            Email Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}
