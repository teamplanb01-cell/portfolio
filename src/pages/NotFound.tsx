import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'
import { SITE } from '../config/site'

export default function NotFound() {
  const { prefersReducedMotion } = useTheme()
  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <SEO
        title="404 — Page not found"
        description={`This page could not be found on ${SITE.name}'s portfolio.`}
        url={`${SITE.url}/404`}
      />
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 max-w-md text-ink/70">The page you’re looking for doesn’t exist or has moved.</p>
      <Link
        to="/"
        className="mt-5 inline-flex text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
      >
        Go home
      </Link>
    </motion.main>
  )
}
