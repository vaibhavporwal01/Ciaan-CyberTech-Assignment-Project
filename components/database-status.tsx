"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

interface DatabaseHealth {
  healthy: boolean
  error?: string
  timestamp: string
  status?: string
}

export function DatabaseStatus() {
  const [health, setHealth] = useState<DatabaseHealth | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkHealth = async () => {
    setIsChecking(true)
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealth(data.database)
    } catch (error) {
      setHealth({
        healthy: false,
        error: "Failed to check database health",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    checkHealth()
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!health) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Checking database...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Database className="h-4 w-4" />
          Database Status
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Health:</span>
            <Badge variant={health.healthy ? "default" : "destructive"} className="flex items-center gap-1">
              {health.healthy ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              {health.healthy ? "Healthy" : "Unhealthy"}
            </Badge>
          </div>

          {health.status && <div className="text-xs text-gray-500">{health.status}</div>}

          {health.error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{health.error}</div>}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Last check: {new Date(health.timestamp).toLocaleTimeString()}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={checkHealth}
              disabled={isChecking}
              className="h-6 px-2 bg-transparent"
            >
              {isChecking ? <RefreshCw className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
