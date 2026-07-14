# OpenShelf

A library management app built with Next.js (App Router), MongoDB (Mongoose), and Zod validation.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Route Handlers)
- **Database:** MongoDB via Mongoose
- **Validation:** Zod
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript (strict mode)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and set your MongoDB connection string:

   ```bash
   cp .env.example .env.local
   ```

   Set `MONGODB_URI` to your MongoDB Atlas (or local) connection string. If using Atlas, make sure your current IP is whitelisted under **Network Access**.

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    api/books/          # Route Handlers (GET, POST /api/books)
    api/books/[id]/     # Route Handlers (GET, PUT, DELETE /api/books/:id)
  lib/
    db.ts                # MongoDB connection helper
    validators.ts        # Zod schemas (bookSchema, bookUpdate)
  models/
    Books.ts              # Mongoose model
  services/
    book.service.ts       # Client-side fetch wrappers for the API
  types/
    Book.ts                # Shared TypeScript types
```

## API

| Method | Route              | Description                                             |
| ------ | ------------------ | -------------------------------------------------------- |
| GET    | `/api/books`        | List books. Supports `?q=`, `?category=`, `?available=` |
| POST   | `/api/books`        | Create a book (validated with `bookSchema`)              |
| GET    | `/api/books/:id`    | Get a single book                                         |
| PUT    | `/api/books/:id`    | Update a book (validated with `bookUpdate`, partial)      |
| DELETE | `/api/books/:id`    | Delete a book                                              |

All write operations validate the request body with Zod and return `400` with field-level errors on failure.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
