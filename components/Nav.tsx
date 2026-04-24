'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const links = [
  { label: 'Releases', href: '#releases' },
  { label: 'Shows', href: '#shows' },
  { label: 'Mixes', href: '#mixes' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-500 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <a href="#" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Stoley"
          width={100}
          height={40}
          className="h-8 w-auto"
          style={{ mixBlendMode: 'multiply' }}
          priority
        />
      </a>

      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-mono text-xs tracking-widest text-dim hover:text-accent transition-colors uppercase"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="btn-outline text-xs py-2 px-4">
            Book
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-px bg-text transition-transform duration-300 ${open ? 'translate-y-2.5 rotate-45' : ''}`} />
        <span className={`block w-6 h-px bg-text transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-text transition-transform duration-300 ${open ? '-translate-y-2.5 -rotate-45' : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-bg/98 backdrop-blur-md border-b border-border py-6 px-6 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-sm tracking-widest text-dim hover:text-accent transition-colors uppercase"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
