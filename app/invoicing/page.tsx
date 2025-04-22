import { Check, Download, FileText, Filter, Plus, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvoicingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Invoicing</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Outstanding</CardTitle>
                <CardDescription>All unpaid invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450.75</div>
                <p className="text-xs text-muted-foreground">Across 14 invoices</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medicare Pending</CardTitle>
                <CardDescription>Awaiting Medicare payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,275.50</div>
                <p className="text-xs text-muted-foreground">Across 9 invoices</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medicaid Pending</CardTitle>
                <CardDescription>Awaiting Medicaid payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,125.25</div>
                <p className="text-xs text-muted-foreground">Across 5 invoices</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Invoices</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search invoices..." className="pl-8 w-[250px]" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice #</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.patient}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  invoice.type === "Medicare"
                                    ? "border-green-500 text-green-700"
                                    : invoice.type === "Medicaid"
                                      ? "border-purple-500 text-purple-700"
                                      : "border-blue-500 text-blue-700"
                                }
                              >
                                {invoice.type}
                              </Badge>
                            </TableCell>
                            <TableCell>${invoice.amount}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  invoice.status === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : invoice.status === "Overdue"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-amber-100 text-amber-800"
                                }
                              >
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                                {invoice.status !== "Paid" && (
                                  <Button variant="ghost" size="icon">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Invoice</CardTitle>
                <CardDescription>Create a new invoice quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="patient" className="text-sm font-medium">
                      Patient
                    </label>
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eleanor">Eleanor Johnson</SelectItem>
                        <SelectItem value="robert">Robert Williams</SelectItem>
                        <SelectItem value="patricia">Patricia Brown</SelectItem>
                        <SelectItem value="michael">Michael Miller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="service" className="text-sm font-medium">
                      Service Type
                    </label>
                    <Select>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nursing">Nursing Care</SelectItem>
                        <SelectItem value="therapy">Physical Therapy</SelectItem>
                        <SelectItem value="assistance">Personal Assistance</SelectItem>
                        <SelectItem value="medication">Medication Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="billing" className="text-sm font-medium">
                      Billing Type
                    </label>
                    <Select>
                      <SelectTrigger id="billing">
                        <SelectValue placeholder="Select billing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="medicaid">Medicaid</SelectItem>
                        <SelectItem value="private">Private Pay</SelectItem>
                        <SelectItem value="insurance">Private Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Amount
                    </label>
                    <Input id="amount" placeholder="0.00" type="number" />
                  </div>

                  <Button className="w-full">Generate Invoice</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medicare/Medicaid Compliance</CardTitle>
                <CardDescription>Ensure your invoices meet requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">All invoices are compliant</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your invoices meet all current Medicare and Medicaid requirements.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Compliance Checklist</h3>
                    <div className="space-y-1">
                      {complianceItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Upcoming Changes</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Medicare billing codes will be updated on May 15, 2025. Your system will automatically
                            update.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const invoices = [
  {
    id: "INV-2025-042",
    patient: "Eleanor Johnson",
    date: "Apr 18, 2025",
    type: "Medicare",
    amount: "1,250.00",
    status: "Pending",
  },
  {
    id: "INV-2025-041",
    patient: "Robert Williams",
    date: "Apr 15, 2025",
    type: "Private",
    amount: "850.00",
    status: "Paid",
  },
  {
    id: "INV-2025-040",
    patient: "Patricia Brown",
    date: "Apr 12, 2025",
    type: "Medicaid",
    amount: "975.25",
    status: "Pending",
  },
  {
    id: "INV-2025-039",
    patient: "Michael Miller",
    date: "Apr 10, 2025",
    type: "Medicare",
    amount: "1,125.50",
    status: "Pending",
  },
  {
    id: "INV-2025-038",
    patient: "Jennifer Davis",
    date: "Apr 05, 2025",
    type: "Private",
    amount: "750.00",
    status: "Overdue",
  },
  {
    id: "INV-2025-037",
    patient: "William Wilson",
    date: "Apr 01, 2025",
    type: "Medicaid",
    amount: "890.00",
    status: "Pending",
  },
]

const complianceItems = [
  "Proper service codes included",
  "Required patient information complete",
  "Provider credentials verified",
  "Service dates properly documented",
  "Appropriate signatures obtained",
]
