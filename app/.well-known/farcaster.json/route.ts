import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(
    'https://api.farcaster.xyz/miniapps/hosted-manifest/019aed6f-49da-c5f3-1913-49746a3ba94a',
    { status: 307 }
  );
}

