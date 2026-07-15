import { getBooks } from "@/services/book.service";


export const categorys = async () => {
    const books = await getBooks();
    const arr = books.map((b) => b.category);
    return Array.from(new Set(arr));
};