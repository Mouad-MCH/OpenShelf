'use client'
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooks } from "@/context/booksProvider";
import { categorys } from "@/lib/helpers";

const Filter = () => {
  const { search, setSearch, all, available, setAll, setAvailable, category, setCategory, reset } = useBooks();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    categorys().then(setCategories);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-primary-foreground p-5 rounded-lg shadow-sm mb-10">
      <div className="search relative flex-1 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50"
        />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value) }
          className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary"
        />
      </div>

      <div className="chips flex items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className={
            `rounded-full px-4 py-1.5  border border-border text-sm text-foreground transition hover:border-primary hover:text-primary 
            ${all ? "bg-primary text-primary-foreground" : ''}`
          }
        >
          All
        </button>
        <button
          type="button"
          onClick={() => {setAvailable(!available); setAll(false)}}
          className={`
              rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary
              ${available ? 'bg-primary text-primary-foreground' : ''}
            `}
        >
          Available
        </button>

        <select
          className="rounded-full outline-0 border border-border px-4 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            {
                categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))
            }
        </select>
        {/* <button
          type="button"
          className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary"
        >
          Borrowed
        </button> */}
      </div>
    </div>
  );
};

export default Filter;
