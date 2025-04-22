import { Calendar, Check, Clock, Download, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payroll Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Process Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Process Payroll</DialogTitle>
                <DialogDescription>
                  Review and confirm payroll processing for the current period (April 16-30, 2025)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payPeriod">Pay Period</Label>
                    <Input id="payPeriod" value="April 16-30, 2025" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="payDate">Pay Date</Label>
                    <Input id="payDate" type="date" defaultValue="2025-04-30" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="payrollSummary">Payroll Summary</Label>
                  <div id="payrollSummary" className="mt-2 rounded-md border p-3 text-sm">
                    <div className="flex justify-between border-b pb-2 font-medium">
                      <span>Total Staff:</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                      <span>Total Hours:</span>
                      <span>312.5</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                      <span>Regular Hours:</span>
                      <span>300</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                      <span>Overtime Hours:</span>
                      <span>12.5</span>
                    </div>
                    <div className="flex justify-between pt-2 font-medium">
                      <span>Gross Payroll:</span>
                      <span>$9,375.00</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="complianceCheck">Compliance Check</Label>
                  <div id="complianceCheck" className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>All time entries approved</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>EVV verification complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>Multi-state tax compliance verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>All required documentation complete</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Processing Notes</Label>
                  <Textarea id="notes" placeholder="Add any notes about this payroll processing" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm & Process</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payroll Date</CardTitle>
            <CardDescription>Upcoming processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl font-bold">April 30, 2025</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">9 days remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <CardDescription>Current pay period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl font-bold">312.5 hours</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Across 8 staff members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estimated Payroll</CardTitle>
            <CardDescription>Before deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$9,375.00</div>
            <p className="mt-1 text-sm text-muted-foreground">Average $30/hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search staff..." className="pl-8 w-[250px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pay period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">April 16-30, 2025</SelectItem>
              <SelectItem value="previous">April 1-15, 2025</SelectItem>
              <SelectItem value="march-2">March 16-31, 2025</SelectItem>
              <SelectItem value="march-1">March 1-15, 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Staff type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="nursing">Nursing</SelectItem>
              <SelectItem value="therapy">Therapy</SelectItem>
              <SelectItem value="aide">Home Health Aide</SelectItem>
              <SelectItem value="admin">Administrative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="hours" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="hours">Hours & Wages</TabsTrigger>
          <TabsTrigger value="deductions">Deductions & Benefits</TabsTrigger>
          <TabsTrigger value="compliance">Tax & Compliance</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Staff Hours</CardTitle>
              <CardDescription>Current pay period (April 16-30, 2025)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Regular Hours</TableHead>
                    <TableHead>Overtime</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead className="text-right">Gross Pay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffHours.map((staff, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Link href="#" className="hover:underline">
                          {staff.name}
                        </Link>
                      </TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.state}</TableCell>
                      <TableCell>${staff.rate}/hr</TableCell>
                      <TableCell>{staff.regularHours}</TableCell>
                      <TableCell>{staff.overtime}</TableCell>
                      <TableCell>{staff.totalHours}</TableCell>
                      <TableCell className="text-right">${staff.grossPay}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Total Hours: 312.5</p>
                <p className="text-sm text-muted-foreground">Regular: 300 | Overtime: 12.5</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Total Gross Pay: $9,375.00</p>
                <p className="text-sm text-muted-foreground">Before taxes and deductions</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const staffHours = [
  {
    name: "Maria Rodriguez",
    position: "Registered Nurse",
    state: "CA",
    rate: "35.00",
    regularHours: "40.0",
    overtime: "2.5",
    totalHours: "42.5",
    grossPay: "1,487.50",
  },
  {
    name: "James Smith",
    position: "Licensed Practical Nurse",
    state: "FL",
    rate: "28.00",
    regularHours: "40.0",
    overtime: "5.0",
    totalHours: "45.0",
    grossPay: "1,330.00",
  },
  {
    name: "Sarah Davis",
    position: "Home Health Aide",
    state: "TX",
    rate: "22.00",
    regularHours: "40.0",
    overtime: "0.0",
    totalHours: "40.0",
    grossPay: "880.00",
  },
  {
    name: "Thomas Johnson",
    position: "Physical Therapist",
    state: "GA",
    rate: "45.00",
    regularHours: "35.0",
    overtime: "0.0",
    totalHours: "35.0",
    grossPay: "1,575.00",
  },
  {
    name: "Lisa Williams",
    position: "Home Health Aide",
    state: "CA",
    rate: "22.00",
    regularHours: "40.0",
    overtime: "0.0",
    totalHours: "40.0",
    grossPay: "880.00",
  },
]
