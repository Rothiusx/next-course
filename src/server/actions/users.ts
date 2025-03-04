'use server'

import { userSchema } from '@/schemas/users'
import { db } from '@/server/db'
import { usersTable } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import 'server-only'

export async function deleteUser(id: number) {
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

export async function createUser(user: typeof usersTable.$inferInsert) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!userSchema.safeParse(user).success) {
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
