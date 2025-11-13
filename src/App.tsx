import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Featured from './components/Featured'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30" style={{background: 'radial-gradient(circle, #6EE7F9, transparent)'}}/>
            <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background: 'radial-gradient(circle, #A78BFA, transparent)'}}/>
          </div>
          <Hero />
        </section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-10 lg:px-16 py-12"
        >
          <Featured />
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
