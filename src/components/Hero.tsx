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
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="max-w-3xl text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-ink"
        >
          Building context-aware AI systems for accessibility, culture, and research.
        </motion.h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] lg:items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.05, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="flex flex-wrap items-center gap-3 text-sm text-ink/70"
            >
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-medium text-primary/90">
                Lead developer @ Tradewind Technologies
              </span>
              <span className="rounded-full border border-white/5 px-4 py-1.5">
                AI engineer @ CEEN.live
              </span>
              <span className="rounded-full border border-white/5 px-4 py-1.5">
                Former chief data scientist @ Chulalongkorn University
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="mt-6 text-lg leading-relaxed text-ink/80 max-w-2xl"
            >
              I prototype accessible AI agents for Android, conversational discovery experiences, and scientometric analytics
              that move research into the real world. My work blends context engineering, multi-agent orchestration, and
              quantitative research to deliver polished, dependable systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.18, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="mt-6 text-sm text-ink/70 max-w-2xl"
            >
              Core strengths include multi-modal AI, data science, quantitative research, and cross-functional leadership for
              teams shipping new products.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.26, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-bg shadow-[0_10px_30px_-15px_rgba(79,70,229,0.8)] transition hover:translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                View Projects
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-ink/90 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                Email
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-ink/90 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70"
              >
                GitHub
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.32, duration: prefersReducedMotion ? 0 : 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_20px_45px_-25px_rgba(15,23,42,0.7)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Availability</p>
                <p className="mt-2 text-base font-semibold text-ink">Open for collaborations</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Remote &amp; On-site</span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/5 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="text-ink/70">Email</span>
                <span className="font-medium text-ink">{SITE.email}</span>
              </a>
              <a
                href={`tel:${phoneHref}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/5 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="text-ink/70">Phone</span>
                <span className="font-medium text-ink">{SITE.phone}</span>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/5 px-4 py-3 transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="text-ink/70">GitHub</span>
                <span className="font-medium text-primary">sakskap</span>
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50">Focus Areas</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/10 px-3 py-1 text-ink/70">Context engineering</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-ink/70">Multi-modal AI</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-ink/70">Quantitative research</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-ink/70">Team leadership</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
