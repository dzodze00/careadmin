"use client"

import { Calendar, ChevronDown, FileText, Info } from "lucide-react"
import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SchedulingWorkflowPage() {
  const [careType, setCareType] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <h1 className="text-xl font-bold">Scheduling Workflow Framework</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={careType} onValueChange={setCareType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Care type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Care Types</SelectItem>
                <SelectItem value="non-medical">Non-Medical Care</SelectItem>
                <SelectItem value="skilled">Skilled Care</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Download Workflow
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Standardized Scheduling Workflow</AlertTitle>
            <AlertDescription>
              This framework outlines the standard intake-to-scheduling workflow for both non-medical and skilled care
              services, including visit assignment logic and staff supervision structure.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="workflow" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="workflow">Intake-to-Scheduling</TabsTrigger>
              <TabsTrigger value="assignment">Visit Assignment Logic</TabsTrigger>
              <TabsTrigger value="supervision">Staff Supervision</TabsTrigger>
              <TabsTrigger value="flowchart">Workflow Flowchart</TabsTrigger>
            </TabsList>

            <TabsContent value="workflow">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Intake-to-Scheduling Workflow</CardTitle>
                  <CardDescription>Step-by-step process from initial intake to service delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workflowSteps.map((step, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l border-muted last:pb-0 last:border-0">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                          {index + 1}
                        </div>
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Non-Medical Care</h4>
                            <ul className="list-disc pl-4 text-sm space-y-1">
                              {step.nonMedical.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Skilled Care</h4>
                            <ul className="list-disc pl-4 text-sm space-y-1">
                              {step.skilled.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignment">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Assignment Logic</CardTitle>
                  <CardDescription>
                    How the system matches caregivers to clients based on multiple factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {assignmentLogic.map((category, index) => (
                      <Collapsible key={index} className="border rounded-md">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                          <h3 className="font-medium">{category.title}</h3>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-t p-4">
                          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Non-Medical Care</h4>
                              <ul className="list-disc pl-4 text-sm space-y-1">
                                {category.nonMedical.map((item, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Skilled Care</h4>
                              <ul className="list-disc pl-4 text-sm space-y-1">
                                {category.skilled.map((item, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supervision">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Supervision Structure</CardTitle>
                  <CardDescription>Hierarchical supervision model for different care types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Non-Medical Care Supervision</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {nonMedicalSupervision.map((level, index) => (
                            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{level.level}</Badge>
                                <h3 className="font-medium">{level.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                              <div className="text-sm">
                                <span className="font-medium">Responsibilities:</span>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                  {level.responsibilities.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Skilled Care Supervision</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {skilledSupervision.map((level, index) => (
                            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{level.level}</Badge>
                                <h3 className="font-medium">{level.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                              <div className="text-sm">
                                <span className="font-medium">Responsibilities:</span>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                  {level.responsibilities.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flowchart">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Flowchart</CardTitle>
                  <CardDescription>Visual representation of the scheduling workflow</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="max-w-3xl">
                    <img
                      src="/placeholder.svg?key=4gzc4"
                      alt="Scheduling Workflow Flowchart"
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button>Download Full Resolution Flowchart</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Metrics to monitor scheduling efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedulingKPIs.map((kpi, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <h3 className="font-medium">{kpi.metric}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{kpi.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm">Target: {kpi.target}</span>
                        <Badge
                          variant={
                            kpi.status === "Good" ? "success" : kpi.status === "Warning" ? "warning" : "destructive"
                          }
                        >
                          {kpi.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Scheduling Challenges</CardTitle>
                <CardDescription>Issues and recommended solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedulingChallenges.map((challenge, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <h3 className="font-medium">{challenge.issue}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium">Recommended Solution:</h4>
                        <p className="text-sm text-muted-foreground">{challenge.solution}</p>
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

const workflowSteps = [
  {
    title: "Initial Intake",
    description: "Collect and document client information and service needs",
    nonMedical: [
      "Basic demographic information",
      "Service needs assessment",
      "Emergency contacts",
      "Payment information (private pay, long-term care insurance)",
    ],
    skilled: [
      "Comprehensive demographic information",
      "Medical history and diagnoses",
      "Physician orders",
      "Insurance verification (Medicare, Medicaid, private)",
      "OASIS assessment scheduling",
    ],
  },
  {
    title: "Service Plan Development",
    description: "Create a detailed plan of care based on client needs",
    nonMedical: [
      "Activities of daily living (ADLs) needs",
      "Instrumental activities of daily living (IADLs) needs",
      "Schedule preferences",
      "Caregiver preferences",
    ],
    skilled: [
      "Physician-ordered care plan",
      "Skilled nursing assessment",
      "Therapy evaluations (PT, OT, ST)",
      "Medical social worker assessment",
      "Home health aide care plan",
    ],
  },
  {
    title: "Caregiver/Clinician Matching",
    description: "Match appropriate staff to client needs based on multiple factors",
    nonMedical: [
      "Caregiver skills and experience",
      "Client preferences (gender, language, etc.)",
      "Geographic proximity",
      "Schedule availability",
    ],
    skilled: [
      "Clinical specialization and certification",
      "Experience with specific conditions",
      "Geographic service area",
      "Caseload capacity",
      "Language capabilities",
    ],
  },
  {
    title: "Schedule Creation",
    description: "Build and confirm visit schedule",
    nonMedical: [
      "Regular recurring schedule creation",
      "Caregiver notification and confirmation",
      "Client/family schedule confirmation",
      "Documentation of schedule in system",
    ],
    skilled: [
      "Visit frequency based on physician orders",
      "Clinician notification and confirmation",
      "Patient/family schedule confirmation",
      "Coordination between multiple disciplines",
      "Documentation in EMR system",
    ],
  },
  {
    title: "Service Delivery",
    description: "Provide and document care services",
    nonMedical: [
      "Caregiver check-in/check-out (EVV)",
      "Task completion documentation",
      "Client status notes",
      "Exception reporting",
    ],
    skilled: [
      "Visit verification (EVV)",
      "Clinical documentation in EMR",
      "Skilled assessment and intervention documentation",
      "Patient response to interventions",
      "Communication with physician as needed",
    ],
  },
  {
    title: "Supervision and Quality Monitoring",
    description: "Ongoing oversight of service delivery",
    nonMedical: [
      "Supervisor check-in calls with clients",
      "Periodic in-home supervisory visits",
      "Caregiver performance monitoring",
      "Client satisfaction surveys",
    ],
    skilled: [
      "Clinical supervision by discipline",
      "Case conferences",
      "Physician communication",
      "Quality assurance reviews",
      "Outcome measurement",
    ],
  },
]

const assignmentLogic = [
  {
    title: "Availability Matching",
    description: "How the system matches caregiver availability with client needs",
    nonMedical: [
      "Caregiver availability calendar integration",
      "Recurring shift pattern matching",
      "Time-off request management",
      "Minimum/maximum hours preferences",
      "Weekend and holiday availability",
    ],
    skilled: [
      "Clinician caseload capacity monitoring",
      "Visit frequency requirements",
      "Geographic territory management",
      "On-call rotation integration",
      "Productivity target alignment",
    ],
  },
  {
    title: "Authorization Management",
    description: "Ensuring services are authorized before scheduling",
    nonMedical: [
      "Private pay service agreement verification",
      "Long-term care insurance authorization tracking",
      "Authorized hours monitoring",
      "Service expiration alerts",
    ],
    skilled: [
      "Medicare certification period tracking",
      "Medicaid prior authorization verification",
      "Private insurance authorization management",
      "Visit frequency and duration limits",
      "Authorization renewal alerts",
    ],
  },
  {
    title: "Skill Matching",
    description: "Matching caregiver skills and qualifications to client needs",
    nonMedical: [
      "ADL/IADL assistance capabilities",
      "Specialized training (dementia, Parkinson's, etc.)",
      "Language proficiency",
      "Driving requirements",
      "Lifting capabilities",
    ],
    skilled: [
      "Clinical specialization (wound care, IV therapy, etc.)",
      "Certifications and licenses",
      "Experience with specific conditions",
      "Specialized equipment training",
      "Language proficiency for clinical communication",
    ],
  },
  {
    title: "Continuity of Care",
    description: "Maintaining consistent caregivers/clinicians for clients",
    nonMedical: [
      "Primary and backup caregiver assignment",
      "Caregiver-client relationship history",
      "Client preference tracking",
      "Team-based coverage model",
    ],
    skilled: [
      "Primary clinician assignment by discipline",
      "Care team coordination",
      "Interdisciplinary communication",
      "Handoff protocols for coverage",
      "Case manager oversight",
    ],
  },
  {
    title: "Geographic Optimization",
    description: "Minimizing travel time and maximizing efficiency",
    nonMedical: [
      "Caregiver home location consideration",
      "Geographic clustering of assignments",
      "Travel time estimation",
      "Public transportation accessibility",
    ],
    skilled: [
      "Territory-based assignment",
      "Visit routing optimization",
      "Drive time calculation",
      "Urban vs. rural visit duration adjustment",
      "Mileage tracking and reimbursement",
    ],
  },
]

const nonMedicalSupervision = [
  {
    level: "Level 1",
    title: "Care Coordinator",
    description: "First-line supervisor responsible for day-to-day scheduling and caregiver oversight",
    responsibilities: [
      "Daily schedule management and adjustments",
      "Caregiver assignment and communication",
      "Client concern resolution",
      "Initial quality monitoring",
      "Coverage for call-offs and emergencies",
    ],
  },
  {
    level: "Level 2",
    title: "Client Services Manager",
    description: "Mid-level manager overseeing care coordinators and client relationships",
    responsibilities: [
      "Supervisory home visits (30-day, 60-day, quarterly)",
      "Care plan reviews and updates",
      "Caregiver performance evaluation",
      "Client satisfaction monitoring",
      "Staff coaching and development",
    ],
  },
  {
    level: "Level 3",
    title: "Director of Non-Medical Services",
    description: "Senior manager responsible for overall non-medical program operations",
    responsibilities: [
      "Program compliance oversight",
      "Quality assurance program management",
      "Policy and procedure development",
      "Performance metric monitoring",
      "Regulatory compliance",
      "Strategic planning for service line",
    ],
  },
]

const skilledSupervision = [
  {
    level: "Level 1",
    title: "Clinical Team Lead",
    description: "Discipline-specific lead (Nursing, PT, OT, etc.) providing clinical oversight",
    responsibilities: [
      "Clinical documentation review",
      "Care plan implementation oversight",
      "Staff mentoring and education",
      "Case conferences facilitation",
      "Physician communication coordination",
    ],
  },
  {
    level: "Level 2",
    title: "Clinical Manager",
    description: "Manager responsible for clinical operations across disciplines",
    responsibilities: [
      "Supervision of team leads",
      "Quality assurance activities",
      "Performance improvement initiatives",
      "Clinical staff evaluations",
      "Regulatory compliance monitoring",
    ],
  },
  {
    level: "Level 3",
    title: "Director of Clinical Services",
    description: "Senior clinical leader responsible for all clinical programs",
    responsibilities: [
      "Clinical program development",
      "Outcome measurement and reporting",
      "Clinical policy and procedure oversight",
      "Regulatory survey readiness",
      "Strategic planning for clinical services",
      "Physician and hospital relationship management",
    ],
  },
]

const schedulingKPIs = [
  {
    metric: "Schedule Fill Rate",
    description: "Percentage of requested hours/visits successfully staffed",
    target: ">95%",
    status: "Good",
  },
  {
    metric: "Caregiver Consistency",
    description: "Percentage of visits completed by primary assigned caregiver",
    target: ">85%",
    status: "Warning",
  },
  {
    metric: "Last-Minute Schedule Changes",
    description: "Percentage of schedule changes made within 24 hours of service",
    target: "<10%",
    status: "Warning",
  },
  {
    metric: "Missed Visits",
    description: "Percentage of scheduled visits that were not completed",
    target: "<2%",
    status: "Good",
  },
  {
    metric: "On-Time Start Rate",
    description: "Percentage of visits starting within 15 minutes of scheduled time",
    target: ">90%",
    status: "Good",
  },
]

const schedulingChallenges = [
  {
    issue: "Last-Minute Call-Offs",
    description: "Caregivers/clinicians unable to work assigned shifts with little notice",
    solution:
      "Implement tiered backup system with on-call staff and create incentive program for covering last-minute shifts",
  },
  {
    issue: "Schedule Fragmentation",
    description: "Caregivers with small gaps between visits, creating inefficient schedules",
    solution: "Use geographic clustering algorithm and implement minimum visit duration policies for certain areas",
  },
  {
    issue: "Client Preference Conflicts",
    description: "Clients requesting specific caregivers who are already fully scheduled",
    solution: "Create 'care teams' of 2-3 consistent caregivers per client to build familiarity with multiple staff",
  },
  {
    issue: "Authorization Gaps",
    description: "Services delivered without current authorization, creating billing issues",
    solution: "Implement automated authorization tracking with alerts 7 days before expiration and scheduler lockouts",
  },
  {
    issue: "Visit Verification Compliance",
    description: "Inconsistent use of EVV system for visit verification",
    solution:
      "Provide mobile device options, simplified verification methods, and implement progressive discipline for non-compliance",
  },
]
