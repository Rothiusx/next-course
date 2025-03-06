'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { actionToast } from '@/lib/utils'
import { deleteUser } from '@/server/actions/users'
import { Loader2, Trash2, UserPen } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

const initialState = { success: false, message: '' }

export function UserListActions({ userId }: { userId: number }) {
  const [_, action, isPending] = useActionState(async () => {
    const result = await deleteUser(userId)
    actionToast(result)
    return result
  }, initialState)

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      {isPending ? (
        <Button variant="secondary" size="sm" disabled>
          <UserPen className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/users/${userId}`}>
            <UserPen className="size-5" />
          </Link>
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Trash2 className="size-5" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete a user
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={action}>
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
