"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DeletePostDialog } from "@/components/delete-post-dialog"
import { Clock, User, Heart, MessageCircle, Share2, Send, MoreHorizontal } from "lucide-react"
import { toggleLike, addComment, toggleShare, getComments } from "@/actions/interactions"
import type { Post, Comment } from "@/lib/db"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostCardProps {
  post: Post
  currentUserId?: number
  onPostDeleted?: () => void
}

export function PostCard({ post: initialPost, currentUserId, onPostDeleted }: PostCardProps) {
  // Local state for the post to handle real-time updates
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 168) {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
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

  const handleLike = async () => {
    if (isLiking) return

    setIsLiking(true)

    // Optimistically update the UI immediately
    const wasLiked = post.user_liked
    const newLikeCount = wasLiked ? post.like_count - 1 : post.like_count + 1

    setPost((prev) => ({
      ...prev,
      user_liked: !wasLiked,
      like_count: newLikeCount,
    }))

    try {
      const result = await toggleLike(post.id)

      // Update with server response to ensure consistency
      if (result.success) {
        setPost((prev) => ({
          ...prev,
          user_liked: result.liked,
          like_count: result.likeCount,
        }))
      }
    } catch (error) {
      console.error("Error toggling like:", error)
      // Revert the optimistic update on error
      setPost((prev) => ({
        ...prev,
        user_liked: wasLiked,
        like_count: post.like_count,
      }))
    } finally {
      setIsLiking(false)
    }
  }

  const handleShare = async () => {
    if (isSharing) return

    setIsSharing(true)

    // Optimistically update the UI immediately
    const wasShared = post.user_shared
    const newShareCount = wasShared ? post.share_count - 1 : post.share_count + 1

    setPost((prev) => ({
      ...prev,
      user_shared: !wasShared,
      share_count: newShareCount,
    }))

    try {
      const result = await toggleShare(post.id)

      // Update with server response to ensure consistency
      if (result.success) {
        setPost((prev) => ({
          ...prev,
          user_shared: result.shared,
          share_count: result.shareCount,
        }))
      }
    } catch (error) {
      console.error("Error toggling share:", error)
      // Revert the optimistic update on error
      setPost((prev) => ({
        ...prev,
        user_shared: wasShared,
        share_count: post.share_count,
      }))
    } finally {
      setIsSharing(false)
    }
  }

  const handleShowComments = async () => {
    if (!showComments) {
      try {
        const fetchedComments = await getComments(post.id)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    setShowComments(!showComments)
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmittingComment) return

    setIsSubmittingComment(true)
    try {
      const result = await addComment(post.id, newComment)
      if (result.success && result.comment) {
        // Add the new comment to the list
        setComments((prev) => [...prev, result.comment])
        setNewComment("")
        // Update comment count
        setPost((prev) => ({
          ...prev,
          comment_count: prev.comment_count + 1,
        }))
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handlePostDeleted = () => {
    console.log("Post deleted, refreshing...")
    // Force a page refresh to update the feed
    window.location.reload()
  }

  // Check if current user owns this post
  const isOwnPost = currentUserId === post.user_id

  return (
    <Card className="mb-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar className="h-12 w-12 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getInitials(post.author_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Link
                href={`/profile/${post.user_id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 truncate"
              >
                <span className="truncate">{post.author_name}</span>
                <User className="h-3 w-3 text-gray-400 flex-shrink-0" />
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(post.created_at)}
                </Badge>
                <span className="text-xs text-gray-500 hidden sm:inline">CIAAN Cyber Tech</span>
              </div>
            </div>
          </div>

          {/* Post Options Menu - Only show for own posts */}
          {isOwnPost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0 flex-shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DeletePostDialog postId={post.id} onPostDeleted={handlePostDeleted} />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base break-words">
            {post.content}
          </p>
        </div>

        {/* Engagement Stats */}
        {(post.like_count > 0 || post.comment_count > 0 || post.share_count > 0) && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
            <div className="flex items-center space-x-4 flex-wrap">
              {post.like_count > 0 && (
                <span className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                  <span>
                    {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                  </span>
                </span>
              )}
              {post.comment_count > 0 && (
                <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={handleShowComments}>
                  {post.comment_count} {post.comment_count === 1 ? "comment" : "comments"}
                </span>
              )}
              {post.share_count > 0 && (
                <span className="hover:text-green-600 cursor-pointer transition-colors">
                  {post.share_count} {post.share_count === 1 ? "share" : "shares"}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                post.user_liked
                  ? "text-red-600 bg-red-50 hover:bg-red-100"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-600"
              } ${isLiking ? "opacity-70" : ""}`}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${
                  post.user_liked ? "fill-current scale-110 text-red-600" : ""
                } ${isLiking ? "animate-pulse" : ""}`}
              />
              <span className="text-sm font-medium hidden sm:inline">
                {isLiking ? "..." : post.user_liked ? "Unlike" : "Like"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShowComments}
              className="flex items-center space-x-2 hover:bg-blue-50 text-gray-600 transition-colors hover:text-blue-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Comment</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              disabled={isSharing}
              className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                post.user_shared
                  ? "text-green-600 bg-green-50 hover:bg-green-100"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-600"
              } ${isSharing ? "opacity-70" : ""}`}
            >
              <Share2
                className={`h-4 w-4 transition-all duration-200 ${
                  isSharing ? "animate-pulse" : ""
                } ${post.user_shared ? "scale-110 text-green-600" : ""}`}
              />
              <span className="text-sm font-medium hidden sm:inline">
                {isSharing ? "..." : post.user_shared ? "Unshare" : "Share"}
              </span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            {/* Add Comment */}
            <div className="flex items-start space-x-3 mb-4">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a thoughtful comment..."
                  className="min-h-[60px] text-sm resize-none border-2 focus:border-blue-500 transition-colors"
                  maxLength={500}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      handleAddComment()
                    }
                  }}
                />
                <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                  <span className={`text-xs ${newComment.length > 450 ? "text-red-500" : "text-gray-500"}`}>
                    {newComment.length}/500 • Press Ctrl+Enter to post
                  </span>
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmittingComment ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    ) : (
                      <Send className="h-3 w-3 mr-1" />
                    )}
                    {isSubmittingComment ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 animate-in fade-in duration-300">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white text-sm">
                      {getInitials(comment.author_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors min-w-0">
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                      <Link
                        href={`/profile/${comment.user_id}`}
                        className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors truncate"
                      >
                        {comment.author_name}
                      </Link>
                      <span className="text-xs text-gray-500 flex-shrink-0">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed break-words">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 italic">No comments yet. Start the conversation! 💬</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
