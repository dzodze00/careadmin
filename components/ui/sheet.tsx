"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
}

interface SheetContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  side: "top" | "right" | "bottom" | "left"
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined)

function useSheetContext() {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error("useSheetContext must be used within a Sheet provider")
  }
  return context
}

const Sheet = ({ children, open: controlledOpen, onOpenChange, side = "right" }: SheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (open: boolean) => {
      if (isControlled) {
        onOpenChange?.(open)
      } else {
        setUncontrolledOpen(open)
      }
    },
    [isControlled, onOpenChange],
  )

  return <SheetContext.Provider value={{ open, setOpen, side }}>{children}</SheetContext.Provider>
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useSheetContext()

    return <button ref={ref} className={className} onClick={() => setOpen(true)} {...props} />
  },
)
SheetTrigger.displayName = "SheetTrigger"

const SheetClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useSheetContext()

    return <button ref={ref} className={className} onClick={() => setOpen(false)} {...props} />
  },
)
SheetClose.displayName = "SheetClose"

const SheetOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { open, setOpen } = useSheetContext()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm", "animate-in fade-in-0", className)}
        onClick={() => setOpen(false)}
        {...props}
      />
    )
  },
)
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, side } = useSheetContext()

    if (!open) return null

    return (
      <>
        <SheetOverlay />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-background p-6 shadow-lg",
            "animate-in",
            side === "top" && "inset-x-0 top-0 border-b",
            side === "bottom" && "inset-x-0 bottom-0 border-t",
            side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            className,
          )}
          {...props}
        >
          {children}
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
      </>
    )
  },
)
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
  ),
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  ),
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  ),
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
SheetDescription.displayName = "SheetDescription"

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
