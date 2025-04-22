"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

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

export function UploadDocumentModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    documentName: "",
    documentType: "",
    patient: "",
    state: "",
    file: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the file to a server
    console.log("Uploading document:", formData)

    // Show success message
    alert(`Document ${formData.documentName} uploaded successfully!`)

    // Reset form and close dialog
    setFormData({
      documentName: "",
      documentType: "",
      patient: "",
      state: "",
      file: null,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto z-[100]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Upload a document to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentName" className="text-right">
                Document Name
              </Label>
              <Input
                id="documentName"
                name="documentName"
                value={formData.documentName}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="documentType" className="text-right">
                Document Type
              </Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) => handleSelectChange("documentType", value)}
                name="documentType"
              >
                <SelectTrigger id="documentType" className="col-span-3">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Consent">Consent Form</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="Care Plan">Care Plan</SelectItem>
                  <SelectItem value="Visit Note">Visit Note</SelectItem>
                  <SelectItem value="Clinical">Clinical Form</SelectItem>
                  <SelectItem value="Authorization">Authorization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">
                Patient
              </Label>
              <Select
                value={formData.patient}
                onValueChange={(value) => handleSelectChange("patient", value)}
                name="patient"
              >
                <SelectTrigger id="patient" className="col-span-3">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Eleanor Johnson">Eleanor Johnson</SelectItem>
                  <SelectItem value="Robert Williams">Robert Williams</SelectItem>
                  <SelectItem value="Patricia Brown">Patricia Brown</SelectItem>
                  <SelectItem value="Michael Miller">Michael Miller</SelectItem>
                  <SelectItem value="Jennifer Davis">Jennifer Davis</SelectItem>
                  <SelectItem value="William Wilson">William Wilson</SelectItem>
                  <SelectItem value="Elizabeth Taylor">Elizabeth Taylor</SelectItem>
                  <SelectItem value="David Anderson">David Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)} name="state">
                <SelectTrigger id="state" className="col-span-3">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="CA">California (CA)</SelectItem>
                  <SelectItem value="FL">Florida (FL)</SelectItem>
                  <SelectItem value="GA">Georgia (GA)</SelectItem>
                  <SelectItem value="OH">Ohio (OH)</SelectItem>
                  <SelectItem value="NC">North Carolina (NC)</SelectItem>
                  <SelectItem value="TX">Texas (TX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Document File
              </Label>
              <Input id="file" name="file" type="file" onChange={handleFileChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-2">
            <Button type="submit">Upload Document</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
