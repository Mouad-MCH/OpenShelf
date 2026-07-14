import { z } from 'zod'

export const bookSchema = z.object({
    title: z.string().trim().min(1, 'Title is required'),
    author: z.string().trim().min(1, 'Author is required'),
    isbn: z.string().trim().min(10, 'ISBN must be at least 10 characters').max(17, 'ISBN must be at most 17 characters'),
    category: z.string().trim().min(1, 'category is required'),
    publicationYear: z.number().int().min(1000, 'Invalid publication year').max(new Date().getFullYear(), "Publication year cannot be in the future"),
    description: z.string().trim().min(1, "Description is required"),
    available: z.boolean(),
});

export type BookInput = z.infer<typeof bookSchema>;
export const bookUpdate = bookSchema.partial();


