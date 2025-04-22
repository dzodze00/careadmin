"use client"

import { useEffect } from "react"
import ReactDOM from "react-dom"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
  // Create portal container
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden"

    // Handle escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  // Create portal element
  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={onClose}>
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-auto rounded-lg shadow-lg flex flex-col z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-xl font-bold">{document.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 p-6 space-y-6">
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

          <div className="border rounded-md p-4 bg-gray-50">
            <h3 className="font-medium mb-2">Document Content</h3>

            <div className="border p-6 bg-white rounded min-h-[400px]">
              <h2 className="text-xl font-bold mb-4">{document.name}</h2>

              <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Patient Information</h3>
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
                <h3 className="text-lg font-medium mb-2">Provider Information</h3>
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
                <h3 className="text-lg font-medium mb-2">Document Content</h3>
                <div className="border p-4 rounded bg-gray-50">
                  <p className="whitespace-pre-line">{document.content || "This is the content of the document."}</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-4 border-t bg-white">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Document
          </Button>
        </div>
      </div>
    </div>
  )

  // Use portal to render outside of normal DOM hierarchy
  return ReactDOM.createPortal(modalContent, document.body)
}
