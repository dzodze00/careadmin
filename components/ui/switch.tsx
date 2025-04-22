"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <div className="relative inline-flex h-6 w-11 items-center rounded-full">
      <input type="checkbox" id={id} ref={ref} className="peer sr-only" {...props} />
      <label
        htmlFor={id}
        className={cn(
          "peer-focus-visible:ring-offset-background peer-focus-visible:ring-ring absolute inset-0 cursor-pointer rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
      >
        <span
          className="block h-5 w-5 translate-x-0.5 rounded-full bg-background transition-transform peer-checked:translate-x-5"
          aria-hidden="true"
        />
        <span className="sr-only">Toggle</span>
      </label>
    </div>
  )
})
Switch.displayName = "Switch"

export { Switch }
