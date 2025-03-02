import { db } from '@/server/db'
import { UserItem } from './user-item'

export async function UserList() {
  const users = await db.query.usersTable.findMany({
    columns: {
      city: false,
      language: false,
    },
  })

  await new Promise((resolve) => setTimeout(resolve, 500))
  return (
    <>
      {users.length > 0
        ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id}>
                  <UserItem user={user} />
                </li>
              ))}
            </ul>
          )
        : (
            <p className="py-8 text-muted-foreground text-center">No users found</p>
          )}
    </>
  )
}
