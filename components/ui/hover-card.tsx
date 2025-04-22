"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverCardProps {
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
}

interface HoverCardContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLElement>
}

const HoverCardContext = React.createContext<HoverCardContextValue | undefined>(undefined)

const HoverCard = ({ children, openDelay = 700, closeDelay = 300 }: HoverCardProps) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  const openTimeoutRef = React.useRef<NodeJS.Timeout>()
  const closeTimeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = undefined
    }

    openTimeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, openDelay)
  }, [openDelay])

  const handleMouseLeave = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = undefined
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, closeDelay)
  }, [closeDelay])

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current)
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const { triggerRef } = React.useContext(HoverCardContext) || {}
    const ref = React.useMemo(
      () => forwardedRef || triggerRef,
      [forwardedRef, triggerRef],
    ) as React.RefObject<HTMLElement>

    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        ref,
        ...props,
      })
    }

    return <div ref={ref} className={cn("", className)} {...props} />
  },
)
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { open, triggerRef } = React.useContext(HoverCardContext) || {}
    const [position, setPosition] = React.useState({ top: 0, left: 0 })

    React.useEffect(() => {
      if (open && triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + window.scrollX + rect.width / 2,
        })
      }
    }, [open, triggerRef])

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90",
          className,
        )}
        style={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translateX(-50%)",
        }}
        {...props}
      />
    )
  },
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
