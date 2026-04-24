'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { name: 'Instagram', handle: '@stoleyyyyy', href: 'https://instagram.com/stoleyyyyy', color: '#E1306C' },
  { name: 'TikTok', handle: '@stoleyyyyy', href: 'https://tiktok.com/@stoleyyyyy', color: '#000000' },
  { name: 'Spotify', handle: 'Stoley', href: 'https://open.spotify.com', color: '#1DB954' },
  { name: 'SoundCloud', handle: 'Stoley', href: 'https://soundcloud.com/stoleyyyyy', color: '#FF5500' },
  { name: 'Beatport', handle: 'Stoley', href: 'https://beatport.com', color: '#C8291A' },
  { name: 'YouTube', handle: 'Club View Records', href: 'https://youtube.com', color: '#FF0000' },
  { name: 'Facebook', handle: '@stoleyyyyy', href: 'https://facebook.com/stoleyyyyy', color: '#1877F2' },
]

const marqueeItems = [...socials, ...socials]

export default function Connect() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="connect" className="py-24 md:py-36 relative overflow-hidden">
      {/* Ghost text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[18vw] text-border/60 whitespace-nowrap">
          CONNECT
        </span>
      </div>

      <div ref={ref} className="relative z-10">
        <div className="px-6 md:px-12 lg:px-20 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3"
          >
            — Follow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-6xl text-text"
          >
            Connect
          </motion.h2>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-hidden border-y border-border py-4 mb-16 bg-surface/50">
          <div className="marquee-track">
            {marqueeItems.map((s, i) => (
              <a
                key={`${s.name}-${i}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 shrink-0 group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                <span className="font-display font-bold text-sm tracking-wider text-dim group-hover:text-accent transition-colors">
                  {s.name}
                </span>
                <span className="font-mono text-xs text-muted">{s.handle}</span>
                <span className="text-muted mx-4">·</span>
              </a>
            ))}
          </div>
        </div>

        {/* Social grid */}
        <div className="px-6 md:px-12 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="group flex flex-col gap-2 p-5 border border-border bg-white hover:border-accent/30 hover:shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: s.color, boxShadow: `0 0 6px ${s.color}66` }}
              />
              <span className="font-display font-bold text-sm text-text group-hover:text-accent transition-colors">
                {s.name}
              </span>
              <span className="font-mono text-xs text-dim">
                {s.handle}
              </span>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: s.color }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
