import * as React from "react"
import { cn } from "@/lib/utils"

export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5", className)} {...props} />
}
export function FieldLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm font-medium leading-none" {...props} />
}
export function FieldHelp(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-xs text-muted-foreground" {...props} />
}
export function FieldError(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-xs text-destructive" role="alert" {...props} />
}
