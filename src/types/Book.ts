
import type { BookInput } from '@/lib/validators';
import { Dispatch, SetStateAction } from 'react';

export interface Book extends BookInput {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type { BookInput };
export type IBook = Book;

export interface NAVLINK {
    name: string;
    href: string;
    current: boolean;
}

export interface BooksContextType {
  all: boolean;
  setAll: Dispatch<SetStateAction<boolean>>;

  available: boolean;
  setAvailable: Dispatch<SetStateAction<boolean>>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  category: string;
  setCategory: Dispatch<SetStateAction<string>>;

  books: Book[];

  error: string;

  reset: () => void;

  loading: boolean;

  handleFilter: (q: string, c: string, a: boolean) => Promise<void>;
}
