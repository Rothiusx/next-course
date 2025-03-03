import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import { UserList } from './_components/user-list'

export default async function UsersPage() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-2xl font-semibold">List of users</h1>
      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="bg-muted/10 h-16 w-[500px]" />
            ))}
          </div>
        }
      >
        <UserList />
      </Suspense>
    </div>
  )
}
