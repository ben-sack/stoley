'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const platforms = [
  {
    title: "Stoley's Friday Selects",
    platform: 'Spotify',
    description: 'Weekly curated playlist — peak time house selectors for the weekend.',
    href: 'https://open.spotify.com',
    color: '#1DB954',
  },
  {
    title: 'Full Sets & Free Downloads',
    platform: 'SoundCloud',
    description: 'Live recordings, free downloads, and the full catalog — all on SoundCloud.',
    href: 'https://soundcloud.com/stoleyyyyy',
    color: '#FF5500',
  },
  {
    title: 'Shop the Catalog',
    platform: 'Beatport',
    description: 'Grab the tracks for your set. All releases available on Beatport.',
    href: 'https://www.beatport.com',
    color: '#C8291A',
  },
]

export default function Mixes() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="mixes" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-surface/40">
      <div ref={ref}>
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3"
          >
            — Streaming
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-6xl text-text"
          >
            Hear It
          </motion.h2>
        </div>

        <div className="line-glow mb-12" />

        {/* SoundCloud embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 border border-border overflow-hidden shadow-sm"
        >
          <div className="px-4 py-3 border-b border-border bg-surface flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-muted" />
            <div className="w-2 h-2 rounded-full bg-muted" />
            <span className="font-mono text-xs text-dim ml-2">soundcloud.com/stoleyyyyy</span>
          </div>
          <div className="bg-white">
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/stoleyyyyy/sets/free-downloads&color=%23C8291A&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              className="block"
            />
          </div>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {platforms.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group block bg-white border border-border p-6 hover:border-accent/40 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-2 h-8 rounded-full"
                    style={{ background: p.color }}
                  />
                  <span
                    className="font-mono text-xs tracking-widest uppercase px-2 py-1 border"
                    style={{ borderColor: `${p.color}44`, color: p.color }}
                  >
                    {p.platform}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-dim leading-relaxed">
                  {p.description}
                </p>
                <span
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
                  style={{ color: p.color }}
                >
                  Open →
                </span>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: p.color }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
