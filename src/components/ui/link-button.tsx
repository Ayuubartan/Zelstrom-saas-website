import Link, { LinkProps } from "next/link"
import * as React from "react"
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
}
export default function LinkButton({ className, variant, size, ...props }: Props) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
