"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"

export function NewTemplateModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    compliantWith: "",
    states: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (state: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      states: checked ? [...prev.states, state] : prev.states.filter((s) => s !== state),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the template to a database
    console.log("Creating template:", formData)

    // Show success message
    alert(`Template "${formData.name}" created successfully!`)

    // Reset form and close dialog
    setFormData({
      name: "",
      type: "",
      description: "",
      compliantWith: "",
      states: [],
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>Create a new documentation template for your organization.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Template Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Template Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Care Plan">Care Plan</SelectItem>
                  <SelectItem value="Visit Note">Visit Note</SelectItem>
                  <SelectItem value="Discharge">Discharge</SelectItem>
                  <SelectItem value="Authorization">Authorization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="compliantWith" className="text-right">
                Compliant With
              </Label>
              <Input
                id="compliantWith"
                name="compliantWith"
                value={formData.compliantWith}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., Medicare, Medicaid, OASIS-E"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Applicable States</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-all"
                    checked={formData.states.includes("All States")}
                    onCheckedChange={(checked) => handleStateChange("All States", checked as boolean)}
                  />
                  <label htmlFor="state-all">All States</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-ca"
                    checked={formData.states.includes("CA")}
                    onCheckedChange={(checked) => handleStateChange("CA", checked as boolean)}
                  />
                  <label htmlFor="state-ca">California (CA)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-fl"
                    checked={formData.states.includes("FL")}
                    onCheckedChange={(checked) => handleStateChange("FL", checked as boolean)}
                  />
                  <label htmlFor="state-fl">Florida (FL)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-tx"
                    checked={formData.states.includes("TX")}
                    onCheckedChange={(checked) => handleStateChange("TX", checked as boolean)}
                  />
                  <label htmlFor="state-tx">Texas (TX)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-oh"
                    checked={formData.states.includes("OH")}
                    onCheckedChange={(checked) => handleStateChange("OH", checked as boolean)}
                  />
                  <label htmlFor="state-oh">Ohio (OH)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="state-ga"
                    checked={formData.states.includes("GA")}
                    onCheckedChange={(checked) => handleStateChange("GA", checked as boolean)}
                  />
                  <label htmlFor="state-ga">Georgia (GA)</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
