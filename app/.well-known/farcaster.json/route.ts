import { NextResponse } from 'next/server';

export async function GET() {
  // 返回包含 accountAssociation 的 JSON 响应
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

