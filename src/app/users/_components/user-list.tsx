import { deleteUser } from '@/server/actions/users'
import { db } from '@/server/db'
import { Trash2, UserPen } from 'lucide-react'
import Link from 'next/link'

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
                  <div className="flex flex-row items-center gap-4 bg-primary hover:bg-accent p-4 border border-secondary rounded-md w-full text-primary-foreground transition-colors hover:text-accent-foreground/80">
                    <p className="flex-1">{user.name}</p>
                    <p className="flex-1">{user.email}</p>
                    <p className="w-16 text-center">{user.age}</p>
                    <Link href={`/users/${user.id}`}>
                      <div className="flex justify-center items-center p-2">
                        <UserPen className="size-5" />
                      </div>
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deleteUser(user.id)
                    }}
                    >
                      <button type="submit" className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white">
                        <Trash2 className="size-5" />
                      </button>
                    </form>
                  </div>
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
