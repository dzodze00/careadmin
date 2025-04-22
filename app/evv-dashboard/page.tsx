"use client"

import { useState, useEffect } from "react"
import { Check, Clock, Download, FileText, Globe, Info, Settings } from "lucide-react"
import { useStateContext } from "@/components/state-context"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Full database of EVV compliance by state
const allEvvStateCompliance = {
  CA: {
    name: "California",
    code: "CA",
    system: "State Aggregator",
    complianceRate: 100,
    status: "Compliant",
    lastAudit: "April 10, 2025",
  },
  FL: {
    name: "Florida",
    code: "FL",
    system: "State Aggregator",
    complianceRate: 98,
    status: "Compliant",
    lastAudit: "March 25, 2025",
  },
  GA: {
    name: "Georgia",
    code: "GA",
    system: "Provider Choice",
    complianceRate: 100,
    status: "Compliant",
    lastAudit: "April 5, 2025",
  },
  OH: {
    name: "Ohio",
    code: "OH",
    system: "Sandata",
    complianceRate: 95,
    status: "Attention Needed",
    lastAudit: "April 15, 2025",
  },
  NC: {
    name: "North Carolina",
    code: "NC",
    system: "Provider Choice",
    complianceRate: 97,
    status: "Compliant",
    lastAudit: "March 30, 2025",
  },
  TX: {
    name: "Texas",
    code: "TX",
    system: "State Aggregator",
    complianceRate: 100,
    status: "Compliant",
    lastAudit: "April 12, 2025",
  },
  NY: {
    name: "New York",
    code: "NY",
    system: "State Aggregator",
    complianceRate: 99,
    status: "Compliant",
    lastAudit: "April 8, 2025",
  },
  NJ: {
    name: "New Jersey",
    code: "NJ",
    system: "Sandata",
    complianceRate: 96,
    status: "Compliant",
    lastAudit: "April 3, 2025",
  },
  VA: {
    name: "Virginia",
    code: "VA",
    system: "Provider Choice",
    complianceRate: 98,
    status: "Compliant",
    lastAudit: "March 28, 2025",
  },
}

export default function EVVDashboardPage() {
  const { selectedStates } = useStateContext()
  const [evvStateCompliance, setEvvStateCompliance] = useState([])
  const [selectedState, setSelectedState] = useState("all")
  const [overallCompliance, setOverallCompliance] = useState(0)

  // Update data when selected states change
  useEffect(() => {
    // Filter EVV compliance data based on selected states
    const filteredCompliance = selectedStates.map((state) => allEvvStateCompliance[state]).filter(Boolean)

    setEvvStateCompliance(filteredCompliance)

    // Calculate overall compliance rate
    if (filteredCompliance.length > 0) {
      const totalRate = filteredCompliance.reduce((sum, state) => sum + state.complianceRate, 0)
      setOverallCompliance(Math.round(totalRate / filteredCompliance.length))
    } else {
      setOverallCompliance(0)
    }

    // Reset selected state filter if it's no longer in the list
    if (selectedState !== "all" && !selectedStates.includes(selectedState)) {
      setSelectedState("all")
    }
  }, [selectedStates, selectedState])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <h1 className="text-xl font-bold">EVV Compliance Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedState} onValueChange={setSelectedState}>
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>EVV Compliance Status</AlertTitle>
            <AlertDescription>
              {selectedStates.length === 0
                ? "Please select at least one state to view EVV compliance data."
                : `Your organization is currently ${overallCompliance}% compliant with EVV requirements across selected states.`}
            </AlertDescription>
          </Alert>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Overall EVV Compliance</CardTitle>
                <CardDescription>Selected states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{overallCompliance}%</span>
                  <Badge
                    className={overallCompliance >= 95 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}
                  >
                    {overallCompliance >= 95 ? "Compliant" : "Attention Needed"}
                  </Badge>
                </div>
                <Progress value={overallCompliance} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Visits Verified</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">1,245</span>
                  <Badge className="bg-green-100 text-green-800">98% Verified</Badge>
                </div>
                <Progress value={98} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Manual Confirmations</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">25</span>
                  <Badge className="bg-amber-100 text-amber-800">2% Manual</Badge>
                </div>
                <Progress value={2} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="state" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="state">State Compliance</TabsTrigger>
              <TabsTrigger value="visits">Recent Visits</TabsTrigger>
              <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
              <TabsTrigger value="settings">EVV Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="state">
              <Card>
                <CardHeader>
                  <CardTitle>EVV Compliance by State</CardTitle>
                  <CardDescription>Status of EVV compliance for each state where you operate</CardDescription>
                </CardHeader>
                <CardContent>
                  {evvStateCompliance.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>State</TableHead>
                          <TableHead>EVV System</TableHead>
                          <TableHead>Compliance Rate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Audit</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evvStateCompliance.map((state, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {state.name} ({state.code})
                            </TableCell>
                            <TableCell>{state.system}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={state.complianceRate} className="w-[60px]" />
                                <span>{state.complianceRate}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  state.status === "Compliant"
                                    ? "bg-green-100 text-green-800"
                                    : state.status === "Attention Needed"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {state.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{state.lastAudit}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => alert(`Viewing EVV details for ${state.name}`)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      {selectedStates.length === 0
                        ? "Please select at least one state to view EVV compliance data."
                        : "No EVV compliance data found for the selected states."}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visits">
              <Card>
                <CardHeader>
                  <CardTitle>Recent EVV Visits</CardTitle>
                  <CardDescription>Last 20 visits across all states</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Caregiver</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Verification Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentEVVVisits.map((visit, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{visit.patient}</TableCell>
                          <TableCell>{visit.caregiver}</TableCell>
                          <TableCell>{visit.dateTime}</TableCell>
                          <TableCell>{visit.state}</TableCell>
                          <TableCell>{visit.method}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                visit.status === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : visit.status === "Manual"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {visit.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 20 of 1,245 visits</div>
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
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>EVV Integration Status</CardTitle>
                <CardDescription>Status of your EVV system integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evvIntegrations.map((integration, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3">
                      <div
                        className={`mt-0.5 h-5 w-5 rounded-full ${
                          integration.status === "Connected" ? "bg-green-100" : "bg-amber-100"
                        } flex items-center justify-center`}
                      >
                        {integration.status === "Connected" ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Clock className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              integration.status === "Connected"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {integration.status}
                          </Badge>
                          {integration.lastSync && (
                            <span className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => alert(`Managing settings for ${integration.name}`)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert("Opening EVV integration management")}
                >
                  Manage Integrations
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>EVV Resources</CardTitle>
                <CardDescription>State-specific EVV requirements and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evvResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => alert(`Viewing resource: ${resource.title}`)}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => alert("Opening EVV resource library")}>
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

const recentEVVVisits = [
  {
    patient: "Eleanor Johnson",
    caregiver: "Maria Rodriguez",
    dateTime: "April 21, 2025 - 2:00 PM",
    state: "CA",
    method: "Mobile App GPS",
    status: "Verified",
  },
  {
    patient: "Robert Williams",
    caregiver: "James Smith",
    dateTime: "April 21, 2025 - 11:30 AM",
    state: "FL",
    method: "Mobile App GPS",
    status: "Verified",
  },
  {
    patient: "Patricia Brown",
    caregiver: "Sarah Davis",
    dateTime: "April 21, 2025 - 9:15 AM",
    state: "TX",
    method: "Telephony",
    status: "Verified",
  },
  {
    patient: "Michael Miller",
    caregiver: "Thomas Johnson",
    dateTime: "April 20, 2025 - 4:45 PM",
    state: "OH",
    method: "Manual Entry",
    status: "Manual",
  },
  {
    patient: "Jennifer Davis",
    caregiver: "Lisa Williams",
    dateTime: "April 20, 2025 - 2:30 PM",
    state: "GA",
    method: "Mobile App GPS",
    status: "Verified",
  },
]

const evvIntegrations = [
  {
    name: "Sandata EVV",
    description: "Integration with Sandata for OH, NJ",
    status: "Connected",
    lastSync: "Today, 9:30 AM",
  },
  {
    name: "State Aggregator API",
    description: "Connection to CA, FL, TX state systems",
    status: "Connected",
    lastSync: "Today, 10:15 AM",
  },
  {
    name: "Mobile EVV App",
    description: "Company mobile application for caregivers",
    status: "Connected",
    lastSync: "Today, 10:30 AM",
  },
  {
    name: "Telephony System",
    description: "IVR system for visit verification",
    status: "Connected",
    lastSync: "Today, 9:45 AM",
  },
]

const evvResources = [
  {
    title: "EVV Requirements by State",
    description: "Comprehensive guide to state-specific EVV requirements",
  },
  {
    title: "Caregiver EVV Training Guide",
    description: "Training materials for staff on EVV compliance",
  },
  {
    title: "EVV Exception Handling",
    description: "Procedures for managing EVV exceptions and manual entries",
  },
  {
    title: "State EVV Contact Information",
    description: "Contact details for state EVV support teams",
  },
]
