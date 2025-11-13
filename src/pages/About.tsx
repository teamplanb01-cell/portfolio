import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'

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
        title="About — AI/ML Portfolio"
        description="ML engineer focused on evaluation-heavy systems, multimodal perception, and reliable deployment."
        url="https://example.com/about"
      />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="mt-4 text-ink/80">
          I build evaluation-heavy ML systems spanning LLM alignment, multimodal perception, robotics, and human-in-the-loop
          workflows. This portfolio highlights research prototypes and productionized experiments that emphasize measurement,
          reliability, and iteration speed.
        </p>
        <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-bg/70 p-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Core skills</h2>
            <ul className="mt-3 space-y-2 text-ink/80">
              <li>Languages: Python, TypeScript, Kotlin</li>
              <li>ML stacks: PyTorch, JAX, TensorFlow</li>
              <li>Data: BigQuery, Spark, dbt</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Focus areas</h2>
            <ul className="mt-3 space-y-2 text-ink/80">
              <li>Evaluation harnesses &amp; measurement</li>
              <li>Agentic systems &amp; automation safety</li>
              <li>Experimentation &amp; deployment platforms</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-ink/80">
          Outside of work, I mentor teams on experiment design and support communities exploring equitable AI deployment.
        </p>
      </div>
    </motion.main>
  )
}
