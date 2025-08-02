import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { sql, isDatabaseConnected } from "./db"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set("user_id", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getSession(): Promise<number | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value
    return userId ? Number.parseInt(userId) : null
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function destroySession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("user_id")
  } catch (error) {
    console.error("Error destroying session:", error)
  }
}

export async function getCurrentUser() {
  try {
    if (!isDatabaseConnected()) {
      console.warn("Database not connected, cannot get current user")
      return null
    }

    const userId = await getSession()
    if (!userId) return null

    const users = await sql!`
      SELECT id, name, email, bio, created_at 
      FROM users 
      WHERE id = ${userId}
    `

    return users[0] || null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
