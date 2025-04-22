"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setSelectedValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  return (
    <RadioGroupContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} role="radiogroup" {...props} />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
    value: string
  }
>(({ className, value, id, ...props }, ref) => {
  const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
  const checked = value === groupValue

  return (
    <span
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background",
        checked ? "bg-primary" : "bg-background",
        className,
      )}
    >
      <input
        type="radio"
        ref={ref}
        id={id}
        className="sr-only"
        value={value}
        checked={checked}
        onChange={() => onValueChange?.(value)}
        {...props}
      />
      {checked && (
        <span className="flex h-full w-full items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-background" />
        </span>
      )}
    </span>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
