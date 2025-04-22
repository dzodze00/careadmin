"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, User, Calendar, CheckCircle, AlertTriangle } from "lucide-react"

export default function StaffManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleAddStaff = () => {
    alert("Opening staff creation form")
  }

  const handleViewStaff = (staff) => {
    alert(`Viewing details for staff member: ${staff.name}`)
  }

  const handleEditStaff = (staff) => {
    alert(`Editing staff member: ${staff.name}`)
  }

  const handleExport = () => {
    alert("Exporting staff data")
  }

  const handleViewAllRenewals = () => {
    alert("Viewing all credential renewals")
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff, credentials, and scheduling</p>
        </div>
        <Button onClick={handleAddStaff}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Credentials</th>
                      <th className="px-4 py-3 font-medium">State Licenses</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((staff) => (
                      <tr key={staff.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{staff.name}</p>
                              <p className="text-xs text-muted-foreground">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{staff.role}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={staff.status === "Active" ? "outline" : "secondary"}
                            className={
                              staff.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {staff.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {staff.credentialsStatus === "Current" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                            <span>{staff.credentialsStatus}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {staff.stateLicenses.map((state) => (
                              <Badge key={state} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {state}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewStaff(staff)}>
                              View
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staff)}>
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-8</strong> of <strong>24</strong> staff members
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Credential Status</CardTitle>
                <CardDescription>Overview of staff credential status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Current</span>
                    </div>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span>Expiring Soon</span>
                    </div>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Expired</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multi-State Licenses</CardTitle>
                <CardDescription>Staff licensed across states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {states.map((state) => (
                    <div key={state.name} className="flex items-center justify-between">
                      <span>{state.name}</span>
                      <span className="font-medium">{state.count} staff</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
                <CardDescription>Credentials expiring in 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {renewals.map((renewal) => (
                    <div key={renewal.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{renewal.name}</p>
                        <p className="text-xs text-muted-foreground">{renewal.credential}</p>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {renewal.daysLeft} days
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleViewAllRenewals}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Renewals
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Staff</CardTitle>
              <CardDescription>Currently active staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Active staff content will go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling">
          <Card>
            <CardHeader>
              <CardTitle>Staff Scheduling</CardTitle>
              <CardDescription>Manage staff schedules and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Staff scheduling content will go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const staffMembers = [
  {
    id: 1,
    name: "Maria Rodriguez",
    email: "maria.r@careadmin.com",
    role: "Registered Nurse",
    status: "Active",
    credentialsStatus: "Current",
    stateLicenses: ["FL", "GA", "TX"],
  },
  {
    id: 2,
    name: "James Smith",
    email: "james.s@careadmin.com",
    role: "Home Health Aide",
    status: "Active",
    credentialsStatus: "Current",
    stateLicenses: ["FL", "GA"],
  },
  {
    id: 3,
    name: "Sarah Davis",
    email: "sarah.d@careadmin.com",
    role: "Physical Therapist",
    status: "Active",
    credentialsStatus: "Expiring Soon",
    stateLicenses: ["FL", "NY", "PA"],
  },
  {
    id: 4,
    name: "Michael Johnson",
    email: "michael.j@careadmin.com",
    role: "Occupational Therapist",
    status: "Active",
    credentialsStatus: "Current",
    stateLicenses: ["FL", "TX"],
  },
  {
    id: 5,
    name: "Jennifer Williams",
    email: "jennifer.w@careadmin.com",
    role: "Registered Nurse",
    status: "Active",
    credentialsStatus: "Current",
    stateLicenses: ["CA", "NY"],
  },
  {
    id: 6,
    name: "Robert Brown",
    email: "robert.b@careadmin.com",
    role: "Home Health Aide",
    status: "Inactive",
    credentialsStatus: "Expired",
    stateLicenses: ["FL"],
  },
  {
    id: 7,
    name: "Lisa Miller",
    email: "lisa.m@careadmin.com",
    role: "Speech Therapist",
    status: "Active",
    credentialsStatus: "Current",
    stateLicenses: ["NY", "NJ", "CT"],
  },
  {
    id: 8,
    name: "David Wilson",
    email: "david.w@careadmin.com",
    role: "Physical Therapist",
    status: "Active",
    credentialsStatus: "Expiring Soon",
    stateLicenses: ["FL", "GA"],
  },
]

const states = [
  { name: "Florida (FL)", count: 6 },
  { name: "Georgia (GA)", count: 4 },
  { name: "Texas (TX)", count: 3 },
  { name: "New York (NY)", count: 3 },
  { name: "California (CA)", count: 1 },
]

const renewals = [
  { id: 1, name: "Sarah Davis", credential: "PT License (FL)", daysLeft: 14 },
  { id: 2, name: "David Wilson", credential: "PT License (GA)", daysLeft: 21 },
  { id: 3, name: "Michael Johnson", credential: "OT License (TX)", daysLeft: 28 },
  { id: 4, name: "Jennifer Williams", credential: "RN License (CA)", daysLeft: 30 },
]
