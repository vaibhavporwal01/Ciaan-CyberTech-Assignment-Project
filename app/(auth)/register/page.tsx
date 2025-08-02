"use client"

import Link from "next/link"
import { useState } from "react"
import { useActionState } from "react"
import { register } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Building2, Users, Sparkles, Eye, EyeOff, Mail, User, Lock, FileText } from "lucide-react"

const initialState = {
  error: undefined,
  success: false,
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" }
    if (password.length < 6) return { strength: 1, text: "Too short", color: "text-red-500" }
    if (password.length < 8) return { strength: 2, text: "Weak", color: "text-orange-500" }
    if (password.length < 12) return { strength: 3, text: "Good", color: "text-yellow-500" }
    return { strength: 4, text: "Strong", color: "text-green-500" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Join CIAAN Cyber Tech
          </h1>
          <p className="text-gray-600">Create your account and connect with our tech community</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Get Started
            </CardTitle>
            <CardDescription>Fill in your details to create your professional profile</CardDescription>
          </CardHeader>
          <CardContent>
            {state?.error && (
              <Alert className="mb-6 border-red-200 bg-red-50" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {state.error}
                  {(state.error.includes("Database not set up") || state.error.includes("Database not connected")) && (
                    <div className="mt-2">
                      <Link href="/setup" className="underline font-medium">
                        Go to setup page →
                      </Link>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <form action={formAction} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-lg"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-lg"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-lg"
                    required
                    minLength={6}
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Password strength</span>
                      <span className={passwordStrength.color}>{passwordStrength.text}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 1
                            ? "bg-red-500 w-1/4"
                            : passwordStrength.strength === 2
                              ? "bg-orange-500 w-2/4"
                              : passwordStrength.strength === 3
                                ? "bg-yellow-500 w-3/4"
                                : passwordStrength.strength === 4
                                  ? "bg-green-500 w-full"
                                  : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  Bio (Optional)
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="pl-10 min-h-[80px] border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-lg resize-none"
                    disabled={isPending}
                    maxLength={200}
                  />
                </div>
                <div className="text-xs text-gray-500 text-right">{formData.bio.length}/200</div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
            <Users className="h-6 w-6 mx-auto text-blue-600 mb-2" />
            <p className="text-xs text-gray-600">Professional Network</p>
          </div>
          <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
            <Building2 className="h-6 w-6 mx-auto text-purple-600 mb-2" />
            <p className="text-xs text-gray-600">Tech Community</p>
          </div>
          <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg">
            <Sparkles className="h-6 w-6 mx-auto text-pink-600 mb-2" />
            <p className="text-xs text-gray-600">Career Growth</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
