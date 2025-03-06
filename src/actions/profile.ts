'use server'

import type { UserProfile } from '@/schemas/profile'
import { getSession } from '@/auth'
import { changeEmail, updateUser } from '@/auth/utils'
import { revalidatePath } from 'next/cache'
import 'server-only'

export async function updateProfile(user: UserProfile) {
  const session = await getSession()

  if (!session) {
    console.error('Unauthorized')
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  try {
    const { email, ...update } = user
    await updateUser(update)

    if (email !== session.user.email) {
      await changeEmail(email)
    }

    revalidatePath('/profile')
    return {
      success: true,
      message: 'Profile updated successfully',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update profile',
    }
  }
}
