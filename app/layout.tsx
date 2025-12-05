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
        url: 'https://tetris-app-iota.vercel.app/icon.svg',
        width: 512,
        height: 512,
        alt: 'Tetris Game',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tetris - Farcaster Mini App',
    description: '🎮 经典俄罗斯方块游戏，支持排行榜！',
    images: ['https://tetris-app-iota.vercel.app/icon.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 允许在 iframe 中嵌入 */}
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body>{children}</body>
    </html>
  );
}

