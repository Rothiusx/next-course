import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  age: z.coerce.number().min(18, { message: 'You must be at least 18 years old.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }).optional().or(z.literal('')),
  language: z.enum(['cs', 'en'], { message: 'Invalid language.' }),
})
