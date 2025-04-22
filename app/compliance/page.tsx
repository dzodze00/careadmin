"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, Info, MapPin, Calendar, FileText } from "lucide-react"
import { useStateContext } from "@/components/state-context"

// Real Medicare/Medicaid requirements by state
const stateRequirements = {
  CA: {
    name: "California",
    medicareRequirements: [
      "Face-to-face documentation within 90 days",
      "Physician certification of homebound status",
      "California-specific modifiers for certain services",
      "Detailed plan of care signed by physician",
      "Specific documentation of skilled need",
    ],
    medicaidName: "Medi-Cal",
    medicaidRequirements: [
      "TAR (Treatment Authorization Request) for certain services",
      "Medi-Cal specific documentation requirements",
      "Electronic submission via Medi-Cal Provider Portal",
      "Specific modifiers for service location",
      "Beneficiary eligibility verification required",
    ],
    evvRequirement: "Mandatory for all Medicaid personal care services and home health services",
    evvDeadline: "January 1, 2023",
    evvCompliance: 98,
  },
  FL: {
    name: "Florida",
    medicareRequirements: [
      "Face-to-face documentation within 90 days",
      "Florida Medicare requires specific place of service codes",
      "Detailed documentation of homebound status",
      "Physician recertification every 60 days",
      "Florida-specific OASIS documentation requirements",
    ],
    medicaidName: "Florida Medicaid",
    medicaidRequirements: [
      "Prior Authorization for most home health services",
      "Electronic submission via Florida MMIS",
      "Specific documentation of medical necessity",
      "Compliance with Florida Medicaid Provider General Handbook",
      "Recipient eligibility verification required",
    ],
    evvRequirement: "Mandatory for all Medicaid personal care services and home health services",
    evvDeadline: "January 1, 2023",
    evvCompliance: 99,
  },
  TX: {
    name: "Texas",
    medicareRequirements: [
      "Face-to-face documentation within 90 days",
      "Texas-specific documentation requirements",
      "Electronic submission through Novitas Solutions",
      "Physician certification of homebound status",
      "Compliance with Texas EVV requirements for Medicare services",
    ],
    medicaidName: "Texas Medicaid",
    medicaidRequirements: [
      "Mandatory EVV (Electronic Visit Verification)",
      "Electronic submission via TMHP Portal",
      "Prior Authorization for services beyond state limitations",
      "Texas Medicaid-specific modifiers",
      "Compliance with Texas Medicaid Provider Procedures Manual",
    ],
    evvRequirement: "Mandatory for all Medicaid personal care services and home health services",
    evvDeadline: "January 1, 2021",
    evvCompliance: 97,
  },
  NY: {
    name: "New York",
    medicareRequirements: [
      "Face-to-face documentation within 90 days",
      "New York Medicare requires specific documentation for LUPA cases",
      "Detailed documentation of homebound status",
      "Physician recertification every 60 days",
      "New York-specific OASIS documentation requirements",
    ],
    medicaidName: "New York Medicaid",
    medicaidRequirements: [
      "Prior Authorization for most home health services",
      "Electronic submission via eMedNY",
      "Specific documentation of medical necessity",
      "Compliance with New York Medicaid Provider Manual",
      "Recipient eligibility verification required",
    ],
    evvRequirement: "Mandatory for all Medicaid personal care services and home health services",
    evvDeadline: "January 1, 2023",
    evvCompliance: 96,
  },
  OH: {
    name: "Ohio",
    medicareRequirements: [
      "Face-to-face documentation within 90 days",
      "Ohio Medicare requires specific documentation for rural services",
      "Detailed documentation of homebound status",
      "Physician recertification every 60 days",
      "Ohio-specific OASIS documentation requirements",
    ],
    medicaidName: "Ohio Medicaid",
    medicaidRequirements: [
      "Prior Authorization for most home health services",
      "Electronic submission via MITS Portal",
      "Specific documentation of medical necessity",
      "Compliance with Ohio Medicaid Provider Handbook",
      "Recipient eligibility verification required",
    ],
    evvRequirement: "Mandatory for all Medicaid personal care services and home health services",
    evvDeadline: "January 1, 2021",
    evvCompliance: 99,
  },
}

// Fixed data for the page
const federalRequirements = [
  {
    name: "Quarterly Medicaid Report",
    description: "Q1 2025 service documentation and billing summary",
    status: "Due in 5 days",
  },
  {
    name: "Medicare Cost Report",
    description: "Annual cost reporting for Medicare services",
    status: "Complete",
  },
  {
    name: "OASIS Submission",
    description: "Outcome and Assessment Information Set data",
    status: "Complete",
  },
  {
    name: "CMS-485 Home Health Certification",
    description: "Physician certification for home health services",
    status: "Complete",
  },
  {
    name: "Medicare Quality Reporting",
    description: "Quality metrics for home health services",
    status: "Complete",
  },
]

const regulatoryChanges = [
  {
    title: "Medicare Home Health Payment Rate Update",
    description: "CMS is updating payment rates for home health services with new case-mix adjustments.",
    effectiveDate: "January 1, 2026",
    program: "Medicare",
  },
  {
    title: "New EVV Requirements for Therapy Services",
    description: "Electronic Visit Verification will be required for all therapy services under Medicaid.",
    effectiveDate: "July 1, 2025",
    program: "Medicaid",
  },
  {
    title: "Updated OASIS-E Assessment Requirements",
    description: "New data elements added to the OASIS-E assessment for Medicare patients.",
    effectiveDate: "October 1, 2025",
    program: "Medicare",
  },
]

const documentationRequirements = [
  {
    title: "Plan of Care (CMS-485)",
    description: "Comprehensive care plan with physician certification",
    states: ["All States"],
    program: "Medicare",
  },
  {
    title: "Face-to-Face Documentation",
    description: "Physician documentation of face-to-face encounter",
    states: ["All States"],
    program: "Medicare",
  },
  {
    title: "OASIS Assessment",
    description: "Outcome and Assessment Information Set",
    states: ["All States"],
    program: "Medicare",
  },
  {
    title: "Treatment Authorization Request (TAR)",
    description: "Prior authorization for Medi-Cal services",
    states: ["CA"],
    program: "Medicaid",
  },
  {
    title: "Texas Medicaid Prior Authorization",
    description: "Texas-specific prior authorization form",
    states: ["TX"],
    program: "Medicaid",
  },
  {
    title: "Florida Medicaid Authorization",
    description: "Florida-specific authorization requirements",
    states: ["FL"],
    program: "Medicaid",
  },
]

export default function CompliancePage() {
  // Default selected states if context is not available
  const defaultStates = ["CA", "FL", "TX", "NY", "OH"]

  // Initialize state with default values
  const [selectedStates, setSelectedStates] = useState(defaultStates)

  // Attempt to use the context, but provide fallback for SSR
  const context = useStateContext()

  // Update selectedStates if context is available
  useEffect(() => {
    if (context && context.selectedStates) {
      setSelectedStates(context.selectedStates)
    }
  }, [context])

  const [filteredRequirements, setFilteredRequirements] = useState([])
  const [filteredEvvCompliance, setFilteredEvvCompliance] = useState([])

  // Listen for state selection changes from the StateContext
  useEffect(() => {
    // Filter requirements based on selected states
    const requirements = selectedStates
      .map((state) => {
        if (!stateRequirements[state]) return null
        return {
          stateCode: state,
          ...stateRequirements[state],
        }
      })
      .filter(Boolean)

    setFilteredRequirements(requirements)

    // Filter EVV compliance data
    const evvData = selectedStates
      .map((state) => {
        const stateData = stateRequirements[state]
        if (!stateData) return null

        return {
          name: stateData.name,
          rate: stateData.evvCompliance,
          visits: Math.floor(Math.random() * 1000) + 500, // Random realistic number of visits
          deadline: stateData.evvDeadline,
          requirement: stateData.evvRequirement,
        }
      })
      .filter(Boolean)

    setFilteredEvvCompliance(evvData)
  }, [selectedStates])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Compliance Center</h2>
        <Button>Run Compliance Check</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="state">State Compliance</TabsTrigger>
          <TabsTrigger value="federal">Federal Requirements</TabsTrigger>
          <TabsTrigger value="evv">EVV Compliance</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ComplianceStatusCard
              title="Overall Status"
              status="Good"
              icon={<CheckCircle className="h-4 w-4" />}
              color="green"
              description="All critical requirements met"
            />
            <ComplianceStatusCard
              title="State Requirements"
              status={`${selectedStates.length} States`}
              icon={<MapPin className="h-4 w-4" />}
              color="green"
              description="All state requirements current"
            />
            <ComplianceStatusCard
              title="Federal Requirements"
              status="Attention Needed"
              icon={<AlertTriangle className="h-4 w-4" />}
              color="amber"
              description="1 upcoming deadline"
            />
            <ComplianceStatusCard
              title="EVV Compliance"
              status="98%"
              icon={<CheckCircle className="h-4 w-4" />}
              color="green"
              description="Above required threshold"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Critical compliance dates in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Quarterly Medicaid Report</p>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Federal
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Texas Provider Renewal</p>
                      <p className="text-sm text-muted-foreground">Due in 14 days</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Texas
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Staff Certification Renewals</p>
                      <p className="text-sm text-muted-foreground">Due in 21 days</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Internal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Activities</CardTitle>
                <CardDescription>Latest compliance-related actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Florida EVV Submission Complete</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Medicare Cost Report Filed</p>
                      <p className="text-sm text-muted-foreground">2 days ago at 11:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">New Georgia Regulations Review</p>
                      <p className="text-sm text-muted-foreground">3 days ago at 9:45 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Compliance Notice</AlertTitle>
            <AlertDescription>
              New CMS guidelines for home health documentation will take effect on June 1, 2025. Review the updated
              requirements in the Federal Requirements section.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="state" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>State Compliance Dashboard</CardTitle>
              <CardDescription>Monitor compliance across all operating states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequirements.map((state) => (
                  <div key={state.stateCode} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">
                          {state.name} ({state.stateCode})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {state.medicaidName} and Medicare requirements tracked
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Compliant
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Medicare Requirements by State</CardTitle>
                <CardDescription>State-specific Medicare requirements</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-6">
                  {filteredRequirements.map((state) => (
                    <div key={`medicare-${state.stateCode}`} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          {state.name} ({state.stateCode})
                        </h3>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          Medicare
                        </Badge>
                      </div>
                      <ul className="space-y-2">
                        {state.medicareRequirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medicaid Requirements by State</CardTitle>
                <CardDescription>State-specific Medicaid requirements</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-6">
                  {filteredRequirements.map((state) => (
                    <div key={`medicaid-${state.stateCode}`} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          {state.name} ({state.stateCode})
                        </h3>
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          {state.medicaidName}
                        </Badge>
                      </div>
                      <ul className="space-y-2">
                        {state.medicaidRequirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="federal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Federal Requirements</CardTitle>
              <CardDescription>Medicare and Medicaid compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {federalRequirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      {req.status === "Complete" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Calendar className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="font-medium">{req.name}</p>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={req.status === "Complete" ? "outline" : "secondary"}
                        className={
                          req.status === "Complete"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {req.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Regulatory Changes</CardTitle>
              <CardDescription>Stay ahead of Medicare and Medicaid changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryChanges.map((change, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{change.title}</p>
                        <p className="text-sm text-muted-foreground">{change.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Effective: {change.effectiveDate}
                          </Badge>
                          <Badge variant="outline">{change.program}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Electronic Visit Verification</CardTitle>
              <CardDescription>Monitor EVV compliance across all states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall EVV Compliance</p>
                    <p className="text-3xl font-bold">98%</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredEvvCompliance.map((state) => (
                    <div key={state.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{state.name}</p>
                        <div className="h-2 w-48 bg-gray-100 rounded-full mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              state.rate >= 95 ? "bg-green-500" : state.rate >= 90 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${state.rate}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{state.rate}%</p>
                        <p className="text-xs text-muted-foreground">{state.visits} visits</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-medium">EVV Requirements by State</h3>
                  {filteredEvvCompliance.map((state) => (
                    <div key={`evv-${state.name}`} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{state.name}</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Compliant
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{state.requirement}</p>
                      <p className="text-xs text-muted-foreground mt-1">Deadline: {state.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Documentation</CardTitle>
              <CardDescription>Documentation requirements for compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentationRequirements.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {doc.states.map((state) => (
                          <Badge key={state} variant="outline" className="text-xs">
                            {state}
                          </Badge>
                        ))}
                        <Badge
                          variant="outline"
                          className={`text-xs ${doc.program === "Medicare" ? "border-blue-200 text-blue-700" : "border-green-200 text-green-700"}`}
                        >
                          {doc.program}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComplianceStatusCard({ title, status, icon, color, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`text-${color}-500`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${color === "green" ? "text-green-500" : color === "amber" ? "text-amber-500" : "text-red-500"}`}
        >
          {status}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
