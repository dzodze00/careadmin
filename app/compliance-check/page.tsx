"use client"

import { Check, FileText, Globe, Info, Search, Shield } from "lucide-react"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComplianceChecklist } from "./checklist"

export default function ComplianceCheckPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold">Compliance Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
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
            <Button>Run Compliance Check</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Comprehensive Compliance Dashboard</AlertTitle>
            <AlertDescription>
              Monitor Medicare, Medicaid, and regulatory compliance across all states where you operate. Address issues
              before they impact your operations.
            </AlertDescription>
          </Alert>

          <ComplianceChecklist />

          <div className="mb-6 grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Overall Compliance</CardTitle>
                <CardDescription>Across all states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">96% Compliant</span>
                    <Badge className="bg-green-100 text-green-800">Good Standing</Badge>
                  </div>
                  <Progress value={96} className="h-2" />
                  <p className="text-xs text-muted-foreground">2 issues requiring attention</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medicare Compliance</CardTitle>
                <CardDescription>CMS requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">100% Compliant</span>
                    <Badge className="bg-green-100 text-green-800">Fully Compliant</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground">All requirements met</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medicaid Compliance</CardTitle>
                <CardDescription>State-specific requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">92% Compliant</span>
                    <Badge className="bg-amber-100 text-amber-800">Action Needed</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-muted-foreground">1 issue in Georgia</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>EVV Compliance</CardTitle>
                <CardDescription>Electronic Visit Verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">95% Compliant</span>
                    <Badge className="bg-amber-100 text-amber-800">Action Needed</Badge>
                  </div>
                  <Progress value={95} className="h-2" />
                  <p className="text-xs text-muted-foreground">1 issue in Florida</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search compliance items..." className="pl-8 w-[300px]" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="action">Action Needed</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="credentials">Credentials</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="medicare">Medicare</SelectItem>
                  <SelectItem value="medicaid">Medicaid</SelectItem>
                  <SelectItem value="private">Private Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="issues" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="audits">Audit Readiness</TabsTrigger>
              <TabsTrigger value="updates">Regulatory Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="issues">
              <Card>
                <CardHeader>
                  <CardTitle>Active Compliance Issues</CardTitle>
                  <CardDescription>Issues requiring attention across all states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceIssues.map((issue, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                issue.severity === "High"
                                  ? "bg-red-100 text-red-800"
                                  : issue.severity === "Medium"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {issue.severity}
                            </Badge>
                            <h3 className="font-medium">{issue.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{issue.program}</Badge>
                            <Badge variant="outline">{issue.state}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Due: {issue.dueDate}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">Resolve Issue</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Requirements</CardTitle>
                  <CardDescription>Key requirements by state and program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complianceRequirements.map((state, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">
                            {state.name} ({state.code})
                          </h3>
                          <Badge
                            className={
                              state.status === "Compliant"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }
                          >
                            {state.status}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Medicare Requirements</h4>
                            <div className="space-y-2">
                              {state.medicare.map((req, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div
                                    className={`mt-0.5 h-5 w-5 rounded-full ${
                                      req.met ? "bg-green-100" : "bg-amber-100"
                                    } flex items-center justify-center`}
                                  >
                                    {req.met ? (
                                      <Check className="h-3 w-3 text-green-600" />
                                    ) : (
                                      <Info className="h-3 w-3 text-amber-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{req.title}</p>
                                    <p className="text-xs text-muted-foreground">{req.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Medicaid Requirements</h4>
                            <div className="space-y-2">
                              {state.medicaid.map((req, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div
                                    className={`mt-0.5 h-5 w-5 rounded-full ${
                                      req.met ? "bg-green-100" : "bg-amber-100"
                                    } flex items-center justify-center`}
                                  >
                                    {req.met ? (
                                      <Check className="h-3 w-3 text-green-600" />
                                    ) : (
                                      <Info className="h-3 w-3 text-amber-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{req.title}</p>
                                    <p className="text-xs text-muted-foreground">{req.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View Complete Requirements
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Signature Compliance</CardTitle>
                <CardDescription>Status of required patient signatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signatureCompliance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{item.formType}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.program}</span>
                          <span>•</span>
                          <span>{item.state}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.completionRate}%</p>
                          <p className="text-xs text-muted-foreground">
                            {item.completed}/{item.total} complete
                          </p>
                        </div>
                        <Link href="/patient-signatures">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href="/patient-signatures">Manage Patient Signatures</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Credential Compliance</CardTitle>
                <CardDescription>Status of required staff credentials by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentialCompliance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{item.state}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.staffCount} staff members</span>
                          <span>•</span>
                          <span>{item.credentialTypes} credential types</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.complianceRate}%</p>
                          <p className="text-xs text-muted-foreground">{item.expiringSoon} expiring soon</p>
                        </div>
                        <Link href="/credential-tracking">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href="/credential-tracking">Manage Staff Credentials</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const complianceIssues = [
  {
    title: "Missing EVV Data for Home Health Visits",
    description:
      "Electronic Visit Verification data is missing for 3 home health aide visits conducted between April 15-17, 2025.",
    severity: "Medium",
    program: "Medicaid",
    state: "FL",
    dueDate: "April 24, 2025",
  },
  {
    title: "Medicaid Provider Enrollment Renewal",
    description:
      "Georgia Medicaid provider enrollment requires renewal documentation to be submitted before the upcoming deadline.",
    severity: "High",
    program: "Medicaid",
    state: "GA",
    dueDate: "April 30, 2025",
  },
]

const complianceRequirements = [
  {
    name: "California",
    code: "CA",
    status: "Compliant",
    medicare: [
      {
        title: "OASIS Documentation",
        description: "Complete OASIS assessment documentation for all Medicare patients",
        met: true,
      },
      {
        title: "Physician Certification",
        description: "Physician certification and recertification for all Medicare services",
        met: true,
      },
      {
        title: "Patient Signatures",
        description: "Patient-signed acknowledgment of rights and services",
        met: true,
      },
    ],
    medicaid: [
      {
        title: "Medi-Cal Documentation",
        description: "Complete documentation meeting Medi-Cal requirements",
        met: true,
      },
      {
        title: "Treatment Authorization",
        description: "Treatment Authorization Requests (TARs) for applicable services",
        met: true,
      },
      {
        title: "EVV Compliance",
        description: "Electronic Visit Verification for all home health services",
        met: true,
      },
    ],
  },
  {
    name: "Georgia",
    code: "GA",
    status: "Action Needed",
    medicare: [
      {
        title: "OASIS Documentation",
        description: "Complete OASIS assessment documentation for all Medicare patients",
        met: true,
      },
      {
        title: "Physician Certification",
        description: "Physician certification and recertification for all Medicare services",
        met: true,
      },
      {
        title: "Patient Signatures",
        description: "Patient-signed acknowledgment of rights and services",
        met: true,
      },
    ],
    medicaid: [
      {
        title: "Provider Enrollment",
        description: "Current Georgia Medicaid provider enrollment",
        met: false,
      },
      {
        title: "Service Documentation",
        description: "Complete documentation meeting Georgia Medicaid requirements",
        met: true,
      },
      {
        title: "EVV Compliance",
        description: "Electronic Visit Verification for all home health services",
        met: true,
      },
    ],
  },
]

const signatureCompliance = [
  {
    formType: "Medicare Consent Forms",
    program: "Medicare",
    state: "All States",
    completionRate: 100,
    completed: 45,
    total: 45,
  },
  {
    formType: "Medicaid Service Agreements",
    program: "Medicaid",
    state: "All States",
    completionRate: 98,
    completed: 52,
    total: 53,
  },
  {
    formType: "Patient Rights & Responsibilities",
    program: "All Programs",
    state: "All States",
    completionRate: 100,
    completed: 98,
    total: 98,
  },
  {
    formType: "HIPAA Acknowledgments",
    program: "All Programs",
    state: "All States",
    completionRate: 100,
    completed: 98,
    total: 98,
  },
]

const credentialCompliance = [
  {
    state: "California",
    staffCount: 12,
    credentialTypes: 8,
    complianceRate: 100,
    expiringSoon: 2,
  },
  {
    state: "Florida",
    staffCount: 10,
    credentialTypes: 7,
    complianceRate: 100,
    expiringSoon: 1,
  },
  {
    state: "Georgia",
    staffCount: 8,
    credentialTypes: 6,
    complianceRate: 95,
    expiringSoon: 3,
  },
  {
    state: "Texas",
    staffCount: 14,
    credentialTypes: 8,
    complianceRate: 100,
    expiringSoon: 0,
  },
  {
    state: "Ohio",
    staffCount: 6,
    credentialTypes: 6,
    complianceRate: 100,
    expiringSoon: 1,
  },
]
