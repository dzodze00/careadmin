"use client"

import { Button } from "@/components/ui/button"

import * as React from "react"
import { cn } from "@/lib/utils"

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronsUpDown } from "lucide-react"

export const Select = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div className={cn("", className)} {...props} ref={ref}>
      {children}
    </div>
  ),
)
Select.displayName = "Select"

export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={false}
        className={cn("w-[200px] justify-between", className)}
        ref={ref}
        {...props}
      >
        {children}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  ),
)
SelectTrigger.displayName = "SelectTrigger"

export const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <PopoverContent className="w-[200px] p-0" {...props} ref={ref}>
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>{children}</CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  ),
)
SelectContent.displayName = "SelectContent"

export const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, children, value, ...props }, ref) => (
    <CommandItem className={cn("", className)} value={value} {...props}>
      {children}
    </CommandItem>
  ),
)
SelectItem.displayName = "SelectItem"

export const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span className={cn("ml-2 line-clamp-1 flex-1 text-left", className)} {...props} ref={ref} />
  ),
)
SelectValue.displayName = "SelectValue"
