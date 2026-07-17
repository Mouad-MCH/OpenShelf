"use client";

import { useBooks } from "@/context/booksProvider";
import BookCard from "../ui/BookCard";
import Empty from "../ui/Empty";
import ErrorState from "../ui/Error";

const BooksList = () => {
  const { books, loading, error, deleteBook } = useBooks();

  if (loading) return <p className="text-center py-10">Loading books...</p>;
  if (error) return <ErrorState description={error} />;
  if (books.length === 0) return <Empty />;

  return (
    <div className="w-full grid-4">
      {books.map((b) => (
        <BookCard key={b._id} book={b} onDelete={deleteBook} />
      ))}
    </div>
  );
};

export default BooksList;
