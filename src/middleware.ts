import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const authRoutes = ['/login', '/register'];

  // লগইন থাকা অবস্থায় লগইন/রেজিস্ট্রেশন পেজে গেলে হোমপেজে রিডাইরেক্ট করবে
  if (token && authRoutes.includes(pathname)) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*'],
};
