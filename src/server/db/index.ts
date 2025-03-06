import { env } from '@/env'
import * as schema from '@/server/db/schema'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const client = createClient({ url: env.DATABASE_URL })
export const db = drizzle<typeof schema>(client, { schema })
