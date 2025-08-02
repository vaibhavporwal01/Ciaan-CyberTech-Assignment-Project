"use server"

import { sql, isDatabaseConnected } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function toggleLike(postId: number) {
  try {
    if (!isDatabaseConnected()) {
      throw new Error("Database not connected")
    }

    const user = await getCurrentUser()
    if (!user) {
      throw new Error("You must be logged in to like posts")
    }

    // Check if user already liked this post
    const existingLike = await sql!`
      SELECT id FROM likes WHERE user_id = ${user.id} AND post_id = ${postId}
    `

    let action: string
    let newLikeStatus: boolean

    if (existingLike.length > 0) {
      // Unlike the post
      await sql!`
        DELETE FROM likes WHERE user_id = ${user.id} AND post_id = ${postId}
      `
      action = "unliked"
      newLikeStatus = false
    } else {
      // Like the post
      await sql!`
        INSERT INTO likes (user_id, post_id) VALUES (${user.id}, ${postId})
      `
      action = "liked"
      newLikeStatus = true
    }

    // Get updated like count
    const likeCountResult = await sql!`
      SELECT COUNT(*) as count FROM likes WHERE post_id = ${postId}
    `
    const likeCount = Number.parseInt(likeCountResult[0].count)

    // NO revalidatePath - this was causing the reload!

    return {
      success: true,
      action,
      liked: newLikeStatus,
      likeCount,
    }
  } catch (error) {
    console.error("Toggle like error:", error)
    throw error
  }
}

export async function toggleShare(postId: number) {
  try {
    if (!isDatabaseConnected()) {
      throw new Error("Database not connected")
    }

    const user = await getCurrentUser()
    if (!user) {
      throw new Error("You must be logged in to share posts")
    }

    // Check if user already shared this post
    const existingShare = await sql!`
      SELECT id FROM shares WHERE user_id = ${user.id} AND post_id = ${postId}
    `

    let action: string
    let newShareStatus: boolean

    if (existingShare.length > 0) {
      // Unshare the post
      await sql!`
        DELETE FROM shares WHERE user_id = ${user.id} AND post_id = ${postId}
      `
      action = "unshared"
      newShareStatus = false
    } else {
      // Share the post
      await sql!`
        INSERT INTO shares (user_id, post_id) VALUES (${user.id}, ${postId})
      `
      action = "shared"
      newShareStatus = true
    }

    // Get updated share count
    const shareCountResult = await sql!`
      SELECT COUNT(*) as count FROM shares WHERE post_id = ${postId}
    `
    const shareCount = Number.parseInt(shareCountResult[0].count)

    // NO revalidatePath - this was causing the reload!

    return {
      success: true,
      action,
      shared: newShareStatus,
      shareCount,
    }
  } catch (error) {
    console.error("Toggle share error:", error)
    throw error
  }
}

export async function addComment(postId: number, content: string) {
  try {
    if (!isDatabaseConnected()) {
      throw new Error("Database not connected")
    }

    const user = await getCurrentUser()
    if (!user) {
      throw new Error("You must be logged in to comment")
    }

    if (!content || content.trim().length === 0) {
      throw new Error("Comment content is required")
    }

    if (content.length > 500) {
      throw new Error("Comment is too long (max 500 characters)")
    }

    const result = await sql!`
      INSERT INTO comments (user_id, post_id, content)
      VALUES (${user.id}, ${postId}, ${content.trim()})
      RETURNING id, created_at
    `

    // NO revalidatePath - this was causing the reload!

    return {
      success: true,
      comment: {
        id: result[0].id,
        user_id: user.id,
        post_id: postId,
        content: content.trim(),
        created_at: result[0].created_at,
        author_name: user.name,
      },
    }
  } catch (error) {
    console.error("Add comment error:", error)
    throw error
  }
}

export async function getComments(postId: number) {
  try {
    if (!isDatabaseConnected()) {
      return []
    }

    const comments = await sql!`
      SELECT 
        c.id,
        c.user_id,
        c.post_id,
        c.content,
        c.created_at,
        u.name as author_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ${postId}
      ORDER BY c.created_at ASC
    `

    return comments
  } catch (error) {
    console.error("Get comments error:", error)
    return []
  }
}
