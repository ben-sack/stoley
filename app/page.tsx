import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Releases from '@/components/Releases'
import Shows from '@/components/Shows'
import Mixes from '@/components/Mixes'
import Connect from '@/components/Connect'
import Booking from '@/components/Booking'
import Cursor from '@/components/Cursor'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Releases />
        <Shows />
        <Mixes />
        <Connect />
        <Booking />
      </main>
      <footer className="border-t border-border bg-surface/40 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <Image
          src="/logo.png"
          alt="Stoley"
          width={80}
          height={32}
          className="h-7 w-auto opacity-70"
          style={{ mixBlendMode: 'multiply' }}
        />
        <span className="font-mono text-xs text-muted">© {new Date().getFullYear()} Stoley — All Rights Reserved</span>
        <span className="font-mono text-xs text-muted">Los Angeles, CA</span>
      </footer>
    </>
  )
}
