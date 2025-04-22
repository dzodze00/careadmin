"use client"

import { useEffect, useState } from "react"
import { Check, FileText, Info, Search } from "lucide-react"
import { useStateContext } from "@/components/state-context"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Full database of state billing codes
const allStateBillingCodes = {
  CA: [
    {
      code: "G0151-CA",
      description: "Physical therapy evaluation - California specific",
      state: "CA",
      program: "Medicare",
      rate: "89.75",
      status: "Active",
    },
    {
      code: "T1002-CA",
      description: "RN services - California specific",
      state: "CA",
      program: "Medicaid",
      rate: "95.00",
      status: "Pending",
    },
    // More CA codes would be here
  ],
  FL: [
    {
      code: "G0152-FL",
      description: "Occupational therapy - Florida specific",
      state: "FL",
      program: "Medicare",
      rate: "87.50",
      status: "Active",
    },
    {
      code: "T1003-FL",
      description: "LPN/LVN services - Florida specific",
      state: "FL",
      program: "Medicaid",
      rate: "75.25",
      status: "Active",
    },
    // More FL codes would be here
  ],
  TX: [
    {
      code: "G0162-TX",
      description: "Skilled services by RN - Texas specific",
      state: "TX",
      program: "Medicare",
      rate: "98.50",
      status: "Active",
    },
    // More TX codes would be here
  ],
  GA: [
    {
      code: "T1021-GA",
      description: "Home health aide visit - Georgia specific",
      state: "GA",
      program: "Medicaid",
      rate: "42.30",
      status: "Active",
    },
    // More GA codes would be here
  ],
  OH: [
    {
      code: "S9123-OH",
      description: "Nursing care, in the home - Ohio specific",
      state: "OH",
      program: "Medicaid",
      rate: "95.00",
      status: "Active",
    },
    // More OH codes would be here
  ],
  NC: [
    {
      code: "T1030-NC",
      description: "Nursing care, in the home - North Carolina specific",
      state: "NC",
      program: "Medicaid",
      rate: "92.75",
      status: "Active",
    },
    // More NC codes would be here
  ],
  NJ: [
    {
      code: "G0299-NJ",
      description: "Direct skilled nursing services - New Jersey specific",
      state: "NJ",
      program: "Medicare",
      rate: "105.25",
      status: "Active",
    },
    // More NJ codes would be here
  ],
  VA: [
    {
      code: "S9122-VA",
      description: "Home health aide services - Virginia specific",
      state: "VA",
      program: "Third-Party",
      rate: "45.00",
      status: "Active",
    },
    // More VA codes would be here
  ],
}

// Full database of Medicare requirements by state
const allMedicareRequirements = {
  CA: {
    state: "California",
    stateCode: "CA",
    requirements: [
      "Face-to-face documentation within 90 days",
      "Physician certification of homebound status",
      "California-specific modifiers for certain services",
      "Detailed plan of care signed by physician",
      "Specific documentation of skilled need",
    ],
  },
  FL: {
    state: "Florida",
    stateCode: "FL",
    requirements: [
      "Face-to-face documentation within 90 days",
      "Florida Medicare requires specific place of service codes",
      "Detailed documentation of homebound status",
      "Physician recertification every 60 days",
      "Florida-specific OASIS documentation requirements",
    ],
  },
  TX: {
    state: "Texas",
    stateCode: "TX",
    requirements: [
      "Face-to-face documentation within 90 days",
      "Texas-specific documentation requirements",
      "Electronic submission through Novitas Solutions",
      "Physician certification of homebound status",
      "Compliance with Texas EVV requirements for Medicare services",
    ],
  },
  // Add more states as needed
}

// Full database of Medicaid requirements by state
const allMedicaidRequirements = {
  CA: {
    state: "California",
    stateCode: "CA",
    programName: "Medi-Cal",
    requirements: [
      "TAR (Treatment Authorization Request) for certain services",
      "Medi-Cal specific documentation requirements",
      "Electronic submission via Medi-Cal Provider Portal",
      "Specific modifiers for service location",
      "Beneficiary eligibility verification required",
    ],
  },
  FL: {
    state: "Florida",
    stateCode: "FL",
    programName: "Florida Medicaid",
    requirements: [
      "Prior Authorization for most home health services",
      "Electronic submission via Florida MMIS",
      "Specific documentation of medical necessity",
      "Compliance with Florida Medicaid Provider General Handbook",
      "Recipient eligibility verification required",
    ],
  },
  TX: {
    state: "Texas",
    stateCode: "TX",
    programName: "Texas Medicaid",
    requirements: [
      "Mandatory EVV (Electronic Visit Verification)",
      "Electronic submission via TMHP Portal",
      "Prior Authorization for services beyond state limitations",
      "Texas Medicaid-specific modifiers",
      "Compliance with Texas Medicaid Provider Procedures Manual",
    ],
  },
  // Add more states as needed
}

const thirdPartyPayers = [
  {
    name: "United Healthcare",
    state: "CA",
    status: "Active",
    billingMethod: "Electronic",
    timelyFiling: "90 days",
  },
  {
    name: "Blue Cross Blue Shield",
    state: "TX",
    status: "Pending",
    billingMethod: "Paper",
    timelyFiling: "180 days",
  },
  // Add more payers as needed
]

const stateBillingResources = [
  {
    title: "California Medicaid Billing Guide",
    description: "Comprehensive guide to billing Medi-Cal services.",
    state: "CA",
    type: "Guide",
  },
  {
    title: "Texas Medicaid Provider Procedures Manual",
    description: "Official procedures manual for Texas Medicaid providers.",
    state: "TX",
    type: "Manual",
  },
  // Add more resources as needed
]

export default function StateSpecificBillingPage() {
  const { selectedStates } = useStateContext()
  const [stateBillingCodes, setStateBillingCodes] = useState([])
  const [medicareRequirements, setMedicareRequirements] = useState([])
  const [medicaidRequirements, setMedicaidRequirements] = useState([])
  const [selectedState, setSelectedState] = useState("all")

  // Update data when selected states change
  useEffect(() => {
    // Update billing codes
    let codes = []
    selectedStates.forEach((state) => {
      if (allStateBillingCodes[state]) {
        codes = [...codes, ...allStateBillingCodes[state]]
      }
    })
    setStateBillingCodes(codes)

    // Update Medicare requirements
    const medicare = selectedStates.map((state) => allMedicareRequirements[state]).filter(Boolean)
    setMedicareRequirements(medicare)

    // Update Medicaid requirements
    const medicaid = selectedStates.map((state) => allMedicaidRequirements[state]).filter(Boolean)
    setMedicaidRequirements(medicaid)

    // Reset selected state filter if it's no longer in the list
    if (selectedState !== "all" && !selectedStates.includes(selectedState)) {
      setSelectedState("all")
    }
  }, [selectedStates, selectedState])

  // Filter billing codes by selected state
  const filteredBillingCodes =
    selectedState === "all" ? stateBillingCodes : stateBillingCodes.filter((code) => code.state === selectedState)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">State-Specific Billing</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all" value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {selectedStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Generate Invoice</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>State-Specific Billing</AlertTitle>
            <AlertDescription>
              {selectedStates.length === 0
                ? "Please select at least one state to view billing requirements."
                : `Viewing billing requirements for ${selectedStates.join(", ")}.`}
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="codes" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="codes">Billing Codes</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="payers">Third-Party Payers</TabsTrigger>
              <TabsTrigger value="templates">Invoice Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="codes">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>State-Specific Billing Codes</CardTitle>
                      <CardDescription>Codes vary by state for Medicare and Medicaid billing</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search codes..." className="pl-8 w-[250px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBillingCodes.length > 0 ? (
                        filteredBillingCodes.map((code, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{code.code}</TableCell>
                            <TableCell>{code.description}</TableCell>
                            <TableCell>{code.state}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  code.program === "Medicare"
                                    ? "border-blue-500 text-blue-700"
                                    : code.program === "Medicaid"
                                      ? "border-green-500 text-green-700"
                                      : "border-purple-500 text-purple-700"
                                }
                              >
                                {code.program}
                              </Badge>
                            </TableCell>
                            <TableCell>${code.rate}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    code.status === "Active" ? "bg-green-500" : "bg-amber-500"
                                  }`}
                                />
                                <span className="text-sm">{code.status}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            {selectedStates.length === 0
                              ? "Please select at least one state to view billing codes."
                              : "No billing codes found for the selected states."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredBillingCodes.length} of {stateBillingCodes.length} codes
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Medicare Requirements by State</CardTitle>
                    <CardDescription>State-specific Medicare billing requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicareRequirements.length > 0 ? (
                        medicareRequirements.map((req, index) => (
                          <div key={index} className="border-b pb-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">
                                {req.state} ({req.stateCode})
                              </h3>
                              <Badge variant="outline" className="border-blue-200 text-blue-700">
                                Medicare
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-2">
                              {req.requirements.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 mt-0.5 text-green-500" />
                                  <p className="text-sm">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          {selectedStates.length === 0
                            ? "Please select at least one state to view Medicare requirements."
                            : "No Medicare requirements found for the selected states."}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medicaid Requirements by State</CardTitle>
                    <CardDescription>State-specific Medicaid billing requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicaidRequirements.length > 0 ? (
                        medicaidRequirements.map((req, index) => (
                          <div key={index} className="border-b pb-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">
                                {req.state} ({req.stateCode})
                              </h3>
                              <Badge variant="outline" className="border-green-200 text-green-700">
                                {req.programName}
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-2">
                              {req.requirements.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 mt-0.5 text-green-500" />
                                  <p className="text-sm">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          {selectedStates.length === 0
                            ? "Please select at least one state to view Medicaid requirements."
                            : "No Medicaid requirements found for the selected states."}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="payers">
              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Payers by State</CardTitle>
                  <CardDescription>Manage state-specific third-party payer relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payer Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Contract Status</TableHead>
                        <TableHead>Billing Method</TableHead>
                        <TableHead>Timely Filing</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {thirdPartyPayers.map((payer, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{payer.name}</TableCell>
                          <TableCell>{payer.state}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payer.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : payer.status === "Pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {payer.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payer.billingMethod}</TableCell>
                          <TableCell>{payer.timelyFiling}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Billing Workflow</CardTitle>
                <CardDescription>State-specific billing process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pl-8 pb-8 border-l border-muted">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                      1
                    </div>
                    <h3 className="font-medium">Service Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete state-specific documentation requirements for the service provided.
                    </p>
                  </div>

                  <div className="relative pl-8 pb-8 border-l border-muted">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                      2
                    </div>
                    <h3 className="font-medium">Code Selection</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the appropriate state-specific billing codes for the service.
                    </p>
                  </div>

                  <div className="relative pl-8 pb-8 border-l border-muted">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                      3
                    </div>
                    <h3 className="font-medium">Prior Authorization</h3>
                    <p className="text-sm text-muted-foreground">
                      Obtain any required state-specific prior authorizations.
                    </p>
                  </div>

                  <div className="relative pl-8 pb-8 border-l border-muted">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                      4
                    </div>
                    <h3 className="font-medium">Claim Submission</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit claim through the state-specific portal or system.
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground -translate-x-1/2 text-xs">
                      5
                    </div>
                    <h3 className="font-medium">Follow-Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Track claim status and follow up according to state-specific timelines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>State Billing Resources</CardTitle>
                <CardDescription>Access state-specific billing guides and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateBillingResources.map((resource, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3">
                      <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="text-sm font-medium">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground">{resource.description}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.state}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Access Resource Library
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
