import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Featured from './components/Featured'
import { SEO } from './components/SEO'

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 }
}

export default function App() {
  return (
    <motion.main
      className="flex-1"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <SEO
        title="AI/ML Portfolio"
        description="Applied research, evaluation, and production ML systems. Explore LLMs, perception, and human-in-the-loop work."
        url="https://example.com/"
      />
      <section className="relative overflow-hidden">
        <Hero />
      </section>
      <section className="px-6 md:px-10 lg:px-16 py-12">
        <Featured />
      </section>
    </motion.main>
  )
}
