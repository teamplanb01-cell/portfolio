import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-ink/70 mt-2">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-primary hover:underline mt-4">Go home</Link>
    </div>
  )
}
