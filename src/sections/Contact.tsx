// src/sections/Contact.tsx
'use client'

import Section from '@/sections/Section' // or './Section' if you prefer relative
export default function Contact() {
  return (
    <Section id="contact" heading="Contact" subheading="Partner with Zelstrom.">
      <div className="rounded-2xl border border-white/10 p-8 bg-gradient-to-br from-white/5 to-white/0">
        <p className="text-zinc-300">Email: hello@zelstrom.io</p>
        <a
          href="mailto:hello@zelstrom.io"
          className="mt-6 inline-block rounded-xl bg-white/90 px-6 py-3 text-black font-semibold hover:bg-white"
        >
          Get in touch
        </a>
      </div>
    </Section>
  )
}
