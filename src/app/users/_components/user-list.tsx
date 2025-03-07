'use client'

import type { UserSelect } from '@/schemas/auth'
import type { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { use } from 'react'
import { UserListActions } from './user-list-actions'

const columns: ColumnDef<UserSelect>[] = [
  {
    accessorKey: 'image',
    header: undefined,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image ?? undefined} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorFn: (row) => row.createdAt.toLocaleString(),
    header: 'Created',
  },
  {
    accessorFn: (row) => row.updatedAt.toLocaleString(),
    header: 'Updated',
  },
  {
    accessorFn: (row) => (row.banned ? 'Yes' : 'No'),
    header: 'Banned',
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserListActions userId={row.original.id} />,
  },
]

export function UserList({
  usersPromise,
}: {
  usersPromise: Promise<UserSelect[]>
}) {
  const users = use(usersPromise)

  return (
    <>
      {users.length > 0 ? (
        <div className="min-w-[500px]">
          <ScrollArea>
            <DataTable columns={columns} data={users} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <p className="text-muted-foreground py-8 text-center">No users found</p>
      )}
    </>
  )
}
