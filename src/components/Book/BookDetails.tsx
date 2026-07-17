'use client'

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Barcode,
  Tag,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Book } from "@/types/Book";
import { getBookById } from "@/services/book.service";
import ErrorState from "../ui/Error";
import Empty from "../ui/Empty";
import { useBooks } from "@/context/booksProvider";

const stats = [
  { label: "Total Copies", value: "12", color: "text-primary" },
  { label: "On Loan", value: "4", color: "text-available" },
  { label: "Waitlist", value: "2", color: "text-foreground" },
];

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { deleteBook } = useBooks()


  useEffect(() => {
    if (!id) return;
    setLoading(true); 

    getBookById(id)
      .then(setBook)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-center py-10">Loading books...</p>;
  if (error) return <ErrorState description={error} />;
  if (book === null) return <Empty />;

  return (
    <section className="px-5 py-10 md:px-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-available hover:underline"
      >
        <ArrowLeft size={16} />
        Back to catalogue
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10">
        <div className="relative h-80 md:h-full flex-center rounded-card bg-linear-to-br from-primary/60 to-available/60">
          {book?.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="absolute inset-0 h-full w-full object-cover rounded-card"
            />
          ) : (
            <div className="flex-center w-14 h-14 rounded-lg bg-card">
              <Bookmark size={24} className="text-primary" />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl">{book?.title}</h1>

          <span className={
            `mt-3 inline-block rounded-full bg-available/15 text-available px-3 py-1 text-xs font-medium
             ${!book?.available ? "bg-borrowed/15 text-borrowed" : ""}`
          }>
            {book?.available ? "Available" : "not Available"}
          </span>

          <p className="mt-2 text-foreground/60">{book?.author}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-red-50 text-red-500 px-3 py-1 text-xs">
              <Barcode size={14} />
              ISBN {book?.isbn}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-100 text-violet-600 px-3 py-1 text-xs">
              <Tag size={14} />
              {book?.category}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-100 text-violet-600 px-3 py-1 text-xs">
              <Calendar size={14} />
              {book?.publicationYear}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h2 className="text-sm font-medium text-foreground/60">Overview</h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              { book?.description }
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Part botanical study, part epic mythos, this work chronicles
              the fragile balance between the mystical entities that guard
              the forest and the encroaching industrial world. Fernsby&apos;s
              prose is both scholarly and evocative, making this a
              cornerstone text for anyone seeking to understand the ancient
              lore of Lumina&apos;s most enigmatic region.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href={`/books/${id}/edit`}
              className="flex items-center gap-2 rounded-full bg-available text-primary-foreground px-5 py-2 text-sm hover:bg-available/80 transition"
            >
              <Pencil size={14} />
              Edit Book
            </Link>
            <button
              type="button"
              onClick={() => deleteBook(id)}
              className="flex items-center gap-2 rounded-full border border-red-300 text-red-500 px-5 py-2 text-sm hover:bg-red-50 transition"
            >
              <Trash2 size={14} />
              Delete Book
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  {s.label}
                </p>
                <p className={`mt-1 text-2xl font-bold ${s.color}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
