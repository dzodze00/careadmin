"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"

export function AddStaffModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
    states: [],
    credentials: [],
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStateChange = (state) => {
    setFormData((prev) => {
      const states = [...prev.states]
      if (states.includes(state)) {
        return { ...prev, states: states.filter((s) => s !== state) }
      } else {
        return { ...prev, states: [...states, state] }
      }
    })
  }

  const handleCredentialChange = (credential) => {
    setFormData((prev) => {
      const credentials = [...prev.credentials]
      if (credentials.includes(credential)) {
        return { ...prev, credentials: credentials.filter((c) => c !== credential) }
      } else {
        return { ...prev, credentials: [...credentials, credential] }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Adding staff member:", formData)
    alert(`Staff member ${formData.name} added successfully!`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Staff Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>Enter the staff member's information below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Registered Nurse">Registered Nurse</SelectItem>
                  <SelectItem value="Home Health Aide">Home Health Aide</SelectItem>
                  <SelectItem value="Physical Therapist">Physical Therapist</SelectItem>
                  <SelectItem value="Occupational Therapist">Occupational Therapist</SelectItem>
                  <SelectItem value="Speech Therapist">Speech Therapist</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">State Licenses</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {["FL", "GA", "TX", "NY", "CA", "PA"].map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state}`}
                      checked={formData.states.includes(state)}
                      onCheckedChange={() => handleStateChange(state)}
                    />
                    <Label htmlFor={`state-${state}`} className="cursor-pointer">
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Credentials</Label>
              <div className="col-span-3 grid grid-cols-1 gap-2">
                {["RN License", "HHA Certification", "PT License", "OT License", "CPR Certification"].map(
                  (credential) => (
                    <div key={credential} className="flex items-center space-x-2">
                      <Checkbox
                        id={`credential-${credential}`}
                        checked={formData.credentials.includes(credential)}
                        onCheckedChange={() => handleCredentialChange(credential)}
                      />
                      <Label htmlFor={`credential-${credential}`} className="cursor-pointer">
                        {credential}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Staff Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
