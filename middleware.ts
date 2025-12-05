import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 处理 /.well-known/farcaster.json 重定向
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    return NextResponse.redirect(
      'https://api.farcaster.xyz/miniapps/hosted-manifest/019aed6f-49da-c5f3-1913-49746a3ba94a',
      { status: 307 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/.well-known/farcaster.json',
};

