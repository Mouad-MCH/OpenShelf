import Books from "@/models/Books";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { bookSchema } from "@/lib/validators";
import z from "zod";



export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const q = searchParams.get('q');
    const available = searchParams.get('available');

    await dbConnect();  

    const filter: Record<string, unknown> = {};

    if(category) filter.category = category;
    if(available) filter.available = available === "true";

    if(q) {
        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { author: { $regex: q, $options: "i" } }
        ];
    }

    const books = await Books.find(filter);

    return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
    await dbConnect();
    const body = await request.json();
    
    try {

        const data = bookSchema.parse(body);
        const book = await Books.create(data);

        return NextResponse.json(book, { status: 201 });

    }catch(err) {
        if(err instanceof z.ZodError) {
            return NextResponse.json({error: err.flatten().fieldErrors }, { status: 400 })
        }

        throw err
    }

}