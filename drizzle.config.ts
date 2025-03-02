import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './src/server/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
})
