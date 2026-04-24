'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', venue: '', date: '', details: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value })),
  })

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-surface/40 relative overflow-hidden"
    >
      {/* Ghost text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black text-[14vw] text-border pointer-events-none select-none leading-none"
        aria-hidden="true"
      >
        BOOK
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-3"
        >
          — Bookings
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-6xl text-text mb-4"
        >
          Book Stoley
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-sm text-dim mb-12 leading-relaxed max-w-sm"
        >
          For DJ sets, events, and collaborations — fill in the details and I'll
          get back within 48 hours.
        </motion.p>

        <div className="line-glow mb-12" />

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-accent/40 bg-white p-10 text-center"
          >
            <div className="font-display font-black text-3xl text-accent mb-3">Message Sent</div>
            <p className="font-mono text-sm text-dim">I'll be in touch within 48 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-dim tracking-widest uppercase">Name *</label>
                <input className="field" type="text" placeholder="Your name" required {...field('name')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-dim tracking-widest uppercase">Email *</label>
                <input className="field" type="email" placeholder="your@email.com" required {...field('email')} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-dim tracking-widest uppercase">Venue / Event</label>
                <input className="field" type="text" placeholder="Where?" {...field('venue')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-dim tracking-widest uppercase">Date</label>
                <input className="field" type="date" {...field('date')} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-dim tracking-widest uppercase">Details *</label>
              <textarea
                className="field resize-none"
                rows={5}
                placeholder="Set time, attendance, event details…"
                required
                {...field('details')}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button type="submit" className="btn-primary">Send Inquiry</button>
              <span className="font-mono text-xs text-muted">
                Or: booking@stoley.com
              </span>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}
