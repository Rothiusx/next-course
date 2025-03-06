import { usersTable } from '@/server/db/schema/users'
import { createSchemaFactory, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

const { createInsertSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
})

export const usersTableInsertSchema = createInsertSchema(usersTable, {
  age: (schema) =>
    schema
      .int({
        message: 'Age must be a whole number',
      })
      .min(18, {
        message: 'You must be at least 18 years old.',
      }),
  name: (schema) =>
    schema.min(2, { message: 'Name must be at least 2 characters.' }),
  email: (schema) => schema.email({ message: 'Invalid email address.' }),
  city: (schema) =>
    schema
      .min(2, { message: 'City must be at least 2 characters.' })
      .or(z.literal('')),
})

export type UsersTableInsert = z.infer<typeof usersTableInsertSchema>

export const usersTableSelectSchema = createSelectSchema(usersTable)

export type UsersTableSelect = z.infer<typeof usersTableSelectSchema>
