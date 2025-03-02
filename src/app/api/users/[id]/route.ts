import type { NextRequest } from 'next/server'
import { userSchema } from '@/schemas/user'
import { db } from '@/server/db'
import { usersTable } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params

  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, Number(id)),
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

// Create a partial schema for updates - all fields are optional
const userUpdateSchema = userSchema.partial()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const body = await request.json()

  // Validate the request body against the partial schema
  const validationResult = userUpdateSchema.safeParse(body)

  if (!validationResult.success) {
    return NextResponse.json({ error: 'Invalid request data', details: validationResult.error.format() }, { status: 400 })
  }

  try {
    // Only update with validated data
    const { data } = validationResult

    // Update the user
    const update = await db.update(usersTable)
      .set(data)
      .where(eq(usersTable.id, Number(id)))
      .returning()

    if (!update.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(update[0])
  }
  catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
