import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { emailOrPhone, password } = await req.json();

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { message: 'ইমেইল/ফোন নম্বর এবং পাসওয়ার্ড আবশ্যক' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'ভুল ইমেইল/ফোন নম্বর অথবা পাসওয়ার্ড' },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'ভুল ইমেইল/ফোন নম্বর অথবা পাসওয়ার্ড' },
        { status: 400 }
      );
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      { message: 'লগইন সফল হয়েছে', user: { id: user.id, name: user.name, role: user.role } },
      { status: 200 }
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
