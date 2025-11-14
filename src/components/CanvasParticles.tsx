import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  seed: number
  swirl: number
  speed: number
}

const PARTICLE_COUNT = 70
const SPEED = 0.22

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
    let pointerActive = false
    let tick = 0
    let rafId: number | null = null
    let running = true
    let fillStyle = 'rgba(255, 255, 255, 0.35)'
    let colorChannels: [number, number, number] = [255, 255, 255]

    const updateFillStyle = () => {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
      const [r, g, b] = computed.split(/\s+/).map(Number)
      if ([r, g, b].every(channel => Number.isFinite(channel))) {
        colorChannels = [r, g, b]
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
          radius: Math.random() * 1.6 + 0.4,
          seed: Math.random() * Math.PI * 2,
          swirl: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.002 + 0.0005
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
      tick += 1
      const { clientWidth, clientHeight } = canvas
      const baseX = pointerActive
        ? target.x
        : clientWidth / 2 + Math.cos(tick * 0.003) * clientWidth * 0.12
      const baseY = pointerActive
        ? target.y
        : clientHeight / 2 + Math.sin(tick * 0.0026) * clientHeight * 0.18

      target.x += (baseX - target.x) * 0.05
      target.y += (baseY - target.y) * 0.05

      context.save()
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.restore()
      context.fillStyle = fillStyle
      context.shadowColor = fillStyle
      context.shadowBlur = 12

      particles.forEach((particle, index) => {
        const dx = target.x - particle.x
        const dy = target.y - particle.y
        const distance = Math.hypot(dx, dy) || 1
        const attraction = Math.min(0.0007, 0.00025 + 80 / (distance * distance * 100))
        particle.vx += dx * attraction
        particle.vy += dy * attraction

        particle.vx += Math.cos(tick * particle.speed + particle.seed) * particle.swirl * 0.005
        particle.vy += Math.sin(tick * particle.speed + particle.seed) * particle.swirl * 0.005

        particle.vx *= 0.982
        particle.vy *= 0.982
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -20 || particle.x > clientWidth + 20) particle.x = (particle.x + clientWidth) % clientWidth
        if (particle.y < -20 || particle.y > clientHeight + 20) particle.y = (particle.y + clientHeight) % clientHeight

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()

        for (let j = index + 1; j < particles.length; j += 1) {
          const neighbour = particles[j]
          const ndx = particle.x - neighbour.x
          const ndy = particle.y - neighbour.y
          const nd = Math.hypot(ndx, ndy)
          if (nd < 130) {
            const alpha = Math.max(0, 0.22 - nd / 600)
            if (alpha > 0.01) {
              context.beginPath()
              context.strokeStyle = `rgba(${colorChannels[0]}, ${colorChannels[1]}, ${colorChannels[2]}, ${alpha})`
              context.lineWidth = alpha * 1.8
              context.moveTo(particle.x, particle.y)
              context.lineTo(neighbour.x, neighbour.y)
              context.stroke()
            }
          }
        }
      })
      rafId = window.requestAnimationFrame(draw)
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = event.clientX - rect.left
      target.y = event.clientY - rect.top
      pointerActive = true
    }

    const handlePointerLeave = () => {
      pointerActive = false
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
    canvas.addEventListener('pointerleave', handlePointerLeave)
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
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
      themeObserver.disconnect()
    }
  }, [prefersReducedMotion, theme.id])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
