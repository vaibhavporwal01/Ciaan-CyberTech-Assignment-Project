import { getCurrentUser } from "@/lib/auth"
import { getPosts } from "@/actions/posts"
import { Navbar } from "@/components/navbar"
import { WelcomeBanner } from "@/components/welcome-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, MessageSquare, Database, AlertTriangle, LogIn } from "lucide-react"
import { isDatabaseConnected, getDatabaseStatus } from "@/lib/db"
import Link from "next/link"

// Client component for real-time post management
import { PostsManager } from "@/components/posts-manager"

export default async function HomePage() {
  // Check database connection first
  if (!isDatabaseConnected()) {
    const dbStatus = getDatabaseStatus()

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Database Connection Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <Database className="h-4 w-4" />
                <AlertDescription>
                  <strong>Database not connected:</strong> No database URL found in environment variables.
                </AlertDescription>
              </Alert>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Environment Variables Status:</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(dbStatus.availableVars).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-mono">{key}:</span>
                      <span className={value ? "text-green-600" : "text-red-600"}>
                        {value ? "✅ Set" : "❌ Not set"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Quick Setup:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                  <li>Click "Add Integration" button in v0</li>
                  <li>Select "Neon" from the integrations list</li>
                  <li>Follow the setup instructions</li>
                  <li>Refresh this page once connected</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/setup">
                    <Database className="h-4 w-4 mr-2" />
                    Setup Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/test-db">Test Connection</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get current user - handle authentication properly
  let user
  try {
    user = await getCurrentUser()
  } catch (error) {
    console.error("Error getting current user:", error)
    user = null
  }

  // If no user, show login prompt instead of redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">CIAAN CYBER TECH PRIVATE LIMITED</h1>
              <p className="text-blue-100 text-lg mb-4">Professional Network & Knowledge Sharing Platform</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Professional Community</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Knowledge Sharing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Career Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center py-12 bg-white shadow-lg">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
                  <LogIn className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CIAAN Cyber Tech</h2>
                <p className="text-gray-600 mb-6">
                  Join our professional community to connect, share insights, and grow your career in technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-semibold text-sm">Professional Network</h3>
                  <p className="text-xs text-gray-600 mt-1">Connect with colleagues</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <MessageSquare className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                  <h3 className="font-semibold text-sm">Share Knowledge</h3>
                  <p className="text-xs text-gray-600 mt-1">Post insights and ideas</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <h3 className="font-semibold text-sm">Career Growth</h3>
                  <p className="text-xs text-gray-600 mt-1">Advance professionally</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In to Continue
                  </Link>
                </Button>
                <p className="text-sm text-gray-600">
                  {"Don't have an account? "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get posts - handle errors gracefully
  let posts
  try {
    posts = await getPosts()
  } catch (error) {
    console.error("Error getting posts:", error)
    posts = []
  }

  // Main authenticated homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">CIAAN CYBER TECH PRIVATE LIMITED</h1>
            <p className="text-blue-100 text-lg mb-4">Professional Network & Knowledge Sharing Platform</p>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Professional Community</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>Knowledge Sharing</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <WelcomeBanner user={user} />

              {/* Posts Manager - handles real-time updates */}
              <PostsManager user={user} initialPosts={posts} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* User Info Card */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{user.bio || "CIAAN Employee"}</p>
                      <Badge variant="outline" className="text-xs">
                        Professional Member
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Posts</span>
                      <Badge variant="secondary">{posts.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Your Posts</span>
                      <Badge variant="secondary">{posts.filter((p) => p.user_id === user.id).length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Today</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Online
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
