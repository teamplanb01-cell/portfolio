import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'
import { SITE } from '../config/site'

interface PostContent {
  title: string
  date: string
  summary: string
  body: string
}

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' }) as Record<string, string>

const parse = (raw: string): PostContent => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return {
      title: 'Untitled',
      date: new Date().toISOString(),
      summary: raw.split('\n').find(Boolean)?.slice(0, 120) ?? '',
      body: raw
    }
  }
  const [, frontmatter, body] = match
  const meta: Record<string, string> = {}
  frontmatter.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (!key) return
    const value = rest.join(':').trim().replace(/^"|"$/g, '')
    meta[key.trim()] = value
  })
  return {
    title: meta.title ?? 'Untitled',
    date: meta.date ?? new Date().toISOString(),
    summary: meta.summary ?? body.split('\n').find(Boolean)?.slice(0, 160) ?? '',
    body
  }
}

export default function WritingDetail() {
  const { slug } = useParams()
  const { prefersReducedMotion } = useTheme()
  const entry = slug ? Object.entries(modules).find(([path]) => path.endsWith(`${slug}.md`)) : undefined
  const post = entry ? parse(entry[1]) : null

  if (!post) {
    return (
      <motion.main
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        className="flex-1"
      >
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-semibold">Post not found</h1>
          <p className="mt-3 text-ink/70">The requested post does not exist.</p>
          <Link
            to="/writing"
            className="mt-6 inline-flex text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
          >
            ← Back to writing
          </Link>
        </div>
      </motion.main>
    )
  }

  const pageUrl = `${SITE.url}/writing/${slug}`

  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex-1"
    >
      <SEO title={`${post.title} — Writing`} description={post.summary} url={pageUrl} />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          to="/writing"
          className="text-sm text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
        >
          ← Back
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-wide text-ink/50">{new Date(post.date).toLocaleDateString()}</p>
        <article className="prose prose-invert mt-6 max-w-none">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>
      </div>
    </motion.main>
  )
}
