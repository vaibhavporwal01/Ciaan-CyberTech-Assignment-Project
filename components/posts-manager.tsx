"use client"

import { useState } from "react"
import { PostForm } from "@/components/post-form"
import { PostCard } from "@/components/post-card"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import type { Post, User } from "@/lib/db"

interface PostsManagerProps {
  user: User
  initialPosts: Post[]
}

export function PostsManager({ user, initialPosts }: PostsManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  // Function to add a new post to the top of the feed
  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  // Function to remove a post when deleted
  const handlePostDeleted = (deletedPostId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId))
  }

  return (
    <>
      {/* Post Form */}
      <PostForm user={user} onPostCreated={handlePostCreated} />

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <Card className="text-center py-12 bg-white shadow-sm">
            <CardContent>
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something with the community!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Community Feed</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </Badge>
            </div>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user.id}
                onPostDeleted={() => handlePostDeleted(post.id)}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
