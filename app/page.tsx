import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CalendarIcon, CreditCard, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Good</div>
            <p className="text-xs text-muted-foreground">All requirements met</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional dashboard content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Manage your staff and patient appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.caregiver} • {item.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/scheduling">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Full Schedule
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medicare/Medicaid Compliance</CardTitle>
            <CardDescription>Track and manage compliance requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${item.status === "Complete" ? "bg-green-500" : "bg-amber-500"}`}
                    />
                    <p className="font-medium">{item.requirement}</p>
                  </div>
                  <p className="text-sm">{item.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/compliance">
                <FileText className="mr-2 h-4 w-4" />
                Compliance Center
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const scheduleItems = [
  {
    patient: "Eleanor Johnson",
    caregiver: "Maria Rodriguez",
    time: "Today, 2:00 PM",
  },
  {
    patient: "Robert Williams",
    caregiver: "James Smith",
    time: "Today, 4:30 PM",
  },
  {
    patient: "Patricia Brown",
    caregiver: "Sarah Davis",
    time: "Tomorrow, 9:00 AM",
  },
  {
    patient: "Michael Miller",
    caregiver: "Maria Rodriguez",
    time: "Tomorrow, 11:30 AM",
  },
]

const complianceItems = [
  {
    requirement: "Patient Care Documentation",
    status: "Complete",
  },
  {
    requirement: "Staff Certifications",
    status: "Complete",
  },
  {
    requirement: "Quarterly Medicaid Report",
    status: "Due in 5 days",
  },
  {
    requirement: "HIPAA Training",
    status: "Complete",
  },
]
