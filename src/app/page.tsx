// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import Work from '@/sections/Work'
import Manifesto from '@/sections/Manifesto'
import Lab from '@/sections/Lab'
import Contact from '@/sections/Contact'

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Push content below fixed navbar (adjust if your Navbar height changes) */}
      <div className="pt-14">
        <Hero />
        {/* Do NOT wrap in extra <section> if these already include <Section id="..."> */}
        <Work />
        <Manifesto />
        <Lab />
        <Contact />
      </div>
    </main>
  )
}
