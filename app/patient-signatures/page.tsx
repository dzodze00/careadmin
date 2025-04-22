import { Check, Download, FileText, Filter, Info, Plus, Search, Upload } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PatientSignaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Patient Signatures</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                <SelectItem value="consent">Consent for Treatment</SelectItem>
                <SelectItem value="assignment">Assignment of Benefits</SelectItem>
                <SelectItem value="hipaa">HIPAA Acknowledgment</SelectItem>
                <SelectItem value="plan">Plan of Care</SelectItem>
                <SelectItem value="abn">Advance Beneficiary Notice</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Signed Form
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Medicare/Medicaid Signature Requirements</AlertTitle>
            <AlertDescription>
              Patient signatures are required for Medicare and Medicaid compliance. Ensure all forms are properly signed
              and stored.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="pending" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending Signatures</TabsTrigger>
              <TabsTrigger value="completed">Completed Forms</TabsTrigger>
              <TabsTrigger value="templates">Form Templates</TabsTrigger>
              <TabsTrigger value="upload">Upload Signed Form</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Forms Requiring Signatures</CardTitle>
                      <CardDescription>Forms that need to be signed by patients</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search patients..." className="pl-8 w-[250px]" />
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Form Type</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingSignatures.map((form, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{form.patient}</TableCell>
                          <TableCell>{form.formType}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                form.program === "Medicare"
                                  ? "border-blue-500 text-blue-700"
                                  : form.program === "Medicaid"
                                    ? "border-green-500 text-green-700"
                                    : "border-purple-500 text-purple-700"
                              }
                            >
                              {form.program}
                            </Badge>
                          </TableCell>
                          <TableCell>{form.state}</TableCell>
                          <TableCell>{form.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                form.status === "Sent to Patient"
                                  ? "bg-blue-100 text-blue-800"
                                  : form.status === "Not Started"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {form.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Send
                              </Button>
                              <Button size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Completed Signature Forms</CardTitle>
                      <CardDescription>Forms with completed patient signatures</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search forms..." className="pl-8 w-[250px]" />
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Form Type</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Signed Date</TableHead>
                        <TableHead>Expiration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedSignatures.map((form, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{form.patient}</TableCell>
                          <TableCell>{form.formType}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                form.program === "Medicare"
                                  ? "border-blue-500 text-blue-700"
                                  : form.program === "Medicaid"
                                    ? "border-green-500 text-green-700"
                                    : "border-purple-500 text-purple-700"
                              }
                            >
                              {form.program}
                            </Badge>
                          </TableCell>
                          <TableCell>{form.state}</TableCell>
                          <TableCell>{form.signedDate}</TableCell>
                          <TableCell>{form.expiration}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Signed Form</CardTitle>
                  <CardDescription>Upload a form that has been signed by the patient</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="patient">Patient</Label>
                        <Select>
                          <SelectTrigger id="patient">
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eleanor">Eleanor Johnson</SelectItem>
                            <SelectItem value="robert">Robert Williams</SelectItem>
                            <SelectItem value="patricia">Patricia Brown</SelectItem>
                            <SelectItem value="michael">Michael Miller</SelectItem>
                            <SelectItem value="jennifer">Jennifer Davis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="form-type">Form Type</Label>
                        <Select>
                          <SelectTrigger id="form-type">
                            <SelectValue placeholder="Select form type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consent">Consent for Treatment</SelectItem>
                            <SelectItem value="assignment">Assignment of Benefits</SelectItem>
                            <SelectItem value="hipaa">HIPAA Acknowledgment</SelectItem>
                            <SelectItem value="plan">Plan of Care</SelectItem>
                            <SelectItem value="abn">Advance Beneficiary Notice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="program">Program</Label>
                        <Select>
                          <SelectTrigger id="program">
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medicare">Medicare</SelectItem>
                            <SelectItem value="medicaid">Medicaid</SelectItem>
                            <SelectItem value="private">Private Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
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
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signed-date">Date Signed</Label>
                        <Input id="signed-date" type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration Date (if applicable)</Label>
                        <Input id="expiration" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signature-type">Signature Type</Label>
                      <Select>
                        <SelectTrigger id="signature-type">
                          <SelectValue placeholder="Select signature type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient Signature</SelectItem>
                          <SelectItem value="representative">Authorized Representative</SelectItem>
                          <SelectItem value="verbal">Verbal Consent (with witness)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Required Form Elements Checklist</Label>
                      <div className="grid gap-2 md:grid-cols-2">
                        {requiredFormElements.map((element, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`element-${index}`}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor={`element-${index}`} className="text-sm">
                              {element}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Signed Form</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PDF, PNG, or JPG (MAX. 10MB)</p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <textarea
                        id="notes"
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Add any additional notes about this form or signature"
                      ></textarea>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Upload and Save</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {formTemplates.map((template, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{template.name}</CardTitle>
                        <Badge variant="outline">{template.program}</Badge>
                      </div>
                      <CardDescription>
                        {template.states.map((state, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1 text-xs">
                            {state}
                          </Badge>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium">Required Elements:</h4>
                        <ul className="mt-1 text-xs text-muted-foreground space-y-1">
                          {template.requiredElements.map((element, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <Check className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                              <span>{element}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Signature Requirements by Program</CardTitle>
                <CardDescription>Medicare and Medicaid signature requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium text-lg mb-2">Medicare Signature Requirements</h3>
                    <ul className="space-y-2">
                      {medicareSignatureRequirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <p className="text-sm">{req}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Medicaid Signature Requirements</h3>
                    <ul className="space-y-2">
                      {medicaidSignatureRequirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 text-green-500" />
                          <p className="text-sm">{req}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                <CardTitle>Signature Compliance</CardTitle>
                <CardDescription>Status of patient signature compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signatureComplianceByState.map((state, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">
                          {state.name} ({state.code})
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={
                              state.medicareCompliance === "Compliant"
                                ? "border-green-200 text-green-700"
                                : "border-amber-200 text-amber-700"
                            }
                          >
                            Medicare: {state.medicareCompliance}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              state.medicaidCompliance === "Compliant"
                                ? "border-green-200 text-green-700"
                                : "border-amber-200 text-amber-700"
                            }
                          >
                            Medicaid: {state.medicaidCompliance}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
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

const pendingSignatures = [
  {
    patient: "Eleanor Johnson",
    formType: "Consent for Treatment",
    program: "Medicare",
    state: "CA",
    dueDate: "April 30, 2025",
    status: "Sent to Patient",
  },
  {
    patient: "Robert Williams",
    formType: "Assignment of Benefits",
    program: "Medicaid",
    state: "FL",
    dueDate: "May 5, 2025",
    status: "Not Started",
  },
  {
    patient: "Patricia Brown",
    formType: "Plan of Care",
    program: "Medicare",
    state: "TX",
    dueDate: "April 28, 2025",
    status: "Sent to Patient",
  },
  {
    patient: "Michael Miller",
    formType: "HIPAA Acknowledgment",
    program: "Medicaid",
    state: "OH",
    dueDate: "May 10, 2025",
    status: "Not Started",
  },
  {
    patient: "Jennifer Davis",
    formType: "Advance Beneficiary Notice",
    program: "Medicare",
    state: "GA",
    dueDate: "April 25, 2025",
    status: "Sent to Patient",
  },
]

const completedSignatures = [
  {
    patient: "William Wilson",
    formType: "Consent for Treatment",
    program: "Medicare",
    state: "CA",
    signedDate: "April 15, 2025",
    expiration: "April 15, 2026",
  },
  {
    patient: "Elizabeth Taylor",
    formType: "Assignment of Benefits",
    program: "Medicaid",
    state: "FL",
    signedDate: "April 10, 2025",
    expiration: "April 10, 2026",
  },
  {
    patient: "David Anderson",
    formType: "Plan of Care",
    program: "Medicare",
    state: "TX",
    signedDate: "April 5, 2025",
    expiration: "July 5, 2025",
  },
  {
    patient: "Susan Thomas",
    formType: "HIPAA Acknowledgment",
    program: "Medicaid",
    state: "OH",
    signedDate: "April 1, 2025",
    expiration: "April 1, 2026",
  },
  {
    patient: "Richard Martinez",
    formType: "Advance Beneficiary Notice",
    program: "Medicare",
    state: "GA",
    signedDate: "March 25, 2025",
    expiration: "June 25, 2025",
  },
]

const requiredFormElements = [
  "Patient's full name",
  "Patient's Medicare/Medicaid ID number",
  "Date of signature",
  "Provider information",
  "Service details",
  "Statement of consent/acknowledgment",
  "Patient signature",
  "Witness signature (if required)",
  "Representative signature (if applicable)",
  "Relationship to patient (if representative)",
  "Reason patient cannot sign (if applicable)",
  "Duration of consent/authorization",
  "Statement about right to revoke",
  "Required Medicare/Medicaid language",
]

const formTemplates = [
  {
    name: "Medicare Consent for Treatment",
    program: "Medicare",
    states: ["All States"],
    description: "Standard Medicare consent for treatment form with required elements",
    requiredElements: [
      "Patient demographic information",
      "Medicare ID number",
      "Provider information",
      "Consent statement with Medicare-required language",
      "Patient signature and date",
      "Representative information (if applicable)",
      "Witness signature (if applicable)",
    ],
  },
  {
    name: "Medicaid Assignment of Benefits",
    program: "Medicaid",
    states: ["All States"],
    description: "Standard Medicaid assignment of benefits form with required elements",
    requiredElements: [
      "Patient demographic information",
      "Medicaid ID number",
      "Provider information",
      "Assignment of benefits statement",
      "Patient signature and date",
      "Representative information (if applicable)",
      "Duration of authorization",
    ],
  },
  {
    name: "Medicare Plan of Care Certification",
    program: "Medicare",
    states: ["All States"],
    description: "Medicare plan of care certification form with required elements",
    requiredElements: [
      "Patient demographic information",
      "Medicare ID number",
      "Provider information",
      "Plan of care details",
      "Certification statement",
      "Patient signature and date",
      "Physician signature and date",
      "Certification period",
    ],
  },
  {
    name: "HIPAA Acknowledgment",
    program: "All Programs",
    states: ["All States"],
    description: "HIPAA acknowledgment of receipt of privacy practices",
    requiredElements: [
      "Patient demographic information",
      "Insurance ID number",
      "Acknowledgment statement",
      "Patient signature and date",
      "Representative information (if applicable)",
      "Attempt to obtain documentation (if applicable)",
    ],
  },
  {
    name: "Medicare Advance Beneficiary Notice (ABN)",
    program: "Medicare",
    states: ["All States"],
    description: "Medicare ABN form for services that may not be covered",
    requiredElements: [
      "Patient demographic information",
      "Medicare ID number",
      "Provider information",
      "Service description",
      "Reason Medicare may not pay",
      "Estimated cost",
      "Patient options (checked)",
      "Patient signature and date",
      "CMS-approved form language",
    ],
  },
  {
    name: "Medicaid Prior Authorization Form",
    program: "Medicaid",
    states: ["CA", "FL", "TX", "OH", "GA"],
    description: "State-specific Medicaid prior authorization form with signature requirement",
    requiredElements: [
      "Patient demographic information",
      "Medicaid ID number",
      "Provider information",
      "Service details",
      "Medical necessity justification",
      "Patient signature and date",
      "Provider signature and date",
      "State-specific required language",
    ],
  },
]

const medicareSignatureRequirements = [
  "Patient's handwritten signature or mark (if physically unable to write)",
  "If patient cannot sign, a representative may sign (must indicate relationship to patient)",
  "Reason the patient is unable to sign must be documented",
  "Signatures must be dated at the time of signing",
  "Electronic signatures must comply with CMS guidelines for electronic signatures",
  "Verbal consent is only acceptable in limited circumstances and must be properly documented with witness",
  "Signature must be on file before billing Medicare",
  "Signatures must be legible or have printed name alongside signature",
  "Signature must be on the appropriate Medicare-approved form",
  "For telehealth services, special documentation requirements apply for signatures",
]

const medicaidSignatureRequirements = [
  "Patient's handwritten signature or mark (if physically unable to write)",
  "If patient cannot sign, a representative may sign (must indicate relationship to patient)",
  "Reason the patient is unable to sign must be documented",
  "Signatures must be dated at the time of signing",
  "State-specific requirements must be followed for each state's Medicaid program",
  "Some states require witness signatures for certain forms",
  "Electronic signatures must comply with state Medicaid guidelines",
  "Verbal consent documentation requirements vary by state",
  "Signature must be on file before billing Medicaid",
  "For telehealth services, state-specific documentation requirements apply",
]

const signatureComplianceByState = [
  {
    name: "California",
    code: "CA",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "Florida",
    code: "FL",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Action Needed",
  },
  {
    name: "Texas",
    code: "TX",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "Ohio",
    code: "OH",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "Georgia",
    code: "GA",
    medicareCompliance: "Action Needed",
    medicaidCompliance: "Compliant",
  },
  {
    name: "North Carolina",
    code: "NC",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "New Jersey",
    code: "NJ",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "Virginia",
    code: "VA",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
  {
    name: "Texas",
    code: "TX",
    medicareCompliance: "Compliant",
    medicaidCompliance: "Compliant",
  },
]
