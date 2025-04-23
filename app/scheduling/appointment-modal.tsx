"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AppointmentModal({ onSave = () => {} }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patient: "",
    caregiver: "",
    date: "",
    time: "",
    type: "regular",
    notes: "",
  })

  // Sample data
  const patients = ["Eleanor Johnson", "Robert Williams", "Patricia Brown", "Michael Miller", "Jennifer Davis"]

  const caregivers = ["Maria Rodriguez", "James Smith", "Sarah Davis", "Thomas Johnson", "Lisa Williams"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setFormData({
      patient: "",
      caregiver: "",
      date: "",
      time: "",
      type: "regular",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>Fill in the information below to schedule a new appointment.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <select
                id="patient"
                name="patient"
                className="w-full p-2 border rounded-md"
                value={formData.patient}
                onChange={handleInputChange}
                required
              >
                <option value="">Select patient</option>
                {patients.map((patient, index) => (
                  <option key={index} value={patient}>
                    {patient}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caregiver">Caregiver</Label>
              <select
                id="caregiver"
                name="caregiver"
                className="w-full p-2 border rounded-md"
                value={formData.caregiver}
                onChange={handleInputChange}
                required
              >
                <option value="">Select caregiver</option>
                {caregivers.map((caregiver, index) => (
                  <option key={index} value={caregiver}>
                    {caregiver}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="pl-10"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  type="time"
                  className="pl-10"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="regular"
                  name="type"
                  value="regular"
                  checked={formData.type === "regular"}
                  onChange={handleInputChange}
                />
                <Label htmlFor="regular" className="cursor-pointer">
                  Regular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="medicare"
                  name="type"
                  value="medicare"
                  checked={formData.type === "medicare"}
                  onChange={handleInputChange}
                />
                <Label htmlFor="medicare" className="cursor-pointer">
                  Medicare
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="medicaid"
                  name="type"
                  value="medicaid"
                  checked={formData.type === "medicaid"}
                  onChange={handleInputChange}
                />
                <Label htmlFor="medicaid" className="cursor-pointer">
                  Medicaid
                </Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Add any notes about this appointment"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Schedule Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
