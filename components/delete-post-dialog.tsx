"use client"

import { useState } from "react"
import { deletePost } from "@/actions/posts"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react"

interface DeletePostDialogProps {
  postId: number
  onPostDeleted?: () => void
}

export function DeletePostDialog({ postId, onPostDeleted }: DeletePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      console.log("Deleting post:", postId)
      const result = await deletePost(postId)
      console.log("Delete result:", result)

      if (result.success) {
        setSuccess(true)
        // Close dialog and notify parent after a short delay
        setTimeout(() => {
          setIsOpen(false)
          setSuccess(false)
          if (onPostDeleted) {
            onPostDeleted()
          }
          // No need to force page refresh anymore - parent handles state update
        }, 1000)
      }
    } catch (error) {
      console.error("Delete post error:", error)
      setError(error instanceof Error ? error.message : "Failed to delete post. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting && !success) {
      setIsOpen(false)
      setError("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer transition-colors">
          <Trash2 className="h-4 w-4" />
          <span>Delete Post</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Post
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Warning:</strong> This will permanently delete the post and all its likes, comments, and shares.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Post deleted successfully!</AlertDescription>
            </Alert>
          )}
        </div>

        {!success && (
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Post
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
