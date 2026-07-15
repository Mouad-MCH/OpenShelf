import Link from "next/link";
import { BookOpen, Trash2 } from "lucide-react";
import { Book } from "@/types/Book";

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  return (
    <div className="flex flex-col rounded-card bg-card border border-border shadow-sm overflow-hidden">
      <div className="relative h-48 flex-center bg-linear-to-br from-primary/20 to-available/20">
        {book.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <BookOpen size={40} className="text-foreground/30" />
        )}

        <span
          className={`absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-medium ${
            book.available
              ? "bg-available/15 text-available"
              : "bg-borrowed/15 text-borrowed"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg">{book.title}</h3>
          <p className="text-sm text-foreground/60">by {book.author}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-violet-100 text-violet-600 px-3 py-1 text-xs">
            {book.category}
          </span>
          <span className="rounded-full bg-violet-100 text-violet-600 px-3 py-1 text-xs">
            {book.publicationYear}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Link
            href={`/books/${book._id}`}
            className="flex-1 text-center rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition px-4 py-1.5 text-sm"
          >
            View
          </Link>
          <Link
            href={`/books/edit/${book._id}`}
            className="flex-1 text-center rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition px-4 py-1.5 text-sm"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete?.(book._id)}
            className="rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100 transition"
            aria-label="Delete book"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
