import { sql, isDatabaseConnected } from "./db"

export async function checkDatabaseHealth() {
  try {
    if (!isDatabaseConnected()) {
      return { healthy: false, error: "Database not connected" }
    }

    // Simple health check query
    const result = await sql!`SELECT 1 as health_check`

    return {
      healthy: true,
      timestamp: new Date().toISOString(),
      status: "Database is healthy",
    }
  } catch (error) {
    console.error("Database health check failed:", error)
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function keepDatabaseWarm() {
  try {
    // Ping database every 4 minutes to prevent sleep (for free tier)
    await checkDatabaseHealth()
    console.log("Database keep-alive ping successful")
  } catch (error) {
    console.error("Database keep-alive failed:", error)
  }
}
