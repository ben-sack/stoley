'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function IconMuted() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  )
}
function IconSound() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  )
}

export default function Hero() {
  const videoRef      = useRef<HTMLVideoElement>(null)
  const logoWrapRef   = useRef<HTMLDivElement>(null)
  const logoCanvasRef = useRef<HTMLCanvasElement>(null)
  const waveCanvasRef = useRef<HTMLCanvasElement>(null)
  const audioCtxRef   = useRef<AudioContext | null>(null)
  const analyserRef   = useRef<AnalyserNode | null>(null)
  const waveRafRef    = useRef<number>(0)
  const [muted, setMuted]           = useState(true)
  const [soundActive, setSoundActive] = useState(false)

  // ── Video: force muted play on mount ─────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  // ── Brushstroke canvas logo reveal ───────────────────────────────────────
  useEffect(() => {
    const canvas = logoCanvasRef.current
    const wrap   = logoWrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')!

    const img = new Image()
    img.onload = () => {
      const DURATION = 1150  // ms
      const DELAY    = 380   // wait for eyebrow to settle

      // Size canvas to wrapper
      const sync = () => {
        const r = wrap.getBoundingClientRect()
        canvas.width  = r.width  || 768
        canvas.height = r.height || 360
      }
      sync()
      const ro = new ResizeObserver(sync)
      ro.observe(wrap)

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

      let raf: number
      let start: number | null = null

      const draw = (ts: number) => {
        if (!start) start = ts
        const progress = easeOutQuart(Math.min((ts - start) / DURATION, 1))
        const W = canvas.width, H = canvas.height

        ctx.clearRect(0, 0, W, H)
        ctx.save()

        // Build the sweep mask — left side closed, wavy leading edge
        const leadX = progress * (W + 50) - 25
        ctx.beginPath()
        ctx.moveTo(-5, -5)
        ctx.lineTo(leadX, -5)

        // Wavy leading edge: multiple sine frequencies for organic feel
        const steps = 50
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const y = t * (H + 10) - 5
          const wave =
            Math.sin(y * 0.034 + 0.5)  * 8  +
            Math.sin(y * 0.081 + 2.1)  * 3  +
            Math.sin(y * 0.019 - 1.3)  * 11
          ctx.lineTo(leadX + wave, y)
        }
        ctx.lineTo(-5, H + 5)
        ctx.closePath()
        ctx.fill()                             // mask shape filled

        // Clip logo image to the mask shape
        ctx.globalCompositeOperation = 'source-in'
        ctx.drawImage(img, 0, 0, W, H)
        ctx.restore()

        if (progress < 1) raf = requestAnimationFrame(draw)
      }

      const timer = setTimeout(() => {
        raf = requestAnimationFrame(draw)
      }, DELAY)

      return () => {
        clearTimeout(timer)
        cancelAnimationFrame(raf)
        ro.disconnect()
      }
    }
    img.src = '/logo.png'
  }, [])

  // ── Audio waveform ────────────────────────────────────────────────────────
  const startWaveform = (analyser: AnalyserNode) => {
    const canvas = waveCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const buf = new Uint8Array(analyser.frequencyBinCount)

    const tick = () => {
      analyser.getByteTimeDomainData(buf)
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.beginPath()
      const sw = W / buf.length
      buf.forEach((v, i) => {
        const y = (v / 128) * (H / 2)
        i === 0 ? ctx.moveTo(0, y) : ctx.lineTo(i * sw, y)
      })
      ctx.strokeStyle = 'rgba(200,41,26,0.65)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      waveRafRef.current = requestAnimationFrame(tick)
    }
    tick()
  }

  const stopWaveform = () => {
    cancelAnimationFrame(waveRafRef.current)
    const canvas = waveCanvasRef.current
    if (canvas) canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
  }

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const nowMuted = !video.muted
    video.muted = nowMuted
    setMuted(nowMuted)

    if (!nowMuted) {
      if (!audioCtxRef.current) {
        const ac = new (window.AudioContext || (window as any).webkitAudioContext)()
        const analyser = ac.createAnalyser()
        analyser.fftSize = 1024
        ac.createMediaElementSource(video).connect(analyser)
        analyser.connect(ac.destination)
        audioCtxRef.current = ac
        analyserRef.current = analyser
      } else {
        audioCtxRef.current.resume()
      }
      setSoundActive(true)
      startWaveform(analyserRef.current!)
    } else {
      audioCtxRef.current?.suspend()
      setSoundActive(false)
      stopWaveform()
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0d0a08]">
      {/* Video backdrop */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scrims */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(105deg, rgba(10,7,5,0.74) 0%, rgba(10,7,5,0.46) 42%, rgba(10,7,5,0.08) 70%, transparent 100%)',
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 38%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase mb-10"
        >
          Electronic Music Artist &amp; DJ · Los Angeles, CA
        </motion.div>

        {/* Logo — canvas draws the brushstroke reveal */}
        <motion.div
          ref={logoWrapRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.34 }}
          className="w-full max-w-xl lg:max-w-3xl"
          style={{ aspectRatio: '1000 / 468' }}
        >
          <canvas
            ref={logoCanvasRef}
            className="w-full h-full"
            style={{ mixBlendMode: 'screen' }}
          />
        </motion.div>

        {/* Tagline + CTAs */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="font-mono text-sm text-white/60 max-w-xs leading-relaxed"
          >
            House. Dance. Rhythm.
            <br />
            Releases on Catch &amp; Release Records.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <a href="#releases" className="btn-primary">Hear the Music</a>
            <a
              href="#contact"
              className="font-display text-xs font-bold tracking-[0.15em] uppercase px-7 py-4 border border-white/40 text-white hover:bg-white hover:text-text transition-all duration-200"
            >
              Book Stoley
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 md:mt-24 flex gap-10 md:gap-20 border-t border-white/15 pt-8"
        >
          {[{ value: '10+', label: 'Releases' }, { value: 'LA · NYC', label: 'Played' }, { value: 'House', label: 'Genre' }].map(s => (
            <div key={s.label}>
              <div className="font-display text-2xl font-black text-accent">{s.value}</div>
              <div className="font-mono text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Audio waveform — appears when sound enabled */}
      <div
        className="absolute bottom-20 left-0 right-0 h-14 pointer-events-none z-10 transition-opacity duration-500"
        style={{ opacity: soundActive ? 1 : 0 }}
      >
        <canvas ref={waveCanvasRef} className="w-full h-full" width={1920} height={56} />
      </div>

      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={toggleSound}
        className="absolute bottom-8 right-6 md:right-10 z-20 flex items-center gap-2.5 px-4 py-2.5 border border-white/20 bg-black/30 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 transition-all duration-200"
        aria-label={muted ? 'Enable sound' : 'Mute'}
      >
        {muted ? <IconMuted /> : <IconSound />}
        <span className="font-mono text-[10px] tracking-widest uppercase">
          {muted ? 'Sound Off' : 'Sound On'}
        </span>
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
