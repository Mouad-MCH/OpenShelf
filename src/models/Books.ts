import mongoose from 'mongoose';
import { IBook } from '@/types/Book';

const BookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    category: { type: String, required: true },
    publicationYear: {
        type: Number,
        required: true
    },
    description: { type: String, required: true },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
    coverImage: {
        type: String,
        required: false,
    }

}, { timestamps: true, })

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
