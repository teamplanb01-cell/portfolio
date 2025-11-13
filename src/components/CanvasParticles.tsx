import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const PARTICLE_COUNT = 60
const SPEED = 0.25

export const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { prefersReducedMotion, theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const particles: Particle[] = []
    const target = { x: 0, y: 0 }
    let rafId: number | null = null
    let running = true
    let fillStyle = 'rgba(255, 255, 255, 0.35)'

    const updateFillStyle = () => {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
      const [r, g, b] = computed.split(/\s+/).map(Number)
      if ([r, g, b].every(channel => Number.isFinite(channel))) {
        fillStyle = `rgba(${r}, ${g}, ${b}, 0.38)`
      }
    }

    updateFillStyle()

    const createParticles = (width: number, height: number) => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          radius: Math.random() * 1.6 + 0.4
        })
      }
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * ratio
      canvas.height = clientHeight * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createParticles(clientWidth, clientHeight)
      target.x = clientWidth / 2
      target.y = clientHeight / 2
    }

    resize()

    const draw = () => {
      if (!running) return
      const { clientWidth, clientHeight } = canvas
      context.save()
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.restore()
      context.fillStyle = fillStyle
      particles.forEach(particle => {
        const dx = target.x - particle.x
        const dy = target.y - particle.y
        particle.vx += dx * 0.0005
        particle.vy += dy * 0.0005
        particle.vx *= 0.98
        particle.vy *= 0.98
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > clientWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > clientHeight) particle.vy *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      rafId = window.requestAnimationFrame(draw)
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
    }

    const handleBlur = () => {
      running = false
      if (rafId) window.cancelAnimationFrame(rafId)
    }

    const handleFocus = () => {
      if (!prefersReducedMotion) {
        running = true
        rafId = window.requestAnimationFrame(draw)
      }
    }

    const handleVisibility = () => {
      if (document.hidden) {
        handleBlur()
      } else {
        handleFocus()
      }
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', handlePointer)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)

    const themeObserver = new MutationObserver(updateFillStyle)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(draw)
    }

    return () => {
      running = false
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
      themeObserver.disconnect()
    }
  }, [prefersReducedMotion, theme.id])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
