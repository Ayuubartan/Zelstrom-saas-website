'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type Props = {
  /** primary (light) logo path or URL */
  src: string
  /** dark-mode variant path or URL (optional) */
  srcDark?: string
  /** remote fallback (e.g., Clearbit) if primary is missing */
  fallbackSrc?: string
  alt: string
  /** CLS-safe wrapper size */
  boxClassName?: string // e.g. "h-10 w-32"
  /** sizes for responsive fill */
  sizes?: string
  /** if true, auto invert logo in dark mode (when you only have one variant) */
  invertOnDark?: boolean
}

export default function SmartLogo({
  src,
  srcDark,
  fallbackSrc,
  alt,
  boxClassName = 'h-10 w-32',
  sizes = '(max-width: 640px) 35vw, (max-width: 1024px) 20vw, 160px',
  invertOnDark = false,
}: Props) {
  const [lightSrc, setLightSrc] = useState(src)
  const [darkSrc, setDarkSrc] = useState(srcDark)
  const [lightErrored, setLightErrored] = useState(false)
  const [darkErrored, setDarkErrored] = useState(false)

  const wrapperClasses = useMemo(
    () =>
      `relative ${boxClassName} shrink-0` +
      (invertOnDark ? ' dark:invert dark:brightness-100' : ''),
    [boxClassName, invertOnDark],
  )

  const Placeholder = () => (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-white/5 text-xs text-white/50">
      logo
    </div>
  )

  const onLightError = () => {
    if (fallbackSrc && lightSrc !== fallbackSrc) {
      setLightSrc(fallbackSrc)
      return
    }
    setLightErrored(true)
  }
  const onDarkError = () => {
    if (fallbackSrc && darkSrc !== fallbackSrc) {
      setDarkSrc(fallbackSrc)
      return
    }
    setDarkErrored(true)
  }

  const showPlaceholder =
    (!srcDark && lightErrored && !fallbackSrc) ||
    (srcDark && lightErrored && darkErrored && !fallbackSrc)

  return (
    <div className={wrapperClasses}>
      {/* Light version (hidden in .dark) */}
      {!lightErrored && (
        <Image
          src={lightSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-contain transition-opacity ${srcDark ? 'dark:opacity-0' : ''}`}
          onError={onLightError}
          loading="lazy"
        />
      )}

      {/* Dark version (visible in .dark if provided) */}
      {srcDark && !darkErrored && (
        <Image
          src={darkSrc!}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain opacity-0 transition-opacity dark:opacity-100"
          onError={onDarkError}
          loading="lazy"
        />
      )}

      {showPlaceholder && <Placeholder />}
    </div>
  )
}
