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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function ComplianceUpdateModal({ state, requirements, onSave = () => {} }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    notes: "",
    requirements: requirements.map((req) => ({
      ...req,
      completed: req.status === "Complete",
    })),
  })

  const handleRequirementChange = (index, completed) => {
    setFormData((prev) => {
      const newRequirements = [...prev.requirements]
      newRequirements[index] = {
        ...newRequirements[index],
        completed,
      }
      return { ...prev, requirements: newRequirements }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Update Compliance Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Compliance Status</DialogTitle>
          <DialogDescription>
            Update the compliance status for {state.name} ({state.code})
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label>Compliance Requirements</Label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-start space-x-3 border-b pb-3">
                <Checkbox
                  id={`req-${index}`}
                  checked={req.completed}
                  onCheckedChange={(checked) => handleRequirementChange(index, checked)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor={`req-${index}`} className="font-medium">
                    {req.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                  {!req.completed && req.dueDate && <p className="text-xs text-amber-600">Due: {req.dueDate}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about compliance updates"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
