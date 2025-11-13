import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import projects from '../data/projects.json'
import { useTheme } from '../components/ThemeProvider'
import { SEO } from '../components/SEO'
import { MetricsChart } from '../components/MetricsChart'

export default function ProjectDetail() {
  const { id } = useParams()
  const { prefersReducedMotion } = useTheme()
  const project = projects.find(entry => entry.id === id)

  if (!project) {
    return (
      <motion.main
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        className="flex-1"
      >
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <p className="mt-4 text-ink/70">The project you were looking for does not exist or has been renamed.</p>
          <Link
            to="/projects"
            className="mt-6 inline-flex text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
          >
            ← Back to projects
          </Link>
        </div>
      </motion.main>
    )
  }

  const pageUrl = `https://example.com/project/${project.id}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: 'AI/ML Engineer'
    },
    keywords: project.tags
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex-1"
    >
      <SEO title={`${project.title} — AI/ML Portfolio`} description={project.summary} url={pageUrl} structuredData={structuredData} />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/projects"
          className="text-sm text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
        >
          ← Back
        </Link>
        <h1 className="mt-2 text-3xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-ink/70">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-ink/70">
              {tag}
            </span>
          ))}
        </div>
        <div className="my-6 aspect-[16/9] rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent" />
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown>{project.body || '*No additional details yet.*'}</ReactMarkdown>
        </article>
        <MetricsChart metrics={project.metrics ?? null} />
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          {project.links?.code && (
            <a
              className="text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
              href={project.links.code}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          )}
          {project.links?.paper && (
            <a
              className="text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
              href={project.links.paper}
              target="_blank"
              rel="noreferrer"
            >
              Paper
            </a>
          )}
          {project.links?.demo && (
            <a
              className="text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.main>
  )
}
