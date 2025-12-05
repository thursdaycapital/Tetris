import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 处理 /.well-known/farcaster.json - 返回 accountAssociation
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    return NextResponse.json({
      accountAssociation: {
        header: "eyJmaWQiOjMwNjE5MywidHlwZSI6ImF1dGgiLCJrZXkiOiIweGRDMDMzNEFmRjJDYzBEZTkwMjRkM2IzQzAwNzE5Mzc5ZDkwQkFFODUifQ",
        payload: "eyJkb21haW4iOiJ0ZXRyaXMtYXBwLWlvdGEudmVyY2VsLmFwcCJ9",
        signature: "fXiuZWq8EfZJKuM//CPcCHCSooQHEN6RRlgwwjfbdVY9g0HH5/uTPpZc/4VFDkfYOd5vRBHBgMCBa5kRZYmtFxs="
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/.well-known/farcaster.json',
};

