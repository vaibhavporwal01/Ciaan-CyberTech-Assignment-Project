"use server"

import { sql, isDatabaseConnected } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function createPost(formData: FormData) {
  try {
    if (!isDatabaseConnected()) {
      throw new Error("Database not connected. Please add Neon integration first.")
    }

    const content = formData.get("content") as string

    if (!content || content.trim().length === 0) {
      throw new Error("Post content is required")
    }

    const user = await getCurrentUser()
    if (!user) {
      throw new Error("You must be logged in to create a post")
    }

    const result = await sql!`
      INSERT INTO posts (user_id, content)
      VALUES (${user.id}, ${content.trim()})
      RETURNING id, created_at
    `

    return {
      success: true,
      post: {
        id: result[0].id,
        user_id: user.id,
        content: content.trim(),
        created_at: result[0].created_at,
        author_name: user.name,
        like_count: 0,
        comment_count: 0,
        share_count: 0,
        user_liked: false,
        user_shared: false,
      },
    }
  } catch (error) {
    console.error("Create post error:", error)

    // Return a more user-friendly error
    if (error instanceof Error && error.message.includes("Database not connected")) {
      throw new Error("Database connection failed. Please check your setup.")
    }

    throw error
  }
}

export async function deletePost(postId: number) {
  try {
    console.log("deletePost called with postId:", postId)

    if (!isDatabaseConnected()) {
      throw new Error("Database not connected")
    }

    const user = await getCurrentUser()
    console.log("Current user:", user?.id)

    if (!user) {
      throw new Error("You must be logged in to delete posts")
    }

    // Check if the post belongs to the current user
    const posts = await sql!`
      SELECT user_id FROM posts WHERE id = ${postId}
    `

    console.log("Post query result:", posts)

    if (posts.length === 0) {
      throw new Error("Post not found")
    }

    if (posts[0].user_id !== user.id) {
      throw new Error("You can only delete your own posts")
    }

    // Delete the post (cascading deletes will handle likes, comments, shares)
    const deleteResult = await sql!`
      DELETE FROM posts WHERE id = ${postId} AND user_id = ${user.id}
    `

    console.log("Delete query result:", deleteResult)

    return {
      success: true,
      message: "Post deleted successfully",
    }
  } catch (error) {
    console.error("Delete post error:", error)
    throw error
  }
}

export async function getPosts() {
  try {
    if (!isDatabaseConnected()) {
      console.warn("Database not connected, returning empty posts array")
      return []
    }

    const currentUser = await getCurrentUser()
    const userId = currentUser?.id || 0

    const posts = await sql!`
      SELECT 
        p.id,
        p.content,
        p.created_at,
        p.user_id,
        u.name as author_name,
        COALESCE(like_counts.count, 0) as like_count,
        COALESCE(comment_counts.count, 0) as comment_count,
        COALESCE(share_counts.count, 0) as share_count,
        CASE WHEN user_likes.user_id IS NOT NULL THEN true ELSE false END as user_liked,
        CASE WHEN user_shares.user_id IS NOT NULL THEN true ELSE false END as user_shared
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM likes
        GROUP BY post_id
      ) like_counts ON p.id = like_counts.post_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM comments
        GROUP BY post_id
      ) comment_counts ON p.id = comment_counts.post_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM shares
        GROUP BY post_id
      ) share_counts ON p.id = share_counts.post_id
      LEFT JOIN likes user_likes ON p.id = user_likes.post_id AND user_likes.user_id = ${userId}
      LEFT JOIN shares user_shares ON p.id = user_shares.post_id AND user_shares.user_id = ${userId}
      ORDER BY p.created_at DESC
    `

    return posts
  } catch (error) {
    console.error("Get posts error:", error)
    return []
  }
}

export async function getUserPosts(userId: number) {
  try {
    if (!isDatabaseConnected()) {
      return []
    }

    const currentUser = await getCurrentUser()
    const currentUserId = currentUser?.id || 0

    const posts = await sql!`
      SELECT 
        p.id,
        p.content,
        p.created_at,
        p.user_id,
        u.name as author_name,
        COALESCE(like_counts.count, 0) as like_count,
        COALESCE(comment_counts.count, 0) as comment_count,
        COALESCE(share_counts.count, 0) as share_count,
        CASE WHEN user_likes.user_id IS NOT NULL THEN true ELSE false END as user_liked,
        CASE WHEN user_shares.user_id IS NOT NULL THEN true ELSE false END as user_shared
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM likes
        GROUP BY post_id
      ) like_counts ON p.id = like_counts.post_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM comments
        GROUP BY post_id
      ) comment_counts ON p.id = comment_counts.post_id
      LEFT JOIN (
        SELECT post_id, COUNT(*) as count
        FROM shares
        GROUP BY post_id
      ) share_counts ON p.id = share_counts.post_id
      LEFT JOIN likes user_likes ON p.id = user_likes.post_id AND user_likes.user_id = ${currentUserId}
      LEFT JOIN shares user_shares ON p.id = user_shares.post_id AND user_shares.user_id = ${currentUserId}
      WHERE p.user_id = ${userId}
      ORDER BY p.created_at DESC
    `

    return posts
  } catch (error) {
    console.error("Get user posts error:", error)
    return []
  }
}
