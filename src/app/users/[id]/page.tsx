import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/db'

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await db.query.user.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  })

  await new Promise((resolve) => setTimeout(resolve, 250))

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-4xl text-red-500">404</div>
        <h1 className="mb-2 text-2xl font-bold">User Not Found</h1>
        <p className="text-muted-foreground">
          The user you're looking for doesn't exist or was removed.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      <div className="rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="text-3xl font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="mt-2">
              {user.role && (
                <Badge variant="outline" className="uppercase">
                  {user.role}
                </Badge>
              )}
              {user.banned && (
                <Badge variant="destructive" className="ml-2 uppercase">
                  banned
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.age !== null && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age</span>
                <span className="font-medium">{user.age}</span>
              </div>
            )}
            {user.city && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-medium">{user.city}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {user.createdAt.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">
                {user.updatedAt.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Verified</span>
              <span className="font-medium">
                {user.emailVerified ? 'Yes' : 'No'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
