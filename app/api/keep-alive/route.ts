import { NextResponse } from "next/server"
import { keepDatabaseWarm } from "@/lib/db-health"

export async function GET() {
  try {
    await keepDatabaseWarm()

    return NextResponse.json({
      status: "success",
      message: "Database keep-alive ping sent",
      timestamp: new Date().toISOString(),
    })
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
