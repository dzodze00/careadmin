"use client"

import { useState } from "react"
import { Download, Info, RefreshCw, Save } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BackupPage() {
  const [formData, setFormData] = useState({
    frequency: "daily",
    time: "midnight",
    retention: "90",
    maxBackups: "10",
    backupType: "full",
    storageType: "cloud",
    encryption: "aes256",
    cloudPath: "s3://your-bucket/backups/",
    emailSuccess: false,
    emailFailure: true,
    notificationEmail: "admin@example.com",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Backup settings:", formData)
    alert("Backup settings saved successfully!")
  }

  const handleRunBackup = () => {
    alert("Backup process started. You will receive a notification when complete.")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Download className="h-6 w-6" />
            <h1 className="text-xl font-bold">Backup & Recovery</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleRunBackup}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Backup Now
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Data Protection</AlertTitle>
            <AlertDescription>
              Regular backups are essential for HIPAA compliance and business continuity. Configure your backup settings
              below.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="settings" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="settings">Backup Settings</TabsTrigger>
              <TabsTrigger value="history">Backup History</TabsTrigger>
              <TabsTrigger value="restore">Restore Data</TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Configuration</CardTitle>
                  <CardDescription>Configure your automated backup settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Schedule</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Backup Frequency</Label>
                          <Select
                            value={formData.frequency}
                            onValueChange={(value) => handleChange("frequency", value)}
                          >
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time">Backup Time</Label>
                          <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
                            <SelectTrigger id="time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="midnight">12:00 AM (Midnight)</SelectItem>
                              <SelectItem value="3am">3:00 AM</SelectItem>
                              <SelectItem value="6am">6:00 AM</SelectItem>
                              <SelectItem value="noon">12:00 PM (Noon)</SelectItem>
                              <SelectItem value="6pm">6:00 PM</SelectItem>
                              <SelectItem value="9pm">9:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="retention">Retention Period</Label>
                          <Select
                            value={formData.retention}
                            onValueChange={(value) => handleChange("retention", value)}
                          >
                            <SelectTrigger id="retention">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 Days</SelectItem>
                              <SelectItem value="60">60 Days</SelectItem>
                              <SelectItem value="90">90 Days</SelectItem>
                              <SelectItem value="180">180 Days</SelectItem>
                              <SelectItem value="365">365 Days</SelectItem>
                              <SelectItem value="forever">Forever</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="max-backups">Maximum Backups</Label>
                          <Select
                            value={formData.maxBackups}
                            onValueChange={(value) => handleChange("maxBackups", value)}
                          >
                            <SelectTrigger id="max-backups">
                              <SelectValue placeholder="Select maximum" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Backups</SelectItem>
                              <SelectItem value="10">10 Backups</SelectItem>
                              <SelectItem value="20">20 Backups</SelectItem>
                              <SelectItem value="50">50 Backups</SelectItem>
                              <SelectItem value="unlimited">Unlimited</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Type</h3>
                      <RadioGroup
                        value={formData.backupType}
                        onValueChange={(value) => handleChange("backupType", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="full" id="full" className="mt-1" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="full" className="font-medium">
                              Full Backup
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Complete backup of all data, including patient records, billing information, and system
                              settings.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="incremental" id="incremental" className="mt-1" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="incremental" className="font-medium">
                              Incremental Backup
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Only backup data that has changed since the last backup. Requires less storage but more
                              complex to restore.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="differential" id="differential" className="mt-1" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="differential" className="font-medium">
                              Differential Backup
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Backup all data that has changed since the last full backup. Balance between storage and
                              restore complexity.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Location</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="storage-type">Storage Type</Label>
                          <Select
                            value={formData.storageType}
                            onValueChange={(value) => handleChange("storageType", value)}
                          >
                            <SelectTrigger id="storage-type">
                              <SelectValue placeholder="Select storage type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                              <SelectItem value="local">Local Storage</SelectItem>
                              <SelectItem value="both">Both Cloud and Local</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="encryption">Encryption Level</Label>
                          <Select
                            value={formData.encryption}
                            onValueChange={(value) => handleChange("encryption", value)}
                          >
                            <SelectTrigger id="encryption">
                              <SelectValue placeholder="Select encryption" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aes128">AES-128</SelectItem>
                              <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                              <SelectItem value="custom">Custom Encryption</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cloud-path">Cloud Storage Path</Label>
                        <Input
                          id="cloud-path"
                          placeholder="s3://your-bucket/backups/"
                          value={formData.cloudPath}
                          onChange={(e) => handleChange("cloudPath", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          For AWS S3, use s3://bucket-name/path. For Azure, use azure://container/path.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-success">Email on Successful Backup</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive an email notification when backups complete successfully
                            </p>
                          </div>
                          <Switch
                            id="email-success"
                            checked={formData.emailSuccess}
                            onCheckedChange={(checked) => handleChange("emailSuccess", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-failure">Email on Backup Failure</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive an email notification when backups fail
                            </p>
                          </div>
                          <Switch
                            id="email-failure"
                            checked={formData.emailFailure}
                            onCheckedChange={(checked) => handleChange("emailFailure", checked)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notification-email">Notification Email</Label>
                          <Input
                            id="notification-email"
                            placeholder="admin@example.com"
                            value={formData.notificationEmail}
                            onChange={(e) => handleChange("notificationEmail", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => alert("Changes discarded")}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
