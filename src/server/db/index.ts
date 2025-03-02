import process from 'node:process'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'
import 'dotenv/config'

const client = createClient({ url: process.env.DB_FILE_NAME! })
export const db = drizzle(client, { schema })
