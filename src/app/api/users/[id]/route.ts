import type { NextRequest } from 'next/server'
import { db } from '@/db'
import { usersTable } from '@/db/schema/users'
import { usersTableInsertSchema } from '@/schemas/users'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

/**
 * Get user by ID
 * @description Return a user by providing the ID
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, Number(id)),
  })

  if (!user) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 404,
      },
    )
  }

  return NextResponse.json(user)
}

// Create a partial schema for updates - all fields are optional
const userUpdateSchema = usersTableInsertSchema.partial()

/**
 * Update user by ID
 * @description Update a user by providing the ID, all properties are optional
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json()

  // Validate the request body against the partial schema
  const validationResult = userUpdateSchema.safeParse(body)

  if (!validationResult.success || !validationResult.data) {
    return NextResponse.json(
      {
        error: 'Invalid request data',
        details: validationResult.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    )
  }

  try {
    // Only update with validated data
    const { data } = validationResult

    // Update the user
    const update = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, Number(id)))
      .returning()

    if (!update.length) {
      return NextResponse.json(
        {
          error: 'User not found',
        },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(update[0])
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      {
        error: 'Failed to update user',
      },
      {
        status: 500,
      },
    )
  }
}
