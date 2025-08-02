import { neon } from "@neondatabase/serverless"

// Check for database URL from multiple possible environment variables
const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.NEON_DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING

// Log available environment variables for debugging
if (!DATABASE_URL) {
  console.error("❌ No database URL found in environment variables")
  console.log("Available environment variables:", {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
  })
  console.log("Please add Neon integration or set up database environment variables")
}

export const sql = DATABASE_URL ? neon(DATABASE_URL) : null

export interface User {
  id: number
  name: string
  email: string
  bio?: string
  created_at: string
}

export interface Post {
  id: number
  user_id: number
  content: string
  created_at: string
  author_name: string
  like_count: number
  comment_count: number
  share_count: number
  user_liked: boolean
  user_shared: boolean
}

export interface Comment {
  id: number
  user_id: number
  post_id: number
  content: string
  created_at: string
  author_name: string
}

export interface Like {
  id: number
  user_id: number
  post_id: number
  created_at: string
}

export interface Share {
  id: number
  user_id: number
  post_id: number
  created_at: string
}

// Helper function to check if database is available
export function isDatabaseConnected(): boolean {
  return sql !== null && DATABASE_URL !== undefined
}

// Helper function to get database status
export function getDatabaseStatus() {
  return {
    connected: isDatabaseConnected(),
    url: DATABASE_URL ? "✅ Found" : "❌ Missing",
    availableVars: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
      POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
    },
  }
}
