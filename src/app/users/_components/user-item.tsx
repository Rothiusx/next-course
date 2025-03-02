import { Button } from '@/components/ui/button'
import { deleteUser } from '@/server/actions/users'
import { Trash2, UserPen } from 'lucide-react'
import Link from 'next/link'

interface UserItemProps {
  id: number
  name: string
  email: string
  age: number
}

export function UserItem({ user }: { user: UserItemProps }) {
  return (
    <div className="flex flex-row items-center gap-4 bg-primary hover:bg-accent p-4 border border-secondary rounded-md w-full text-primary-foreground transition-colors hover:text-accent-foreground/80">
      <p className="flex-1">{user.name}</p>
      <p className="flex-1">{user.email}</p>
      <p className="w-16 text-center">{user.age}</p>
      <Link href={`/users/${user.id}`}>
        <Button className="" asChild>
          <div className="flex justify-center items-center p-2">
            <UserPen className="size-5" />
          </div>
        </Button>
      </Link>
      <form
        action={async () => {
          'use server'
          await deleteUser(user.id)
        }}
      >
        <Button type="submit" variant="destructive">
          <Trash2 className="size-5" />
        </Button>
      </form>
    </div>
  )
}
