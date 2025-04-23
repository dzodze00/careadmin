"use client"

import { Calendar, Check, FileText, Info, Shield } from "lucide-react"
import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ComplianceWorkflowPage() {
  const [stateFilter, setStateFilter] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold">Compliance Workflow Framework</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="CA">California (CA)</SelectItem>
                <SelectItem value="FL">Florida (FL)</SelectItem>
                <SelectItem value="GA">Georgia (GA)</SelectItem>
                <SelectItem value="OH">Ohio (OH)</SelectItem>
                <SelectItem value="TX">Texas (TX)</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Download Framework
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Compliance Workflow Framework</AlertTitle>
            <AlertDescription>
              Comprehensive overview of ongoing compliance requirements including credential tracking, supervision,
              incident reporting, and quality assurance processes.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="requirements" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="requirements">Ongoing Requirements</TabsTrigger>
              <TabsTrigger value="schedule">Compliance Schedule</TabsTrigger>
              <TabsTrigger value="checklist">Actionable Checklist</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Credential & License Tracking</CardTitle>
                    <CardDescription>Monitoring staff credentials and licenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {credentialTracking.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.requirement}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline">Frequency: {item.frequency}</Badge>
                              <Badge variant="outline">Responsibility: {item.responsibility}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supervision & Clinical Oversight</CardTitle>
                    <CardDescription>Required supervision and oversight activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supervisionOversight.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.requirement}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline">Frequency: {item.frequency}</Badge>
                              <Badge variant="outline">Responsibility: {item.responsibility}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Incident & Grievance Tracking</CardTitle>
                    <CardDescription>Processes for managing incidents and grievances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {incidentTracking.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.requirement}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline">Timeframe: {item.timeframe}</Badge>
                              <Badge variant="outline">Responsibility: {item.responsibility}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>QA/QI Process and Documentation</CardTitle>
                    <CardDescription>Quality assurance and improvement activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {qaProcess.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                          <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.requirement}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline">Frequency: {item.frequency}</Badge>
                              <Badge variant="outline">Responsibility: {item.responsibility}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Task Schedule</CardTitle>
                  <CardDescription>Weekly, monthly, and annual compliance tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="weekly">
                    <TabsList className="mb-4">
                      <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
                      <TabsTrigger value="quarterly">Quarterly Tasks</TabsTrigger>
                      <TabsTrigger value="annual">Annual Tasks</TabsTrigger>
                    </TabsList>

                    <TabsContent value="weekly">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Responsibility</TableHead>
                            <TableHead>Due</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {weeklyTasks.map((task, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{task.task}</TableCell>
                              <TableCell>{task.description}</TableCell>
                              <TableCell>{task.responsibility}</TableCell>
                              <TableCell>{task.due}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    task.status === "Complete"
                                      ? "bg-green-100 text-green-800"
                                      : task.status === "In Progress"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {task.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="monthly">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Responsibility</TableHead>
                            <TableHead>Due</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {monthlyTasks.map((task, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{task.task}</TableCell>
                              <TableCell>{task.description}</TableCell>
                              <TableCell>{task.responsibility}</TableCell>
                              <TableCell>{task.due}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    task.status === "Complete"
                                      ? "bg-green-100 text-green-800"
                                      : task.status === "In Progress"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {task.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist">
              <Card>
                <CardHeader>
                  <CardTitle>Actionable Compliance Checklist</CardTitle>
                  <CardDescription>Structured checklist for compliance monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complianceCategories.map((category, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">{category.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{category.completionRate}% Complete</span>
                            <Progress value={category.completionRate} className="w-[100px]" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-start gap-3 border-b pb-2 last:border-0 last:pb-0"
                            >
                              <div
                                className={`mt-0.5 h-5 w-5 rounded-full ${
                                  item.status === "Complete" ? "bg-green-100" : "bg-amber-100"
                                } flex items-center justify-center`}
                              >
                                {item.status === "Complete" ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{item.task}</h4>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                                <div className="mt-1 flex items-center gap-2 text-xs">
                                  <span className="text-muted-foreground">Due: {item.due}</span>
                                  <span className="text-muted-foreground">Assigned to: {item.assignedTo}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentation">
              <Card>
                <CardHeader>
                  <CardTitle>Required Compliance Documentation</CardTitle>
                  <CardDescription>Documentation templates and requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {complianceDocuments.map((doc, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{doc.name}</CardTitle>
                            <Badge variant="outline">{doc.category}</Badge>
                          </div>
                          <CardDescription>{doc.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">Frequency:</span>
                              <span>{doc.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Format:</span>
                              <span>{doc.format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Retention:</span>
                              <span>{doc.retention}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            View Template
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
                <CardDescription>Upcoming compliance deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceCalendar.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            className={
                              event.urgency === "High"
                                ? "bg-red-100 text-red-800"
                                : event.urgency === "Medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {event.urgency}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Due: {event.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Resources</CardTitle>
                <CardDescription>Tools and references for compliance management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceResources.map((resource, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {resource.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2">
                        <Button variant="link" className="h-auto p-0 text-sm">
                          Access Resource
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const credentialTracking = [
  {
    requirement: "License Verification",
    description: "Verify active professional licenses for all clinical staff through state licensing boards",
    frequency: "Monthly",
    responsibility: "HR Manager",
  },
  {
    requirement: "Background Check Monitoring",
    description: "Ensure background checks are current for all staff according to state requirements",
    frequency: "Annual",
    responsibility: "HR Manager",
  },
  {
    requirement: "Competency Evaluations",
    description: "Conduct and document competency evaluations for all clinical staff",
    frequency: "Annual",
    responsibility: "Clinical Manager",
  },
  {
    requirement: "Continuing Education Tracking",
    description: "Track required continuing education credits for licensed staff",
    frequency: "Quarterly",
    responsibility: "Education Coordinator",
  },
  {
    requirement: "Exclusion List Screening",
    description: "Screen all staff against federal and state exclusion lists (OIG, SAM, etc.)",
    frequency: "Monthly",
    responsibility: "Compliance Officer",
  },
]

const supervisionOversight = [
  {
    requirement: "Home Health Aide Supervision",
    description: "RN supervisory visits for home health aides providing personal care",
    frequency: "Every 14 days",
    responsibility: "Supervising RN",
  },
  {
    requirement: "Clinical Case Conferences",
    description: "Interdisciplinary team meetings to review complex cases",
    frequency: "Weekly",
    responsibility: "Clinical Manager",
  },
  {
    requirement: "Skilled Nursing Supervision",
    description: "Supervisory visits for LPNs providing skilled nursing services",
    frequency: "Monthly",
    responsibility: "Supervising RN",
  },
  {
    requirement: "Therapy Supervision",
    description: "Supervision of PTAs and COTAs by licensed therapists",
    frequency: "Every 30 days",
    responsibility: "Therapy Director",
  },
  {
    requirement: "Clinical Documentation Review",
    description: "Review of clinical documentation for compliance and quality",
    frequency: "Weekly",
    responsibility: "QA Coordinator",
  },
]

const incidentTracking = [
  {
    requirement: "Incident Reporting",
    description: "Document and investigate all patient-related incidents",
    timeframe: "24 hours",
    responsibility: "Clinical Manager",
  },
  {
    requirement: "Grievance Processing",
    description: "Document, investigate, and respond to all patient/family grievances",
    timeframe: "5 business days",
    responsibility: "Compliance Officer",
  },
  {
    requirement: "Mandatory Reporting",
    description: "Report abuse, neglect, or exploitation to appropriate authorities",
    timeframe: "Immediate",
    responsibility: "All Staff",
  },
  {
    requirement: "Adverse Event Analysis",
    description: "Analyze patterns of adverse events and implement preventive measures",
    timeframe: "Monthly",
    responsibility: "QA Committee",
  },
  {
    requirement: "Infection Control Reporting",
    description: "Document and track all patient infections for surveillance",
    timeframe: "48 hours",
    responsibility: "Infection Control Coordinator",
  },
]

const qaProcess = [
  {
    requirement: "Clinical Record Reviews",
    description: "Comprehensive audit of clinical records for compliance and quality",
    frequency: "Quarterly",
    responsibility: "QA Coordinator",
  },
  {
    requirement: "Patient Satisfaction Surveys",
    description: "Collect and analyze patient satisfaction data",
    frequency: "Ongoing",
    responsibility: "Customer Service Manager",
  },
  {
    requirement: "QAPI Committee Meetings",
    description: "Formal committee meetings to review quality data and improvement initiatives",
    frequency: "Monthly",
    responsibility: "QAPI Committee",
  },
  {
    requirement: "Outcome Measurement",
    description: "Track and analyze patient outcomes (OASIS, hospitalization rates, etc.)",
    frequency: "Monthly",
    responsibility: "Clinical Manager",
  },
  {
    requirement: "Performance Improvement Projects",
    description: "Implement and monitor focused quality improvement initiatives",
    frequency: "Quarterly",
    responsibility: "QAPI Committee",
  },
]

const weeklyTasks = [
  {
    task: "Clinical Documentation Review",
    description: "Review sample of clinical documentation for compliance",
    responsibility: "Clinical Manager",
    due: "Every Friday",
    status: "Complete",
  },
  {
    task: "Missed Visit Report",
    description: "Review and follow up on all missed visits",
    responsibility: "Scheduling Coordinator",
    due: "Monday",
    status: "Complete",
  },
  {
    task: "Authorization Monitoring",
    description: "Review upcoming expirations and renewals needed",
    responsibility: "Intake Coordinator",
    due: "Wednesday",
    status: "In Progress",
  },
]

const monthlyTasks = [
  {
    task: "Infection Control Surveillance",
    description: "Review infection rates and implement control measures",
    responsibility: "Infection Control Coordinator",
    due: "End of Month",
    status: "Complete",
  },
  {
    task: "Medication Error Review",
    description: "Analyze medication errors and implement prevention strategies",
    responsibility: "Pharmacist Consultant",
    due: "15th of Month",
    status: "In Progress",
  },
]

const complianceCategories = [
  {
    name: "Patient Rights",
    completionRate: 80,
    items: [
      {
        task: "Distribute Patient Bill of Rights",
        description: "Ensure all patients receive a copy of their rights",
        due: "Upon Admission",
        assignedTo: "Admissions Coordinator",
        status: "Complete",
      },
      {
        task: "Obtain Consent for Treatment",
        description: "Verify consent forms are signed and documented",
        due: "Prior to Treatment",
        assignedTo: "Clinical Staff",
        status: "Complete",
      },
    ],
  },
  {
    name: "Infection Control",
    completionRate: 60,
    items: [
      {
        task: "Hand Hygiene Compliance",
        description: "Monitor staff adherence to hand hygiene protocols",
        due: "Weekly",
        assignedTo: "Infection Control Coordinator",
        status: "In Progress",
      },
      {
        task: "Equipment Sterilization",
        description: "Ensure proper sterilization of medical equipment",
        due: "After Each Use",
        assignedTo: "Nursing Staff",
        status: "Incomplete",
      },
    ],
  },
]

const complianceDocuments = [
  {
    name: "HIPAA Privacy Policy",
    description: "Policy outlining patient privacy practices",
    category: "Privacy",
    frequency: "Annual",
    format: "PDF",
    retention: "7 years",
  },
  {
    name: "Incident Reporting Form",
    description: "Form for documenting patient incidents",
    category: "Safety",
    frequency: "As Needed",
    format: "Word",
    retention: "3 years",
  },
]

const complianceCalendar = [
  {
    title: "Annual HIPAA Training",
    description: "Mandatory training for all staff on patient privacy",
    dueDate: "December 31",
    urgency: "High",
  },
  {
    title: "Infection Control Audit",
    description: "Audit of infection control practices",
    dueDate: "September 15",
    urgency: "Medium",
  },
]

const complianceResources = [
  {
    title: "CMS Compliance Manual",
    description: "Official guidelines from the Centers for Medicare & Medicaid Services",
    tags: ["CMS", "Regulations"],
  },
  {
    title: "State Licensing Board Website",
    description: "Access professional licensing information",
    tags: ["Licensing", "State"],
  },
]
