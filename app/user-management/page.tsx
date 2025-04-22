"use client"

import { useState } from "react"
import { Check, FileText, Info, Key, Lock, Plus, Search, Shield, UserPlus, Users } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    // Apply search filter
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply role filter
    if (roleFilter !== "all") {
      const roleValue =
        roleFilter === "admin"
          ? "Administrator"
          : roleFilter === "billing"
            ? "Billing Staff"
            : roleFilter === "clinical"
              ? "Clinical Staff"
              : "Office Staff"
      if (user.role !== roleValue) return false
    }

    // Apply status filter
    if (statusFilter !== "all" && user.status.toLowerCase() !== statusFilter) {
      return false
    }

    // Apply location filter
    if (locationFilter !== "all" && user.location.toLowerCase() !== locationFilter) {
      return false
    }

    return true
  })

  const handleAddUser = () => {
    alert("Opening user creation form")
  }

  const handleEditUser = (user) => {
    alert(`Editing user: ${user.name}`)
  }

  const handleLockUser = (user) => {
    alert(`${user.status === "Active" ? "Locking" : "Unlocking"} user: ${user.name}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-xl font-bold">User Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Role-Based Access Control</AlertTitle>
            <AlertDescription>
              Manage users and their access permissions. Ensure compliance with HIPAA and other regulatory requirements.
            </AlertDescription>
          </Alert>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="billing">Billing Staff</SelectItem>
                  <SelectItem value="clinical">Clinical Staff</SelectItem>
                  <SelectItem value="office">Office Staff</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="users" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="access">Access Logs</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>System Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Administrator"
                                  ? "border-purple-500 text-purple-700"
                                  : user.role === "Billing Staff"
                                    ? "border-green-500 text-green-700"
                                    : user.role === "Clinical Staff"
                                      ? "border-blue-500 text-blue-700"
                                      : "border-gray-500 text-gray-700"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.location}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "Inactive"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleLockUser(user)}>
                                <Lock className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 10 of 25 users</div>
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

            <TabsContent value="roles">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Role Definitions</CardTitle>
                    <CardDescription>Define user roles and their permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roles.map((role, index) => (
                        <div key={index} className="border-b pb-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{role.name}</h3>
                            <Badge variant="outline">{role.userCount} Users</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Edit Role
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Role
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permission Matrix</CardTitle>
                    <CardDescription>Configure permissions for each role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {permissionCategories.map((category, index) => (
                        <div key={index}>
                          <h3 className="font-medium mb-2">{category.name}</h3>
                          <div className="space-y-2">
                            {category.permissions.map((permission, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">{permission.name}</p>
                                  <p className="text-xs text-muted-foreground">{permission.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`permission-${index}-${idx}`} className="sr-only">
                                    Enable {permission.name}
                                  </Label>
                                  <Switch id={`permission-${index}-${idx}`} defaultChecked={permission.enabled} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure system-wide security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Password Policy</h3>
                      <div className="space-y-4">
                        {passwordPolicies.map((policy, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{policy.name}</p>
                              <p className="text-xs text-muted-foreground">{policy.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {policy.type === "switch" ? (
                                <Switch id={`policy-${index}`} defaultChecked={policy.enabled} />
                              ) : (
                                <Select defaultValue={policy.value}>
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {policy.options?.map((option, idx) => (
                                      <SelectItem key={idx} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Multi-Factor Authentication</h3>
                      <div className="space-y-4">
                        {mfaSettings.map((setting, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{setting.name}</p>
                              <p className="text-xs text-muted-foreground">{setting.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch id={`mfa-${index}`} defaultChecked={setting.enabled} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Session Settings</h3>
                      <div className="space-y-4">
                        {sessionSettings.map((setting, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{setting.name}</p>
                              <p className="text-xs text-muted-foreground">{setting.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {setting.type === "switch" ? (
                                <Switch id={`session-${index}`} defaultChecked={setting.enabled} />
                              ) : (
                                <Select defaultValue={setting.value}>
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {setting.options?.map((option, idx) => (
                                      <SelectItem key={idx} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Requirements</CardTitle>
                <CardDescription>User management compliance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceRequirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3">
                      <div className={`mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center`}>
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{req.title}</h3>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
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
                <CardTitle>Security Recommendations</CardTitle>
                <CardDescription>Best practices for user management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-3">
                      <Shield className="h-5 w-5 mt-0.5 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Key className="mr-2 h-4 w-4" />
                  Security Assessment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const users = [
  {
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    role: "Administrator",
    location: "California",
    status: "Active",
    lastLogin: "Today, 10:30 AM",
  },
  {
    name: "James Smith",
    email: "james.smith@example.com",
    role: "Billing Staff",
    location: "Florida",
    status: "Active",
    lastLogin: "Today, 9:15 AM",
  },
  {
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    role: "Clinical Staff",
    location: "Texas",
    status: "Active",
    lastLogin: "Yesterday, 4:45 PM",
  },
  {
    name: "Thomas Johnson",
    email: "thomas.johnson@example.com",
    role: "Administrator",
    location: "Remote",
    status: "Active",
    lastLogin: "Today, 8:30 AM",
  },
  {
    name: "Lisa Williams",
    email: "lisa.williams@example.com",
    role: "Clinical Staff",
    location: "California",
    status: "Active",
    lastLogin: "Yesterday, 3:20 PM",
  },
  {
    name: "David Anderson",
    email: "david.anderson@example.com",
    role: "Clinical Staff",
    location: "Florida",
    status: "Active",
    lastLogin: "Today, 11:10 AM",
  },
  {
    name: "Jennifer Wilson",
    email: "jennifer.wilson@example.com",
    role: "Office Staff",
    location: "Texas",
    status: "Inactive",
    lastLogin: "April 15, 2025",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Billing Staff",
    location: "California",
    status: "Active",
    lastLogin: "Today, 9:45 AM",
  },
  {
    name: "Robert Williams",
    email: "robert.williams@example.com",
    role: "Clinical Staff",
    location: "Remote",
    status: "Active",
    lastLogin: "Yesterday, 2:30 PM",
  },
  {
    name: "Patricia Brown",
    email: "patricia.brown@example.com",
    role: "Administrator",
    location: "Florida",
    status: "Pending",
    lastLogin: "Never",
  },
]

const roles = [
  {
    name: "Administrator",
    description: "Full system access with ability to manage users, settings, and all data.",
    userCount: 3,
  },
  {
    name: "Billing Staff",
    description: "Access to billing, invoicing, and financial data. Cannot access clinical data.",
    userCount: 5,
  },
  {
    name: "Clinical Staff",
    description: "Access to patient records, scheduling, and clinical documentation.",
    userCount: 12,
  },
  {
    name: "Office Staff",
    description: "Limited access to scheduling, basic patient information, and administrative tasks.",
    userCount: 5,
  },
]

const permissionCategories = [
  {
    name: "Patient Records",
    permissions: [
      {
        name: "View Patient Records",
        description: "Can view patient demographic and clinical information",
        enabled: true,
      },
      {
        name: "Edit Patient Records",
        description: "Can modify patient information and clinical documentation",
        enabled: true,
      },
      {
        name: "Delete Patient Records",
        description: "Can delete patient records from the system",
        enabled: false,
      },
    ],
  },
  {
    name: "Billing & Finance",
    permissions: [
      {
        name: "View Financial Data",
        description: "Can view invoices, claims, and payment information",
        enabled: true,
      },
      {
        name: "Process Payments",
        description: "Can record and process patient payments",
        enabled: true,
      },
      {
        name: "Submit Claims",
        description: "Can submit claims to Medicare, Medicaid, and other payers",
        enabled: true,
      },
    ],
  },
  {
    name: "Administration",
    permissions: [
      {
        name: "Manage Users",
        description: "Can create, edit, and deactivate user accounts",
        enabled: false,
      },
      {
        name: "System Settings",
        description: "Can modify system-wide settings and configurations",
        enabled: false,
      },
      {
        name: "Audit Logs",
        description: "Can view system audit logs and activity history",
        enabled: true,
      },
    ],
  },
]

const passwordPolicies = [
  {
    name: "Minimum Password Length",
    description: "Set the minimum number of characters required for passwords",
    type: "select",
    value: "12",
    options: ["8", "10", "12", "14", "16"],
  },
  {
    name: "Password Complexity",
    description: "Require uppercase, lowercase, numbers, and special characters",
    type: "switch",
    enabled: true,
  },
  {
    name: "Password Expiration",
    description: "Force password changes after a specified period",
    type: "select",
    value: "90 days",
    options: ["30 days", "60 days", "90 days", "180 days", "Never"],
  },
  {
    name: "Password History",
    description: "Prevent reuse of previous passwords",
    type: "select",
    value: "5 passwords",
    options: ["3 passwords", "5 passwords", "10 passwords", "None"],
  },
  {
    name: "Account Lockout",
    description: "Lock account after failed login attempts",
    type: "switch",
    enabled: true,
  },
]

const mfaSettings = [
  {
    name: "Require MFA for All Users",
    description: "Force multi-factor authentication for all user accounts",
    enabled: true,
  },
  {
    name: "Email Authentication",
    description: "Allow email as a second factor authentication method",
    enabled: true,
  },
  {
    name: "SMS Authentication",
    description: "Allow SMS as a second factor authentication method",
    enabled: true,
  },
  {
    name: "Authenticator App",
    description: "Allow authenticator apps as a second factor authentication method",
    enabled: true,
  },
]

const sessionSettings = [
  {
    name: "Session Timeout",
    description: "Automatically log out inactive users after a specified period",
    type: "select",
    value: "15 minutes",
    options: ["5 minutes", "10 minutes", "15 minutes", "30 minutes", "60 minutes"],
  },
  {
    name: "Concurrent Sessions",
    description: "Allow users to be logged in from multiple devices simultaneously",
    type: "switch",
    enabled: false,
  },
  {
    name: "IP Restriction",
    description: "Restrict access to specific IP addresses or ranges",
    type: "switch",
    enabled: true,
  },
  {
    name: "Force Re-authentication",
    description: "Require re-authentication for sensitive operations",
    type: "switch",
    enabled: true,
  },
]

const complianceRequirements = [
  {
    title: "HIPAA User Management",
    description: "Implement role-based access control and maintain audit logs of all user activities related to PHI.",
  },
  {
    title: "Unique User Identification",
    description: "Assign a unique identifier to each user for tracking user activity within the system.",
  },
  {
    title: "Emergency Access Procedure",
    description: "Establish procedures for obtaining necessary PHI during an emergency situation.",
  },
  {
    title: "Automatic Logoff",
    description:
      "Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity.",
  },
  {
    title: "Authentication Verification",
    description: "Implement procedures to verify that the person seeking access is the one claimed.",
  },
]

const securityRecommendations = [
  {
    title: "Implement Least Privilege Access",
    description: "Grant users only the minimum permissions necessary to perform their job functions.",
  },
  {
    title: "Regular Access Reviews",
    description: "Conduct quarterly reviews of user access rights to ensure appropriate permissions.",
  },
  {
    title: "Security Awareness Training",
    description: "Provide regular security training to all users on password security and phishing awareness.",
  },
  {
    title: "Automated Account Deactivation",
    description: "Automatically deactivate accounts when employees leave or change roles.",
  },
  {
    title: "Multi-Factor Authentication",
    description: "Implement MFA for all users, especially those with administrative privileges.",
  },
]
