import Books from "@/models/Books";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { bookUpdate } from "@/lib/validators";
import { z } from "zod";


export const GET = async (
    request: NextRequest,
    { params }: RouteContext<'/api/books/[id]'>
) =>  {
    await dbConnect();
    const { id } = await params;
    const book = await Books.findById(id);

    if(!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
}

export const PUT = async (
    request: NextRequest,
    { params } : RouteContext<'/api/books/[id]'>
) => {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    try {
        const data = bookUpdate.parse(body);
        const book = await Books.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
        if(!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }
    
        return NextResponse.json(book);

    } catch(err) {
        if(err instanceof z.ZodError) {
            return NextResponse.json({ error: err.flatten().fieldErrors }, { status: 400 })
        }

        throw err
    }
}

export const DELETE = async (
    request: NextRequest,
    { params } : RouteContext<'/api/books/[id]'>
) => {
    await dbConnect();
    const { id } = await params;
    const book = await Books.findByIdAndDelete(id);

    if(!book) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}