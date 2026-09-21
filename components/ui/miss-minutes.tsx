"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion"

interface MissMinutesProps {
  size?: number
  className?: string
  speaking?: boolean
  audioUrl?: string | null
  onSpeakEnd?: () => void
  autoSpeak?: boolean
}

export function MissMinutes({
  size = 320,
  className = "",
  speaking: externalSpeaking,
  audioUrl,
  onSpeakEnd,
  autoSpeak = false,
}: MissMinutesProps) {
  const [internalSpeaking, setInternalSpeaking] = React.useState(false)
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const animationFrameRef = React.useRef<number | null>(null)
  
  const isSpeaking = externalSpeaking !== undefined ? externalSpeaking : internalSpeaking

  // Motion values for physical properties
  const volumeMV = useMotionValue(0)
  const smoothedVolume = useSpring(volumeMV, { stiffness: 350, damping: 25, mass: 0.5 })
  
  const lookX = useMotionValue(0)
  const lookY = useMotionValue(0)
  const smoothedLookX = useSpring(lookX, { stiffness: 120, damping: 20 })
  const smoothedLookY = useSpring(lookY, { stiffness: 120, damping: 20 })
  
  const blink = useMotionValue(0) // 0 = open, 1 = closed

  // Animations (Idle & Personality)
  React.useEffect(() => {
    let isActive = true

    const blinkLoop = async () => {
      while (isActive) {
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 4000))
        if (!isActive) break
        
        // Double blink chance
        const double = Math.random() > 0.7
        await animate(blink, 1, { duration: 0.1 })
        await animate(blink, 0, { duration: 0.1 })
        
        if (double && isActive) {
          await new Promise(r => setTimeout(r, 100))
          await animate(blink, 1, { duration: 0.1 })
          await animate(blink, 0, { duration: 0.1 })
        }
      }
    }
    
    const lookLoop = async () => {
      while (isActive) {
        await new Promise(r => setTimeout(r, 3000 + Math.random() * 5000))
        if (!isActive) break
        
        const rx = (Math.random() - 0.5) * 2 // -1 to 1
        const ry = (Math.random() - 0.5) * 2
        animate(lookX, rx, { duration: 0.5, ease: "easeInOut" })
        animate(lookY, ry, { duration: 0.5, ease: "easeInOut" })
        
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000))
        if (!isActive) break
        
        animate(lookX, 0, { duration: 0.5, ease: "easeInOut" })
        animate(lookY, 0, { duration: 0.5, ease: "easeInOut" })
      }
    }

    blinkLoop()
    lookLoop()

    return () => { isActive = false }
  }, [blink, lookX, lookY])

  // Audio Logic
  const stopSpeaking = React.useCallback(() => {
    setInternalSpeaking(false)
    volumeMV.set(0)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    onSpeakEnd?.()
  }, [onSpeakEnd, volumeMV])

  const startFakeAnimation = React.useCallback(() => {
    let phase = 0
    const step = () => {
      if (!audioRef.current || audioRef.current.paused) return
      phase += 0.15
      const open = (Math.sin(phase) * 0.5 + 0.5) * 0.85 + 0.15
      volumeMV.set(open)
      animationFrameRef.current = requestAnimationFrame(step)
    }
    animationFrameRef.current = requestAnimationFrame(step)
  }, [volumeMV])

  const speak = React.useCallback((url: string) => {
    stopSpeaking()
    
    const audio = new Audio()
    audio.crossOrigin = "anonymous"
    audioRef.current = audio
    setInternalSpeaking(true)

    let isUsingFake = false

    audio.addEventListener("error", () => {
      if (audio.crossOrigin === "anonymous") {
        audio.crossOrigin = null
        audio.src = url
        isUsingFake = true
        audio.play().catch(() => stopSpeaking())
      } else {
        stopSpeaking()
      }
    })

    const onCanPlay = () => {
      if (isUsingFake) {
        startFakeAnimation()
      } else {
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
          const ctx = new AudioContextClass()
          audioContextRef.current = ctx
          const analyser = ctx.createAnalyser()
          analyser.fftSize = 256
          const source = ctx.createMediaElementSource(audio)
          source.connect(analyser)
          analyser.connect(ctx.destination)
          const dataArray = new Uint8Array(analyser.frequencyBinCount)
          
          const step = () => {
            if (!audioRef.current || audioRef.current.paused) {
              volumeMV.set(0)
              return
            }
            analyser.getByteFrequencyData(dataArray)
            let sum = 0
            for(let i=0; i<dataArray.length; i++) sum += dataArray[i]
            const avg = sum / dataArray.length
            
            // Normalize volume 
            const vol = Math.max(0, Math.min(1, (avg - 10) / 70))
            volumeMV.set(vol)
            
            animationFrameRef.current = requestAnimationFrame(step)
          }
          animationFrameRef.current = requestAnimationFrame(step)
        } catch(e) {
          startFakeAnimation()
        }
      }
    }

    audio.addEventListener("canplay", onCanPlay, { once: true })
    audio.addEventListener("ended", () => stopSpeaking())
    
    audio.src = url
    audio.play().catch(() => {})
  }, [stopSpeaking, startFakeAnimation, volumeMV])

  React.useEffect(() => {
    if (audioUrl && autoSpeak) {
      speak(audioUrl)
    }
  }, [audioUrl, autoSpeak, speak])

  React.useEffect(() => {
    if (!isSpeaking && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
      volumeMV.set(0)
    }
  }, [isSpeaking, volumeMV])

  React.useEffect(() => {
    return () => stopSpeaking()
  }, [stopSpeaking])

  // Geometry calculations
  const s = size
  const cx = s / 2
  const cy = s * 0.38
  const r = s * 0.36

  const eyeY = cy - r * 0.08
  const leftEyeX = cx - r * 0.28
  const rightEyeX = cx + r * 0.28
  const eyeRx = r * 0.18
  const eyeRyBase = r * 0.22

  const handY = cy + r * 0.55
  const legTopY = cy + r * 1.0
  const legBotY = cy + r * 1.42
  const footY = legBotY + r * 0.13

  // --- Dynamic Transforms ---

  // Body scale pulses slightly with volume
  const bodyScale = useTransform(smoothedVolume, [0, 1], [1, 1.05])
  
  // Eyes squint when talking loudly
  const squintAmount = useTransform(smoothedVolume, [0, 1], [0, r * 0.05])
  
  const eyeRy = useTransform(() => {
    const isBlinking = blink.get()
    if (isBlinking > 0.5) return r * 0.03
    return Math.max(r * 0.05, eyeRyBase - squintAmount.get())
  })
  
  const lookOffsetX = useTransform(smoothedLookX, [-1, 1], [-r * 0.06, r * 0.06])
  const lookOffsetY = useTransform(smoothedLookY, [-1, 1], [-r * 0.06, r * 0.06])

  // Eye part positions
  const leftEyeInnerCx = useTransform(lookOffsetX, o => leftEyeX + eyeRx * 0.1 + o)
  const leftEyeInnerCy = useTransform(lookOffsetY, o => eyeY + r * 0.02 + o)
  const leftEyeGlintCx = useTransform(lookOffsetX, o => leftEyeX - eyeRx * 0.1 + o)
  const leftEyeGlintCy = useTransform(lookOffsetY, o => eyeY - r * 0.04 + o)

  const rightEyeInnerCx = useTransform(lookOffsetX, o => rightEyeX + eyeRx * 0.1 + o)
  const rightEyeInnerCy = useTransform(lookOffsetY, o => eyeY + r * 0.02 + o)
  const rightEyeGlintCx = useTransform(lookOffsetX, o => rightEyeX - eyeRx * 0.1 + o)
  const rightEyeGlintCy = useTransform(lookOffsetY, o => eyeY - r * 0.04 + o)

  // Eyelash transforms
  const eyelashY1 = useTransform(blink, b => eyeY - (b > 0.5 ? r * 0.01 : r * 0.22))
  const eyelashY2 = useTransform(blink, b => eyeY - (b > 0.5 ? r * 0.01 : r * 0.22) - r * (b > 0.5 ? 0.02 : 0.09))
  
  const blinkOpacity = useTransform(blink, [0, 0.5, 1], [1, 1, 0])

  // Mouth mapping
  const mouthY = cy + r * 0.28
  
  const mouthPath = useTransform(smoothedVolume, (v) => {
    if (v < 0.05) {
      return `M ${cx - r * 0.28} ${mouthY} Q ${cx} ${mouthY + r * 0.15} ${cx + r * 0.28} ${mouthY}`
    }
    const open = v * r * 0.35
    const up = v * r * 0.05
    return `M ${cx - r * 0.28} ${mouthY - up} Q ${cx} ${mouthY + open} ${cx + r * 0.28} ${mouthY - up}`
  })
  
  const mouthInnerPath = useTransform(smoothedVolume, (v) => {
    if (v < 0.15) return `M ${cx} ${mouthY} L ${cx} ${mouthY}` // hidden
    const open = v * r * 0.35
    const up = v * r * 0.05
    return `M ${cx - r * 0.24} ${mouthY - up + r*0.02} Q ${cx} ${mouthY + open - r*0.02} ${cx + r * 0.24} ${mouthY - up + r*0.02}`
  })

  const mouthInnerOvalCY = useTransform(smoothedVolume, v => mouthY + v * r * 0.15)
  const mouthInnerOvalRX = useTransform(smoothedVolume, v => v > 0.15 ? r * 0.15 * v : 0)
  const mouthInnerOvalRY = useTransform(smoothedVolume, v => v > 0.15 ? r * 0.08 * v : 0)

  // Arm mapping
  const armWave = useTransform(smoothedVolume, [0, 1], [0, -30])

  return (
    <div
      className={`inline-block select-none ${className}`}
      style={{ width: s, height: s * 1.55 }}
    >
      <motion.svg
        width={s}
        height={s * 1.55}
        viewBox={`0 0 ${s} ${s * 1.55}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          display: "block",
          scale: bodyScale,
          transformOrigin: 'center',
          filter: "drop-shadow(0px 10px 20px rgba(240, 120, 0, 0.4))"
        }}
        animate={{
          y: isSpeaking ? [-4, 4, -4] : [-6, 6, -6],
          rotate: isSpeaking ? [-1, 1, -1] : [-0.5, 0.5, -0.5]
        }}
        transition={{
          y: { repeat: Infinity, duration: isSpeaking ? 1.5 : 3, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: isSpeaking ? 2 : 4, ease: "easeInOut" }
        }}
      >
        <defs>
          <radialGradient id="mm-face-grad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFC850" />
            <stop offset="40%" stopColor="#FFA830" />
            <stop offset="85%" stopColor="#F07800" />
            <stop offset="100%" stopColor="#B04000" />
          </radialGradient>
          <radialGradient id="mm-eye-white" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F8F4EA" />
            <stop offset="100%" stopColor="#E0D5C0" />
          </radialGradient>
          <filter id="mm-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.g
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ originX: `${cx}px`, originY: `${legTopY}px` }}
        >
          {/* LEGS */}
          <rect x={cx - r * 0.28} y={legTopY} width={r * 0.18} height={legBotY - legTopY} rx={r * 0.05} fill="#1A1A1A" />
          <rect x={cx + r * 0.10} y={legTopY} width={r * 0.18} height={legBotY - legTopY} rx={r * 0.05} fill="#1A1A1A" />
          {/* FEET */}
          <ellipse cx={cx - r * 0.20} cy={footY} rx={r * 0.22} ry={r * 0.09} fill="#B04000" />
          <ellipse cx={cx - r * 0.20} cy={footY - r * 0.02} rx={r * 0.20} ry={r * 0.075} fill="#F08010" />
          <ellipse cx={cx + r * 0.18} cy={footY} rx={r * 0.22} ry={r * 0.09} fill="#B04000" />
          <ellipse cx={cx + r * 0.18} cy={footY - r * 0.02} rx={r * 0.20} ry={r * 0.075} fill="#F08010" />
        </motion.g>

        {/* LEFT ARM */}
        <motion.g
          style={{ originX: `${cx - r * 0.95}px`, originY: `${handY}px`, rotate: armWave }}
        >
          <path
            d={`M ${cx - r * 0.92} ${handY - r * 0.08} Q ${cx - r * 1.18} ${handY + r * 0.12} ${cx - r * 1.08} ${handY + r * 0.28}`}
            stroke="#F08010"
            strokeWidth={r * 0.13}
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx={cx - r * 1.08} cy={handY + r * 0.34} rx={r * 0.14} ry={r * 0.11} fill="white" stroke="#CCC" strokeWidth="1.5" />
          <line x1={cx - r * 1.14} y1={handY + r * 0.30} x2={cx - r * 1.18} y2={handY + r * 0.24} stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={cx - r * 1.02} y1={handY + r * 0.30} x2={cx - r * 0.98} y2={handY + r * 0.23} stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
        </motion.g>

        {/* RIGHT ARM */}
        <g>
          <path
            d={`M ${cx + r * 0.92} ${handY - r * 0.08} Q ${cx + r * 1.18} ${handY + r * 0.12} ${cx + r * 1.08} ${handY + r * 0.28}`}
            stroke="#F08010"
            strokeWidth={r * 0.13}
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx={cx + r * 1.08} cy={handY + r * 0.34} rx={r * 0.14} ry={r * 0.11} fill="white" stroke="#CCC" strokeWidth="1.5" />
          <line x1={cx + r * 1.14} y1={handY + r * 0.30} x2={cx + r * 1.18} y2={handY + r * 0.24} stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={cx + r * 1.02} y1={handY + r * 0.30} x2={cx + r * 0.98} y2={handY + r * 0.23} stroke="#DDD" strokeWidth="1.5" strokeLinecap="round"/>
        </g>

        {/* CLOCK RIM */}
        <circle cx={cx} cy={cy} r={r + r * 0.08} fill="#111" />
        <circle cx={cx} cy={cy} r={r + r * 0.06} fill="#222" />

        {/* CLOCK FACE */}
        <circle cx={cx} cy={cy} r={r} fill="url(#mm-face-grad)" filter="url(#mm-glow)" />

        {/* Tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const isMajor = i % 3 === 0
          const innerR = isMajor ? r * 0.78 : r * 0.85
          const outerR = r * 0.92
          return (
            <line
              key={i}
              x1={+(cx + Math.cos(angle) * innerR).toFixed(3)}
              y1={+(cy + Math.sin(angle) * innerR).toFixed(3)}
              x2={+(cx + Math.cos(angle) * outerR).toFixed(3)}
              y2={+(cy + Math.sin(angle) * outerR).toFixed(3)}
              stroke="#2A1A0A"
              strokeWidth={isMajor ? r * 0.05 : r * 0.025}
              strokeLinecap="round"
            />
          )
        })}

        {/* LEFT EYE */}
        <motion.ellipse cx={leftEyeX} cy={eyeY} rx={eyeRx} ry={eyeRy} fill="url(#mm-eye-white)" stroke="#1A1A1A" strokeWidth={r * 0.035} />
        <motion.g style={{ opacity: blinkOpacity }}>
          <motion.ellipse cx={leftEyeInnerCx} cy={leftEyeInnerCy} rx={eyeRx * 0.48} ry={eyeRx * 0.51} fill="#1A1A1A" />
          <motion.ellipse cx={leftEyeGlintCx} cy={leftEyeGlintCy} rx={eyeRx * 0.15} ry={eyeRx * 0.15} fill="white" opacity="0.9" />
        </motion.g>
        {/* Left eyelashes */}
        {[-0.55, -0.1, 0.35].map((offset, i) => (
          <motion.line
            key={i}
            x1={leftEyeX + eyeRx * offset}
            y1={eyelashY1}
            x2={leftEyeX + eyeRx * offset + eyeRx * offset * 0.3}
            y2={eyelashY2}
            stroke="#1A1A1A"
            strokeWidth={r * 0.03}
            strokeLinecap="round"
          />
        ))}

        {/* RIGHT EYE */}
        <motion.ellipse cx={rightEyeX} cy={eyeY} rx={eyeRx} ry={eyeRy} fill="url(#mm-eye-white)" stroke="#1A1A1A" strokeWidth={r * 0.035} />
        <motion.g style={{ opacity: blinkOpacity }}>
          <motion.ellipse cx={rightEyeInnerCx} cy={rightEyeInnerCy} rx={eyeRx * 0.48} ry={eyeRx * 0.51} fill="#1A1A1A" />
          <motion.ellipse cx={rightEyeGlintCx} cy={rightEyeGlintCy} rx={eyeRx * 0.15} ry={eyeRx * 0.15} fill="white" opacity="0.9" />
        </motion.g>
        {/* Right eyelashes */}
        {[-0.55, -0.1, 0.35].map((offset, i) => (
          <motion.line
            key={i}
            x1={rightEyeX + eyeRx * offset}
            y1={eyelashY1}
            x2={rightEyeX + eyeRx * offset + eyeRx * offset * 0.3}
            y2={eyelashY2}
            stroke="#1A1A1A"
            strokeWidth={r * 0.03}
            strokeLinecap="round"
          />
        ))}

        {/* MOUTH */}
        <motion.path
          d={mouthPath}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={r * 0.05}
          strokeLinecap="round"
        />
        {/* Inner Mouth Fill */}
        <motion.path d={mouthInnerPath} fill="#801000" />
        <motion.ellipse cx={cx} cy={mouthInnerOvalCY} rx={mouthInnerOvalRX} ry={mouthInnerOvalRY} fill="#FF4400" />

        {/* CLOCK HANDS */}
        <motion.g 
          animate={{ rotate: isSpeaking ? [0, 5, -2, 3, 0] : [0, 2, -1, 0] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 1.5 : 4, ease: "easeInOut" }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        >
          <line x1={cx} y1={cy} x2={cx - r * 0.04} y2={cy - r * 0.55} stroke="#1A1A1A" strokeWidth={r * 0.055} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx + r * 0.42} y2={cy + r * 0.14} stroke="#1A1A1A" strokeWidth={r * 0.045} strokeLinecap="round" />
        </motion.g>
        
        <circle cx={cx} cy={cy} r={r * 0.065} fill="#1A1A1A" />
        <circle cx={cx} cy={cy} r={r * 0.025} fill="#F07800" />

        {/* Highlight */}
        <ellipse
          cx={cx - r * 0.22}
          cy={cy - r * 0.52}
          rx={r * 0.22}
          ry={r * 0.08}
          fill="white"
          opacity="0.12"
          transform={`rotate(-35 ${cx - r * 0.22} ${cy - r * 0.52})`}
        />
      </motion.svg>
    </div>
  )
}

export function useMissMinutes() {
  const [speaking, setSpeaking] = React.useState(false)
  const [currentAudioUrl, setCurrentAudioUrl] = React.useState<string | null>(null)

  const speak = React.useCallback((url: string) => {
    setCurrentAudioUrl(url)
    setSpeaking(true)
  }, [])

  const stopSpeaking = React.useCallback(() => {
    setSpeaking(false)
    setCurrentAudioUrl(null)
  }, [])

  return { speaking, currentAudioUrl, speak, stopSpeaking }
}
