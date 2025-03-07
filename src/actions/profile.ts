'use server'

import type { UserProfile } from '@/schemas/profile'
import { getSession } from '@/auth'
import { changeEmail, updateUser } from '@/auth/utils'
import { userProfileSchema } from '@/schemas/profile'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod'
import 'server-only'

export async function updateProfile(user: UserProfile) {
  const session = await getSession()

  const validatedUser = userProfileSchema.safeParse(user)

  if (!validatedUser.success) {
    return {
      success: false,
      message: validatedUser.error.message,
    }
  }

  try {
    const { email, ...update } = validatedUser.data

    await updateUser(update)

    if (email !== session?.user.email) {
      await changeEmail(email)
    }

    revalidatePath('/profile')
    return {
      success: true,
      message: 'Profile updated successfully',
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(JSON.stringify(error.flatten()))
      return {
        success: false,
        message: error.message,
      }
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: false,
      message: 'Failed to update profile',
    }
  }
}
