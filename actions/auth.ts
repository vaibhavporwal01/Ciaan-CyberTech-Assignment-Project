"use server"

import { redirect } from "next/navigation"
import { sql } from "@/lib/db"
import { hashPassword, verifyPassword, createSession, destroySession, getCurrentUser } from "@/lib/auth"

interface AuthState {
  error?: string
  success?: boolean
}

export async function register(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const bio = formData.get("bio") as string

    if (!name || !email || !password) {
      return { error: "Missing required fields" }
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long" }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" }
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return { error: "User already exists with this email" }
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)

    const newUsers = await sql`
      INSERT INTO users (name, email, password_hash, bio)
      VALUES (${name}, ${email}, ${passwordHash}, ${bio || null})
      RETURNING id
    `

    const userId = newUsers[0].id
    await createSession(userId)
  } catch (error) {
    console.error("Registration error:", error)

    // Check if it's a database connection issue
    if (error instanceof Error && error.message.includes('relation "users" does not exist')) {
      return { error: "Database not set up. Please run the setup script first." }
    }

    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return { error: "Database not connected. Please add Neon integration first." }
    }

    return { error: "Registration failed. Please try again." }
  }

  redirect("/")
}

export async function login(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Find user
    const users = await sql`
      SELECT id, password_hash FROM users WHERE email = ${email}
    `

    if (users.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = users[0]
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    await createSession(user.id)
  } catch (error) {
    console.error("Login error:", error)

    // Check if it's a database connection issue
    if (error instanceof Error && error.message.includes('relation "users" does not exist')) {
      return { error: "Database not set up. Please run the setup script first." }
    }

    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return { error: "Database not connected. Please add Neon integration first." }
    }

    return { error: "Login failed. Please try again." }
  }

  redirect("/")
}

export async function logout() {
  await destroySession()
  redirect("/login")
}

// Separate delete account action
export async function deleteUserAccount(password: string) {
  try {
    console.log("Delete account called with password:", password ? "provided" : "missing")

    if (!password || password.trim() === "") {
      return { error: "Password is required to delete your account", success: false }
    }

    const user = await getCurrentUser()
    console.log("Current user:", user ? user.id : "not found")

    if (!user) {
      return { error: "You must be logged in to delete your account", success: false }
    }

    // Verify password before deletion
    const users = await sql`
      SELECT password_hash FROM users WHERE id = ${user.id}
    `

    if (users.length === 0) {
      return { error: "User not found", success: false }
    }

    const isValidPassword = await verifyPassword(password, users[0].password_hash)
    console.log("Password valid:", isValidPassword)

    if (!isValidPassword) {
      return {
        error: "Invalid password. Please enter your current password to confirm account deletion.",
        success: false,
      }
    }

    console.log("Starting account deletion for user:", user.id)

    // Delete all user data (cascading deletes will handle related data)
    const deleteResult = await sql`
      DELETE FROM users WHERE id = ${user.id}
    `

    console.log("Delete result:", deleteResult)

    // Destroy session
    await destroySession()

    console.log("Account deletion completed successfully")

    return { success: true, message: "Account deleted successfully" }
  } catch (error) {
    console.error("Delete account error:", error)
    return { error: "Failed to delete account. Please try again.", success: false }
  }
}
