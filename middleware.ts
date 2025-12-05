import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 让静态文件直接通过，不拦截
  return NextResponse.next();
}

export const config = {
  matcher: '/.well-known/:path*',
};

