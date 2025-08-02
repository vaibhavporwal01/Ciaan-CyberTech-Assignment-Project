"use server"

import { revalidatePath } from "next/cache"
import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string
  const bio = formData.get("bio") as string

  const user = await getCurrentUser()
  if (!user) {
    throw new Error("You must be logged in to update your profile")
  }

  await sql`
    UPDATE users 
    SET name = ${name}, bio = ${bio}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${user.id}
  `

  revalidatePath("/profile")
}

export async function getUserById(userId: number) {
  const users = await sql`
    SELECT id, name, email, bio, created_at 
    FROM users 
    WHERE id = ${userId}
  `

  return users[0] || null
}
