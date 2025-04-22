"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, defaultValue, value: controlledValue, onValueChange, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || "")

  // Handle controlled component
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn("relative w-full", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === SelectTrigger) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  value,
                  onClick: () => setOpen(!open),
                })
              }
              return child
            })}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-select-trigger-width] p-0">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(child as React.ReactElement<any>, {
                value,
                onValueChange: handleValueChange,
              })
            }
            return child
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string
  }
>(({ className, children, value, ...props }, ref) => {
  // Find the selected item's label
  let selectedLabel = value
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.value === value) {
      selectedLabel = child.props.children
    }
  })

  return (
    <Button
      ref={ref}
      variant="outline"
      role="combobox"
      aria-expanded={props["aria-expanded"]}
      className={cn("w-full justify-between font-normal", className)}
      {...props}
    >
      <span className="flex-1 text-left">{selectedLabel || children}</span>
      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, children, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      <div className="max-h-[var(--radix-select-content-available-height)] overflow-auto">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<any>, {
              selected: child.props.value === value,
              onSelect: () => onValueChange?.(child.props.value),
            })
          }
          return child
        })}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    selected?: boolean
    onSelect?: () => void
  }
>(({ className, children, selected, onSelect, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        selected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={onSelect}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <Check className="h-4 w-4" />}
      </span>
      <span className="text-sm">{children}</span>
    </div>
  )
})
SelectItem.displayName = "SelectItem"

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string
  }
>(({ className, children, placeholder, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {children || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
