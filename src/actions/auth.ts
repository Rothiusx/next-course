'use server'

import { auth, getSession } from '@/auth'
import { removeUser } from '@/auth/utils'
import { revalidatePath } from 'next/cache'
import 'server-only'

export async function removeUserAction(userId: string) {
  const session = await getSession()

  const hasPermission = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      permission: {
        user: ['delete'],
      },
    },
  })

  if (!hasPermission.success) {
    return {
      success: false,
      message: 'You do not have permission to delete users',
    }
  }

  try {
    await removeUser(userId)

    revalidatePath('/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '',
    }
  }
}
