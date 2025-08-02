import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getUserById } from "@/actions/profile"
import { getUserPosts } from "@/actions/posts"
import { ProfileForm } from "@/components/profile-form"
import { PostCard } from "@/components/post-card"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  const profileUser = await getUserById(Number.parseInt(id))

  if (!profileUser) {
    notFound()
  }

  const posts = await getUserPosts(profileUser.id)
  const isOwnProfile = currentUser.id === profileUser.id

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold">CIAAN Cyber Tech - Professional Profiles</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">{profileUser.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{profileUser.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profileUser.email}</p>
              </CardHeader>
              <CardContent>
                {profileUser.bio && <p className="text-sm mb-4">{profileUser.bio}</p>}
                <p className="text-xs text-muted-foreground">
                  Joined {new Date(profileUser.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {isOwnProfile && (
              <div className="mt-6">
                <ProfileForm user={profileUser} />
              </div>
            )}
          </div>

          {/* Posts */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{isOwnProfile ? "Your Posts" : `${profileUser.name}'s Posts`}</CardTitle>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {isOwnProfile ? "You haven't posted anything yet." : "No posts yet."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
