"use client";

import Link from "next/link";
import { Plus, Save } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBook, updateBook } from "@/services/book.service";
import { categorys } from "@/lib/helpers";
import { Book, BookInput } from "@/types/Book";

interface AddBookFormProps {
  book?: Book;
}

const emptyForm: BookInput = {
  title: "",
  author: "",
  isbn: "",
  category: "",
  publicationYear: new Date().getFullYear(),
  description: "",
  available: true,
  coverImage: "",
};

const toFormState = (book: Book): BookInput => ({
  title: book.title,
  author: book.author,
  isbn: book.isbn,
  category: book.category,
  publicationYear: book.publicationYear,
  description: book.description,
  available: book.available,
  coverImage: book.coverImage ?? "",
});

const AddBookForm = ({ book }: AddBookFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(book);

  const [form, setForm] = useState<BookInput>(book ? toFormState(book) : emptyForm);
  const [categories, setCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    categorys().then(setCategories);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "publicationYear" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload: BookInput = {
      ...form,
      coverImage: form.coverImage?.trim() ? form.coverImage.trim() : undefined,
    };

    try {
      const saved = isEdit && book
        ? await updateBook(book._id, payload)
        : await createBook(payload);

      router.push(`/books/${saved._id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-5 py-14 md:px-20 flex flex-col items-center">
      <div className="text-center max-w-md">
        <h1 className="text-3xl inline-block relative">
          {isEdit ? "Edit Book" : "Add a New Book"}
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary rounded-full" />
        </h1>
        <p className="mt-3 text-foreground/60">
          {isEdit
            ? "Update the metadata and details for this library resource."
            : "Expand our digital sanctuary with a fresh literary discovery."}
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl rounded-card bg-card border border-border shadow-sm p-8">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium">Book Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. The Great Gatsby"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Author</label>
              <input
                type="text"
                name="author"
                placeholder="F. Scott Fitzgerald"
                value={form.author}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">ISBN</label>
              <input
                type="text"
                name="isbn"
                placeholder="978-3-16-148410-0"
                value={form.isbn}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Publication Year</label>
            <input
              type="number"
              name="publicationYear"
              placeholder="YYYY"
              value={form.publicationYear || ""}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={3}
              name="description"
              placeholder="Share a brief summary of the book..."
              value={form.description}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              placeholder="https://example.com/cover.jpg"
              value={form.coverImage ?? ""}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex-center gap-2 rounded-full bg-primary text-primary-foreground py-2.5 text-sm hover:bg-primary/80 transition disabled:opacity-60"
          >
            {isEdit ? <Save size={16} /> : <Plus size={16} />}
            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Book"}
          </button>

          <Link
            href={isEdit && book ? `/books/${book._id}` : "/"}
            className="text-center text-sm text-foreground/60 hover:text-primary transition"
          >
            Cancel
          </Link>
        </form>
      </div>
    </section>
  );
};

export default AddBookForm;
