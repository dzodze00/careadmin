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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AppointmentModal({ isEdit = false, appointment = null, onSave = () => {} }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patient: appointment?.patient || "",
    caregiver: appointment?.caregiver || "",
    date: appointment?.date?.split(" ")[1] || "",
    time: appointment?.time || "",
    type: appointment?.type || "regular",
    notes: "",
    status: appointment?.status || "pending",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{isEdit ? "Edit Appointment" : "New Appointment"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Appointment" : "New Appointment"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the appointment details below."
              : "Fill in the information below to schedule a new appointment."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select value={formData.patient} onValueChange={(value) => handleChange("patient", value)}>
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eleanor Johnson">Eleanor Johnson</SelectItem>
                  <SelectItem value="Robert Williams">Robert Williams</SelectItem>
                  <SelectItem value="Patricia Brown">Patricia Brown</SelectItem>
                  <SelectItem value="Michael Miller">Michael Miller</SelectItem>
                  <SelectItem value="Jennifer Davis">Jennifer Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caregiver">Caregiver</Label>
              <Select value={formData.caregiver} onValueChange={(value) => handleChange("caregiver", value)}>
                <SelectTrigger id="caregiver">
                  <SelectValue placeholder="Select caregiver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria Rodriguez">Maria Rodriguez</SelectItem>
                  <SelectItem value="James Smith">James Smith</SelectItem>
                  <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
                  <SelectItem value="Thomas Johnson">Thomas Johnson</SelectItem>
                  <SelectItem value="Lisa Williams">Lisa Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Appointment Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="cursor-pointer">
                  Regular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medicare" id="medicare" />
                <Label htmlFor="medicare" className="cursor-pointer">
                  Medicare
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medicaid" id="medicaid" />
                <Label htmlFor="medicaid" className="cursor-pointer">
                  Medicaid
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this appointment"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{isEdit ? "Update Appointment" : "Schedule Appointment"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
