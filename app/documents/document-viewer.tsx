"use client"

import { useEffect } from "react"
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
  // Handle escape key and body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    // Prevent scrolling
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEsc)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative z-[10000] flex max-h-[90vh] w-full max-w-4xl flex-col overflow-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <h2 className="text-xl font-bold">{document.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 space-y-6 p-6">
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

        <div className="sticky bottom-0 z-10 flex justify-end gap-2 border-t bg-white p-4">
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
}
