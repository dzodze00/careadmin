"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

interface TemplateViewerProps {
  template: {
    name: string
    type: string
    states: string[]
    description: string
    compliantWith: string
  }
}

export function TemplateViewer({ template }: TemplateViewerProps) {
  const [open, setOpen] = useState(false)

  const handleUseTemplate = () => {
    // In a real app, this would create a new document from the template
    alert(`Template "${template.name}" has been applied. You can now edit the document.`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <FileText className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{template.type}</Badge>
              {template.states.map((state, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {state}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border p-4 h-[300px] overflow-auto">
            <h3 className="text-lg font-bold mb-4">{template.name}</h3>
            <p className="mb-4">{template.description}</p>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Compliance Information</h4>
              <p>This template is compliant with: {template.compliantWith}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Template Fields</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Patient Information</li>
                <li>Provider Information</li>
                <li>Assessment Details</li>
                <li>Care Plan Elements</li>
                <li>Required Signatures</li>
                <li>State-Specific Requirements</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Usage Instructions</h4>
              <p>
                Click "Use Template" to create a new document based on this template. You will be able to fill in all
                required fields and save or print the document.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUseTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Use Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
