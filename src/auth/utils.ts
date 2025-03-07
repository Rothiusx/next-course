import type { User } from './index'
import { headers } from 'next/headers'
import { auth } from './index'
import 'server-only'

/**
 * Update the current user's profile
 * @param user - The user's public profile information
 */
export async function updateUser(user: Partial<User>) {
  await auth.api.updateUser({
    headers: await headers(),
    body: {
      ...user,
      updatedAt: Date.now(),
    },
  })
}

/**
 * Change the current user's email
 * @param newEmail - The new email address
 */
export async function changeEmail(newEmail: User['email']) {
  await auth.api.changeEmail({
    headers: await headers(),
    body: {
      newEmail,
    },
  })
}

/**
 * Change the current user's password
 * @param currentPassword - The current password
 * @param newPassword - The new password
 * @param revokeOtherSessions - Whether to revoke other sessions
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  revokeOtherSessions: boolean,
) {
  await auth.api.changePassword({
    headers: await headers(),
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions,
    },
  })
}

/**
 * Set the current user's password
 * @param newPassword - The new password
 */
export async function setPassword(newPassword: string) {
  await auth.api.setPassword({
    headers: await headers(),
    body: {
      newPassword,
    },
  })
}

/**
 * Remove user from database by providing user's ID
 * @param userId - The user's ID
 */
export async function removeUser(userId: User['id']) {
  await auth.api.removeUser({
    headers: await headers(),
    body: {
      userId,
    },
  })
}
