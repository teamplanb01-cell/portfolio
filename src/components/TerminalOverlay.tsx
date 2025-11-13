import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import projects from '../data/projects.json'
import { useTheme } from './ThemeProvider'

interface HistoryItem {
  command: string
  output: string[]
}

const ABOUT_SNIPPET =
  'ML engineer focused on evaluation-heavy systems: LLM alignment, multimodal perception, robotics, and human-in-the-loop ops.'

const TERMINAL_COMMANDS = ['help', 'projects', 'about', 'clear']

const isTypingInField = (target: EventTarget | null): boolean => {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  )
}

export const TerminalOverlay = () => {
  const { prefersReducedMotion } = useTheme()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const projectLines = useMemo(
    () =>
      projects
        .slice(0, 6)
        .map(project => `${project.title} — ${project.summary}`),
    []
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingInField(event.target)) return
      if ((event.key === '~' || event.code === 'Backquote') && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        setOpen(current => !current)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 20)
    } else {
      setValue('')
    }
  }, [open])

  const pushHistory = (command: string, output: string[]) => {
    setHistory(prev => [...prev.slice(-6), { command, output }])
  }

  const execute = (command: string) => {
    const trimmed = command.trim().toLowerCase()
    if (!trimmed) return
    switch (trimmed) {
      case 'help':
        pushHistory(command, [
          'Available commands:',
          ...TERMINAL_COMMANDS.map(cmd => ` - ${cmd}`),
          'Press Esc to close the terminal.'
        ])
        break
      case 'projects':
        pushHistory(command, projectLines.length ? projectLines : ['No projects found.'])
        break
      case 'about':
        pushHistory(command, [ABOUT_SNIPPET])
        break
      case 'clear':
        setHistory([])
        break
      default:
        pushHistory(command, [`Command not found: ${trimmed}`])
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    execute(value)
    setValue('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Command palette terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
          className="pointer-events-none fixed inset-0 z-[60] flex items-start justify-center"
        >
          <motion.div
            initial={{ y: prefersReducedMotion ? 0 : -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: prefersReducedMotion ? 0 : -16, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
            className="pointer-events-auto mt-20 w-[min(720px,92vw)] rounded-2xl border border-white/10 bg-bg/95 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between text-xs text-ink/60">
              <span>Press Esc to close • ~ to toggle</span>
              <span>Type `help` to explore commands</span>
            </div>
            <div className="mt-4 space-y-3 font-mono text-sm">
              {history.map((item, index) => (
                <div key={index}>
                  <div className="text-primary">$ {item.command}</div>
                  <div className="mt-1 space-y-1 text-ink/80">
                    {item.output.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={onSubmit} className="mt-4 flex items-center gap-3 font-mono text-sm">
              <span className="text-primary">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={event => setValue(event.target.value)}
                className="flex-1 bg-transparent text-ink placeholder:text-ink/40 focus:outline-none"
                aria-label="Terminal command input"
                autoComplete="off"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
