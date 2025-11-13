import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { motion, LayoutGroup, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import { useTheme } from '../components/ThemeProvider'
import { SEO } from '../components/SEO'
import { SITE } from '../config/site'

interface Project {
  id: string
  title: string
  summary: string
  tags: string[]
}

const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()

const fuse = new Fuse(projects as Project[], {
  includeScore: true,
  threshold: 0.34,
  keys: ['title', 'summary', 'tags']
})

const cardTransition = { type: 'spring', stiffness: 260, damping: 26 }

const useFilteredProjects = (query: string, activeTags: string[]) => {
  return useMemo(() => {
    const trimmed = query.trim()
    const results = trimmed ? fuse.search(trimmed).map(result => result.item) : (projects as Project[])
    return results.filter(project => activeTags.length === 0 || activeTags.every(tag => project.tags.includes(tag)))
  }, [query, activeTags])
}

export default function Projects() {
  const { prefersReducedMotion } = useTheme()
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])

  const filtered = useFilteredProjects(query, activeTags)

  const toggleTag = (tag: string) => {
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(current => current !== tag) : [...prev, tag]))
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
      className="flex-1"
    >
      <SEO
        title={`Projects — ${SITE.name}`}
        description="Applied AI work spanning accessibility agents, cultural discovery platforms, scientometric research, and quantitative strategy."
        url={`${SITE.url}/projects`}
      />
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Fuzzy search projects..."
            className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm placeholder:text-ink/40 outline-none focus:border-primary/70 focus-visible:ring-2 focus-visible:ring-primary/40 md:w-80"
            aria-label="Search projects"
          />
        </div>
        <LayoutGroup>
          <div className="mt-6 flex flex-wrap gap-2">
            {allTags.map(tag => {
              const active = activeTags.includes(tag)
              return (
                <motion.button
                  key={tag}
                  type="button"
                  layout
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  onClick={() => toggleTag(tag)}
                  className={`relative rounded-full border px-4 py-1 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 ${
                    active ? 'border-primary/80 text-primary chip-active' : 'border-white/10 text-ink/70 hover:text-primary'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="chip-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                      transition={prefersReducedMotion ? { duration: 0 } : cardTransition}
                    />
                  )}
                  {tag}
                </motion.button>
              )
            })}
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="rounded-full border border-white/10 px-4 py-1 text-xs font-medium text-ink/60 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
              >
                Clear
              </button>
            )}
          </div>
        </LayoutGroup>
        <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} activeTags={activeTags} prefersReducedMotion={prefersReducedMotion} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-white/15 p-10 text-center text-ink/60">
              Nothing matched that query. Try different keywords or filters.
            </div>
          )}
        </motion.div>
      </div>
    </motion.main>
  )
}

interface ProjectCardProps {
  project: Project
  activeTags: string[]
  prefersReducedMotion: boolean
}

const ProjectCard = ({ project, activeTags, prefersReducedMotion }: ProjectCardProps) => {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const percentX = (event.clientX - rect.left) / rect.width
    const percentY = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - percentY) * 12)
    rotateY.set((percentX - 0.5) * 12)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className="card"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      transition={prefersReducedMotion ? { duration: 0 } : cardTransition}
    >
      <div className="mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-ink/70">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map(tag => {
          const active = activeTags.includes(tag)
          return (
            <span
              key={tag}
              className={`rounded-lg border border-white/10 px-2 py-1 text-xs text-ink/70 ${active ? 'tag-glow' : ''}`}
            >
              {tag}
            </span>
          )
        })}
      </div>
      <div className="mt-4">
        <Link
          to={`/project/${project.id}`}
          className="text-sm text-primary transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  )
}
