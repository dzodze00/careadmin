"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TemplateViewerProps {
  template: any
  onClose?: () => void
}

export function TemplateViewer({ template, onClose }: TemplateViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  // Prevent scrolling when modal is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handleOpen} className="flex-1">
        View Template
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-lg flex flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white">
              <h2 className="text-xl font-bold">{template.name}</h2>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Template Type</h3>
                  <p>{template.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">States</h3>
                  <p>{template.states.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Compliant With</h3>
                  <p>{template.compliantWith}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                  <p>April 15, 2025</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <p>{template.description}</p>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium mb-4">Template Preview</h3>

                <div className="border p-6 bg-white rounded min-h-[400px]">
                  <h2 className="text-xl font-bold mb-4">{template.name}</h2>

                  {template.type === "Assessment" && (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Patient Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Patient Name</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Date of Birth</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Medical Record #</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Insurance</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-medium mb-2">Assessment Details</h3>
                        <div className="space-y-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Primary Diagnosis</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Secondary Diagnoses</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Functional Limitations</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {template.type === "Care Plan" && (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Patient Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Patient Name</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Date of Birth</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-medium mb-2">Care Plan Details</h3>
                        <div className="space-y-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Goals</p>
                            <p>1. _______________________</p>
                            <p>2. _______________________</p>
                            <p>3. _______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Interventions</p>
                            <p>1. _______________________</p>
                            <p>2. _______________________</p>
                            <p>3. _______________________</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {template.type === "Visit Note" && (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Visit Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Patient Name</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Visit Date</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Provider</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Visit Type</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-medium mb-2">Visit Notes</h3>
                        <div className="border p-2 rounded h-32">
                          <p className="text-sm text-muted-foreground">Notes</p>
                          <p>_______________________</p>
                        </div>
                      </section>
                    </div>
                  )}

                  {template.type === "Authorization" && (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Authorization Request</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Patient Name</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Insurance ID</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Service Requested</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Diagnosis Code</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-medium mb-2">Justification</h3>
                        <div className="border p-2 rounded h-32">
                          <p className="text-sm text-muted-foreground">Medical Necessity</p>
                          <p>_______________________</p>
                        </div>
                      </section>
                    </div>
                  )}

                  {template.type === "Discharge" && (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-medium mb-2">Discharge Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Patient Name</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Discharge Date</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-medium mb-2">Discharge Summary</h3>
                        <div className="space-y-4">
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Reason for Discharge</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Goals Met</p>
                            <p>_______________________</p>
                          </div>
                          <div className="border p-2 rounded">
                            <p className="text-sm text-muted-foreground">Follow-up Recommendations</p>
                            <p>_______________________</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-4 border-t bg-white">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
