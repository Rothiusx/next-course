'use server'

import { userSchema } from '@/schemas/user'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { usersTable } from '../db/schema'

export async function deleteUser(id: number) {
  try {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    revalidatePath('/users')
    return {
      success: true,
      message: `User ID: ${id} deleted successfully`,
    }
  }
  catch (error) {
    console.error(error)
    return {
      success: false,
      message: `Failed to delete user ID: ${id}`,
    }
  }
}

export async function createUser(user: typeof usersTable.$inferInsert) {
  const existingUser = await db.query.usersTable.findFirst({
    where: (usersTable, { eq }) => eq(usersTable.email, user.email),
  })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (existingUser) {
    return {
      success: false,
      message: `Email ${user.email} already exists`,
      field: 'email' as const,
    }
  }

  if (!userSchema.safeParse(user).success) {
    return {
      success: false,
      message: 'Invalid form data',
    }
  }

  try {
    await db.insert(usersTable).values(user)
    revalidatePath('/users/create')
    return {
      success: true,
      message: `User ${user.name} created successfully`,
    }
  }
  catch (error) {
    console.error(error)
    return {
      success: false,
      message: `Failed to create user ${user.name}`,
    }
  }
}
