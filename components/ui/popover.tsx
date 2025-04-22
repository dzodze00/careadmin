"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
}

interface PopoverContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined)

const Popover = ({ children }: PopoverProps) => {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>{children}</PopoverContext.Provider>
}

const usePopover = () => {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("usePopover must be used within a Popover provider")
  }
  return context
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, _ref) => {
    const { open, setOpen, triggerRef } = usePopover()

    return <button ref={triggerRef} type="button" className={className} onClick={() => setOpen(!open)} {...props} />
  },
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, align = "center", sideOffset = 4, ...props }, _ref) => {
  const { open, contentRef, triggerRef } = usePopover()
  const [position, setPosition] = React.useState({ top: 0, left: 0 })

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current?.getBoundingClientRect() || { width: 0, height: 0 }

      let left = 0
      if (align === "start") {
        left = triggerRect.left
      } else if (align === "center") {
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
      } else if (align === "end") {
        left = triggerRect.right - contentRect.width
      }

      setPosition({
        top: triggerRect.bottom + sideOffset,
        left: Math.max(10, left),
      })
    }
  }, [open, align, sideOffset])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "animate-in fade-in-0 zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      {...props}
    />
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
