"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const AccordionContext = React.createContext<{
  value: string | null
  onValueChange: (value: string) => void
}>({
  value: null,
  onValueChange: () => {},
})

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", value, defaultValue, onValueChange, collapsible = false, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState<string | null>(value || defaultValue || null)

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        const newValue = selectedValue === itemValue && collapsible ? null : itemValue
        if (value === undefined) {
          setSelectedValue(newValue)
        }
        onValueChange?.(newValue || "")
      },
      [selectedValue, collapsible, value, onValueChange],
    )

    return (
      <AccordionContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("space-y-1", className)} {...props} />
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(({ className, value, ...props }, ref) => {
  return <div ref={ref} className={cn("border-b", className)} data-state={value ? "open" : "closed"} {...props} />
})
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)

    if (!itemContext) {
      throw new Error("AccordionTrigger must be used within an AccordionItem")
    }

    const isOpen = value === itemContext.value

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        onClick={() => onValueChange(itemContext.value)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    )
  },
)
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)

    if (!itemContext) {
      throw new Error("AccordionContent must be used within an AccordionItem")
    }

    const isOpen = value === itemContext.value

    return isOpen ? (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          className,
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    ) : null
  },
)
AccordionContent.displayName = "AccordionContent"

// Create a context for AccordionItem to pass its value to its children
const AccordionItemContext = React.createContext<{ value: string } | null>(null)

// Modify AccordionItem to provide context
const AccordionItemWithContext = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} data-state={value ? "open" : "closed"} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItemWithContext.displayName = "AccordionItem"

// Replace the original AccordionItem with the context-providing version
const AccordionItemExport = AccordionItemWithContext

export { Accordion, AccordionItemExport as AccordionItem, AccordionTrigger, AccordionContent }
