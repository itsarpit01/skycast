import { z } from 'zod'

export const searchSchema = z.object({
  city: z.string().trim()
    .min(2, 'City name needs at least 2 letters.')
    .max(60, 'That name is too long.')
    .regex(/^[a-zA-Z\s,.'-]+$/, 'Letters, spaces and commas only.'),
})

export function validateSearch(values) {
  const result = searchSchema.safeParse(values)
  if (result.success) return { success: true, data: result.data, error: '' }
  return { success: false, data: null, error: result.error.issues[0].message }
}