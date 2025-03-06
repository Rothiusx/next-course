import type { NextRequest } from 'next/server'
import { db } from '@/db'
import { NextResponse } from 'next/server'

/**
 * Get all users
 * @description Return all users from the database
 */
export async function GET(_request: NextRequest) {
  try {
    const users = await db.query.usersTable.findMany()

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    )
  }
}
