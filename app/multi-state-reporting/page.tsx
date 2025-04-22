import { Calendar, Download, FileText, Filter, Globe, Info, Search } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MultiStateReportingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <h1 className="text-xl font-bold">Multi-State Reporting</h1>
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
              Export Reports
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Multi-State Reporting</AlertTitle>
            <AlertDescription>
              Generate and manage reports for Medicare, Medicaid, and third-party payers across all states.
            </AlertDescription>
          </Alert>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Required Reports</CardTitle>
                <CardDescription>Due in next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Across 8 states</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Submitted Reports</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">100% on-time submission</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Compliance Rate</CardTitle>
                <CardDescription>Reporting requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">All reporting requirements met</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upcoming" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Reports</TabsTrigger>
              <TabsTrigger value="submitted">Submitted Reports</TabsTrigger>
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
              <TabsTrigger value="schedule">Reporting Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Required Reports</CardTitle>
                      <CardDescription>Reports due in the next 30 days</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search reports..." className="pl-8 w-[250px]" />
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
                        <TableHead>Report Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingReports.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.state}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                report.program === "Medicare"
                                  ? "border-blue-500 text-blue-700"
                                  : report.program === "Medicaid"
                                    ? "border-green-500 text-green-700"
                                    : "border-purple-500 text-purple-700"
                              }
                            >
                              {report.program}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                report.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : report.status === "Not Started"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              {report.status === "Ready for Review" ? "Review" : "Start"}
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
                <CardTitle>State Reporting Requirements</CardTitle>
                <CardDescription>Overview of reporting requirements by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateReportingRequirements.map((state, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {state.name} ({state.code})
                        </h3>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Medicare Reports:</span>
                          <span className="font-medium">{state.medicareReports} per year</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Medicaid Reports:</span>
                          <span className="font-medium">{state.medicaidReports} per year</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Next Due Date:</span>
                          <span className="font-medium">{state.nextDueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Complete Requirements
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reporting Calendar</CardTitle>
                <CardDescription>Upcoming reporting deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportingCalendar.map((month, index) => (
                    <div key={index} className="border-b pb-3">
                      <h3 className="font-medium mb-2">{month.month}</h3>
                      <div className="space-y-2">
                        {month.deadlines.map((deadline, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">
                                  {deadline.date}: {deadline.report}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {deadline.state} - {deadline.program}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                deadline.status === "Upcoming"
                                  ? "border-amber-200 text-amber-700"
                                  : "border-green-200 text-green-700"
                              }
                            >
                              {deadline.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const upcomingReports = [
  {
    name: "Quarterly Medicare Cost Report",
    state: "CA",
    program: "Medicare",
    dueDate: "May 15, 2025",
    status: "In Progress",
  },
  {
    name: "Monthly Medicaid Utilization Report",
    state: "FL",
    program: "Medicaid",
    dueDate: "April 30, 2025",
    status: "Ready for Review",
  },
  {
    name: "Quarterly Quality Measures Report",
    state: "TX",
    program: "Medicare",
    dueDate: "May 10, 2025",
    status: "Not Started",
  },
  {
    name: "Monthly EVV Compliance Report",
    state: "OH",
    program: "Medicaid",
    dueDate: "April 30, 2025",
    status: "In Progress",
  },
  {
    name: "Quarterly Provider Statistics Report",
    state: "GA",
    program: "Medicaid",
    dueDate: "May 15, 2025",
    status: "Not Started",
  },
]

const stateReportingRequirements = [
  {
    name: "California",
    code: "CA",
    medicareReports: 4,
    medicaidReports: 12,
    nextDueDate: "April 30, 2025",
  },
  {
    name: "Florida",
    code: "FL",
    medicareReports: 4,
    medicaidReports: 12,
    nextDueDate: "April 30, 2025",
  },
  {
    name: "Texas",
    code: "TX",
    medicareReports: 4,
    medicaidReports: 12,
    nextDueDate: "May 10, 2025",
  },
  {
    name: "Ohio",
    code: "OH",
    medicareReports: 4,
    medicaidReports: 12,
    nextDueDate: "April 30, 2025",
  },
]

const reportingCalendar = [
  {
    month: "April 2025",
    deadlines: [
      {
        date: "April 30",
        report: "Monthly Medicaid Utilization Report",
        state: "FL",
        program: "Medicaid",
        status: "Upcoming",
      },
      {
        date: "April 30",
        report: "Monthly EVV Compliance Report",
        state: "OH",
        program: "Medicaid",
        status: "Upcoming",
      },
    ],
  },
  {
    month: "May 2025",
    deadlines: [
      {
        date: "May 10",
        report: "Quarterly Quality Measures Report",
        state: "TX",
        program: "Medicare",
        status: "Upcoming",
      },
      {
        date: "May 15",
        report: "Quarterly Medicare Cost Report",
        state: "CA",
        program: "Medicare",
        status: "Upcoming",
      },
      {
        date: "May 15",
        report: "Quarterly Provider Statistics Report",
        state: "GA",
        program: "Medicaid",
        status: "Upcoming",
      },
    ],
  },
]
