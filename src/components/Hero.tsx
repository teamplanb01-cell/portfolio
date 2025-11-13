import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        Building systems that <span className="text-primary">understand context</span>.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mt-4 text-lg text-ink/80 max-w-2xl"
      >
        Applied research, evaluation, and production ML. LLMs, multimodal perception, and human-in-the-loop systems.
      </motion.p>
      <div className="mt-8 flex gap-4">
        <Link to="/projects" className="px-5 py-3 rounded-xl bg-primary text-bg font-semibold hover:opacity-90 transition">View Projects</Link>
        <a href="mailto:you@example.com" className="px-5 py-3 rounded-xl border border-ink/20 hover:border-primary transition">Contact</a>
      </div>
    </div>
  )
}
