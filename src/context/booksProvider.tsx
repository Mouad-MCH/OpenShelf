"use client";

import { getBooks } from "@/services/book.service";
import { Book } from "@/types/Book";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BooksContextType } from "@/types/Book";

export const BooksContext = createContext<BooksContextType | null>(null);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [available, setAvailable] = useState<boolean>(false);
  const [all, setAll] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  

  const reset = () => {
    setAll(true);
    setAvailable(false);
  };

  const handleFilter = async (q: string, c: string, a: boolean) => {
    setLoading(true)
    try {
      const books = await getBooks(q, c, a);
      setBooks(books);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    let ignore = false;

    getBooks(search, category, available)
      .then((books) => {
        if (!ignore) setBooks(books);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      });

    return () => {
      ignore = true;
    };
  }, [all, available, search, category]);

  return (
    <BooksContext.Provider
      value={{
        all,
        setAll,
        available,
        setAvailable,
        search,
        setSearch,
        category,
        setCategory,
        books,
        error,
        reset,
        loading,
        handleFilter,
      }}
    >
        {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
