import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  permission: text({ enum: ['admin', 'user'] })
    .default('user')
    .notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  city: text(),
  language: text({ enum: ['cs', 'en'] })
    .default('cs')
    .notNull(),
})
