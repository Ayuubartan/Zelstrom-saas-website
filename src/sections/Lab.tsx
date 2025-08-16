// Contact.tsx
'use client'
export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-semibold">Contact</h2>
        <p className="mt-3 text-white/70">Let’s build your predictive media edge.</p>
        <a
          href="mailto:hello@zelstrom.io"
          className="mt-6 inline-block rounded-xl bg-white/10 px-5 py-3 text-white hover:bg-white/20 transition"
        >
          hello@zelstrom.io
        </a>
      </div>
    </section>
  )
}
