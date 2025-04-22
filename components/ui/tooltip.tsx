"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  delayDuration?: number
}

interface TooltipContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLElement>
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined)

const Tooltip = ({ children, delayDuration = 700 }: TooltipProps) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, delayDuration)
  }, [delayDuration])

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setOpen(false)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, forwardedRef) => {
    const { triggerRef } = React.useContext(TooltipContext) || {}
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

    return <span ref={ref} className={cn("", className)} {...props} />
  },
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { open, triggerRef } = React.useContext(TooltipContext) || {}
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
        role="tooltip"
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
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
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent }
