import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort()

export default function Projects() {
  const [q, setQ] = useState('')
  const [active, setActive] = useState<string[]>([])

  const items = useMemo(() => {
    return projects.filter(p => {
      const matchesQ = (p.title + p.summary + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())
      const matchesTags = active.length === 0 || active.every(t => p.tags.includes(t))
      return matchesQ && matchesTags
    })
  }, [q, active])

  const toggleTag = (t: string) => {
    setActive(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search projects..."
          className="px-4 py-2 rounded-xl glass outline-none w-full md:w-80"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map(t => (
          <button key={t}
            onClick={() => toggleTag(t)}
            className={`px-3 py-1 rounded-xl border ${active.includes(t) ? 'border-primary text-primary' : 'border-white/10 text-ink/70 hover:text-primary'}`}
          >{t}</button>
        ))}
        {active.length > 0 && (
          <button onClick={() => setActive([])} className="px-3 py-1 rounded-xl border border-white/10 text-ink/60 hover:text-primary">Clear</button>
        )}
      </div>
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <motion.div layout key={p.id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{delay: 0.03*idx}} className="card">
              <div className="aspect-[16/9] rounded-xl bg-black/30 mb-3"/>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-ink/70 text-sm mt-1">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0,6).map(t => (
                  <span key={t} className="px-2 py-1 rounded-lg bg-white/5 text-ink/70 text-xs border border-white/10">{t}</span>
                ))}
              </div>
              <div className="mt-4">
                <Link to={`/project/${p.id}`} className="text-primary hover:underline text-sm">Read more →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
