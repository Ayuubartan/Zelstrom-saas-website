// src/sections/Contact.tsx
'use client'

import Section from './Section'
import { Field, FieldLabel, FieldHelp /*, FieldError */ } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)

  // TODO: replace with your real submit (Formspree or API route)
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if ((data.get('company') as string)?.trim()) {
      // bot detected—silently drop
      form.reset()
      return
    }

    try {
      setSubmitting(true)
      // Example mailto fallback:
      const email = data.get('email')
      const message = data.get('message')
      window.location.href = `mailto:hello@zelstrom.io?subject=Zelstrom%20Contact%20Request&body=${encodeURIComponent(
        `From: ${email}\n\n${message}`
      )}`
      // If using Formspree/route handler, POST here instead.
    } finally {
      setSubmitting(false)
      form.reset()
    }
  }

  return (
    <Section id="contact" heading="Contact" subheading="Partner with Zelstrom.">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
        <p className="text-zinc-300">
          Email us directly at{' '}
          <a href="mailto:hello@zelstrom.io" className="underline underline-offset-4">
            hello@zelstrom.io
          </a>
          , or use the form below.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          {/* Honeypot (hidden field) */}
          <input
            type="text"
            name="company"
            aria-hidden="true"
            tabIndex={-1}
            className="hidden"
            autoComplete="off"
          />

          <Field>
            <FieldLabel htmlFor="email">Your email</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" required />
            <FieldHelp>We’ll reply within one business day.</FieldHelp>
            {/* <FieldError>Invalid email</FieldError> */}
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea id="message" name="message" rows={5} required />
          </Field>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" className="hover-lift" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="hover-lift"
              onClick={() => (window.location.href = 'mailto:hello@zelstrom.io')}
            >
              Email instead
            </Button>
          </div>
        </form>
      </div>
    </Section>
  )
}
