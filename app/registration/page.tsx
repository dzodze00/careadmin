"use client"
import { ArrowRight, Check, FileText, Globe, Info, Upload } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistrationModal } from "./registration-modal"

export default function RegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <h1 className="text-xl font-bold">Provider Registration</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="new">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Registration type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Registration</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
                <SelectItem value="update">Information Update</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>State-Specific Registration</AlertTitle>
            <AlertDescription>
              Complete the registration process for Medicare, Medicaid, and third-party payers in each state.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="new" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="new">New Registration</TabsTrigger>
              <TabsTrigger value="active">Active Registrations</TabsTrigger>
              <TabsTrigger value="renewal">Upcoming Renewals</TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              <Card>
                <CardHeader>
                  <CardTitle>New Provider Registration</CardTitle>
                  <CardDescription>Start a new registration process for a state</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="state">Select State</Label>
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
                        <Label htmlFor="registration-type">Registration Type</Label>
                        <Select>
                          <SelectTrigger id="registration-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medicare">Medicare</SelectItem>
                            <SelectItem value="medicaid">Medicaid</SelectItem>
                            <SelectItem value="both">Both Medicare & Medicaid</SelectItem>
                            <SelectItem value="third-party">Third-Party Payer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Business Information</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="business-name">Business Legal Name</Label>
                          <Input id="business-name" placeholder="Enter legal business name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dba">Doing Business As (if different)</Label>
                          <Input id="dba" placeholder="Enter DBA name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tax-id">Federal Tax ID (EIN)</Label>
                          <Input id="tax-id" placeholder="XX-XXXXXXX" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="npi">NPI Number</Label>
                          <Input id="npi" placeholder="XXXXXXXXXX" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Business Address</Label>
                          <Input id="address" placeholder="Street Address" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city-state-zip">City, State, ZIP</Label>
                          <Input id="city-state-zip" placeholder="City, State, ZIP" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Business Phone</Label>
                          <Input id="phone" placeholder="(XXX) XXX-XXXX" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Business Email</Label>
                          <Input id="email" placeholder="contact@yourbusiness.com" type="email" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The following documents are required for registration. Upload each document in PDF format.
                      </p>

                      <div className="space-y-4">
                        {requiredDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-md p-3">
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </div>
                            <Button variant="outline">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Registrations</CardTitle>
                  <CardDescription>Currently active provider registrations by state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activeRegistrations.map((reg, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="font-medium">{reg.stateCode}</span>
                            </div>
                            <h3 className="text-lg font-medium">{reg.state}</h3>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Medicare</h4>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Active</span>
                            </div>
                            <p className="text-xs text-muted-foreground">PTAN: {reg.medicareId}</p>
                            <p className="text-xs text-muted-foreground">Renewal: {reg.medicareRenewal}</p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Medicaid</h4>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-sm">Active</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Provider ID: {reg.medicaidId}</p>
                            <p className="text-xs text-muted-foreground">Renewal: {reg.medicaidRenewal}</p>
                            <p className="text-xs text-muted-foreground">Program: {reg.medicaidProgram}</p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Third-Party Payers</h4>
                            <div className="space-y-1">
                              {reg.thirdPartyPayers.map((payer, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <span className="text-xs">{payer.name}</span>
                                  <Badge variant="outline" className="text-green-700 border-green-200">
                                    Active
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => alert(`Viewing details for ${reg.state}`)}>
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert(`Updating information for ${reg.state}`)}
                          >
                            Update Information
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="renewal">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals</CardTitle>
                  <CardDescription>Provider registrations that need renewal in the next 90 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingRenewals.map((renewal, index) => (
                      <div key={index} className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="font-medium text-amber-800">{renewal.stateCode}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{renewal.state}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {renewal.type}
                              </Badge>
                              <p className="text-sm text-muted-foreground">ID: {renewal.providerId}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-amber-600">Due: {renewal.dueDate}</p>
                          <p className="text-xs text-muted-foreground">{renewal.daysRemaining} days remaining</p>
                        </div>
                        <RegistrationModal
                          isRenewal={true}
                          onSave={(data) => {
                            console.log("Renewal:", data)
                            // In a real app, you would save this to your backend
                            alert(`Renewal started for ${data.state}`)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>State-Specific Requirements</CardTitle>
                <CardDescription>Registration requirements vary by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateRequirements.map((state, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {state.name} ({state.code})
                        </h3>
                      </div>
                      <div className="mt-2 space-y-2">
                        {state.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 mt-0.5 text-green-500" />
                            <p className="text-sm">{req}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Complete Requirements Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Timeline</CardTitle>
                <CardDescription>Expected processing times by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrationTimelines.map((timeline, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h3 className="font-medium">
                          {timeline.state} ({timeline.stateCode})
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Medicare: {timeline.medicare}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Medicaid: {timeline.medicaid}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Details
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

const requiredDocuments = [
  {
    name: "Business License",
    description: "Current state-specific business license",
  },
  {
    name: "Professional Licenses",
    description: "Licenses for all professional staff (nurses, therapists, etc.)",
  },
  {
    name: "Liability Insurance",
    description: "Proof of liability insurance meeting state requirements",
  },
  {
    name: "W-9 Form",
    description: "Completed and signed W-9 form",
  },
  {
    name: "Voided Check",
    description: "For electronic funds transfer setup",
  },
  {
    name: "Background Check Authorization",
    description: "Authorization forms for required background checks",
  },
  {
    name: "CMS-855A or CMS-855B",
    description: "Medicare enrollment application form",
  },
  {
    name: "Accreditation Certificate",
    description: "Certificate from an approved accreditation organization",
  },
]

const activeRegistrations = [
  {
    state: "California",
    stateCode: "CA",
    medicareId: "CAP1234567",
    medicareRenewal: "March 15, 2026",
    medicaidId: "CAMCD987654",
    medicaidRenewal: "March 15, 2026",
    medicaidProgram: "Medi-Cal",
    thirdPartyPayers: [{ name: "Blue Shield of California" }, { name: "Kaiser Permanente" }, { name: "Health Net" }],
  },
  {
    state: "Florida",
    stateCode: "FL",
    medicareId: "FLP7654321",
    medicareRenewal: "June 30, 2026",
    medicaidId: "FLMCD123456",
    medicaidRenewal: "June 30, 2026",
    medicaidProgram: "Florida Medicaid",
    thirdPartyPayers: [{ name: "Florida Blue" }, { name: "Humana" }, { name: "UnitedHealthcare" }],
  },
  {
    state: "Texas",
    stateCode: "TX",
    medicareId: "TXP9517536",
    medicareRenewal: "October 15, 2025",
    medicaidId: "TXMCD753951",
    medicaidRenewal: "October 15, 2025",
    medicaidProgram: "Texas Medicaid",
    thirdPartyPayers: [
      { name: "Blue Cross Blue Shield of Texas" },
      { name: "Superior HealthPlan" },
      { name: "Community Health Choice" },
    ],
  },
]

const upcomingRenewals = [
  {
    state: "Georgia",
    stateCode: "GA",
    type: "Medicare",
    providerId: "GAP9876543",
    dueDate: "July 15, 2025",
    daysRemaining: "85",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    type: "Medicaid",
    providerId: "OHMCD654321",
    dueDate: "August 10, 2025",
    daysRemaining: "111",
  },
  {
    state: "Virginia",
    stateCode: "VA",
    type: "Medicare",
    providerId: "VAP3692581",
    dueDate: "June 30, 2025",
    daysRemaining: "70",
  },
]

const stateRequirements = [
  {
    name: "California",
    code: "CA",
    requirements: [
      "Home Health Agency License from California Department of Public Health",
      "Medi-Cal Provider Enrollment Application",
      "Medicare Certification (if applicable)",
      "Criminal Background Checks for all staff",
      "Quality Assurance Program documentation",
    ],
  },
  {
    name: "Florida",
    code: "FL",
    requirements: [
      "Home Health Agency License from Florida AHCA",
      "Florida Medicaid Provider Enrollment",
      "Level 2 Background Screening for all staff",
      "Medicare Certification (if applicable)",
      "Emergency Management Plan",
    ],
  },
  {
    name: "Texas",
    code: "TX",
    requirements: [
      "Home and Community Support Services Agency License",
      "Texas Medicaid Provider Enrollment",
      "Electronic Visit Verification (EVV) system implementation",
      "Criminal History Checks for all staff",
      "Medicare Certification (if applicable)",
    ],
  },
]

const registrationTimelines = [
  {
    state: "California",
    stateCode: "CA",
    medicare: "60-90 days",
    medicaid: "90-120 days",
  },
  {
    state: "Florida",
    stateCode: "FL",
    medicare: "45-60 days",
    medicaid: "60-90 days",
  },
  {
    state: "Georgia",
    stateCode: "GA",
    medicare: "60-90 days",
    medicaid: "45-60 days",
  },
  {
    state: "Ohio",
    stateCode: "OH",
    medicare: "45-60 days",
    medicaid: "60-90 days",
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    medicare: "60-90 days",
    medicaid: "90-120 days",
  },
  {
    state: "New Jersey",
    stateCode: "NJ",
    medicare: "45-60 days",
    medicaid: "60-90 days",
  },
  {
    state: "Virginia",
    stateCode: "VA",
    medicare: "60-90 days",
    medicaid: "45-60 days",
  },
  {
    state: "Texas",
    stateCode: "TX",
    medicare: "60-90 days",
    medicaid: "90-120 days",
  },
]
