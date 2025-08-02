"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, MessageSquare, TrendingUp, X } from "lucide-react"
import type { User } from "@/lib/db"

interface WelcomeBannerProps {
  user: User
}

export function WelcomeBanner({ user }: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white border-0 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <CardContent className="p-8 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}! 👋</h2>
          <p className="text-blue-100 text-lg">Connect and collaborate with the CIAAN Cyber Tech community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-3 group-hover:bg-white/30 transition-all duration-200">
              <Building2 className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Professional Network</h3>
            <p className="text-sm text-blue-100">Connect with colleagues</p>
          </div>

          <div className="text-center group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-3 group-hover:bg-white/30 transition-all duration-200">
              <MessageSquare className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Share Insights</h3>
            <p className="text-sm text-blue-100">Post updates and ideas</p>
          </div>

          <div className="text-center group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-3 group-hover:bg-white/30 transition-all duration-200">
              <Users className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Build Community</h3>
            <p className="text-sm text-blue-100">Engage and grow</p>
          </div>

          <div className="text-center group">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-3 group-hover:bg-white/30 transition-all duration-200">
              <TrendingUp className="h-8 w-8 mx-auto text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Career Growth</h3>
            <p className="text-sm text-blue-100">Advance professionally</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
