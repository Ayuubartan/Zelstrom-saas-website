import * as React from "react";
import { cn } from "@/lib/utils";

// use a type alias instead of an empty interface
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("block w-full rounded-md border px-3 py-2", className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
