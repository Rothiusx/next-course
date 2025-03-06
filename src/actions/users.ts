'use server'

import type { UsersTableInsert } from '@/schemas/users'
import { getSession } from '@/auth'
import { db } from '@/db'
import { usersTable } from '@/db/schema/users'
import { usersTableInsertSchema } from '@/schemas/users'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import 'server-only'

export async function deleteUser(id: number) {
  const session = await getSession()

  if (!session) {
    console.error('Unauthorized')
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    revalidatePath('/users')
    return {
      success: true,
      message: `User ID: ${id} deleted successfully`,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: `Failed to delete user ID: ${id}`,
    }
  }
}

export async function createUser(user: UsersTableInsert) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!usersTableInsertSchema.safeParse(user).success) {
    return {
      success: false,
      message: 'Invalid form data',
    }
  }

  try {
    // Use the returning strategy to detect if the row was inserted
    const result = await db
      .insert(usersTable)
      .values(user)
      .onConflictDoNothing()
      .returning()

    // If no rows were returned, it means there was a conflict
    if (!result.length) {
      return {
        success: false,
        message: `Email ${user.email} already exists`,
        field: 'email' as const,
      }
    }

    revalidatePath('/users/create')
    return {
      success: true,
      message: `User ${user.name} created successfully`,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: `Failed to create user ${user.name}`,
    }
  }
}
