import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Database, AlertTriangle } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CIAAN Cyber Tech Platform Setup</h1>
          <p className="text-muted-foreground">Follow these steps to set up your database</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Setup Required
              </CardTitle>
              <CardDescription>You need to set up your database tables before using the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Error:</strong> relation "users" does not exist
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Step 1</span>
                    Add Neon Integration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Click the "Add Integration" button and select Neon to connect your database.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Step 2</span>
                    Run Database Script
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Execute the <code className="bg-gray-100 px-1 rounded">scripts/setup-database.sql</code> file to
                    create the required tables.
                  </p>
                  <div className="bg-gray-50 p-3 rounded text-sm font-mono">scripts/setup-database.sql</div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Step 3</span>
                    Test Registration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Once the database is set up, try registering a new account at{" "}
                    <code className="bg-gray-100 px-1 rounded">/register</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>The following tables will be created:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">👥 users</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• id (Primary Key)</li>
                    <li>• name</li>
                    <li>• email (Unique)</li>
                    <li>• password_hash</li>
                    <li>• bio</li>
                    <li>• created_at, updated_at</li>
                  </ul>
                </div>
                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">📝 posts</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• id (Primary Key)</li>
                    <li>• user_id (Foreign Key)</li>
                    <li>• content</li>
                    <li>• created_at, updated_at</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Next Steps:</strong> After completing the setup, you can access the platform at the home page and
              start creating your professional network!
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
