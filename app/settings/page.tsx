import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { SettingsForm } from "@/components/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, User, Shield, Bell, Palette, Database } from "lucide-react"

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-blue-100">Manage your CIAAN Cyber Tech profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Profile</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Privacy</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Notifications</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Palette className="h-4 w-4" />
                  <span className="text-sm">Appearance</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Database className="h-4 w-4" />
                  <span className="text-sm">Data & Privacy</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <SettingsForm user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
