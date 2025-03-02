import { db } from '@/server/db'

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const user = await db.query.usersTable.findFirst({
    where: (usersTable, { eq }) => eq(usersTable.id, Number(id)),
    columns: {
      id: false,
    },
  })

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center p-8 text-center">
        <div className="mb-4 text-red-500 text-4xl">404</div>
        <h1 className="mb-2 font-bold text-2xl">User Not Found</h1>
        <p className="text-muted-foreground">The user you're looking for doesn't exist or was removed.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 bg-card shadow-sm p-6 border border-border rounded-lg w-full max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center bg-primary rounded-full w-16 h-16 font-bold text-primary-foreground text-2xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-semibold text-secondary-foreground text-2xl">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-2 pt-4 border-t border-border">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">Age</span>
          <span className="font-medium text-secondary-foreground">{user.age}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">Language</span>
          <span className="font-medium text-secondary-foreground">{user.language}</span>
        </div>
        {user.city && (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">City</span>
            <span className="font-medium text-secondary-foreground">{user.city}</span>
          </div>
        )}
      </div>
    </div>
  )
}
