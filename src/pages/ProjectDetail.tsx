import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ReactMarkdown from 'react-markdown'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary hover:underline">Back to projects</Link>
      </div>
    )
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/projects" className="text-primary hover:underline text-sm">← Back</Link>
      <h1 className="text-3xl font-semibold mt-2">{project.title}</h1>
      <p className="text-ink/70 mt-2">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map(t => <span key={t} className="px-2 py-1 rounded-lg bg-white/5 text-ink/70 text-xs border border-white/10">{t}</span>)}
      </div>
      <div className="aspect-[16/9] rounded-xl bg-black/30 my-6"/>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown>{project.body || '*No additional details yet.*'}</ReactMarkdown>
      </article>
      <div className="mt-6 space-x-4">
        {project.links?.code && <a className="text-primary hover:underline" href={project.links.code} target="_blank">Code</a>}
        {project.links?.paper && <a className="text-primary hover:underline" href={project.links.paper} target="_blank">Paper</a>}
        {project.links?.demo && <a className="text-primary hover:underline" href={project.links.demo} target="_blank">Demo</a>}
      </div>
    </div>
  )
}
