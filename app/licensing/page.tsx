"use client"

import { FileText, Info, Download } from "lucide-react"
import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LicensingPage() {
  const [stateFilter, setStateFilter] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Licensing Overview</h1>
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
              <Download className="mr-2 h-4 w-4" />
              Export Requirements
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Multi-State Licensing Requirements</AlertTitle>
            <AlertDescription>
              This overview provides a comparative analysis of licensing types, application processes, and staffing
              requirements across all states where you operate.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="comparison" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="comparison">Comparative Overview</TabsTrigger>
              <TabsTrigger value="application">Application Process</TabsTrigger>
              <TabsTrigger value="staffing">Staffing Requirements</TabsTrigger>
              <TabsTrigger value="timelines">Timelines</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison">
              <Card>
                <CardHeader>
                  <CardTitle>Licensing Types by State</CardTitle>
                  <CardDescription>Comparison of non-medical and skilled licensing requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>Non-Medical License Type</TableHead>
                          <TableHead>Skilled License Type</TableHead>
                          <TableHead>Governing Body</TableHead>
                          <TableHead>Renewal Period</TableHead>
                          <TableHead>Initial Fee</TableHead>
                          <TableHead>Renewal Fee</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {licenseComparison.map((license) => (
                          <TableRow key={license.state}>
                            <TableCell className="font-medium">{license.state}</TableCell>
                            <TableCell>{license.nonMedicalType}</TableCell>
                            <TableCell>{license.skilledType}</TableCell>
                            <TableCell>{license.governingBody}</TableCell>
                            <TableCell>{license.renewalPeriod}</TableCell>
                            <TableCell>${license.initialFee}</TableCell>
                            <TableCell>${license.renewalFee}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="application">
              <Card>
                <CardHeader>
                  <CardTitle>Key Steps in the Application Process</CardTitle>
                  <CardDescription>Standard application process across states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {applicationSteps.map((step, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l border-muted last:pb-0 last:border-0">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                          {index + 1}
                        </div>
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {step.stateSpecifics.map((specific, idx) => (
                            <Badge key={idx} variant="outline">
                              {specific}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staffing">
              <Card>
                <CardHeader>
                  <CardTitle>Minimum Staffing Requirements</CardTitle>
                  <CardDescription>Required staff positions by state and license type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>Administrator</TableHead>
                          <TableHead>Clinical Supervisor</TableHead>
                          <TableHead>RN Requirements</TableHead>
                          <TableHead>Alternates</TableHead>
                          <TableHead>Additional Requirements</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffingRequirements.map((req) => (
                          <TableRow key={req.state}>
                            <TableCell className="font-medium">{req.state}</TableCell>
                            <TableCell>{req.administrator}</TableCell>
                            <TableCell>{req.clinicalSupervisor}</TableCell>
                            <TableCell>{req.rnRequirements}</TableCell>
                            <TableCell>{req.alternates}</TableCell>
                            <TableCell>
                              <ul className="list-disc pl-4 text-sm">
                                {req.additionalRequirements.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timelines">
              <Card>
                <CardHeader>
                  <CardTitle>General Timelines and Considerations</CardTitle>
                  <CardDescription>Expected processing times and important deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {states.map((state) => (
                      <Card key={state.code}>
                        <CardHeader className="pb-2">
                          <CardTitle>
                            {state.name} ({state.code})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Initial Application:</span>
                              <span className="text-sm">{state.initialApplication}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Survey Window:</span>
                              <span className="text-sm">{state.surveyWindow}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Renewal Processing:</span>
                              <span className="text-sm">{state.renewalProcessing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Renewal Deadline:</span>
                              <span className="text-sm">{state.renewalDeadline}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-1">Special Considerations:</h4>
                            <ul className="list-disc pl-4 text-sm">
                              {state.specialConsiderations.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

const licenseComparison = [
  {
    state: "California",
    nonMedicalType: "Home Care Organization (HCO)",
    skilledType: "Home Health Agency (HHA)",
    governingBody: "CA Dept of Public Health",
    renewalPeriod: "2 years",
    initialFee: "5,000",
    renewalFee: "3,500",
  },
  {
    state: "Florida",
    nonMedicalType: "Home Care Agency",
    skilledType: "Home Health Agency",
    governingBody: "FL Agency for Health Care Admin",
    renewalPeriod: "2 years",
    initialFee: "3,000",
    renewalFee: "2,000",
  },
  {
    state: "Texas",
    nonMedicalType: "Personal Assistance Services",
    skilledType: "Home and Community Support Services",
    governingBody: "TX Health and Human Services",
    renewalPeriod: "2 years",
    initialFee: "2,625",
    renewalFee: "1,750",
  },
  {
    state: "Ohio",
    nonMedicalType: "Non-Medical Home Care",
    skilledType: "Home Health Agency",
    governingBody: "OH Dept of Health",
    renewalPeriod: "1 year",
    initialFee: "1,750",
    renewalFee: "1,250",
  },
  {
    state: "Georgia",
    nonMedicalType: "Private Home Care Provider",
    skilledType: "Home Health Agency",
    governingBody: "GA Dept of Community Health",
    renewalPeriod: "2 years",
    initialFee: "2,000",
    renewalFee: "1,500",
  },
]

const applicationSteps = [
  {
    title: "Business Formation",
    description: "Establish legal business entity (LLC, Corporation, etc.) before applying for healthcare licenses",
    stateSpecifics: ["CA: Statement of Information required", "FL: Annual Report required", "TX: Franchise Tax Report"],
  },
  {
    title: "Administrator Qualification",
    description: "Ensure administrator meets state-specific education and experience requirements",
    stateSpecifics: [
      "CA: 1 year supervisory experience",
      "FL: 1 year home health experience",
      "TX: Administrator training required",
    ],
  },
  {
    title: "Initial Application Submission",
    description: "Complete and submit state-specific application forms with required documentation",
    stateSpecifics: [
      "CA: Online through CDPH portal",
      "FL: Online through AHCA portal",
      "TX: Online through TULIP system",
    ],
  },
  {
    title: "Policy and Procedure Development",
    description: "Create comprehensive policies and procedures that meet state requirements",
    stateSpecifics: [
      "CA: 45 required policies",
      "FL: 38 required policies",
      "TX: 42 required policies",
      "OH: 35 required policies",
    ],
  },
  {
    title: "Initial Survey/Inspection",
    description: "Prepare for and pass state inspection of facilities, records, and processes",
    stateSpecifics: [
      "CA: Within 90 days of application",
      "FL: Within 60 days of application",
      "TX: Within 120 days of application",
    ],
  },
  {
    title: "Staff Recruitment and Training",
    description: "Hire and train staff according to state requirements before licensure",
    stateSpecifics: [
      "CA: 5 hours orientation + 5 hours annual training",
      "FL: 12 hours orientation + 12 hours annual training",
      "TX: 8 hours orientation + 12 hours annual training",
    ],
  },
]

const staffingRequirements = [
  {
    state: "California",
    administrator: "Bachelor's degree + 1 year experience",
    clinicalSupervisor: "RN with 1 year home health experience",
    rnRequirements: "Full-time Director of Nursing",
    alternates: "Qualified alternate administrator required",
    additionalRequirements: ["Medical Director (physician)", "Quality Assurance Coordinator"],
  },
  {
    state: "Florida",
    administrator: "Bachelor's degree + 1 year experience",
    clinicalSupervisor: "RN with 1 year supervisory experience",
    rnRequirements: "Director of Nursing (can be part-time for small agencies)",
    alternates: "Alternate Administrator with same qualifications",
    additionalRequirements: ["Quality Assurance Committee", "Medical Director (advisory)"],
  },
  {
    state: "Texas",
    administrator: "Bachelor's degree + Administrator training",
    clinicalSupervisor: "RN with 2 years experience (1 year in home health)",
    rnRequirements: "Full-time Director of Nursing for skilled services",
    alternates: "Alternate Administrator required",
    additionalRequirements: ["Supervising Nurse for each 60 clients", "Criminal Background Check Coordinator"],
  },
  {
    state: "Ohio",
    administrator: "Bachelor's degree + 1 year healthcare experience",
    clinicalSupervisor: "RN with 2 years experience",
    rnRequirements: "Director of Nursing (full-time)",
    alternates: "Qualified alternate administrator",
    additionalRequirements: ["Quality Assurance Coordinator", "Training Coordinator"],
  },
  {
    state: "Georgia",
    administrator: "Bachelor's degree + 1 year experience",
    clinicalSupervisor: "RN with 2 years experience",
    rnRequirements: "Director of Nursing (full-time)",
    alternates: "Alternate Administrator with same qualifications",
    additionalRequirements: ["Medical Director (part-time)", "Quality Improvement Coordinator"],
  },
]

const states = [
  {
    name: "California",
    code: "CA",
    initialApplication: "90-120 days",
    surveyWindow: "90 days after application approval",
    renewalProcessing: "30-45 days",
    renewalDeadline: "60 days before expiration",
    specialConsiderations: [
      "Accreditation can expedite process",
      "Plan for 6-month total timeline from start to finish",
      "Provisional license issued first, then permanent after survey",
    ],
  },
  {
    name: "Florida",
    code: "FL",
    initialApplication: "60-90 days",
    surveyWindow: "60 days after application approval",
    renewalProcessing: "30 days",
    renewalDeadline: "90 days before expiration",
    specialConsiderations: [
      "Background screening must be completed before application",
      "Licensure Unit very responsive to email inquiries",
      "Unannounced surveys common within first year",
    ],
  },
  {
    name: "Texas",
    code: "TX",
    initialApplication: "45-60 days",
    surveyWindow: "120 days after application approval",
    renewalProcessing: "30 days",
    renewalDeadline: "45 days before expiration",
    specialConsiderations: [
      "Administrator training must be completed before application",
      "Initial licensure valid for only 1 year, then 2-year renewal cycle",
      "Deemed status available with accreditation",
    ],
  },
  {
    name: "Ohio",
    code: "OH",
    initialApplication: "60 days",
    surveyWindow: "90 days after application approval",
    renewalProcessing: "30 days",
    renewalDeadline: "60 days before expiration",
    specialConsiderations: [
      "Annual license renewal required",
      "ODH very strict about policy requirements",
      "Plan for potential delays during survey season (Q1)",
    ],
  },
  {
    name: "Georgia",
    code: "GA",
    initialApplication: "45-60 days",
    surveyWindow: "60 days after application approval",
    renewalProcessing: "30 days",
    renewalDeadline: "30 days before expiration",
    specialConsiderations: [
      "Certificate of Need (CON) required in many counties",
      "Separate applications for private home care and home health",
      "Rules updated frequently - check DCH website quarterly",
    ],
  },
]
