import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { SEO } from '../components/SEO'
import { useTheme } from '../components/ThemeProvider'

interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  timestamp: number
}

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' }) as Record<string, string>

const parsePost = (path: string, raw: string): PostMeta => {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'post'
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    const fallbackDate = new Date().toISOString()
    return {
      slug,
      title: slug,
      date: fallbackDate,
      summary: raw.split('\n').find(Boolean)?.slice(0, 160) ?? '',
      timestamp: Date.parse(fallbackDate)
    }
  }
  const [, frontmatter, body] = frontmatterMatch
  const meta: Record<string, string> = {}
  frontmatter.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (!key) return
    const value = rest.join(':').trim().replace(/^"|"$/g, '')
    meta[key.trim()] = value
  })
  const date = meta.date ?? new Date().toISOString()
  return {
    slug,
    title: meta.title ?? slug,
    date,
    summary: meta.summary ?? body.split('\n').find(Boolean)?.slice(0, 140) ?? '',
    timestamp: Date.parse(date)
  }
}

const posts = Object.entries(modules)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.timestamp - a.timestamp)

export default function Writing() {
  const { prefersReducedMotion } = useTheme()
  const formattedPosts = useMemo(() => posts, [])
  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex-1"
    >
      <SEO
        title="Writing — AI/ML Portfolio"
        description="Notes on evaluation, agents, and production ML systems."
        url="https://example.com/writing"
      />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Writing</h1>
        <p className="mt-3 text-ink/70">Short notes on evaluation frameworks, agents, and production ML systems.</p>
        <div className="mt-10 space-y-6">
          {formattedPosts.map(post => (
            <Link
              key={post.slug}
              to={`/writing/${post.slug}`}
              className="block rounded-2xl border border-white/10 bg-bg/70 p-6 transition hover:border-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
            >
              <p className="text-xs uppercase tracking-wide text-ink/50">{new Date(post.date).toLocaleDateString()}</p>
              <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm text-ink/70">{post.summary}</p>
              <span className="mt-4 inline-flex text-sm text-primary">Read post →</span>
            </Link>
          ))}
          {formattedPosts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-ink/60">
              Posts coming soon.
            </div>
          )}
        </div>
      </div>
    </motion.main>
  )
}
