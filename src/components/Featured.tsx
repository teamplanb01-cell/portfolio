import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

const base = import.meta.env.BASE_URL || '/'

export default function Featured() {
  const featured = projects.filter(p => p.featured).slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured</h2>
        <Link to="/projects" className="text-primary hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p, idx) => (
          <motion.div
            key={p.id}
            className="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-black/30 mb-3 flex items-center justify-center">
              {p.thumbnail ? (
                <img
                  src={`${base}${p.thumbnail}`}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-ink/40 text-sm">thumbnail</span>
              )}
            </div>

            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-ink/70 text-sm mt-1">{p.summary}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map(t => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-lg bg-white/5 text-ink/70 text-xs border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <Link
                to={`/project/${p.id}`}
                className="text-primary hover:underline text-sm"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
