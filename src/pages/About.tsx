import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'
import { SITE } from '../config/site'

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
        description="Saksham Kapoor leads AI accessibility, cultural discovery, and scientometric research programs."
        url={`${SITE.url}/about`}
      />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="mt-4 text-ink/80">
          I am an AI engineer and data scientist focused on translating context-rich research into dependable, human-centered
          products. From leading Tradewind Technologies’ accessibility agent for Android to building cultural discovery tools
          at CEEN.live, I orchestrate multi-agent systems, structured output pipelines, and voice interfaces that are ready for
          production.
        </p>
        <p className="mt-6 text-ink/80">
          Previously, as chief data scientist at Chulalongkorn University and a quantitative researcher with the Indian School
          of Business, I designed scientometric pipelines, longitudinal studies, and survival analyses that informed strategic
          decisions. My early experience at Mu Sigma laid the groundwork for scaling data platforms and real-time analytics in
          healthcare.
        </p>
        <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-bg/70 p-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Core skills</h2>
            <ul className="mt-3 space-y-2 text-ink/80">
              <li>Context engineering &amp; LLM-driven tool orchestration (Genkit, Google ADK, MCP servers)</li>
              <li>Multi-modal AI, data science, and quantitative research (time series, NLP, survival analysis)</li>
              <li>Big data platforms and business intelligence (Python, SQL, Hadoop, Qlikview, Tableau)</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Focus areas</h2>
            <ul className="mt-3 space-y-2 text-ink/80">
              <li>Accessibility agents that translate complex mobile flows into guided voice tasks</li>
              <li>Conversational cultural exploration and poster-to-event knowledge pipelines</li>
              <li>Scientometric analytics for publication impact, author centrality, and innovation strategy</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 space-y-4 text-ink/80">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Recent roles</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-medium text-ink/90">Lead Developer, Tradewind Technologies (2023–present)</span> — AI
                accessibility agent development, hiring, and incubation support at BLOCK71 Singapore.
              </li>
              <li>
                <span className="font-medium text-ink/90">AI Engineer, CEEN.live (2024–present)</span> — Conversational map
                interfaces and poster-to-event ingestion pipelines for global cultural discovery.
              </li>
              <li>
                <span className="font-medium text-ink/90">Chief Data Scientist, Chulalongkorn University (2023–2024)</span>
                — Publication metadata systems and scientometric analysis using Python, Pandas, and BigQuery.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Education</h2>
            <ul className="mt-3 space-y-2">
              <li>MS in Computer Science, University of Colorado Boulder (CGPA: 3.945/4)</li>
              <li>PG Diploma in Built Environment, Anant National University (CGPA: 3.05/4)</li>
              <li>Bachelor of Engineering in Mechanical Engineering, Thapar University (CGPA: 6.91/10)</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
