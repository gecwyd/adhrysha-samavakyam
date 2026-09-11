"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Spark {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  angle: number
  angularSpeed: number
  opacity: number
  targetOpacity: number
  fadeSpeed: number
  color: string
}

export function Sparks({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const colors = [
      "255, 200, 110",
      "255, 225, 160",
      "255, 170, 70",
      "255, 245, 210",
      "240, 210, 150",
    ]

    const particleCount = Math.min(80, Math.max(35, Math.floor((width * height) / 14000)))
    const particles: Spark[] = []

    const createSpark = (initial: boolean = false): Spark => {
      const targetOpacity = 0.35 + Math.random() * 0.55
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10 + Math.random() * 30,
        size: 0.8 + Math.random() * 2,
        speedY: 0.08 + Math.random() * 0.16,
        speedX: (Math.random() - 0.5) * 0.1,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.008,
        opacity: initial ? Math.random() * targetOpacity : 0.01,
        targetOpacity,
        fadeSpeed: 0.002 + Math.random() * 0.004,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createSpark(true))
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.angle += p.angularSpeed
        p.x += Math.sin(p.angle) * 0.15 + p.speedX
        p.y -= p.speedY

        if (p.opacity < p.targetOpacity) {
          p.opacity = Math.min(p.targetOpacity, p.opacity + p.fadeSpeed)
        }

        if (p.y < height * 0.2) {
          p.opacity = Math.max(0, p.opacity - p.fadeSpeed * 1.8)
        }

        if (p.y < -20 || p.x < -20 || p.x > width + 20 || p.opacity <= 0) {
          particles[i] = createSpark(false)
        }

        const glowSize = p.size * 2.8
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity})`)
        gradient.addColorStop(0.4, `rgba(${p.color}, ${p.opacity * 0.45})`)
        gradient.addColorStop(1, `rgba(${p.color}, 0)`)

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.opacity * 1.3)})`
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-10 size-full", className)}
      aria-hidden="true"
    />
  )
}
