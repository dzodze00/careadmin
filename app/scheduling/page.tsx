"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AppointmentModal } from "./appointment-modal"
import { Badge } from "@/components/ui/badge"

// Sample data
const initialAppointments = [
  {
    id: "1",
    patient: "Eleanor Johnson",
    caregiver: "Maria Rodriguez",
    date: "2025-04-22",
    time: "09:00",
    type: "regular",
    status: "confirmed",
  },
  {
    id: "2",
    patient: "Robert Williams",
    caregiver: "James Smith",
    date: "2025-04-22",
    time: "10:30",
    type: "medicare",
    status: "pending",
  },
  {
    id: "3",
    patient: "Patricia Brown",
    caregiver: "Sarah Davis",
    date: "2025-04-23",
    time: "14:00",
    type: "medicaid",
    status: "confirmed",
  },
]

export default function SchedulingPage() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("day")
  const [filter, setFilter] = useState("all")

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Navigate between days
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(newDate.getDate() + direction)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + direction * 7)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + direction)
    }
    setCurrentDate(newDate)
  }

  // Handle saving a new appointment
  const handleSaveAppointment = (appointmentData) => {
    const newAppointment = {
      id: (appointments.length + 1).toString(),
      ...appointmentData,
      status: "pending",
    }
    setAppointments([...appointments, newAppointment])
    alert("Appointment scheduled successfully!")
  }

  // Change view
  const handleViewChange = (e) => {
    setView(e.target.value)
  }

  // Change filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  // Filter appointments for the current view
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by date
    const appointmentDate = new Date(appointment.date)
    const today = new Date(currentDate)
    today.setHours(0, 0, 0, 0)

    let dateMatch = false
    if (view === "day") {
      dateMatch = appointmentDate.toDateString() === today.toDateString()
    } else if (view === "week") {
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      dateMatch = appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    } else if (view === "month") {
      dateMatch =
        appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear()
    }

    // Filter by status
    const statusMatch = filter === "all" || appointment.status === filter

    return dateMatch && statusMatch
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Scheduling</h1>
        <AppointmentModal onSave={handleSaveAppointment} />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{formatDate(currentDate)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <div>
                <select value={view} onChange={handleViewChange} className="p-2 border rounded-md">
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div>
                <select value={filter} onChange={handleFilterChange} className="p-2 border rounded-md">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <div className="flex">
                    <div
                      className={`w-2 h-full ${
                        appointment.type === "medicare"
                          ? "bg-blue-500"
                          : appointment.type === "medicaid"
                            ? "bg-green-500"
                            : "bg-gray-500"
                      }`}
                    ></div>
                    <CardContent className="p-4 flex justify-between items-center w-full">
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.caregiver}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : appointment.status === "pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No appointments found for this view.</p>
              <Button variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add Appointment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
