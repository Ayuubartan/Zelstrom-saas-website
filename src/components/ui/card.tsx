import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* Base card shell with variants */
const cardVariants = cva(
  [
    "flex flex-col rounded-2xl border shadow-sm", // shape + base
    "bg-card text-card-foreground",               // tokens
    "transition-[transform,shadow,background-color] duration-150 ease-out",
    "data-[interactive=true]:hover:shadow-md data-[interactive=true]:hover:-translate-y-0.5",
    "data-[interactive=true]:active:translate-y-0", // tap feedback
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",                               // uses bg-card
        subtle: "bg-background/40 backdrop-blur-sm",
        outline: "bg-transparent",
      },
      elevation: {
        "0": "shadow-none",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-lg",
      },
      density: {
        sm: "py-4",
        md: "py-6",
        lg: "py-8",
      },
      bordered: {
        true: "border-border",
        false: "border-transparent",
      },
      interactive: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      elevation: "sm",
      density: "md",
      bordered: true,
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  /** render as child (e.g., <Link>), keeps button-like semantics if needed */
  asChild?: boolean
}

function Card({
  className,
  variant,
  elevation,
  density,
  bordered,
  interactive,
  asChild,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="card"
      data-interactive={interactive ? "true" : undefined}
      className={cn(cardVariants({ variant, elevation, density, bordered }), className)}
      {...props}
    />
  )
}

/* Regions — unchanged API but with sensible defaults */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none text-lg", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
  )
}

/* Optional: named presets for convenience */
export const CardPresets = {
  // CTA card that hovers/elevates
  interactive: (props: Omit<CardProps, "interactive">) => (
    <Card interactive elevation="md" bordered variant="solid" {...props} />
  ),
  // Low-ink surface for dashboards
  subtle: (props: Omit<CardProps, "variant" | "bordered">) => (
    <Card variant="subtle" bordered={false} {...props} />
  ),
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
