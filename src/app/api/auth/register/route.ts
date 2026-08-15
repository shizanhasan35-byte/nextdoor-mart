import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || (!email && !phone) || !password) {
      return NextResponse.json(
        { message: 'প্রয়োজনীয় তথ্য সঠিকভাবে প্রদান করুন' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          email ? { email } : {},
          phone ? { phone } : {},
        ].filter(Boolean),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'এই ইমেইল বা ফোন নম্বর দিয়ে ইতোমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
      },
    });

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      { message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে', user: { id: user.id, name: user.name, role: user.role } },
      { status: 201 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন' },
      { status: 500 }
    );
  }
}
