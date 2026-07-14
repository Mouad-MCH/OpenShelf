
import type { BookInput } from '@/lib/validators';

export interface Book extends BookInput {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type { BookInput };
export type IBook = Book;