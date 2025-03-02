import { Home, Plus, Users } from 'lucide-react'
import Link from 'next/link'

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <div className="flex justify-center items-center gap-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Home className="size-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link href="/users" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Users className="size-6" />
          <span className="text-sm">Users</span>
        </Link>
        <Link href="/users/create" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Plus className="size-6" />
          <span className="text-sm">Create</span>
        </Link>
      </div>
      {children}
    </div>
  )
}
