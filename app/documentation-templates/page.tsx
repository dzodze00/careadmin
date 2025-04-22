import { Download, FileText, Filter, Globe, Info, Plus, Search } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationTemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">State-Specific Documentation Templates</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>State-Specific Documentation</AlertTitle>
            <AlertDescription>
              Access and manage documentation templates that comply with state-specific requirements.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="templates" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="requirements">Documentation Requirements</TabsTrigger>
              <TabsTrigger value="recent">Recently Used</TabsTrigger>
              <TabsTrigger value="custom">Custom Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-[350px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search templates..." className="pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Template type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="care-plan">Care Plan</SelectItem>
                      <SelectItem value="visit-note">Visit Note</SelectItem>
                      <SelectItem value="discharge">Discharge</SelectItem>
                      <SelectItem value="authorization">Authorization</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {documentTemplates.map((template, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{template.name}</CardTitle>
                        <Badge variant="outline">{template.type}</Badge>
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
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Globe className="mr-1 h-4 w-4" />
                        <span>Compliant with: {template.compliantWith}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="flex-1"> /> Preview</Button>
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
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
                <CardTitle>State Documentation Requirements</CardTitle>
                <CardDescription>Documentation requirements by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateDocumentationRequirements.map((state, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          {state.name} ({state.code})
                        </h3>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{state.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {state.requiredDocuments.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
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
                <CardTitle>Recently Used Templates</CardTitle>
                <CardDescription>Templates you've used in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyUsedTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {template.state}
                            </Badge>
                            <p className="text-xs text-muted-foreground">Used: {template.lastUsed}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Again
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

const documentTemplates = [
  {
    name: "Initial Assessment",
    type: "Assessment",
    states: ["CA", "FL", "TX"],
    description: "Comprehensive initial assessment form with state-specific requirements",
    compliantWith: "Medicare, Medicaid, OASIS-E",
  },
  {
    name: "Plan of Care",
    type: "Care Plan",
    states: ["All States"],
    description: "Standardized plan of care with customizable state-specific sections",
    compliantWith: "Medicare CoPs, State Requirements",
  },
  {
    name: "Skilled Nursing Visit Note",
    type: "Visit Note",
    states: ["CA", "FL", "GA", "TX"],
    description: "Documentation for skilled nursing visits with state-specific requirements",
    compliantWith: "Medicare, Medicaid, Third-Party Payers",
  },
  {
    name: "Therapy Evaluation",
    type: "Assessment",
    states: ["All States"],
    description: "Comprehensive therapy evaluation form for PT, OT, and ST",
    compliantWith: "Medicare, Medicaid, Third-Party Payers",
  },
  {
    name: "Discharge Summary",
    type: "Discharge",
    states: ["All States"],
    description: "Standardized discharge summary with state-specific requirements",
    compliantWith: "Medicare CoPs, State Requirements",
  },
  {
    name: "Prior Authorization Request",
    type: "Authorization",
    states: ["CA", "FL", "TX", "OH", "GA"],
    description: "State-specific prior authorization request forms",
    compliantWith: "State Medicaid Programs",
  },
]

const stateDocumentationRequirements = [
  {
    name: "California",
    code: "CA",
    description: "California requires specific documentation elements for Medi-Cal and Medicare services.",
    requiredDocuments: [
      "Initial Assessment",
      "Plan of Care",
      "Visit Notes",
      "Medication Administration Record",
      "Discharge Summary",
    ],
  },
  {
    name: "Florida",
    code: "FL",
    description: "Florida has specific documentation requirements for Medicaid and Medicare services.",
    requiredDocuments: [
      "Initial Assessment",
      "Plan of Care",
      "Visit Notes",
      "Medication Administration Record",
      "Discharge Summary",
    ],
  },
  {
    name: "Texas",
    code: "TX",
    description: "Texas requires specific documentation for Medicaid, Medicare, and EVV compliance.",
    requiredDocuments: [
      "Initial Assessment",
      "Plan of Care",
      "Visit Notes",
      "EVV Documentation",
      "Medication Administration Record",
      "Discharge Summary",
    ],
  },
  {
    name: "Ohio",
    code: "OH",
    description: "Ohio has specific documentation requirements for Medicaid and Medicare services.",
    requiredDocuments: [
      "Initial Assessment",
      "Plan of Care",
      "Visit Notes",
      "Medication Administration Record",
      "Discharge Summary",
    ],
  },
]

const recentlyUsedTemplates = [
  {
    name: "Skilled Nursing Visit Note",
    state: "CA",
    lastUsed: "Today",
  },
  {
    name: "Plan of Care",
    state: "FL",
    lastUsed: "Yesterday",
  },
  {
    name: "Initial Assessment",
    state: "TX",
    lastUsed: "3 days ago",
  },
  {
    name: "Prior Authorization Request",
    state: "OH",
    lastUsed: "1 week ago",
  },
  {
    name: "Discharge Summary",
    state: "GA",
    lastUsed: "2 weeks ago",
  },
]
