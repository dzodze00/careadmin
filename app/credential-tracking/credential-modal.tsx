"use client"

import { useState } from "react"
import { Calendar, Download, FileText, Filter, Info, Search, Shield } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuditTrailPage() {
  const [activityType, setActivityType] = useState("all")
  const [userType, setUserType] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleExportLogs = () => {
    alert("Exporting audit logs")
  }

  const handleViewDetails = (log) => {
    alert(`Viewing details for activity: ${log.activity}`)
  }

  const handleGenerateReport = (report) => {
    alert(`Generating report: ${report.title}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold">Audit Trail</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Compliance Audit Trail</AlertTitle>
            <AlertDescription>
              Track all system activities for Medicare, Medicaid, and regulatory compliance. Audit logs are maintained
              for 7 years.
            </AlertDescription>
          </Alert>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search audit logs..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="login">Login/Logout</SelectItem>
                  <SelectItem value="patient">Patient Records</SelectItem>
                  <SelectItem value="billing">Billing/Invoicing</SelectItem>
                  <SelectItem value="document">Documentation</SelectItem>
                  <SelectItem value="signature">Signatures</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="billing">Billing Staff</SelectItem>
                  <SelectItem value="clinical">Clinical Staff</SelectItem>
                  <SelectItem value="office">Office Staff</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="w-[150px]"
                  placeholder="Start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  className="w-[150px]"
                  placeholder="End date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="patient">Patient Records</TabsTrigger>
              <TabsTrigger value="billing">Billing & Claims</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>System Activity Logs</CardTitle>
                  <CardDescription>Complete audit trail of all system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.activity}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                log.category === "Patient Records"
                                  ? "bg-blue-100 text-blue-800"
                                  : log.category === "Billing"
                                    ? "bg-green-100 text-green-800"
                                    : log.category === "Compliance"
                                      ? "bg-purple-100 text-purple-800"
                                      : log.category === "Security"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-gray-100 text-gray-800"
                              }
                            >
                              {log.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log)}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 10 of 1,248 activities</div>
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
                <CardTitle>Compliance Audit Requirements</CardTitle>
                <CardDescription>Regulatory audit trail requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditRequirements.map((req, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{req.title}</h3>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert("Viewing complete audit requirements")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Complete Requirements
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
                <CardDescription>Generate compliance audit reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateReport(report)}>
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => alert("Opening custom audit report builder")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Custom Audit Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const auditLogs = [
  {
    timestamp: "2025-04-21 15:42:18",
    user: "Maria Rodriguez (Admin)",
    activity: "Patient record accessed",
    category: "Patient Records",
    ipAddress: "192.168.1.105",
  },
  {
    timestamp: "2025-04-21 15:30:45",
    user: "James Smith (Billing)",
    activity: "Invoice generated",
    category: "Billing",
    ipAddress: "192.168.1.107",
  },
  {
    timestamp: "2025-04-21 15:15:22",
    user: "Sarah Davis (Clinical)",
    activity: "Plan of care updated",
    category: "Patient Records",
    ipAddress: "192.168.1.112",
  },
  {
    timestamp: "2025-04-21 14:58:10",
    user: "Thomas Johnson (Admin)",
    activity: "User permissions modified",
    category: "Security",
    ipAddress: "192.168.1.101",
  },
  {
    timestamp: "2025-04-21 14:45:33",
    user: "Lisa Williams (Billing)",
    activity: "Medicare claim submitted",
    category: "Billing",
    ipAddress: "192.168.1.108",
  },
  {
    timestamp: "2025-04-21 14:30:19",
    user: "David Anderson (Clinical)",
    activity: "Patient signature uploaded",
    category: "Compliance",
    ipAddress: "192.168.1.115",
  },
  {
    timestamp: "2025-04-21 14:22:05",
    user: "Jennifer Wilson (Admin)",
    activity: "System settings changed",
    category: "Security",
    ipAddress: "192.168.1.102",
  },
  {
    timestamp: "2025-04-21 14:10:42",
    user: "Michael Brown (Billing)",
    activity: "Payment recorded",
    category: "Billing",
    ipAddress: "192.168.1.109",
  },
  {
    timestamp: "2025-04-21 13:55:28",
    user: "Robert Williams (Clinical)",
    activity: "Visit note created",
    category: "Patient Records",
    ipAddress: "192.168.1.114",
  },
  {
    timestamp: "2025-04-21 13:42:15",
    user: "Patricia Brown (Admin)",
    activity: "User logged in",
    category: "Security",
    ipAddress: "192.168.1.103",
  },
]

const auditRequirements = [
  {
    title: "HIPAA Audit Requirements",
    description:
      "Maintain activity logs for access to PHI, including who accessed the information, when it was accessed, and what actions were taken.",
  },
  {
    title: "Medicare Documentation Requirements",
    description:
      "Track all changes to Medicare-related documentation, including who made changes, when changes were made, and what was changed.",
  },
  {
    title: "Medicaid Audit Trail Requirements",
    description:
      "Maintain detailed logs of all Medicaid billing activities, including claim submissions, modifications, and payments.",
  },
  {
    title: "State-Specific Audit Requirements",
    description:
      "Comply with state-specific audit trail requirements for home health agencies operating in multiple states.",
  },
  {
    title: "Security Incident Logging",
    description:
      "Track all security-related events, including login attempts, password changes, and permission modifications.",
  },
]

const auditReports = [
  {
    title: "HIPAA Compliance Audit Report",
    description: "Comprehensive report of all PHI access and modifications for HIPAA compliance.",
  },
  {
    title: "Medicare Billing Audit Report",
    description: "Detailed report of all Medicare billing activities for compliance and audit purposes.",
  },
  {
    title: "Medicaid Documentation Audit Report",
    description: "Report of all Medicaid documentation activities across all states.",
  },
  {
    title: "User Activity Report",
    description: "Summary of user activities by role, location, and time period.",
  },
  {
    title: "Security Incident Report",
    description: "Report of all security-related events and potential incidents.",
  },
]
