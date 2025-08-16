'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    default: 'bg-white/10 text-white hover:bg-white/20',
    secondary: 'border border-white/20 text-white hover:bg-white/10',
    ghost: 'text-white/80 hover:text-white',
  }
  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
