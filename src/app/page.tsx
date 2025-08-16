import Hero from '@/sections/Hero'
import Work from '@/sections/Work'
import Manifesto from '@/sections/Manifesto'
import Lab from '@/sections/Lab'
import Contact from '@/sections/Contact'

export default function Page() {
  return (
    <main className="min-h-screen pt-14"> {/* pt-14 so content isn't under the navbar */}
      <Hero />
      <Work />
      <Manifesto />
      <Lab />
      <Contact />
    </main>
  )
}
