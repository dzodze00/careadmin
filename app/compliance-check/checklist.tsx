"use client"

import { useState } from "react"
import { Check, AlertTriangle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ChecklistItem {
  id: string
  title: string
  description: string
  state: string
  program: string
  required: boolean
  completed: boolean
}

export function ComplianceChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "item1",
      title: "Face-to-Face Documentation",
      description: "Verify that face-to-face documentation is completed and signed by the physician",
      state: "All States",
      program: "Medicare",
      required: true,
      completed: false,
    },
    {
      id: "item2",
      title: "OASIS Assessment",
      description: "Ensure OASIS assessment is completed within the required timeframe",
      state: "All States",
      program: "Medicare",
      required: true,
      completed: false,
    },
    {
      id: "item3",
      title: "Plan of Care Certification",
      description: "Verify that the plan of care is certified by the physician",
      state: "All States",
      program: "Medicare",
      required: true,
      completed: false,
    },
    {
      id: "item4",
      title: "Medicaid Prior Authorization",
      description: "Ensure Medicaid prior authorization is obtained before services begin",
      state: "TX",
      program: "Medicaid",
      required: true,
      completed: false,
    },
    {
      id: "item5",
      title: "EVV Compliance",
      description: "Verify that EVV is being used for all required visits",
      state: "TX",
      program: "Medicaid",
      required: true,
      completed: false,
    },
    {
      id: "item6",
      title: "HIPAA Acknowledgment",
      description: "Ensure patient has signed HIPAA acknowledgment form",
      state: "All States",
      program: "All Programs",
      required: true,
      completed: false,
    },
    {
      id: "item7",
      title: "Advance Directive",
      description: "Verify that advance directive information has been provided to the patient",
      state: "All States",
      program: "All Programs",
      required: true,
      completed: false,
    },
  ])

  const [stateFilter, setStateFilter] = useState("All States")
  const [programFilter, setProgramFilter] = useState("All Programs")

  const handleCheckboxChange = (id: string) => {
    setChecklistItems(checklistItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const filteredItems = checklistItems.filter(
    (item) =>
      (stateFilter === "All States" || item.state === stateFilter || item.state === "All States") &&
      (programFilter === "All Programs" || item.program === programFilter || item.program === "All Programs"),
  )

  const completedCount = filteredItems.filter((item) => item.completed).length
  const progress = filteredItems.length > 0 ? (completedCount / filteredItems.length) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="All States">All States</option>
            <option value="CA">California (CA)</option>
            <option value="FL">Florida (FL)</option>
            <option value="TX">Texas (TX)</option>
            <option value="OH">Ohio (OH)</option>
          </select>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option value="All Programs">All Programs</option>
            <option value="Medicare">Medicare</option>
            <option value="Medicaid">Medicaid</option>
            <option value="Private">Private Pay</option>
          </select>
        </div>
        <Button onClick={() => alert("Compliance report generated and ready for download")}>
          Generate Compliance Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Checklist</CardTitle>
          <CardDescription>Track and verify compliance with state and federal requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Completion Progress: {completedCount} of {filteredItems.length} items
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 border-b pb-3">
                <Checkbox id={item.id} checked={item.completed} onCheckedChange={() => handleCheckboxChange(item.id)} />
                <div className="flex-1">
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    {item.title}
                    {item.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                    {item.state !== "All States" && (
                      <Badge variant="outline" className="text-xs">
                        {item.state}
                      </Badge>
                    )}
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <div>
                  {item.completed ? (
                    <Badge className="bg-green-100 text-green-800">
                      <Check className="mr-1 h-3 w-3" />
                      Complete
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="mr-2 h-4 w-4" />
            <p>
              This checklist helps ensure compliance with state and federal regulations for home health care services.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
