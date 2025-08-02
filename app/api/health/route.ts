import { NextResponse } from "next/server"
import { checkDatabaseHealth } from "@/lib/db-health"

export async function GET() {
  try {
    const health = await checkDatabaseHealth()

    return NextResponse.json(
      {
        status: health.healthy ? "healthy" : "unhealthy",
        database: health,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      {
        status: health.healthy ? 200 : 503,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
      },
    )
  }
}
