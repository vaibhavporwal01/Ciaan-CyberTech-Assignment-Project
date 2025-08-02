"use client"

import { sql, isDatabaseConnected } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function testDatabaseConnection() {
  try {
    // Check if database connection is available
    if (!isDatabaseConnected() || !sql) {
      return {
        connected: false,
        tables: [],
        error: "No database connection available. Please add Neon integration.",
        envVars: {
          DATABASE_URL: !!process.env.DATABASE_URL,
          NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
          POSTGRES_URL: !!process.env.POSTGRES_URL,
        },
      }
    }

    // Test basic connection
    const result = await sql`SELECT 1 as test`

    // Check if tables exist
    const tablesCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'posts')
    `

    // Get table counts if they exist
    let userCount = 0
    let postCount = 0

    if (tablesCheck.some((t) => t.table_name === "users")) {
      const userCountResult = await sql`SELECT COUNT(*) as count FROM users`
      userCount = Number.parseInt(userCountResult[0].count)
    }

    if (tablesCheck.some((t) => t.table_name === "posts")) {
      const postCountResult = await sql`SELECT COUNT(*) as count FROM posts`
      postCount = Number.parseInt(postCountResult[0].count)
    }

    return {
      connected: true,
      tables: tablesCheck.map((row) => row.table_name),
      error: null,
      userCount,
      postCount,
      envVars: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
        POSTGRES_URL: !!process.env.POSTGRES_URL,
      },
    }
  } catch (error) {
    return {
      connected: false,
      tables: [],
      error: error instanceof Error ? error.message : "Unknown error",
      envVars: {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
        POSTGRES_URL: !!process.env.POSTGRES_URL,
      },
    }
  }
}

export default async function TestDatabasePage() {
  const dbStatus = await testDatabaseConnection()

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Database Connection Test</h1>
          <p className="text-muted-foreground">CIAAN Cyber Tech Platform</p>
          <div className="mt-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Status
            </CardTitle>
            <CardDescription>Testing connection to your Neon database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <Alert variant={dbStatus.connected ? "default" : "destructive"}>
              {dbStatus.connected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertDescription>
                <strong>Connection:</strong> {dbStatus.connected ? "✅ Connected" : "❌ Failed"}
                {dbStatus.error && (
                  <div className="mt-2 text-sm">
                    <strong>Error:</strong> {dbStatus.error}
                  </div>
                )}
              </AlertDescription>
            </Alert>

            {/* Environment Variables */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Environment Variables</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>DATABASE_URL:</span>
                  <span className={`font-mono ${dbStatus.envVars.DATABASE_URL ? "text-green-600" : "text-red-600"}`}>
                    {dbStatus.envVars.DATABASE_URL ? "✅ Set" : "❌ Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>NEON_DATABASE_URL:</span>
                  <span
                    className={`font-mono ${dbStatus.envVars.NEON_DATABASE_URL ? "text-green-600" : "text-red-600"}`}
                  >
                    {dbStatus.envVars.NEON_DATABASE_URL ? "✅ Set" : "❌ Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>POSTGRES_URL:</span>
                  <span className={`font-mono ${dbStatus.envVars.POSTGRES_URL ? "text-green-600" : "text-red-600"}`}>
                    {dbStatus.envVars.POSTGRES_URL ? "✅ Set" : "❌ Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tables Status */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Required Tables</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>users table</span>
                  {dbStatus.tables.includes("users") ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Exists ({dbStatus.userCount || 0} users)
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> Missing
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>posts table</span>
                  {dbStatus.tables.includes("posts") ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Exists ({dbStatus.postCount || 0} posts)
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> Missing
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Next Steps:</h3>
              {!dbStatus.connected ? (
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Add Neon integration using the "Add Integration" button in v0</li>
                  <li>Look for environment variables to be automatically set</li>
                  <li>Refresh this page to test the connection</li>
                </ol>
              ) : dbStatus.tables.length < 2 ? (
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Run the database setup script:{" "}
                    <code className="bg-white px-1 rounded">scripts/setup-database.sql</code>
                  </li>
                  <li>Click the "Run Script" button in v0 interface</li>
                  <li>Refresh this page to verify tables are created</li>
                </ol>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-green-700">✅ Database is ready! You can now use the platform.</p>
                  <div className="flex gap-2">
                    <Button asChild size="sm">
                      <Link href="/register">Register New User</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <Button onClick={() => window.location.reload()} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                <Link href="/setup" className="flex flex-col items-center gap-2">
                  <Database className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">Setup Guide</div>
                    <div className="text-sm text-muted-foreground">Step-by-step instructions</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                <Link href="/register" className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">Test Registration</div>
                    <div className="text-sm text-muted-foreground">Try creating an account</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
