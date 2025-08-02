import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Building2 } from "lucide-react"

export default function AccountDeletedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Account Deleted
          </h1>
          <p className="text-gray-600">Your account has been successfully deleted</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl text-green-600">
              <CheckCircle className="h-5 w-5" />
              Deletion Complete
            </CardTitle>
            <CardDescription>
              Your CIAAN Cyber Tech account and all associated data have been permanently removed from our servers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">What was deleted:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Your user profile and account information</li>
                <li>• All posts you created</li>
                <li>• All comments you made</li>
                <li>• All likes and shares you gave</li>
                <li>• Your login credentials</li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Thank you for being part of the CIAAN Cyber Tech community. We're sorry to see you go!
              </p>

              <div className="space-y-2">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link href="/register">
                    <Building2 className="h-4 w-4 mr-2" />
                    Create New Account
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/login">Back to Login</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
