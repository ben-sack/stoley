'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

function IconMuted() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  )
}

function IconSound() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  )
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(m => !m)
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0d0a08]">
      {/* Video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layered scrims:
           1. Warm cream gradient on the left half — lets the logo/text sit cleanly
           2. Dark vignette bottom — grounds the stats row
           3. Subtle overall darkening so video doesn't blow out */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(105deg, rgba(10,7,5,0.72) 0%, rgba(10,7,5,0.45) 42%, rgba(10,7,5,0.08) 70%, transparent 100%)',
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 35%)',
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

        {/* Logo — multiply blends red onto the dark scrim, white bg becomes semi-transparent */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.png"
              alt="STOLEY"
              width={900}
              height={360}
              className="w-full max-w-xl lg:max-w-3xl h-auto"
              style={{ mixBlendMode: 'screen' }}
              priority
            />
          </motion.div>
        </div>

        {/* Tagline + CTAs */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="font-mono text-sm text-white/60 max-w-xs leading-relaxed"
          >
            House. Dance. Rhythm.
            <br />
            Releases on Catch &amp; Release Records.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
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
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-16 md:mt-24 flex gap-10 md:gap-20 border-t border-white/15 pt-8"
        >
          {[
            { value: '10+', label: 'Releases' },
            { value: 'LA · NYC', label: 'Played' },
            { value: 'House', label: 'Genre' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-2xl font-black text-accent">{s.value}</div>
              <div className="font-mono text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        onClick={toggleSound}
        className="absolute bottom-8 right-6 md:right-10 z-20 flex items-center gap-2.5 px-4 py-2.5 border border-white/20 bg-black/30 backdrop-blur-md text-white/80 hover:text-white hover:border-white/40 hover:bg-black/50 transition-all duration-200 group"
        aria-label={muted ? 'Enable sound' : 'Mute'}
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          {muted ? <IconMuted /> : <IconSound />}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase">
          {muted ? 'Sound Off' : 'Sound On'}
        </span>
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
