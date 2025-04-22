"use client"

import { useState } from "react"
import { ArrowRight, Upload } from "lucide-react"
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

export function RegistrationModal({ isRenewal = false, onSave = () => {} }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    state: "",
    registrationType: "",
    businessName: "",
    dba: "",
    taxId: "",
    npi: "",
    address: "",
    cityStateZip: "",
    phone: "",
    email: "",
    documents: {
      businessLicense: false,
      professionalLicenses: false,
      liabilityInsurance: false,
      w9Form: false,
      voidedCheck: false,
      backgroundCheck: false,
      cmsForm: false,
      accreditationCertificate: false,
    },
    notes: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDocumentChange = (doc) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [doc]: true,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{isRenewal ? "Start Renewal" : "Start New State Registration"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isRenewal ? "Renew Registration" : "New Provider Registration"}</DialogTitle>
          <DialogDescription>
            {isRenewal
              ? "Complete the renewal process for your provider registration."
              : "Start a new registration process for a state."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">Select State</Label>
              <Select value={formData.state} onValueChange={(value) => handleChange("state", value)} required>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California (CA)</SelectItem>
                  <SelectItem value="FL">Florida (FL)</SelectItem>
                  <SelectItem value="GA">Georgia (GA)</SelectItem>
                  <SelectItem value="OH">Ohio (OH)</SelectItem>
                  <SelectItem value="NC">North Carolina (NC)</SelectItem>
                  <SelectItem value="NJ">New Jersey (NJ)</SelectItem>
                  <SelectItem value="VA">Virginia (VA)</SelectItem>
                  <SelectItem value="TX">Texas (TX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registration-type">Registration Type</Label>
              <Select
                value={formData.registrationType}
                onValueChange={(value) => handleChange("registrationType", value)}
                required
              >
                <SelectTrigger id="registration-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medicare">Medicare</SelectItem>
                  <SelectItem value="medicaid">Medicaid</SelectItem>
                  <SelectItem value="both">Both Medicare & Medicaid</SelectItem>
                  <SelectItem value="third-party">Third-Party Payer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isRenewal && (
            <>
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Legal Name</Label>
                <Input
                  id="business-name"
                  placeholder="Enter legal business name"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Federal Tax ID (EIN)</Label>
                  <Input
                    id="tax-id"
                    placeholder="XX-XXXXXXX"
                    value={formData.taxId}
                    onChange={(e) => handleChange("taxId", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input
                    id="npi"
                    placeholder="XXXXXXXXXX"
                    value={formData.npi}
                    onChange={(e) => handleChange("npi", e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Required Documents</Label>
            <div className="space-y-3">
              {Object.keys(formData.documents).map((doc, index) => {
                const docName = doc.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                return (
                  <div key={index} className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <h4 className="font-medium">{docName}</h4>
                    </div>
                    <Button variant="outline" type="button" onClick={() => handleDocumentChange(doc)}>
                      <Upload className="mr-2 h-4 w-4" />
                      {formData.documents[doc] ? "Uploaded" : "Upload"}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Save Draft
            </Button>
            <Button type="submit">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
