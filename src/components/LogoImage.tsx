// src/components/LogoImage.tsx
'use client'

import Image, { type ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'placeholder' | 'blurDataURL'> & {
  fade?: boolean
}

/**
 * CLS-safe logo image:
 * - Uses explicit width/height or a fixed wrapper+fill pattern
 * - Lazy by default
 * - Optional hover fade
 */
export function LogoImage({ fade = true, className, loading = 'lazy', ...props }: Props) {
  return (
    <Image
      {...props}
      loading={loading}
      className={(fade ? 'opacity-80 transition hover:opacity-100 ' : '') + (className ?? '')}
    />
  )
}
