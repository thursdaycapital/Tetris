import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tetris - Farcaster Mini App',
  description: '俄罗斯方块小游戏',
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

