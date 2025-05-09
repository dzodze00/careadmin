"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AppointmentModal } from "./appointment-modal"

// Sample data - restored from original file
const weekDays = [
  {
    name: "Mon",
    date: "Apr 21",
    isToday: true,
    appointments: [
      {
        time: "9:00 AM",
        patient: "Eleanor Johnson",
        caregiver: "Maria Rodriguez",
        type: "medicare",
        status: "confirmed",
      },
      {
        time: "2:00 PM",
        patient: "Robert Williams",
        caregiver: "James Smith",
        type: "regular",
        status: "pending",
      },
    ],
  },
  {
    name: "Tue",
    date: "Apr 22",
    isToday: false,
    appointments: [
      {
        time: "10:30 AM",
        patient: "Patricia Brown",
        caregiver: "Sarah Davis",
        type: "medicaid",
        status: "confirmed",
      },
    ],
  },
  {
    name: "Wed",
    date: "Apr 23",
    isToday: false,
    appointments: [
      {
        time: "9:00 AM",
        patient: "Michael Miller",
        caregiver: "Maria Rodriguez",
        type: "medicare",
        status: "confirmed",
      },
      {
        time: "1:00 PM",
        patient: "Jennifer Davis",
        caregiver: "James Smith",
        type: "regular",
        status: "confirmed",
      },
      {
        time: "4:30 PM",
        patient: "William Wilson",
        caregiver: "Sarah Davis",
        type: "medicaid",
        status: "pending",
      },
    ],
  },
  {
    name: "Thu",
    date: "Apr 24",
    isToday: false,
    appointments: [
      {
        time: "11:00 AM",
        patient: "Elizabeth Taylor",
        caregiver: "Maria Rodriguez",
        type: "medicare",
        status: "confirmed",
      },
    ],
  },
  {
    name: "Fri",
    date: "Apr 25",
    isToday: false,
    appointments: [
      {
        time: "10:00 AM",
        patient: "David Anderson",
        caregiver: "James Smith",
        type: "regular",
        status: "confirmed",
      },
      {
        time: "3:30 PM",
        patient: "Susan Thomas",
        caregiver: "Sarah Davis",
        type: "medicaid",
        status: "confirmed",
      },
    ],
  },
  {
    name: "Sat",
    date: "Apr 26",
    isToday: false,
    appointments: [],
  },
  {
    name: "Sun",
    date: "Apr 27",
    isToday: false,
    appointments: [],
  },
]

const staffAvailability = [
  {
    name: "Maria Rodriguez",
    available: true,
    hours: "8:00 AM - 5:00 PM",
  },
  {
    name: "James Smith",
    available: true,
    hours: "9:00 AM - 6:00 PM",
  },
  {
    name: "Sarah Davis",
    available: true,
    hours: "7:00 AM - 4:00 PM",
  },
  {
    name: "Thomas Johnson",
    available: false,
    hours: "Off today",
  },
  {
    name: "Lisa Williams",
    available: true,
    hours: "10:00 AM - 7:00 PM",
  },
]

const upcomingAppointments = [
  {
    patient: "Eleanor Johnson",
    time: "Today, 2:00 PM",
    type: "medicare",
  },
  {
    patient: "Robert Williams",
    time: "Today, 4:30 PM",
    type: "regular",
  },
  {
    patient: "Patricia Brown",
    time: "Tomorrow, 9:00 AM",
    type: "medicaid",
  },
  {
    patient: "Michael Miller",
    time: "Tomorrow, 11:30 AM",
    type: "medicare",
  },
]

export default function SchedulingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("week")
  const [filter, setFilter] = useState("all")

  // Navigate between days/weeks
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
    // In a real app, this would update the database
    alert(`Appointment scheduled successfully for ${appointmentData.patient} with ${appointmentData.caregiver}!`)
  }

  // Change view
  const handleViewChange = (e) => {
    setView(e.target.value)
  }

  // Change filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <h1 className="text-xl font-bold">Scheduling</h1>
          </div>
          <AppointmentModal onSave={handleSaveAppointment} />
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => navigateDate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">April 21 - 27, 2025</h2>
              <Button variant="outline" size="icon" onClick={() => navigateDate(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <select value={filter} onChange={handleFilterChange} className="p-2 border rounded-md">
                <option value="all">All Caregivers</option>
                <option value="maria">Maria Rodriguez</option>
                <option value="james">James Smith</option>
                <option value="sarah">Sarah Davis</option>
              </select>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 ${view === "day" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => setView("day")}
                >
                  Day
                </button>
                <button
                  className={`px-3 py-1 ${view === "week" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => setView("week")}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1 ${view === "month" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  onClick={() => setView("month")}
                >
                  Month
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col">
                <div className="mb-2 text-center">
                  <p className="font-medium">{day.name}</p>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
                <Card className={`flex-1 ${day.isToday ? "border-primary" : ""}`}>
                  <CardContent className="p-2">
                    {day.appointments.map((appointment, appIndex) => (
                      <div
                        key={appIndex}
                        className={`mb-2 rounded-md p-2 text-xs ${
                          appointment.type === "regular"
                            ? "bg-blue-100"
                            : appointment.type === "medicare"
                              ? "bg-green-100"
                              : "bg-purple-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{appointment.time}</p>
                          <div
                            className={`h-2 w-2 rounded-full ${
                              appointment.status === "confirmed" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          />
                        </div>
                        <p>{appointment.patient}</p>
                        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                          <User className="h-3 w-3" />
                          <p>{appointment.caregiver}</p>
                        </div>
                      </div>
                    ))}
                    {day.appointments.length === 0 && (
                      <div className="flex h-full items-center justify-center py-4 text-center text-xs text-muted-foreground">
                        No appointments
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Availability</CardTitle>
                <CardDescription>View and manage caregiver schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffAvailability.map((staff, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${staff.available ? "bg-green-500" : "bg-red-500"}`} />
                        <p className="font-medium">{staff.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <p>{staff.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
                          <div
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              appointment.type === "regular"
                                ? "bg-blue-100"
                                : appointment.type === "medicare"
                                  ? "bg-green-100"
                                  : "bg-purple-100"
                            }`}
                          >
                            {appointment.type === "regular"
                              ? "Regular"
                              : appointment.type === "medicare"
                                ? "Medicare"
                                : "Medicaid"}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Viewing details for ${appointment.patient}`)}
                      >
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
