"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
      setMounted(false)
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "64rem",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10000,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{document.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div style={{ flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280" }}>Document Type</h3>
              <p>{document.type}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280" }}>Patient</h3>
              <p>{document.patient}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280" }}>Date</h3>
              <p>{document.date}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280" }}>Status</h3>
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

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              padding: "1rem",
              backgroundColor: "#f9fafb",
            }}
          >
            <h3 style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Document Content</h3>

            <div
              style={{
                border: "1px solid #e5e7eb",
                padding: "1.5rem",
                backgroundColor: "white",
                borderRadius: "0.375rem",
                minHeight: "400px",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>{document.name}</h2>

              <section style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.5rem" }}>Patient Information</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Name</p>
                    <p style={{ fontWeight: 500 }}>{document.patient}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>ID</p>
                    <p style={{ fontWeight: 500 }}>{document.patientId}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Date</p>
                    <p style={{ fontWeight: 500 }}>{document.date}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>State</p>
                    <p style={{ fontWeight: 500 }}>{document.state}</p>
                  </div>
                </div>
              </section>

              <section style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.5rem" }}>Provider Information</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Provider</p>
                    <p style={{ fontWeight: 500 }}>Home Health Care Services</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Provider ID</p>
                    <p style={{ fontWeight: 500 }}>HHA-12345</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.5rem" }}>Document Content</h3>
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: "1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <p style={{ whiteSpace: "pre-line" }}>{document.content || "This is the content of the document."}</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "sticky",
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            padding: "1rem",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Document
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
