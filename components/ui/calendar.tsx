"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Helper functions for date manipulation
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}

function parseDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isToday(date: Date) {
  return isSameDay(date, new Date())
}

interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to: Date }) => void
  disabled?: { from: Date; to: Date } | ((date: Date) => boolean)
  className?: string
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ mode = "single", selected, onSelect, disabled, className }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())

    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const handlePreviousMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }

    const handleDateClick = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day)
      if (onSelect) {
        if (mode === "single") {
          onSelect(selectedDate)
        } else if (mode === "multiple" && Array.isArray(selected)) {
          const isSelected = selected.some((date) => isSameDay(date, selectedDate))
          if (isSelected) {
            onSelect(selected.filter((date) => !isSameDay(date, selectedDate)))
          } else {
            onSelect([...selected, selectedDate])
          }
        } else if (mode === "range" && selected && "from" in selected) {
          // Simple range selection logic
          if (!selected.to) {
            onSelect({ from: selected.from, to: selectedDate })
          } else {
            onSelect({ from: selectedDate, to: undefined })
          }
        }
      }
    }

    const isDateSelected = (day: number) => {
      const date = new Date(currentYear, currentMonth, day)
      if (!selected) return false

      if (mode === "single" && selected instanceof Date) {
        return isSameDay(date, selected)
      } else if (mode === "multiple" && Array.isArray(selected)) {
        return selected.some((d) => isSameDay(date, d))
      } else if (mode === "range" && selected && "from" in selected) {
        if (selected.from && selected.to) {
          return date >= selected.from && date <= selected.to
        }
        return selected.from && isSameDay(date, selected.from)
      }
      return false
    }

    const isDateDisabled = (day: number) => {
      const date = new Date(currentYear, currentMonth, day)
      if (!disabled) return false

      if (typeof disabled === "function") {
        return disabled(date)
      } else if (disabled.from && disabled.to) {
        return date >= disabled.from && date <= disabled.to
      }
      return false
    }

    return (
      <div ref={ref} className={cn("p-3", className)}>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <div className="font-medium">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-9 w-9" />
          ))}
          {days.map((day) => {
            const isSelected = isDateSelected(day)
            const isDisabled = isDateDisabled(day)
            const isTodayDate = isToday(new Date(currentYear, currentMonth, day))

            return (
              <Button
                key={day}
                variant="ghost"
                size="sm"
                disabled={isDisabled}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "h-9 w-9 rounded-md p-0 font-normal",
                  isSelected && "bg-primary text-primary-foreground",
                  isTodayDate && !isSelected && "border border-primary",
                  isDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {day}
              </Button>
            )
          })}
        </div>
      </div>
    )
  },
)
Calendar.displayName = "Calendar"

export { Calendar }
