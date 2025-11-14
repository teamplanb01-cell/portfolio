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
  depth: number
  orbitRadius: number
  orbitSpeed: number
  angle: number
  jitter: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  strength: number
  alpha: number
  decay: number
  speed: number
}

const PARTICLE_COUNT = 90
const BASE_SPEED = 0.22

export const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { prefersReducedMotion, theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const particles: Particle[] = []
    const ripples: Ripple[] = []
    const target = { x: 0, y: 0 }
    let pointerActive = false
    let tick = 0
    let rafId: number | null = null
    let running = true
    let fillStyle = 'rgba(255, 255, 255, 0.35)'
    let colorChannels: [number, number, number] = [255, 255, 255]

    const fadeMap: Record<string, string> = {
      'dark-neon': 'rgba(4, 7, 17, 0.22)',
      'terminal-green': 'rgba(3, 15, 8, 0.24)',
      'solar-light': 'rgba(255, 255, 255, 0.16)'
    }

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
        const depth = Math.random()
        const orbitRadius = (Math.random() * 160 + 40) * (0.4 + depth * 0.9)
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          radius: Math.max(0.35, depth * 2.4 + 0.5),
          seed: Math.random() * Math.PI * 2,
          swirl: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.002 + 0.0005,
          depth,
          orbitRadius,
          orbitSpeed: (Math.random() * 0.02 + 0.004) * (0.6 + depth * 0.9),
          angle: Math.random() * Math.PI * 2,
          jitter: (0.08 + Math.random() * 0.08) * (1 - depth)
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

    const spawnRipple = (x: number, y: number, strength = 1) => {
      const safeStrength = Math.max(0.3, Math.min(1.5, strength))
      if (ripples.length > 8) {
        ripples.shift()
      }
      ripples.push({
        x,
        y,
        radius: 18,
        strength: safeStrength,
        alpha: Math.min(0.65, 0.42 + safeStrength * 0.28),
        decay: 0.94 - Math.min(0.25, safeStrength * 0.08),
        speed: 18 + Math.random() * 14
      })
    }

    const draw = () => {
      if (!running) return
      tick += 1
      const { clientWidth, clientHeight } = canvas
      const baseX = pointerActive
        ? target.x
        : clientWidth / 2 + Math.cos(tick * 0.0032) * clientWidth * 0.16
      const baseY = pointerActive
        ? target.y
        : clientHeight / 2 + Math.sin(tick * 0.0026) * clientHeight * 0.22

      target.x += (baseX - target.x) * (pointerActive ? 0.18 : 0.05)
      target.y += (baseY - target.y) * (pointerActive ? 0.18 : 0.05)

      if (!pointerActive && tick % 220 === 0 && !prefersReducedMotion) {
        const pulseX = target.x + Math.cos(tick * 0.025) * clientWidth * 0.08
        const pulseY = target.y + Math.sin(tick * 0.02) * clientHeight * 0.06
        spawnRipple(pulseX, pulseY, 0.6)
      }

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i]
        ripple.radius += ripple.speed
        ripple.speed *= 0.98
        ripple.strength *= ripple.decay
        ripple.alpha *= ripple.decay
        if (ripple.alpha < 0.02) {
          ripples.splice(i, 1)
        }
      }

      context.save()
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.globalAlpha = 1
      context.fillStyle = fadeMap[theme.id] ?? fadeMap['dark-neon']
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.restore()

      context.save()
      context.globalCompositeOperation = 'lighter'
      context.shadowColor = fillStyle
      context.shadowBlur = 14

      particles.forEach((particle, index) => {
        particle.angle += particle.orbitSpeed
        const swirlOffset = Math.sin(tick * particle.speed + particle.seed) * particle.swirl
        const orbitX = target.x + Math.cos(particle.angle + swirlOffset) * particle.orbitRadius
        const orbitY = target.y + Math.sin(particle.angle + swirlOffset) * particle.orbitRadius

        particle.vx += (orbitX - particle.x) * (0.012 + particle.depth * 0.03)
        particle.vy += (orbitY - particle.y) * (0.012 + particle.depth * 0.03)
        particle.vx += Math.cos(particle.seed + tick * 0.0024) * particle.jitter
        particle.vy += Math.sin(particle.seed + tick * 0.0021) * particle.jitter

        ripples.forEach(ripple => {
          const dx = particle.x - ripple.x
          const dy = particle.y - ripple.y
          const dist = Math.hypot(dx, dy) || 1
          const influence = Math.max(0, 1 - dist / ripple.radius)
          if (influence > 0) {
            const magnitude = influence * ripple.strength * (0.6 + particle.depth * 0.9)
            particle.vx += (dx / dist) * magnitude
            particle.vy += (dy / dist) * magnitude
          }
        })

        const damping = 0.89 - particle.depth * 0.05
        particle.vx *= damping
        particle.vy *= damping
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -40 || particle.x > clientWidth + 40) particle.x = (particle.x + clientWidth) % clientWidth
        if (particle.y < -40 || particle.y > clientHeight + 40) particle.y = (particle.y + clientHeight) % clientHeight

        const particleAlpha = 0.22 + particle.depth * 0.45
        context.fillStyle = `rgba(${colorChannels[0]}, ${colorChannels[1]}, ${colorChannels[2]}, ${particleAlpha})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()

        for (let j = index + 1; j < particles.length; j += 1) {
          const neighbour = particles[j]
          const ndx = particle.x - neighbour.x
          const ndy = particle.y - neighbour.y
          const nd = Math.hypot(ndx, ndy)
          const depthMix = (particle.depth + neighbour.depth) / 2
          const maxDistance = 120 + depthMix * 120
          if (nd < maxDistance) {
            const alpha = Math.max(0, 0.18 + depthMix * 0.25 - nd / (maxDistance * 1.3))
            if (alpha > 0.01) {
              context.beginPath()
              context.strokeStyle = `rgba(${colorChannels[0]}, ${colorChannels[1]}, ${colorChannels[2]}, ${alpha})`
              context.lineWidth = alpha * (1.4 + depthMix * 2.4)
              context.moveTo(particle.x, particle.y)
              context.lineTo(neighbour.x, neighbour.y)
              context.stroke()
            }
          }
        }
      })
      context.restore()

      if (ripples.length > 0) {
        context.save()
        context.lineWidth = 1.2
        ripples.forEach(ripple => {
          if (ripple.alpha <= 0) return
          context.globalAlpha = ripple.alpha
          context.strokeStyle = `rgba(${colorChannels[0]}, ${colorChannels[1]}, ${colorChannels[2]}, 0.6)`
          context.beginPath()
          context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          context.stroke()
        })
        context.restore()
      }

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

    const handlePointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      spawnRipple(event.clientX - rect.left, event.clientY - rect.top, 1.1)
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
    canvas.addEventListener('pointerdown', handlePointerDown)
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
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
      themeObserver.disconnect()
    }
  }, [prefersReducedMotion, theme.id])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
