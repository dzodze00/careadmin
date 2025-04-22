"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
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

export function CredentialModal({ staff, credential, isRenewal = false, onSave = () => {} }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    staffName: staff || "",
    credentialType: credential || "",
    state: "",
    issueDate: "",
    expirationDate: "",
    licenseNumber: "",
    verificationUrl: "",
    notes: "",
    documentUploaded: false,
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
        <Button size="sm">{isRenewal ? "Start Renewal" : "View Details"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isRenewal ? "Credential Renewal" : "Credential Details"}</DialogTitle>
          <DialogDescription>
            {isRenewal ? `Renew ${credential} for ${staff}` : `View and manage credential details`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staffName">Staff Member</Label>
            <Input
              id="staffName"
              value={formData.staffName}
              onChange={(e) => handleChange("staffName", e.target.value)}
              readOnly={!!staff}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialType">Credential Type</Label>
            <Select
              value={formData.credentialType}
              onValueChange={(value) => handleChange("credentialType", value)}
              disabled={!!credential}
              required
            >
              <SelectTrigger id="credentialType">
                <SelectValue placeholder="Select credential type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RN License">RN License</SelectItem>
                <SelectItem value="LPN License">LPN License</SelectItem>
                <SelectItem value="PT License">PT License</SelectItem>
                <SelectItem value="OT License">OT License</SelectItem>
                <SelectItem value="HHA Certification">HHA Certification</SelectItem>
                <SelectItem value="CPR Certification">CPR Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={formData.state} onValueChange={(value) => handleChange("state", value)} required>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California (CA)</SelectItem>
                <SelectItem value="FL">Florida (FL)</SelectItem>
                <SelectItem value="TX">Texas (TX)</SelectItem>
                <SelectItem value="GA">Georgia (GA)</SelectItem>
                <SelectItem value="OH">Ohio (OH)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="issueDate"
                  type="date"
                  className="pl-10"
                  value={formData.issueDate}
                  onChange={(e) => handleChange("issueDate", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="expirationDate"
                  type="date"
                  className="pl-10"
                  value={formData.expirationDate}
                  onChange={(e) => handleChange("expirationDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License/Certificate Number</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) => handleChange("licenseNumber", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationUrl">Verification URL</Label>
            <Input
              id="verificationUrl"
              type="url"
              placeholder="https://verification.example.com"
              value={formData.verificationUrl}
              onChange={(e) => handleChange("verificationUrl", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Document Upload</Label>
            <div className="border rounded-md p-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleChange("documentUploaded", true)}
              >
                {formData.documentUploaded ? "Document Uploaded" : "Upload Document"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this credential"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit">{isRenewal ? "Submit Renewal" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
