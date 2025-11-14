import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'
import { SITE } from '../config/site'

const base = import.meta.env.BASE_URL || '/'

export default function About() {
  const { prefersReducedMotion } = useTheme()

  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex-1"
    >
      <SEO
        title={`About — ${SITE.name}`}
        description="Saksham Kapoor builds context-aware AI systems across accessibility, culture, and research analytics."
        url={`${SITE.url}/about`}
      />

      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Heading + photo row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-semibold tracking-tight">About</h1>
            <p className="mt-5 text-lg text-ink/80 leading-relaxed">
              I build AI systems that understand context and turn it into useful, human-centered behavior.
              My work spans accessibility agents for Android, cultural-discovery interfaces, and research
              analytics that support long-horizon decisions.
            </p>
          </div>

          <div className="shrink-0">
            <img
              src={`${base}saksham.jpeg`}
              alt="Saksham Kapoor"
              className="h-32 w-32 rounded-full object-cover border border-white/10 shadow-lg ring-2 ring-white/10 md:h-36 md:w-36"
            />
          </div>
        </div>

        <p className="mt-6 text-ink/80 leading-relaxed">
          I currently lead accessibility agent development at Tradewind Technologies, where I work on
          multimodal perception, structured reasoning, and guided voice interaction flows. At CEEN.live,
          I design pipelines for poster-to-event knowledge extraction and conversational exploration.
        </p>

        <p className="mt-6 text-ink/80 leading-relaxed">
          Before that, I headed scientometric research at Chulalongkorn University and conducted applied
          quantitative work with the Indian School of Business — building publication-impact models,
          author networks, and survival analyses used for institutional planning.
        </p>

        {/* Skill cards */}
        <div className="mt-12 grid gap-8 rounded-2xl border border-white/10 bg-bg/50 p-8 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Core skills</h2>
            <ul className="mt-4 space-y-2 text-ink/80">
              <li>Context engineering &amp; LLM-driven tool orchestration</li>
              <li>Multimodal &amp; mobile AI (accessibility surfaces, screen perception)</li>
              <li>Quantitative research (survival, time-series, scientometrics)</li>
              <li>Data platforms (Python, SQL, BigQuery, Hadoop)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Focus areas</h2>
            <ul className="mt-4 space-y-2 text-ink/80">
              <li>AI agents for voice-driven mobile navigation</li>
              <li>Cultural-data extraction &amp; conversational exploration</li>
              <li>Evaluation, benchmarking &amp; reproducible research tooling</li>
            </ul>
          </div>
        </div>

        {/* Roles + Education */}
        <div className="mt-12 space-y-10 text-ink/80">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Recent roles</h2>
            <ul className="mt-3 space-y-4">
              <li>
                <span className="font-medium text-ink/90">Lead Developer — Tradewind Technologies</span>
                <div className="text-ink/70">
                  Accessibility agents, multimodal AI, BLOCK71 incubation.
                </div>
              </li>

              <li>
                <span className="font-medium text-ink/90">AI Engineer — CEEN.live</span>
                <div className="text-ink/70">
                  Event-extraction pipelines and cultural-discovery conversations.
                </div>
              </li>

              <li>
                <span className="font-medium text-ink/90">Chief Data Scientist — Chulalongkorn University</span>
                <div className="text-ink/70">
                  Scientometric analytics and metadata infrastructure.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Education</h2>
            <ul className="mt-3 space-y-2">
              <li>MS, Computer Science — University of Colorado Boulder</li>
              <li>PG Diploma, Built Environment — Anant National University</li>
              <li>BE, Mechanical Engineering — Thapar University</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
