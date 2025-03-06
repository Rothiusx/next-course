import { db } from '@/db'

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, Number(id)),
    columns: {
      id: false,
    },
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
    <div className="bg-card border-border flex w-full max-w-2xl flex-col gap-6 rounded-lg border p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-secondary-foreground text-2xl font-semibold">
            {user.name}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="border-border grid grid-cols-2 gap-4 border-t pt-4">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">Age</span>
          <span className="text-secondary-foreground font-medium">
            {user.age}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">Language</span>
          <span className="text-secondary-foreground font-medium">
            {user.language}
          </span>
        </div>
        {user.city && (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">City</span>
            <span className="text-secondary-foreground font-medium">
              {user.city}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
