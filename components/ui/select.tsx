"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent } from "@/components/ui/popover"

const SelectContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  onValueChange: (value: string) => void
}>({
  open: false,
  setOpen: () => {},
  value: "",
  onValueChange: () => {},
})

const Select = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      className,
      defaultValue,
      value: controlledValue,
      onValueChange,
      open: controlledOpen,
      onOpenChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

    const isControlledValue = controlledValue !== undefined
    const value = isControlledValue ? controlledValue : uncontrolledValue

    const isControlledOpen = controlledOpen !== undefined
    const open = isControlledOpen ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (isControlledOpen) {
          onOpenChange?.(newOpen)
        } else {
          setUncontrolledOpen(newOpen)
        }
      },
      [isControlledOpen, onOpenChange],
    )

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (isControlledValue) {
          onValueChange?.(newValue)
        } else {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
        setOpen(false)
      },
      [isControlledValue, onValueChange, setOpen],
    )

    return (
      <SelectContext.Provider value={{ open, setOpen, value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </SelectContext.Provider>
    )
  },
)
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, value } = React.useContext(SelectContext)

    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between font-normal", className)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    )
  },
)
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "item-aligned" | "popper"
    sideOffset?: number
    align?: "center" | "start" | "end"
  }
>(({ className, children, position = "popper", sideOffset = 4, align = "center", ...props }, ref) => {
  const { open } = React.useContext(SelectContext)

  if (!open) return null

  return (
    <Popover open={open}>
      <PopoverContent
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        sideOffset={sideOffset}
        align={align}
        {...props}
      >
        <div className="max-h-[var(--radix-popover-content-available-height)] overflow-auto">{children}</div>
      </PopoverContent>
    </Popover>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
  }
>(({ className, children, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
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
  const { value } = React.useContext(SelectContext)

  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {value ? children : placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
