import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 处理 /.well-known/farcaster.json - 返回静态文件
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    return NextResponse.next();
  }
  
  // 处理 /.well-known/account_association.json - 返回静态文件
  if (request.nextUrl.pathname === '/.well-known/account_association.json') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/.well-known/farcaster.json',
    '/.well-known/account_association.json'
  ],
};

