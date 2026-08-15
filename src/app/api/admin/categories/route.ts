import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'ক্যাটাগরি লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'অনুমতি নেই!' },
        { status: 403 }
      );
    }

    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { message: 'নাম এবং স্লগ বাধ্যতামূলক' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}
