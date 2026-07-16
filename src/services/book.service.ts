import { Book, BookInput } from "@/types/Book";

const BASE_URL = '/api/books'

export const getBooks = async (query?: string, category?: string , available?: boolean): Promise<Book[]> => {
    const params = new URLSearchParams();
    if(query) params.set("q", query);
    if(category) params.set('category', category);
    if(available) params.set('available', String(available));

    const queryString = params.toString();
    const res = await fetch(queryString ? `${BASE_URL}?${queryString}` : BASE_URL);
    if(!res.ok) {
        throw new Error("Failed to fetch books");
    }

    return res.json();
}

export const createBook = async (data: BookInput): Promise<Book> => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(typeof json.error === 'string' ? json.error : JSON.stringify(json.error));
    }

    return json;
}

export const updateBook = async (id: string, data: Partial<BookInput>): Promise<Book> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(typeof json.error === 'string' ? json.error : JSON.stringify(json.error));
    }

    return json;
}

export const getBookById = async (id: string): Promise<Book> => {
    const res = await fetch(`${BASE_URL}/${id}`);

    const json = await res.json();

    if(!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : JSON.stringify(json.error));
    }

    return json;
}

export const deletBook = async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    if(!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : JSON.stringify(json.error));
    }

    return json;
}