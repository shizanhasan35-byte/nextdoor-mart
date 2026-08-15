import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    // সিকিউরিটি চেক: শুধু ADMIN রোল থাকলে প্রোডাক্ট যোগ করা যাবে
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'অনুমতি নেই! কেবল এডমিন প্রোডাক্ট যোগ করতে পারবেন।' },
        { status: 403 }
      );
    }

    const { name, description, price, stock, imageUrl, categoryId } = await request.json();

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { message: 'নাম, দাম এবং ক্যাটাগরি দেওয়া বাধ্যতামূলক' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'প্রোডাক্ট যোগ করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
