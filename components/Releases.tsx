'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const releases = [
  { title: 'Push That', label: 'Catch & Release Records', year: '2024', type: 'Single', color: '#C8291A', link: '#' },
  { title: 'Seeking Pleasure', label: 'Independent', year: '2024', type: 'Single', color: '#9E1E10', link: '#' },
  { title: 'Two Times / Pow Pow', label: 'Independent', year: '2023', type: 'EP', color: '#C8291A', link: '#' },
  { title: 'Brrr', label: 'Independent', year: '2023', type: 'Single', color: '#7A1A0E', link: '#' },
  { title: 'Kilimanjaro', label: 'Independent', year: '2023', type: 'Single', color: '#C8291A', link: '#' },
  { title: 'Yesu', label: 'Independent', year: '2022', type: 'Single', color: '#9E1E10', link: '#' },
  { title: 'Let It Whip', label: 'Independent', year: '2022', type: 'Single', color: '#C8291A', link: '#' },
  { title: 'Here We Go Again', label: 'Independent', year: '2022', type: 'Single', color: '#7A1A0E', link: '#' },
  { title: 'Forget Her', label: 'Independent', year: '2021', type: 'Single', color: '#9E1E10', link: '#' },
]

function VinylCard({ release, index }: { release: typeof releases[0]; index: number }) {
  const [spinning, setSpinning] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-4"
      onMouseEnter={() => setSpinning(true)}
      onMouseLeave={() => setSpinning(false)}
    >
      <div className="relative aspect-square">
        <div
          className={`vinyl-record w-full h-full ${spinning ? 'spinning' : ''} transition-shadow duration-500`}
          style={{
            boxShadow: spinning
              ? `0 0 30px ${release.color}25, 0 16px 48px rgba(0,0,0,0.25)`
              : '0 6px 24px rgba(0,0,0,0.12)',
          }}
        />
        {/* Center label */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center"
          style={{
            width: '36%',
            height: '36%',
            background: `radial-gradient(circle, ${release.color}33, ${release.color}55)`,
            border: `1px solid ${release.color}66`,
          }}
        >
          <span
            className="font-mono font-bold text-center leading-tight px-1"
            style={{
              fontSize: 'clamp(5px, 1.3vw, 8px)',
              color: '#fff',
              wordBreak: 'break-word',
              textAlign: 'center',
              maxWidth: '90%',
            }}
          >
            {release.title}
          </span>
        </div>
        {/* Hole */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-surface border border-muted" />

        {/* Listen overlay */}
        <div className="absolute inset-0 rounded-full flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={release.link}
            className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-white/40 text-white bg-black/40 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            Listen
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-sm font-bold text-text leading-tight">{release.title}</h3>
          <span className="tag">{release.type}</span>
        </div>
        <div className="font-mono text-xs text-dim">{release.label}</div>
        <div className="font-mono text-xs text-accent">{release.year}</div>
      </div>
    </motion.div>
  )
}

export default function Releases() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="releases" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-surface/40">
      <div ref={ref}>
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3"
            >
              — Discography
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl md:text-6xl text-text"
            >
              Releases
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            href="https://soundcloud.com/stoley"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden md:inline-block"
          >
            All on SoundCloud
          </motion.a>
        </div>

        <div className="line-glow mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {releases.map((r, i) => (
            <VinylCard key={r.title} release={r} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center md:hidden"
        >
          <a href="https://soundcloud.com/stoley" target="_blank" rel="noopener noreferrer" className="btn-outline">
            All on SoundCloud
          </a>
        </motion.div>
      </div>
    </section>
  )
}
