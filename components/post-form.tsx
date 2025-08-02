"use client"

import type React from "react"

import { useState } from "react"
import { createPost } from "@/actions/posts"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, PenTool } from "lucide-react"
import type { User, Post } from "@/lib/db"

interface PostFormProps {
  user: User
  onPostCreated?: (post: Post) => void
}

export function PostForm({ user, onPostCreated }: PostFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting || !content.trim()) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("content", content.trim())

      const result = await createPost(formData)

      if (result.success && result.post) {
        setContent("")
        // Immediately add the new post to the feed
        if (onPostCreated) {
          onPostCreated(result.post)
        }
      }
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-white to-blue-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <PenTool className="h-5 w-5 text-blue-600" />
          Share Your Professional Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, insights, or updates with the CIAAN Cyber Tech community..."
                className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 resize-none"
                required
                disabled={isSubmitting}
                maxLength={1000}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    handleSubmit(e)
                  }
                }}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">{content.length}/1000 characters • Press Ctrl+Enter to post</div>
                <Button
                  type="submit"
                  disabled={isSubmitting || content.trim().length === 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Share with Community
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
