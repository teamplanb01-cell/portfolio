import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { TerminalOverlay } from './TerminalOverlay'

export const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <TerminalOverlay />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
