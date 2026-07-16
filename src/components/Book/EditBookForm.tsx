"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import { getBookById } from "@/services/book.service";
import AddBookForm from "./AddBookForm";
import ErrorState from "../ui/Error";
import Empty from "../ui/Empty";

const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    getBookById(id)
      .then(setBook)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading book...</p>;
  if (error) return <ErrorState description={error} />;
  if (book === null) return <Empty />;

  return <AddBookForm book={book} />;
};

export default EditBookForm;
