import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from './ThemeProvider'

interface MetricsChartProps {
  metrics?: Record<string, number> | null
}

const formatLabel = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

export const MetricsChart = ({ metrics }: MetricsChartProps) => {
  const { prefersReducedMotion } = useTheme()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const data = useMemo(() => {
    if (!metrics) return []
    return Object.entries(metrics)
      .filter(([, value]) => typeof value === 'number' && Number.isFinite(value))
      .map(([name, value]) => ({ name: formatLabel(name), value }))
      .sort((a, b) => b.value - a.value)
  }, [metrics])

  const maxValue = useMemo(() => (data.length ? Math.max(...data.map(item => item.value), 1) : 1), [data])

  if (!data.length) return null

  return (
    <motion.div
      ref={ref}
      className="mt-10 rounded-2xl border border-white/10 bg-bg/70 p-6"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-semibold">Model metrics</h2>
      <p className="text-sm text-ink/60">Key quantitative benchmarks reported for this project.</p>
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tickLine={false} fontSize={12} angle={-20} dy={8} height={60} />
            <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} fontSize={12} domain={[0, maxValue]} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ background: 'rgba(5,11,18,0.9)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
              formatter={(value: number, name: string) => [value >= 1 ? value.toFixed(2) : value.toFixed(3), name]}
            />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="rgba(110, 231, 249, 0.85)" animationDuration={prefersReducedMotion ? 0 : 600} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
