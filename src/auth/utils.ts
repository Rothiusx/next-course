import type { Session } from './index'
import { headers } from 'next/headers'
import { auth } from './index'
import 'server-only'

export async function updateUser(user: Partial<Session['user']>) {
  await auth.api.updateUser({
    headers: await headers(),
    body: {
      ...user,
    },
  })
}

export async function changeEmail(email: Session['user']['email']) {
  await auth.api.changeEmail({
    headers: await headers(),
    body: {
      newEmail: email,
    },
  })
}

export async function removeUser(userId: Session['user']['id']) {
  await auth.api.removeUser({
    headers: await headers(),
    body: {
      userId,
    },
  })
}
