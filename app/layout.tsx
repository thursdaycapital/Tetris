import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tetris - Farcaster Mini App',
  description: '俄罗斯方块小游戏 - 经典游戏，支持排行榜，在 Farcaster 上玩俄罗斯方块！',
  openGraph: {
    title: 'Tetris - Farcaster Mini App',
    description: '🎮 经典俄罗斯方块游戏，支持排行榜！快来挑战最高分！',
    url: 'https://tetris-app-iota.vercel.app',
    siteName: 'Tetris Game',
    images: [
      {
        url: 'https://tetris-app-iota.vercel.app/splash.svg',
        width: 1200,
        height: 630,
        alt: 'Tetris Game',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tetris - Farcaster Mini App',
    description: '🎮 经典俄罗斯方块游戏，支持排行榜！',
    images: ['https://tetris-app-iota.vercel.app/splash.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

