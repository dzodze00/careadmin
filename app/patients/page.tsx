import Link from "next/link"
import { Calendar, FileText, Filter, Search, Upload, User, UserPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PatientsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <h1 className="text-xl font-bold">Patient Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search patients..." className="pl-8 w-[250px]" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
                  <SelectItem value="private">Private Pay</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Link href={`/patients/${patient.id}`} className="hover:underline">
                          {patient.name}
                        </Link>
                      </TableCell>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            patient.program === "Medicare"
                              ? "border-blue-500 text-blue-700"
                              : patient.program === "Medicaid"
                                ? "border-green-500 text-green-700"
                                : "border-purple-500 text-purple-700"
                          }
                        >
                          {patient.program}
                        </Badge>
                      </TableCell>
                      <TableCell>{patient.state}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            patient.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : patient.status === "Inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{patient.nextVisit}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/patients/${patient.id}`}>View</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/scheduling?patient=${patient.id}`}>
                              <Calendar className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between py-4">
              <div className="text-sm text-muted-foreground">Showing 10 of 45 patients</div>
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Patient Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{activity.patient}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Patient Actions</CardTitle>
                <CardDescription>Forms and signatures needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requiredActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{action.patient}</p>
                        <p className="text-sm text-muted-foreground">{action.required}</p>
                      </div>
                      <Button size="sm">
                        {action.type === "upload" ? (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Required Actions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const patients = [
  {
    id: "PT-1001",
    name: "Eleanor Johnson",
    program: "Medicare",
    state: "CA",
    status: "Active",
    nextVisit: "Today, 2:00 PM",
  },
  {
    id: "PT-1002",
    name: "Robert Williams",
    program: "Medicaid",
    state: "FL",
    status: "Active",
    nextVisit: "Tomorrow, 10:30 AM",
  },
  {
    id: "PT-1003",
    name: "Patricia Brown",
    program: "Medicare",
    state: "TX",
    status: "Active",
    nextVisit: "Apr 25, 9:00 AM",
  },
  {
    id: "PT-1004",
    name: "Michael Miller",
    program: "Private",
    state: "OH",
    status: "Inactive",
    nextVisit: "None Scheduled",
  },
  {
    id: "PT-1005",
    name: "Jennifer Davis",
    program: "Medicaid",
    state: "GA",
    status: "Active",
    nextVisit: "Apr 24, 1:30 PM",
  },
  {
    id: "PT-1006",
    name: "William Wilson",
    program: "Medicare",
    state: "NC",
    status: "Active",
    nextVisit: "Apr 26, 11:00 AM",
  },
  {
    id: "PT-1007",
    name: "Elizabeth Taylor",
    program: "Medicaid",
    state: "NJ",
    status: "Pending",
    nextVisit: "Apr 27, 3:00 PM",
  },
  {
    id: "PT-1008",
    name: "David Anderson",
    program: "Medicare",
    state: "VA",
    status: "Active",
    nextVisit: "Apr 23, 2:30 PM",
  },
  {
    id: "PT-1009",
    name: "Susan Thomas",
    program: "Private",
    state: "CA",
    status: "Active",
    nextVisit: "Apr 24, 10:00 AM",
  },
  {
    id: "PT-1010",
    name: "Richard Martinez",
    program: "Medicare",
    state: "TX",
    status: "Active",
    nextVisit: "Today, 4:30 PM",
  },
]

const recentActivity = [
  {
    patient: "Eleanor Johnson",
    action: "Plan of care updated",
    date: "Today, 10:30 AM",
  },
  {
    patient: "Robert Williams",
    action: "Visit note completed",
    date: "Today, 9:15 AM",
  },
  {
    patient: "Patricia Brown",
    action: "Medication list updated",
    date: "Yesterday, 3:45 PM",
  },
  {
    patient: "Michael Miller",
    action: "Status changed to Inactive",
    date: "Yesterday, 2:20 PM",
  },
  {
    patient: "Jennifer Davis",
    action: "New visit scheduled",
    date: "Apr 20, 11:30 AM",
  },
]

const requiredActions = [
  {
    patient: "Eleanor Johnson",
    required: "Medicare Consent Form Signature",
    type: "upload",
  },
  {
    patient: "Robert Williams",
    required: "Medicaid Authorization Form",
    type: "send",
  },
  {
    patient: "Patricia Brown",
    required: "Plan of Care Signature",
    type: "upload",
  },
  {
    patient: "Elizabeth Taylor",
    required: "HIPAA Acknowledgment Form",
    type: "send",
  },
  {
    patient: "David Anderson",
    required: "Advance Beneficiary Notice",
    type: "send",
  },
]
