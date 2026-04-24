'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const releases = [
  { title: 'Seeking Pleasure',  label: 'Independent',             year: '2025', type: 'Single', cover: '/covers/seeking-pleasure.jpg',  rotation: -4  },
  { title: 'Annie',             label: 'Independent',             year: '2024', type: 'Single', cover: '/covers/annie.jpg',              rotation: 3   },
  { title: 'Push That',         label: 'Catch & Release Records', year: '2024', type: 'Single', cover: '/covers/push-that.jpg',          rotation: -2  },
  { title: 'Brrr',              label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/brrr.jpg',               rotation: 5   },
  { title: 'Kilimanjaro',       label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/kilimanjaro.jpg',        rotation: -6  },
  { title: 'Forget Her',        label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/forget-her.jpg',         rotation: 2   },
  { title: 'Yesu',              label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/yesu.jpg',               rotation: -3  },
  { title: 'Let It Whip',       label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/let-it-whip.jpg',        rotation: 6   },
  { title: 'Here We Go Again',  label: 'Independent',             year: '2023', type: 'Single', cover: '/covers/here-we-go-again.jpg',   rotation: -5  },
  { title: 'Lies to be Told',   label: 'Independent',             year: '2022', type: 'Single', cover: '/covers/lies-to-be-told.jpg',    rotation: 4   },
  { title: 'Back to the Funk',  label: 'Independent',             year: '2022', type: 'Single', cover: '/covers/back-to-the-funk.jpg',   rotation: -2  },
  { title: 'Slave',             label: 'Independent',             year: '2022', type: 'Single', cover: '/covers/slave.jpg',              rotation: 7   },
  { title: 'Shake That Thang!', label: 'Independent',             year: '2022', type: 'Single', cover: '/covers/shake-that-thang.jpg',   rotation: -4  },
]

interface Release { title: string; label: string; year: string; type: string; cover: string; rotation: number }

function CoverCard({ release, index, onOpen }: { release: Release; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: release.rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: release.rotation }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="relative cursor-pointer"
      style={{ zIndex: hovered ? 20 : index % 3 + 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: '200px',
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15)'
            : '0 4px 16px rgba(0,0,0,0.12)',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        <Image
          src={release.cover}
          alt={release.title}
          width={400}
          height={400}
          className="w-full h-auto block"
          style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-3"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-display font-bold text-white text-sm leading-tight">{release.title}</p>
          <p className="font-mono text-white/60 text-[10px] mt-0.5">{release.year}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function LightboxModal({ release, onClose }: { release: Release; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 flex flex-col md:flex-row gap-8 max-w-2xl w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cover */}
        <div className="flex-shrink-0 w-56 md:w-72 shadow-2xl">
          <Image
            src={release.cover}
            alt={release.title}
            width={600}
            height={600}
            className="w-full h-auto block"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-end gap-4 pb-2">
          <div>
            <p className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2">{release.type} · {release.year}</p>
            <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-1">{release.title}</h3>
            <p className="font-mono text-sm text-white/50">{release.label}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="https://open.spotify.com/artist/3zhrErhSD05oqdDKVs8UVR" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
              Spotify
            </a>
            <a href="https://soundcloud.com/stoleyyyyy" target="_blank" rel="noopener noreferrer" className="font-display text-xs font-bold tracking-widest uppercase px-5 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors">
              SoundCloud
            </a>
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
      >
        Close ✕
      </button>
    </motion.div>
  )
}

export default function Releases() {
  const [active, setActive] = useState<Release | null>(null)

  return (
    <section id="releases" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-surface/30">
      {/* Header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3">— Discography</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-text">Releases</h2>
        </div>
        <a
          href="https://open.spotify.com/artist/3zhrErhSD05oqdDKVs8UVR"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline hidden md:inline-block"
        >
          Spotify →
        </a>
      </div>

      <div className="line-glow mb-16" />

      {/* Scattered cover grid */}
      <div className="flex flex-wrap gap-6 md:gap-8 items-end">
        {releases.map((r, i) => (
          <CoverCard key={r.title} release={r} index={i} onOpen={() => setActive(r)} />
        ))}
      </div>

      <p className="font-mono text-xs text-muted mt-10 text-center tracking-widest uppercase">
        Click any cover to explore
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <LightboxModal release={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
