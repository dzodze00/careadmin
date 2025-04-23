"use client"

import { Check, CreditCard, FileText, Info, Search } from "lucide-react"
import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BillingWorkflowPage() {
  const [payerFilter, setPayerFilter] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            <h1 className="text-xl font-bold">Billing Workflow Framework</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={payerFilter} onValueChange={setPayerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payers</SelectItem>
                <SelectItem value="medicare">Medicare</SelectItem>
                <SelectItem value="medicaid">Medicaid</SelectItem>
                <SelectItem value="private">Private Pay</SelectItem>
                <SelectItem value="insurance">Private Insurance</SelectItem>
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
            <AlertTitle>Billing Workflow Framework</AlertTitle>
            <AlertDescription>
              Comprehensive overview of billing processes for private pay, Medicaid, and Medicare, including required
              documentation flow and service code validation.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Billing Process Overview</TabsTrigger>
              <TabsTrigger value="documentation">Documentation Flow</TabsTrigger>
              <TabsTrigger value="codes">Service Codes</TabsTrigger>
              <TabsTrigger value="flowchart">Billing Flowchart</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Process by Payer Type</CardTitle>
                  <CardDescription>Comparison of billing processes across different payer sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Process Step</TableHead>
                          <TableHead>Medicare</TableHead>
                          <TableHead>Medicaid</TableHead>
                          <TableHead>Private Pay</TableHead>
                          <TableHead>Private Insurance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingProcessSteps.map((step) => (
                          <TableRow key={step.step}>
                            <TableCell className="font-medium">{step.step}</TableCell>
                            <TableCell>{step.medicare}</TableCell>
                            <TableCell>{step.medicaid}</TableCell>
                            <TableCell>{step.privatePay}</TableCell>
                            <TableCell>{step.privateInsurance}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentation">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documentation Flow</CardTitle>
                  <CardDescription>Documentation requirements for compliant billing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {documentationFlow.map((payer, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">{payer.payer}</h3>
                          <Badge variant="outline">{payer.claimType}</Badge>
                        </div>

                        <div className="space-y-4">
                          {payer.documents.map((doc, idx) => (
                            <div key={idx} className="relative pl-8 pb-4 border-l border-muted last:pb-0 last:border-0">
                              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                                {idx + 1}
                              </div>
                              <h4 className="font-medium">{doc.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                              <div className="mt-2">
                                <h5 className="text-sm font-medium">Requirements:</h5>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                  {doc.requirements.map((req, reqIdx) => (
                                    <li key={reqIdx} className="text-sm text-muted-foreground">
                                      {req}
                                    </li>
                                  ))}
                                </ul>
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

            <TabsContent value="codes">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Common Service Codes and Validation Logic</CardTitle>
                      <CardDescription>Frequently used billing codes by payer type</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search codes..." className="pl-8 w-[250px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="medicare-codes">
                    <TabsList className="mb-4">
                      <TabsTrigger value="medicare-codes">Medicare</TabsTrigger>
                      <TabsTrigger value="medicaid-codes">Medicaid</TabsTrigger>
                      <TabsTrigger value="private-codes">Private Insurance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="medicare-codes">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Code</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Requirements</TableHead>
                              <TableHead>Common Denials</TableHead>
                              <TableHead>Validation Logic</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {medicareCodes.map((code) => (
                              <TableRow key={code.code}>
                                <TableCell className="font-medium">{code.code}</TableCell>
                                <TableCell>{code.description}</TableCell>
                                <TableCell>
                                  <ul className="list-disc pl-4 text-sm">
                                    {code.requirements.map((req, idx) => (
                                      <li key={idx}>{req}</li>
                                    ))}
                                  </ul>
                                </TableCell>
                                <TableCell>
                                  <ul className="list-disc pl-4 text-sm">
                                    {code.commonDenials.map((denial, idx) => (
                                      <li key={idx}>{denial}</li>
                                    ))}
                                  </ul>
                                </TableCell>
                                <TableCell>{code.validationLogic}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    <TabsContent value="medicaid-codes">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Code</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Requirements</TableHead>
                              <TableHead>Common Denials</TableHead>
                              <TableHead>Validation Logic</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {medicaidCodes.map((code) => (
                              <TableRow key={code.code}>
                                <TableCell className="font-medium">{code.code}</TableCell>
                                <TableCell>{code.description}</TableCell>
                                <TableCell>
                                  <ul className="list-disc pl-4 text-sm">
                                    {code.requirements.map((req, idx) => (
                                      <li key={idx}>{req}</li>
                                    ))}
                                  </ul>
                                </TableCell>
                                <TableCell>
                                  <ul className="list-disc pl-4 text-sm">
                                    {code.commonDenials.map((denial, idx) => (
                                      <li key={idx}>{denial}</li>
                                    ))}
                                  </ul>
                                </TableCell>
                                <TableCell>{code.validationLogic}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flowchart">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Workflow Flowchart</CardTitle>
                  <CardDescription>Step-by-step billing process visualization</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="max-w-3xl">
                    <img
                      src="/placeholder.svg?key=vo4dh"
                      alt="Billing Workflow Flowchart"
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
                <CardTitle>Billing Compliance Checklist</CardTitle>
                <CardDescription>Key compliance requirements for clean claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingCompliance.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.requirement}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.applicableTo.map((payer, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {payer}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Performance Metrics</CardTitle>
                <CardDescription>Key metrics to monitor billing efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingMetrics.map((metric, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{metric.name}</h3>
                        <Badge
                          className={
                            metric.status === "Good"
                              ? "bg-green-100 text-green-800"
                              : metric.status === "Warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span>Current: {metric.current}</span>
                        <span>Target: {metric.target}</span>
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

const billingProcessSteps = [
  {
    step: "Service Verification",
    medicare: "EVV + Clinical Documentation",
    medicaid: "EVV + Service Documentation",
    privatePay: "Service Log/Timesheet",
    privateInsurance: "Visit Documentation + Auth",
  },
  {
    step: "Coding/Charge Entry",
    medicare: "PDGM Coding, HCPCS/CPT",
    medicaid: "State-specific Procedure Codes",
    privatePay: "Service Hours/Rates",
    privateInsurance: "CPT/HCPCS Coding",
  },
  {
    step: "Documentation Review",
    medicare: "OASIS, Orders, Visit Notes",
    medicaid: "Care Plan, Visit Notes, Auth",
    privatePay: "Service Agreement, Logs",
    privateInsurance: "Auth, Notes, Medical Necessity",
  },
  {
    step: "Claim Generation",
    medicare: "CMS-1450 (UB-04) Format",
    medicaid: "State-specific Format",
    privatePay: "Invoice Generation",
    privateInsurance: "CMS-1500 or UB-04",
  },
  {
    step: "Submission Method",
    medicare: "Electronic (837I)",
    medicaid: "State Portal or Clearinghouse",
    privatePay: "Mail or Email Invoice",
    privateInsurance: "Clearinghouse (837P/837I)",
  },
  {
    step: "Payment Timeline",
    medicare: "14-30 days",
    medicaid: "30-90 days (state-dependent)",
    privatePay: "Due upon receipt (typically)",
    privateInsurance: "15-45 days",
  },
  {
    step: "Denial Management",
    medicare: "ADRs, CERT, Appeals Process",
    medicaid: "State-specific Appeal Process",
    privatePay: "Collection Process",
    privateInsurance: "Payer-specific Appeals",
  },
]

const documentationFlow = [
  {
    payer: "Medicare",
    claimType: "CMS-1450 (UB-04)",
    documents: [
      {
        title: "Physician Certification/Orders",
        description: "Physician-signed orders authorizing home health services",
        requirements: [
          "Signed and dated by physician",
          "Specific services ordered (SN, PT, OT, etc.)",
          "Frequency and duration specified",
          "Face-to-Face documentation",
          "Homebound status documented",
        ],
      },
      {
        title: "OASIS Assessment",
        description: "Comprehensive patient assessment using OASIS-E tool",
        requirements: [
          "Completed within required timeframes",
          "All items answered completely",
          "Supports medical necessity",
          "Consistent with plan of care",
          "Submitted to CMS via OASIS system",
        ],
      },
      {
        title: "Plan of Care (485)",
        description: "Detailed plan outlining all ordered services and goals",
        requirements: [
          "Physician-signed within required timeframe",
          "Matches physician orders",
          "Includes all required elements",
          "Updated every 60 days",
          "Includes measurable goals",
        ],
      },
      {
        title: "Visit Notes",
        description: "Documentation of each home health visit",
        requirements: [
          "Dated and signed by clinician",
          "Services provided match orders",
          "Patient response documented",
          "Progress toward goals noted",
          "EVV verification",
        ],
      },
    ],
  },
  {
    payer: "Medicaid",
    claimType: "State-specific Format",
    documents: [
      {
        title: "Prior Authorization",
        description: "State approval for services before delivery",
        requirements: [
          "Submitted within required timeframe",
          "Includes all required documentation",
          "Services match assessed needs",
          "Approved before service delivery",
          "Authorization number on all claims",
        ],
      },
      {
        title: "Assessment/Care Plan",
        description: "Evaluation of needs and planned services",
        requirements: [
          "State-specific assessment form",
          "All sections completed",
          "Signed by client/representative",
          "Updated per state requirements",
          "Supports medical necessity",
        ],
      },
      {
        title: "Service Documentation",
        description: "Records of services provided",
        requirements: [
          "Date and time of service",
          "Services provided match care plan",
          "EVV verification",
          "Client/caregiver signature",
          "Progress notes",
        ],
      },
      {
        title: "Provider Qualifications",
        description: "Documentation of caregiver qualifications",
        requirements: [
          "Background check verification",
          "Training documentation",
          "Certification/licensure if required",
          "TB test results",
          "Competency evaluation",
        ],
      },
    ],
  },
  {
    payer: "Private Pay",
    claimType: "Invoice",
    documents: [
      {
        title: "Service Agreement",
        description: "Contract outlining services and payment terms",
        requirements: [
          "Signed by client/responsible party",
          "Services clearly defined",
          "Rates and payment terms specified",
          "Cancellation policy included",
          "Updated annually or with service changes",
        ],
      },
      {
        title: "Service Logs/Timesheets",
        description: "Documentation of service hours and tasks",
        requirements: [
          "Date and time of service",
          "Tasks performed",
          "Client signature verification",
          "Caregiver signature",
          "EVV compliance if applicable",
        ],
      },
      {
        title: "Invoice",
        description: "Billing statement for services rendered",
        requirements: [
          "Service dates clearly listed",
          "Hours/services itemized",
          "Rates applied correctly",
          "Payment terms stated",
          "Contact information for questions",
        ],
      },
    ],
  },
]

const medicareCodes = [
  {
    code: "G0162",
    description: "Skilled nursing by RN, per visit",
    requirements: ["RN license verification", "Physician order for SN", "Skilled service documented"],
    commonDenials: ["Missing physician certification", "Not homebound", "No skilled need documented"],
    validationLogic: "Verify RN license + order + OASIS supports skilled need + homebound status",
  },
  {
    code: "G0151",
    description: "Physical therapy, per visit",
    requirements: ["PT license verification", "Physician order for PT", "Functional goals documented"],
    commonDenials: ["Maintenance therapy only", "Goals not functional", "Missing progress documentation"],
    validationLogic: "Verify PT license + order + functional goals + progress toward goals documented",
  },
  {
    code: "G0157",
    description: "Home health aide, per visit",
    requirements: ["HHA certification", "Skilled service also ordered", "Personal care needs documented"],
    commonDenials: ["No skilled service", "Exceeds frequency limits", "Services not in POC"],
    validationLogic: "Verify HHA cert + skilled service on POC + personal care in POC + within frequency limits",
  },
  {
    code: "G0155",
    description: "Medical social services, per visit",
    requirements: ["MSW license verification", "Physician order for MSW", "Social issues documented"],
    commonDenials: ["No clear social work need", "Exceeds reasonable frequency", "Not related to treatment goals"],
    validationLogic: "Verify MSW license + order + social issues documented + related to treatment plan",
  },
]

const medicaidCodes = [
  {
    code: "T1030",
    description: "Nursing care, in the home, by RN, per diem",
    requirements: ["RN license verification", "Prior authorization", "Medical necessity documented"],
    commonDenials: ["No prior authorization", "Exceeds authorized units", "Documentation incomplete"],
    validationLogic: "Verify RN license + auth number + auth covers date of service + documentation complete",
  },
  {
    code: "T1021",
    description: "Home health aide or certified nurse assistant, per visit",
    requirements: ["HHA/CNA certification", "Prior authorization", "Supervision documentation"],
    commonDenials: ["Missing supervision visit", "Services not in care plan", "Unauthorized services"],
    validationLogic: "Verify HHA/CNA cert + auth number + supervision within 14 days + services in care plan",
  },
  {
    code: "S9123",
    description: "Nursing care, in the home; by registered nurse, per hour",
    requirements: ["RN license verification", "Prior authorization", "Hourly services documented"],
    commonDenials: ["Exceeds authorized hours", "Missing documentation of time", "Services not medically necessary"],
    validationLogic: "Verify RN license + auth number + hours within auth limit + start/end times documented",
  },
  {
    code: "S9129",
    description: "Occupational therapy, in the home, per diem",
    requirements: ["OT license verification", "Prior authorization", "Functional goals documented"],
    commonDenials: ["Goals not functional", "Missing progress notes", "Exceeds authorized visits"],
    validationLogic: "Verify OT license + auth number + functional goals + progress documented + within auth limits",
  },
]

const billingCompliance = [
  {
    requirement: "Physician Certification",
    description: "Ensure physician certification is signed and dated within required timeframes",
    applicableTo: ["Medicare", "Medicaid", "Private Insurance"],
  },
  {
    requirement: "Medical Necessity Documentation",
    description: "Clinical documentation must support the medical necessity of all billed services",
    applicableTo: ["Medicare", "Medicaid", "Private Insurance"],
  },
  {
    requirement: "Authorization Verification",
    description: "Verify service authorization before billing and include authorization numbers on claims",
    applicableTo: ["Medicaid", "Private Insurance"],
  },
  {
    requirement: "Correct Coding",
    description: "Use appropriate procedure and diagnosis codes that match documentation",
    applicableTo: ["Medicare", "Medicaid", "Private Insurance"],
  },
  {
    requirement: "Timely Filing",
    description: "Submit claims within required timely filing deadlines for each payer",
    applicableTo: ["Medicare", "Medicaid", "Private Insurance", "Private Pay"],
  },
  {
    requirement: "EVV Compliance",
    description: "Ensure Electronic Visit Verification data matches billed visits",
    applicableTo: ["Medicare", "Medicaid"],
  },
  {
    requirement: "Service Log Verification",
    description: "Verify service logs are complete and signed before billing",
    applicableTo: ["Medicare", "Medicaid", "Private Insurance", "Private Pay"],
  },
]

const billingMetrics = [
  {
    name: "Clean Claim Rate",
    description: "Percentage of claims accepted on first submission without errors",
    current: "92%",
    target: "≥95%",
    status: "Warning",
  },
  {
    name: "Days in A/R",
    description: "Average number of days to collect payment after service",
    current: "32 days",
    target: "≤30 days",
    status: "Warning",
  },
  {
    name: "Denial Rate",
    description: "Percentage of claims denied by payers",
    current: "4%",
    target: "≤5%",
    status: "Good",
  },
  {
    name: "Billing Lag Time",
    description: "Average days between service delivery and claim submission",
    current: "3 days",
    target: "≤5 days",
    status: "Good",
  },
  {
    name: "Collection Rate",
    description: "Percentage of billed charges collected",
    current: "96%",
    target: "≥95%",
    status: "Good",
  },
]
