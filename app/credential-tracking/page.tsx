"use client"
import { Check, Clock, Download, FileText, Filter, Search, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CredentialTrackingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-xl font-bold">Multi-State Credential Tracking</h1>
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
                <SelectItem value="NC">North Carolina (NC)</SelectItem>
                <SelectItem value="NJ">New Jersey (NJ)</SelectItem>
                <SelectItem value="VA">Virginia (VA)</SelectItem>
                <SelectItem value="TX">Texas (TX)</SelectItem>
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
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Overall Compliance</CardTitle>
                <CardDescription>Staff credentials across all states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">96%</span>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
                <Progress value={96} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Expiring Soon</CardTitle>
                <CardDescription>Credentials expiring in 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Across 5 staff members</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Renewal Process</CardTitle>
                <CardDescription>Credentials in renewal process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Across 7 staff members</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="staff" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="staff">Staff Credentials</TabsTrigger>
              <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
              <TabsTrigger value="requirements">State Requirements</TabsTrigger>
              <TabsTrigger value="history">Renewal History</TabsTrigger>
            </TabsList>

            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Staff Credentials by State</CardTitle>
                      <CardDescription>Track staff credentials across multiple states</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search staff..." className="pl-8 w-[250px]" />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Member</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>States</TableHead>
                        <TableHead>Credentials</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Expiration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffCredentials.map((staff, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>{staff.position}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {staff.states.map((state, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {state}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{staff.credentials}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                staff.status === "Compliant"
                                  ? "bg-green-100 text-green-800"
                                  : staff.status === "Expiring Soon"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{staff.nextExpiration}</TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => alert(`View details for ${staff.name}`)}>
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
                <CardTitle>State-Specific Requirements</CardTitle>
                <CardDescription>Credential requirements by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateRequirements.map((state, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {state.name} ({state.code})
                        </h3>
                      </div>
                      <div className="mt-2 space-y-2">
                        {state.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 mt-0.5 text-green-500" />
                            <p className="text-sm">{req}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert("Viewing complete credential requirements guide")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Complete Requirements Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Credentials that need renewal in the next 60 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingRenewals.map((renewal, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{renewal.staff}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {renewal.credential}
                            </Badge>
                            <p className="text-sm text-muted-foreground">State: {renewal.state}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-amber-600">Expires: {renewal.expirationDate}</p>
                        <p className="text-xs text-muted-foreground">{renewal.daysRemaining} days remaining</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => alert(`Start renewal for ${renewal.staff}'s ${renewal.credential}`)}
                      >
                        Start Renewal
                      </Button>
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

const staffCredentials = [
  {
    name: "Maria Rodriguez",
    position: "Registered Nurse",
    states: ["CA", "FL", "TX"],
    credentials: "RN License, CPR, IV Certification",
    status: "Compliant",
    nextExpiration: "August 15, 2025",
  },
  {
    name: "James Smith",
    position: "Licensed Practical Nurse",
    states: ["GA", "FL"],
    credentials: "LPN License, CPR",
    status: "Expiring Soon",
    nextExpiration: "May 10, 2025",
  },
  {
    name: "Sarah Davis",
    position: "Home Health Aide",
    states: ["CA", "NV"],
    credentials: "HHA Certification, CPR",
    status: "Compliant",
    nextExpiration: "November 20, 2025",
  },
  {
    name: "Thomas Johnson",
    position: "Physical Therapist",
    states: ["TX", "OK", "LA"],
    credentials: "PT License, CPR",
    status: "Expiring Soon",
    nextExpiration: "May 25, 2025",
  },
  {
    name: "Lisa Williams",
    position: "Occupational Therapist",
    states: ["OH", "PA", "WV"],
    credentials: "OT License, CPR",
    status: "Compliant",
    nextExpiration: "September 5, 2025",
  },
]

const stateRequirements = [
  {
    name: "California",
    code: "CA",
    requirements: [
      "RN License from California Board of Registered Nursing",
      "HHA Certification from California Department of Public Health",
      "Background Check through DOJ and FBI",
      "TB Test (annual)",
      "CPR Certification (biennial)",
    ],
  },
  {
    name: "Florida",
    code: "FL",
    requirements: [
      "RN License from Florida Board of Nursing",
      "Level 2 Background Screening",
      "HHA Certification from Florida Department of Health",
      "CPR Certification (biennial)",
      "HIV/AIDS Training (one-time)",
    ],
  },
  {
    name: "Texas",
    code: "TX",
    requirements: [
      "RN License from Texas Board of Nursing",
      "Criminal History Check",
      "HHA Certification from Texas Health and Human Services",
      "CPR Certification (biennial)",
      "TB Test (annual)",
    ],
  },
]

const upcomingRenewals = [
  {
    staff: "James Smith",
    credential: "LPN License",
    state: "FL",
    expirationDate: "May 10, 2025",
    daysRemaining: "19",
  },
  {
    staff: "Thomas Johnson",
    credential: "PT License",
    state: "TX",
    expirationDate: "May 25, 2025",
    daysRemaining: "34",
  },
  {
    staff: "Maria Rodriguez",
    credential: "IV Certification",
    state: "CA",
    expirationDate: "June 15, 2025",
    daysRemaining: "55",
  },
  {
    staff: "David Anderson",
    credential: "CPR Certification",
    state: "OH",
    expirationDate: "June 5, 2025",
    daysRemaining: "45",
  },
]
