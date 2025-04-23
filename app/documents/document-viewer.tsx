"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface DocumentViewerProps {
  document: {
    id: string
    name: string
    type: string
    patient: string
    patientId: string
    date: string
    state: string
    status: string
    content?: string
  }
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const [isOpen, setIsOpen] = useState(true)

  // Handle dialog close
  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] w-full overflow-auto">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Document Type</h3>
              <p>{document.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Patient</h3>
              <p>{document.patient}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
              <p>{document.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge
                className={
                  document.status === "Complete"
                    ? "bg-green-100 text-green-800"
                    : document.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {document.status}
              </Badge>
            </div>
          </div>

          <div className="rounded-md border bg-gray-50 p-4">
            <h3 className="mb-2 font-medium">Document Content</h3>

            <div className="min-h-[400px] rounded bg-white border p-6">
              <h2 className="mb-4 text-xl font-bold">{document.name}</h2>

              <section className="mb-6">
                <h3 className="mb-2 text-lg font-medium">Patient Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{document.patient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="font-medium">{document.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{document.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-medium">{document.state}</p>
                  </div>
                </div>
              </section>

              <section className="mb-6">
                <h3 className="mb-2 text-lg font-medium">Provider Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-medium">Home Health Care Services</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provider ID</p>
                    <p className="font-medium">HHA-12345</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-medium">Document Content</h3>
                <div className="rounded border bg-gray-50 p-4">
                  <p className="whitespace-pre-line">{document.content || "This is the content of the document."}</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
