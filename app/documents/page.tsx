"use client"

import Link from "next/link"
import { Download, FileText, Filter, Plus, Search, Upload } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadDocumentModal } from "./upload-document-modal"

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all")
  const [patientFilter, setPatientFilter] = useState("all")

  const filteredDocuments = recentDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = documentTypeFilter === "all" || doc.type === documentTypeFilter
    const matchesPatient = patientFilter === "all" || doc.patient === patientFilter
    return matchesSearch && matchesType && matchesPatient
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Documents & Forms</h1>
          </div>
          <div className="flex items-center gap-2">
            <UploadDocumentModal />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Form
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Consent">Consent Forms</SelectItem>
                  <SelectItem value="Assessment">Assessments</SelectItem>
                  <SelectItem value="Care Plan">Care Plans</SelectItem>
                  <SelectItem value="Visit Note">Visit Notes</SelectItem>
                  <SelectItem value="Clinical">Clinical Forms</SelectItem>
                  <SelectItem value="Authorization">Authorization</SelectItem>
                </SelectContent>
              </Select>
              <Select value={patientFilter} onValueChange={setPatientFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="Eleanor Johnson">Eleanor Johnson</SelectItem>
                  <SelectItem value="Robert Williams">Robert Williams</SelectItem>
                  <SelectItem value="Patricia Brown">Patricia Brown</SelectItem>
                  <SelectItem value="Michael Miller">Michael Miller</SelectItem>
                  <SelectItem value="Jennifer Davis">Jennifer Davis</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="recent" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Documents</TabsTrigger>
              <TabsTrigger value="templates">Form Templates</TabsTrigger>
              <TabsTrigger value="signatures">Pending Signatures</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Forms</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <Link href={`/documents/${doc.id}`} className="hover:underline">
                              {doc.name}
                            </Link>
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>
                            <Link href={`/patients/${doc.patientId}`} className="hover:underline">
                              {doc.patient}
                            </Link>
                          </TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>{doc.state}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                doc.status === "Complete"
                                  ? "bg-green-100 text-green-800"
                                  : doc.status === "Pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => alert(`Viewing document: ${doc.name}`)}>
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => alert(`Downloading document: ${doc.name}`)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">Showing 10 of 124 documents</div>
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>State-Specific Templates</CardTitle>
                <CardDescription>Documentation templates by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateTemplates.map((state, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">
                          {state.name} ({state.code})
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {state.templateCount} Templates
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/documents/templates/${state.code.toLowerCase()}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/documents/templates">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Templates
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Patient Signatures</CardTitle>
                <CardDescription>Forms requiring patient signatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingSignatures.map((form, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{form.name}</p>
                        <p className="text-sm text-muted-foreground">Patient: {form.patient}</p>
                        <p className="text-xs text-muted-foreground">Due: {form.dueDate}</p>
                      </div>
                      <Button size="sm">
                        {form.action === "upload" ? (
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
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/compliance/patient-signatures">View All Required Signatures</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const recentDocuments = [
  {
    id: "DOC-2025-101",
    name: "Initial Assessment",
    type: "Assessment",
    patient: "Eleanor Johnson",
    patientId: "PT-1001",
    date: "Apr 18, 2025",
    state: "CA",
    status: "Complete",
  },
  {
    id: "DOC-2025-100",
    name: "Plan of Care",
    type: "Care Plan",
    patient: "Eleanor Johnson",
    patientId: "PT-1001",
    date: "Apr 18, 2025",
    state: "CA",
    status: "Complete",
  },
  {
    id: "DOC-2025-099",
    name: "Medicare Consent Form",
    type: "Consent",
    patient: "Eleanor Johnson",
    patientId: "PT-1001",
    date: "Apr 18, 2025",
    state: "CA",
    status: "Pending",
  },
  {
    id: "DOC-2025-098",
    name: "Skilled Nursing Visit Note",
    type: "Visit Note",
    patient: "Robert Williams",
    patientId: "PT-1002",
    date: "Apr 17, 2025",
    state: "FL",
    status: "Complete",
  },
  {
    id: "DOC-2025-097",
    name: "Medicaid Authorization Form",
    type: "Authorization",
    patient: "Patricia Brown",
    patientId: "PT-1003",
    date: "Apr 16, 2025",
    state: "TX",
    status: "Pending",
  },
  {
    id: "DOC-2025-096",
    name: "Physical Therapy Evaluation",
    type: "Assessment",
    patient: "Michael Miller",
    patientId: "PT-1004",
    date: "Apr 15, 2025",
    state: "OH",
    status: "Complete",
  },
  {
    id: "DOC-2025-095",
    name: "HIPAA Acknowledgment",
    type: "Consent",
    patient: "Jennifer Davis",
    patientId: "PT-1005",
    date: "Apr 14, 2025",
    state: "GA",
    status: "Complete",
  },
  {
    id: "DOC-2025-094",
    name: "Medication Administration Record",
    type: "Clinical",
    patient: "William Wilson",
    patientId: "PT-1006",
    date: "Apr 13, 2025",
    state: "NC",
    status: "In Progress",
  },
  {
    id: "DOC-2025-093",
    name: "Advance Beneficiary Notice",
    type: "Consent",
    patient: "Elizabeth Taylor",
    patientId: "PT-1007",
    date: "Apr 12, 2025",
    state: "NJ",
    status: "Pending",
  },
  {
    id: "DOC-2025-092",
    name: "Discharge Summary",
    type: "Clinical",
    patient: "David Anderson",
    patientId: "PT-1008",
    date: "Apr 11, 2025",
    state: "VA",
    status: "Complete",
  },
]

const stateTemplates = [
  {
    name: "California",
    code: "CA",
    templateCount: 15,
  },
  {
    name: "Florida",
    code: "FL",
    templateCount: 12,
  },
  {
    name: "Texas",
    code: "TX",
    templateCount: 14,
  },
  {
    name: "Ohio",
    code: "OH",
    templateCount: 10,
  },
]

const pendingSignatures = [
  {
    name: "Medicare Consent Form",
    patient: "Eleanor Johnson",
    dueDate: "Apr 30, 2025",
    action: "upload",
  },
  {
    name: "Medicaid Authorization Form",
    patient: "Robert Williams",
    dueDate: "May 5, 2025",
    action: "send",
  },
  {
    name: "Plan of Care Signature",
    patient: "Patricia Brown",
    dueDate: "Apr 28, 2025",
    action: "upload",
  },
  {
    name: "HIPAA Acknowledgment Form",
    patient: "Elizabeth Taylor",
    dueDate: "May 2, 2025",
    action: "send",
  },
]
