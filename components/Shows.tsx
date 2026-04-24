'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const shows = [
  { venue: 'Wurstküche Venice', location: 'Venice, CA', type: 'Club Night', note: null },
  { venue: 'Brooklyn Navy Yard', location: 'Brooklyn, NY', type: 'Festival Stage', note: null },
  { venue: '6th Street Bridge', location: 'Los Angeles, CA', type: 'Outdoor Event', note: 'w/ Dennis Ferrer' },
]

export default function Shows() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="shows" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div ref={ref}>
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3"
          >
            — Live
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl md:text-6xl text-text"
          >
            Shows
          </motion.h2>
        </div>

        <div className="line-solid mb-0" />

        <div className="flex flex-col">
          {shows.map((show, i) => (
            <motion.div
              key={show.venue}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group border-b border-border py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-0 relative cursor-default hover:bg-surface/60 transition-colors duration-300 px-2 -mx-2"
            >
              <span className="font-mono text-xs text-muted w-12 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-text group-hover:text-accent transition-colors duration-300">
                  {show.venue}
                </h3>
                {show.note && (
                  <p className="font-mono text-xs text-dim mt-1">{show.note}</p>
                )}
              </div>

              <div className="flex items-center gap-4 md:gap-8 ml-12 md:ml-0">
                <span className="font-mono text-xs text-dim">{show.location}</span>
                <span className="tag">{show.type}</span>
              </div>

              {/* Left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Ghost text */}
        <div
          className="absolute right-0 bottom-4 font-display font-black text-[12vw] text-border pointer-events-none select-none leading-none"
          aria-hidden="true"
        >
          LIVE
        </div>
      </div>
    </section>
  )
}
