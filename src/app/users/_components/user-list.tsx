'use client'

import type { UsersTableSelect } from '@/schemas/users'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { use } from 'react'
import { UserListActions } from './user-list-actions'

const columns: ColumnDef<UsersTableSelect>[] = [
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
    id: 'actions',
    cell: ({ row }) => <UserListActions userId={row.original.id} />,
  },
]

export function UserList({
  usersPromise,
}: {
  usersPromise: Promise<UsersTableSelect[]>
}) {
  const users = use(usersPromise)

  return (
    <>
      {users.length > 0 ? (
        <div className="w-[25vw] min-w-[500px]">
          <DataTable columns={columns} data={users} />
        </div>
      ) : (
        <p className="text-muted-foreground py-8 text-center">No users found</p>
      )}
    </>
  )
}
