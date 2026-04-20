import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Dot = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  angle: number
  spin: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function ParticlesCanvas() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dots: Dot[] = []

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots.length = 0
      const count = Math.floor(Math.min(70, Math.max(34, w / 26)))
      for (let i = 0; i < count; i++) {
        dots.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(1.2, 3.2),
          vx: rand(-0.07, 0.07),
          vy: rand(-0.03, 0.05),
          a: rand(0.06, 0.18),
          angle: rand(0, Math.PI * 2),
          spin: rand(-0.01, 0.01),
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        d.angle += d.spin
        if (d.x < -10) d.x = w + 10
        if (d.x > w + 10) d.x = -10
        if (d.y < -10) d.y = h + 10
        if (d.y > h + 10) d.y = -10

        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(d.angle)
        ctx.beginPath()
        ctx.ellipse(0, 0, d.r * 1.7, d.r * 0.95, 0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${d.a * 0.85})`
        ctx.fill()
        ctx.strokeStyle = `rgba(144,160,128,${d.a})`
        ctx.lineWidth = 0.7
        ctx.stroke()
        ctx.restore()
      }

      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  )
}
