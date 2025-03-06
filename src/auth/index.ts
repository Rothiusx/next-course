import { db } from '@/db'
import { env } from '@/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin } from 'better-auth/plugins'
import { headers } from 'next/headers'
import { ac, roles } from './permissions'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles,
    }),
  ],
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      age: {
        type: 'number',
        required: false,
      },
      city: {
        type: 'string',
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
})

export type Session = typeof auth.$Infer.Session

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  })
}
