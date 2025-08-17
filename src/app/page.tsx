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
      <div className="pt-14"> {/* Push content below navbar */}
        <Hero />
        <section id="work"><Work /></section>
        <section id="manifesto"><Manifesto /></section>
        <section id="lab"><Lab /></section>
        <section id="contact"><Contact /></section>
      </div>
    </main>
  )
}
