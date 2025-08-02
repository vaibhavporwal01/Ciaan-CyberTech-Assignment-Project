"use client"

import type React from "react"

import { useState } from "react"
import { deleteUserAccount } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Trash2, AlertTriangle, Lock, CheckCircle } from "lucide-react"

export function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleDelete = async () => {
    if (!password.trim()) {
      setError("Please enter your password to confirm")
      return
    }

    setIsDeleting(true)
    setError("")

    try {
      console.log("Calling deleteUserAccount...")
      const result = await deleteUserAccount(password)
      console.log("Delete result:", result)

      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        setSuccess(true)
        // Redirect after a short delay to show success message
        setTimeout(() => {
          window.location.href = "/login"
        }, 2000)
      }
    } catch (error) {
      console.error("Delete account error:", error)
      setError("Failed to delete account. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClose = () => {
    if (!isDeleting && !success) {
      setIsOpen(false)
      setPassword("")
      setError("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isDeleting && password.trim()) {
      handleDelete()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="flex items-center gap-2 w-full justify-start">
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete your account and remove all your data from our
            servers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Warning:</strong> All your posts, comments, likes, and profile information will be permanently
              deleted.
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
              <AlertDescription className="text-green-800">
                Account deleted successfully! Redirecting to login page...
              </AlertDescription>
            </Alert>
          )}

          {!success && (
            <div className="space-y-2">
              <Label htmlFor="delete-password" className="text-sm font-medium">
                Enter your password to confirm
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="delete-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your current password"
                  className="pl-10"
                  disabled={isDeleting}
                />
              </div>
            </div>
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
              disabled={isDeleting || !password.trim()}
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
                  Delete Account
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
