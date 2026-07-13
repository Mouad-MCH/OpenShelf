import mongoose from 'mongoose';


interface IBook {
    title: string;
    author: string;
    isbn: string;
    category: string;
    publicationYear: number;
    description: string;
    available: boolean;
}

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
    }

}, { timestamps: true, })

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
